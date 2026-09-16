export default function TelemetryCard({ icon: Icon, label, value, unit, status, children }) {
  const colorMap = {
    good: "text-emerald-400 border-emerald-500/20",
    warn: "text-amber-400 border-amber-500/20",
    crit: "text-red-400 border-red-500/20",
    neutral: "text-cyan-400 border-cyan-500/20",
  };
  const [textClass, borderClass] = colorMap[status].split(" ");

  return (
    <div className={`rounded-xl border ${borderClass} bg-slate-900/40 p-5`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-slate-400 uppercase tracking-wider">{label}</span>
        {Icon && <Icon className={`w-4 h-4 ${textClass}`} />}
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-3xl font-bold ${textClass}`}>{value}</span>
        {unit && <span className="text-sm text-slate-500">{unit}</span>}
      </div>
      {children}
    </div>
  );
}