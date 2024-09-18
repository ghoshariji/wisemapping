// import React from 'react';
// import { BaseEdge, getStraightPath } from '@xyflow/react';

// function MindMapEdge(EdgeProps) {
//   const { sourceX, sourceY, targetX, targetY } = EdgeProps;

//   const [edgePath] = getStraightPath({
//     sourceX,
//     sourceY: sourceY + 20,
//     targetX,
//     targetY,
//   });

//   return <BaseEdge path={edgePath} {...EdgeProps} />;
// }

// export default MindMapEdge;


// import React from 'react';
// import { getBezierPath } from 'react-flow-renderer';

// const MindMapEdge = ({
//   id,
//   sourceX,
//   sourceY,
//   targetX,
//   targetY,
//   sourcePosition,
//   targetPosition,
// }) => {
//   const edgePath = getBezierPath({
//     sourceX,
//     sourceY,
//     sourcePosition,
//     targetX,
//     targetY,
//     targetPosition,
//   });

//   return (
//     <>
//       <path
//         id={id}
//         className="react-flow__edge-path stroke-2 stroke-gray-400"
//         d={edgePath}
//       />
//     </>
//   );
// };

// export default MindMapEdge;


import React from 'react';
import { BaseEdge } from '@xyflow/react';

const MindMapEdge = () => {
  return (
    <BaseEdge
      pathOptions={{ radius: 20 }}
      style={{ stroke: 'black', strokeWidth: 2 }}
    />
  );
};

export default MindMapEdge;