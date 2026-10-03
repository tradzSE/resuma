import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://resuma.ranierteraldico.me";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const viewport: Viewport = { themeColor: "#f2f0e9", width: "device-width", initialScale: 1 };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Resuma | Build your resume.", template: "%s | Resuma" },
  description: "Build a clear professional resume with a live preview, local autosave, and direct PDF export. No account required.",
  applicationName: "Resuma",
  authors: [{ name: "Ranier Teraldico", url: "https://ranierteraldico.me" }],
  creator: "Ranier Teraldico",
  keywords: ["resume builder", "free resume builder", "CV maker", "resume PDF", "live resume preview"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "Resuma", title: "Resuma | Build your resume.", description: "Write, preview, and export a professional resume without creating an account.", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Resuma — write your resume and see the final page" }] },
  twitter: { card: "summary_large_image", title: "Resuma | Build your resume.", description: "Write, preview, and export a professional resume without creating an account.", images: ["/opengraph-image"] },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/images/resume-icon.ico" }, { url: "/favicon.ico", sizes: "any" }],
    shortcut: "/images/resume-icon.ico",
    apple: [{ url: "/images/resume-icon.ico" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geist.variable} ${geistMono.variable}`}><body>{children}</body></html>;
}
