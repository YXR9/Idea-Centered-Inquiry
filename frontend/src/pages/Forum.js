import config from '../config.json';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import ForumPage_Navbar from '../components/ForumPage_Navbar';
import Graph from 'react-vis-network-graph';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import NoteIcon from '../assets/sticky-note.png';

export default function Forum() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const graph = {
    nodes: nodes,
    edges: edges
    // nodes: [
    //   { id: 1, label: "node 1", title: 'this is title 1', shape: "image", image: NoteIcon, size: 100 },
    //   { id: 2, label: "node 2", title: 'this is title 2', shape: "image", image: NoteIcon, size: 100  },
    //   { id: 3, label: "node 3", title: 'this is title 3', shape: "image", image: NoteIcon, size: 100  },
    //   { id: 4, label: "node 4", title: 'this is title 4', shape: "image", image: NoteIcon, size: 100  },
    //   { id: 5, label: "node 5", title: 'this is title 5', shape: "image", image: NoteIcon, size: 100  },
    //   { id: 6, label: "node 6", title: 'this is title 6', shape: "image", image: NoteIcon, size: 100  },
    //   { id: 7, label: "node 7", title: 'this is title 7', shape: "image", image: NoteIcon, size: 100  },
    //   { id: 8, label: "node 8", title: 'this is title 8', shape: "image", image: NoteIcon, size: 100  },
    //   { id: 9, label: "node 9", title: 'this is title 9', shape: "image", image: NoteIcon, size: 100  },
    //   { id: 10, label: "node 10", title: 'this is title 10', shape: "image", image: NoteIcon, size: 100  },
    //   { id: 11, label: "node 11", title: 'this is title 11', shape: "image", image: NoteIcon, size: 100  },
    //   { id: 12, label: "node 12", title: 'this is title 12', shape: "image", image: NoteIcon, size: 100  }
    // ],
    // edges: [
    //   { from: 1, to: 2 },
    //   { from: 1, to: 3 },
    //   { from: 2, to: 4 },
    //   { from: 2, to: 5 },
    //   { from: 2, to: 6 },
    //   { from: 3, to: 7 },
    //   { from: 3, to: 8 },
    //   { from: 3, to: 9 },
    //   { from: 4, to: 10 },
    //   { from: 5, to: 11 }
    // ]
  }

  const options = {
    layout: {
      randomSeed: 23,
      hierarchical: {
        enabled: true,
        // levelSeparation: 40,
        // nodeSpacing: 300,
        // treeSpacing: 100,
        blockShifting: true,
        edgeMinimization: true,
        direction: "LR",
        sortMethod: "directed"
      }
    },
    interaction: {
      navigationButtons: true
    },
    edges: {
      color: "#8B8B8B",
      length: 300,
      color: {inherit: "from"},
      smooth: {
        enabled: true,
        type: "dynamic",
        roundness: 1
      },
      arrows: {
        from: {
          enabled: true,
          scaleFactor: 0.7
        },
        to: {
          enabled: false
        }
      }
    },
    nodes: {
      shape: "box",
      scaling: {
          min: 10,
          max: 30,
          label: {
              min: 8,
              max: 30,
              drawThreshold: 12,
              maxVisible: 20
          }
      },
      font: {
          size: 12,
          face: "Tahoma"
      }
    },
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