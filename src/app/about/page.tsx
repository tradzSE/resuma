import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "About", description: "Learn why Resuma was created and how its focused resume-building workflow works.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return <InfoPage title="About Resuma" introduction="Resuma is a focused workspace for writing, reviewing, and exporting a professional resume without unnecessary setup." sections={[
    { title: "Why it exists", paragraphs: ["Resume tools often hide the final document behind long forms, accounts, or locked templates. Resuma keeps the editor and the page together so every change is visible while you work."] },
    { title: "What it does", paragraphs: ["Organize common resume sections, adjust the document format, preview the result, and download PDF or DOCX files directly from the browser."] },
    { title: "Who built it", paragraphs: ["Resuma is designed and developed by Ranier Teraldico as a practical tool for students, graduates, and professionals preparing job applications."] },
  ]} />;
}
