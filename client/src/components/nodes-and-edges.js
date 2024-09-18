import { Position } from "@xyflow/react";

const nodeDefaults = {
  sourcePosition: Position.Right,
  targetPosition: Position.Left,
  style: {
    backgroundColor: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

const initialNodes = [

  {
    id: "1",
    position: { x: 0, y: 0 },
    data: {
      label: "⬛️",
    },
    ...nodeDefaults,
  },
  {
    id: "2",
    position: { x: 250, y: -100 },
    data: {
      label: "🟩",
    },
    ...nodeDefaults,
  },
  {
    id: "3",
    position: { x: 250, y: 100 },
    data: {
      label: "🟧",
    },
    ...nodeDefaults,
  },
  {
    id: "4",
    position: { x: 500, y: 0 },
    data: {
      label: "🟦",
    },
    ...nodeDefaults,
  },
  {
    id: "5",
    type: "ResizableNode",
    data: { label: "NodeResizer" },
    position: { x: 0, y: 50 },
    style: {
      background: "#fff",
      border: "1px solid black",
      borderRadius: 15,
      fontSize: 12,
    },
  },
  {
    id: "6",
    type: "ResizableNodeSelected",
    data: { label: "NodeResizer when selected" },
    position: { x: 100, y: 300 },
    style: {
      background: "#fff",
      border: "1px solid black",
      borderRadius: 15,
      fontSize: 12,
    },
  },
  {
    id: "7",
    type: "CustomResizerNode",
    data: { label: "Custom Resize Icon" },
    position: { x: 150, y: 150 },
    style: {
      background: "#fff",
      fontSize: 12,
      border: "1px solid black",
      padding: 5,
      borderRadius: 15,
      height: 100,
    },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
  },
  {
    id: "e1-3",
    source: "1",
    target: "3",
  },
];

export { initialEdges, initialNodes };
