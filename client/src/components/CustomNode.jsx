import React, { useState } from 'react';
import { Handle, Position, useConnection } from '@xyflow/react';

export default function CustomNode({ id, data, isConnectable }) {
  const [text, setText] = useState(data.text || ''); // Use initial text from data
  const connection = useConnection();

  const isTarget = connection.inProgress && connection.fromNode.id !== id;
  const label = "";

  return (
    <div className="customNode">
      <div
        className="customNodeBody"
        style={{
          borderStyle: isTarget ? 'dashed' : 'solid',
          backgroundColor: isTarget ? '#ffcce3' : '#ccd9f6',
          padding: '10px',
          borderRadius: '5px',
        }}
      >
        {!connection.inProgress && (
          <Handle
            className="customHandle"
            position={Position.Right}
            type="source"
            isConnectable={isConnectable}
          />
        )}
        {(!connection.inProgress || isTarget) && (
          <Handle
            className="customHandle"
            position={Position.Left}
            type="target"
            isConnectable={isConnectable}
            isConnectableStart={false}
          />
        )}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ width: '100%', border: 'none', background: 'transparent' }}
          rows={3}
        />
        {label}
      </div>
    </div>
  );
}
