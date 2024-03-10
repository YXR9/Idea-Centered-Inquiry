import React, { useState, useEffect } from 'react';
import config from '../config.json';
import axios from "axios";
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { styled, Card, CardHeader, CardContent, Typography, CardActions, IconButton, Menu, MenuItem, Collapse, List, ListItem, ListItemIcon, ListSubheader, ListItemButton, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AssignmentIcon from '../assets/assignment.svg'
import EditIcon from '../assets/edit.svg';
import TrashIcon from '../assets/trash.svg';
import ActivityGroupingIcon from '../assets/group.svg'
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

const ITEM_HEIGHT = 48;

export default function MyCreatedActivityCard({ activity }) {
    const ws = io.connect(url.backendHost);
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [groupData, setGroupData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedModal, setSelectedModal] = useState(null);
    const [selectedModalOpen, setSelectedModalOpen] = useState(false);
    
    const open = Boolean(anchorEl);

    const options = [
      { text: '進入備課區', modalKey: 'enterPageOfPrepareLesson', icon: AssignmentIcon },
      { text: '學生分組', modalKey: 'activityGrouping', icon: ActivityGroupingIcon },
      { text: '編輯活動資訊', modalKey: 'editInformationOfActivity', icon: EditIcon },
      { text: '刪除', modalKey: 'deleteActivity', icon: TrashIcon },
    ];
    
    const handleClickMore = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleCloseMore = () => {
      setAnchorEl(null);
    };

    const openModal = (modalKey) => {
      setSelectedModal(modalKey);
      setSelectedModalOpen(true);
    };

    const closeModal = () => {
      setSelectedModal(null);
      setSelectedModalOpen(false);
    };

    const openInNewTab = (url) => {
      window.open(url, "_blank", "noreferrer");
      setSelectedModal(null)
    }

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
      axios
      .get(url.backendHost + config[15].findAllGroup + localStorage.getItem('activityId'), {
          headers: {
              authorization: 'Bearer JWT Token',
          },
      })
      .then(async (response) => {
          const existingGroups = response.data.Groups;
          const nextGroupNumber = existingGroups.length + 1;
          const groupName = `第${nextGroupNumber}組`;

          const groupData = {
              groupName: groupName,
              activityId: localStorage.getItem('activityId'),
              numGroups: 1,
          };

          try {
              const createGroupResponse = await axios.post(url.backendHost + config[14].creatGroup, groupData);
              console.log(createGroupResponse.status, createGroupResponse.data);
              sendMessage(ws);

              const activityData = {
                  userId: localStorage.getItem('userId'),
              };

              const joinGroupResponse = await axios.put(
                  `${url.backendHost + config[5].joinActivity}/${createGroupResponse.data.groups[0].joinCode}/join`,
                  activityData
              );

              console.log(joinGroupResponse.status, joinGroupResponse.data);
              window.location.reload(false);
          } catch (error) {
              if (error.response) {
                  console.log(error.response);
                  console.log("server responded");
              } else if (error.request) {
                  console.log("network error");
              } else {
                  console.log(error);
              }
          }
      })
      .catch((error) => {
          console.log(error);
      });
    }

    const handleEnter = async (e) => {
      e.preventDefault();
      localStorage.setItem('activityId', activity.id);

      axios.get(`${url.backendHost + config[16].EnterDifferentGroup}${localStorage.getItem('joinCode')}/${localStorage.getItem('userId')}`, {
        headers: {
          authorization: 'Bearer JWT Token',
        },
      }).then((response) => {
          console.log("groupData:response ", response.data.data[0].id);
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

      navigate("/forum");
    };

    return (
    <div>
        <Item>
            <CardHeader
                action={
                  <>
                      <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={open ? 'long-menu' : undefined}
                          aria-expanded={open ? 'true' : undefined}
                          aria-haspopup="true"
                          onClick={handleClickMore}
                      >
                          <MoreVertIcon />
                      </IconButton>
                      <Menu
                          id="long-menu"
                          MenuListProps={{
                            'aria-labelledby': 'long-button',
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleCloseMore}
                          PaperProps={{
                              style: {
                                  maxHeight: ITEM_HEIGHT * 4.5,
                                  width: '20ch',
                              },
                          }}
                      >
                          {options.map((option) => (
                              <MenuItem key={option.modalKey} onClick={() => openModal(option.modalKey)}>
                                  <ListItemIcon
                                      sx={{
                                          minWidth: 0,
                                          maxWidth: 24,
                                          mr: open ? 3 : 'auto',
                                          justifyContent: 'center',
                                      }}
                                  >
                                      <img alt='' src={option.icon} />
                                  </ListItemIcon>
                                  <ListItemText primary={option.text} sx={{ opacity: open ? 1 : 0 }} style={{ color: '#8B8B8B' }} />
                              </MenuItem>
                          ))}
                      </Menu>
                  </>
                }
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
                                <Button className='enter-activity-button' onClick={(e) => {localStorage.setItem('groupId', group.id); localStorage.setItem('joinCode', group.joinCode); handleEnter(e);}}>
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
        {selectedModal === 'enterPageOfPrepareLesson' && (
            openInNewTab("./pageOfPrepareLesson")
        )}
        {selectedModal === 'editInformationOfActivity' && (
            <CreateIdea
                open={openModal}
                onClose={closeModal}
            />
        )}
        {selectedModal === 'editInformationOfActivity' && (
            <CreateIdea
                open={openModal}
                onClose={closeModal}
            />
        )}
    </div>
  );
}