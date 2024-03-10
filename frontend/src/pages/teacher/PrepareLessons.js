import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config.json';
import io from 'socket.io-client';
import PrepareLessonsPage_Navbar from '../../components/PrepareLessonsPage_Navbar';
import {
  Button,
  FormControl,
  FormHelperText,
  TextField,
  List,
  ListItem,
  IconButton,
  ListSubheader,
  ListItemButton,
  ListItemText,
  Checkbox,
} from '@mui/material';
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
    title: '',
    content: content,
    tags: 'question',
    author: name,
    groupId: localStorage.getItem('groupId'),
  });

  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const getGroups = async () => {
    try {
      const fetchData = await axios.get(url.backendHost + config[15].findAllGroup + localStorage.getItem('activityId'), {
        headers: {
          authorization: 'Bearer JWT Token',
        },
      });
      console.log('GroupData: ', fetchData.data.Groups);
      setGroupData(fetchData.data.Groups);
    } catch (err) {
      console.log(err);
    }
  };

  const initWebSocket = () => {
    ws.on('connect', () => {
      console.log('WebSocket connected');
    });

    ws.on('event02', (arg, callback) => {
      console.log('WebSocket event02', arg);
      callback({
        status: 'event02 ok',
      });
    });
  };

  const resetForm = () => {
    setEditorState(EditorState.createEmpty());
    setData({
      title: '',
      content: '',
      tags: 'question',
      author: name,
      groupId: localStorage.getItem('groupId'),
    });
    setSelectedGroups([]); // Clear selected groups
    setSelectAll(false); // Reset selectAll
    initWebSocket();
    getGroups();
  };

  useEffect(() => {
    if (ws) {
      initWebSocket();
      getGroups();
    }
  }, []);

  const onEditorStateChange = function (editorState) {
    setEditorState(editorState);
    let content = editorState.getCurrentContent().getPlainText('\u0001');
    setData({
      ...data,
      content: content,
    });
    console.log('content: ', content);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const toggleGroupSelection = (groupId) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter((id) => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  };

  const handleSelectAll = () => {
    const allGroupIds = groupData.map(group => group.id);
    setSelectedGroups(selectAll ? [] : allGroupIds);
    setSelectAll(!selectAll);
  };   

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isTitleValid = data.title.trim().length > 0;
    const titleValidLength = data.title.trim().length < 15;

    if (
      isTitleValid &&
      titleValidLength &&
      editorState.getCurrentContent().hasText() &&
      editorState.getCurrentContent().getPlainText().length > 0 &&
      selectedGroups.length > 0
    ) {
      setLoading(true);

      const ideaData = {
        title: data.title,
        content: data.content,
        tags: data.tags,
        author: data.author,
      };

      try {
        await Promise.all(
          selectedGroups.map(async (groupId) => {
            ideaData.groupId = groupId;
            const response = await axios.post(url.backendHost + config[7].createNode, ideaData);
            console.log(response.status, response.data);
          })
        );

        setLoading(false);
        resetForm(); // Reset the form after successful submission
        console.log('4', typeof ws);
        sendMessage(ws);
      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="home-container">
      <PrepareLessonsPage_Navbar />
      <h3>
        <FormControl variant="standard">
          <TextField
            required
            id="standard-required"
            autoFocus
            margin="dense"
            label={'關鍵提問標題'}
            type="text"
            name="title"
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
            <Button onClick={handleSelectAll}>全選</Button>
            {groupData.map((group) => (
              <ListItem key={group.joinCode} disablePadding>
                <ListItemButton>
                  <ListItemText primary={group.groupName} />
                  <Checkbox
                    checked={selectedGroups.includes(group.id)}
                    onChange={() => toggleGroupSelection(group.id)}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <LoadingButton
            type="submit"
            onClick={handleSubmit}
            loading={loading}
            loadingPosition="start"
            variant="contained"
          >
            送出
          </LoadingButton>
        </FormControl>
      </h3>
    </div>
  );
}