import React, { useState } from 'react';
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormHelperText, Input, InputLabel, Box } from '@mui/material';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export const CreateFlask = ({ open, onClose }) => {
    const [editorState, setEditorState] = useState(
      () => EditorState.createEmpty(),
    );

    return (
      <>
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth="md"
        >
          <DialogTitle>新增實驗</DialogTitle>
          <Divider variant="middle" />
          <DialogContent>
            <FormControl variant="standard" fullWidth>
              <InputLabel htmlFor="component-helper">標題</InputLabel>
              <Input
                id="component-helper"
                aria-describedby="component-helper-text"
              />
              <FormHelperText id="component-helper-text">
                請輸入實驗標題，讓其他同學能更快速的了解你要做什麼樣的實驗！
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
              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
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