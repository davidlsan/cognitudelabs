import type { Metadata } from "next";
import { Crimson_Pro } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cognitude Labs",
  description:
    "An applied AI company focused on education, developing autonomous agents that integrate across systems, maintain context, and adapt to individual learners.",
  keywords: "Cognitude Labs, Applied AI, Education, Autonomous Agents, AI, Machine Learning, Natural Language Processing, NLP, Context, Learning, Understanding, CognitudeLabs, cognitudelabs",
  metadataBase: new URL("https://www.cognitudelabs.com"),
  alternates: {
    canonical: "/",
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
  icons: {
    icon: [
      // Primary favicon for Google Search (must be square, at least 48x48px, preferably >48x48px)
      // Google requires rel="icon" with href pointing to a stable URL
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-192x192.ico", sizes: "192x192", type: "image/x-icon" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      {
        url: "/favicon-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      { url: "/favicon-192x192.ico", sizes: "192x192" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Cognitude Labs",
    description:
      "An applied AI company focused on education, developing autonomous agents that integrate across systems, maintain context, and adapt to individual learners.",
    url: "https://www.cognitudelabs.com",
    siteName: "Cognitude Labs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cognitude Labs - Applied AI for understanding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cognitude Labs",
    description:
      "An applied AI company focused on education, developing autonomous agents that integrate across systems, maintain context, and adapt to individual learners.",
    images: ["/og-image.png"],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#151515" },
    { media: "(prefers-color-scheme: dark)", color: "#151515" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cognitude Labs",
    description:
      "An applied AI company focused on education, developing autonomous agents that integrate across systems, maintain context, and adapt to individual learners.",
    url: "https://www.cognitudelabs.com",
    logo: "https://www.cognitudelabs.com/CognitudeLabs.svg",
    sameAs: ["https://www.alva.so"],
  };

  return (
    <html lang="en">
      <body
        className={`${crimsonPro.variable} ${GeistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
