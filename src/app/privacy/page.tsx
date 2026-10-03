import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Privacy", description: "How Resuma stores and processes information entered in the resume builder.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <InfoPage title="Privacy" introduction="Resuma is designed to keep your resume information on your device." sections={[
    { title: "Information you enter", paragraphs: ["Resume details are saved in your browser's local storage so you can return to your draft on the same device. Resuma does not require an account or intentionally send your resume content to a Resuma database."] },
    { title: "File exports", paragraphs: ["PDF and DOCX files are prepared in your browser from the information visible in the editor. You control when and where those files are saved."] },
    { title: "Clearing your information", paragraphs: ["Use the reset control in the editor to clear the current draft. You can also remove the site's stored data through your browser settings."] },
    { title: "Questions", paragraphs: ["For privacy questions, contact teraldicoranier@gmail.com."] },
  ]} />;
}
