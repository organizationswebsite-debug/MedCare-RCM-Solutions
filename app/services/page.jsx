"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const SERVICES_DATA = {
  "hospital-billing": {
    title: "Hospital Billing",
    subtitle: "Full-cycle institutional billing for hospitals of all sizes",
    emoji: "🏥",
    description: "MedCare RCM Solutions manages the complete billing lifecycle for hospital systems — from complex inpatient DRG bundling to outpatient facility coding. We handle multi-departmental claim processing, charge capture reconciliation, and payer-specific compliance protocols so your revenue flows without interruption.",
    features: [
      "Inpatient DRG bundling & optimization",
      "Outpatient facility coding compliance",
      "Multi-departmental claim processing",
      "Charge capture reconciliation",
      "Medicare & Medicaid billing expertise",
    ],
    link: "/contact",
  },
  "physician-billing": {
    title: "Physician Billing",
    subtitle: "Built for private practices and multi-specialty physician groups",
    emoji: "👨‍⚕️",
    description: "We manage end-to-end revenue cycle operations for independent practices and physician networks. Our team ensures your clean claim ratios stay high by handling high-volume outpatient encounters, E&M coding compliance, modifier accuracy, and preventive medicine billing — freeing your staff to focus on patient care.",
    features: [
      "E&M coding and modifier compliance",
      "High-volume outpatient claim submission",
      "Preventive medicine billing",
      "Multi-specialty group billing",
      "Real-time eligibility verification",
    ],
    link: "/contact",
  },
  "laboratory-billing": {
    title: "Laboratory Billing",
    subtitle: "Precise billing for molecular, pathology, and toxicology labs",
    emoji: "🧪",
    description: "Laboratory billing is among the most technically complex in healthcare. MedCare RCM handles multi-analyte test panels, prior authorization requirements, reference lab split-billing, and PAMA compliance — ensuring every specimen and panel is billed correctly and reimbursed in full.",
    features: [
      "Multi-analyte & molecular panel billing",
      "Prior authorization management",
      "Reference lab split-billing models",
      "PAMA compliance & monitoring",
      "Toxicology and pathology coding",
    ],
    link: "/contact",
  },
  "imaging-billing": {
    title: "Imaging Center Billing",
    subtitle: "Technical and professional component billing for diagnostic imaging",
    emoji: "📸",
    description: "Imaging billing demands precision. We handle professional component (Modifier 26) and technical component (TC) billing splits for MRI, CT, X-ray, and ultrasound services. Our team actively combats automated payer downcoding and ensures every diagnostic interpretation is reimbursed at the correct rate.",
    features: [
      "Professional vs. technical component splits",
      "MRI, CT, X-ray & ultrasound billing",
      "Modifier 26 and TC compliance",
      "Automated downcoding defense",
      "Radiology RVU optimization",
    ],
    link: "/contact",
  },
  "ar-recovery": {
    title: "A/R Recovery",
    subtitle: "We recover the revenue your practice has already earned",
    emoji: "💰",
    description: "Aging accounts receivable drain cash flow and consume staff time. Our dedicated A/R recovery team systematically pursues claims beyond 60 days — analyzing denial patterns, filing targeted appeals, and negotiating with payers to settle outstanding balances and unlock frozen revenue for your practice.",
    features: [
      "Claims aging beyond 60-day threshold",
      "Denial root cause analysis & appeal filing",
      "Payer negotiation and escalation",
      "Legacy claim resolution",
      "Monthly A/R recovery reporting",
    ],
    link: "/contact",
  },
  "credentialing": {
    title: "Provider Credentialing",
    subtitle: "Get your providers enrolled and billing — fast",
    emoji: "🪪",
    description: "Every day a provider isn't credentialed is revenue your practice never sees. MedCare manages the full credentialing and payer enrollment process — CAQH profile setup and maintenance, commercial payer applications, Medicare and Medicaid enrollment, and re-credentialing — so your providers start billing without delays.",
    features: [
      "CAQH profile setup and maintenance",
      "Medicare & Medicaid enrollment",
      "Commercial payer panel applications",
      "Re-credentialing and expiration tracking",
      "Credentialing status monitoring",
    ],
    link: "/contact",
  },
  "asc-billing": {
    title: "ASC Billing",
    subtitle: "Specialized billing for ambulatory surgery centers",
    emoji: "🏨",
    description: "Ambulatory surgery center billing requires deep expertise in facility fee structures, device-intensive procedure groups, and multi-procedural discounting rules. MedCare's ASC billing team manages all of this — keeping your facility compliant, profitable, and collecting on every procedure performed.",
    features: [
      "Facility fee billing & optimization",
      "Device-intensive procedure groupings",
      "Multi-procedural discounting compliance",
      "ASC-specific modifier usage",
      "Implant and supply cost reporting",
    ],
    link: "/contact",
  },
  "denial-management": {
    title: "Denial Management",
    subtitle: "Turn denied claims into recovered revenue — systematically",
    emoji: "🚫",
    description: "Most practices write off denials that should be appealed — payers count on this. MedCare's denial management team reviews every denial within 24 hours, identifies the root cause, corrects it, and files a targeted appeal within 48 hours. We track denial patterns practice-wide to fix upstream issues and prevent recurrence.",
    features: [
      "48-hour appeal turnaround on all denials",
      "Root cause analysis by denial reason code",
      "Payer-specific appeal letter templates",
      "Monthly denial trend reporting",
      "70%+ first-level appeal success rate",
    ],
    link: "/contact",
  },
  "patient-billing": {
    title: "Patient Billing",
    subtitle: "Clear statements that improve collections without damaging trust",
    emoji: "👤",
    description: "With deductibles rising every year, patient responsibility now accounts for 30–35% of practice revenue. MedCare handles patient billing with professional, easy-to-understand statements, online payment portals, and compassionate follow-up — improving collections while maintaining the patient relationships your practice depends on.",
    features: [
      "Statements sent within 5 days of adjudication",
      "Online patient payment portal setup",
      "Payment plan management for large balances",
      "Compassionate follow-up protocols",
      "HSA/FSA and multi-payment method support",
    ],
    link: "/contact",
  },
  "reporting-analytics": {
    title: "Reporting & Analytics",
    subtitle: "Real-time visibility into every corner of your revenue cycle",
    emoji: "📊",
    description: "You can't improve what you can't measure. MedCare delivers a live KPI dashboard showing your clean claim rate, AR days, denial trends, payer performance, and collections — updated in real time. Monthly executive reports explain every number in plain language with clear recommendations for improvement.",
    features: [
      "Live KPI dashboard — updated in real time",
      "Monthly executive summary reports",
      "Payer performance benchmarking",
      "AR aging analysis by payer and age bucket",
      "Custom reports by provider, location, or specialty",
    ],
    link: "/contact",
  },
};

const SERVICE_KEYS = Object.keys(SERVICES_DATA);

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("hospital-billing");
  const [mobileOpen, setMobileOpen] = useState(false);
  const current = SERVICES_DATA[activeTab];

  const handleSelect = (key) => {
    setActiveTab(key);
    setMobileOpen(false);
  };

  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ── */}
        <section style={{
          background: "linear-gradient(160deg,#F5F0E8 0%,#FDFAF5 50%,#F0EBE0 100%)",
          padding: "140px 24px 80px",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position:"absolute", top:-100, right:-100, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,230,163,0.3),transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:-60, left:-60, width:350, height:350, borderRadius:"50%", background:"radial-gradient(circle,rgba(17,17,17,0.04),transparent 70%)", pointerEvents:"none" }} />

          <div style={{ maxWidth:760, textAlign:"left", position:"relative", zIndex:2 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#F5E6A3", border:"1px solid rgba(17,17,17,0.15)", borderRadius:100, padding:"7px 18px", marginBottom:22 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#111111", display:"inline-block" }} />
              <span style={{ fontSize:12, fontWeight:700, color:"#111111", letterSpacing:1.5, textTransform:"uppercase" }}>Revenue Cycle Management</span>
            </div>
            <h1 style={{ fontSize:"clamp(34px,5vw,58px)", fontWeight:800, color:"#111111", letterSpacing:-2, marginBottom:20, lineHeight:1.1 }}>
              Every service your<br/>
              <span style={{ color:"#111111", opacity:0.3 }}>revenue cycle</span> needs
            </h1>
            <p style={{ fontSize:18, color:"#666666", lineHeight:1.8, maxWidth:540, margin:"0 0 36px" }}>
              From claim submission to payment posting, MedCare RCM handles every step — so you collect more of what you've already earned.
            </p>
            <div style={{ display:"flex", gap:14, justifyContent:"flex-start", flexWrap:"wrap" }}>
              <Link href="/contact" style={{ background:"#111111", color:"#fff", padding:"14px 28px", borderRadius:100, fontSize:15, fontWeight:700, display:"inline-flex", alignItems:"center", gap:8, boxShadow:"0 4px 20px rgba(17,17,17,0.2)" }}>
                Get a free audit
                <span style={{ background:"#F5E6A3", color:"#111111", borderRadius:"50%", width:24, height:24, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800 }}>→</span>
              </Link>
              <Link href="/pricing" style={{ background:"transparent", color:"#111111", padding:"14px 28px", borderRadius:100, fontSize:15, fontWeight:600, border:"1.5px solid rgba(17,17,17,0.2)", display:"inline-block" }}>
                View pricing
              </Link>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section style={{ background:"#111111", padding:"48px 24px" }}>
          <div className="stats-grid" style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24, textAlign:"center" }}>
            {[
              { value:"40+",   label:"Specialties Supported" },
              { value:"500+",  label:"Providers Served" },
              { value:"98%",   label:"Clean Claim Rate" },
              { value:"$50M+", label:"Revenue Recovered" },
            ].map((item,i) => (
              <div key={i}>
                <div style={{ color:"#F5E6A3", fontSize:34, fontWeight:800, letterSpacing:-1 }}>{item.value}</div>
                <div style={{ color:"rgba(255,255,255,0.45)", fontSize:12, fontWeight:600, textTransform:"uppercase", marginTop:5, letterSpacing:1 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── INTERACTIVE SERVICES PANEL ── */}
        <section style={{ background:"#FDFAF5", padding:"80px 24px 100px" }}>
          <div style={{ maxWidth:1180, margin:"0 auto" }}>

            {/* Section header */}
            <div style={{ textAlign:"center", marginBottom:56 }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:14 }}>
                <div style={{ width:26, height:2, background:"#111111", borderRadius:2 }} />
                <p style={{ fontSize:12, fontWeight:700, color:"#111111", letterSpacing:"2px", textTransform:"uppercase" }}>Our Services</p>
              </div>
              <h2 style={{ fontSize:"clamp(28px,4vw,44px)", fontWeight:800, color:"#111111", letterSpacing:-1, marginBottom:14 }}>
                What we handle for you
              </h2>
              <p style={{ fontSize:16, color:"#666666", maxWidth:500, margin:"0 auto", lineHeight:1.75 }}>
                Select a service below to see exactly how MedCare RCM takes it off your plate.
              </p>
            </div>

            {/* ── MOBILE: dropdown selector ── */}
            <div className="mobile-selector" style={{ display:"none", marginBottom:24 }}>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{ width:"100%", background:"#111111", color:"#fff", border:"none", padding:"16px 20px", borderRadius:14, fontSize:15, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between" }}
              >
                <span>{current.emoji} {current.title}</span>
                <span style={{ fontSize:18, transform: mobileOpen ? "rotate(180deg)" : "rotate(0)", transition:"transform 0.25s" }}>⌄</span>
              </button>
              {mobileOpen && (
                <div style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.1)", borderRadius:14, marginTop:8, overflow:"hidden", boxShadow:"0 8px 32px rgba(17,17,17,0.1)" }}>
                  {SERVICE_KEYS.map(key => (
                    <button key={key} onClick={() => handleSelect(key)}
                      style={{ width:"100%", background: activeTab===key ? "#F5F0E8" : "#fff", border:"none", borderBottom:"1px solid rgba(17,17,17,0.06)", padding:"15px 20px", fontSize:14, fontWeight: activeTab===key ? 700 : 500, color: activeTab===key ? "#111111" : "#555555", cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:10 }}>
                      <span>{SERVICES_DATA[key].emoji}</span>
                      <span>{SERVICES_DATA[key].title}</span>
                      {activeTab===key && <span style={{ marginLeft:"auto", color:"#111111", fontSize:13 }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── DESKTOP: sidebar + panel ── */}
            <div className="services-layout" style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:20, alignItems:"start" }}>

              {/* LEFT sidebar */}
              <div className="services-sidebar" style={{ display:"flex", flexDirection:"column", gap:5, position:"sticky", top:88 }}>
                {SERVICE_KEYS.map(key => {
                  const isActive = activeTab === key;
                  return (
                    <button key={key} onClick={() => setActiveTab(key)}
                      style={{
                        textAlign:"left", padding:"14px 18px", fontSize:14, fontWeight:600,
                        borderRadius:12, cursor:"pointer", transition:"all 0.2s ease",
                        border: isActive ? "1.5px solid #111111" : "1.5px solid transparent",
                        background: isActive ? "#111111" : "transparent",
                        color: isActive ? "#fff" : "#555555",
                        boxShadow: isActive ? "0 4px 20px rgba(17,17,17,0.15)" : "none",
                        display:"flex", alignItems:"center", gap:10,
                      }}
                      onMouseEnter={e => { if(!isActive){ e.currentTarget.style.background="#fff"; e.currentTarget.style.border="1.5px solid rgba(17,17,17,0.15)"; e.currentTarget.style.color="#111111"; } }}
                      onMouseLeave={e => { if(!isActive){ e.currentTarget.style.background="transparent"; e.currentTarget.style.border="1.5px solid transparent"; e.currentTarget.style.color="#555555"; } }}
                    >
                      <span style={{ fontSize:16 }}>{SERVICES_DATA[key].emoji}</span>
                      <span style={{ flex:1 }}>{SERVICES_DATA[key].title}</span>
                      {isActive && <span style={{ fontSize:13, color:"#F5E6A3" }}>→</span>}
                    </button>
                  );
                })}
              </div>

              {/* RIGHT content panel */}
              <div style={{
                background:"#fff", border:"1px solid rgba(17,17,17,0.08)",
                borderRadius:20, padding:"44px 44px",
                boxShadow:"0 8px 40px rgba(17,17,17,0.06)",
              }} className="services-panel">
                {/* Emoji icon */}
                <div style={{ width:68, height:68, borderRadius:18, background:"#F5F0E8", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, marginBottom:24 }}>
                  {current.emoji}
                </div>
                <div style={{ marginBottom:6 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:"#999999", textTransform:"uppercase", letterSpacing:1.5 }}>{current.subtitle}</span>
                </div>
                <h3 style={{ fontSize:"clamp(24px,3vw,30px)", fontWeight:800, color:"#111111", letterSpacing:-0.5, marginBottom:16, lineHeight:1.2 }}>
                  {current.title}
                </h3>
                <p style={{ fontSize:15.5, color:"#555555", lineHeight:1.85, marginBottom:30, maxWidth:560 }}>
                  {current.description}
                </p>

                {/* Features */}
                <div className="features-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px 16px", marginBottom:36 }}>
                  {current.features.map((f,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                      <div style={{ width:22, height:22, borderRadius:"50%", background:"#F5E6A3", border:"1.5px solid rgba(17,17,17,0.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                        <span style={{ fontSize:11, fontWeight:800, color:"#111111" }}>✓</span>
                      </div>
                      <span style={{ fontSize:13.5, color:"#333333", fontWeight:500, lineHeight:1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link href={current.link} style={{
                  background:"#111111", color:"#fff",
                  padding:"13px 26px", borderRadius:100,
                  fontSize:14, fontWeight:700,
                  display:"inline-flex", alignItems:"center", gap:8,
                  boxShadow:"0 4px 16px rgba(17,17,17,0.2)",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(17,17,17,0.28)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 16px rgba(17,17,17,0.2)"; }}>
                  Get a free consultation
                  <span style={{ background:"#F5E6A3", color:"#111111", borderRadius:"50%", width:22, height:22, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800 }}>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section style={{ background:"#F5F0E8", padding:"80px 24px", borderTop:"1px solid rgba(17,17,17,0.07)" }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <h2 style={{ fontSize:"clamp(24px,3vw,36px)", fontWeight:800, color:"#111111", letterSpacing:-0.5, marginBottom:12 }}>Why practices choose MedCare RCM</h2>
              <p style={{ fontSize:15, color:"#666666", maxWidth:480, margin:"0 auto" }}>Every service comes with the same commitment — maximum reimbursement, minimum hassle.</p>
            </div>
            <div className="why-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
              {[
                { icon:"⚡", title:"Fast onboarding", desc:"Most practices go live in under 7 days with zero billing disruption to existing workflows." },
                { icon:"📊", title:"Full transparency", desc:"Real-time dashboards show exactly where every claim stands — no surprises." },
                { icon:"🔒", title:"HIPAA-compliant", desc:"Every system and workflow meets the highest data security and compliance standards." },
                { icon:"📞", title:"Dedicated support", desc:"One account manager who knows your practice inside out — always reachable." },
              ].map((p,i) => (
                <div key={i} style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:16, padding:"24px 20px", boxShadow:"0 2px 12px rgba(17,17,17,0.04)" }}>
                  <span style={{ fontSize:26, display:"block", marginBottom:12 }}>{p.icon}</span>
                  <h4 style={{ fontSize:15, fontWeight:700, color:"#111111", marginBottom:7 }}>{p.title}</h4>
                  <p style={{ fontSize:13, color:"#666666", lineHeight:1.65 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background:"#111111", padding:"80px 24px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-80, right:-80, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,230,163,0.08),transparent 70%)", pointerEvents:"none" }} />
          <div style={{ maxWidth:640, margin:"0 auto", textAlign:"center", position:"relative", zIndex:2 }}>
            <div style={{ display:"inline-block", background:"#F5E6A3", borderRadius:100, padding:"6px 18px", fontSize:12, fontWeight:700, color:"#111111", letterSpacing:1.5, textTransform:"uppercase", marginBottom:24 }}>No obligation</div>
            <h2 style={{ fontSize:"clamp(26px,4vw,42px)", fontWeight:800, color:"#fff", letterSpacing:-1, marginBottom:16, lineHeight:1.15 }}>
              Not sure which service<br/>you need?
            </h2>
            <p style={{ fontSize:16, color:"rgba(255,255,255,0.5)", lineHeight:1.75, marginBottom:36 }}>
              Talk to our team and we'll assess your current billing setup — then recommend exactly what will help your practice most.
            </p>
            <Link href="/contact" style={{ background:"#F5E6A3", color:"#111111", padding:"15px 32px", borderRadius:100, fontSize:15, fontWeight:800, display:"inline-flex", alignItems:"center", gap:8 }}>
              Book a free consultation →
            </Link>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        /* ── Mobile ── */
        @media (max-width: 900px) {
          .services-layout   { grid-template-columns: 1fr !important; }
          .services-sidebar  { display: none !important; }
          .mobile-selector   { display: block !important; }
          .services-panel    { padding: 28px 22px !important; }
          .features-grid     { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; gap: 28px 16px !important; }
          .why-grid   { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .why-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </>
  );
}
