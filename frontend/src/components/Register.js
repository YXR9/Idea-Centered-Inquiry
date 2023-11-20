import config from '../config.json';
import axios from "axios";
import React, { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import registerImg from '../assets/undraw_mobile_payments_re_7udl.svg';
import { Login } from './Login';

export const Register = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConf: "",
        school: "",
        city: ""
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
        const userData = {
            name: data.name,
            email: data.email,
            password: data.password,
            passwordConf: data.passwordConf,
            school: data.school,
            city: data.city
        };
        axios
            .post(config[0].registerUrl, userData)
            .then((response) => {
                setOpen(false);
                setData({
                    name: "",
                    email: "",
                    password: "",
                    passwordConf: "",
                    school: "",
                    city: ""
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
                註冊
            </div>
        </>
        <Dialog open={open} onClose={handleClose}>
            <div>
              <img className='modal-image' src={registerImg} />
            </div>
            <DialogTitle>註冊</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label={"name"}
                    type="text"
                    name='name'
                    value={data.name}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label={"email"}
                    type="email"
                    name='email'
                    value={data.email}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label={"password"}
                    type="password"
                    name='password'
                    value={data.password}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label={"passwordConf"}
                    type="password"
                    name='passwordConf'
                    value={data.passwordConf}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label={"school"}
                    type="text"
                    name='school'
                    value={data.school}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label={"city"}
                    type="text"
                    name='city'
                    value={data.city}
                    fullWidth
                    variant="standard"
                    onChange={handleChange}
                />
                <DialogContentText>
                    已經有帳號了嗎？<Link component="button" underline="none"><Login>登入</Login></Link>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button type='submit' onClick={handleSubmit}>註冊</Button>
            </DialogActions>
        </Dialog>
      </div>
    );
}