import type { Metadata } from "next";
import ResumeBuilder from "@/components/ResumeBuilder";

export const metadata: Metadata = {
  title: "Builder",
  description: "Create, preview, and export a clear professional resume with Resuma.",
  alternates: { canonical: "/builder" },
};

export default function BuilderPage() {
  return <ResumeBuilder />;
}
