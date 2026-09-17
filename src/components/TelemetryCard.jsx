export default function TelemetryCard({ icon: Icon, label, value, unit, status }) {
  const colorMap = {
    good: { text: "text-blue-400", border: "border-blue-500/20", bar: "bg-blue-500" },
    warn: { text: "text-amber-400", border: "border-amber-500/20", bar: "bg-amber-500" },
    crit: { text: "text-red-400", border: "border-red-500/20", bar: "bg-red-500" },
    neutral: { text: "text-primary", border: "border-primary/20", bar: "bg-primary" },
  };
  const c = colorMap[status] || colorMap.neutral;
  const num = parseFloat(value);

  return (
    <div className={`rounded-xl border ${c.border} bg-card/40 p-5`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-mono">{label}</span>
        {Icon && <Icon className={`w-4 h-4 ${c.text}`} />}
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-3xl font-display font-bold ${c.text}`}>{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </div>
      {!isNaN(num) && (
        <div className="w-full h-1.5 rounded-full bg-border overflow-hidden mt-3">
          <div className={`h-full rounded-full ${c.bar}`} style={{ width: `${Math.min(100, Math.max(0, num))}%` }} />
        </div>
      )}
    </div>
  );
}