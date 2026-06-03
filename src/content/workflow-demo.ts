/**
 * Workflow demo section — educational scroll story (Section 4).
 */

export const workflowDemoSection = {
  title: "Build Your First AI Employee",
  subtitle: "See how an AI Employee works step-by-step.",
  inputLabel: "Agent builder prompt",
  inputDefaultValue: "Run the full AI agent workflow—show me every step live",
  generateLabel: "Build",
  gate: {
    lead:
      "Your prompt is ready. Tap Build to watch the full AI agent workflow—live, from Input to Output.",
    composerLabel: "Agent builder",
    inputHelper: "Tap Build to open the walkthrough",
    previewTitle: "What this walkthrough covers",
    previewSteps: [
      "Input receives prompts",
      "Planner routes the work",
      "Retriever fetches knowledge",
      "Tools execute APIs",
      "Memory persists state",
      "Output streams the response",
    ] as const,
    generateHint: "Live demo · scroll the orbit to open each node · takes under a minute",
  },
} as const;
