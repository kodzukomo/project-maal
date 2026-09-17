import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight } from "lucide-react";

const statusConfig = {
  operational: { label: "Operational", text: "text-blue-400", dot: "bg-blue-400" },
  warning: { label: "Warning", text: "text-slate-400", dot: "bg-slate-400" },
  critical: { label: "Critical", text: "text-red-400", dot: "bg-red-400" },
  offline: { label: "Offline", text: "text-slate-500", dot: "bg-slate-500" },
};

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
        <p className="font-display font-semibold text-foreground text-sm">Active Units</p>
        <div className="mt-2 relative">
          <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search unit or sector..."
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
              <div className="flex items-center justify-end mt-2">
                <Link
                  to={`/unidade/${a.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-0.5 text-[10px] text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-6">No units found.</p>
        )}
      </div>
    </div>
  );
}