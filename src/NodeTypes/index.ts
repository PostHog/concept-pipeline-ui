import { NodeTypes } from "reactflow";
import ClickhouseNode from "./ClickhouseNode";

import TransformationNode from "./TransformationNode";
import WorkflowNode from "./WorkflowNode";
import NewSource from "./NewSource";
import NewDestination from "./NewDestination";

// two different node types are needed for our example: workflow and placeholder nodes
const nodeTypes: NodeTypes = {
  newSource: NewSource,
  newDestination: NewDestination,
  workflow: WorkflowNode,
  clickhouse: ClickhouseNode,
  transformation: TransformationNode,
};

export default nodeTypes;
