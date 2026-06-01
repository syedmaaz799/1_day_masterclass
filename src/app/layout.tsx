import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { clientEnv } from "@/lib/env";
import { event } from "@/content/event";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { SiteBackgroundShell } from "@/components/background/SiteBackgroundShell";
import "./globals.css";

const title = `${event.title} — ${event.brand} ${event.series}`;
const description = event.subtitle;

export const metadata: Metadata = {
  metadataBase: new URL(clientEnv.NEXT_PUBLIC_SITE_URL),
  title: {
    default: title,
    template: `%s — ${event.brand}`,
  },
  description,
  applicationName: `${event.brand} ${event.series}`,
  keywords: [
    "AI agents",
    "agentic AI",
    "no-code AI",
    "AI masterclass",
    event.brand,
  ],
  openGraph: {
    type: "website",
    title,
    description,
    siteName: event.brand,
    url: clientEnv.NEXT_PUBLIC_SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  // Accessibility: allow zoom up to 200%+ (11-accessibility).
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body>
        <SiteBackgroundShell>
          <LenisProvider>{children}</LenisProvider>
        </SiteBackgroundShell>
      </body>
    </html>
  );
}
