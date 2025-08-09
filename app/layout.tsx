import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/site.config";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/GoogleTagManager";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [...siteConfig.metadata.keywords],
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: siteConfig.metadata.openGraph.type,
    locale: siteConfig.metadata.openGraph.locale,
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.metadata.openGraph.siteName,
  },
  twitter: {
    card: siteConfig.metadata.twitter.card,
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.metadata.twitter.creator,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get GTM ID from site config
  const gtmId = siteConfig.analytics?.gtmId || '';

  return (
    <html lang="en">
      <head>
        <GoogleTagManager gtmId={gtmId} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <GoogleTagManagerNoscript gtmId={gtmId} />
        {children}
      </body>
    </html>
  );
}