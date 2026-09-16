export default function MobileTopBar({ factoryName, activeCount }) {
  return (
    <div className="md:hidden absolute top-0 left-0 right-0 z-[1000] flex items-center justify-between px-4 py-3 bg-card/70 backdrop-blur-md border-b border-border">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
        <span className="font-display font-semibold text-foreground text-sm">{factoryName}</span>
      </div>
      <span className="text-xs text-muted-foreground font-mono">{activeCount} ativas</span>
    </div>
  );
}