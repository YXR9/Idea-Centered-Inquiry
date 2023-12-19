import React, { useState, useEffect } from 'react';
import config from '../config.json';
import axios from "axios";
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { styled, Card, CardHeader, CardContent, Typography, CardActions, IconButton, Collapse, List, ListItem, ListSubheader, ListItemButton, ListItemText } from '@mui/material';
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
            groupName: "第 N 組",
            activityId: localStorage.getItem('activityId'),
            numGroups: 1
        }

        axios
            .post(url.backendHost + config[14].creatGroup, groupData)
            .then((response) => {
                console.log(response.status, response.data);

                localStorage.setItem('joinCode', response.data.groups[0].joinCode);

                console.log("14",typeof ws);
                sendMessage(ws);

                const activityData = {
                    userId: localStorage.getItem('userId'),
                };
                axios
                    .put(`${url.backendHost + config[5].joinActivity}/${response.data.groups[0].joinCode}/join`, activityData)
                    .then((response) => {
                        console.log(response.status, response.data);
                        window.location.reload(false);
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
                <Button className='enter-activity-button' onClick={createGroup}>
                    新增小組
                </Button>
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
                <List
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            小組列表
                        </ListSubheader>
                    }
                >
                    {groupData.map((group) => (
                        <ListItem
                          key={group.joinCode}
                          disablePadding
                          secondaryAction={
                            <EnterActivity>
                                <Button className='enter-activity-button' onClick={handleEnter}>
                                    進入小組
                                </Button>
                            </EnterActivity>
                          }
                        >
                            <ListItemButton>
                                <ListItemText primary={group.groupName} secondary={"小組邀請碼：" + group.joinCode} />
                            </ListItemButton>
                        </ListItem>
                    ))}            
                </List>
            </Collapse>
        </Item>
    </div>
  );
}