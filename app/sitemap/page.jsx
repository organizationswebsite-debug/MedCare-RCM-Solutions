import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Sitemap | MedCare RCM Solutions", description: "Browse the pages and resources available on the MedCare RCM Solutions website.", alternates: { canonical: "https://www.medcarercm.com/sitemap" } };
const groups = [
  { title: "Company", links: [["Home", "/"], ["About Us", "/about"], ["Our Team", "/about/team"], ["Testimonials", "/testimonials"], ["Careers", "/careers"], ["Contact Us", "/contact"]] },
  { title: "Services & specialties", links: [["Services", "/services"], ["Revenue Cycle Management", "/revenue-cycle-management"], ["Specialties", "/specialties"], ["Pricing", "/pricing"], ["FAQ", "/faq"]] },
  { title: "Resources", links: [["Blog", "/blog"], ["Privacy Policy", "/privacy-policy"], ["Terms of Service", "/terms-of-service"], ["HIPAA Compliance", "/hipaa-compliance"]] },
];
export default function SitemapPage() {
  return <><Navbar /><main className="legal-page"><header className="legal-hero"><div className="legal-hero-glow" /><div className="legal-container legal-hero-content"><span className="legal-eyebrow">Explore MedCare RCM</span><h1>Website sitemap</h1><p>Find the page, service, or resource you need in one clear view.</p></div></header><section className="legal-content-section"><div className="legal-container sitemap-grid">{groups.map((group) => <section className="sitemap-group" key={group.title}><h2>{group.title}</h2><div>{group.links.map(([label, href]) => <Link key={href} href={href}>{label}<span aria-hidden="true">→</span></Link>)}</div></section>)}</div></section></main><Footer /></>;
}