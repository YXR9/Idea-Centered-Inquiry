import React from "react";
import Graph from "react-vis-network-graph";

export default function Gr(props) {
  const options = {
    layout: {
      improvedLayout: true,
      clusterThreshold: 1
    }
  };
  return (
    <div className="Gr">
      <Graph
        graph={props.graph}
        options={options}
        getNetwork={(network) => {
          console.log(network);
          // network.clustering.clusterByHubsize(5);

          // network.clustering.cluster({
          //   joinCondition: function (nodeOptions) {
          //     if (nodeOptions.cid === 1) {
          //       console.log("nodeOptions", nodeOptions);
          //     }
          //     return nodeOptions.cid === 1;
          //   }
          // });
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
    </div>
  );
}
