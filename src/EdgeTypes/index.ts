import PlaceholderEdge from "./PlaceholderEdge";
import TransformationEdge from "./TransformationEdge";
import WorkflowEdge from "./WorkflowEdge";

export const edgeTypes = {
  placeholder: PlaceholderEdge,
  workflow: WorkflowEdge,
  transformation: TransformationEdge,
};

export default edgeTypes;
