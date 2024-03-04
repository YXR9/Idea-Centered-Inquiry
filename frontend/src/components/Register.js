import config from '../config.json';
import axios from "axios";
import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import registerImg from '../assets/undraw_mobile_payments_re_7udl.svg';
import { Login } from './Login';
import url from '../url.json';

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
            .post(url.backendHost + config[0].registerUrl, userData)
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
            <DialogTitle>註冊帳號</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label={"請填寫您的姓名"}
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
                    label={"請填寫信箱"}
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
                    label={"請填寫密碼"}
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
                    label={"請填入確認密碼，確認密碼必須與上面的「密碼」相同"}
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
                    label={"請填寫目前就讀的學校"}
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
                    label={"請填寫所在城市"}
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