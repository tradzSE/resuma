import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://resuma.ranierteraldico.me";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const viewport: Viewport = { themeColor: "#f2f0e9", width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Free Resume Builder with Live Preview | Resuma", template: "%s | Resuma" },
  description: "Create a professional resume with live preview, local autosave, flexible formatting, and direct PDF export. Free and no account required.",
  applicationName: "Resuma",
  authors: [{ name: "Ranier Teraldico", url: "https://ranierteraldico.me" }],
  creator: "Ranier Teraldico",
  keywords: ["resume builder", "free resume builder", "CV maker", "resume PDF", "live resume preview"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Resuma",
    title: "Free Resume Builder with Live Preview | Resuma",
    description: "Create, preview, and export a professional resume for free without creating an account.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Resuma — free resume builder with live preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Resume Builder with Live Preview | Resuma",
    description: "Create, preview, and export a professional resume for free without creating an account.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geist.variable} ${geistMono.variable}`}><body>{children}</body></html>;
}
