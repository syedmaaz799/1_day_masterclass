import { cn } from "@/lib/utils";
import { brandIconPaths } from "@/content/brand-icon-paths";
import { aiCompanies } from "@/content/ai-companies";

/**
 * BrandMark — official company logos for nominative/editorial use in the
 * "Companies Building the AI Future" story.
 *
 * Raster/SVG files live in /public/brand-logos/. We use a native <img> for file
 * assets so PNG/SVG transparency is preserved — next/image WebP conversion mats
 * alpha to white (breaks the Groq circle mark on dark UI).
 *
 * `static` — always visible (ensemble grid). Without it, the mark reveals when the
 * parent chapter has [data-active="true"] (scroll-driven).
 */

const ALL_IDS = new Set(aiCompanies.map((c) => c.id));

/** File-based multicolor / official mark assets. */
const FILE_LOGOS: Record<string, { src: string; width: number; height: number }> = {
  google: { src: "/brand-logos/google-color.svg", width: 48, height: 48 },
  microsoft: { src: "/brand-logos/microsoft.svg", width: 23, height: 23 },
  groq: { src: "/brand-logos/groq.png", width: 96, height: 96 },
};

type BrandMarkProps = {
  id: string;
  className?: string;
  /** Brand colour override (from ai-companies). Used for monochrome marks on dark UI. */
  color?: string;
  /** Skip scroll-reveal hiding — required for ensemble and reduced-motion stacks. */
  static?: boolean;
};

export function hasBrandMark(id: string): boolean {
  return ALL_IDS.has(id);
}

export function BrandMark({ id, className, color, static: isStatic }: BrandMarkProps) {
  const file = FILE_LOGOS[id];
  const pathIcon = brandIconPaths[id as keyof typeof brandIconPaths];

  if (file) {
    return (
      <span
        data-static-brand={isStatic ? "true" : undefined}
        className={cn(
          "bl-lockup inline-flex items-center justify-center",
          isStatic && "bl-static",
          className,
        )}
      >
        {/* Native img keeps transparent PNG/SVG alpha intact on dark backgrounds. */}
        <img
          src={file.src}
          alt=""
          width={file.width}
          height={file.height}
          decoding="async"
          aria-hidden
          className="h-full w-full object-contain"
        />
      </span>
    );
  }

  if (!pathIcon) return null;

  const fill = color ?? `#${pathIcon.hex}`;

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      data-static-brand={isStatic ? "true" : undefined}
      className={cn("bl-lockup block", isStatic && "bl-static", className)}
    >
      <path
        className={isStatic ? undefined : "bl-path"}
        d={pathIcon.path}
        fill={fill}
      />
    </svg>
  );
}
