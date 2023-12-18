import React, { useState, useEffect } from 'react';
import config from '../config.json';
import axios from "axios";
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { styled, Card, CardHeader, CardContent, Typography, CardActions, IconButton, Collapse, List, ListItem, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InboxIcon from '@mui/icons-material/Inbox';
import { createSvgIcon } from '@mui/material/utils';
import { Button } from '@mui/base';
import { sendMessage } from '../utils/socketTool';
import url from '../url.json';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#E3DFFD',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const EnterActivity = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
}));

const PlusIcon = createSvgIcon(
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>,
    'Plus',
);
  
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

export default function MyCreatedActivityCard({ activity }) {
    const ws = io.connect(url.backendHost);
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [groupData, setGroupData] = useState([]);

    const initWebSocket = () => {
      ws.on('connect', () => {
        console.log("WebSocket connected");
      });
    
      ws.on('event02', (arg, callback) => {
        console.log("WebSocket event02", arg);
        callback({
          status: 'event02 ok',
        });
      });
    };

    useEffect(() => {
        if (ws) {
          initWebSocket();
        }
    }, []);

    const getGroups = async () => {
        try {
          const fetchData = await axios.get(url.backendHost + config[15].findAllGroup + localStorage.getItem('activityId'), {
            headers: {
              authorization: 'Bearer JWT Token',
            },
          });
          console.log("GroupData: ", fetchData.data.Groups);
          setGroupData(fetchData.data.Groups);
        } catch (err) {
          console.log(err);
        }
    };
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
      localStorage.setItem('activityId', activity.id);
      getGroups();
    };

    const formatTimestamp = (timestamp) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            //   second: 'numeric',
            hour12: false,
        }).format(new Date(timestamp));
    };

    const createGroup = (e) => {
        const groupData = {
            activityId: localStorage.getItem('activityId'),
            numGroups: 1
        }

        axios
            .post(url.backendHost + config[14].creatGroup, groupData)
            .then((response) => {
                console.log(response.status, response.data);
                console.log("14",typeof ws);
                sendMessage(ws);
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
    }

    const handleEnter = async (e) => {
        e.preventDefault();
        localStorage.setItem('activityId', activity.id);
        navigate("/forum");
    };

    return (
    <div>
        <Item>
            <CardHeader
                title={activity.title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {`${formatTimestamp(activity.startDate)} ~ ${formatTimestamp(activity.endDate)}`}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add group" onClick={createGroup}>
                    <PlusIcon />
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
                <List>
                    {groupData.map((group) => (
                        <ListItem key={group.joinCode} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={group.joinCode} />
                            </ListItemButton>
                        </ListItem>
                    ))}            
                </List>
            </Collapse>
        </Item>
    </div>
  );
}