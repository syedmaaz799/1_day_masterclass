import { Body, Caption, Eyebrow, Headline } from "@/components/ui";
import { promoVideo } from "@/content/promo-video";
import { cn } from "@/lib/utils";

type MasterclassPromoVideoPlaceholderProps = {
  className?: string;
};

/**
 * 16:9 masterclass promo video slot (CLS-safe). User-initiated playback only.
 */
export function MasterclassPromoVideoPlaceholder({
  className,
}: MasterclassPromoVideoPlaceholderProps) {
  return (
    <figure
      id="promo-video"
      className={cn("mx-auto w-full max-w-4xl scroll-mt-[var(--nav-h)]", className)}
      aria-label={promoVideo.ariaLabel}
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
        <video
          className="absolute inset-0 h-full w-full object-cover"
          controls
          preload="metadata"
          playsInline
          aria-label={promoVideo.ariaLabel}
        >
          <source src={promoVideo.src} type="video/mp4" />
          <Caption as="p" className="p-6 text-text-2">
            Your browser does not support embedded video.{" "}
            <a href={promoVideo.src} className="text-primary underline-offset-4 hover:underline">
              Download the preview
            </a>
            .
          </Caption>
        </video>
      </div>
    </figure>
  );
}
