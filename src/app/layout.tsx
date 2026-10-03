import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://resuma.ranierteraldico.me";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Resuma — Free Resume Builder with Live Preview", template: "%s | Resuma" },
  description: "Build a clear professional resume with a live preview, local autosave, and direct PDF or DOCX export. No account required.",
  applicationName: "Resuma",
  authors: [{ name: "Ranier Teraldico", url: "https://ranierteraldico.me" }],
  creator: "Ranier Teraldico",
  keywords: ["resume builder", "free resume builder", "CV maker", "resume PDF", "resume DOCX", "live resume preview"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "Resuma", title: "Resuma — Free Resume Builder with Live Preview", description: "Write, preview, and export a professional resume without creating an account.", images: [{ url: "/images/hero.png", width: 1536, height: 1024, alt: "The Resuma resume editor and live document preview" }] },
  twitter: { card: "summary_large_image", title: "Resuma — Free Resume Builder with Live Preview", description: "Write, preview, and export a professional resume without creating an account.", images: ["/images/hero.png"] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${geist.variable} ${geistMono.variable}`}><body>{children}</body></html>;
}
