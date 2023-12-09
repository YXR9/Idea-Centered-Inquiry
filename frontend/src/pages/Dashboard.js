import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config.json';
import io from 'socket.io-client';
import ForumPage_Navbar from '../components/ForumPage_Navbar';

export default function Dashboard() {
  const ws = io.connect('http://127.0.0.1:8000');

  
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
      <ForumPage_Navbar/>
    </div>
  );
}