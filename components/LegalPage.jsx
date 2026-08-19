import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LegalPage({ eyebrow, title, intro, updated, sections }) {
  return (
    <>
      <Navbar />
      <main className="legal-page">
        <header className="legal-hero">
          <div className="legal-hero-glow" />
          <div className="legal-container legal-hero-content">
            <span className="legal-eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{intro}</p>
            <span className="legal-updated">Last updated: {updated}</span>
          </div>
        </header>

        <section className="legal-content-section">
          <div className="legal-container legal-content-grid">
            <aside className="legal-side-nav" aria-label="Legal pages">
              <span>On this page</span>
              {sections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>{section.heading}</a>
              ))}
            </aside>
            <article className="legal-article">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="legal-section">
                  <h2>{section.heading}</h2>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.items && (
                    <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>
                  )}
                </section>
              ))}
              <div className="legal-contact-box">
                <strong>Questions about this page?</strong>
                <p>Our team is here to help with privacy, security, and service questions.</p>
                <Link href="/contact">Contact MedCare RCM <span aria-hidden="true">→</span></Link>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}