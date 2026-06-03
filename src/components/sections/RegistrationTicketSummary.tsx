import { EventPrice } from "@/components/ui";
import { ticketSummary } from "@/content/registration";
import { cn } from "@/lib/utils";

/**
 * Compact ticket summary above the form (Issue 6).
 */
export function RegistrationTicketSummary({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-md border border-white/8 bg-bg/60 p-4 md:p-5",
        className,
      )}
      aria-label="Your masterclass ticket"
    >
      <p className="mb-3 font-sans text-overline uppercase tracking-[0.16em] text-text-2">
        {ticketSummary.label}
      </p>
      <ul className="flex flex-col gap-2">
        {ticketSummary.lines.map((line) => (
          <li
            key={line}
            className="flex items-center gap-2.5 font-sans text-body text-text"
          >
            <span aria-hidden className="text-success">
              ✓
            </span>
            <span>{line}</span>
          </li>
        ))}
        <li className="flex items-center gap-2.5 font-sans text-body text-text">
          <span aria-hidden className="text-success">
            ✓
          </span>
          <EventPrice size="sm" />
        </li>
      </ul>
    </div>
  );
}
