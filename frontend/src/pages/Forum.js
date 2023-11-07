import React, { useEffect, useRef } from 'react';
import ForumPage_Navbar from '../components/ForumPage_Navbar';
import Graph from 'react-vis-network-graph';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// import {visNetworkOptions as option} from '../../utils/VisNetworkOptions';

export default function Forum() {
  const graph = {
    nodes: [
      { id: 1, label: "node 1", title: 'this is title 1', shape: "box" },
      { id: 2, label: "node 2", title: 'this is title 2', shape: "box" }
    ],
    edges: [
      { from: 1, to: 2 }
    ]
  }

  const options = {
    interaction: {
      navigationButtons: true
    },
    edges: {
      color: "yellow"
    },
    heigth: "900px"
  }

  return (
    <div className="home-container">
        <ForumPage_Navbar />
        <div className='forum-container'>
            <Graph
              graph={graph}
              options={options}
            />
        </div>
    </div>
  );
}