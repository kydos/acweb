import type { Metadata } from "next";
import { Inter, Lora, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { siteConfig } from "@/lib/siteConfig";
import { canonicalUrl, absoluteUrl } from "@/lib/seo";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.siteTitle,
    template: `%s | ${siteConfig.siteShortTitle}`,
  },
  description: siteConfig.siteDescription,
  keywords: [
    "Zenoh Protocol",
    "Eclipse Zenoh",
    "distributed systems",
    "robotics middleware",
    "ROS 2",
    "edge computing",
    "IoT middleware",
    "DDS",
    "AI infrastructure",
    "Angelo Corsaro",
    "cloud-to-edge",
    "real-time systems",
    "pub/sub protocol",
    "autonomous systems",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  creator: siteConfig.name,
  alternates: {
    canonical: canonicalUrl(""),
    types: { "application/rss+xml": absoluteUrl("/feed.xml") },
  },
  openGraph: {
    title: siteConfig.siteTitle,
    description: siteConfig.siteDescription,
    url: canonicalUrl(""),
    siteName: siteConfig.siteTitle,
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: "Angelo Corsaro — inventor of the Zenoh Protocol",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteTitle,
    description: siteConfig.siteDescription,
    images: [absoluteUrl(siteConfig.ogImage)],
    creator: siteConfig.social.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${lora.variable} ${jetbrains.variable} font-sans antialiased`}
      >
        <GoogleAnalytics />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100]
                       focus:px-4 focus:py-2 focus:rounded-md focus:bg-accent focus:text-ink
                       focus:text-sm focus:font-semibold"
          >
            Skip to content
          </a>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
