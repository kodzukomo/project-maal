import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./fleetMap.css";
import { Link } from "react-router-dom";

export const FACTORY_CENTER = [-23.549, -46.6388];

const statusColor = {
  operational: "#3B82F6",
  warning: "#94A3B8",
  critical: "#EF4444",
  offline: "#64748B",
};

const statusLabel = {
  operational: "Operational",
  warning: "Warning",
  critical: "Critical",
  offline: "Offline",
};

function makeIcon(status) {
  const c = statusColor[status];
  const pulse = status !== "offline";
  return L.divIcon({
    className: "factory-marker",
    html: `<div class="fm-core" style="background:${c}"></div>${pulse ? `<div class="fm-halo" style="border-color:${c}"></div>` : ""}`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

function MapEvents({ onReady, selected, androids }) {
  const map = useMap();
  useEffect(() => {
    onReady(map);
  }, [map]);
  useEffect(() => {
    if (selected) {
      const a = androids.find((x) => x.id === selected);
      if (a) map.flyTo([a.latitude, a.longitude], 19, { duration: 0.7 });
    }
  }, [selected]);
  return null;
}

export default function FleetMap({ androids, selectedId, onSelect, onMapReady }) {
  return (
    <div className="h-full w-full">
      <MapContainer
        center={FACTORY_CENTER}
        zoom={17}
        zoomControl={false}
        style={{ height: "100%", width: "100%", background: "#0B0F17" }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Esri, Maxar, Earthstar Geographics"
        />
        {androids.map((a) => (
          <Marker
            key={a.id}
            position={[a.latitude, a.longitude]}
            icon={makeIcon(a.status)}
            eventHandlers={{ click: () => onSelect(a.id) }}
          >
            <Popup>
              <div className="text-xs space-y-0.5">
                <p className="font-bold text-sm">{a.name}</p>
                <p className="text-slate-400">{a.model}</p>
                <p>📍 {a.location_name}</p>
                <p className="font-mono">🌡 {a.temperature}°C</p>
                <p className="font-mono text-slate-400">{statusLabel[a.status]}</p>
                <Link to={`/unidade/${a.id}`} className="text-blue-400 font-semibold hover:underline">
                  View details →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
        <MapEvents onReady={onMapReady} selected={selectedId} androids={androids} />
      </MapContainer>
    </div>
  );
}