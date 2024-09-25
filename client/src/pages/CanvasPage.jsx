import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { PlusCircle } from "lucide-react";
import { Handle } from "@xyflow/react";
import Toolbar from "../components/Toolbar";

const initialNodes = [
  {
    id: "1",
    type: "custom",
    data: { label: "Main Idea" },
    position: { x: 0, y: 0 },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
];

const initialEdges = [];

function CustomNode({ id, data }) {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    data.onLabelChange(id, label);
  };

  const handleInputChange = (event) => {
    setLabel(event.target.value);
  };

  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex items-center">
        <div className="ml-2">
          {isEditing ? (
            <input
              type="text"
              value={label}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="bg-white border-2 border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          ) : (
            <div
              className="text-lg font-bold"
              onDoubleClick={handleDoubleClick}
            >
              {label}
            </div>
          )}
        </div>
        <button
          className="ml-2 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => data.onAddChild(id)}
          aria-label="Add connected node"
        >
          <PlusCircle className="w-5 h-5 text-blue-500" />
        </button>
      </div>
      <Handle type="source" position={Position.Right} />
      <Handle type="target" position={Position.Left} />
    </div>
  );
}

const nodeTypes = {
  custom: CustomNode,
};

export default function CanvasPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => {
      console.log("Connecting:", params);
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  const addChildNode = useCallback(
    (parentId) => {
      const parentNode = nodes.find((node) => node.id === parentId);
      if (!parentNode) return;

      const newNodeId = (nodes.length + 1).toString();
      let newNodePosition;

      // Check if the parent node has any edges
      const parentEdges = edges.filter((edge) => edge.source === parentId);
      if (parentEdges.length === 0) {
        // If no edges, position the new node to the right
        newNodePosition = {
          x: parentNode.position.x + 200,
          y: parentNode.position.y,
        };
      } else {
        // If edges exist, position the new node above or below
        const existingChildNodes = nodes.filter((node) => {
          const edge = edges.find(
            (edge) => edge.source === parentId && edge.target === node.id
          );
          return edge !== undefined;
        });

        // Alternate between above and below
        const newY =
          existingChildNodes.length % 2 === 0
            ? parentNode.position.y - 100
            : parentNode.position.y + 100;
        newNodePosition = {
          x: parentNode.position.x + 200,
          y: newY,
        };
      }

      const newNode = {
        id: newNodeId,
        type: "custom",
        data: { label: `Node ${newNodeId}` },
        position: newNodePosition,
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };

      const newEdge = {
        id: `e${parentId}-${newNodeId}`, // Fixed here
        source: parentId,
        target: newNodeId,
        type: "smoothstep",
        animated: true,
      };

      // Update nodes and edges state
      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) => eds.concat(newEdge));
    },
    [nodes, edges]
  );

  const onLabelChange = useCallback(
    (nodeId, newLabel) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, label: newLabel } }
            : node
        )
      );
    },
    [setNodes]
  );

  const handleAddNode = () => {
    // Logic to add a new node at a default position
    const newNodeId = (nodes.length + 1).toString();
    const newNode = {
      id: newNodeId,
      type: "custom",
      data: { label: `Node ${newNodeId}` },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight - 100,
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };

    setNodes((nds) => nds.concat(newNode));
  };

  const handleDeleteNode = () => {
    // Logic to delete the selected node
    // You might want to keep track of selected nodes in state
    // For simplicity's sake here we won't implement selection logic
    console.log("Delete node functionality not implemented");
  };

  const handleSave = () => {
    // Logic to save the current state of nodes and edges
    console.log("Save functionality not implemented");
  };

  const handleExport = () => {
    // Logic to export the current state of nodes and edges
    console.log("Export functionality not implemented");
  };

  return (
    <div className="w-full h-screen">
      <Toolbar
        onAddNode={handleAddNode}
        onDeleteNode={handleDeleteNode}
        onSave={handleSave}
        onExport={handleExport}
      />

      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: { ...node.data, onAddChild: addChildNode, onLabelChange },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect} // Ensure this is correctly set
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
