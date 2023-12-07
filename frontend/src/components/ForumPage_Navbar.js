import React, { useEffect, useState } from 'react';
import config from '../config.json';
import axios from "axios";
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { Box, Toolbar, Tooltip, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, IconButton, Badge } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IdeaIcon from '../assets/IdeaIcon.png';
import QuestionIcon from '../assets/QuestionIcon.png';
import InformationIcon from '../assets/InformationIcon.png';
import FlaskIcon from '../assets/FlaskIcon.png';
import NoteIcon from '../assets/NoteIcon.png';
import CreateForumIcon from '../assets/CreateForumIcon.png';
import TaskMapIcon from '../assets/TaskMapIcon.png';
import LearningFeedbackIcon from '../assets/LearningFeedbackIcon.png';
import CommunityIcon from '../assets/CommunityIcon.png';
import AnnouncementIcon from '../assets/AnnouncementIcon.png';
import { CreateIdea } from './CreateIdea';
import { CreateQuestion } from './CreateQuestion';
import { CreateInformation } from './CreateInformation';
import { CreateFlask } from './CreateFlask';
import { CreateNote } from './CreateNote';

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
  { text: '新增想法', modalKey: 'createIdea', icon: IdeaIcon },
  { text: '新增提問', modalKey: 'createQuestion', icon: QuestionIcon },
  { text: '新增資訊', modalKey: 'createInformation', icon: InformationIcon },
  { text: '新增實驗', modalKey: 'createFlask', icon: FlaskIcon },
  { text: '新增紀錄', modalKey: 'createNote', icon: NoteIcon },
  { text: '新增想法牆', modalKey: 'createForum', icon: CreateForumIcon },
  { text: '任務地圖', modalKey: 'createTaskMap', icon: TaskMapIcon },
  { text: '學習歷程', modalKey: 'createLearningFeedback', icon: LearningFeedbackIcon },
];

const specialItems = ['新增想法牆','任務地圖', '學習歷程'];

export default function ForumPage_Navbar() {
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
        const response = await axios.get(`${config[6].enterActivity}/${localStorage.getItem('activityId')}`);
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
          <Typography variant="h6" noWrap component="div"  color="black" fontWeight="bolder">
            {activityData && (    // ensure that activityData is not null or undefined before trying to access its properties.
              <>
                {activityData.title}
              </>
            )}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Tooltip title='小組聊天室' arrow>
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge color="error">
                  <img alt='小組聊天室' src={CommunityIcon} width={24} height={24} />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title='任務公告' arrow>
              <IconButton size="large" aria-label="show new notifications" color="inherit">
                <Badge color="error">
                  <img alt='任務公告' src={AnnouncementIcon} width={24} height={24} />
                </Badge>
              </IconButton>
            </Tooltip>
          </Box>
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
              {specialItems.includes(menuItem.text) && index < menuItems.length - 2 && (
                <Divider />
              )}
            </div>
          ))}
        </List>
      </Drawer>
      {selectedModal === 'createIdea' && (
        <CreateIdea
          open={openModal}
          onClose={closeModal}
        />
      )}
      {selectedModal === 'createQuestion' && (
        <CreateQuestion
          open={openModal}
          onClose={closeModal}
        />
      )}
      {selectedModal === 'createInformation' && (
        <CreateInformation
          open={openModal}
          onClose={closeModal}
        />
      )}
      {selectedModal === 'createFlask' && (
        <CreateFlask
          open={openModal}
          onClose={closeModal}
        />
      )}
      {selectedModal === 'createNote' && (
        <CreateNote
          open={openModal}
          onClose={closeModal}
        />
      )}
    </nav>
  );
}