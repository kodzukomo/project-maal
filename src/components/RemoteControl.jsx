import { useState } from "react";
import { Power, Home, Activity, Stethoscope, Send } from "lucide-react";

const commands = [
  { id: "standby", label: "Modo Standby", desc: "Pausa tarefas e reduz consumo", icon: Power, tone: "amber" },
  { id: "return_base", label: "Retornar à Base", desc: "Aciona rota automática de retorno", icon: Home, tone: "cyan" },
  { id: "diagnostics", label: "Executar Diagnóstico", desc: "Inicia varredura completa de hardware", icon: Stethoscope, tone: "blue" },
  { id: "shutdown", label: "Desligamento de Emergência", desc: "Encerra operação imediatamente", icon: Activity, tone: "red" },
];

const toneMap = {
  amber: "border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-500/10 text-amber-300",
  cyan: "border-cyan-500/30 hover:border-cyan-500/60 hover:bg-cyan-500/10 text-cyan-300",
  blue: "border-blue-500/30 hover:border-blue-500/60 hover:bg-blue-500/10 text-blue-300",
  red: "border-red-500/30 hover:border-red-500/60 hover:bg-red-500/10 text-red-300",
};

export default function RemoteControl({ android, onSendCommand }) {
  const [pending, setPending] = useState(null);
  const [log, setLog] = useState([]);

  const handleSend = async (cmd) => {
    setPending(cmd.id);
    try {
      await onSendCommand(cmd);
      setLog((l) => [{ cmd: cmd.label, time: new Date().toLocaleTimeString() }, ...l].slice(0, 4));
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
          <Send className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">Controle Remoto</h3>
          <p className="text-xs text-slate-500">Envie comandos de intervenção para {android.name}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {commands.map((cmd) => {
          const Icon = cmd.icon;
          const isLoading = pending === cmd.id;
          return (
            <button
              key={cmd.id}
              onClick={() => handleSend(cmd)}
              disabled={isLoading || android.status === "offline"}
              className={`flex items-start gap-3 p-3 rounded-lg border bg-slate-950/40 text-left transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${toneMap[cmd.tone]}`}
            >
              <Icon className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">{cmd.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{cmd.desc}</p>
                {isLoading && <p className="text-xs text-cyan-400 mt-1 animate-pulse">Enviando...</p>}
              </div>
            </button>
          );
        })}
      </div>
      {log.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-800">
          <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Log de Comandos</p>
          <div className="space-y-1.5">
            {log.map((entry, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-slate-300">✓ {entry.cmd}</span>
                <span className="text-slate-600">{entry.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}