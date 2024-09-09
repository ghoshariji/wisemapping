import React from 'react';

const CanvasToolbar = ({ onAddNode, onClearCanvas, onSave }) => {
  return (
    <div className="toolbar bg-muted/50 p-4 flex justify-between items-center">
      <button className="btn btn-primary" onClick={onAddNode}>Add Node</button>
      <button className="btn btn-secondary" onClick={onClearCanvas}>Clear</button>
      <button className="btn btn-accent" onClick={onSave}>Save</button>
    </div>
  );
};

export default CanvasToolbar;
