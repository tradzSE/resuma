import type { Metadata } from "next";
import ResumeBuilder from "@/components/ResumeBuilder";

export const metadata: Metadata = {
  title: "Free Resume Builder",
  description: "Build a professional resume with a live preview, flexible formatting, local autosave, and direct PDF export.",
  alternates: { canonical: "/builder" },
};

export default function BuilderPage() {
  return <ResumeBuilder />;
}
