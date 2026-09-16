import { AlertTriangle, ShieldAlert, Info, CheckCircle } from "lucide-react";

const sevConfig = {
  critical: { icon: ShieldAlert, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
  warning: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  info: { icon: Info, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
};

export default function UnitAlerts({ alerts, onResolve }) {
  if (alerts.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Histórico de Alertas</h3>
        <div className="flex items-center gap-2 text-slate-500 text-sm py-4">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          Nenhum alerta registrado para esta unidade.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
      <h3 className="text-sm font-semibold text-white mb-4">Histórico de Alertas</h3>
      <div className="space-y-2">
        {alerts.map((alert) => {
          const cfg = sevConfig[alert.severity];
          const Icon = cfg.icon;
          return (
            <div key={alert.id} className={`flex items-center gap-3 p-3 rounded-lg border ${cfg.border} ${cfg.bg}`}>
              <Icon className={`w-4 h-4 ${cfg.color} shrink-0`} />
              <div className="flex-1">
                <p className="text-sm text-slate-200">{alert.message}</p>
                <p className="text-xs text-slate-500 capitalize">{alert.type}</p>
              </div>
              {alert.resolved ? (
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Resolvido
                </span>
              ) : (
                <button
                  onClick={() => onResolve(alert.id)}
                  className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                >
                  Resolver
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}