import LandingPage from "@/components/LandingPage";

export default function Home() {
  const structuredData = [{
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Resuma",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: "A free resume builder with live preview and direct PDF export.",
    url: "https://resuma.ranierteraldico.me",
    isAccessibleForFree: true,
    featureList: ["Live resume preview", "Local autosave", "Direct PDF export", "Flexible resume formatting"],
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Person", name: "Ranier Teraldico", url: "https://ranierteraldico.me" },
  }, {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Resuma",
    url: "https://resuma.ranierteraldico.me",
    description: "A free resume builder with live preview and direct PDF export.",
  }];

  return <><LandingPage /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></>;
}
