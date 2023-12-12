import config from '../config.json';
import axios from "axios";
import React, { useState } from 'react';
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormHelperText, TextField, InputLabel, Box } from '@mui/material';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { sendMessage } from '../utils/socketTool';
import io from 'socket.io-client';
import urls from '../url.json';

export const CreateQuestion = ({ open, onClose }) => {
    const userId = localStorage.getItem('userId');
    const ws = io.connect('http://'+urls["socket.io"]+':8000');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [content, setContent] = useState();
    const [data, setData] = useState({
      title: "",
      content: content,
      tags: "question",
      author: userId,
      groupId: localStorage.getItem('groupId')
    });
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
      const ideaData = {
        title: data.title,
        content: data.content,
        tags: data.tags,
        author: data.author,
        groupId: data.groupId
      };
      axios
          .post(config[7].createNode, ideaData)
          .then((response) => {
              onClose(onClose);
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
              } else if (error.request) {
                  console.log("network error");
              } else {
                  console.log(error);
              }
          });
    };

    return (
      <>
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth="md"
          scroll='body'
        >
          <DialogTitle>新增提問</DialogTitle>
          <Divider variant="middle" />
          <DialogContent>
            <FormControl variant="standard" fullWidth>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label={"title"}
                type="text"
                name='title'
                value={data.title}
                fullWidth
                variant="standard"
                onChange={handleChange}
              />
              <FormHelperText id="component-helper-text">
                請為你提問下一個標題，讓其他同學能更快速的了解你想了解什麼！
              </FormHelperText>
            </FormControl>
            <Editor
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>取消</Button>
            <Button type='submit' onClick={handleSubmit}>送出</Button>
          </DialogActions>
        </Dialog>
      </>
    );
}