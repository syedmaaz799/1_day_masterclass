import type { WorkflowNodeIconId } from "@/content/workflow-node-meta";

const stroke = "currentColor";

type WorkflowNodeIconProps = {
  id: WorkflowNodeIconId;
  className?: string;
  size?: number;
};

/** Thin geometric icons for workflow nodes (1.5px stroke, design-system). */
export function WorkflowNodeIcon({ id, className, size = 20 }: WorkflowNodeIconProps) {
  const props = {
    className,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (id) {
    case "webhook":
      return (
        <svg {...props}>
          <path d="M12 3v4M8 5.5 6 3M16 5.5 18 3" />
          <circle cx="12" cy="14" r="5" />
          <path d="M9 14h.01M15 14h.01M10.5 16.5h3" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...props}>
          <path d="M12 3l1.2 4.2L17 8l-3.8 1.2L12 14l-1.2-4.8L7 8l3.8-0.8L12 3z" />
          <path d="M5 16l.6 2.1L8 19l-2.1.6L5 22l-.6-2.3L2 19l2.3-.9L5 16zM19 14l.5 1.7L21 16l-1.7.5L19 18l-.5-1.8L17 16l1.8-.3L19 14z" />
        </svg>
      );
    case "send":
      return (
        <svg {...props}>
          <path d="M22 3 11 13M22 3l-7 18-4-8-8-4 18-7z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...props}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9 6 21 7" />
        </svg>
      );
    case "inbox":
      return (
        <svg {...props}>
          <path d="M4 4h16v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4z" />
          <path d="M4 9h4l2 3h4l2-3h4" />
        </svg>
      );
    default:
      return null;
  }
}
