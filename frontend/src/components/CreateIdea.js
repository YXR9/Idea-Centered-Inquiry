import config from '../config.json';
import axios from "axios";
import React, { useState } from 'react';
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormHelperText, TextField, InputLabel, Box } from '@mui/material';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const scaffold = [
  <Button key="1">我的想法</Button>,
  <Button key="2">我覺得更好的想法</Button>,
  <Button key="3">我想知道</Button>,
  <Button key="4">這個想法不能解釋</Button>,
  <Button key="5">舉例和參考來源</Button>,
  <Button key="6">我的總結</Button>
];

export const CreateIdea = ({ open, onClose }) => {
    const userId = localStorage.getItem('userId')
    const [editorState, setEditorState] = useState(EditorState.createEmpty());;
    const [content, setContent] = useState();
    const [data, setData] = useState({
      title: "",
      content: content,
      tags: "idea",
      author: userId,
      groupId: "1"
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
          .post(config[7].createIdea, ideaData)
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
          <DialogTitle>新增想法</DialogTitle>
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
                請輸入你的想法標題，讓其他同學能更快速的了解你的想法！
              </FormHelperText>
            </FormControl>
            <Box
              sx={{
                display: 'flex',
                '& > *': {
                  m: 1,
                },
              }}
            >
              <ButtonGroup
                orientation="vertical"
                aria-label="vertical outlined button group"
                style={{ color:'#ECF2FF' }}
              >
                {scaffold}
              </ButtonGroup>
              <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>取消</Button>
            <Button type='submit' onClick={handleSubmit}>送出</Button>
          </DialogActions>
          <div>{content}</div>
        </Dialog>
      </>
    );
}