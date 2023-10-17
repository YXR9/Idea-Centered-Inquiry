import config from '../config.json';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import IndexPage_Navbar from '../components/IndexPage_Navbar';
import {
  Grid,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import io from 'socket.io-client';
import ActivityCard from '../components/ActivityCard';

export default function Index() {
  const [all, setAll] = useState('');
  const [activities, setActivities] = useState([]);
  const [ws, setWs] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event) => {
    setAll(event.target.value);
  };

  const connectWebSocket = () => {
    setWs(io('http://127.0.0.1:8000'));
  };

  useEffect(() => {
    const getActivities = async () => {
      try {
        const fetchData = await axios.get(`${config[4].myJoinedActivityList}/${localStorage.getItem('userId')}`, {
          headers: {
            authorization: 'Bearer JWT Token',
          },
        });
        setActivities(fetchData.data);
      } catch (err) {
        console.log(err);
      }
    };
    getActivities();

    if (ws) {
      initWebSocket();
    }
  }, [ws]);

  const initWebSocket = () => {
    ws.on('connect', () => {
      console.log(ws.id);
    });

    ws.on('event02', (arg, callback) => {
      console.log(arg);
      callback({
        status: 'event02 ok',
      });
    });
  };

  const sendMessage = () => {
    ws.emit('event01', '回傳發送訊息的...', (response) => {
      console.log(response.status);
    });
  };

  return (
    <div className="home-container">
      <IndexPage_Navbar />
      <h2>我們的探究活動</h2>
      <Box sx={{ maxWidth: 120 }} className="activity-status">
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
        spacing={3}
        style={{ padding: '0px 30px' }}
      >
        {activities.map((activity) => (
          <Grid item xs={12} sm={isMobile ? 8 : 4} key={activity.id}>
            <ActivityCard activity={activity} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}