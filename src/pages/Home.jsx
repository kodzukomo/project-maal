import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useIsMobile } from "@/hooks/use-mobile";
import FleetMap, { FACTORY_CENTER } from "@/components/FleetMap";
import MapHeader from "@/components/map/MapHeader";
import MetricBar from "@/components/map/MetricBar";
import AndroidRail from "@/components/map/AndroidRail";
import MapControls from "@/components/map/MapControls";
import MobileTopBar from "@/components/map/MobileTopBar";
import MobileFleetSheet from "@/components/map/MobileFleetSheet";
import { ShieldAlert, ArrowRight } from "lucide-react";

export default function Home() {
  const [androids, setAndroids] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [map, setMap] = useState(null);
  const [showGrid, setShowGrid] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const load = async () => {
      const [a, al] = await Promise.all([
        base44.entities.Android.list(),
        base44.entities.Alert.filter({ resolved: false }),
      ]);
      setAndroids(a);
      setAlerts(al);
      setLoading(false);
    };
    load();
    const unsub = base44.entities.Android.subscribe(() => load());
    return unsub;
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  const active = androids.filter((a) => a.status !== "offline");
  const activeMissions = androids.filter(
    (a) => a.status !== "offline" && a.current_task && a.current_task !== "Inativo"
  ).length;
  const batteryAvg = active.length ? Math.round(active.reduce((s, a) => s + a.battery, 0) / active.length) : 0;
  const criticalAlerts = alerts.filter((a) => a.severity === "critical");

  const handleFocus = (a) => setSelectedId(a.id);
  const handleRecenter = () => {
    map?.flyTo(FACTORY_CENTER, 17, { duration: 0.6 });
    setSelectedId(null);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <FleetMap androids={androids} selectedId={selectedId} onSelect={setSelectedId} onMapReady={setMap} />

      {showGrid && <div className="radar-grid pointer-events-none absolute inset-0 z-[400]"></div>}

      {criticalAlerts.length > 0 && (
        <Link
          to={`/unidade/${criticalAlerts[0].android_id}`}
          className="absolute left-1/2 -translate-x-1/2 top-16 md:top-4 z-[1000] flex items-center gap-2 rounded-full border border-red-500/40 bg-red-950/70 backdrop-blur-md px-4 py-2 shadow-xl max-w-[90vw]"
        >
          <ShieldAlert className="w-4 h-4 text-red-400 animate-pulse shrink-0" />
          <span className="text-xs text-red-200 font-medium truncate">
            {criticalAlerts[0].android_name}: {criticalAlerts[0].message}
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-red-300 shrink-0" />
        </Link>
      )}

      {isMobile ? (
        <>
          <MobileTopBar factoryName="NEXUS Prime" activeCount={active.length} />
          <MobileFleetSheet androids={androids} onFocus={handleFocus} />
        </>
      ) : (
        <>
          <MapHeader factoryName="NEXUS Prime — Complexo Industrial" />
          <MetricBar total={androids.length} activeMissions={activeMissions} batteryAvg={batteryAvg} />
          <AndroidRail androids={androids} selectedId={selectedId} onFocus={handleFocus} />
          <MapControls
            map={map}
            onRecenter={handleRecenter}
            showGrid={showGrid}
            onToggleGrid={() => setShowGrid((s) => !s)}
          />
        </>
      )}
    </div>
  );
}