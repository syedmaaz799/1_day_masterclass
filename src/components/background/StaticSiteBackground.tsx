import { AtmosphericOverlay } from "@/components/background/AtmosphericOverlay";

export function StaticSiteBackground() {
  return (
    <div className="site-bg-static" aria-hidden>
      <AtmosphericOverlay />
    </div>
  );
}
