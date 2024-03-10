import React, { useEffect, useState } from 'react';
import config from '../config.json';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { Box, Toolbar, Tooltip, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, IconButton, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BackToHomeIcon from '../assets/返回首頁icon.png';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ForumIcon from '../assets/返回論壇icon.png';
import ActivityGroupingIcon from '../assets/group.svg';
import EditIcon from '../assets/edit.svg';
import { CreateIdea } from './CreateIdea';
import { CreateQuestion } from './CreateQuestion';
import { CreateInformation } from './CreateInformation';
import { CreateFlask } from './CreateFlask';
import { CreateNote } from './CreateNote';
import { CreateActivityForm } from './CreateActivityForm';
import url from '../url.json';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const menuItems = [
  { text: '學生分組', modalKey: 'activityGrouping', icon: ActivityGroupingIcon },
  { text: '編輯活動資訊', modalKey: 'editInformationOfActivity', icon: EditIcon },
];

export default function PrepareLessonsPage_Navbar() {
  const navigate = useNavigate();
  const [activityData, setActivityData] = useState(null);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);
  const [selectedModalOpen, setSelectedModalOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const openModal = (modalKey) => {
    setSelectedModal(modalKey);
    setSelectedModalOpen(true);
  };

  const closeModal = () => {
    setSelectedModal(null);
    setSelectedModalOpen(false);
  };

  const selectedItemStyle = {
    backgroundColor: 'red'
  }

  useEffect(() => {
    const getActivityData = async () => {
      try {
        const response = await axios.get(`${url.backendHost + config[6].enterActivity}/${localStorage.getItem('activityId')}`);
        setActivityData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getActivityData();
  }, []);

  return (
    <nav>
      {/* <AppBar position="fixed" open={open} style={{ background: 'transparent', boxShadow: 'none'}}> */}
      <AppBar position="fixed" open={open} style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon color="primary" style={{ color: '#8B8B8B', background: 'white', boxShadow: 'none'}}/>
            </IconButton>
            <Tooltip title='返回首頁' arrow>
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={()=>{navigate(-1)}}
                >
                  <Badge color="error">
                    <img alt='返回首頁' src={BackToHomeIcon} width={24} height={24} />
                  </Badge>
                </IconButton>
              </Tooltip>
            <Typography variant="h6" noWrap component="div"  color="black" fontWeight="bolder">
              派發活動任務
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            {/* <div className='nav-buttons'>
                <button className='create-activity-button' style={{ marginTop: '20px' }}>
                  <CreateActivityForm/>
                </button>
            </div> */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((menuItem, index) => (
            <div key={menuItem.text}>
              <ListItem selectedItemStyle={selectedItemStyle} disablePadding sx={{ display: 'block' }}>
                <Tooltip title={menuItem.text} arrow placement="right">
                  <ListItemButton
                    sx={{
                      minHeight: 60,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={() => openModal(menuItem.modalKey)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        maxWidth: 24,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      <img alt='' src={menuItem.icon} />
                    </ListItemIcon>
                    <ListItemText primary={menuItem.text} sx={{ opacity: open ? 1 : 0 }} style={{ color: '#8B8B8B' }} />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            </div>
          ))}
        </List>
      </Drawer>
      {selectedModal === 'activityGrouping' && (
        <CreateIdea
          open={openModal}
          onClose={closeModal}
        />
      )}
      {selectedModal === 'editInformationOfActivity' && (
        <CreateQuestion
          open={openModal}
          onClose={closeModal}
        />
      )}
    </nav>
  );
}