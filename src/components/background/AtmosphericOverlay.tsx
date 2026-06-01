export function AtmosphericOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(ellipse_80%_60%_at_72%_20%,rgba(79,124,255,0.28),transparent_60%)]" />
      <div className="absolute inset-x-0 top-0 h-[50vh] bg-[radial-gradient(ellipse_at_top,rgba(79,124,255,0.14),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]/40" />
      <div className="absolute inset-0 bg-grid-fine opacity-40" />
      <div className="absolute inset-0 bg-noise opacity-35 mix-blend-overlay" />
    </div>
  );
}
