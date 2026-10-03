import type { Metadata } from "next";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = { title: "Privacy", description: "How Resuma stores and processes information entered in the resume builder.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <InfoPage title="Privacy" introduction="Your resume information stays on your device." sections={[
    { eyebrow: "Storage", title: "Information you enter", paragraphs: ["Resume details are saved in your browser's local storage so you can return to your draft on the same device. No account is required, and resume content is not sent to a Resuma database."] },
    { eyebrow: "Export", title: "File exports", paragraphs: ["PDF and DOCX files are prepared in your browser from the information visible in the editor. You control when and where those files are saved."] },
    { eyebrow: "Control", title: "Clearing your information", paragraphs: ["Use the reset control in the editor to clear the current draft. You can also remove stored data through your browser settings."] },
    { eyebrow: "Contact", title: "Questions", paragraphs: ["For privacy questions, contact teraldicoranier@gmail.com."] },
  ]} />;
}
