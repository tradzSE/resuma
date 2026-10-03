import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "About", description: "Learn why Resuma was created and how its focused resume-building workflow works.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return <InfoPage title="About Resuma" introduction="A focused workspace for writing, reviewing, and exporting a professional resume." sections={[
    { eyebrow: "Purpose", title: "Why it exists", paragraphs: ["Resume tools hide the document behind accounts, long forms, and locked templates. Resuma keeps the editor and the page together so every change is visible while you work."] },
    { eyebrow: "Workflow", title: "What it does", paragraphs: ["Organize common resume sections, adjust the document format, preview the result, and download PDF or DOCX files directly from the browser."] },
    { eyebrow: "Author", title: "Who built it", paragraphs: ["Designed and developed by Ranier Teraldico as a practical tool for students, graduates, and professionals preparing job applications."] },
  ]} />;
}
