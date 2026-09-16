import { Outlet, Link, useLocation } from "react-router-dom";
import { Cpu, LayoutDashboard, AlertTriangle, Map } from "lucide-react";

export default function Layout() {
  const location = useLocation();
  const navItems = [
    { label: "Painel", path: "/", icon: LayoutDashboard },
    { label: "Mapa", path: "/", icon: Map, hash: "#mapa" },
    { label: "Alertas", path: "/", icon: AlertTriangle, hash: "#alertas" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <aside className="w-60 shrink-0 border-r border-slate-800 bg-slate-900/60 backdrop-blur flex flex-col">
        <div className="px-6 py-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-bold tracking-wider text-white">NEXUS AI</p>
            <p className="text-[10px] text-cyan-400/70 tracking-widest uppercase">Fleet Control</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path && !item.hash;
            return (
              <Link
                key={item.label}
                to={item.path + (item.hash || "")}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-4 py-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Sistema operacional
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}