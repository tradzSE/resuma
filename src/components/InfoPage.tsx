import Link from "next/link";

type Section = { title: string; paragraphs: string[] };

export default function InfoPage({ title, introduction, sections }: { title: string; introduction: string; sections: Section[] }) {
  return (
    <main className="info-page">
      <header className="info-header">
        <Link href="/" className="landing-wordmark">Resuma</Link>
        <Link href="/builder">Open editor</Link>
      </header>
      <article className="info-article">
        <h1>{title}</h1>
        <p className="info-introduction">{introduction}</p>
        <div className="info-sections">
          {sections.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
        </div>
      </article>
      <footer className="info-footer"><Link href="/">Home</Link><a href="mailto:teraldicoranier@gmail.com">teraldicoranier@gmail.com</a></footer>
    </main>
  );
}
