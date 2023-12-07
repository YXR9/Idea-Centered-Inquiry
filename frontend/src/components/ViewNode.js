import config from '../config.json';
import axios from "axios";
import { v4 as uuid } from 'uuid';
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Divider } from '@mui/material';
import { CreateReply } from './CreateReply';
import { CreateIdea } from './CreateIdea';

export const ViewNode = ({ open, onClose, nodeContent }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [id, setId] = useState('');

    const openModal = () => {
      setModalOpen(true);
    };
  
    const closeModal = () => {
      setModalOpen(false);
    };

    // const uuidFromUuidV4 = () => {
    //     const newUuid = uuid();
    //     setId(newUuid);
    //     localStorage.setItem('replyNodeId');
    // }      

    const handleReply = async (e) => {
        // e.preventDefault();
        // uuidFromUuidV4()
        // const edgeData = {
        //     groupId: 1,
        //     from: id,
        //     to: localStorage.getItem('nodeId'),
        // };
        // await axios
        //     .post(config[9].createEdge, edgeData)
        //     .then((response) => {
                localStorage.setItem('replyNodeId', uuid());
                onClose();
                openModal();
            //     console.log(response.status, response.data);
            // })
            // .catch((error) => {
            //     if (error.response) {
            //         console.log(error.response);
            //         console.log("server responded");
            //     } else if (error.request) {
            //         console.log("network error");
            //     } else {
            //         console.log(error);
            //     }
            // });
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
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {nodeContent && (    // ensure that nodeData is not null or undefined before trying to access its properties.
                            <>
                                {nodeContent.content}
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
            />
        </>
    );
}