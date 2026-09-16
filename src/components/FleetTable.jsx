import { Link } from "react-router-dom";
import { Battery, Thermometer, Cpu, ChevronRight } from "lucide-react";

const statusConfig = {
  operational: { label: "Operacional", dot: "bg-emerald-400", text: "text-emerald-400", badge: "bg-emerald-500/10 border-emerald-500/20" },
  warning: { label: "Atenção", dot: "bg-amber-400", text: "text-amber-400", badge: "bg-amber-500/10 border-amber-500/20" },
  critical: { label: "Crítico", dot: "bg-red-400", text: "text-red-400", badge: "bg-red-500/10 border-red-500/20" },
  offline: { label: "Offline", dot: "bg-slate-500", text: "text-slate-500", badge: "bg-slate-500/10 border-slate-500/20" },
};

function MiniBar({ value, color }) {
  return (
    <div className="w-16 h-1.5 rounded-full bg-slate-800 overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  );
}

export default function FleetTable({ androids }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-800">
        <h2 className="text-sm font-semibold text-white tracking-wide">Unidades da Frota</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b border-slate-800">
              <th className="px-5 py-3 font-medium">Unidade</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Localização</th>
              <th className="px-5 py-3 font-medium">Bateria</th>
              <th className="px-5 py-3 font-medium">Temp.</th>
              <th className="px-5 py-3 font-medium">CPU</th>
              <th className="px-5 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {androids.map((a) => {
              const cfg = statusConfig[a.status];
              return (
                <tr key={a.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="px-5 py-3">
                    <p className="font-medium text-white">{a.name}</p>
                    <p className="text-xs text-slate-500">{a.model}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.badge} ${cfg.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`}></span>
                      {cfg.label}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slate-400">{a.location_name}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Battery className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-slate-300 text-xs w-8">{a.battery}%</span>
                      <MiniBar value={a.battery} color={a.battery < 20 ? "bg-red-500" : a.battery < 50 ? "bg-amber-500" : "bg-emerald-500"} />
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <Thermometer className="w-3.5 h-3.5 text-slate-500" />
                      <span className={a.temperature > 75 ? "text-red-400" : "text-slate-300"}>{a.temperature}°C</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-3.5 h-3.5 text-slate-500" />
                      <MiniBar value={a.cpu_load} color={a.cpu_load > 85 ? "bg-red-500" : "bg-cyan-500"} />
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <Link to={`/unidade/${a.id}`} className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-xs font-medium">
                      Detalhes <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}