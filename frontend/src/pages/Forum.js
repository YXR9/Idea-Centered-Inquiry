import React, { useEffect, useRef } from 'react';
import ForumPage_Navbar from '../components/ForumPage_Navbar';
import { Network } from 'vis-network';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// import {visNetworkOptions as option} from '../../utils/VisNetworkOptions';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Forum() {

  
    // const container = useRef(null);
    // const [ nodes, setnodes] = useState([]);
    // const [nodeData, setNodeData] = useState({});
    // const [ edges, setEdges ] = useState([]);
    
  //   const getNodesQuery = useQuery({
  //     queryKey: ['ideaWallDatas', tempid],
  //     queryFn: () => getNodes(tempid),
  //     // The query will not execute until the userId exists
  //     onSuccess:setnodes,
  //     enabled: !!tempid,
  //     retryOnMount:false
  //   });

  //   // vis network
  //   useEffect(() => {
  //     const network = 
  //         container.current && 
  //             new Network(container.current, {nodes, edges}, option);

  //     network?.on("click", () => {
  //         setCreateOptionModalOpen(false);
  //         setBuildOnOptionModalOpen(false);
  //     })

  //     network?.on("doubleClick", () =>{
  //     })

  //     network?.on("oncontext", (properties)=>{
  //         const {pointer, event, nodes} = properties;
  //         event.preventDefault();
  //         const x_coordinate = pointer.DOM.x;
  //         const y_coordinate = pointer.DOM.y;
  //         const oncontextSelectNode = network.getNodeAt({x:x_coordinate, y:y_coordinate})
  //         if(oncontextSelectNode){
  //             setBuildOnOptionModalOpen(true);
  //             setBuildOnId(oncontextSelectNode)
  //         }else{
  //             setCreateOptionModalOpen(true);
  //         }
  //         setCanvasPosition({ x:x_coordinate, y:y_coordinate })
  //     })
      
  //     network?.on("selectNode", ({ nodes:selectNodes })=>{
  //         setUpdateNodeModalOpen(true);
  //         let nodeId = selectNodes[0];
  //         let nodeInfo = nodes.filter( item => item.id === nodeId)
  //         setSelectNodeInfo(nodeInfo[0])
  //     })

  //     return ()=>{
  //         network?.off("click", ({event})=>{
  //             console.log(event);
  //         })
  //         network?.off("selectNode", ({event})=>{
  //             console.log(event);
  //         })
  //     }
  // },[container, nodes, edges]);

  return (
    <div className="home-container">
        <ForumPage_Navbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
        </Box>
    </div>
  );
}