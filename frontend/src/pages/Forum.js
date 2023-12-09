import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config.json';
import io from 'socket.io-client';
import ForumPage_Navbar from '../components/ForumPage_Navbar';
import Graph from "react-vis-network-graph";
import { ViewNode } from '../components/ViewNode';

export default function Forum() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [open, setOpen] = useState(false);
  const [nodeContent, setNodeContent] = useState(null);
  const ws = io.connect('http://127.0.0.1:8000');

  const handleClickOpen = (nodeId) => {
    setOpen(true);
    fetchNodeData(nodeId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchNodeData = async (nodeId) => {
    try {
      const response = await axios.get(`${config[11].getOneNode}/${nodeId}`);
      setNodeContent(response.data);
      console.log('Node Content: ', response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (ws) {
      initWebSocket();
    }
  }, []);

  const getNodes = async () => {
    try{
      const fetchData = await axios.get(`${config[8].getNode}/1`, {
        headers: {
          authorization: 'Bearer JWT Token',
        },
      });

      const fetchEdge = await axios.get(`${config[10].getEdge}/1`, {
        headers: {
          authorization: 'Bearer JWT Token',
        },
      });

      console.log("fetchData: ", fetchData);
      console.log("fetchEdge: ", fetchEdge);

      const nodeData = fetchData.data[0].Nodes.map((node) => ({
        id: node.id,
        label: node.title,
        title: node.content,
        group: node.tags
      }));

      const edgeData = fetchEdge.data.map((edge) => ({
        from: edge.from,
        to: edge.to
      }));

      console.log('nodeData: ', nodeData);
      console.log('edgeData: ', edgeData);
      setNodes(nodeData);
      setEdges(edgeData);
      console.log('graph: ', nodes);
      localStorage.setItem("nodeDataLength", nodeData.length + 1);
    } catch (error) {
      console.error('Error fetching nodes:', error.message);
    }
  };

  const initWebSocket = () => {
    ws.on('connect', () => {
      console.log("WebSocket connected");
      getNodes();
    });

    ws.on('event02', (arg, callback) => {
      console.log("WebSocket event02", arg);
      getNodes();
      callback({
        status: 'event02 ok',
      });
    });
  };

  const graph = {
    nodes: nodes,
    edges: edges,
  };

  const options = {
    layout: {
      randomSeed: 23,
      hierarchical: {
        enabled: true,
        blockShifting: true,
        edgeMinimization: true,
        direction: 'RL',
        sortMethod: 'directed',
      },
    },
    interaction: {
      navigationButtons: true,
      tooltipDelay: 300
    },
    clickToUse: false,
    groups: {
      idea: {
        color: {
          border: '#FFC',
          background: '#FFC',
          fontSize: 5,
          highlight: {
            border: '#FFC',
            background: '#FFC'
          }
        },
      },
      question: {
        color: {
          border: '#CCF',
          background: '#CCF',
          highlight: {
            border: '#CCF',
            background: '#CCF'
          }
        },
      },
      information: {
        color: {
          border: '#CFC',
          background: '#CFC',
          highlight: {
            border: '#CFC',
            background: '#CFC'
          }
        },
      },
      experiment: {
        color: {
          border: '#FFDBDB',
          background: '#FFDBDB',
          highlight: {
            border: '#FFDBDB',
            background: '#FFDBDB'
          }
        }
      },
      record: {
        color: {
          border: '#B9DCF4',
          background: '#B9DCF4',
          highlight: {
            border: '#B9DCF4',
            background: '#B9DCF4'
          }
        },
      }
      // add more groups here
    },
    edges: {
      color: '#8B8B8B',
      width: 3,
      length: 300,
      // color: { inherit: 'from' },
      arrows: {
        from: {
          enabled: true,
          scaleFactor: 0.7,
        },
        to: {
          enabled: false,
        },
      },
    },
    nodes: {
      shape: 'box',
      borderWidth: 1,
      shapeProperties: {
        borderRadius: 1
      },
      color: {
        border: '#E3DFFD',
        background: '#E3DFFD',
        highlight: {
          border: '#e3dffdcb',
          background: '#e3dffdcb'
        },
        hover: {
          border: '#e3dffdcb',
          background: '#e3dffdcb'
        }
      },
      opacity: 1,
      font: {
        color: '#343434',
        size: 5, // px
        face: 'arial',
        background: 'none',
        strokeWidth: 0, // px
        strokeColor: '#ffffff',
        align: 'center',
        multi: false,
        vadjust: 0,
        bold: {
          color: '#343434',
          size: 5, // px
          face: 'arial',
          vadjust: 0,
          mod: 'bold'
        },
        ital: {
          color: '#343434',
          size: 5, // px
          face: 'arial',
          vadjust: 0,
          mod: 'italic',
        },
        boldital: {
          color: '#343434',
          size: 5, // px
          face: 'arial',
          vadjust: 0,
          mod: 'bold italic'
        },
        mono: {
          color: '#343434',
          size: 5, // px
          face: 'courier new',
          vadjust: 2,
          mod: ''
        }
      },
      hidden: false,
      label: "HTML",
      level: undefined,
      margin: 20,
      shadow: {
        color: 'rgba(33,33,33,.7)',
        size: 10,
        x: 10,
        y: 10
      },
      heightConstraint: { minimum: 100, valign: 'middle' },
      widthConstraint: { minimum: 100, maximum: 100 },
      mass: 1,
      physics: true,
      scaling: {
        label: {
          enabled: true,
          min: 16,
          max: 16,
          drawThreshold: 12,
          // maxVisible: 30,
        },
        customScalingFunction: function (min,max,total,value) {
          if (max === min) {
            return 0.5;
          }
          else {
            let scale = 1 / (max - min);
            return Math.max(0,(value - min)*scale);
          }
        }
      },
      value: 1,
    }
  };

  const events = {
    click: (event) => {
      var { nodes, edges, items } = event;
      console.log('click~', nodes);
      console.log('click~', event);
      if (nodes.length === 1) {
        handleClickOpen(nodes[0]);
        localStorage.setItem('nodeId', nodes[0]);
      }
    }
  };
  // if(document.getElementById("graph")){
  //   document.getElementById("graph").click();
  // }
  return (
    <div className="home-container">
      <ForumPage_Navbar/>
      <div
        id="graph"
        style={{
          flex: 1,
          height: '100vh',
          overflow: 'auto',
          position: 'fixed',
          top: '0',
          left: '0',
          marginLeft: '64px',
        }}
        onClick={()=> console.log('Hi')}
      >
        <Graph graph={graph} options={options} events={events}/>
      </div> 
      <ViewNode open={open} onClose={handleClose} nodeContent={nodeContent} />
    </div>
  );
}