"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

/* ── Count-up hook ── */
function useCountUp(target, duration = 1800, active = false, decimals = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const s = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - s) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(+(e * target).toFixed(decimals));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active]);
  return val;
}

/* ── Advanced scroll reveal hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Parallax scroll hook ── */
function useParallax() {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const elementTop = rect.top;
      const windowHeight = window.innerHeight;
      if (elementTop < windowHeight) {
        const distance = (windowHeight - elementTop) * 0.5;
        setOffset(distance * 0.15);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return { ref, offset };
}

function SectionLabel({ text }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
      <div style={{ width: 26, height: 2, background: "linear-gradient(90deg,#111111,#111111)", borderRadius: 2 }} />
      <p style={{ fontSize: 12, fontWeight: 700, color: "#111111", letterSpacing: "2px", textTransform: "uppercase" }}>{text}</p>
    </div>
  );
}

/* ══════════════════════════════════════
   HERO — Matches video style exactly
   Light bg + floating glass cards +
   teal accents + scrolling data ribbon
══════════════════════════════════════ */
function Hero() {
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  // typing
  const words = ["Denials", "Write-offs", "AR Days", "Rejections"];
  const [wIdx, setWIdx] = useState(0);
  const [chars, setChars] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);
  useEffect(() => { const t = setInterval(() => setTick(n => n + 1), 16); return () => clearInterval(t); }, []);

  useEffect(() => {
    const word = words[wIdx];
    let t;
    if (!del) {
      if (chars.length < word.length) t = setTimeout(() => setChars(word.slice(0, chars.length + 1)), 100);
      else t = setTimeout(() => setDel(true), 2200);
    } else {
      if (chars.length > 0) t = setTimeout(() => setChars(chars.slice(0, -1)), 55);
      else { setDel(false); setWIdx(i => (i + 1) % words.length); }
    }
    return () => clearTimeout(t);
  }, [chars, del, wIdx]);

  useEffect(() => {
    const t = setInterval(() => setActiveStep(s => (s + 1) % 4), 1400);
    return () => clearInterval(t);
  }, []);

  // Count-ups
  const [counting, setCounting] = useState(false);
  useEffect(() => { if (mounted) setTimeout(() => setCounting(true), 500); }, [mounted]);
  const c1 = useCountUp(98, 1600, counting);
  const c2 = useCountUp(9.6, 1800, counting, 1);
  const c3 = useCountUp(31.7, 1600, counting, 1);
  const c4 = useCountUp(500, 2000, counting);

  // Ribbon scroll offset
  const ribbonOffset = -(tick * 0.4) % 600;

  const rise = (d = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.65s ease ${d}s, transform 0.65s ease ${d}s`,
  });

  const claimSteps = ["Submitted", "Verified", "Processing", "Approved ✓"];

  return (
    <section style={{
      minHeight: "100vh", paddingTop: 68,
      background: "linear-gradient(160deg, #F5F0E8 0%, #ffffff 40%, #F0EBE0 100%)",
      position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column", justifyContent: "center",
    }}>

      {/* Animated gradient overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(800px at 40% 20%, rgba(17,17,17,0.03) 0%, transparent 80%)",
        animation: "gradientShift 8s ease-in-out infinite",
      }} />

      {/* Subtle mesh background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(17,17,17,0.045) 1px, transparent 1px),
          linear-gradient(90deg, rgba(17,17,17,0.045) 1px, transparent 1px)
        `,
        backgroundSize: "52px 52px",
      }} />

      {/* Large soft glow top-right with animation */}
      <div style={{ 
        position: "absolute", top: -160, right: -160, width: 700, height: 700, 
        borderRadius: "50%", 
        background: "radial-gradient(circle, rgba(17,17,17,0.07) 0%, transparent 65%)", 
        pointerEvents: "none",
        animation: "glowPulse 4s ease-in-out infinite",
      }} />
      <div style={{ 
        position: "absolute", bottom: -80, left: -80, width: 500, height: 500, 
        borderRadius: "50%", 
        background: "radial-gradient(circle, rgba(17,17,17,0.06) 0%, transparent 65%)", 
        pointerEvents: "none",
        animation: "glowPulse 5s ease-in-out 0.5s infinite",
      }} />

      {/* Animated concentric rings top-right (like video) */}
      {[280, 220, 160].map((size, i) => (
        <div key={i} style={{
          position: "absolute", top: 80, right: 80,
          width: size, height: size, borderRadius: "50%",
          border: `1px solid rgba(17,17,17,${0.12 - i * 0.03})`,
          animation: `ringExpand ${3 + i}s ease-in-out ${i * 0.4}s infinite`,
          pointerEvents: "none",
        }} />
      ))}

      {/* Scrolling HIPAA ribbon (like frame 7 of video) */}
      <div style={{ position: "absolute", bottom: 28, left: 0, right: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
        <div style={{ display: "flex", gap: 48, whiteSpace: "nowrap", transform: `translateX(${ribbonOffset}px)`, willChange: "transform" }}>
          {[...Array(3)].map((_, ri) => (
            ["HIPAA Compliant", "Secure Encryption", "First-Pass Rate 98%", "Denial Reduction 65%", "Revenue Growth 31.7%", "500+ Providers Served", "24/7 Support", "USA-Based Team"].map((txt, i) => (
              <span key={`${ri}-${i}`} style={{ fontSize: 12, fontWeight: 600, color: "rgba(17,17,17,0.45)", letterSpacing: 1.5, textTransform: "uppercase" }}>
                {txt} <span style={{ color: "rgba(17,17,17,0.2)", marginLeft: 24 }}>✦</span>
              </span>
            ))
          ))}
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "60px 32px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center", position: "relative", zIndex: 2, width: "100%" }} className="hero-grid">

        {/* ── LEFT ── */}
        <div>
          <div style={{ ...rise(0.05), display: "inline-flex", alignItems: "center", gap: 9, background: "linear-gradient(135deg,rgba(17,17,17,0.1),rgba(17,17,17,0.08))", border: "1px solid rgba(17,17,17,0.25)", borderRadius: 100, padding: "7px 18px", marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#111111", display: "inline-block", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 12, color: "#111111", fontWeight: 700, letterSpacing: 0.5 }}>HIPAA-Compliant · USA-Based RCM Experts</span>
          </div>

          <h1 style={{ ...rise(0.18), fontSize: "clamp(36px,4.5vw,58px)", fontWeight: 800, color: "#111111", lineHeight: 1.1, letterSpacing: -1.5, marginBottom: 22 }}>
            Recover More.<br />
            <span style={{ background: "#111111", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Reduce Your</span><br />
            <span style={{ color: "#111111" }}>{chars}</span>
            <span style={{ display: "inline-block", width: 3, height: "0.82em", background: "#111111", marginLeft: 3, verticalAlign: "middle", borderRadius: 2, animation: "blink 0.85s step-end infinite" }} />
          </h1>

          <p style={{ ...rise(0.32), fontSize: 17, color: "#666666", lineHeight: 1.8, marginBottom: 38, maxWidth: 470 }}>
            MedCare RCM Solutions manages your complete revenue cycle — from claim submission to final payment — so you collect every dollar you've earned.
          </p>

          <div style={{ ...rise(0.44), display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 44 }}>
            <Link href="/contact" style={{
              background: "#111111", color: "#fff",
              padding: "15px 32px", borderRadius: 12, fontSize: 15, fontWeight: 700,
              boxShadow: "0 6px 32px rgba(17,17,17,0.35)", display: "inline-block",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(17,17,17,0.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 32px rgba(17,17,17,0.35)"; }}>
              Get a Free Audit →
            </Link>
            <Link href="/services" style={{
              background: "#fff", color: "#111111", padding: "15px 30px", borderRadius: 12,
              fontSize: 15, fontWeight: 700, border: "1.5px solid rgba(17,17,17,0.2)",
              display: "inline-block", boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
            }}>
              Explore Services
            </Link>
          </div>

          {/* Stats row — like video bottom bar */}
          <div style={{ ...rise(0.56), display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0, background: "#fff", borderRadius: 16, border: "1px solid rgba(17,17,17,0.15)", boxShadow: "0 4px 28px rgba(17,17,17,0.08)", overflow: "hidden" }}>
            {[
              { val: `${c1}%`, label: "First-Pass Rate", color: "#111111" },
              { val: `${c2}%`, label: "Denial Rate", color: "#111111" },
              { val: `${c3}%`, label: "Revenue Growth", color: "#111111" },
              { val: `${c4}+`, label: "Providers", color: "#111111" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "16px 12px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(17,17,17,0.1)" : "none" }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: s.color, letterSpacing: -0.5 }}>{s.val}</div>
                <div style={{ fontSize: 10, color: "#999999", marginTop: 3, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — Floating glass cards (frame 9 style) ── */}
        <div style={{ position: "relative", height: 520, ...rise(0.25) }}>

          {/* 98% First-Pass — main big card (teal, like video) */}
          <div style={{
            position: "absolute", top: 30, left: 0, width: 240,
            background: "linear-gradient(135deg,#111111,#0B7BAB)",
            borderRadius: 20, padding: "24px 24px 28px",
            boxShadow: "0 20px 60px rgba(17,17,17,0.35)",
            animation: "floatA 5s ease-in-out infinite", zIndex: 3,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏥</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.15)", padding: "3px 10px", borderRadius: 100 }}>Live</div>
            </div>
            <div style={{ fontSize: 52, fontWeight: 900, color: "#fff", letterSpacing: -2, lineHeight: 1, marginBottom: 4 }}>{c1}%</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>First-Pass Claim Rate</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 4 }}>↑ Up from 91% last quarter</div>
          </div>

          {/* Reduced Denials card */}
          <div style={{
            position: "absolute", top: 20, right: 0, width: 210,
            background: "#fff", border: "1px solid rgba(17,17,17,0.15)",
            borderRadius: 18, padding: "20px 22px",
            boxShadow: "0 12px 40px rgba(17,17,17,0.1)",
            animation: "floatB 6s ease-in-out infinite", zIndex: 3,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#999999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Reduced Denials</div>
            <div style={{ fontSize: 38, fontWeight: 800, color: "#111111", letterSpacing: -1 }}>{c2}%</div>
            {/* Donut */}
            <svg width="80" height="80" style={{ display: "block", margin: "8px auto 0" }}>
              <circle cx="40" cy="40" r="30" fill="none" stroke="#F0F5FB" strokeWidth="8" />
              <circle cx="40" cy="40" r="30" fill="none" stroke="#111111" strokeWidth="8"
                strokeDasharray={`${(counting ? 51 : 0) * 1.88} 188`}
                strokeLinecap="round" transform="rotate(-90 40 40)"
                style={{ transition: "stroke-dasharray 1.8s ease" }} />
              <text x="40" y="45" textAnchor="middle" fontSize="13" fontWeight="800" fill="#111111">51%</text>
            </svg>
            <div style={{ fontSize: 11, color: "#111111", fontWeight: 600, textAlign: "center", marginTop: 4 }}>↓ Denial reduction</div>
          </div>

          {/* Faster Reimbursements card */}
          <div style={{
            position: "absolute", top: 230, left: "50%", transform: "translateX(-50%)", width: 260,
            background: "#fff", border: "1px solid rgba(17,17,17,0.12)",
            borderRadius: 18, padding: "20px 22px",
            boxShadow: "0 12px 40px rgba(17,17,17,0.1)",
            animation: "floatC 7s ease-in-out infinite", zIndex: 4,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#999999", textTransform: "uppercase", letterSpacing: 1 }}>Faster Reimbursements</div>
                <div style={{ fontSize: 11, color: "#111111", fontWeight: 600, marginTop: 2 }}>+1.33% this month</div>
              </div>
              <div style={{ background: "rgba(17,17,17,0.1)", borderRadius: 8, padding: "4px 8px", fontSize: 11, color: "#111111", fontWeight: 700 }}>✓</div>
            </div>
            {/* Mini line chart */}
            <svg width="100%" height="50" viewBox="0 0 220 50">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#111111" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#111111" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,40 C20,38 40,35 60,30 C80,25 100,20 120,15 C140,10 160,8 180,6 C200,4 210,3 220,2" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" style={{ strokeDasharray: 300, strokeDashoffset: counting ? 0 : 300, transition: "stroke-dashoffset 1.8s ease" }} />
              <path d="M0,40 C20,38 40,35 60,30 C80,25 100,20 120,15 C140,10 160,8 180,6 C200,4 210,3 220,2 L220,50 L0,50Z" fill="url(#lineGrad)" />
            </svg>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#111111", marginTop: 6 }}>35% Faster <span style={{ fontSize: 13, fontWeight: 500, color: "#999999" }}>avg reimbursement</span></div>
          </div>

          {/* Revenue Growth card */}
          <div style={{
            position: "absolute", bottom: 20, right: 0, width: 200,
            background: "#fff", border: "1px solid rgba(17,17,17,0.12)",
            borderRadius: 18, padding: "18px 20px",
            boxShadow: "0 12px 40px rgba(17,17,17,0.1)",
            animation: "floatD 8s ease-in-out infinite", zIndex: 3,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#999999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Revenue Growth</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: "#111111", letterSpacing: -1 }}>{c3}%</div>
            <div style={{ fontSize: 11, color: "#111111", fontWeight: 600, marginBottom: 10 }}>↑ YoY Growth</div>
            {/* Bar sparkline */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 36 }}>
              {[14, 22, 18, 28, 24, 36, 32, 40].map((h, i) => (
                <div key={i} style={{ flex: 1, height: h, background: i === 7 ? "linear-gradient(180deg,#111111,#111111)" : "rgba(17,17,17,0.15)", borderRadius: 3, transition: `height 0.3s ease ${i * 0.05}s` }} />
              ))}
            </div>
          </div>

          {/* Claim tracker card */}
          <div style={{
            position: "absolute", bottom: 30, left: 10, width: 180,
            background: "#fff", border: "1px solid rgba(17,17,17,0.15)",
            borderRadius: 16, padding: "16px 18px",
            boxShadow: "0 8px 28px rgba(17,17,17,0.1)",
            animation: "floatE 6.5s ease-in-out 0.5s infinite", zIndex: 3,
          }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#999999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Claim #48291</div>
            {claimSteps.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                  background: i < activeStep ? "#111111" : i === activeStep ? "#111111" : "#E2EBF5",
                  boxShadow: i === activeStep ? "0 0 0 3px rgba(17,17,17,0.18)" : "none",
                  animation: i === activeStep ? "pulse 1s infinite" : "none",
                  transition: "background 0.3s",
                }} />
                <span style={{ fontSize: 11, fontWeight: i <= activeStep ? 600 : 400, color: i < activeStep ? "#111111" : i === activeStep ? "#111111" : "#999999", transition: "color 0.3s" }}>{step}</span>
              </div>
            ))}
          </div>

          {/* HIPAA floating badge */}
          <div style={{
            position: "absolute", top: 160, left: "18%",
            background: "linear-gradient(135deg,#F5E6A3,#FAF7F2)",
            border: "1px solid rgba(17,17,17,0.2)", borderRadius: 12,
            padding: "10px 16px", display: "flex", alignItems: "center", gap: 10,
            boxShadow: "0 4px 20px rgba(17,17,17,0.12)",
            animation: "floatF 4.5s ease-in-out infinite", zIndex: 5,
          }}>
            <span style={{ fontSize: 18 }}>🔒</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#111111" }}>HIPAA Certified</div>
              <div style={{ fontSize: 10, color: "#999999" }}>100% Compliant</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.45;transform:scale(1.4)} }
        @keyframes ringExpand { 0%,100%{transform:scale(1);opacity:0.7} 50%{transform:scale(1.06);opacity:1} }
        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-12px) rotate(-1deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(1.5deg)} 50%{transform:translateY(-9px) rotate(1.5deg)} }
        @keyframes floatC { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(-10px)} }
        @keyframes floatD { 0%,100%{transform:translateY(0) rotate(1deg)} 50%{transform:translateY(-11px) rotate(1deg)} }
        @keyframes floatE { 0%,100%{transform:translateY(0) rotate(-1.5deg)} 50%{transform:translateY(-8px) rotate(-1.5deg)} }
        @keyframes floatF { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @media (max-width: 900px) { .hero-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

/* ── SERVICES ── */
const SERVICES = [
  { icon: "🧾", title: "Medical Billing", desc: "End-to-end billing management from charge capture to payment posting — maximizing every dollar owed.", href: "/services" },
  { icon: "📋", title: "Claims Management", desc: "Real-time claim tracking, scrubbing, and submission to ensure first-pass approval rates stay high.", href: "/services" },
  { icon: "🚫", title: "Denial Management", desc: "We identify, appeal, and resolve denied claims fast — turning write-offs into recovered revenue.", href: "/services" },
  { icon: "🪪", title: "Provider Credentialing", desc: "We handle credentialing and enrollment so your providers get paid without delays.", href: "/services" },
  { icon: "👤", title: "Patient Billing", desc: "Clear, compassionate patient statements and follow-up that improve collections and satisfaction.", href: "/services" },
  { icon: "📊", title: "Reporting & Analytics", desc: "Custom dashboards and KPI reports that give you full visibility into your revenue cycle health.", href: "/services" },
];

function Services() {
  const { ref, visible } = useReveal(0.1);
  return (
    <section ref={ref} id="services" style={{ background: "#fff", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.6s, transform 0.6s" }}>
          <SectionLabel text="What We Do" />
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#111111", letterSpacing: -1, marginBottom: 14 }}>Full-spectrum RCM services</h2>
          <p style={{ fontSize: 17, color: "#666666", maxWidth: 520, margin: "0 auto", lineHeight: 1.75 }}>Every service handled by certified billing specialists who know your specialty.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
          {SERVICES.map((s, i) => (
            <Link key={i} href={s.href} style={{
              background: "linear-gradient(160deg,#FAF7F2,#F5F0E8)",
              border: "1px solid rgba(17,17,17,0.12)", borderRadius: 18,
              padding: "28px 26px", display: "block",
              transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
              opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(36px)",
              transitionDelay: `${0.08 + i * 0.07}s`,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(17,17,17,0.13)"; e.currentTarget.style.borderColor = "#111111"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(17,17,17,0.12)"; }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111111", marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "#666666", lineHeight: 1.7 }}>{s.desc}</p>
              <div style={{ marginTop: 18, fontSize: 13, fontWeight: 600, color: "#111111" }}>Learn more →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── STATS STRIP ── */
function StatsStrip() {
  const { ref, visible } = useReveal(0.2);
  const s1 = useCountUp(98, 1600, visible);
  const s2 = useCountUp(500, 1800, visible);
  const s3 = useCountUp(50, 1600, visible);
  const s4 = useCountUp(35, 1400, visible);
  const items = [
    { val: `${s1}%`, label: "Clean Claim Rate", icon: "✅" },
    { val: `${s2}+`, label: "Providers Served", icon: "🏥" },
    { val: `$${s3}M+`, label: "Revenue Recovered", icon: "💰" },
    { val: `${s4}%`, label: "Faster Reimbursements", icon: "⚡" },
  ];
  return (
    <section ref={ref} style={{ background: "#111111", padding: "52px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
        {items.map((s, i) => (
          <div key={i} style={{ textAlign: "center", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s` }}>
            <div style={{ fontSize: 26, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", letterSpacing: -1 }}>{s.val}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── WHY US ── */
function WhyUs() {
  const { ref, visible } = useReveal(0.15);
  const points = [
    { icon: "⚡", title: "Faster reimbursements", desc: "Clean claims submitted the first time — reducing your AR days significantly." },
    { icon: "🔒", title: "HIPAA-compliant always", desc: "Every system and process meets the highest HIPAA standards." },
    { icon: "📞", title: "Dedicated account manager", desc: "One point of contact who knows your practice inside out." },
    { icon: "📈", title: "Transparent reporting", desc: "Real-time dashboards and monthly reports so you never miss a thing." },
  ];
  return (
    <section ref={ref} style={{ background: "#F0EBE0", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }} className="why-grid">
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-40px)", transition: "opacity 0.7s, transform 0.7s" }}>
          <SectionLabel text="Why MedCare" />
          <h2 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, color: "#111111", letterSpacing: -1, marginBottom: 18 }}>We treat your revenue like it's our own.</h2>
          <p style={{ fontSize: 16, color: "#666666", lineHeight: 1.8, marginBottom: 36 }}>Most billing companies just submit claims. We actively manage your entire revenue cycle — finding revenue you didn't know you were leaving on the table.</p>
          <Link href="/contact" style={{ background: "#111111", color: "#fff", padding: "14px 28px", borderRadius: 12, fontSize: 15, fontWeight: 700, display: "inline-block", boxShadow: "0 6px 24px rgba(17,17,17,0.3)" }}>
            Schedule a free consultation →
          </Link>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {points.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: "#fff", border: "1px solid rgba(17,17,17,0.12)", borderRadius: 14, padding: "18px 22px", boxShadow: "0 2px 12px rgba(17,17,17,0.05)", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(40px)", transition: `opacity 0.6s ease ${0.15 + i * 0.1}s, transform 0.6s ease ${0.15 + i * 0.1}s` }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{p.icon}</span>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: "#111111", marginBottom: 5 }}>{p.title}</h4>
                <p style={{ fontSize: 13, color: "#666666", lineHeight: 1.65 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── TESTIMONIALS ── */
const TESTIMONIALS = [
  { name: "Dr. Sarah Mitchell", role: "Family Practice, Texas", quote: "MedCare RCM cut our denial rate in half within 60 days. Collections are up and the team is incredibly responsive.", initials: "SM" },
  { name: "James Holloway", role: "Practice Manager, Florida", quote: "Switching to MedCare was the best decision we made. We finally have full visibility into our revenue cycle.", initials: "JH" },
  { name: "Dr. Priya Nair", role: "Pediatrics Group, California", quote: "Professional, knowledgeable, and always available. They feel like an in-house billing team, not a vendor.", initials: "PN" },
];

function Testimonials() {
  const { ref, visible } = useReveal(0.1);
  return (
    <section ref={ref} id="testimonials" style={{ background: "#fff", padding: "100px 24px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.6s, transform 0.6s" }}>
          <SectionLabel text="Client Stories" />
          <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, color: "#111111", letterSpacing: -1 }}>Trusted by providers nationwide</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{ background: "linear-gradient(160deg,#FAF7F2,#F5F0E8)", border: "1px solid rgba(17,17,17,0.12)", borderRadius: 18, padding: "28px 26px", boxShadow: "0 4px 20px rgba(17,17,17,0.06)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s` }}>
              <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                {[...Array(5)].map((_, j) => <span key={j} style={{ color: "#F5A623", fontSize: 16 }}>★</span>)}
              </div>
              <p style={{ fontSize: 15, color: "#666666", lineHeight: 1.75, marginBottom: 22, fontStyle: "italic" }}>"{t.quote}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "#111111", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "#fff", flexShrink: 0 }}>{t.initials}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#111111" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "#999999" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FAQ ── */
const FAQS = [
  { q: "How quickly can you onboard our practice?", a: "Most practices are fully onboarded within 5–7 business days. We assign a dedicated account manager from day one." },
  { q: "Do you work with all specialties?", a: "Yes. We support over 30 medical specialties including primary care, cardiology, orthopedics, mental health, and more." },
  { q: "How do you handle data security?", a: "We are fully HIPAA-compliant and use end-to-end encryption for all patient and billing data." },
  { q: "What does your pricing look like?", a: "We offer flexible plans based on practice size and volume. Contact us for a free custom quote." },
];

function FAQ() {
  const { ref, visible } = useReveal(0.1);
  const [open, setOpen] = useState(null);
  return (
    <section ref={ref} id="faq" style={{ background: "#F0EBE0", padding: "100px 24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: "opacity 0.6s, transform 0.6s" }}>
          <SectionLabel text="FAQ" />
          <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 800, color: "#111111", letterSpacing: -1 }}>Common questions</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid rgba(17,17,17,0.12)", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 12px rgba(17,17,17,0.04)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.5s ease ${0.1 + i * 0.08}s, transform 0.5s ease ${0.1 + i * 0.08}s` }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", textAlign: "left" }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#111111" }}>{f.q}</span>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: open === i ? "#111111" : "#F0F5FB", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: 16, transition: "background 0.25s" }}>
                  <span style={{ fontSize: 18, color: open === i ? "#fff" : "#111111", transform: open === i ? "rotate(45deg)" : "rotate(0)", display: "block", lineHeight: 1, transition: "transform 0.25s" }}>+</span>
                </div>
              </button>
              {open === i && (
                <div style={{ padding: "0 24px 20px", borderTop: "1px solid #F0F5FB" }}>
                  <p style={{ fontSize: 14, color: "#666666", lineHeight: 1.75, paddingTop: 14 }}>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CTA ── */
function CTABanner() {
  const { ref, visible } = useReveal(0.2);
  return (
    <section ref={ref} style={{ background: "linear-gradient(160deg,#F0EBE0,#F5F0E8)", padding: "100px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(17,17,17,0.09),transparent 70%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2, opacity: visible ? 1 : 0, transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
        <div style={{ fontSize: 42, marginBottom: 16 }}>🚀</div>
        <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, color: "#111111", letterSpacing: -1, marginBottom: 16 }}>Ready to recover lost revenue?</h2>
        <p style={{ fontSize: 17, color: "#666666", lineHeight: 1.7, marginBottom: 36 }}>Get a free, no-obligation audit of your current billing process. We'll show you exactly where you're losing money.</p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/contact" style={{ background: "#111111", color: "#fff", padding: "15px 32px", borderRadius: 12, fontSize: 16, fontWeight: 700, boxShadow: "0 8px 28px rgba(17,17,17,0.32)", display: "inline-block" }}>Get my free audit →</Link>
          <Link href="/pricing" style={{ background: "#fff", color: "#111111", padding: "15px 32px", borderRadius: 12, fontSize: 16, fontWeight: 700, border: "1.5px solid rgba(17,17,17,0.2)", display: "inline-block" }}>View pricing</Link>
        </div>
      </div>
    </section>
  );
}

/* ── CONTACT ── */
function Contact() {
  const { ref, visible } = useReveal(0.1);
  const [form, setForm] = useState({ name: "", email: "", practice: "", message: "" });
  const [sent, setSent] = useState(false);
  return (
    <section ref={ref} id="contact" style={{ background: "#fff", padding: "100px 24px" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel text="Get In Touch" />
          <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 800, color: "#111111", letterSpacing: -1 }}>Let's talk about your practice</h2>
        </div>
        {sent ? (
          <div style={{ background: "linear-gradient(160deg,#FAF7F2,#F5F0E8)", border: "1px solid rgba(17,17,17,0.15)", borderRadius: 20, padding: "56px", textAlign: "center" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111111", marginBottom: 10 }}>Message received!</h3>
            <p style={{ fontSize: 15, color: "#666666" }}>We'll be in touch within one business day.</p>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ background: "linear-gradient(160deg,#FAF7F2,#F5F0E8)", border: "1px solid rgba(17,17,17,0.15)", borderRadius: 20, padding: "40px", boxShadow: "0 4px 24px rgba(17,17,17,0.07)" }}>
            {[
              { key: "name", label: "Full name", type: "text", placeholder: "Dr. Jane Smith" },
              { key: "email", label: "Email address", type: "email", placeholder: "jane@clinic.com" },
              { key: "practice", label: "Practice name", type: "text", placeholder: "Smith Family Practice" },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "#111111", display: "block", marginBottom: 7 }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} required value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", border: "1.5px solid rgba(17,17,17,0.18)", borderRadius: 10, fontSize: 14, color: "#111111", outline: "none", fontFamily: "inherit", background: "#fff", transition: "border-color 0.2s" }}
                  onFocus={e => e.target.style.borderColor = "#111111"}
                  onBlur={e => e.target.style.borderColor = "rgba(17,17,17,0.18)"} />
              </div>
            ))}
            <div style={{ marginBottom: 28 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: "#111111", display: "block", marginBottom: 7 }}>Message</label>
              <textarea placeholder="Tell us about your practice and billing challenges..." rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                style={{ width: "100%", padding: "12px 16px", border: "1.5px solid rgba(17,17,17,0.18)", borderRadius: 10, fontSize: 14, color: "#111111", outline: "none", resize: "vertical", fontFamily: "inherit", background: "#fff" }}
                onFocus={e => e.target.style.borderColor = "#111111"}
                onBlur={e => e.target.style.borderColor = "rgba(17,17,17,0.18)"} />
            </div>
            <button type="submit" style={{ width: "100%", background: "#111111", color: "#fff", border: "none", padding: "15px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(17,17,17,0.3)" }}>
              Send message →
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ══ PAGE ══ */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <Services />
        <WhyUs />
        <Testimonials />
        <FAQ />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
