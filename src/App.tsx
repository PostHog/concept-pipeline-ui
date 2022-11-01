/**
 * This example shows how you can use custom nodes and edges to dynamically add elements to your react flow graph.
 * A global layouting function calculates the new positions for the nodes every time the graph changes and animates existing nodes to their new position.
 *
 * There are three ways of adding nodes to the graph:
 *  1. Click an existing node: Create a new child node of the clicked node
 *  2. Click on the plus icon of an existing edge: Create a node in between the connected nodes of the edge
 *  3. Click a placeholder node: Turn the placeholder into a "real" node to prevent jumping of the layout
 *
 * The graph elements are added via hook calls in the custom nodes and edges. The layout is calculated every time the graph changes (see hooks/useLayout.ts).
 **/
import React from "react";
import ReactFlow, {
  Background,
  ConnectionLineType,
  ConnectionMode,
  Edge,
  Node,
  ProOptions,
  ReactFlowProvider,
} from "reactflow";

import useLayout from "./hooks/useLayout";
import nodeTypes from "./NodeTypes";
import edgeTypes from "./EdgeTypes";

import "reactflow/dist/style.css";
import {
  clickhouseId,
  horizontalSpacing,
  newDestinationId,
  newSourceId,
  verticalSpacing,
} from "./utils";

const proOptions: ProOptions = { account: "paid-pro", hideAttribution: true };

// initial setup: one workflow node and a placeholder node
// placeholder nodes can be turned into a workflow node by click
const defaultNodes: Node[] = [
  {
    id: "1",
    data: {
      label: "Web App",
      img: "js.png",
      pipelineNumber: 0,
    },
    position: { x: 0, y: 0 },
    type: "workflow",
  },
  {
    id: "2",
    data: {
      label: "Clearbit Enrichment",
      pipelineNumber: 0,
    },
    position: { x: horizontalSpacing, y: 0 },
    type: "transformation",
  },
  {
    id: clickhouseId,
    data: { label: "Clickhouse", pipelineNumber: 0 },
    position: { x: horizontalSpacing * 2, y: 0 },
    type: "clickhouse",
  },
  {
    id: "4",
    data: {
      label: "BigQuery",
      img: "bigquery.svg",
      pipelineNumber: 0,
    },
    position: { x: horizontalSpacing * 3, y: 0 },
    type: "workflow",
  },
  {
    id: "5",
    data: { label: "New Source", numPipelines: 1 },
    position: { x: 0, y: verticalSpacing },
    type: "newSource",
  },
  {
    id: "6",
    data: { label: "New Destination", numPipelines: 1 },
    position: { x: horizontalSpacing * 3, y: verticalSpacing },
    type: "newDestination",
  },
];

const newSource: Node[] = [];

// initial setup: connect the workflow node to the placeholder node with a placeholder edge
const defaultEdges: Edge[] = [
  {
    id: "1=>2",
    source: "1",
    target: "2",
    type: "transformation",
  },
  {
    id: `2=>${clickhouseId}`,
    source: "2",
    target: clickhouseId,
    type: "transformation",
  },
  {
    id: `${clickhouseId}=>`,
    source: clickhouseId,
    target: "4",
    type: "workflow",
  },
];

const fitViewOptions = {
  padding: 0.2,
};

function ReactFlowPro() {
  // this hook call ensures that the layout is re-calculated every time the graph changes
  useLayout();

  return (
    <ReactFlow
      defaultNodes={defaultNodes}
      defaultEdges={defaultEdges}
      proOptions={proOptions}
      fitView
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitViewOptions={fitViewOptions}
      minZoom={0.2}
      nodesDraggable={false}
      nodesConnectable={false}
      zoomOnDoubleClick={false}
    >
      <Background />
    </ReactFlow>
  );
}

function ReactFlowWrapper() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "10px",
          top: "10px",
          zIndex: "100",
        }}
      >
        <label style={{ padding: "10px 10px" }}>Environment:</label>
        <select name="cars" id="cars">
          <option value="Production">Production</option>
          <option value="Staging">Staging</option>
        </select>
      </div>
      <ReactFlowProvider>
        <ReactFlowPro />
      </ReactFlowProvider>
    </>
  );
}

export default ReactFlowWrapper;
