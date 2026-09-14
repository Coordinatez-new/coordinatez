// Shared geographic data for the 3D globe and 2D trade-network map.
// Chicago, Gujarat, and Sydney are Coordinatez locations — every other node is a
// market/trade hub we connect to, never presented as an office.
export type NetworkNode = {
  id: string;
  city: string;
  region: string;
  lat: number;
  lon: number;
  kind: "headquarters" | "development" | "office" | "market";
};

export const networkNodes: NetworkNode[] = [
  { id: "chicago", city: "Chicago", region: "United States — Global HQ", lat: 41.9848, lon: -87.8459, kind: "headquarters" },
  { id: "mehsana", city: "Gujarat", region: "India — Technology & Development", lat: 23.588, lon: 72.3693, kind: "development" },
  { id: "sydney", city: "Sydney", region: "Australia — Asia-Pacific Office", lat: -33.82, lon: 151.0, kind: "office" },
  { id: "houston", city: "Houston", region: "US Gulf — Trade Corridor", lat: 29.7604, lon: -95.3698, kind: "market" },
  { id: "rotterdam", city: "Rotterdam", region: "Europe — Port Market", lat: 51.9244, lon: 4.4777, kind: "market" },
  { id: "dubai", city: "Dubai", region: "Middle East — Trade Hub", lat: 25.2048, lon: 55.2708, kind: "market" },
  { id: "mundra", city: "Mundra", region: "India — West-Coast Port", lat: 22.8387, lon: 69.7218, kind: "market" },
  { id: "singapore", city: "Singapore", region: "Southeast Asia — Trade Hub", lat: 1.3521, lon: 103.8198, kind: "market" },
  { id: "shanghai", city: "Shanghai", region: "East Asia — Port Market", lat: 31.2304, lon: 121.4737, kind: "market" },
];

// Great-circle connections drawn on the globe / map.
export const networkArcs: { from: string; to: string }[] = [
  { from: "chicago", to: "mehsana" },
  { from: "chicago", to: "houston" },
  { from: "chicago", to: "rotterdam" },
  { from: "mehsana", to: "mundra" },
  { from: "mundra", to: "dubai" },
  { from: "mundra", to: "singapore" },
  { from: "rotterdam", to: "dubai" },
  { from: "singapore", to: "shanghai" },
  { from: "houston", to: "mundra" },
  { from: "singapore", to: "sydney" },
  { from: "mehsana", to: "sydney" },
];
