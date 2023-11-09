import React, { useState } from 'react';
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormHelperText, Input, InputLabel, Box } from '@mui/material';
import { EditorState } from 'draft-js';
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
    const [editorState, setEditorState] = useState(
      () => EditorState.createEmpty(),
    );

    return (
      <>
        <Dialog
          open={open}
          onClose={onClose}
        >
          <DialogTitle>新增想法</DialogTitle>
          <Divider variant="middle" />
          <DialogContent>
            <FormControl variant="standard" fullWidth>
              <InputLabel htmlFor="component-helper">標題</InputLabel>
              <Input
                id="component-helper"
                aria-describedby="component-helper-text"
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
                onEditorStateChange={setEditorState}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>取消</Button>
            <Button onClick={onClose}>送出</Button>
          </DialogActions>
        </Dialog>
      </>
    );
}