import React, { useEffect, useState } from 'react';
import config from '../config.json';
import axios from "axios";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IdeaIcon from '../assets/idea.png';
import QuestionIcon from '../assets/question-mark.png';
import InformationIcon from '../assets/information.png';
import FlaskIcon from '../assets/flask.png';
import NoteIcon from '../assets/notes.png';
import CreateForumIcon from '../assets/forum.png';
import TaskMapIcon from '../assets/map.png';
import LearningFeedbackIcon from '../assets/good-feedback.png';
import CommunityIcon from '../assets/小組協作icon.png';
import AskToTeacherIcon from '../assets/老師求救(舉手)icon.png';
import AnnouncementIcon from '../assets/任務公告icon.png';

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

const iconMapping = {
  '新增想法': IdeaIcon,
  '新增提問': QuestionIcon,
  '新增資訊': InformationIcon,
  '新增實驗': FlaskIcon,
  '新增紀錄': NoteIcon,
  '新增討論區': CreateForumIcon,
  '任務地圖': TaskMapIcon,
  '學習歷程': LearningFeedbackIcon,
};

const menuItems = [
  '新增想法',
  '新增提問',
  '新增資訊',
  '新增實驗',
  '新增紀錄',
  '新增討論區',
  '任務地圖',
  '學習歷程',
];

const specialItems = ['新增討論區','任務地圖', '學習歷程'];

export default function ForumPage_Navbar() {
  const [activityData, setActivityData] = useState(null);
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
    <nav sx={{ display: 'flex' }}>
      <CssBaseline />
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
            {/* <MenuIcon color="primary" /> */}
          </IconButton>
          <Typography variant="h6" noWrap component="div"  color="primary">
            {activityData && (    // ensure that activityData is not null or undefined before trying to access its properties.
              <>
                {activityData.title}
              </>
            )}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge color="error">
                <img alt='小組討論' src={CommunityIcon} width={50} height={50} />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show new notifications" color="inherit">
              <Badge color="error">
                <img alt='學生提問' src={AskToTeacherIcon} width={50} height={50} />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show new notifications" color="inherit">
              <Badge color="error">
                <img alt='任務公告' src={AnnouncementIcon} width={50} height={50} />
              </Badge>
            </IconButton>
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
          {menuItems.map((text, index) => (
            <div key={text}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      maxWidth: 54,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <img alt='' src={iconMapping[text]} />
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
              {specialItems.includes(text) && index < menuItems.length - 2 && (
                <Divider />
              )}
            </div>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </nav>
  );
}
