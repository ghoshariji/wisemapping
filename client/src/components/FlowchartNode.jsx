import React, { useState } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ReactFlowProvider } from "@xyflow/react";
import { FiPlusCircle } from "react-icons/fi";
import { AiOutlineEdit, AiOutlineBgColors } from "react-icons/ai";

const initialNodes = [
  {
    id: "1",
    data: { label: "Hello" },
    position: { x: 0, y: 0 },
    type: "input",
  },
  {
    id: "2",
    data: { label: "World" },
    position: { x: 100, y: 100 },
  },
];

const initialEdges = [];

const Popup = ({ node, onClose, onSubmit }) => {
  const [label, setLabel] = useState(node.data.label);

  const handleSubmit = () => {
    onSubmit(label);
    onClose();
  };

  return (
    <div
      style={{
        position: "absolute",
        top: node.position.y + 50, // Adjust as needed
        left: node.position.x + 50, // Adjust as needed
        backgroundColor: "white",
        border: "1px solid gray",
        padding: "10px",
        borderRadius: "4px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
      }}
    >
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        className="p-2 border border-gray-300 rounded w-32"
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white p-1 rounded hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

const FlowchartNode = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [editingNode, setEditingNode] = useState(null);
  const { project } = useReactFlow();

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  const addNode = (type) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      data: { label: "New Node" },
      position: { x: Math.random() * 500, y: Math.random() * 500 },
      type,
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const changeNodeColor = (id, color) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return { ...node, style: { ...node.style, backgroundColor: color } };
        }
        return node;
      })
    );
  };

  const editNodeLabel = (id, label) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return { ...node, data: { ...node.data, label } };
        }
        return node;
      })
    );
  };

  const handleNodeDoubleClick = (event, node) => {
    setEditingNode(node);
  };

  const handlePopupClose = () => {
    setEditingNode(null);
  };

  const handlePopupSubmit = (label) => {
    if (editingNode) {
      editNodeLabel(editingNode.id, label);
    }
  };

  return (
    <ReactFlowProvider>
      <div className="h-full w-full flex">
        {/* Toolbar */}
        <div className="toolbar flex flex-col gap-4 p-4 bg-gray-100 shadow-lg border-r border-gray-300 w-48">
          <button
            onClick={() => addNode("input")}
            title="Add Input Node"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            <FiPlusCircle size={24} />
          </button>
          <button
            onClick={() => addNode("output")}
            title="Add Output Node"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          >
            <FiPlusCircle size={24} />
          </button>
          <button
            onClick={() => addNode("default")}
            title="Add Default Node"
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition"
          >
            <FiPlusCircle size={24} />
          </button>
          <div className="flex items-center space-x-4">
            <AiOutlineBgColors size={24} />
            <input
              type="color"
              onChange={(event) =>
                selectedNodeId &&
                changeNodeColor(selectedNodeId, event.target.value)
              }
              title="Change Node Color"
              className="border border-gray-300 rounded p-1"
            />
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={(event, node) => setSelectedNodeId(node.id)}
            onNodeDoubleClick={handleNodeDoubleClick}
            onNodeDragStop={(event, node) => console.log("node dragged", node)}
          >
            <Background />
            <Controls />
          </ReactFlow>
          {editingNode && (
            <Popup
              node={editingNode}
              onClose={handlePopupClose}
              onSubmit={handlePopupSubmit}
            />
          )}
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default FlowchartNode;
