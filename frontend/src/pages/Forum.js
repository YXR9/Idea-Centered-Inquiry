import React, { useEffect, useRef } from 'react';
import ForumPage_Navbar from '../components/ForumPage_Navbar';
import Graph from 'react-vis-network-graph';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import NoteIcon from '../assets/sticky-note.png';
// import {visNetworkOptions as option} from '../../utils/VisNetworkOptions';

export default function Forum() {
  const graph = {
    nodes: [
      { id: 1, label: "node 1", title: 'this is title 1', shape: "image", image: NoteIcon, size: 100 },
      { id: 2, label: "node 2", title: 'this is title 2', shape: "image", image: NoteIcon, size: 100  }
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
      color: "#8B8B8B"
    },
    nodes: {
      borderWidth: 0,
      borderWidthSelected: 0,
      // color: "#0262C4",
      // shape: "square",
      size: 1,
      shadow: {
        enabled: true,
        color: "rgba(0,0,0,0.5)",
        size: 10,
        x: 5,
        y: 5
      },
      font: {
        color: "#fff",
        size: 13,
        bold: {
          mod: "bold"
        }
      }
    },
    manipulation: {
      controlNodeStyle: {
        shape: "dot",
        size: 6,
        color: {
          background: "#ff0000",
          border: "#3c3c3c",
          highlight: {
            background: "#07f968",
            border: "#3c3c3c"
          },
          borderWidth: 2,
          borderWidthSelected: 2
        }
      }
    }
  }
 
  const events = {
    select: function(event) {
      var { nodes, edges } = event;
    }
  };

  return (
    <div className="home-container">
        <ForumPage_Navbar />
        <div id="graph" style={{ flex: 1, height: '100vh', overflow: 'auto', position: 'fixed', top: '0', left: '0', marginLeft: '64px' }}>
            <Graph
              graph={graph}
              options={options}
              events={events}
            />
        </div>
    </div>
  );
}