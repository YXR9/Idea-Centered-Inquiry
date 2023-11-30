import config from '../config.json';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Divider } from '@mui/material';
import io from 'socket.io-client';

export const ViewNode = ({ open, onClose }) => {
    const ws = io.connect('http://127.0.0.1:8000');
    const [nodeData, setNodeData] = useState(null);

    useEffect(() => {
      const getNodeData = async () => {
        try {
            const response = await axios.get(`${config[11].getOneNode}/${localStorage.getItem('nodeId')}`);
            setNodeData(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
      };
  
      getNodeData();
    }, []);

    return (
        <>
            <Dialog
              open={open}
              onClose={onClose}
              maxWidth="md"
              scroll='body'
            >
                <DialogTitle>
                    {nodeData && (    // ensure that nodeData is not null or undefined before trying to access its properties.
                        <>
                            {nodeData.title}
                        </>
                    )}
                </DialogTitle>
                <Divider variant="middle" />
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {nodeData && (    // ensure that nodeData is not null or undefined before trying to access its properties.
                            <>
                                {nodeData.content}
                            </>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>取消</Button>
                    {/* <Button type='submit' onClick={handleSubmit}>送出</Button> */}
                </DialogActions>
            </Dialog>
        </>
    );
}