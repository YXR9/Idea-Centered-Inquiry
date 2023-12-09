import config from '../config.json';
import axios from "axios";
import React, { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import joinActivityImg from '../assets/undraw_join_re_w1lh.svg';

export const JoinActivityForm = () => {
    const userId = localStorage.getItem('userId'); 
    const [open, setOpen] = React.useState(false);
    const [data, setData] = useState({
        userId: userId,
        activityKey: ""
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
        };
        axios
            .put(`${config[5].joinActivity}/${data.activityKey}/join`, activityData)
            .then((response) => {
                setOpen(false);
                setData({
                    activityKey: ""
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
                加入活動
            </div>
        </>
        <Dialog open={open} onClose={handleClose}>
            <div>
              <img className='modal-image' src={joinActivityImg} />
            </div>
            <DialogTitle>加入活動</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label={"activityKey"}
                    type="text"
                    name='activityKey'
                    value={data.activityKey}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button type='submit' onClick={handleSubmit}>加入</Button>
            </DialogActions>
        </Dialog>
      </div>
    );
}