import config from '../config.json';
import axios from "axios";
import React, {useState, useEffect, useRef} from 'react';
import IndexPage_Navbar from '../components/IndexPage_Navbar';
import { styled, Grid, Avatar, Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Typography, Select, InputLabel, MenuItem, FormControl, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { json } from 'react-router-dom';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#E3DFFD',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

export default function Index() {
    const userId = localStorage.getItem('userId');

    const [all, setAll] = useState('');
    const [activities, setActivities] = useState([]);

    const handleChange = (event) => {
      setAll(event.target.value);
    };

    const getActivities = async() => {
      console.log("我在這裡!!!看我!!!");
      try{
        console.log(localStorage.getItem('userId'));
        
        // 建立 WebSocket 連線
        const fetchData = await axios.get(`${config[3].activityList}/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer JWT Token',
          },
        })
        setActivities(fetchData.data)
        console.log("📌fetchData:", fetchData);
      }
      catch (err){
        console.log(err);
      }
    };

    useEffect(() => {
        // 建立 WebSocket 連線
        const socket = new WebSocket(`ws://${config[3].websocket}/user/${userId}`);
        
        // 監聽 WebSocket 事件
        socket.addEventListener('message', (event) => {
          // 有新資料時，重新取得資料
          getActivities();
        });
      
        // 在 component 卸載時關閉 WebSocket 連線
        return () => {
          socket.close();
        };
    }, []);

    return (
      <div className="home-container">
            <IndexPage_Navbar/>
            <h2>
                我們的探究活動
            </h2>
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
                <Grid container justifyContent="center" spacing={4}>
                  {activities.map((activity) => (
                    <Grid item xs={6}>
                        <Item>
                            <CardHeader
                              action={
                                <IconButton aria-label="settings">
                                  <MoreVertIcon />
                                </IconButton>
                              }
                              title={activity.title}
                              subheader={activity.activityKey}
                            />
                            <CardContent>
                              <Typography variant="body2" color="text.secondary">
                                {activity.startDate}-{activity.endDate}
                              </Typography>
                            </CardContent>
                        </Item>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
      </div>
    )
}
