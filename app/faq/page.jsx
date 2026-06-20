"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const FAQ_SECTIONS = [
  {
    category: "General",
    icon: "💬",
    faqs: [
      { q: "What is revenue cycle management (RCM)?", a: "Revenue cycle management is the financial process healthcare providers use to track patient care episodes from registration and appointment scheduling to the final payment of a balance. It covers everything from billing to collections." },
      { q: "How quickly can you onboard our practice?", a: "Most practices are fully onboarded within 5–7 business days. We assign a dedicated account manager from day one who guides you through every step." },
      { q: "Do you work with all medical specialties?", a: "Yes. We support over 30 medical specialties including primary care, cardiology, orthopedics, mental health, pediatrics, dermatology, urgent care, and more." },
      { q: "What EHR/PM systems do you integrate with?", a: "We work with all major EHR and practice management systems including Epic, Athenahealth, eClinicalWorks, Kareo, Drchrono, Practice Fusion, and many others." },
    ],
  },
  {
    category: "Billing & Claims",
    icon: "🧾",
    faqs: [
      { q: "What is your first-pass claim acceptance rate?", a: "Our first-pass clean claim rate consistently exceeds 98%. This means fewer rejections, faster payments, and significantly reduced administrative burden for your team." },
      { q: "How do you handle rejected claims?", a: "Every rejection is reviewed immediately by our team. We identify the root cause, correct the issue, and resubmit within 24–48 hours. All rejections are tracked and used to prevent future occurrences." },
      { q: "Do you handle both electronic and paper claims?", a: "Yes. We primarily submit electronically for speed and tracking, but we can handle paper claims for payers that require them." },
    ],
  },
  {
    category: "Compliance & Security",
    icon: "🔒",
    faqs: [
      { q: "Are you HIPAA compliant?", a: "Absolutely. HIPAA compliance is built into every system and workflow we operate. We use end-to-end encryption, role-based access controls, and conduct regular compliance audits." },
      { q: "How do you protect patient data?", a: "All patient data is encrypted in transit and at rest. We use secure, HIPAA-compliant infrastructure with strict access controls and audit logging. We sign Business Associate Agreements (BAAs) with all clients." },
      { q: "Do you sign a Business Associate Agreement (BAA)?", a: "Yes, we always sign a BAA before any work begins. This is a standard requirement we take seriously." },
    ],
  },
  {
    category: "Pricing & Contracts",
    icon: "💰",
    faqs: [
      { q: "How does your pricing work?", a: "We use a percentage-of-collections model, which means we only earn when you earn. Rates vary by practice size and volume — contact us for a custom quote." },
      { q: "Are there setup fees or long-term contracts?", a: "No setup fees and no long-term contracts. We believe our results speak for themselves, so we don't lock clients in." },
      { q: "What's included in the free audit?", a: "Our free audit includes a review of your current billing processes, AR aging analysis, denial rate assessment, and a personalized report showing exactly where revenue is being lost and how to recover it." },
    ],
  },
];

export default function FAQPage() {
  const [openItem, setOpenItem] = useState({});
  const toggle = (si, qi) => setOpenItem(prev => ({ ...prev, [`${si}-${qi}`]: !prev[`${si}-${qi}`] }));

  return (
    <>
      <Navbar />
      <main>
        {/* Hero with background image */}
        <section style={{
          position: "relative",
          padding: "150px 24px 70px",
          overflow: "hidden",
          isolation: "isolate",
        }} className="contact-hero">
          {/* Background image */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(https://www.bunnellslaundryroom.com/media/v4zhuyjb/faq-blocks-shutterstock_745926214.jpg?anchor=center&mode=pad&width=1920&format=webp&quality=80)",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            zIndex: -2,
          }} />
          {/* Overlay for readability — warm cream-to-dark fade matching Grovia palette */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(160deg, rgba(245,240,232,0.96) 0%, rgba(240,235,224,0.93) 45%, rgba(17,17,17,0.55) 100%)",
            zIndex: -1,
          }} className="contact-hero-overlay" />

          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#111111", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12, background: "#F5E6A3", display: "inline-block", padding: "6px 14px", borderRadius: 100 }}>
              FAQ
            </p>
            <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 700, color: "#0D1B2A", letterSpacing: "-1px", marginBottom: 20, textShadow: "0 2px 12px rgba(245,240,232,0.5)" }}>
              Frequently asked questions
            </h1>
            <p style={{ fontSize: 18, color: "#222222", lineHeight: 1.7, fontWeight: 500 }}>
             Everything you need to know about working with MedCare RCM Solutions.
            </p>
          </div>
        </section>

        {/* FAQ sections */}
        <section style={{ background: "#fff", padding: "80px 24px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", gap: 48 }}>
            {FAQ_SECTIONS.map((section, si) => (
              <div key={si}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <span style={{ fontSize: 22 }}>{section.icon}</span>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0D1B2A" }}>{section.category}</h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {section.faqs.map((faq, qi) => {
                    const key = `${si}-${qi}`;
                    const isOpen = openItem[key];
                    return (
                      <div key={qi} style={{ border: "1px solid #D6E4F0", borderRadius: 12, overflow: "hidden" }}>
                        <button onClick={() => toggle(si, qi)}
                          style={{ width: "100%", background: isOpen ? "#F0EBE0" : "none", border: "none", padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left" }}>
                          <span style={{ fontSize: 15, fontWeight: 600, color: "#0D1B2A" }}>{faq.q}</span>
                          <span style={{ fontSize: 22, color: "#111111", flexShrink: 0, marginLeft: 16, transition: "transform 0.2s", transform: isOpen ? "rotate(45deg)" : "rotate(0)" }}>+</span>
                        </button>
                        {isOpen && (
                          <div style={{ padding: "0 22px 18px", borderTop: "1px solid #D6E4F0" }}>
                            <p style={{ fontSize: 14, color: "#666666", lineHeight: 1.7, paddingTop: 14 }}>{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Still have questions */}
        <section style={{ background: "#F0EBE0", padding: "64px 24px" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: 26, fontWeight: 700, color: "#0D1B2A", marginBottom: 12 }}>Still have questions?</h2>
            <p style={{ fontSize: 16, color: "#666666", lineHeight: 1.7, marginBottom: 28 }}>Our team is happy to answer any questions about your specific situation and how we can help.</p>
            <Link href="/contact" style={{ background: "#111111", color: "#fff", padding: "13px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600 }}>Talk to our team →</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
