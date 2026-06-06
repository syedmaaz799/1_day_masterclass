import { event } from "@/content/event";
import { cn } from "@/lib/utils";

type EventTitleProps = {
  /** Display scale — `footer` uses compact h3 styling. */
  size?: "xl" | "l" | "footer";
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
};

type TitleSize = keyof typeof headlinePrimary;

const headlinePrimary = {
  xl: "text-display-xl font-semibold",
  l: "text-display-l font-semibold",
  footer: "text-h3 font-semibold leading-[1.2]",
} as const;

const headlineSecondary = {
  xl: "text-display-l font-normal tracking-[-0.02em]",
  l: "text-h2 font-normal tracking-[-0.01em]",
  footer: "text-h3 font-normal leading-[1.2]",
} as const;

const lineGap = {
  xl: "mt-[clamp(1rem,2.5vw,1.75rem)]",
  l: "mt-4 sm:mt-5",
  footer: "mt-2",
} as const;

/** Second headline line — display scale, lighter weight, accent on the uptime hook. */
function TitleSecondLine({ size }: { size: TitleSize }) {
  const text = event.titleTagline;
  const uptime = text.match(/^(.*?)(\s*24\/7)$/);

  if (!uptime) {
    return (
      <span className={cn("block text-accent", headlineSecondary[size])}>{text}</span>
    );
  }

  const [, prefix, suffix = "24/7"] = uptime;

  return (
    <span className={cn("block text-text", headlineSecondary[size])}>
      {prefix.trimEnd()}
      {" "}
      <span className="font-semibold tabular-nums text-accent">{suffix.trim()}</span>
    </span>
  );
}

/**
 * Two-line display lockup — line two is visually distinct (weight + accent) but stays headline-scale.
 */
export function EventTitle({ size = "xl", as, id, className }: EventTitleProps) {
  const defaultTag = size === "footer" ? "p" : size === "l" ? "h2" : "h1";
  const Tag = as ?? defaultTag;

  return (
    <Tag id={id} className={cn("font-display text-balance tracking-tight", className)}>
      <span className={cn("block text-text", headlinePrimary[size])}>{event.title}</span>
      <span className={cn("block", lineGap[size], size === "xl" && "leading-[0.95]")}>
        <TitleSecondLine size={size} />
      </span>
    </Tag>
  );
}
