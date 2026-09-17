import { AlertTriangle, ShieldAlert, Info, CheckCircle } from "lucide-react";

const sevConfig = {
  critical: { icon: ShieldAlert, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
  warning: { icon: AlertTriangle, color: "text-slate-400", bg: "bg-slate-500/10", border: "border-slate-500/20" },
  info: { icon: Info, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
};

export default function UnitAlerts({ alerts, onResolve }) {
  if (alerts.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card/40 p-5">
        <h3 className="text-sm font-display font-semibold text-foreground mb-3">Alert History</h3>
        <div className="flex items-center gap-2 text-muted-foreground text-sm py-4">
          <CheckCircle className="w-4 h-4 text-blue-400" />
          No alerts recorded for this unit.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card/40 p-5">
      <h3 className="text-sm font-display font-semibold text-foreground mb-4">Alert History</h3>
      <div className="space-y-2">
        {alerts.map((alert) => {
          const cfg = sevConfig[alert.severity];
          const Icon = cfg.icon;
          return (
            <div key={alert.id} className={`flex items-center gap-3 p-3 rounded-lg border ${cfg.border} ${cfg.bg}`}>
              <Icon className={`w-4 h-4 ${cfg.color} shrink-0`} />
              <div className="flex-1">
                <p className="text-sm text-foreground">{alert.message}</p>
                <p className="text-xs text-muted-foreground capitalize font-mono">{alert.type}</p>
              </div>
              {alert.resolved ? (
                <span className="text-xs text-blue-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Resolved
                </span>
              ) : (
                <button
                  onClick={() => onResolve(alert.id)}
                  className="text-xs px-2.5 py-1 rounded-md bg-border/60 text-foreground hover:bg-border transition-colors"
                >
                  Resolve
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}