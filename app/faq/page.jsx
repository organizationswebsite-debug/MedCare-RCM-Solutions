"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqGroups = [
  {
    title: "Billing & Claims",
    subtitle: "Fast answers for everyday revenue flow questions.",
    accent: "#F5E6A3",
    items: [
      {
        key: "billing-0",
        question: "How quickly can your team start billing for our practice?",
        answer:
          "Most practices are onboarded in 7 to 10 business days. We handle credentialing, chart review, claim setup, and workflow mapping so your revenue cycle starts smoothly from day one.",
      },
      {
        key: "billing-1",
        question: "Do you work with specialty-specific coding and billing rules?",
        answer:
          "Yes. We support multiple specialties with custom workflows, payer-specific rules, and coding expertise designed to reduce denials and improve clean claim rates.",
      },
      {
        key: "billing-2",
        question: "What happens if claims are denied or rejected?",
        answer:
          "We investigate each denial, resolve root causes, correct claim details, and resubmit quickly so your cash flow stays protected and your reimbursement timeline shortens.",
      },
    ],
  },
  {
    title: "Technology & Reporting",
    subtitle: "Visibility into every step of the billing lifecycle.",
    accent: "#F0EBE0",
    items: [
      {
        key: "tech-0",
        question: "Do you provide real-time reporting and analytics?",
        answer:
          "Absolutely. Our team provides dashboards and reports that show aging, denial trends, collections, payment velocity, and practice-level performance at a glance.",
      },
      {
        key: "tech-1",
        question: "How secure is patient and billing information?",
        answer:
          "We follow HIPAA-compliant practices, secure data handling standards, and layered access controls so your financial and patient information remains protected.",
      },
      {
        key: "tech-2",
        question: "Can we integrate with our current EMR or PM system?",
        answer:
          "In most cases, yes. We support common practice management and electronic health record systems and help adapt billing workflows around your existing setup.",
      },
    ],
  },
  {
    title: "Pricing & Partnership",
    subtitle: "Clear, flexible support tailored to your growth goals.",
    accent: "#FDFAF5",
    items: [
      {
        key: "pricing-0",
        question: "What pricing model do you offer?",
        answer:
          "We offer flexible engagement structures based on your volume, specialty, and operational needs. Our goal is to align our fees with the value we create for your practice.",
      },
      {
        key: "pricing-1",
        question: "Is there a minimum volume requirement?",
        answer:
          "We work with practices of different sizes, and our team will recommend the right model based on your claim volume, staffing, and reimbursement goals.",
      },
      {
        key: "pricing-2",
        question: "What if we want to scale quickly?",
        answer:
          "Our services are built to scale. We can expand support, improve workflow automation, and adapt reporting as your provider network and patient volume grow.",
      },
    ],
  },
];

export default function FaqPage() {
  const [openKey, setOpenKey] = useState("billing-0");

  const toggleItem = (key) => {
    setOpenKey((prev) => (prev === key ? "" : key));
  };

  return (
    <>
      <Navbar />
      <main style={{ background: "#F5F0E8", minHeight: "100vh" }}>
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "120px 20px 90px",
            background: "linear-gradient(115deg, rgba(17,17,17,0.96), rgba(17,17,17,0.7))",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              opacity: 0.36,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(120deg, rgba(17,17,17,0.96) 0%, rgba(17,17,17,0.8) 45%, rgba(17,17,17,0.72) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "-10%",
              right: "-6%",
              width: 360,
              height: 360,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(245,230,163,0.32), transparent 70%)",
              animation: "floatSlow 10s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "-4%",
              bottom: "-8%",
              width: 260,
              height: 260,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.16), transparent 72%)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 1180,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: 36,
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(245,230,163,0.14)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  borderRadius: 999,
                  padding: "8px 16px",
                  marginBottom: 20,
                  color: "#F5E6A3",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "1.8px",
                  textTransform: "uppercase",
                }}
              >
                <span style={{ width: 8, height: 8, background: "#F5E6A3", borderRadius: "50%", display: "inline-block", animation: "pulseGlow 2s ease-in-out infinite" }} />
                Frequently asked questions
              </div>

              <h1
                style={{
                  fontSize: "clamp(34px, 4.8vw, 58px)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.03em",
                  color: "#FFFFFF",
                  marginBottom: 16,
                  fontWeight: 800,
                }}
              >
                Clear answers for a smoother revenue cycle.
              </h1>
              <p
                style={{
                  fontSize: 18,
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.78)",
                  maxWidth: 610,
                  marginBottom: 28,
                }}
              >
                Discover how MedCare RCM helps practices reduce denials, accelerate collections, and build stronger billing operations with expert support.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 30 }}>
                <Link
                  href="/contact"
                  style={{
                    background: "#F5E6A3",
                    color: "#111111",
                    padding: "14px 22px",
                    borderRadius: 999,
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    boxShadow: "0 10px 30px rgba(17,17,17,0.24)",
                  }}
                >
                  Book a free audit
                  <span style={{ fontSize: 13 }}>→</span>
                </Link>
                <Link
                  href="/services"
                  style={{
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "#FFFFFF",
                    padding: "14px 22px",
                    borderRadius: 999,
                    fontWeight: 600,
                    background: "rgba(255,255,255,0.06)",
                  }}
                >
                  Explore services
                </Link>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
                {[
                  { value: "98%+", label: "First-pass rate" },
                  { value: "500+", label: "Providers served" },
                  { value: "24/7", label: "Support" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      background: "rgba(255,255,255,0.09)",
                      border: "1px solid rgba(255,255,255,0.14)",
                      borderRadius: 18,
                      padding: "14px 12px",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em" }}>{stat.value}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "1px", marginTop: 4 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.95)",
                borderRadius: 28,
                padding: 24,
                boxShadow: "0 28px 70px rgba(17,17,17,0.24)",
                border: "1px solid rgba(17,17,17,0.08)",
                animation: "fadeUp 0.8s ease both",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: "#111111", display: "flex", alignItems: "center", justifyContent: "center", color: "#F5E6A3", fontSize: 20 }}>✦</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#888888", textTransform: "uppercase", letterSpacing: "1.6px" }}>Need a tailored answer?</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#111111" }}>We help practices scale confidently.</div>
                </div>
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                {[
                  "Credentialing support and onboarding",
                  "Claim follow-up and denial resolution",
                  "Custom reporting for your leadership team",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, color: "#444444", fontSize: 14 }}>
                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#F5E6A3", flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                style={{
                  display: "inline-flex",
                  marginTop: 20,
                  alignItems: "center",
                  gap: 10,
                  background: "#111111",
                  color: "#FFFFFF",
                  padding: "12px 18px",
                  borderRadius: 999,
                  fontWeight: 700,
                }}
              >
                Speak with an RCM specialist
                <span style={{ fontSize: 13 }}>→</span>
              </Link>
            </div>
          </div>
        </section>

        <section style={{ padding: "70px 20px 96px", background: "#F5F0E8" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 28, height: 2, background: "#111111", borderRadius: 2 }} />
                  <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: "#111111" }}>FAQ</span>
                </div>
                <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", color: "#111111", lineHeight: 1.2, marginBottom: 8 }}>All the answers you need in one place.</h2>
                <p style={{ color: "#666666", maxWidth: 640, lineHeight: 1.7 }}>Browse by category and get fast answers about billing, reporting, pricing, and how we support practices at every stage.</p>
              </div>
            </div>

            <div style={{ display: "grid", gap: 18 }}>
              {faqGroups.map((group) => (
                <div key={group.title} style={{ background: "#FFFFFF", borderRadius: 24, border: "1px solid rgba(17,17,17,0.08)", boxShadow: "0 14px 40px rgba(17,17,17,0.06)", overflow: "hidden" }}>
                  <div style={{ background: group.accent, padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, color: "rgba(17,17,17,0.68)", letterSpacing: "1.7px", textTransform: "uppercase", marginBottom: 6 }}>{group.title}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: "#111111" }}>{group.subtitle}</div>
                    </div>
                    <div style={{ background: "rgba(17,17,17,0.08)", borderRadius: 999, padding: "8px 12px", fontSize: 12, fontWeight: 700, color: "#111111" }}>{group.items.length} questions</div>
                  </div>

                  <div style={{ padding: "10px 10px 14px" }}>
                    {group.items.map((item) => {
                      const isOpen = openKey === item.key;
                      return (
                        <div key={item.key} style={{ borderBottom: "1px solid rgba(17,17,17,0.06)", padding: "2px 4px" }}>
                          <button
                            type="button"
                            onClick={() => toggleItem(item.key)}
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "16px 12px",
                              textAlign: "left",
                              fontSize: 15,
                              fontWeight: 700,
                              color: "#111111",
                              borderRadius: 14,
                              transition: "background 0.2s ease",
                              background: isOpen ? "rgba(17,17,17,0.04)" : "transparent",
                            }}
                          >
                            <span>{item.question}</span>
                            <span style={{ fontSize: 18, color: "#111111", marginLeft: 10, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.24s ease" }}>+</span>
                          </button>

                          <div
                            style={{
                              maxHeight: isOpen ? 140 : 0,
                              overflow: "hidden",
                              transition: "max-height 0.28s ease, opacity 0.28s ease",
                              opacity: isOpen ? 1 : 0,
                              padding: isOpen ? "0 12px 14px" : "0 12px 0",
                            }}
                          >
                            <p style={{ color: "#666666", lineHeight: 1.75, fontSize: 14 }}>{item.answer}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
