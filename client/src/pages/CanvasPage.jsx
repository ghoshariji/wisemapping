// import React, { useCallback, useRef, useState, useEffect } from 'react';
// import {
//   ReactFlow,
//   Controls,
//   Panel,
//   useStoreApi,
//   useReactFlow,
//   ReactFlowProvider,
//   ConnectionLineType,
// } from '@xyflow/react';
// import { shallow } from 'zustand/shallow';

// import useStore from '../hooks/store';
// import MindMapNode from '../components/MindMapNode';
// import MindMapEdge from '../components/MindMapEdge';

// import '@xyflow/react/dist/style.css';

// const selector = (state) => ({
//   nodes: state.nodes,
//   edges: state.edges,
//   onNodesChange: state.onNodesChange,
//   onEdgesChange: state.onEdgesChange,
//   addChildNode: state.addChildNode,
// });

// const nodeTypes = {
//   mindmap: MindMapNode,
// };

// const edgeTypes = {
//   mindmap: MindMapEdge,
// };

// const nodeOrigin = [0.5, 0.5];
// const connectionLineStyle = { stroke: '#F6AD55', strokeWidth: 3 };
// const defaultEdgeOptions = { style: connectionLineStyle, type: 'mindmap' };

// function CanvasPage() {
//   const { nodes, edges, onNodesChange, onEdgesChange, addChildNode } = useStore(
//     selector,
//     shallow
//   );
//   const connectingNodeId = useRef(null);
//   const store = useStoreApi();
//   const { screenToFlowPosition, getIntersectingNodes } = useReactFlow();
//   const [targetNode, setTargetNode] = useState(null);

//   const getChildNodePosition = (event, parentNode) => {
//     const { domNode } = store.getState();

//     if (!domNode || !parentNode?.internals?.positionAbsolute || !parentNode?.measured?.width || !parentNode?.measured?.height) {
//       return;
//     }

//     const isTouchEvent = 'touches' in event;
//     const x = isTouchEvent ? event.touches[0].clientX : event.clientX;
//     const y = isTouchEvent ? event.touches[0].clientY : event.clientY;
//     const panePosition = screenToFlowPosition({ x, y });

//     return {
//       x: panePosition.x - parentNode.internals.positionAbsolute.x + parentNode.measured.width / 2,
//       y: panePosition.y - parentNode.internals.positionAbsolute.y + parentNode.measured.height / 2,
//     };
//   };

//   const onConnectStart = useCallback((_, { nodeId }) => {
//     connectingNodeId.current = nodeId;
//   }, []);

//   const onConnectEnd = useCallback(
//     (event) => {
//       const { nodeLookup } = store.getState();
//       const targetIsPane = event.target.classList.contains('react-flow__pane');

//       if (targetIsPane && connectingNodeId.current) {
//         const parentNode = nodeLookup.get(connectingNodeId.current);
//         const childNodePosition = getChildNodePosition(event, parentNode);

//         if (parentNode && childNodePosition) {
//           addChildNode(parentNode, childNodePosition);
//         }
//       }
//     },
//     [getChildNodePosition]
//   );

//   // Collision detection on node drag
//   const onNodeDrag = (event, node) => {
//     const intersectingNodes = getIntersectingNodes(node);
//     setTargetNode(intersectingNodes.length > 0 ? intersectingNodes[0] : null);
//   };

//   useEffect(() => {
//     if (targetNode) {
//       // Handle collision logic (like snapping back, etc.)
//       console.log('Collision detected with node:', targetNode.id);
//     }
//   }, [targetNode]);

//   return (
//     <div className='h-screen w-screen'>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         connectionMode={ConnectionLineType.SmoothStep}
//         edgeTypes={edgeTypes}
//         onConnectStart={onConnectStart}
//         onConnectEnd={onConnectEnd}
//         onNodeDrag={onNodeDrag} // Collision detection during drag
//         nodeOrigin={nodeOrigin}
//         // connectionLineStyle={connectionLineStyle}
//         defaultEdgeOptions={defaultEdgeOptions}
//         connectionLineType={ConnectionLineType.Straight}

//       >
//         <Controls showInteractive={false} />
//         <Panel position="top-left" className="header">
//           Welcome To Wisemapping
//         </Panel>
//       </ReactFlow>
//     </div>
//   );
// }

// export default CanvasPage;

import { useState, useCallback, useRef } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import MindMapNode from '../components/MindMapNode';

const nodeTypes = {
  mindmap: MindMapNode,
};

const initialNodes = [
  {
    id: '1',
    data: { label: 'Hello' },
    type: 'mindmap',
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    data: { label: 'Hello' },
    type: 'mindmap',
    position: { x: 100, y: 100 },
  },
  {
    id: '3',
    data: { label: 'Hello' },
    type: 'mindmap',
    position: { x: 200, y: 200 },
  },
];

const initialEdges = [];

let id = 2; // Start from 2 since we already have one node with ID '1'
const getId = () => `${id++}`;

function CanvasPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef(null);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params) => {
      console.log('Connecting edges:', params);
      setEdges((eds) => addEdge(params, eds));
    },
    [],
  );

  const onConnectEnd = useCallback(
    (event, connectionState) => {
      console.log('Connection State:', connectionState);
  
      // Check if fromNode has a valid ID and log it
      console.log('From Node ID:', connectionState.fromNode?.id);
  
      if (!connectionState.isValid) {
        const newId = getId(); // Generate a new ID for the new node
        const { clientX, clientY } =
          'changedTouches' in event ? event.changedTouches[0] : event;
  
        console.log('Client Position:', { clientX, clientY });
  
        let newNodePosition;
        switch (connectionState.fromHandle?.position) {
          case 'right':
            newNodePosition = screenToFlowPosition({ x: clientX - 150, y: clientY - 50 });
            break;
          case 'bottom':
            newNodePosition = screenToFlowPosition({ x: clientX - 50, y: clientY + 100 });
            break;
          case 'left':
            newNodePosition = screenToFlowPosition({ x: clientX + 200, y: clientY - 50 });
            break;
          case 'top':
            newNodePosition = screenToFlowPosition({ x: clientX - 50, y: clientY - 200 });
            break;
          default:
            console.warn('No valid handle found');
            return;
        }
  
        const newNode = {
          id: newId,
          position: newNodePosition,
          data: { label: `Node ${newId}` },
          type: 'mindmap',
        };
  
        setNodes((nds) => [...nds, newNode]);
        console.log('Nodes after addition:', [...nodes, newNode]);
  
        let targetHandleId;
        switch (connectionState.fromHandle?.position) {
          case 'right':
            targetHandleId = `target-${newId}-left`;
            break;
          case 'bottom':
            targetHandleId = `target-${newId}-top`;
            break;
          case 'left':
            targetHandleId = `target-${newId}-right`;
            break;
          case 'top':
            targetHandleId = `target-${newId}-bottom`;
            break;
          default:
            console.warn('No valid handle found for edge connection');
            return;
        }
  
        console.log('Target Handle ID:', targetHandleId);
  
        // Check if the fromNode has a valid ID and log it
        console.log('From Node ID:', connectionState.fromNode?.id);
  
        // Check if the target node exists and has valid handles
        const targetNode = nodes.find((node) => node.id === newId);
        if (targetNode) {
          // Log parameters before creating edge
          console.log('Creating edge with:', {
            id: `${newId}-edge`,
            source: connectionState.fromNode.id,
            target: newId,
            sourceHandle: connectionState.fromHandle.id, // Correctly set sourceHandle
            targetHandle: `target-${newId}-${connectionState.fromHandle.position === 'right' ? 'left' : connectionState.fromHandle.position === 'bottom' ? 'top' : connectionState.fromHandle.position === 'left' ? 'right' : 'bottom'}`, // Correctly set targetHandle
          });
  
          // Delay edge creation if necessary
          setTimeout(() => {
            setEdges((eds) =>
              eds.concat({
                id: `${newId}-edge`,
                source: connectionState.fromNode.id,
                target: newId,
                sourceHandle: connectionState.fromHandle.id, // Correctly set sourceHandle
                targetHandle: `target-${newId}-${connectionState.fromHandle.position === 'right' ? 'left' : connectionState.fromHandle.position === 'bottom' ? 'top' : connectionState.fromHandle.position === 'left' ? 'right' : 'bottom'}`, // Correctly set targetHandle
              }),
            );
            console.log('Edge created successfully');
          }, 0); // Delay to ensure React Flow updates its internals
  
        } else {
          console.warn(`Target node '${newId}' not found`);
        }
      }
    },
    [screenToFlowPosition, nodes],
  );
  
  return (
    <div className='h-screen w-screen' ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onConnectEnd={onConnectEnd}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default CanvasPage;
