import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronUp, MapPin, ArrowUpRight } from "lucide-react";

export default function MobileFleetSheet({ androids, onFocus }) {
  const [open, setOpen] = useState(false);
  const active = androids.filter((a) => a.status !== "offline");

  return (
    <div className="md:hidden absolute bottom-0 left-0 right-0 z-[1000]">
      <div className={`rounded-t-2xl border-t border-border bg-card/85 backdrop-blur-md transition-all duration-300 ${open ? "h-[55vh]" : "h-16"}`}>
        <button onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-display font-semibold text-foreground text-sm">{active.length} active units</span>
          </div>
          <ChevronUp className={`w-5 h-5 text-muted-foreground transition-transform ${open ? "" : "rotate-180"}`} />
        </button>
        {open && (
          <div className="overflow-y-auto h-[calc(55vh-4rem)] px-3 pb-4 space-y-2">
            {androids.map((a) => (
              <div key={a.id} className="rounded-lg border border-border bg-background/50 p-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground text-sm">{a.name}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">{a.location_name}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => {
                      onFocus(a);
                      setOpen(false);
                    }}
                    className="flex items-center gap-1.5 text-xs text-primary font-medium"
                  >
                    <MapPin className="w-3.5 h-3.5" /> Locate
                  </button>
                  <Link to={`/unidade/${a.id}`} className="flex items-center gap-1.5 text-xs text-muted-foreground ml-auto">
                    Details <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}