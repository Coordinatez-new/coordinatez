import { networkNodes, networkArcs } from "@/data/network";

// Equirectangular projection cropped to the band our network occupies
// (Chicago in the west through Sydney in the south-east).
const LON_MIN = -130;
const LON_MAX = 158;
const LAT_MAX = 70;
const LAT_MIN = -40;
const W = 1000;
const H = 470;

function project(lat: number, lon: number): [number, number] {
  const x = ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * W;
  const y = ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H;
  return [Math.round(x), Math.round(y)];
}

const positioned = networkNodes.map((node) => {
  const [x, y] = project(node.lat, node.lon);
  return { ...node, x, y };
});
const byId = Object.fromEntries(positioned.map((n) => [n.id, n]));

// Label placement tweaks for clustered west-India nodes.
const labelOffset: Record<string, { dx: number; dy: number; anchor: "start" | "middle" | "end" }> = {
  chicago: { dx: 0, dy: -16, anchor: "middle" },
  mehsana: { dx: 14, dy: -10, anchor: "start" },
  mundra: { dx: -2, dy: 24, anchor: "end" },
  dubai: { dx: -14, dy: -6, anchor: "end" },
  houston: { dx: 0, dy: 22, anchor: "middle" },
  rotterdam: { dx: 0, dy: -14, anchor: "middle" },
  singapore: { dx: 14, dy: 4, anchor: "start" },
  shanghai: { dx: 14, dy: -4, anchor: "start" },
  sydney: { dx: 0, dy: 22, anchor: "middle" },
};

/**
 * Animated 2D global network map — server-rendered SVG, CSS-driven motion,
 * zero JavaScript. Nodes are real coordinates; arcs mirror the 3D globe's
 * connections.
 */
export function TradeNetworkMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Map of the Coordinatez global network connecting Chicago, Gujarat, and Sydney with partner markets and hubs"
      className={className}
    >
      {/* graticule */}
      <g stroke="currentColor" strokeWidth="0.6" opacity="0.1">
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`v${i}`} x1={(i + 1) * (W / 11)} y1="0" x2={(i + 1) * (W / 11)} y2={H} />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={(i + 1) * (H / 6)} x2={W} y2={(i + 1) * (H / 6)} />
        ))}
      </g>

      {/* arcs */}
      <g fill="none" strokeLinecap="round">
        {networkArcs.map(({ from, to }) => {
          const a = byId[from];
          const b = byId[to];
          if (!a || !b) return null;
          const midX = (a.x + b.x) / 2;
          const midY = Math.min(a.y, b.y) - Math.abs(a.x - b.x) * 0.16 - 18;
          const isTech = from === "chicago" && to === "mehsana";
          return (
            <path
              key={`${from}-${to}`}
              d={`M ${a.x} ${a.y} Q ${midX} ${midY} ${b.x} ${b.y}`}
              stroke={isTech ? "#4aa3dc" : "#d3915a"}
              strokeWidth={isTech ? 2 : 1.4}
              strokeDasharray="5 8"
              opacity={isTech ? 0.9 : 0.6}
              className="animate-dash-flow"
            />
          );
        })}
      </g>

      {/* nodes + labels */}
      {positioned.map((node) => {
        const isHub = node.kind !== "market";
        const color =
          node.kind === "headquarters"
            ? "#7dc0ea"
            : node.kind === "development"
              ? "#4aa3dc"
              : node.kind === "office"
                ? "#5cb0ea"
                : "#d3915a";
        const offset = labelOffset[node.id] ?? { dx: 0, dy: -12, anchor: "middle" as const };
        return (
          <g key={node.id}>
            <circle cx={node.x} cy={node.y} r={isHub ? 6 : 4} fill={color} />
            <circle
              cx={node.x}
              cy={node.y}
              r={isHub ? 6 : 4}
              fill={color}
              opacity="0.45"
              className="animate-node-pulse"
              style={{ transformBox: "fill-box" }}
            />
            <text
              x={node.x + offset.dx}
              y={node.y + offset.dy}
              textAnchor={offset.anchor}
              fontSize="11"
              letterSpacing="0.14em"
              fill="currentColor"
              opacity={isHub ? 0.95 : 0.65}
              fontFamily="var(--font-plex-mono), monospace"
            >
              {node.city.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
