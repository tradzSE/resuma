import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Terms", description: "Terms for using the Resuma resume builder and its exported documents.", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return <InfoPage title="Terms of use" introduction="A self-service tool for writing and exporting documents." sections={[
    { eyebrow: "Accuracy", title: "Your responsibility", paragraphs: ["You are responsible for reviewing the accuracy, relevance, and truthfulness of the information in your resume before using or submitting it."] },
    { eyebrow: "Access", title: "Availability", paragraphs: ["The service may change, be interrupted, or be discontinued. Keep your own copies of important resume files and information."] },
    { eyebrow: "Limits", title: "No employment guarantee", paragraphs: ["Resuma helps format information but does not guarantee interviews, employment, applicant-tracking-system results, or acceptance by any organization."] },
    { eyebrow: "Ownership", title: "Generated files", paragraphs: ["You may use and modify the documents you create with Resuma for personal and professional applications."] },
  ]} />;
}
