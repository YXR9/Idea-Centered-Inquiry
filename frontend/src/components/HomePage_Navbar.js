import React, { useState } from 'react';
import Logo from "../assets/idea centered inquiry_logo.png";
import { HiOutlineBars3 } from 'react-icons/hi2';
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import { List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Drawer } from "@mui/material"
import { Box } from '@mui/system';
import { Register } from './Register';
import { Login } from './Login'

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false)

  const menuOptions = [
    {
      text: "首頁",
      icon: <HomeIcon />,
    },
    {
      text: "關於",
      icon: <InfoIcon />,
    },
    {
      text: "登入",
      icon: <Login/>,
    },
    {
      text: "註冊",
      icon: <Register/>,
    }
  ];
  return (
    <nav>
      <div className='nav-logo-container'>
        <img alt='' src={Logo} width={250} height={250} />
      </div>
      <div className="navbar-links-container">
        <a href=''>首頁</a>
        <a href=''>關於</a>
        <button className='login-button'>
          <Login />
        </button>
        <button className='register-button'>
          <Register />
        </button>
      </div>
      <div className='navbar-menu-container'>
        <HiOutlineBars3 onClick={() => setOpenMenu(true)} />
      </div>
      <Drawer open={openMenu} onClose={() => setOpenMenu(false)} anchor='right'>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setOpenMenu(false)}
          onKeyDown={() => setOpenMenu(false)}
        >
          <List>
            {menuOptions.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </nav>
  )
}