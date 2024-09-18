import { applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { create } from 'zustand';
import { nanoid } from 'nanoid/non-secure';

const useStore = create((set, get) => ({
  nodes: [
    {
      id: 'root',
      type: 'mindmap',
      data: { label: 'Wisemapping' },
      position: { x: 0, y: 0 },
    },
  ],
  edges: [
    {
      id: 'r-1',
      source: 'root',
      target: '1',
    },
  ],
  
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  
  addChildNode: (parentNode, position) => {
    const newNode = {
      id: nanoid(),
      type: 'mindmap',
      data: { label: 'New Node' },
      position,
      parentNode: parentNode.id,
    };

    const newEdge = {
      id: nanoid(),
      source: parentNode.id,
      target: newNode.id,
    };

    set({
      nodes: [...get().nodes, newNode],
      edges: [...get().edges, newEdge],
    });
  },
  
  updateNodeLabel: (nodeId, label) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, label };
        }
        return node;
      }),
    });
  },
}));

export default useStore;
