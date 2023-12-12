import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config.json';
import ApexCharts from 'apexcharts';
import io from 'socket.io-client';
import ForumPage_Navbar from '../components/ForumPage_Navbar';
import urls from '../url.json';

export default function Dashboard() {
    const ws = io.connect('http://'+urls["socket.io"]+':8000');
    const [nodes, setNodes] = useState([]);
    const [numberOfTags, setNumberOfTags] = useState([]);

    useEffect(() => {
      if (ws) {
        initWebSocket();
      }
    }, []);


    const getNodes = async () => {
        try{
          const fetchData = await axios.get(`${config[8].getNode}/${localStorage.getItem('groupId')}`, {
            headers: {
              authorization: 'Bearer JWT Token',
            },
          });

          console.log("fetchData: ", fetchData.data[0].Nodes);
          setNodes(fetchData.data[0].Nodes);
        } catch (error) {
          console.error('Error fetching nodes:', error.message);
        }
    };

    function TagsCounter(inputs) {
        var counter = [];
        let ideaTagCounter = 0;
        let informationTagCounter = 0;
        let questionTagCounter = 0;
        let experimentTagCounter = 0;
        let recordTagCounter = 0;
        let replyTagCounter = 0;
        for (const input of inputs) {
            if (input.tags === 'idea') {
                ideaTagCounter += 1;
            } else if (input.tags === 'information') {
                informationTagCounter += 1;
            } else if (input.tags === 'question') {
                questionTagCounter += 1;
            } else if (input.tags === 'experiment') {
                experimentTagCounter += 1;
            } else if (input.tags === 'record') {
                recordTagCounter += 1;
            } else if (input.tags === 'reply') {
                replyTagCounter += 1;
            }
        }
        counter.push(ideaTagCounter, informationTagCounter, questionTagCounter, experimentTagCounter, recordTagCounter, replyTagCounter);
        return counter;
    }
  
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

    var options = {
      chart: {
        type: 'bar'
      },
      series: [{
        name: '總數',
        data: TagsCounter(nodes)
      }],
      xaxis: {
        categories: ['想法', '資訊', '提問', '實驗', '紀錄', '回覆']
      }
    }

    if(document.querySelector("#chart")){
        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    }
    

    return (
      <div className="home-container">
        <ForumPage_Navbar/>
        <div id="chart"></div>
      </div>
    );
}