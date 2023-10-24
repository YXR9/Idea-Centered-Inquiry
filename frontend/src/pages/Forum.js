import React, { useEffect, useRef } from 'react';
import ForumPage_Navbar from '../components/ForumPage_Navbar';
import { Network } from 'vis-network';
import 'vis-network/styles/vis-network.css'; // Import the styles for vis-network

export default function Forum() {
  const nodes = [
    { id: 1, label: 'Node 1' },
    { id: 2, label: 'Node 2' },
    { id: 3, label: 'Node 3' },
    { id: 4, label: 'Node 4' },
    { id: 5, label: 'Node 5' },
  ];

  const edges = [
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 3 },
  ];

  // Create a ref to provide DOM access
  const visJsRef = useRef(null);

  useEffect(() => {
    const network = visJsRef.current && new Network(visJsRef.current, { nodes, edges });

    // Use `network` here to configure events, etc

    // Cleanup function to destroy the network when the component is unmounted
    return () => {
      if (network) {
        network.destroy();
      }
    };
  }, [visJsRef, nodes, edges]);

  return (
    <div className="home-container">
      <ForumPage_Navbar />
      <div ref={visJsRef} style={{ height: '400px' }} />
    </div>
  );
}