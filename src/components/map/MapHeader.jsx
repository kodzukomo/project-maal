import { Radio } from "lucide-react";

export default function MapHeader({ factoryName }) {
  return (
    <div className="absolute top-4 left-4 z-[1000] flex items-center gap-3 rounded-xl border border-border bg-card/70 backdrop-blur-md px-4 py-3 shadow-xl">
      <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
        <Radio className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="font-display font-semibold text-foreground text-sm leading-tight">{factoryName}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">Sinal Ativo</span>
        </div>
      </div>
    </div>
  );
}