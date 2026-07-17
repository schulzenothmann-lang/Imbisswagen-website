import type { Metadata } from "next";
import {
  Libre_Franklin,
  Playfair_Display,
} from "next/font/google";
import { LocaleProvider } from "@/components/LocaleProvider";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, absoluteUrl, siteUrl } from "@/lib/seo";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";

const libreFranklin = Libre_Franklin({
  variable: "--font-sans-src",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif-src",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: SITE_NAME,
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Imbissanhänger",
    "Imbisswagen",
    "Verkaufsanhänger",
    "Foodtrailer",
    "Verkaufs-Pavillon",
    "Gastronomieanhänger",
    "Imbissanhänger Bremen",
    "Imbissanhänger Norddeutschland",
  ],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE.path,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE.path,
        alt: OG_IMAGE.alt,
      },
    ],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      suppressHydrationWarning
      className={`${libreFranklin.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-beton text-graphit font-sans">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
