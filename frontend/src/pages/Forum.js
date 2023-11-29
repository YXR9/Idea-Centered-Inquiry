import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import config from '../config.json';
import io from 'socket.io-client';
import ForumPage_Navbar from '../components/ForumPage_Navbar';
import Graph from "react-vis-network-graph";
import NoteIcon from '../assets/sticky-note.png'; 
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormHelperText, TextField, InputLabel, Box } from '@mui/material';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

export default function Forum() {
  const socket = useRef();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [open, setOpen] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const ws = io.connect('http://127.0.0.1:8000');              
    
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };
  
  useEffect(() => {
    if (ws) {
      console.log("initWebSocket 1");
      initWebSocket();
    }
  }, []);
  
  const getNodes = async () => {
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
  };
  
  const initWebSocket = () => {
    
    console.log("initWebSocket 2");
    ws.on('connect', () => {
      console.log("connect 1", ws.id);
      getNodes();
    });

    ws.on('event02', (arg, callback) => {
      console.log("connect [event02]",arg);
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
    clickToUse: true,
    dataManipulation: true,
    onAdd: function(data,callback) {
        /** data = {id: random unique id,
        *           label: new,
        *           x: x position of click (canvas space),
        *           y: y position of click (canvas space),
        *           allowedToMoveX: true,
        *           allowedToMoveY: true
        *          };
        */
        // var newData = {..}; // alter the data as you want.
                            // all fields normally accepted by a node can be used.
        // callback(newData);  // call the callback to add a node.
        console.log("onAdd");
    },
    groups: {
      idea: {
        color: {
          border: '#D2E0FB',
          background: '#D2E0FB',
          highlight: {
            border: '#D2E0FB',
            background: '#D2E0FB'
          }
        },
      },
      question: {
        color: {
          border: '#FFC5C5',
          background: '#FFC5C5',
          highlight: {
            border: '#FFC5C5',
            background: '#FFC5C5'
          }
        },
      },
      information: {
        color: {
          border: '#8EACCD',
          background: '#8EACCD',
          highlight: {
            border: '#8EACCD',
            background: '#8EACCD'
          }
        },
      },
      experiment: {
        color: {
          border: '#D7E5CA',
          background: '#D7E5CA',
          highlight: {
            border: '#D7E5CA',
            background: '#D7E5CA'
          }
        }
      },
      record: {
        color: {
          border: '#F9F3CC',
          background: '#F9F3CC',
          highlight: {
            border: '#F9F3CC',
            background: '#F9F3CC'
          }
        },
      }
      // add more groups here
    },
    edges: {
      color: '#8B8B8B',
      width: 3,
      length: 150,
      color: { inherit: 'from' },
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
      chosen: true,
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
        size: 14, // px
        face: 'arial',
        background: 'none',
        strokeWidth: 0, // px
        strokeColor: '#ffffff',
        align: 'center',
        multi: false,
        vadjust: 0,
        bold: {
          color: '#343434',
          size: 14, // px
          face: 'arial',
          vadjust: 0,
          mod: 'bold'
        },
        ital: {
          color: '#343434',
          size: 14, // px
          face: 'arial',
          vadjust: 0,
          mod: 'italic',
        },
        boldital: {
          color: '#343434',
          size: 14, // px
          face: 'arial',
          vadjust: 0,
          mod: 'bold italic'
        },
        mono: {
          color: '#343434',
          size: 15, // px
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
      heightConstraint: { minimum: 20, valign: 'middle' },
      widthConstraint: { minimum: 20, maximum: 50 },
      mass: 1,
      physics: true,
      scaling: {
        label: {
          enabled: true,
          min: 12,
          max: 30,
          drawThreshold: 12,
          maxVisible: 30,
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
    select: function (event) {
      var { nodes, edges } = event;
    },
    click: (event) => {
      var { nodes, edges, items } = event;
      console.log('click~', nodes[0]);
      console.log('click~', event);
      <div>button
        {/* <>
          <Button onClick={handleClickOpen}>回覆</Button>
        </> */}
        {/* <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          scroll='body'
        >
          <DialogTitle>新增想法</DialogTitle>
          <Divider variant="middle" />
          <DialogContent>
            <FormControl variant="standard" fullWidth>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label={"title"}
                type="text"
                name='title'
                // value={data.title}
                fullWidth
                variant="standard"
                // onChange={handleChange}
              />
              <FormHelperText id="component-helper-text">
                請輸入你的想法標題，讓其他同學能更快速的了解你的想法！
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
                // onEditorStateChange={onEditorStateChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>取消</Button>
            <Button type='submit' onClick={handleClose}>送出</Button>
          </DialogActions>
        </Dialog> */}
      </div>
    }
  };

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
      >
        <Graph graph={graph} options={options} events={events}/>
      </div>
    </div>
  );
}