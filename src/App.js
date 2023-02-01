import { graphNew } from "@quantumblack/kedro-viz/lib/utils/graph";
import data from "./test-data.json";
import { curveBasis, line } from "d3-shape";

const output = graphNew({ nodes: data.nodes, edges: data.edges });

function App() {
  const lineShape = line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(curveBasis);

  const drawEdge = function (edge) {
    return lineShape(edge.points);
  };

  return (
    <svg
      style={{ margin: "0 auto", display: "block" }}
      width={output.size.width}
      height={output.size.height * 0.5}
      viewBox={`0 0 ${output.size.width} ${output.size.height}`}
    >
      {output.nodes.map((node) => (
        <g key={node.id}>
          <rect
            x={node.x - node.width / 2}
            y={node.y - node.height / 2}
            width={node.width}
            height={node.height}
            fillOpacity={0.2}
          />
          <text textAnchor="middle" y={node.y} x={node.x} dy={5}>
            {node.full_name}
          </text>
        </g>
      ))}
      <g>
        <defs>
          <marker
            id={"arrow"}
            key={"arrow"}
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerUnits="strokeWidth"
            markerWidth="8"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 L 4 5 z" />
          </marker>
        </defs>
        {output.edges.map((edge) => (
          <path
            d={drawEdge(edge)}
            fill="none"
            key={edge.source + edge.target}
            markerEnd="url(#arrow)"
            stroke="black"
          />
        ))}
      </g>
    </svg>
  );
}

export default App;
