/**
 * Visual metadata for workflow demo nodes (n8n / Make-style canvas nodes).
 */

export type WorkflowNodeKind = "trigger" | "ai" | "notify" | "action" | "output";

export type WorkflowNodeIconId = "webhook" | "sparkles" | "send" | "mail" | "inbox";

export type WorkflowNodeVisual = {
  kind: WorkflowNodeKind;
  kindLabel: string;
  icon: WorkflowNodeIconId;
  accent: "primary" | "accent";
};

export const workflowNodeVisuals: Record<string, WorkflowNodeVisual> = {
  webhook: { kind: "trigger", kindLabel: "Trigger", icon: "webhook", accent: "primary" },
  "ai-agent": { kind: "ai", kindLabel: "AI", icon: "sparkles", accent: "accent" },
  telegram: { kind: "notify", kindLabel: "Notify", icon: "send", accent: "accent" },
  "email-generator": { kind: "action", kindLabel: "Action", icon: "mail", accent: "primary" },
  gmail: { kind: "output", kindLabel: "Output", icon: "inbox", accent: "primary" },
};
