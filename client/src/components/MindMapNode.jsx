import React, { useState, useEffect, useCallback } from "react";
import { Handle, Position, NodeResizer } from "@xyflow/react";

const MindMapNode = ({ data }) => {
  const [isResizerVisible, setIsResizerVisible] = useState(false);

  const handleClick = () => {
    setIsResizerVisible((prev) => !prev);
  };

  const handleClickOutside = useCallback((event) => {
    if (!event.target.closest(".mind-map-node")) {
      setIsResizerVisible(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div
      className="mind-map-node px-4 border rounded shadow-md bg-white"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="text-center text-sm">{data.label}</div>
      <div className="flex justify-center mt-2">
        {/* Source Handles */}
        <Handle
          type="source"
          position={Position.Right}
          id={`source-${data.id}-right`} // Ensure data.id is defined
          className="w-1 h-1 bg-blue-500"
        />
        <Handle
          type="source"
          position={Position.Bottom}
          id={`source-${data.id}-bottom`} // Ensure data.id is defined
          className="w-1 h-1 bg-blue-500"
        />
        {/* Target Handles */}
        <Handle
          type="target"
          position={Position.Top}
          id={`target-${data.id}-top`} // Ensure data.id is defined
          className="w-1 h-1 bg-red-500"
        />
        <Handle
          type="target"
          position={Position.Left}
          id={`target-${data.id}-left`} // Ensure data.id is defined
          className="w-1 h-1 bg-red-500"
        />
      </div>

      <NodeResizer
        color="#ff0071"
        isVisible={isResizerVisible}
        minWidth={100}
        minHeight={30}
      />
    </div>
  );
};

export default MindMapNode;