import LandingPage from "@/components/LandingPage";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Resuma",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: "A free resume builder with live preview and PDF or DOCX export.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Person", name: "Ranier Teraldico", url: "https://ranierteraldico.me" },
  };

  return <><LandingPage /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></>;
}
