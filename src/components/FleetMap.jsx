import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./fleetMap.css";
import { Link } from "react-router-dom";

const statusColor = {
  operational: "#34d399",
  warning: "#fbbf24",
  critical: "#f87171",
  offline: "#64748b",
};

const statusLabel = {
  operational: "Operacional",
  warning: "Atenção",
  critical: "Crítico",
  offline: "Offline",
};

export default function FleetMap({ androids }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden h-[480px]">
      <MapContainer center={[20, 0]} zoom={2} minZoom={2} style={{ height: "100%", width: "100%", background: "#0f172a" }} scrollWheelZoom={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />
        {androids.map((a) => (
          <CircleMarker
            key={a.id}
            center={[a.latitude, a.longitude]}
            radius={a.status === "critical" ? 12 : 8}
            pathOptions={{
              color: statusColor[a.status],
              fillColor: statusColor[a.status],
              fillOpacity: a.status === "offline" ? 0.3 : 0.7,
              weight: 2,
            }}
          >
            <Tooltip>
              <div className="text-xs">
                <strong>{a.name}</strong> — {statusLabel[a.status]}
              </div>
            </Tooltip>
            <Popup>
              <div className="text-xs space-y-1">
                <p className="font-bold text-sm">{a.name}</p>
                <p className="text-slate-500">{a.model}</p>
                <p>📍 {a.location_name}</p>
                <p>🔋 {a.battery}% · 🌡 {a.temperature}°C</p>
                <Link to={`/unidade/${a.id}`} className="text-cyan-600 font-semibold hover:underline">
                  Ver detalhes →
                </Link>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}