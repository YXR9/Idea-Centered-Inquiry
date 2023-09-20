import config from '../config.json';
import axios from "axios";
import React, { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import createActivityImg from '../assets/undraw_creative_thinking_re_9k71.svg';

export const CreateActivityForm = () => {
    const userId = localStorage.getItem('userId'); 
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState({
        owner: userId,
        activityTitle: ""
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
            owner: data.owner,
            activityTitle: data.activityTitle
        };
        axios
            .post(config[2].createActivity, activityData)
            .then((response) => {
                setOpen(false);
                setData({
                    activityTitle: ""
                })
                console.log(response.status, response.data);
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
                備課區
            </div>
        </>
        <Dialog open={open} onClose={handleClose}>
            <div>
              <img className='modal-image' src={createActivityImg} />
            </div>
            <DialogTitle>建立活動</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label={"activityTitle"}
                    type="text"
                    name='activityTitle'
                    value={data.activityTitle}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button type='submit' onClick={handleSubmit}>建立</Button>
            </DialogActions>
        </Dialog>
      </div>
    );
}