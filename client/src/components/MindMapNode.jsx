import React from 'react';
import { Handle } from '@xyflow/react';

function MindMapNode({ data, onAddNode }) {
  return (
    <div className='p-4 bg-white rounded shadow relative'>
      <h3 className='text-xl font-bold'>{data.label}</h3>
      <div className="absolute top-1/2 left-full transform -translate-y-1/2">
        <button 
          className="bg-blue-500 text-white p-1 rounded ml-2"
          onClick={() => onAddNode(data.id, 'right')} // Pass the direction
        >
          ➕
        </button>
      </div>
      <div className="absolute top-1/2 right-full transform -translate-y-1/2">
        <button 
          className="bg-blue-500 text-white p-1 rounded mr-2"
          onClick={() => onAddNode(data.id, 'left')} // Pass the direction
        >
          ➕
        </button>
      </div>
      <Handle type="target" position="left" />
      <Handle type="source" position="right" />
    </div>
  );
}

export default MindMapNode;