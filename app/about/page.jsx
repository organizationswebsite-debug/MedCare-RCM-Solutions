"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const VALUES = [
  { icon: "🎯", title: "Accuracy First", desc: "We treat every medical claim like it's the only one. Clean submissions, meticulous ICD-10/CPT coding, and zero administrative shortcuts ensure maximum return yields." },
  { icon: "🤝", title: "Partnership Mindset", desc: "We do not function as a detached third-party vendor — we operate as a dedicated, direct extension of your clinical team. Your operational success defines ours." },
  { icon: "🔒", title: "Uncompromising Compliance", desc: "HIPAA compliance is not a simple checkbox for us. Security protocols are actively hardcoded into every custom data pipeline and billing workflow we deploy." },
  { icon: "📢", title: "Radical Transparency", desc: "We share every performance matrix, audit trace, and financial report. Full insight access without hidden calculation structures or backend surprises." },
];

const TEAM = [
  { name: "Moazzam", role: "Founder & CEO", initials: "MZ", bio: "Visionary founder of Moaz Group of Companies, dedicated to engineering enterprise-grade RCM ecosystems that protect clinical independent practices nationwide." },
  { name: "RCM Operations Lead", role: "Head of Billing Operations", initials: "OP", bio: "Certified medical billing specialist managing multi-departmental operations with over 15 years of complex denial management expertise." },
  { name: "Compliance Officer", role: "HIPAA & Data Security", initials: "CO", bio: "Oversees structural regulatory frameworks, ensuring end-to-end data transmission matches supreme state-level defense layers." },
];

// 📊 NEW: EXTENDED 6-YEAR TIMELINE FROM 2020 TO 2026 WITH BUILT PRODUCTS FOR PROVIDERS
const BUILDING_YEARS = [
  { 
    year: "2020", 
    title: "The Genesis & Core Clearinghouse Integrations", 
    builtForProviders: "Built our first secure baseline EDI (Electronic Data Interchange) pipeline. This allowed small, private practices to safely transmit batch claims directly to major national clearinghouses during the peak administrative strain of the pandemic, maintaining zero data drop rates.",
    desc: "Founded on the core principle of structural billing integrity, we started by auditing legacy systems and isolating why independent clinics were losing up to 18% of their gross revenue to basic front-end submission formatting errors." 
  },
  { 
    year: "2021", 
    title: "Launch of Custom Eligibility Verification Protocols", 
    builtForProviders: "Designed and deployed an automated Real-Time Eligibility (RTE) micro-engine. Providers could instantly check patient insurance coverage profiles, copays, and deductibles before a patient ever stepped into the clinic, reducing front-desk verification workflows by 50%.",
    desc: "As payer rules shifted rapidly across states, we focused heavily on building preventative verification structures to stop the industry's highest driver of claim rejections—incorrect patient demographics and inactive coverage profiles." 
  },
  { 
    year: "2022", 
    title: "Patient Payment Gateways & Statement Automations", 
    builtForProviders: "Engineered a transparent, responsive Patient Out-of-Pocket Billing Portal. This sent clean, text-based breakdown links directly to patients, allowing them to pay their balances securely online via an encrypted gateway, boosting patient-side collections by 35% for our partner practices.",
    desc: "Recognizing that high-deductible healthcare plans were increasing the burden of patient collection responsibilities, we shifted focus toward creating clear, frictionless point-of-care payment collection features." 
  },
  { 
    year: "2023", 
    title: "Specialty-Specific Coding Matrices & Multi-Modifier Engines", 
    builtForProviders: "Shipped custom internal rule-books for high-friction clinical fields like Dentistry, Pediatrics, and Geriatrics. We mapped automatic multi-modifier code-scrubbers that updated weekly, ensuring highly complex multi-procedure claims were never downcoded by insurance algorithms.",
    desc: "We realized a generic one-size-fits-all billing approach fails specialty practices. This year was dedicated entirely to building deep domain intelligence rules to ensure niche clinical groups recovered every dollar they legally deserved." 
  },
  { 
    year: "2024", 
    title: "Centralized Credentialing Engine & Corporate Alignment", 
    builtForProviders: "Engineered and shipped our proprietary automated enrollment framework. This eliminated manual tracking delays, allowing medical practices to onboard with major insurance payers 40% faster while maintaining encrypted credential trails under the Moaz Group structure.",
    desc: "Recognizing a severe leak in standard practice revenue cycles due to flawed automated denial systems, the initial framework for an advanced, human-in-the-loop billing pipeline was engineered under the Moaz Group architecture." 
  },
  { 
    year: "2025", 
    title: "Smart ICD-10 Claim Scrubbers & Cross-EHR Pipelines", 
    builtForProviders: "Developed and launched custom real-time coding validation software. This engine sits on top of independent clinics' existing EHR networks, scrubbing codes for mistakes prior to transmission to completely mitigate front-end clearance delays.",
    desc: "Launched dedicated pilot programs across 12 high-friction clinical specialties including Ophthalmology and complex Geriatrics. Refined the clean claim submission workflow to hit an unprecedented 97.4% first-pass benchmark." 
  },
  { 
    year: "2026", 
    title: "Live Denials Tracking Portal & Multi-State Scale Architecture", 
    builtForProviders: "Deployed the transparent Patient-to-Payer Auditing Web Platform. Medical providers can now log in to dynamically track real-time collection metrics, transparent denial resolutions, and electronic transfer files without waiting for monthly updates.",
    desc: "MedCare RCM Solutions officially transitioned into independent market deployment. Rapidly scaled operations to support hundreds of independent providers nationwide, optimizing over $50M+ in clinical assets." 
  }
];

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Navbar />
      
      <main style={{ backgroundColor: "#F5F0E8", overflowX: "hidden" }}>
        
        {/* 1. HERO SECTION WITH IMAGE OVERLAY */}
        <section 
          className="hero-container"
          style={{ 
            position: "relative",
            backgroundImage: `linear-gradient(180deg, rgba(245, 240, 232, 0.82) 0%, #F5F0E8 100%), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "180px 24px 100px", 
            textAlign: "center"
          }}
        >
          <div style={{ 
            maxWidth: 820, 
            margin: "0 auto",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(25px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
          }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#111111", backgroundColor: "#F5E6A3", letterSpacing: "1.5px", textTransform: "uppercase", padding: "6px 14px", borderRadius: 4, display: "inline-block", marginBottom: 20 }}>
              Our Story
            </span>
            <h1 style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 950, color: "#111111", textTransform: "uppercase", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 24 }}>
              Built to fix what's broken in healthcare billing
            </h1>
            <p style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "#444444", lineHeight: 1.7, maxWidth: 680, margin: "0 auto", fontWeight: 500 }}>
              MedCare RCM Solutions was founded with a singular, disruptive mission: to provide medical professionals with a reliable billing shield—one that aggressively defends every dollar earned.
            </p>
          </div>
        </section>

        {/* 2. DEDICATED EXTENDED MISSION & VISION BLOCK */}
        <section style={{ padding: "80px 24px", backgroundColor: "#F5F0E8" }}>
          <div className="mv-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            
            {/* Our Mission */}
            <div style={{ 
              backgroundColor: "#ffffff", 
              padding: "56px 48px", 
              borderRadius: 16, 
              border: "1px solid rgba(17,17,17,0.05)",
              boxShadow: "0 20px 40px rgba(17,17,17,0.01)",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
            }}>
              <div style={{ fontSize: "40px", marginBottom: "20px" }}>🚀</div>
              <h3 style={{ fontSize: "24px", fontWeight: 900, color: "#111111", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "-0.5px" }}>Our Mission</h3>
              <p style={{ fontSize: "15px", color: "#333333", lineHeight: 1.8, fontWeight: 500, marginBottom: 14 }}>
                To empower medical practices by completely dismantling administrative inefficiencies, complex insurance friction networks, and unfair claim downgrades.
              </p>
              <p style={{ fontSize: "14px", color: "#666666", lineHeight: 1.7 }}>
                We combine industry-leading certified coding precision with unyielding, aggressive appeal workflows. By protecting clinical cash flows from structural insurance delays, we ensure healthcare providers can completely divest themselves of financial anxiety and refocus all critical energy on patient care optimization.
              </p>
            </div>

            {/* Our Vision */}
            <div style={{ 
              backgroundColor: "#ffffff", 
              padding: "56px 48px", 
              borderRadius: 16, 
              border: "1px solid rgba(17,17,17,0.05)",
              boxShadow: "0 20px 40px rgba(17,17,17,0.01)",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s"
            }}>
              <div style={{ fontSize: "40px", marginBottom: "20px" }}>👁️</div>
              <h3 style={{ fontSize: "24px", fontWeight: 900, color: "#111111", marginBottom: "16px", textTransform: "uppercase", letterSpacing: "-0.5px" }}>Our Vision</h3>
              <p style={{ fontSize: "15px", color: "#333333", lineHeight: 1.8, fontWeight: 500, marginBottom: 14 }}>
                To establish the absolute gold standard revenue optimization infrastructure across the entire United States healthcare ecosystem.
              </p>
              <p style={{ fontSize: "14px", color: "#666666", lineHeight: 1.7 }}>
                We envision an automated, modern clinical environment where independent practice groups and multi-specialty facilities run smoothly without clearinghouse blocks. Through real-time compliance updates and specialized multi-state tracking modules, we aim to eliminate systemic medical under-billing entirely.
              </p>
            </div>

          </div>
        </section>

        {/* 3. UPDATED TIMELINE BLOCK: SPACED OUT FROM 2020 TO 2026 */}
        <section style={{ background: "#ffffff", padding: "140px 24px", borderTop: "1px solid rgba(17,17,17,0.05)" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 100 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#111111", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
                Milestones & Scale
              </span>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, color: "#111111", textTransform: "uppercase", letterSpacing: "-1px" }}>
                Our Building Years
              </h2>
            </div>

            {/* Spaced Out Vertical Timeline Stream (gap increased to 100px for premium layout spacing) */}
            <div style={{ display: "flex", flexDirection: "column", gap: "100px", position: "relative" }}>
              {BUILDING_YEARS.map((item, i) => (
                <div 
                  key={i}
                  className="timeline-row-extended"
                  style={{ 
                    display: "grid", 
                    gridTemplateColumns: "140px 1fr", 
                    gap: 48, 
                    alignItems: "flex-start",
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(40px)",
                    transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`
                  }}
                >
                  {/* Year Badging Container */}
                  <div style={{ 
                    fontSize: "30px", 
                    fontWeight: 950, 
                    color: "#111111", 
                    backgroundColor: "#F5E6A3", 
                    padding: "12px 20px", 
                    borderRadius: 12,
                    textAlign: "center",
                    boxShadow: "0 4px 15px rgba(245, 230, 163, 0.2)"
                  }}>
                    {item.year}
                  </div>
                  
                  {/* Detailed Breakdowns */}
                  <div>
                    <h3 style={{ fontSize: "20px", fontWeight: 900, color: "#111111", marginBottom: 16, textTransform: "uppercase", letterSpacing: "-0.5px" }}>
                      {item.title}
                    </h3>
                    
                    {/* Focus Point Highlight Box */}
                    <div style={{ backgroundColor: "#F5F0E8", padding: "20px 24px", borderRadius: 8, marginBottom: 16, borderLeft: "4px solid #111111" }}>
                      <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", display: "block", color: "#666666", marginBottom: 6, letterSpacing: "0.5px" }}>
                        What We Created For Providers:
                      </span>
                      <p style={{ fontSize: "14.5px", color: "#111111", lineHeight: 1.6, fontWeight: 600 }}>
                        {item.builtForProviders}
                      </p>
                    </div>

                    <p style={{ fontSize: "14px", color: "#555555", lineHeight: 1.7 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. SUBSIDIARY HISTORY & STATS GRAPH */}
        <section style={{ background: "#F5F0E8", padding: "100px 24px", borderTop: "1px solid rgba(17,17,17,0.05)" }}>
          <div className="story-split" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 64, alignItems: "center" }}>
            <div>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#111111", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
                Corporate Lineage
              </span>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, color: "#111111", letterSpacing: "-1px", lineHeight: 1.2, marginBottom: 24, textTransform: "uppercase" }}>
                A strategic subsidiary of Moaz Group of Companies
              </h2>
              <p style={{ fontSize: 15, color: "#444444", lineHeight: 1.8, marginBottom: 20, fontWeight: 500 }}>
                MedCare RCM Solutions is an elite, specialized vertical of the Moaz Group of Companies. Founded by Moazzam, the operation was structured specifically to scale complex enterprise-grade data management pipelines into accessible custom workflows for independent provider groups.
              </p>
              <p style={{ fontSize: 15, color: "#555555", lineHeight: 1.8, marginBottom: 20 }}>
                We monitored healthcare systems losing up to 18% of their rightful operational overhead directly to automated insurer rejection code nets and delayed processing logs. We built MedCare RCM to break that pattern—re-balancing the scales through specialized knowledge mechanics.
              </p>
              <p style={{ fontSize: 15, color: "#555555", lineHeight: 1.8, fontWeight: 500 }}>
                Today, our centralized system manages end-to-end optimizations for multi-state setups, processing clean pipelines across 30+ medical clinical specialties without compromise.
              </p>
            </div>

            {/* Grid Panels */}
            <div className="stats-box-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                { value: "500+", label: "Providers Networked" },
                { value: "30+", label: "Clinical Specialties" },
                { value: "98%", label: "First-Pass Claim Rate" },
                { value: "$50M+", label: "Revenue Recovered" },
              ].map((s, i) => (
                <div key={i} style={{ backgroundColor: "#ffffff", borderRadius: 12, padding: "28px 20px", border: "1px solid rgba(17,17,17,0.03)", textAlign: "center" }}>
                  <div style={{ fontSize: 34, fontWeight: 900, color: "#111111", letterSpacing: "-1px" }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "#666666", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginTop: 8 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. VALUES CONFIGURATION SECTOR */}
        <section style={{ background: "#ffffff", padding: "100px 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#111111", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
                Our Core Pillars
              </span>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, color: "#111111", textTransform: "uppercase", letterSpacing: "-1px" }}>
                What drives every decision we make
              </h2>
            </div>
            
            <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
              {VALUES.map((v, i) => (
                <div 
                  key={i} 
                  className="interactive-card"
                  style={{ 
                    background: "#F5F0E8", 
                    borderRadius: 12, 
                    padding: "36px 28px",
                    border: "1px solid rgba(17,17,17,0.04)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.01)",
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(30px)",
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 18 }}>{v.icon}</div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, color: "#111111", marginBottom: 12, letterSpacing: "-0.3px" }}>{v.title}</h3>
                  <p style={{ fontSize: 14, color: "#555555", lineHeight: 1.65, fontWeight: 500 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. CORPORATE LEADERSHIP TEAM SEGMENT */}
        <section style={{ background: "#F5F0E8", padding: "100px 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#111111", letterSpacing: "1.5px", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
                Leadership Execution
              </span>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, color: "#111111", textTransform: "uppercase", letterSpacing: "-1px" }}>
                The people behind MedCare RCM
              </h2>
            </div>
            
            <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
              {TEAM.map((t, i) => (
                <div 
                  key={i} 
                  style={{ 
                    border: "1px solid rgba(17,17,17,0.06)", 
                    borderRadius: 12, 
                    padding: "40px 32px", 
                    textAlign: "center",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.01)"
                  }}
                >
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#111111", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontWeight: 800, fontSize: 16, color: "#ffffff", letterSpacing: "-0.5px" }}>
                    {t.initials}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 850, color: "#111111", marginBottom: 4 }}>{t.name}</h3>
                  <p style={{ fontSize: 12, color: "#0052B4", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 16 }}>{t.role}</p>
                  <p style={{ fontSize: 13, color: "#555555", lineHeight: 1.6, fontWeight: 500 }}>{t.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. SYSTEM CLOSING CTA BLOCK */}
        <section style={{ background: "#111111", padding: "100px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(30px, 4.5vw, 44px)", fontWeight: 950, color: "#ffffff", textTransform: "uppercase", letterSpacing: "-1px", marginBottom: 18 }}>
              Ready to work with us?
            </h2>
            <p style={{ fontSize: 16, color: "#888888", fontWeight: 500, lineHeight: 1.6, marginBottom: 36, maxWidth: 550, margin: "0 auto 36px" }}>
              Let's audit your processing health and immediately secure the missing segments of your hard-earned revenue.
            </p>
            
            <Link 
              href="/contact" 
              style={{ 
                display: "inline-block", 
                background: "#ffffff", 
                color: "#111111", 
                padding: "16px 36px", 
                borderRadius: 6, 
                fontSize: 15, 
                fontWeight: 700,
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                transition: "transform 0.2s ease"
              }}
              className="cta-btn"
            >
              Get in touch →
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />

      {/* 📱 MODERN MICRO-STYLES & GLOBAL MOBILE RESPONSIVENESS OVERRIDES */}
      <style jsx global>{`
        .interactive-card {
          transform: translateY(0);
          transition: transform 0.3s ease, box-shadow 0.3s ease !important;
        }
        .interactive-card:hover {
          transform: translateY(-5px) !important;
          box-shadow: 0 15px 35px rgba(17, 17, 17, 0.04) !important;
        }
        .cta-btn:hover {
          transform: scale(1.02);
        }

        /* Responsive Mobile Breakpoints Grid Locks */
        @media (max-width: 992px) {
          .values-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
          .team-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .story-split {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .mv-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .timeline-row-extended {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .team-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .hero-container {
            padding: 140px 16px 60px !important;
          }
        }

        @media (max-width: 480px) {
          .stats-box-grid {
            grid-template-columns: 1fr !important;
          }
          .values-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}