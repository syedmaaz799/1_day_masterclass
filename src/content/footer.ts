/**
 * Footer content (Phase 6.6) — event closure, trust, quiet navigation.
 * Contact/legal placeholders marked for launch replacement (01-project).
 */

export const footer = {
  contact: {
    heading: "Contact",
    label: "Email",
    email: "admissions@neuralvarsity.ai",
    href: "mailto:admissions@neuralvarsity.ai",
  },
  quickLinks: {
    heading: "Quick links",
    items: [
      { id: "register", label: "Register", href: "#register-experience" },
      { id: "faq", label: "FAQ", href: "#faq" },
      { id: "demo", label: "Watch Demo", href: "#promo-video" },
    ],
  },
  legal: {
    heading: "Legal",
    items: [
      // TODO: real policy URLs before launch.
      { id: "privacy", label: "Privacy Policy", href: "#" },
      { id: "terms", label: "Terms & Conditions", href: "#" },
    ],
  },
  copyright: "© 2026 NeuralVarsity. All rights reserved.",
} as const;
