import { ShieldAlert, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AlertBanner({ criticalAlerts }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || criticalAlerts.length === 0) return null;
  const alert = criticalAlerts[0];

  return (
    <div className="relative rounded-xl border border-red-500/40 bg-gradient-to-r from-red-950/80 to-red-900/40 p-4 overflow-hidden">
      <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none"></div>
      <div className="relative flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center shrink-0">
          <ShieldAlert className="w-6 h-6 text-red-400 animate-pulse" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-red-300/80 uppercase tracking-widest font-semibold">Alerta Crítico Ativo</p>
          <p className="text-white font-medium mt-0.5">
            <span className="font-bold">{alert.android_name}</span> — {alert.message}
          </p>
        </div>
        <Link
          to={`/unidade/${alert.android_id}`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/40 text-red-200 text-sm font-semibold hover:bg-red-500/30 transition-colors shrink-0"
        >
          Intervir <ArrowRight className="w-4 h-4" />
        </Link>
        <button onClick={() => setDismissed(true)} className="text-red-300/60 hover:text-red-200 shrink-0">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}