import config from '../config.json';
import axios from "axios";
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import createActivityImg from '../assets/undraw_creative_thinking_re_9k71.svg';
import url from '../url.json';

export const CreateActivityForm = () => {
    const userId = localStorage.getItem('userId'); 
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState(dayjs('2023-12-10'));
    const [endDate, setEndDate] = useState(dayjs('2023-12-10'));
    const [data, setData] = useState({
        title: "",
        userId: userId,
        startDate: startDate,
        endDate: endDate
    });
    
    const handleClickOpen = () => {
        setOpen(true);
    };
  
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const activityData = {
            userId: data.userId,
            title: data.title,
            startDate: data.startDate,
            endDate: data.endDate
        };
        axios
            .post(url.backendHost + config[2].createActivity, activityData)
            .then((response) => {
                setOpen(false);
                setData({
                    title: "",
                    startDate: "",
                    endDate: ""
                })
                console.log(response.status, response.data);
                window.location.reload(false);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("server responded");
                } else if (error.request) {
                    console.log("network error");
                } else {
                    console.log(error);
                }
            });
    };
  
    return (
      <div>
        <>  
            <div onClick={handleClickOpen}>
                新增課程包
            </div>
        </>
        <Dialog open={open} onClose={handleClose}>
            <div>
              <img className='modal-image' src={createActivityImg} />
            </div>
            <DialogTitle>新增課程包</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label={"title"}
                    type="text"
                    name='title'
                    value={data.title}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker
                        id="startDate"
                        label="請選擇開始日期"
                        renderInput={(params) => <TextField {...params}/>}
                        format='YYYY-MM-DD'
                        name='startDate'
                        value={startDate}
                        onChange={(newDate) => setStartDate(newDate)}
                    />
                    <DatePicker
                        id="endDate"
                        label="請選擇結束日期"
                        renderInput={(params) => <TextField {...params}/>}
                        format='YYYY-MM-DD'
                        name='endDate'
                        value={endDate}
                        onChange={(newDate) => setEndDate(newDate)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <Button type='submit' onClick={handleSubmit}>新增</Button>
            </DialogActions>
        </Dialog>
      </div>
    );
}