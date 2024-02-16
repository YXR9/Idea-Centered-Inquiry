import config from '../config.json';
import axios from "axios";
import { v4 as uuid } from 'uuid';
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Divider } from '@mui/material';
import { CreateReply } from './CreateReply';

export const ViewNode = ({ open, onClose, nodeContent }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [id, setId] = useState('');

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

    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };     

    const handleReply = async (e) => {
        onClose();
        openModal();
    };
  
    return (
        <>
            <Dialog
              open={open}
              onClose={onClose}
              maxWidth="md"
              scroll='body'
            >
                <DialogTitle>
                    {nodeContent && (    // ensure that nodeData is not null or undefined before trying to access its properties.
                        <>
                            {nodeContent.title}
                        </>
                    )}
                </DialogTitle>
                <Divider variant="middle" />
                <DialogContent id="nodeWindow">
                    <DialogContentText id="alert-dialog-description">
                        {nodeContent && (    // ensure that nodeData is not null or undefined before trying to access its properties.
                            <>
                                <>
                                    {nodeContent.content}
                                </>
                                <br/>
                                <br/>
                                <>
                                    作者：{nodeContent.author}
                                </>
                                <br/>
                                <>
                                    撰寫時間：{`${formatTimestamp(nodeContent.createdAt)}`}
                                </>
                            </>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>取消</Button>
                    <Button type='submit' onClick={handleReply}>回覆</Button>
                </DialogActions>
            </Dialog>
            <CreateReply
                open={modalOpen}
                onClose={closeModal}
                nodeContent={nodeContent}
            />
        </>
    );
}