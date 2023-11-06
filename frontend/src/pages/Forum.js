import React, { useEffect, useRef } from 'react';
import ForumPage_Navbar from '../components/ForumPage_Navbar';
import { Network } from 'vis-network';
// import {visNetworkOptions as option} from '../../utils/VisNetworkOptions';

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
      {/* <div ref={visJsRef} style={{ height: '400px' }} /> */}
    </div>
  );
}