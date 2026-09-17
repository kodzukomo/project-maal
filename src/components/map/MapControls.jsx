import { ZoomIn, ZoomOut, LocateFixed, Grid3x3 } from "lucide-react";

export default function MapControls({ map, onRecenter, showGrid, onToggleGrid }) {
  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2">
      <div className="flex items-center gap-1 rounded-xl border border-border bg-card/70 backdrop-blur-md p-1 shadow-xl">
        <button onClick={() => map?.zoomIn()} className="w-9 h-9 rounded-lg hover:bg-background/50 flex items-center justify-center text-foreground transition-colors">
          <ZoomIn className="w-4 h-4" />
        </button>
        <button onClick={() => map?.zoomOut()} className="w-9 h-9 rounded-lg hover:bg-background/50 flex items-center justify-center text-foreground transition-colors">
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-border"></div>
        <button onClick={onRecenter} className="w-9 h-9 rounded-lg hover:bg-background/50 flex items-center justify-center text-primary transition-colors">
          <LocateFixed className="w-4 h-4" />
        </button>
      </div>
      <button
        onClick={onToggleGrid}
        className={`flex items-center gap-2 rounded-xl border px-3 h-11 backdrop-blur-md shadow-xl text-xs font-medium transition-colors ${
          showGrid ? "border-primary bg-primary/10 text-primary" : "border-border bg-card/70 text-muted-foreground hover:text-foreground"
        }`}
      >
        <Grid3x3 className="w-4 h-4" /> Radar Grid
      </button>
    </div>
  );
}