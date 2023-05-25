import config from '../config.json';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import loginImg from '../assets/undraw_login_re_4vu2.svg';
import { Register } from './Register';

export const Login = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
      email: "",
      password: ""
    });
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [login, setLogin] = useState([]);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    // const login = () => {
    //   setEmail(email);
    //   setPassword(password);
    //   setOpen(false);
    //   console.log("The email sent is " + email + ", and password sent is " + password);
    // }

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
        email: data.email,
        password: data.password
      };
      axios.post(config.loginUrl, userData).then((response) => {
        console.log(response.status, response.data.token);
      });
    };
  
    return (
      <div>
        <>  
            <div onClick={handleClickOpen}>
                登入
            </div>
        </>
        <Dialog open={open} onClose={handleClose}>
            <div>
              <img src={loginImg} />
            </div>
            <DialogTitle>登入</DialogTitle>
            <DialogContent>
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
                <DialogContentText>
                    還沒有帳號嗎？<Link component="button" underline="none"><Register>註冊</Register></Link>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button type='submit' onClick={handleSubmit}>登入</Button>
            </DialogActions>
        </Dialog>
      </div>
    );
}