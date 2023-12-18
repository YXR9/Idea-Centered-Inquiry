import config from '../config.json';
import axios from "axios";
import React, { useState } from 'react';
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormHelperText, TextField, InputLabel, Box } from '@mui/material';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { sendMessage } from '../utils/socketTool';
import io from 'socket.io-client';

export const CreateNote = ({ open, onClose }) => {
    const name = localStorage.getItem('name');
    const ws = io.connect('http://127.0.0.1:8000');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [content, setContent] = useState();
    const [data, setData] = useState({
      title: "",
      content: content,
      tags: "record",
      author: name,
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
                console.log("3",typeof ws);
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
      } else {
        return alert("請確定以下項目： \n1. 標題及內容都已輸入\n2. 標題長度不超過15個字");
      }
    };

    return (
      <>
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth="md"
          scroll='body'
        >
          <DialogTitle>新增紀錄</DialogTitle>
          <Divider variant="middle" />
          <DialogContent>
            <FormControl variant="standard" fullWidth>
              <TextField
                required
                id="standard-required"
                autoFocus
                margin="dense"
                label={"title"}
                type="text"
                name='title'
                value={data.title}
                fullWidth
                variant="standard"
                onChange={handleChange}
                inputProps={{ maxLength: 15 }}
              />
              <FormHelperText id="component-helper-text">
                請為你紀錄下一個標題，讓其他同學能更快速的了解你紀錄了什麼內容！
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