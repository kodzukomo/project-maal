import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import StatusOverview from "@/components/StatusOverview";
import FleetMap from "@/components/FleetMap";
import FleetTable from "@/components/FleetTable";
import AlertBanner from "@/components/AlertBanner";
import { Activity } from "lucide-react";

export default function Home() {
  const [androids, setAndroids] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-slate-700 border-t-cyan-400 rounded-full animate-spin"></div>
      </div>
    );
  }

  const criticalAlerts = alerts.filter((a) => a.severity === "critical");

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Painel de Operações</h1>
          <p className="text-sm text-slate-400 mt-1">Monitoramento em tempo real da frota de androides humanoides</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-300 font-medium">Telemetria ativa</span>
        </div>
      </div>

      <AlertBanner criticalAlerts={criticalAlerts} />

      <StatusOverview androids={androids} />

      <div id="mapa">
        <FleetMap androids={androids} />
      </div>

      <div id="alertas">
        <FleetTable androids={androids} />
      </div>
    </div>
  );
}