import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config.json';
import io from 'socket.io-client';
import PrepareLessonsPage_Navbar from '../../components/PrepareLessonsPage_Navbar';
import { Button, FormControl, FormHelperText, TextField, List, ListItem, IconButton, ListSubheader, ListItemButton, ListItemText } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { sendMessage } from '../../utils/socketTool';
import url from '../../url.json';

export default function PrepareLessons() {
  const name = localStorage.getItem('name');
    const ws = io.connect(url.backendHost);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [groupData, setGroupData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState();
    const [data, setData] = useState({
      title: "",
      content: content,
      tags: "question",
      author: name,
      groupId: localStorage.getItem('groupId')
    });

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
        getGroups();
      }
  }, []);

    const onEditorStateChange = function (editorState) {
      setEditorState(editorState);
      let content = editorState.getCurrentContent().getPlainText("\u0001");
      setData({
        ...data,
        content: content,
      });
      console.log("content: ", content);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const isTitleValid = data.title.trim().length > 0;
      const titleValidLength = data.title.trim().length < 15;
      if(
        isTitleValid && 
        titleValidLength &&
        editorState.getCurrentContent().hasText() &&
        editorState.getCurrentContent().getPlainText().length > 0
      ) {
        const ideaData = {
          title: data.title,
          content: data.content,
          tags: data.tags,
          author: data.author,
          groupId: data.groupId
        };
      
        setLoading(true);
        axios
            .post(url.backendHost + config[7].createNode, ideaData)
            .then((response) => {
                setLoading(false);
                setData({
                  title: "",
                  content: "",
                  tags: "",
                  author: "",
                  groupId: ""
                })
                console.log(response.status, response.data);
                console.log("4",typeof ws);
                sendMessage(ws);
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    console.log("server responded");
                    setLoading(false);
                } else if (error.request) {
                    console.log("network error");
                    setLoading(false);
                } else {
                    console.log(error);
                    setLoading(false);
                }
            });
      }
    };

  return (
    <div className="home-container">
      <PrepareLessonsPage_Navbar/>
      <h3>
      <FormControl variant="standard">
          <TextField
            required
            id="standard-required"
            autoFocus
            margin="dense"
            label={"關鍵提問標題"}
            type="text"
            name='title'
            value={data.title}
            fullWidth
            sx={{ m: 1 }}
            variant="standard"
            onChange={handleChange}
            inputProps={{ maxLength: 15 }}
          />
          <FormHelperText id="component-helper-text">
            請為你關鍵提問定義標題，讓學生能更快速的了解你的關鍵提問內容！
          </FormHelperText>
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
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
                      <IconButton edge="end" aria-label="send">
                        <LoadingButton
                          type='submit'
                          onClick={async (e) => {
                            e.preventDefault(); // Ensure 'e' is defined
                            localStorage.setItem('groupId', group.id);
                            await handleSubmit(e)
                          }}
                          loading={loading}
                          loadingPosition="start"
                          variant="contained"
                        >
                          送出
                        </LoadingButton>
                      </IconButton>
                    }
                  >
                      <ListItemButton>
                          <ListItemText primary={group.groupName} />
                      </ListItemButton>
                  </ListItem>
              ))}            
          </List>
        </FormControl>
      </h3>
    </div>
  );
}