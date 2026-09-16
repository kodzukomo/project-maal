import { Cpu, CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";

export default function StatusOverview({ androids }) {
  const total = androids.length;
  const operational = androids.filter((a) => a.status === "operational").length;
  const warning = androids.filter((a) => a.status === "warning").length;
  const critical = androids.filter((a) => a.status === "critical").length;

  const cards = [
    { label: "Frota Total", value: total, icon: Cpu, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
    { label: "Operacionais", value: operational, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { label: "Atenção", value: warning, icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    { label: "Críticos", value: critical, icon: ShieldAlert, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.label} className={`rounded-xl border ${c.border} ${c.bg} bg-slate-900/40 p-4 backdrop-blur`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider">{c.label}</p>
                <p className="text-3xl font-bold text-white mt-1">{c.value}</p>
              </div>
              <Icon className={`w-8 h-8 ${c.color}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}