import { Play } from "lucide-react";
import { Body, Caption, Eyebrow, Headline } from "@/components/ui";
import { promoVideo } from "@/content/promo-video";
import { cn } from "@/lib/utils";

type MasterclassPromoVideoPlaceholderProps = {
  className?: string;
};

/**
 * Reserved 16:9 slot for the masterclass promotional video (CLS-safe).
 * Replace the inner frame with a hosted player when the asset is ready.
 */
export function MasterclassPromoVideoPlaceholder({
  className,
}: MasterclassPromoVideoPlaceholderProps) {
  return (
    <figure
      id="promo-video"
      className={cn("mx-auto w-full max-w-4xl scroll-mt-[var(--nav-h)]", className)}
      aria-label={promoVideo.placeholderAriaLabel}
    >
      <figcaption className="mb-4 max-w-2xl">
        <Eyebrow tone="accent" withRule>
          {promoVideo.eyebrow}
        </Eyebrow>
        <Headline as="p" size="h2" className="mt-3 text-balance">
          {promoVideo.title}
        </Headline>
        <Body size="lg" className="mt-2 text-pretty text-text-2">
          {promoVideo.caption}
        </Body>
      </figcaption>

      <div
        className={cn(
          "relative aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-surface",
          "shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]",
        )}
      >
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgb(79_124_255/0.12),transparent_65%),linear-gradient(180deg,rgb(11_13_18/0.2)_0%,rgb(5_5_5/0.85)_100%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent_2px,rgb(255_255_255)_2px,rgb(255_255_255)_3px)",
          }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <span
            className={cn(
              "flex size-16 items-center justify-center rounded-full border border-white/20 bg-bg/60",
              "shadow-[0_0_32px_rgb(79_124_255/0.2)]",
            )}
            aria-hidden
          >
            <Play size={28} className="ml-1 text-text" strokeWidth={1.5} />
          </span>
          <Caption className="max-w-xs font-sans text-overline uppercase tracking-[0.16em] text-text-2">
            Video placeholder
          </Caption>
        </div>
      </div>
    </figure>
  );
}
