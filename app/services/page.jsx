"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const SERVICES_DATA = {
  "hospital-billing": {
    title: "Hospital Billing",
    subtitle: "Full-cycle institutional billing for hospitals of all sizes",
    description: "MedCare RCM Solutions manages the complete billing lifecycle for hospital systems — from complex inpatient DRG bundling to outpatient facility coding. We handle multi-departmental claim processing, charge capture reconciliation, and payer-specific compliance protocols so your revenue flows without interruption.",
    features: ["Inpatient DRG bundling & optimization", "Outpatient facility coding compliance", "Multi-departmental claim processing", "Charge capture reconciliation", "Medicare & Medicaid billing expertise"],
    icon: (
      <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 21V11C19 9.89543 18.1046 9 17 9H7C5.89543 9 5 9.89543 5 11V21" stroke="#111111" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3 21H21" stroke="#111111" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 12V16M10 14H14" stroke="#F5A623" strokeWidth="2" strokeLinecap="round"/>
        <path d="M7 5H17" stroke="#111111" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 2H15" stroke="#111111" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 9V5M15 9V5" stroke="#111111" strokeWidth="1.5"/>
      </svg>
    ),
    link: "/contact",
  },
  "physician-billing": {
    title: "Physician Billing",
    subtitle: "Built for private practices and multi-specialty physician groups",
    description: "We manage end-to-end revenue cycle operations for independent practices and physician networks. Our team ensures your clean claim ratios stay high by handling high-volume outpatient encounters, E&M coding compliance, modifier accuracy, and preventive medicine billing — freeing your staff to focus on patient care.",
    features: ["E&M coding and modifier compliance", "High-volume outpatient claim submission", "Preventive medicine billing", "Multi-specialty group billing", "Real-time eligibility verification"],
    icon: (
      <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="4" stroke="#111111" strokeWidth="1.5"/>
        <path d="M8 14H16M10 11H14" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M7 20C7 17.24 9.24 15 12 15C14.76 15 17 17.24 17 20" stroke="#111111" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    link: "/contact",
  },
  "laboratory-billing": {
    title: "Laboratory Billing",
    subtitle: "Precise billing for molecular, pathology, and toxicology labs",
    description: "Laboratory billing is among the most technically complex in healthcare. MedCare RCM handles multi-analyte test panels, prior authorization requirements, reference lab split-billing, and PAMA compliance — ensuring every specimen and panel is billed correctly and reimbursed in full.",
    features: ["Multi-analyte & molecular panel billing", "Prior authorization management", "Reference lab split-billing models", "PAMA compliance & monitoring", "Toxicology and pathology coding"],
    icon: (
      <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2H14M12 2V6M6 22H18" stroke="#111111" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9 6L5.43 14.33C4.52 16.45 5.51 18.91 7.63 19.82C8.38 20.14 9.19 20.25 10 20.14H14C16.21 20.14 18 18.35 18 16.14V14.33L14 6H9Z" stroke="#111111" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M8 14H16" stroke="#F5A623" strokeWidth="1.5"/>
      </svg>
    ),
    link: "/contact",
  },
  "imaging-billing": {
    title: "Imaging Center Billing",
    subtitle: "Technical and professional component billing for diagnostic imaging",
    description: "Imaging billing demands precision. We handle professional component (Modifier 26) and technical component (TC) billing splits for MRI, CT, X-ray, and ultrasound services. Our team actively combats automated payer downcoding and ensures every diagnostic interpretation is reimbursed at the correct rate.",
    features: ["Professional vs. technical component splits", "MRI, CT, X-ray & ultrasound billing", "Modifier 26 and TC compliance", "Automated downcoding defense", "Radiology RVU optimization"],
    icon: (
      <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 7H19C20.1046 7 21 7.89543 21 9V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V9C3 7.89543 3.89543 7 5 7Z" stroke="#111111" strokeWidth="1.5"/>
        <circle cx="12" cy="13" r="3" stroke="#111111" strokeWidth="1.5"/>
        <circle cx="12" cy="13" r="1" fill="#F5A623"/>
        <path d="M17 10H17.01" stroke="#111111" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    link: "/contact",
  },
  "ar-recovery": {
    title: "A/R Recovery",
    subtitle: "We recover the revenue your practice has already earned",
    description: "Aging accounts receivable drain cash flow and consume staff time. Our dedicated A/R recovery team systematically pursues claims beyond 60 days — analyzing denial patterns, filing targeted appeals, and negotiating with payers to settle outstanding balances and unlock frozen revenue for your practice.",
    features: ["Claims aging beyond 60-day threshold", "Denial root cause analysis & appeal filing", "Payer negotiation and escalation", "Legacy claim resolution", "Monthly A/R recovery reporting"],
    icon: (
      <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3" stroke="#111111" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 7V12L15 15" stroke="#111111" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M21 3L16 4.5L19.5 8L21 3Z" fill="#F5A623"/>
      </svg>
    ),
    link: "/contact",
  },
  "credentialing": {
    title: "Provider Credentialing",
    subtitle: "Get your providers enrolled and billing — fast",
    description: "Every day a provider isn't credentialed is revenue your practice never sees. MedCare manages the full credentialing and payer enrollment process — CAQH profile setup and maintenance, commercial payer applications, Medicare and Medicaid enrollment, and re-credentialing — so your providers start billing without delays.",
    features: ["CAQH profile setup and maintenance", "Medicare & Medicaid enrollment", "Commercial payer panel applications", "Re-credentialing and expiration tracking", "Credentialing status monitoring"],
    icon: (
      <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 12L11 14L15 10" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    link: "/contact",
  },
  "asc-billing": {
    title: "ASC Billing",
    subtitle: "Specialized billing for ambulatory surgery centers",
    description: "Ambulatory surgery center billing requires deep expertise in facility fee structures, device-intensive procedure groups, and multi-procedural discounting rules. MedCare's ASC billing team manages all of this — keeping your facility compliant, profitable, and collecting on every procedure performed.",
    features: ["Facility fee billing & optimization", "Device-intensive procedure groupings", "Multi-procedural discounting compliance", "ASC-specific modifier usage", "Implant and supply cost reporting"],
    icon: (
      <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10" stroke="#111111" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M16 2V6M8 2V6" stroke="#111111" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M3 10H21" stroke="#111111" strokeWidth="1.5"/>
        <path d="M7 14H11M7 17H15" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    link: "/contact",
  },
};

const SERVICE_KEYS = Object.keys(SERVICES_DATA);

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("hospital-billing");
  const [isFading, setIsFading] = useState(false);
  const current = SERVICES_DATA[activeTab];

  // Handle smooth transition animation when changing service tabs
  const handleTabChange = (key) => {
    if (key === activeTab) return;
    setIsFading(true);
    setTimeout(() => {
      setActiveTab(key);
      setIsFading(false);
    }, 250);
  };

  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO WITH CINEMATIC BACKGROUND ── */}
        <section style={{
          position: "relative",
          padding: "160px 24px 100px",
          overflow: "hidden",
          background: "#161411", // Sleek dark base for cinematic contrast
        }}>

          {/* Premium Gradient Overlays */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom, rgba(22,20,17,0.8) 0%, rgba(22,20,17,0.95) 100%)",
            zIndex: 2
          }} />
          
          <div style={{ position: "absolute", top: -150, right: -150, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,230,163,0.12), transparent 70%)", pointerEvents: "none", zIndex: 2 }} />

          {/* Hero Content Grid */}
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 3 }}>
            <div style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: 8, 
              background: "rgba(245, 230, 163, 0.1)", 
              border: "1px solid rgba(245, 230, 163, 0.25)", 
              borderRadius: 100, 
              padding: "7px 18px", 
              marginBottom: 24,
              animation: "fadeInUp 0.8s ease forwards"
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#F5E6A3", display: "inline-block", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: "#F5E6A3", letterSpacing: 1.5, textTransform: "uppercase" }}>Revenue Cycle Management</span>
            </div>
            
            <h1 style={{ 
              fontSize: "clamp(36px, 5.5vw, 62px)", 
              fontWeight: 800, 
              color: "#ffffff", 
              letterSpacing: -2, 
              marginBottom: 24, 
              lineHeight: 1.1,
              animation: "fadeInUp 0.9s ease 0.1s forwards",
              opacity: 0
            }}>
              Every service your<br />
              <span style={{ color: "#F5E6A3" }}>revenue cycle</span> needs
            </h1>
            
            <p style={{ 
              fontSize: 18, 
              color: "rgba(255,255,255,0.7)", 
              lineHeight: 1.8, 
              maxWidth: 580, 
              margin: "0 auto 40px",
              animation: "fadeInUp 0.9s ease 0.2s forwards",
              opacity: 0
            }}>
              From claim submission to payment posting, MedCare RCM handles every step — so you collect more of what you've already earned.
            </p>
            
            <div style={{ 
              display: "flex", 
              gap: 14, 
              justifyContent: "center", 
              flexWrap: "wrap",
              animation: "fadeInUp 0.9s ease 0.3s forwards",
              opacity: 0 
            }}>
              <Link href="/contact" className="hero-btn-primary" style={{ background: "#F5E6A3", color: "#111111", padding: "15px 32px", borderRadius: 100, fontSize: 15, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 10, transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                Get a free audit
                <span style={{ background: "#111111", color: "#F5E6A3", borderRadius: "50%", width: 24, height: 24, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>→</span>
              </Link>
              <Link href="/pricing" className="hero-btn-secondary" style={{ background: "transparent", color: "#ffffff", padding: "15px 32px", borderRadius: 100, fontSize: 15, fontWeight: 600, border: "1.5px solid rgba(255,255,255,0.2)", display: "inline-block", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                View pricing
              </Link>
            </div>
          </div>
        </section>

        {/* ── STATS BAR WITH COUNT-UP/STAGGER FEEL ── */}
        <section style={{ background: "#0D0C0B", padding: "52px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, textAlign: "center" }}>
            {[
              { value: "40+", label: "Specialties Supported" },
              { value: "500+", label: "Providers Served" },
              { value: "98%", label: "Clean Claim Rate" },
              { value: "$50M+", label: "Revenue Recovered" },
            ].map((item, i) => (
              <div key={i} style={{ animation: `fadeInUp 0.6s ease ${0.4 + i * 0.1}s forwards`, opacity: 0 }}>
                <div style={{ color: "#F5E6A3", fontSize: 38, fontWeight: 800, letterSpacing: -1 }}>{item.value}</div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", marginTop: 6, letterSpacing: 1.5 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── INTERACTIVE SERVICES PANEL (ANIMATED) ── */}
        <section style={{ background: "#FDFAF5", padding: "120px 24px" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>

            {/* Section header */}
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 26, height: 2, background: "#111111", borderRadius: 2 }} />
                <p style={{ fontSize: 12, fontWeight: 700, color: "#111111", letterSpacing: "2px", textTransform: "uppercase" }}>Our Specialties</p>
              </div>
              <h2 style={{ fontSize: "clamp(30px,4vw,46px)", fontWeight: 800, color: "#111111", letterSpacing: -1, marginBottom: 16 }}>
                What we handle for you
              </h2>
              <p style={{ fontSize: 16, color: "#666666", maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>
                Select a service to learn how MedCare RCM takes it off your plate — completely.
              </p>
            </div>

            {/* Two-column layout */}
            <div style={{ display: "grid", gridTemplateColumns: "310px 1fr", gap: 36, alignItems: "start" }} className="services-layout">

              {/* LEFT — Nav tabs */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, position: "sticky", top: 96, zIndex: 10 }}>
                {SERVICE_KEYS.map((key) => {
                  const isActive = activeTab === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleTabChange(key)}
                      style={{
                        textAlign: "left",
                        padding: "18px 24px",
                        fontSize: 14,
                        fontWeight: 600,
                        borderRadius: 14,
                        cursor: "pointer",
                        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                        border: isActive ? "1.5px solid #111111" : "1.5px solid transparent",
                        background: isActive ? "#111111" : "rgba(17,17,17,0.02)",
                        color: isActive ? "#fff" : "#444444",
                        boxShadow: isActive ? "0 8px 24px rgba(17,17,17,0.12)" : "none",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        transform: isActive ? "translateX(4px)" : "translateX(0)"
                      }}
                      className={!isActive ? "service-tab-hover" : ""}
                    >
                      <span>{SERVICES_DATA[key].title}</span>
                      <span style={{ 
                        fontSize: 14, 
                        color: isActive ? "#F5E6A3" : "#999999",
                        transition: "transform 0.2s ease",
                        transform: isActive ? "translateX(0)" : "translateX(-4px)"
                      }}>→</span>
                    </button>
                  );
                })}
              </div>

              {/* RIGHT — Content panel with Fade-Slide Effect */}
              <div 
                style={{
                  background: "#fff",
                  border: "1px solid rgba(17,17,17,0.06)",
                  borderRadius: 24,
                  padding: "54px 60px",
                  boxShadow: "0 12px 44px rgba(17,17,17,0.04)",
                  minHeight: 500,
                  transition: "opacity 0.25s ease, transform 0.25s ease",
                  opacity: isFading ? 0 : 1,
                  transform: isFading ? "translateY(10px)" : "translateY(0)"
                }}
              >
                {/* Icon Wrapper with Pop In Effect */}
                <div style={{ width: 76, height: 76, borderRadius: 20, background: "#F5F0E8", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
                  {current.icon}
                </div>

                <div style={{ marginBottom: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#999999", textTransform: "uppercase", letterSpacing: 1.5 }}>{current.subtitle}</span>
                </div>
                <h3 style={{ fontSize: 34, fontWeight: 800, color: "#111111", letterSpacing: -0.5, marginBottom: 20, lineHeight: 1.2 }}>
                  {current.title}
                </h3>
                <p style={{ fontSize: 16, color: "#555555", lineHeight: 1.9, marginBottom: 38, maxWidth: 600 }}>
                  {current.description}
                </p>

                {/* Features list */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 44 }}>
                  {current.features.map((f, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, animation: `fadeInUp 0.4s ease ${i * 0.05}s forwards` }}>
                      <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#F5E6A3", border: "1.5px solid rgba(17,17,17,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: 11, fontWeight: 900, color: "#111111" }}>✓</span>
                      </div>
                      <span style={{ fontSize: 14, color: "#222222", fontWeight: 500 }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link href={current.link} className="panel-cta-btn" style={{
                  background: "#111111", color: "#fff",
                  padding: "14px 30px", borderRadius: 100,
                  fontSize: 14, fontWeight: 700,
                  display: "inline-flex", alignItems: "center", gap: 8,
                  boxShadow: "0 4px 16px rgba(17,17,17,0.15)",
                  transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                }}>
                  Get a free consultation
                  <span style={{ background: "#F5E6A3", color: "#111111", borderRadius: "50%", width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800 }}>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US STRIP ── */}
        <section style={{ background: "#F5F0E8", padding: "100px 24px", borderTop: "1px solid rgba(17,17,17,0.06)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 800, color: "#111111", letterSpacing: -0.5, marginBottom: 14 }}>Why practices choose MedCare RCM</h2>
              <p style={{ fontSize: 15, color: "#666666", maxWidth: 500, margin: "0 auto" }}>Every service comes with the same commitment — maximum reimbursement, minimum hassle.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 24 }}>
              {[
                { icon: "⚡", title: "Fast onboarding", desc: "Most practices go live in under 7 days with zero billing disruption." },
                { icon: "📊", title: "Full transparency", desc: "Real-time dashboards show exactly where every claim stands." },
                { icon: "🔒", title: "HIPAA-compliant", desc: "Every system and workflow meets the highest data security standards." },
                { icon: "📞", title: "Dedicated support", desc: "One account manager who knows your practice — always reachable." },
              ].map((p, i) => (
                <div key={i} className="feature-card" style={{ background: "#fff", border: "1px solid rgba(17,17,17,0.06)", borderRadius: 20, padding: "28px 24px", boxShadow: "0 4px 16px rgba(17,17,17,0.02)", transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}>
                  <span style={{ fontSize: 28, display: "block", marginBottom: 14 }}>{p.icon}</span>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: "#111111", marginBottom: 8 }}>{p.title}</h4>
                  <p style={{ fontSize: 13, color: "#666666", lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA FOOTER BLOCK ── */}
        <section style={{ background: "#111111", padding: "100px 24px", position: "relative", overflow: "hidden" }}>
          <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
            <div style={{ display: "inline-block", background: "rgba(245,230,163,0.15)", border: "1px solid rgba(245,230,163,0.2)", borderRadius: 100, padding: "6px 18px", fontSize: 12, fontWeight: 700, color: "#F5E6A3", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 24 }}>No obligation</div>
            <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#fff", letterSpacing: -1, marginBottom: 18, lineHeight: 1.15 }}>
              Not sure which service<br />you need?
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: 40 }}>
              Talk to our team and we'll assess your current billing setup — then recommend exactly what will help your practice most.
            </p>
            <Link href="/contact" className="cta-final-btn" style={{ background: "#F5E6A3", color: "#111111", padding: "16px 36px", borderRadius: 100, fontSize: 15, fontWeight: 800, display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.3s ease", boxShadow: "0 4px 20px rgba(245,230,163,0.15)" }}>
              Book a free consultation →
            </Link>
          </div>
        </section>

      </main>
      <Footer />

      {/* ── ADVANCED INTERACTIVE AND MOTION STYLES ── */}
      <style>{`
        /* Global CSS animations */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slowPan {
          from { transform: scale(1.0) translate(0, 0); }
          to { transform: scale(1.08) translate(-1%, -1%); }
        }
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }

        /* Interactive Element Behaviors */
        .hero-btn-primary:hover {
          transform: translateY(-2px);
          background-color: #ffffff !important;
          box-shadow: 0 8px 28px rgba(245,230,163,0.25);
        }
        .hero-btn-secondary:hover {
          background-color: rgba(255,255,255,0.08) !important;
          border-color: #ffffff !important;
        }
        .service-tab-hover:hover {
          background: #ffffff !important;
          border-color: rgba(17,17,17,0.12) !important;
          color: #111111 !important;
          transform: translateX(2px);
        }
        .panel-cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(17,17,17,0.25) !important;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          border-color: rgba(17,17,17,0.15) !important;
          box-shadow: 0 12px 32px rgba(17,17,17,0.05) !important;
        }
        .cta-final-btn:hover {
          background-color: #ffffff !important;
          transform: scale(1.02);
          box-shadow: 0 8px 28px rgba(255,255,255,0.2) !important;
        }

        @media (max-width: 900px) {
          .services-layout { grid-template-columns: 1fr !important; gap: 24px !important; }
          .services-layout > div:first-child { position: relative !important; top: 0 !important; }
        }
      `}{/* ── ADVANCED INTERACTIVE AND MOTION STYLES ── */}
<style dangerouslySetInnerHTML={{ __studiouslyAvoidHydrationError: true, __html: `
  /* Global CSS animations */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slowPan {
    from { transform: scale(1.0) translate(0, 0); }
    to { transform: scale(1.08) translate(-1%, -1%); }
  }
  @keyframes pulse {
    0% { transform: scale(0.95); opacity: 0.5; }
    50% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(0.95); opacity: 0.5; }
  }

  /* Interactive Element Behaviors */
  .hero-btn-primary:hover {
    transform: translateY(-2px);
    background-color: #ffffff !important;
    box-shadow: 0 8px 28px rgba(245,230,163,0.25);
  }
  .hero-btn-secondary:hover {
    background-color: rgba(255,255,255,0.08) !important;
    border-color: #ffffff !important;
  }
  .service-tab-hover:hover {
    background: #ffffff !important;
    border-color: rgba(17,17,17,0.12) !important;
    color: #111111 !important;
    transform: translateX(2px);
  }
  .panel-cta-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(17,17,17,0.25) !important;
  }
  .feature-card:hover {
    transform: translateY(-4px);
    border-color: rgba(17,17,17,0.15) !important;
    box-shadow: 0 12px 32px rgba(17,17,17,0.05) !important;
  }
  .cta-final-btn:hover {
    background-color: #ffffff !important;
    transform: scale(1.02);
    box-shadow: 0 8px 28px rgba(255,255,255,0.2) !important;
  }

  @media (max-width: 900px) {
    .services-layout { grid-template-columns: 1fr !important; gap: 24px !important; }
    .services-layout > div:first-child { position: relative !important; top: 0 !important; }
  }
`}} />
</style>
    </>
  );
}