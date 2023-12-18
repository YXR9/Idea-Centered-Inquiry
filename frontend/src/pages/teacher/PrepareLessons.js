import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../../config.json';
import io from 'socket.io-client';
import PrepareLessonsPage_Navbar from '../../components/PrepareLessonsPage_Navbar';
import url from '../../url.json';

export default function PrepareLessons() {
  const ws = io.connect(url.backendHost);

  useEffect(() => {
    if (ws) {
      initWebSocket();
    }
  }, []);

  const initWebSocket = () => {
    ws.on('connect', () => {
      console.log("WebSocket connected");
    });

    ws.on('event02', (arg, callback) => {
      console.log("WebSocket event02", arg);
      callback({
        status: 'event02 ok',
      });
    });
  };

  return (
    <div className="home-container">
      <PrepareLessonsPage_Navbar/>
    </div>
  );
}