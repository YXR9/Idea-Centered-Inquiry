import config from '../config.json';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import IndexPage_Navbar from '../components/IndexPage_Navbar';
import { styled, Grid, Card, CardHeader, CardContent, IconButton, Typography, Select, InputLabel, MenuItem, FormControl, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Collapse from '@mui/material/Collapse';
import io from 'socket.io-client';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#E3DFFD',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Index() {
  const [all, setAll] = useState('');
  const [activities, setActivities] = useState([]);
  const [ws, setWs] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChange = (event) => {
    setAll(event.target.value);
  };

  const connectWebSocket = () => {
    console.log('😮😮😮');
    setWs(io("http://127.0.0.1:8000"));
  }

  useEffect(() => {
    const getActivities = async() => {
      console.log("我在這裡!!!看我!!!")
      try{
        const fetchData = await axios.get(`${config[4].myJoinedActivityList}/${localStorage.getItem('userId')}`, {
          headers: {
            authorization: 'Bearer JWT Token',
          },
        })
        setActivities(fetchData.data)
        console.log(fetchData);
      }
      catch (err){
        console.log(err)
      }
    };
    getActivities();

    if(ws){
      console.log('success connect!');
      initWebSocket();
    }
  }, [ws]); // 空的依賴陣列確保 `useEffect` 只執行一次，相當於 `componentDidMount`

  const initWebSocket = () => {
    console.log("initWebSocket1", ws);
    ws.on("connect", () => {
      console.log(ws.id); // x8WIv7-mJelg7on_ALbx
    });
    ws.on("event02", (arg,callback) => {
      console.log(arg); // world
      callback({
        status: "event02 ok"
      })
    });
    console.log("initWebSocket2", ws);

  };

  const sendMessage = () => {
    console.log("event01!!!", ws);
    ws.emit('event01', '回傳發送訊息的...', (response) => {
      console.log(response.status); // ok
    });
    console.log("event01!!!!!!!");
  };

  return (
    <div className="home-container">
      <IndexPage_Navbar />
      <h2>我們的探究活動</h2>
      {/* <input type='button' value='連線' onClick={connectWebSocket} />
      <input type='button' value='送出' onClick={sendMessage} /> */}
      <Box sx={{ maxWidth: 120 }} className='activity-status'>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">狀態</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={all}
            label="狀態"
            onChange={handleChange}
          >
            <MenuItem value={10}>全部</MenuItem>
            <MenuItem value={20}>已完成</MenuItem>
            <MenuItem value={30}>進行中</MenuItem>
            <MenuItem value={30}>未開始</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
      >
        <Grid item xs={10}>
          <Grid container justifyContent="center" spacing={5}>
            {activities.map((activity) => (
              <Grid item xs={3} key={activity.id}>
                <Item>
                  <CardHeader
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={activity.ActivityGroup.Activity.title}
                    // subheader={activity.activityKey}
                  />
                  {/* <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {activity.ActivityGroup.Activity.startDate}-{activity.ActivityGroup.Activity.endDate}
                    </Typography>
                  </CardContent> */}
                  <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>{activity.ActivityGroup.Activity.content}</Typography>
                    </CardContent>
                  </Collapse>
                </Item>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}