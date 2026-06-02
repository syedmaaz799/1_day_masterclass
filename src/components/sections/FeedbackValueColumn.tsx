import { Body, Eyebrow } from "@/components/ui";
import { feedbackValue } from "@/content/feedback";

export function FeedbackValueColumn() {
  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      <Body size="lg" className="max-w-lg text-text-2">
        We read every response before session day. It helps us pick examples, pace, and Q&A topics
        that match the room.
      </Body>

      <div className="flex flex-col gap-4 border-t border-white/8 pt-8">
        <Eyebrow tone="muted">Why we ask</Eyebrow>
        <ul className="flex flex-col gap-3">
          {feedbackValue.points.map((item) => (
            <li key={item} className="flex items-start gap-3 font-sans text-body text-text">
              <span aria-hidden className="mt-0.5 shrink-0 text-accent">
                •
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
