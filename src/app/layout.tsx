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
  title: "Cognitude Labs | Building the Architecture of Understanding",
  description:
    "An applied AI company focused on education, developing autonomous agents that integrate across systems, maintain context, and adapt to individual learners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${crimsonPro.variable} ${GeistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
