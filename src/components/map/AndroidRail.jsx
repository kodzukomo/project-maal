import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight, Signal } from "lucide-react";

const statusConfig = {
  operational: { label: "Operacional", text: "text-blue-400", dot: "bg-blue-400" },
  warning: { label: "Atenção", text: "text-amber-400", dot: "bg-amber-400" },
  critical: { label: "Crítico", text: "text-red-400", dot: "bg-red-400" },
  offline: { label: "Offline", text: "text-slate-500", dot: "bg-slate-500" },
};

function SignalBars({ battery, status }) {
  const level = status === "offline" ? 0 : battery > 66 ? 3 : battery > 33 ? 2 : 1;
  return (
    <div className="flex items-end gap-0.5 h-3">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-1 rounded-sm ${i <= level ? "bg-primary" : "bg-border"}`}
          style={{ height: `${i * 33}%` }}
        />
      ))}
    </div>
  );
}

export default function AndroidRail({ androids, selectedId, onFocus }) {
  const [q, setQ] = useState("");
  const filtered = androids.filter(
    (a) =>
      a.name.toLowerCase().includes(q.toLowerCase()) ||
      a.location_name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="absolute top-24 right-4 bottom-20 z-[1000] w-[340px] max-w-[calc(100vw-2rem)] flex flex-col rounded-xl border border-border bg-card/70 backdrop-blur-md shadow-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-border">
        <p className="font-display font-semibold text-foreground text-sm">Unidades em Operação</p>
        <div className="mt-2 relative">
          <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar unidade ou setor..."
            className="w-full bg-background/60 border border-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
        {filtered.map((a) => {
          const cfg = statusConfig[a.status];
          return (
            <div
              key={a.id}
              className={`group rounded-lg p-2.5 border transition-colors cursor-pointer ${
                selectedId === a.id ? "border-primary bg-primary/10" : "border-transparent hover:bg-background/40 hover:border-border"
              }`}
              onClick={() => onFocus(a)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground text-xs">{a.name}</span>
                <span className={`text-[10px] font-medium ${cfg.text}`}>{cfg.label}</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{a.location_name}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1.5">
                  <SignalBars battery={a.battery} status={a.status} />
                  <span className="text-[10px] text-muted-foreground font-mono">{a.battery}%</span>
                </div>
                <Link
                  to={`/unidade/${a.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-0.5 text-[10px] text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Detalhes <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-6">Nenhuma unidade encontrada.</p>
        )}
      </div>
    </div>
  );
}