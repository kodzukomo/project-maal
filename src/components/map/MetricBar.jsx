import { Cpu, Crosshair, BatteryCharging } from "lucide-react";

export default function MetricBar({ total, activeMissions, batteryAvg }) {
  const items = [
    { label: "Androides", value: total, icon: Cpu },
    { label: "Missões Ativas", value: activeMissions, icon: Crosshair },
    { label: "Bateria Média", value: `${batteryAvg}%`, icon: BatteryCharging },
  ];
  return (
    <div className="absolute top-4 right-4 z-[1000] flex items-stretch gap-2">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <div key={it.label} className="rounded-xl border border-border bg-card/70 backdrop-blur-md px-3 py-2.5 shadow-xl flex flex-col justify-center min-w-[96px]">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Icon className="w-3 h-3" />
              <span className="text-[10px] uppercase tracking-wider font-mono">{it.label}</span>
            </div>
            <p className="font-display font-bold text-foreground text-lg leading-tight mt-0.5">{it.value}</p>
          </div>
        );
      })}
    </div>
  );
}