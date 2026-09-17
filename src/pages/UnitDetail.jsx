import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { ArrowLeft, Battery, Thermometer, Cpu, ShieldCheck, MapPin, ClipboardList } from "lucide-react";
import TelemetryCard from "@/components/TelemetryCard";
import RemoteControl from "@/components/RemoteControl";
import UnitAlerts from "@/components/UnitAlerts";

const statusConfig = {
  operational: { label: "Operacional", dot: "bg-blue-400", text: "text-blue-400", badge: "bg-blue-500/10 border-blue-500/20" },
  warning: { label: "Atenção", dot: "bg-amber-400", text: "text-amber-400", badge: "bg-amber-500/10 border-amber-500/20" },
  critical: { label: "Crítico", dot: "bg-red-400", text: "text-red-400", badge: "bg-red-500/10 border-red-500/20" },
  offline: { label: "Offline", dot: "bg-slate-500", text: "text-slate-500", badge: "bg-slate-500/10 border-slate-500/20" },
};

export default function UnitDetail() {
  const { id } = useParams();
  const [android, setAndroid] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const [a, al] = await Promise.all([
      base44.entities.Android.get(id),
      base44.entities.Alert.filter({ android_id: id }),
    ]);
    setAndroid(a);
    setAlerts(al);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [id]);

  const sendCommand = async (cmd) => {
    const updates = {
      standby: { status: "warning", current_task: "Modo Standby — tarefas pausadas", last_command: cmd.label },
      return_base: { current_task: "Retornando à base", last_command: cmd.label },
      diagnostics: { current_task: "Executando diagnóstico de hardware", last_command: cmd.label },
      shutdown: { status: "offline", current_task: "Desligamento de emergência executado", last_command: cmd.label },
    };
    await base44.entities.Android.update(id, updates[cmd.id]);
    await load();
  };

  const resolveAlert = async (alertId) => {
    await base44.entities.Alert.update(alertId, { resolved: true });
    await load();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!android) {
    return (
      <div className="p-8 text-center">
        <p className="text-muted-foreground">Unidade não encontrada.</p>
        <Link to="/" className="text-primary text-sm mt-2 inline-block">Voltar ao painel</Link>
      </div>
    );
  }

  const cfg = statusConfig[android.status];
  const batteryStatus = android.battery < 20 ? "crit" : android.battery < 50 ? "warn" : "good";
  const tempStatus = android.temperature > 75 ? "crit" : android.temperature > 60 ? "warn" : "good";
  const cpuStatus = android.cpu_load > 85 ? "crit" : android.cpu_load > 70 ? "warn" : "good";
  const hwStatus = android.hardware_integrity < 50 ? "crit" : android.hardware_integrity < 80 ? "warn" : "good";

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-[1400px] mx-auto">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" /> Voltar ao painel
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center">
            <Cpu className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">{android.name}</h1>
            <p className="text-sm text-muted-foreground">{android.model} · {android.last_command}</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${cfg.badge} ${cfg.text} self-start`}>
          <span className={`w-2 h-2 rounded-full ${cfg.dot} ${android.status !== "offline" ? "animate-pulse" : ""}`}></span>
          {cfg.label}
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <TelemetryCard icon={Battery} label="Bateria" value={android.battery} unit="%" status={batteryStatus} />
        <TelemetryCard icon={Thermometer} label="Temperatura" value={android.temperature} unit="°C" status={tempStatus} />
        <TelemetryCard icon={Cpu} label="Carga de CPU" value={android.cpu_load} unit="%" status={cpuStatus} />
        <TelemetryCard icon={ShieldCheck} label="Integridade HW" value={android.hardware_integrity} unit="%" status={hwStatus} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card/40 p-5">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-display font-semibold text-foreground">Localização</h3>
            </div>
            <p className="text-foreground">{android.location_name}</p>
            <p className="text-xs text-muted-foreground mt-1 font-mono">{android.latitude.toFixed(4)}, {android.longitude.toFixed(4)}</p>
          </div>

          <div className="rounded-xl border border-border bg-card/40 p-5">
            <div className="flex items-center gap-2 mb-3">
              <ClipboardList className="w-4 h-4 text-primary" />
              <h3 className="text-sm font-display font-semibold text-foreground">Tarefa em Execução</h3>
            </div>
            <p className="text-foreground">{android.current_task}</p>
          </div>

          <UnitAlerts alerts={alerts} onResolve={resolveAlert} />
        </div>

        <RemoteControl android={android} onSendCommand={sendCommand} />
      </div>
    </div>
  );
}