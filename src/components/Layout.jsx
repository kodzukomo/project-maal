import { Outlet, Link, useLocation } from "react-router-dom";
import { Cpu, LayoutDashboard, Radio } from "lucide-react";

export default function Layout() {
  const location = useLocation();
  const isDetail = location.pathname.startsWith("/unidade");

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <aside className="hidden md:flex w-60 shrink-0 border-r border-border bg-card/40 backdrop-blur flex-col">
        <div className="px-6 py-6 flex items-center gap-3 border-b border-border">
          <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center">
            <Cpu className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-display font-bold tracking-wider text-foreground">Project M.A.A.L</p>
            <p className="text-[10px] text-primary/70 tracking-widest uppercase font-mono">Fleet Control</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              !isDetail ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-card/50"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
        </nav>
        <div className="px-4 py-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            System operational
          </div>
        </div>
      </aside>
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}