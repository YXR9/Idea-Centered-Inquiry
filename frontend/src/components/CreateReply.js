import config from '../config.json';
import axios from "axios";
import React, { useState } from 'react';
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormHelperText, TextField, InputLabel, Box } from '@mui/material';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { sendMessage } from '../utils/socketTool';
import io from 'socket.io-client';

export const CreateReply = ({ open, onClose }) => {
    const userId = localStorage.getItem('userId');
    const ws = io.connect('http://127.0.0.1:8000');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [content, setContent] = useState();
    const [data, setData] = useState({
      title: "",
      content: content,
      tags: "reply",
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
        // id: localStorage.getItem('replyNodeId'),
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
                  tags: "reply",
                  author: localStorage.getItem('userId'),
                  groupId: localStorage.getItem('groupId')
                })
                console.log(response.status, response.data);
                console.log("2",typeof ws);
                sendMessage(ws);

                const edgeData = {
                    groupId: localStorage.getItem('groupId'),
                    from: response.data.node.id,
                    to: localStorage.getItem('nodeId'),
                };
                axios
                    .post(config[9].createEdge, edgeData)
                    .then((response) => {
                        console.log(response.status, response.data);
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
    };

    return (
      <>
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth="md"
          scroll='body'
        >
          <DialogTitle>新增回覆</DialogTitle>
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
                請為你的回覆下一個標題，讓其他同學能更快速的了解你的回覆內容！
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