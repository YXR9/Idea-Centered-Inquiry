import React, { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from '@mui/material';
import registerImg from '../assets/undraw_mobile_payments_re_7udl.svg';
import { Login } from './Login';

export const Register = () => {
    const [open, setOpen] = React.useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");
    const [school, setSchool] = useState("");
    const [city, setCity] = useState("");
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const register = () => {
      setUsername(username);
      setEmail(email);
      setPassword(password);
      setPasswordConf(passwordConf);
      setSchool(school);
      setCity(city);
      setOpen(false);
      console.log(username, email, password, passwordConf, school, city);
    }
  
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
                    label={"username"}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(event) => setUsername(event.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label={"email"}
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label={"password"}
                    type="password"
                    fullWidth
                    variant="standard"
                    onChange={(event) => setPassword(event.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label={"passwordConf"}
                    type="password"
                    fullWidth
                    variant="standard"
                    onChange={(event) => setPasswordConf(event.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label={"school"}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(event) => setSchool(event.target.value)}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label={"city"}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(event) => setCity(event.target.value)}
                />
                <DialogContentText>
                    已經有帳號了嗎？<Link component="button" underline="none"><Login>登入</Login></Link>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={register}>註冊</Button>
            </DialogActions>
        </Dialog>
      </div>
    );
}
