import { useSignIn } from 'react-auth-kit';
import config from '../config.json';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import loginImg from '../assets/undraw_login_re_4vu2.svg';
import { Register } from './Register';
import url from '../url.json';

export const Login = () => {
    const navigate = useNavigate();
    const login = useSignIn();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState('student');
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        // Checking if user is loggedIn
        if(isLoggedIn && role === 'student'){
            navigate("/index");
        } else if (isLoggedIn && role === 'teacher'){
            navigate("/teacher/index");
        } else {
            navigate("/");
        }
    }, [navigate, isLoggedIn, role]);

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

    const handleRoleChange = (event) => {
      setRole(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Hi")
        const userData = {
            email: data.email,
            password: data.password
        };
        console.log("userData: ", userData)
        await axios
            .post(url.backendHost + config[1].loginUrl, userData)
            .then((response) => {
                setIsLoggedIn(true)
                setOpen(false);
                setData({
                  email: "",
                  password: ""
                })
                
                login({
                    token: response.data.token,
                    expiresIn: 3600,
                    tokenType: "Bearer",
                    authState: { email: response.data.email },
                });

                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('name', response.data.name);
                localStorage.setItem('email', response.data.email);

                console.log("res: ", response.data)
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
                <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">身分</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        value={role}
                        onChange={handleRoleChange}
                    >
                        <FormControlLabel value="teacher" control={<Radio />} label="老師" />
                        <FormControlLabel value="student" control={<Radio />} label="學生" />
                    </RadioGroup>
                </FormControl>
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