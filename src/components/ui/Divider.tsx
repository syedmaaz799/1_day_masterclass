import { cn } from "@/lib/utils";

/**
 * Divider — hairline separation (03-design-system: low-opacity borders).
 * Horizontal by default; supports an optional centered label and vertical mode.
 */

type DividerProps = {
  orientation?: "horizontal" | "vertical";
  label?: string;
  className?: string;
};

export function Divider({
  orientation = "horizontal",
  label,
  className,
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        className={cn("inline-block w-px self-stretch bg-white/8", className)}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cn("flex items-center gap-4", className)}
      >
        <span aria-hidden className="h-px flex-1 bg-white/8" />
        <span className="font-sans text-overline uppercase text-text-2">{label}</span>
        <span aria-hidden className="h-px flex-1 bg-white/8" />
      </div>
    );
  }

  return (
    <hr className={cn("h-px border-0 bg-white/8", className)} />
  );
}
