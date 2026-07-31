"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const COLORS = {
  cream: "#F5F0E8",
  cream2: "#FDFAF5",
  cream3: "#F0EBE0",
  black: "#111111",
  yellow: "#F5E6A3",
  muted: "#666666",
};

/* ══ REVEAL ANIMATION HOOK ══ */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, dir = "up" }) {
  const { ref, visible } = useReveal();
  const t = {
    up: "translateY(32px)",
    left: "translateX(-32px)",
    right: "translateX(32px)",
    scale: "scale(0.95)",
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : t[dir],
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ══ FLOATING INPUT FOR MODAL ══ */
function FloatInput({ label, type = "text", value, onChange, placeholder, required, textarea, rows = 3 }) {
  const [focused, setFocused] = useState(false);
  const hasVal = value.length > 0;
  const lifted = focused || hasVal;
  const base = {
    width: "100%",
    boxSizing: "border-box",
    padding: lifted ? "22px 16px 8px" : "16px 16px",
    border: `1.5px solid ${focused ? COLORS.black : "rgba(17,17,17,0.12)"}`,
    borderRadius: 14,
    fontSize: 14,
    color: COLORS.black,
    outline: "none",
    fontFamily: "inherit",
    background: focused ? "#fff" : COLORS.cream2,
    boxShadow: focused ? "0 0 0 3px rgba(17,17,17,0.08)" : "none",
    transition: "all 0.2s ease",
  };
  return (
    <div style={{ position: "relative" }}>
      <label
        style={{
          position: "absolute",
          left: 16,
          pointerEvents: "none",
          zIndex: 1,
          fontSize: lifted ? 10 : 14,
          fontWeight: lifted ? 700 : 400,
          color: focused ? COLORS.black : hasVal ? "rgba(17,17,17,0.6)" : COLORS.muted,
          textTransform: lifted ? "uppercase" : "none",
          letterSpacing: lifted ? "0.8px" : "0",
          top: lifted ? 8 : textarea ? 16 : "50%",
          transform: lifted ? "none" : textarea ? "none" : "translateY(-50%)",
          transition: "all 0.2s ease",
        }}
      >
        {label}
        {required && " *"}
      </label>
      {textarea ? (
        <textarea
          rows={rows}
          value={value}
          placeholder={focused ? placeholder : ""}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...base, resize: "vertical", minHeight: 90 }}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={focused ? placeholder : ""}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={base}
        />
      )}
    </div>
  );
}

/* ══ NATIONWIDE STATES ══ */
const STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

/* ══ CONSULTATION MODAL ══ */
function ContactModal({ isOpen, onClose, monthlyCollections, rate }) {
  const [form, setForm] = useState({ name: "", practice: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, background: "rgba(17,17,17,0.65)", backdropFilter: "blur(8px)" }}>
      <div style={{ width: "100%", maxWidth: 480, background: COLORS.cream2, borderRadius: 24, padding: "28px 24px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 18, right: 18, border: "none", background: COLORS.cream3, width: 32, height: 32, borderRadius: "50%", fontSize: 16, cursor: "pointer", color: COLORS.black }}>✕</button>
        
        {submitted ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 60, height: 60, background: COLORS.cream3, color: COLORS.black, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 16px" }}>✓</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: COLORS.black }}>Request Received!</h3>
            <p style={{ color: COLORS.muted, marginTop: 8, fontSize: 14 }}>Our billing specialist will reach out within 2 business hours for your customized proposal.</p>
            <button onClick={onClose} style={{ marginTop: 20, background: COLORS.black, color: "#fff", padding: "12px 28px", borderRadius: 100, border: "none", fontWeight: 700, cursor: "pointer" }}>Close</button>
          </div>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setError(null);
              setSubmitting(true);

              try {
                const response = await fetch("/api/pricing-inquiry", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    name: form.name,
                    practice: form.practice,
                    email: form.email,
                    phone: form.phone,
                    message: form.message,
                    revenue: `$${monthlyCollections.toLocaleString()}`,
                    volume: `${monthlyCollections.toLocaleString()} / month`,
                    plan: "Pricing Rate Lock",
                    rate,
                  }),
                });

                const result = await response.json();

                if (!response.ok || result?.success === false) {
                  throw new Error(result?.error || "Unable to submit pricing inquiry. Please try again.");
                }

                setSubmitted(true);
              } catch (err) {
                setError(err.message || "Submission failed. Please try again.");
              } finally {
                setSubmitting(false);
              }
            }}
            style={{ display: "flex", flexDirection: "column", gap: 14 }}
          >
            <div>
              <span style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, color: COLORS.black, background: COLORS.yellow, padding: "4px 10px", borderRadius: 100 }}>Estimated Rate: {rate}%</span>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: COLORS.black, marginTop: 8 }}>Get Your Free Audit</h3>
              <p style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>Monthly Collections Selected: <strong>${monthlyCollections.toLocaleString()}</strong></p>
            </div>

            <FloatInput label="Full Name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Dr. Alex Morgan" />
            <FloatInput label="Practice Name" required value={form.practice} onChange={(v) => setForm({ ...form, practice: v })} placeholder="Apex Health Clinic" />
            <FloatInput label="Work Email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="alex@clinic.com" />
            <FloatInput label="Phone Number" type="tel" required value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="(555) 000-0000" />
            <FloatInput label="Billing Challenges / Notes" textarea value={form.message} onChange={(v) => setForm({ ...form, message: v })} placeholder="High denial rate, AR backlog, software migration..." />

            {error && <div style={{ color: "#DC2626", fontSize: 13, textAlign: "center", marginTop: -4 }}>{error}</div>}

            <button type="submit" disabled={submitting} style={{ background: COLORS.black, color: "#fff", padding: "15px 20px", borderRadius: 100, border: "none", fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 6, transition: "transform 0.2s" }}>
              {submitting ? "Processing..." : "Claim Free Onboarding & Proposal →"}
            </button>
            <p style={{ textAlign: "center", fontSize: 11, color: COLORS.muted }}>🔒 100% HIPAA Compliant & Confidential</p>
          </form>
        )}
      </div>
    </div>
  );
}

/* ══ MAIN PRICING PAGE ══ */
export default function PricingPage() {
  const [mounted, setMounted] = useState(false);
  const [monthlyCollections, setMonthlyCollections] = useState(20000);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  /* Dynamic Sliding Percentage Scale (4.99% down to 1.99%) */
  const getDynamicRate = (val) => {
    if (val <= 30000) return 4.99;
    if (val <= 75000) return 4.49;
    if (val <= 150000) return 3.99;
    if (val <= 350000) return 3.49;
    if (val <= 700000) return 2.49;
    return 1.99;
  };

  const dynamicRate = getDynamicRate(monthlyCollections);

  /* Financial Logic (Matching Screenshot Scaling) */
  const annualCollections = monthlyCollections * 12;
  
  // In-House Scaled Cost Estimation
  const baseInHouseSalary = Math.round(Math.max(30000, monthlyCollections * 0.25 * 12));
  const baseInHouseOverheads = Math.round(Math.max(20000, monthlyCollections * 0.15 * 12));
  const totalInHouseCost = baseInHouseSalary + baseInHouseOverheads;

  // MedCare RCM Accurate Cost
  const annualMedCareCost = Math.round((annualCollections * dynamicRate) / 100);
  const annualSavings = totalInHouseCost - annualMedCareCost;

  return (
    <>
      <Navbar />
      <main style={{ background: COLORS.cream, overflow: "hidden" }}>

        {/* ══ HERO SECTION WITH BACKGROUND IMAGE ══ */}
        <section
          style={{
            position: "relative",
            padding: "160px 24px 100px",
            backgroundImage: "linear-gradient(135deg, rgba(17, 17, 17, 0.96) 0%, rgba(34, 34, 34, 0.92) 45%, rgba(58, 58, 58, 0.9) 100%), url('https://images.unsplash.com/photo-1651341050677-24dba59ce0fd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(245, 230, 163, 0.16)", border: "1px solid rgba(245, 230, 163, 0.3)", borderRadius: 100, padding: "6px 18px", marginBottom: 20 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.yellow }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.yellow, letterSpacing: 1.2, textTransform: "uppercase" }}>
                Pay-For-Performance · No Setup Fees
              </span>
            </div>

            <h1 style={{ fontSize: "clamp(34px, 5vw, 62px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-1.5px", marginBottom: 20 }}>
              Simple, Transparent Pricing<br />
              <span style={{ color: COLORS.yellow }}>Aligned With Your Revenue</span>
            </h1>

            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.75)", lineHeight: 1.8, maxWidth: 680, margin: "0 auto 36px" }}>
              Eliminate expensive in-house billing overhead. We charge a simple performance-based fee on collections — starting from <strong>4.99% as low as 1.99%</strong> for high-volume practices.
            </p>

            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#calculator" style={{ background: COLORS.yellow, color: COLORS.black, padding: "16px 36px", borderRadius: 100, fontWeight: 800, fontSize: 15, textDecoration: "none", boxShadow: "0 10px 25px rgba(245, 230, 163, 0.25)" }}>
                Calculate Your Savings ↓
              </a>
              <button onClick={() => setIsModalOpen(true)} style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)", padding: "16px 32px", borderRadius: 100, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                Request Proposal
              </button>
            </div>
          </div>
        </section>

        {/* ══ CALCULATOR & COMPARISON SECTION ══ */}
        <section id="calculator" style={{ padding: "90px 24px", background: COLORS.cream2 }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>

            {/* Paragraph Header */}
            <Reveal>
              <div style={{ textAlign: "center", maxWidth: 760, margin: "0 auto 48px" }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: COLORS.black, textTransform: "uppercase", letterSpacing: 2, background: COLORS.yellow, padding: "6px 12px", borderRadius: 999, display: "inline-block" }}>Interactive ROI Calculator</span>
                <h2 style={{ fontSize: "clamp(28px, 3.8vw, 44px)", fontWeight: 800, color: COLORS.black, marginTop: 12, letterSpacing: "-0.5px" }}>
                  In-House Billing vs. MedCare RCM
                </h2>
                <p style={{ fontSize: 16, color: COLORS.muted, marginTop: 12, lineHeight: 1.7 }}>
                  Most medical practices overpay significantly on internal staff salaries, billing software licenses, clearinghouse fees, and denied claim management. Adjust the calculator below to see your actual net annual savings with MedCare RCM Solutions.
                </p>
              </div>
            </Reveal>

            {/* Interactive Premium Animated Calculator Bar */}
            <Reveal delay={0.1}>
              <div style={{ background: "linear-gradient(135deg, #111111 0%, #1f1f1f 100%)", borderRadius: 24, padding: "36px 32px", color: "#fff", marginBottom: 40, boxShadow: "0 20px 40px rgba(17,17,17,0.12)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 20 }}>
                  <div>
                    <span style={{ fontSize: 12, color: COLORS.yellow, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Monthly Collections Volume</span>
                    <h3 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "#fff", marginTop: 2 }}>
                      ${monthlyCollections.toLocaleString()} <span style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>/ month</span>
                    </h3>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", padding: "10px 20px", borderRadius: 100, textAlign: "right" }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", display: "block", textTransform: "uppercase" }}>Your Billing Rate</span>
                    <strong style={{ fontSize: 20, color: COLORS.yellow, fontWeight: 800 }}>{dynamicRate}% of collections</strong>
                  </div>
                </div>

                {/* Range Slider Track */}
                <input
                  type="range"
                  min={10000}
                  max={1000000}
                  step={5000}
                  value={monthlyCollections}
                  onChange={(e) => setMonthlyCollections(Number(e.target.value))}
                  style={{
                    width: "100%",
                    height: 10,
                    borderRadius: 10,
                    accentColor: COLORS.yellow,
                    cursor: "pointer",
                    background: "rgba(255,255,255,0.2)",
                  }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>
                  <span>$10,000 (4.99%)</span>
                  <span>$150,000 (3.99%)</span>
                  <span>$350,000 (3.49%)</span>
                  <span>$1,000,000+ (1.99%)</span>
                </div>
              </div>
            </Reveal>

            {/* Comparison Grid (Screenshot Format Fixed) */}
            <div className="comparison-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 28, alignItems: "stretch" }}>

              {/* Left Column: Included Benefits */}
              <Reveal delay={0.15} dir="left">
                <div style={{ background: COLORS.cream2, padding: "36px 32px", borderRadius: 24, border: "1.5px solid rgba(17,17,17,0.08)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, color: COLORS.black, marginBottom: 24 }}>
                      Included Service Benefits
                    </h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 12px" }}>
                      {[
                        "Billing Software", "Electronic Statements",
                        "Denial Management", "Clearinghouse Services",
                        "Accounts Management", "1:1 Technical Support",
                        "Credentialing Support", "AR Follow-up"
                      ].map((item, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14.5, fontWeight: 600, color: COLORS.black }}>
                          <span style={{ color: COLORS.black, fontWeight: 900, fontSize: 16 }}>✓</span> {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginTop: 32, background: "#fff", padding: 18, borderRadius: 16, border: "1px dashed rgba(17,17,17,0.15)" }}>
                    <p style={{ fontSize: 13, color: COLORS.muted, lineHeight: 1.6, margin: 0 }}>
                      ⚡ <strong>All-Inclusive:</strong> No hidden costs for clearinghouse connections, electronic patient statements, or appeal submissions.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Right Column: Screenshot Styled Billing Comparison Table */}
              <Reveal delay={0.2} dir="right">
                <div style={{ borderRadius: 20, overflow: "hidden", border: "1.5px solid #111111", boxShadow: "0 12px 30px rgba(0,0,0,0.06)", background: "#fff" }}>

                  {/* 1. In-House Section Header */}
                  <div style={{ background: COLORS.black, color: "#fff", padding: "12px 20px", textAlign: "center", fontWeight: 800, fontSize: 13, letterSpacing: 1.2, textTransform: "uppercase" }}>
                    IN-HOUSE BILLING COSTS
                  </div>
                  <div style={{ background: COLORS.cream3, padding: "8px 16px", textAlign: "center", fontSize: 11, color: COLORS.muted, fontWeight: 500 }}>
                    *calculations based on ${monthlyCollections.toLocaleString()} in monthly collections (${annualCollections.toLocaleString()} annual)
                  </div>
                  
                  <div style={{ padding: "18px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #F1F5F9", fontSize: 14, color: "#334155" }}>
                      <span>Annual Salary (In-House Staff)</span>
                      <strong style={{ color: COLORS.black }}>${baseInHouseSalary.toLocaleString()}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #F1F5F9", fontSize: 14, color: "#334155" }}>
                      <span>Overheads & Software Fees</span>
                      <strong style={{ color: COLORS.black }}>${baseInHouseOverheads.toLocaleString()}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 4px", fontWeight: 800, fontSize: 15, color: "#DC2626" }}>
                      <span>Total In-House Cost</span>
                      <span>${totalInHouseCost.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* 2. MedCare RCM Section Header */}
                  <div style={{ background: COLORS.yellow, color: COLORS.black, padding: "12px 20px", textAlign: "center", fontWeight: 800, fontSize: 13, letterSpacing: 1.2, textTransform: "uppercase" }}>
                    MEDCARE RCM SOLUTIONS BILLING COSTS
                  </div>

                  <div style={{ padding: "18px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #F1F5F9", fontSize: 14, color: "#334155" }}>
                      <span>Billing Service Rate</span>
                      <strong style={{ color: COLORS.black, fontSize: 15 }}>{dynamicRate}% of collections</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 4px", fontWeight: 800, fontSize: 15, color: COLORS.black }}>
                      <span>Total MedCare Cost (Annual)</span>
                      <span>${annualMedCareCost.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* 3. Annual Savings Header Block */}
                  <div style={{ background: COLORS.black, color: COLORS.black, padding: "18px 20px", textAlign: "center" }}>
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 1.5, textTransform: "uppercase", color: "#fff" }}>
                      ANNUAL SAVINGS WITH MEDCARE
                    </div>
                    <div style={{ fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 900, color: "#fff", marginTop: 2, letterSpacing: "-1px" }}>
                      ${annualSavings > 0 ? annualSavings.toLocaleString() : "0"}
                    </div>
                  </div>

                </div>
              </Reveal>

            </div>

            {/* CTA under Calculator */}
            <div style={{ marginTop: 40, textAlign: "center" }}>
              <button
                onClick={() => setIsModalOpen(true)}
                style={{ background: COLORS.yellow, color: COLORS.black, padding: "16px 36px", borderRadius: 100, fontSize: 15, fontWeight: 800, border: "none", cursor: "pointer", boxShadow: "0 10px 25px rgba(17,17,17,0.15)", transition: "transform 0.2s" }}
              >
                Lock In Your Rate ({dynamicRate}%) & Request Audit →
              </button>
            </div>

          </div>
        </section>

        {/* ══ NATIONWIDE COVERAGE: USA MAP ON TOP, STATES BELOW ══ */}
        <section style={{ padding: "90px 24px", background: COLORS.cream3 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>

            <Reveal>
              <div style={{ textAlign: "center", marginBottom: 40 }}>
                <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", color: COLORS.black }}>Nationwide Reach</span>
                <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", fontWeight: 800, color: COLORS.black, marginTop: 6 }}>
                  Serving Healthcare Providers Across All 50 States
                </h2>
                <p style={{ color: COLORS.muted, maxWidth: 580, margin: "8px auto 0", fontSize: 15 }}>
                  Our 100% US-based team manages billing regulations, state Medicaid guidelines, and local payer requirements nationwide.
                </p>
              </div>
            </Reveal>

            {/* MAP IMAGE ON TOP */}
            <Reveal delay={0.1}>
              <div style={{ background: COLORS.cream2, border: "1.5px solid rgba(17,17,17,0.08)", borderRadius: 24, padding: "32px 24px", textAlign: "center", boxShadow: "0 10px 30px rgba(0,0,0,0.03)", marginBottom: 40 }}>
                <img
                  src="https://pngimg.com/uploads/usa_map/usa_map_PNG9.png"
                  alt="USA coverage map"
                  style={{ width: "100%", maxHeight: 680, objectFit: "cover", borderRadius: 20, border: "1px solid rgba(17,17,17,0.06)" }}
                />
                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: COLORS.cream2, padding: "8px 18px", borderRadius: 100, marginTop: 16 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: COLORS.black }}>📍 100% US-Based Operations & Compliance</span>
                </div>
              </div>
            </Reveal>

            {/* ALL 50 STATES GRID BELOW */}
            <Reveal delay={0.2}>
              <div style={{ background: COLORS.cream2, border: "1.5px solid rgba(17,17,17,0.08)", borderRadius: 24, padding: 28 }}>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: COLORS.black, marginBottom: 18, textAlign: "center" }}>
                  Fully Licensed & Operational in All 50 States:
                </h4>
                <div className="states-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
                  {STATES.map((state, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: COLORS.cream2,
                        border: "1px solid rgba(17,17,17,0.08)",
                        borderRadius: 8,
                        padding: "8px 12px",
                        fontSize: 12.5,
                        fontWeight: 600,
                        color: COLORS.black,
                        textAlign: "center",
                        transition: "all 0.2s ease",
                        cursor: "default"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = COLORS.black;
                        e.currentTarget.style.color = COLORS.yellow;
                        e.currentTarget.style.borderColor = COLORS.black;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = COLORS.cream2;
                        e.currentTarget.style.color = COLORS.black;
                        e.currentTarget.style.borderColor = "rgba(17,17,17,0.08)";
                      }}
                    >
                      {state}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

          </div>
        </section>

      </main>

      <Footer />

      {/* Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        monthlyCollections={monthlyCollections}
        rate={dynamicRate}
      />

      {/* Mobile Responsive Style Tweaks */}
      <style>{`
        @media (max-width: 992px) {
          .comparison-grid {
            grid-template-columns: 1fr !important;
          }
          .states-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .states-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </>
  );
}