"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

/* ── Scroll reveal ── */
function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Reveal({ children, delay = 0, dir = "up" }) {
  const { ref, visible } = useReveal();
  const t = { up:"translateY(28px)", left:"translateX(-28px)", right:"translateX(28px)", scale:"scale(0.95)" };
  return (
    <div ref={ref} style={{ opacity:visible?1:0, transform:visible?"none":t[dir], transition:`opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`, willChange:'opacity, transform' }}>
      {children}
    </div>
  );
}

/* ── Reading progress ── */
function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      const s = el.scrollTop || document.body.scrollTop;
      const h = el.scrollHeight - el.clientHeight;
      setP(h > 0 ? (s / h) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{ position:"fixed", top:67, left:0, right:0, height:3, background:"rgba(17,17,17,0.1)", zIndex:200 }}>
      <div style={{ height:"100%", background:"#111111", width:`${p}%`, transition:"width 0.1s linear", borderRadius:"0 2px 2px 0" }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════
   RCM ANIMATED WHEEL — used by revenue-cycle-management
══════════════════════════════════════════════════ */
const RCM_STEPS = [
  { icon:"👤", label:"Patient Scheduling\n& Pre-Registration",    short:"Scheduling",     color:"#E8F4FF", desc:"Demographic and insurance capture before every visit. Accurate intake data prevents downstream billing errors and eligibility denials before they happen." },
  { icon:"✅", label:"Eligibility & Benefits\nVerification",      short:"Eligibility",    color:"#E8FFF4", desc:"Real-time coverage, copay, and deductible checks before every appointment — patients know costs upfront and claims don't bounce on eligibility." },
  { icon:"📋", label:"Prior\nAuthorization",                      short:"Prior Auth",     color:"#FFF4E8", desc:"Pre-certification and payer approval secured before services are rendered. We track every authorization number and expiration date proactively." },
  { icon:"⚡", label:"Charge\nCapture",                           short:"Charge Capture", color:"#F4E8FF", desc:"Every charge captured before the claim goes out. Daily reconciliation against clinical documentation ensures zero missed revenue." },
  { icon:"🤖", label:"AI Medical\nCoding",                        short:"Coding",         color:"#FFE8F4", desc:"AI-assisted coding verified by CPC-certified coders. ICD-10, CPT, and HCPCS codes assigned at the highest specificity supported by documentation." },
  { icon:"🔍", label:"Claim Scrubbing\n& Submission",             short:"Submission",     color:"#E8FFFD", desc:"Clean EDI 837 claims sent to the clearinghouse within 24 hours. Every claim scrubbed for errors before it reaches a single payer." },
  { icon:"💳", label:"Payment Posting\n& Reconciliation",         short:"Payment Post",   color:"#FFF8E8", desc:"ERA/835 and EOB payments posted and reconciled within 48 hours. Zero unmatched payments, complete audit trail for every dollar." },
  { icon:"🚫", label:"Denial Management\n& Appeals",              short:"Denials",        color:"#FFE8E8", desc:"Root-cause analysis stops preventable denials. Every denial appealed within 48 hours with a 70%+ first-level success rate." },
  { icon:"💰", label:"A/R Follow-Up\n& Recovery",                 short:"AR Recovery",    color:"#E8FFF0", desc:"Aging buckets prioritized to cut days in A/R. Systematic pursuit of claims beyond 60 days through payer follow-up and direct escalation." },
  { icon:"📊", label:"Reporting, Analytics\n& Revenue Integrity", short:"Analytics",      color:"#EEE8FF", desc:"Live KPI dashboards and monthly executive reports. Every metric explained in plain language with clear next steps for improvement." },
];

function RCMWheel() {
  const [active, setActive] = useState(0);
  const autoRef = useRef(null);

  useEffect(() => {
    autoRef.current = setInterval(() => setActive(a => (a + 1) % RCM_STEPS.length), 2600);
    return () => clearInterval(autoRef.current);
  }, []);

  const click = (i) => {
    clearInterval(autoRef.current);
    setActive(i);
    autoRef.current = setInterval(() => setActive(a => (a + 1) % RCM_STEPS.length), 2600);
  };

  const R = 210;
  const step = RCM_STEPS[active];

  return (
    <div style={{ maxWidth:860, margin:"0 auto" }}>
      <div className="wheel-layout" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"center" }}>

        {/* SVG wheel */}
        <div>
          <svg viewBox="0 0 540 540" style={{ width:"100%", display:"block" }}>
            {/* Dashed orbit */}
            <circle cx="270" cy="270" r={R} fill="none" stroke="rgba(17,17,17,0.1)" strokeWidth="1.5" strokeDasharray="7 5" />
            {/* Yellow progress arc */}
            <circle cx="270" cy="270" r={R} fill="none" stroke="#F5E6A3" strokeWidth="3.5" strokeLinecap="round"
              strokeDasharray={`${(active / RCM_STEPS.length) * 2 * Math.PI * R} ${2 * Math.PI * R}`}
              transform="rotate(-90 270 270)"
              style={{ transition:"stroke-dasharray 0.55s cubic-bezier(0.16,1,0.3,1)" }} />
            {/* Inner rings */}
            <circle cx="270" cy="270" r="110" fill="none" stroke="rgba(17,17,17,0.05)" strokeWidth="1" />
            <circle cx="270" cy="270" r="80"  fill="none" stroke="rgba(17,17,17,0.04)" strokeWidth="1" />

            {/* Step nodes */}
            {RCM_STEPS.map((s, i) => {
              const angle = (i / RCM_STEPS.length) * 2 * Math.PI - Math.PI / 2;
              const x = 270 + R * Math.cos(angle);
              const y = 270 + R * Math.sin(angle);
              const isA = i === active;
              return (
                <g key={i} onClick={() => click(i)} style={{ cursor:"pointer" }}>
                  {isA && <circle cx={x} cy={y} r="30" fill="rgba(245,230,163,0.22)" style={{ animation:"pulseRing 1.3s ease-out infinite" }} />}
                  <circle cx={x} cy={y} r={isA ? 23 : 18}
                    fill={isA ? "#111111" : s.color}
                    stroke={isA ? "#F5E6A3" : "rgba(17,17,17,0.12)"}
                    strokeWidth={isA ? 2.5 : 1.5}
                    style={{ transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)", filter:isA ? "drop-shadow(0 4px 14px rgba(17,17,17,0.3))" : "none" }} />
                  <text x={x} y={y+1} textAnchor="middle" dominantBaseline="middle"
                    fontSize={isA ? 15 : 12} style={{ pointerEvents:"none", userSelect:"none", transition:"font-size 0.35s" }}>
                    {s.icon}
                  </text>
                  <text x={x} y={y+(isA?34:30)} textAnchor="middle" fontSize="8" fontWeight="700"
                    fill={isA ? "#111111" : "rgba(17,17,17,0.32)"} style={{ pointerEvents:"none", userSelect:"none" }}>
                    {String(i+1).padStart(2,"0")}
                  </text>
                </g>
              );
            })}

            {/* Center */}
            <circle cx="270" cy="270" r="106" fill="#fff" stroke="rgba(17,17,17,0.08)" strokeWidth="1.5" style={{ filter:"drop-shadow(0 6px 20px rgba(17,17,17,0.08))" }} />
            <circle cx="270" cy="270" r="82" fill="#F5F0E8" />
            <text x="270" y="254" textAnchor="middle" fontSize="24" fontWeight="900" fill="#111111" style={{ fontFamily:"'Inter',sans-serif", letterSpacing:"-0.5px" }}>RCM</text>
            <text x="270" y="274" textAnchor="middle" fontSize="13" fontWeight="700" fill="#111111" style={{ fontFamily:"'Inter',sans-serif" }}>Process</text>
            <text x="270" y="292" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="rgba(17,17,17,0.35)" style={{ fontFamily:"'Inter',sans-serif" }}>Step {active+1} of {RCM_STEPS.length}</text>
            {/* Progress dots */}
            {RCM_STEPS.map((_,i) => (
              <circle key={i}
                cx={270 - (RCM_STEPS.length*5)/2 + i*5 + 2.5} cy="308"
                r={i===active?3:1.8}
                fill={i===active?"#111111":"rgba(17,17,17,0.2)"}
                onClick={() => click(i)}
                style={{ cursor:"pointer", transition:"all 0.3s" }} />
            ))}
          </svg>

          {/* Mobile pills */}
          <div className="step-pills" style={{ display:"none", flexWrap:"wrap", gap:6, justifyContent:"center", marginTop:16 }}>
            {RCM_STEPS.map((s,i) => (
              <button key={i} onClick={() => click(i)}
                style={{ display:"flex", alignItems:"center", gap:5, padding:"7px 12px", borderRadius:100, border:"none", background:i===active?"#111111":"#F5F0E8", color:i===active?"#fff":"#555555", fontSize:11.5, fontWeight:700, cursor:"pointer", fontFamily:"inherit", transition:"all 0.22s" }}>
                {s.icon} {s.short}
              </button>
            ))}
          </div>
        </div>

        {/* Active step detail */}
        <div key={active} style={{ animation:"fadeSlideUp 0.45s cubic-bezier(0.16,1,0.3,1)" }}>
          {/* Step number badge */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#F5E6A3", border:"1px solid rgba(17,17,17,0.12)", borderRadius:100, padding:"6px 16px", marginBottom:20 }}>
            <span style={{ fontSize:12, fontWeight:800, color:"#111111" }}>Step {active+1} of {RCM_STEPS.length}</span>
          </div>
          {/* Icon + title */}
          <div style={{ display:"flex", alignItems:"flex-start", gap:16, marginBottom:18 }}>
            <div style={{ width:60, height:60, borderRadius:16, background:step.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0 }}>{step.icon}</div>
            <h3 style={{ fontSize:"clamp(18px,2.5vw,24px)", fontWeight:800, color:"#111111", lineHeight:1.25, letterSpacing:-0.5 }}>
              {step.label.replace("\n"," ")}
            </h3>
          </div>
          <p style={{ fontSize:15, color:"#555555", lineHeight:1.85, marginBottom:28 }}>{step.desc}</p>

          {/* All steps mini list */}
          <div style={{ background:"#F5F0E8", borderRadius:16, padding:"16px 18px", marginBottom:20 }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#999999", textTransform:"uppercase", letterSpacing:1.5, marginBottom:12 }}>All 10 Steps</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 12px" }}>
              {RCM_STEPS.map((s,i) => (
                <button key={i} onClick={() => click(i)}
                  style={{ display:"flex", alignItems:"center", gap:7, padding:"6px 10px", borderRadius:8, border:"none", background:i===active?"#111111":"transparent", color:i===active?"#fff":"#555555", fontSize:12, fontWeight:i===active?700:400, cursor:"pointer", textAlign:"left", fontFamily:"inherit", transition:"all 0.2s" }}
                  onMouseEnter={e => { if(i!==active) e.currentTarget.style.background="rgba(17,17,17,0.06)"; }}
                  onMouseLeave={e => { if(i!==active) e.currentTarget.style.background="transparent"; }}>
                  <span style={{ fontSize:13 }}>{s.icon}</span>
                  <span style={{ fontSize:11.5, lineHeight:1.3 }}>{s.short}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Nav arrows */}
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={() => click((active-1+RCM_STEPS.length)%RCM_STEPS.length)}
              style={{ width:38, height:38, borderRadius:"50%", background:"#F5F0E8", border:"1px solid rgba(17,17,17,0.1)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700, transition:"all 0.2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.background="#111111"; e.currentTarget.style.color="#fff"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="#F5F0E8"; e.currentTarget.style.color="#111111"; }}>←</button>
            <button onClick={() => click((active+1)%RCM_STEPS.length)}
              style={{ width:38, height:38, borderRadius:"50%", background:"#111111", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:700, color:"#F5E6A3", transition:"all 0.2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.background="#333"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="#111111"; }}>→</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MEDICAL BILLING SLIDES
══════════════════════════════════════════════════ */
const MB_SLIDES = [
  {
    tag:"What is Medical Billing?",
    title:"Translating care\ninto revenue",
    body:"Medical billing converts healthcare services into standardized billing claims submitted to insurance payers for reimbursement. It's the financial engine that keeps every practice running — and when it fails, providers lose money they've already earned.",
    img:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=75&fit=crop",
    stat:"$1.1 Trillion", statLabel:"Lost annually to US billing inefficiency",
    points:["Charge capture from clinical documentation","ICD-10 and CPT code assignment","Electronic claim submission to payers","Payment reconciliation and posting"],
  },
  {
    tag:"Why Coding Accuracy Matters",
    title:"One wrong digit.\nThousands of dollars.",
    body:"ICD-10 has over 70,000 codes. CPT has 10,000+ procedure codes. The difference between a paid claim and a denied one often comes down to a single digit — wrong specificity, wrong sequence, or a missing modifier. Our CPC-certified coders assign the highest accurate code every time.",
    img:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=75&fit=crop",
    stat:"99.2%", statLabel:"MedCare coding accuracy rate",
    points:["ICD-10 coded to highest specificity","CPT codes scrubbed for modifier compliance","E&M levels reviewed against documentation","HCC coding for Medicare Advantage risk adjustment"],
  },
  {
    tag:"The Denial Problem",
    title:"65% of denials are\nnever reworked.",
    body:"The average practice has a 15–20% denial rate without expert RCM management. Most billing teams resubmit simple errors but write off complex denials — payers count on this. MedCare treats every denial as recoverable revenue until proven otherwise.",
    img:"https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500&q=75&fit=crop",
    stat:"$262B+", statLabel:"Lost to denied claims in the US annually",
    points:["Every denial worked within 24 hours","Root cause analysis by denial reason code","Targeted appeal letters with full documentation","Monthly denial trend reporting to fix upstream issues"],
  },
  {
    tag:"Technology & AI",
    title:"AI billing that\nnever misses a claim.",
    body:"Next-generation medical billing uses AI-powered claim scrubbing, denial prediction, and automated eligibility verification to push first-pass rates above 98%. MedCare combines AI tools with certified human review — the best of both worlds.",
    img:"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&q=75&fit=crop",
    stat:"98%+", statLabel:"First-pass rate with AI-assisted billing",
    points:["AI-powered claim scrubbing before submission","Denial prediction flags high-risk claims upfront","Automated real-time eligibility verification","Live KPI dashboard updated continuously"],
  },
];

const MB_STEPS = [
  { icon:"📋", num:"01", title:"Patient Registration",        desc:"Accurate demographics, insurance info, and referral data captured at intake — the foundation every clean claim is built on." },
  { icon:"✅", num:"02", title:"Insurance Eligibility Check",  desc:"Real-time verification of active coverage, copay, deductible status, and service-level coverage before the patient arrives." },
  { icon:"📋", num:"03", title:"Prior Authorization",          desc:"Payer pre-approval secured for services that require it — tracked with authorization numbers and expiration dates." },
  { icon:"⚡", num:"04", title:"Charge Capture",               desc:"Every service, procedure, supply, and modifier captured from clinical documentation before the encounter closes." },
  { icon:"🧾", num:"05", title:"Medical Coding",               desc:"ICD-10, CPT, and HCPCS codes assigned by CPC-certified coders at the highest specificity the documentation supports." },
  { icon:"🔍", num:"06", title:"Claim Scrubbing",              desc:"Automated + human review catches coding errors, eligibility mismatches, missing modifiers, and documentation gaps." },
  { icon:"📤", num:"07", title:"Electronic Claim Submission",  desc:"Clean EDI 837 claims sent to payers through a HIPAA-compliant clearinghouse within 24 hours of charge capture." },
  { icon:"💳", num:"08", title:"Payment Posting",              desc:"ERA/835 and EOB payments posted and reconciled within 48 hours — every payment matched to its original claim." },
  { icon:"🚫", num:"09", title:"Denial Management & Appeals",  desc:"Every denial reviewed, root-cause analyzed, corrected, and appealed with full documentation within 48 hours." },
  { icon:"💰", num:"10", title:"Patient Collections",          desc:"Clear itemized statements, online payment portal, and compassionate follow-up that improves patient collections by 25–30%." },
];

const MB_FACTS = [
  { icon:"💸", val:"$262B+", label:"Lost to denials yearly",       color:"#FFF0F0", desc:"65% of denied claims are never reworked. MedCare appeals every single one within 48 hours." },
  { icon:"🎯", val:"5–10%",  label:"Revenue lost without RCM",     color:"#FFF9F0", desc:"The average practice loses 5–10% of collectible revenue to billing errors and missed charges." },
  { icon:"⚡", val:"24hrs",  label:"MedCare claim turnaround",      color:"#F0FFF4", desc:"Charges submitted same-day or next-day — every day, without exception." },
  { icon:"🔄", val:"98%+",  label:"Our first-pass rate",           color:"#F0F4FF", desc:"Industry average is 75–80%. We consistently hit 98%+ for every client portfolio." },
  { icon:"📅", val:"<30d",  label:"Average AR days",               color:"#F0FFFD", desc:"Industry benchmark is 40–50 days. Our process keeps it consistently under 30." },
  { icon:"🏥", val:"40+",   label:"Specialties we bill",           color:"#F4F0FF", desc:"Every specialty gets a billing specialist who knows its specific payer rules and codes." },
];

function MedicalBillingContent() {
  const [slide, setSlide] = useState(0);
  const [activeStep, setActiveStep] = useState(null);
  const [animDir, setAnimDir] = useState("right");

  const goTo = (i) => {
    setAnimDir(i > slide ? "right" : "left");
    setSlide(i);
  };

  const s = MB_SLIDES[slide];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

      {/* ── SLIDE SECTION ── */}
      <div style={{ background:"#111111", border:"1px solid rgba(17,17,17,0.08)", borderRadius:20, overflow:"hidden", boxShadow:"0 4px 24px rgba(17,17,17,0.05)" }}>
        <div style={{ padding:"11px 26px", background:"rgba(255,255,255,0.05)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:14 }}>📚</span>
            <span style={{ fontSize:11, fontWeight:700, color:"#F5E6A3", letterSpacing:1.5, textTransform:"uppercase" }}>Medical Billing — Deep Dive</span>
          </div>
          {/* Slide dots */}
          <div style={{ display:"flex", gap:6 }}>
            {MB_SLIDES.map((_,i) => (
              <button key={i} onClick={() => goTo(i)}
                style={{ width:i===slide?22:7, height:7, borderRadius:100, border:"none", background:i===slide?"#F5E6A3":"rgba(255,255,255,0.2)", cursor:"pointer", padding:0, transition:"all 0.35s ease" }} />
            ))}
          </div>
        </div>

        <div key={slide} style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:0, animation:`slide${animDir} 0.45s cubic-bezier(0.16,1,0.3,1)` }} className="slide-inner">
          {/* Text */}
          <div style={{ padding:"32px 30px" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(245,230,163,0.15)", border:"1px solid rgba(245,230,163,0.25)", borderRadius:100, padding:"5px 14px", marginBottom:18 }}>
              <span style={{ width:5, height:5, borderRadius:"50%", background:"#F5E6A3", animation:"breathe 2s infinite" , willChange:"transform" }} />
              <span style={{ fontSize:11, fontWeight:700, color:"#F5E6A3", letterSpacing:1 }}>{s.tag}</span>
            </div>
            <h3 style={{ fontSize:"clamp(20px,2.8vw,28px)", fontWeight:800, color:"#fff", letterSpacing:-0.8, lineHeight:1.2, marginBottom:16, whiteSpace:"pre-line" }}>{s.title}</h3>
            <p style={{ fontSize:14, color:"rgba(255,255,255,0.55)", lineHeight:1.8, marginBottom:22 }}>{s.body}</p>
            {/* Stat */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:12, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:14, padding:"14px 18px", marginBottom:22 }}>
              <div>
                <div style={{ fontSize:22, fontWeight:900, color:"#F5E6A3", letterSpacing:-0.5 }}>{s.stat}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", fontWeight:600, marginTop:2 }}>{s.statLabel}</div>
              </div>
            </div>
            {/* Key points */}
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {s.points.map((pt,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:9 }}>
                  <div style={{ width:18, height:18, borderRadius:"50%", background:"#F5E6A3", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontSize:9, fontWeight:800, color:"#111111" }}>✓</span>
                  </div>
                  <span style={{ fontSize:13, color:"rgba(255,255,255,0.65)", fontWeight:500 }}>{pt}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Image */}
          <div style={{ position:"relative", minHeight:280 }}>
            <img loading="lazy" src={s.img} alt={s.tag} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right,rgba(17,17,17,0.4),transparent)" }} />
          </div>
        </div>

        {/* Slide nav */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 30px", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ display:"flex", gap:16 }}>
            {MB_SLIDES.map((sl,i) => (
              <button key={i} onClick={() => goTo(i)}
                style={{ fontSize:12, fontWeight:i===slide?700:400, color:i===slide?"#F5E6A3":"rgba(255,255,255,0.35)", background:"none", border:"none", cursor:"pointer", padding:"4px 0", fontFamily:"inherit", borderBottom:i===slide?"1.5px solid #F5E6A3":"1.5px solid transparent", transition:"all 0.2s" }}>
                {sl.tag}
              </button>
            ))}
          </div>
          <div style={{ display:"flex", gap:7 }}>
            <button onClick={() => goTo((slide-1+MB_SLIDES.length)%MB_SLIDES.length)}
              style={{ width:32, height:32, borderRadius:"50%", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", cursor:"pointer", color:"#fff", fontSize:14, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.15)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.08)"}>←</button>
            <button onClick={() => goTo((slide+1)%MB_SLIDES.length)}
              style={{ width:32, height:32, borderRadius:"50%", background:"#F5E6A3", border:"none", cursor:"pointer", color:"#111111", fontSize:14, fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s" }}>→</button>
          </div>
        </div>
      </div>

      {/* ── 10 STEPS — clickable cards ── */}
      <div style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:20, overflow:"hidden", boxShadow:"0 4px 24px rgba(17,17,17,0.05)" }}>
        <div style={{ padding:"11px 26px", background:"#111111", display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:14 }}>⚙️</span>
          <span style={{ fontSize:11, fontWeight:700, color:"#F5E6A3", letterSpacing:1.5, textTransform:"uppercase" }}>10 Steps of Medical Billing — Click to Expand</span>
        </div>
        <div style={{ padding:"16px" }}>
          <div className="steps-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {MB_STEPS.map((step, i) => {
              const isOpen = activeStep === i;
              return (
                <div key={i}
                  onClick={() => setActiveStep(isOpen ? null : i)}
                  style={{
                    background: isOpen ? "#111111" : "#F5F0E8",
                    border:`1.5px solid ${isOpen ? "#111111" : "rgba(17,17,17,0.08)"}`,
                    borderRadius:14, padding:"16px 18px", cursor:"pointer",
                    transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={e => { if(!isOpen) e.currentTarget.style.borderColor="#111111"; }}
                  onMouseLeave={e => { if(!isOpen) e.currentTarget.style.borderColor="rgba(17,17,17,0.08)"; }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom: isOpen ? 12 : 0 }}>
                    <div style={{ width:36, height:36, borderRadius:10, background:isOpen?"#F5E6A3":"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0, transition:"background 0.3s" }}>{step.icon}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:10, fontWeight:800, color:isOpen?"rgba(255,255,255,0.4)":"rgba(17,17,17,0.35)", letterSpacing:1.2, textTransform:"uppercase" }}>Step {step.num}</div>
                      <div style={{ fontSize:13.5, fontWeight:700, color:isOpen?"#fff":"#111111", lineHeight:1.3, transition:"color 0.3s" }}>{step.title}</div>
                    </div>
                    <div style={{ width:24, height:24, borderRadius:"50%", background:isOpen?"rgba(255,255,255,0.1)":"rgba(17,17,17,0.06)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:14, color:isOpen?"#F5E6A3":"#555555", transform:isOpen?"rotate(45deg)":"rotate(0)", transition:"all 0.3s" }}>+</div>
                  </div>
                  {isOpen && (
                    <p style={{ fontSize:13.5, color:"rgba(255,255,255,0.65)", lineHeight:1.7, marginTop:4, paddingLeft:46, animation:"fadeSlideUp 0.3s ease" }}>
                      {step.desc}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── FACTS GRID ── */}
      <div style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:20, overflow:"hidden", boxShadow:"0 4px 24px rgba(17,17,17,0.05)" }}>
        <div style={{ padding:"11px 26px", background:"#111111", display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:14 }}>📊</span>
          <span style={{ fontSize:11, fontWeight:700, color:"#F5E6A3", letterSpacing:1.5, textTransform:"uppercase" }}>Medical Billing — Industry Facts</span>
        </div>
        <div style={{ padding:"22px" }}>
          <div className="facts-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
            {MB_FACTS.map((f,i) => (
              <div key={i}
                style={{ background:f.color, borderRadius:14, padding:"18px 16px", border:"1px solid rgba(17,17,17,0.06)", transition:"all 0.25s ease", cursor:"default" }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 12px 28px rgba(17,17,17,0.09)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
                <div style={{ fontSize:24, marginBottom:10 }}>{f.icon}</div>
                <div style={{ fontSize:26, fontWeight:900, color:"#111111", letterSpacing:-0.8, marginBottom:4 }}>{f.val}</div>
                <div style={{ fontSize:12, fontWeight:700, color:"#333333", marginBottom:8 }}>{f.label}</div>
                <p style={{ fontSize:12, color:"#666666", lineHeight:1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ALL 12 SERVICES DATA
══════════════════════════════════════════════════ */
const SERVICES = {

  "medical-billing": {
    title:"Medical Billing Services",
    subtitle:"Comprehensive billing solutions for every healthcare practice",
    emoji:"🧾",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=75&fit=crop",
    overview:"Medical billing is the backbone of every healthcare practice's financial health. A single coding error, a missed modifier, or a late claim submission can mean thousands of dollars in lost or delayed revenue. MedCare RCM Solutions provides a fully managed medical billing service that handles every step — from charge entry and coding review to claim scrubbing, electronic submission, payment posting, and patient statement generation — with certified billing specialists who understand the unique requirements of your specialty and your payers.",
    keyPoints:[
      "Complete charge entry review and coding audit before every submission",
      "Electronic claim scrubbing with 98%+ first-pass acceptance rates",
      "Real-time insurance eligibility verification before every patient visit",
      "Same-day or next-day claim submission for all services rendered",
      "Payment posting and reconciliation against remittance advices",
      "Patient statement generation and follow-up collections support",
      "Payer contract compliance monitoring and fee schedule audits",
      "Dedicated billing specialist assigned to your practice",
    ],
    cptCodes:[
      { code:"99213 / 99214", description:"Established patient outpatient E&M — Level 3 & 4", reimbursement:"$110–$180" },
      { code:"99204 / 99205", description:"New patient comprehensive evaluation and management", reimbursement:"$175–$260" },
      { code:"99391–99397",   description:"Preventive medicine evaluations by patient age tier",  reimbursement:"$160–$250" },
      { code:"99490",         description:"Chronic Care Management — minimum 20 mins/month",      reimbursement:"$62–$105" },
      { code:"G0439",         description:"Subsequent Annual Wellness Visit (Medicare AWV)",       reimbursement:"$115–$175" },
      { code:"99441–99443",   description:"Telephone E&M services — varying time tiers",          reimbursement:"$30–$80"  },
    ],
    howWeServe:"Our medical billing process starts the moment your clinical staff closes an encounter. Charges are entered, reviewed against documentation, and scrubbed for coding accuracy before submission. Every claim goes out electronically within 24 hours. Denials are worked within 48 hours with targeted appeals. You receive a live KPI dashboard updated daily and a full performance report every month. Most practices see measurable collection improvements within the first 60 days.",
    stats:[
      { val:"98%+",    label:"First-pass rate" },
      { val:"<30",     label:"Average AR days" },
      { val:"60 days", label:"To see results" },
      { val:"24h",     label:"Claim submission" },
    ],
    hasMedicalBillingContent: true,
    relatedServices:["physician-billing","denial-management","reporting-analytics"],
  },

  "revenue-cycle-management": {
    title:"Revenue Cycle Management",
    subtitle:"Full-spectrum RCM that maximizes revenue at every stage",
    emoji:"💰",
    image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=75&fit=crop",
    overview:"Revenue cycle management is the complete financial process of a healthcare practice — from the moment a patient schedules an appointment to the moment the final payment is collected. Every step in this cycle is an opportunity for revenue to be gained or lost. MedCare RCM Solutions manages the entire revenue cycle as an integrated system — not as disconnected billing tasks — ensuring that every workflow feeds into the next with precision, speed, and complete transparency.",
    keyPoints:[
      "End-to-end revenue cycle oversight from scheduling to final payment",
      "Pre-visit eligibility verification and patient financial counseling",
      "Charge capture auditing to prevent missed or under-coded services",
      "Claim scrubbing, submission, and real-time tracking across all payers",
      "Denial management with root cause analysis and upstream process fixes",
      "Patient billing with online payment portal and payment plan management",
      "AR recovery for aging claims beyond 60 days",
      "Monthly KPI reporting with actionable revenue improvement recommendations",
    ],
    cptCodes:[
      { code:"Days in AR",          description:"Target: under 30 days — measures speed of collections",      reimbursement:"Leading KPI" },
      { code:"First-Pass Rate",     description:"Target: 98%+ — percentage of claims paid without correction", reimbursement:"Quality KPI" },
      { code:"Denial Rate",         description:"Target: under 5% — percentage of claims denied by payers",   reimbursement:"Risk KPI"    },
      { code:"Net Collection Rate", description:"Target: 95–98% — collectible revenue actually collected",    reimbursement:"Revenue KPI" },
      { code:"Charge Lag",          description:"Target: under 2 days — time from service to charge entry",   reimbursement:"Speed KPI"   },
      { code:"Cost to Collect",     description:"Target: under 5% — our fee as a share of collections",      reimbursement:"Efficiency KPI" },
    ],
    howWeServe:"MedCare RCM assigns a dedicated account manager to every client — your single point of contact for the entire revenue cycle. We begin with a comprehensive billing audit identifying gaps in charge capture, denial patterns, AR aging issues, and coding opportunities. Within 7 days your practice is fully onboarded with zero disruption. Every week your account manager monitors your KPIs. Every month you receive a full executive report in plain language — no jargon, just clear data and clear next steps.",
    stats:[
      { val:"98%+",   label:"First-pass rate" },
      { val:"$50M+",  label:"Revenue recovered" },
      { val:"500+",   label:"Providers served"  },
      { val:"7 days", label:"Avg onboarding"    },
    ],
    hasRCMWheel: true,
    relatedServices:["medical-billing","denial-management","reporting-analytics"],
  },

  "hospital-billing": {
    title:"Hospital Billing Services",
    subtitle:"Full-cycle institutional billing for hospitals of all sizes",
    emoji:"🏥",
    image:"https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&q=75&fit=crop",
    overview:"Hospital billing is one of the most complex and high-stakes areas of healthcare revenue cycle management. Multi-departmental claim processing, inpatient DRG bundling, outpatient facility coding, and strict payer-specific compliance requirements all create significant opportunities for revenue leakage. MedCare RCM Solutions manages the complete hospital billing lifecycle — from charge capture to final payment posting — ensuring your institution collects every dollar it has earned.",
    keyPoints:["Inpatient DRG bundling and optimization across all payer types","Outpatient facility coding aligned with payer-specific LCD requirements","Multi-departmental charge capture reconciliation and audit","Medicare, Medicaid, and commercial payer billing compliance","Real-time claim status tracking and follow-up workflows"],
    cptCodes:[
      { code:"DRG-based",     description:"Inpatient hospital payment classifications",                       reimbursement:"Varies by case weight" },
      { code:"Revenue Codes", description:"Facility service-specific billing codes (e.g., 0450 ER, 0360 OR)", reimbursement:"Per facility schedule" },
      { code:"APC Groups",    description:"Outpatient prospective payment system codes",                      reimbursement:"Medicare APC rates" },
      { code:"UB-04",         description:"Institutional claim form for all hospital billing",                reimbursement:"All payer types" },
    ],
    howWeServe:"Our hospital billing team begins with a complete charge capture audit — identifying missing charges, miscoded services, and documentation gaps before a single claim is submitted. We manage the full claim lifecycle: scrubbing, electronic submission, payer follow-up, denial appeals, and payment posting.",
    stats:[{ val:"98%+", label:"First-pass rate" },{ val:"<30", label:"Average AR days" },{ val:"65%", label:"Denial reduction" },{ val:"24h", label:"Claim submission" }],
    relatedServices:["physician-billing","ar-recovery","reporting-analytics"],
  },

  "physician-billing": {
    title:"Physician Billing Services",
    subtitle:"Built for private practices and multi-specialty physician groups",
    emoji:"👨‍⚕️",
    image:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&q=75&fit=crop",
    overview:"Physician billing requires mastery of E&M coding, modifier compliance, and the specific rules of each payer in your network. Independent practices and multi-specialty groups face constant pressure to maximize reimbursements while staying compliant with ever-changing billing regulations. MedCare RCM Solutions provides end-to-end physician billing management that keeps your clean claim rate above 98% and your AR days consistently under 30.",
    keyPoints:["E&M level determination and documentation support for accurate coding","Modifier compliance — Modifier 25, 57, 59, and specialty-specific modifiers","High-volume outpatient claim submission with same-day processing","Preventive medicine and annual wellness visit billing optimization","Real-time insurance eligibility verification before every appointment"],
    cptCodes:[
      { code:"99213 / 99214", description:"Established patient outpatient E&M — Level 3 & 4",      reimbursement:"$110–$180" },
      { code:"99204 / 99205", description:"New patient comprehensive evaluation and management",      reimbursement:"$175–$260" },
      { code:"99391–99397",   description:"Preventive medicine evaluations by patient age tier",      reimbursement:"$160–$250" },
      { code:"99490",         description:"Chronic Care Management — minimum 20 mins/month",         reimbursement:"$62–$105"  },
      { code:"G0439",         description:"Subsequent Annual Wellness Visit (Medicare AWV)",          reimbursement:"$115–$175" },
    ],
    howWeServe:"We assign a dedicated billing specialist to your practice who learns your patient population, top payers, and most-billed CPT codes. Every charge entered by your clinical team is reviewed for coding accuracy before submission. Our pre-submission scrubbing catches eligibility issues, missing modifiers, and documentation gaps — preventing denials before they happen.",
    stats:[{ val:"98%+", label:"First-pass rate" },{ val:"<30", label:"Average AR days" },{ val:"40%", label:"Admin time saved" },{ val:"24h", label:"Claim submission" }],
    relatedServices:["medical-billing","denial-management","credentialing"],
  },

  "laboratory-billing": {
    title:"Laboratory Billing Services",
    subtitle:"Precise billing for molecular, pathology, and toxicology labs",
    emoji:"🧪",
    image:"https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=700&q=75&fit=crop",
    overview:"Laboratory billing is among the most technically demanding specialties in medical billing. Complex multi-analyte test panels, strict prior authorization requirements, reference lab split-billing arrangements, and evolving PAMA reimbursement rules create significant compliance and revenue risk. MedCare RCM Solutions has deep expertise in molecular, pathology, and toxicology billing — ensuring every specimen and every panel is billed correctly and reimbursed in full.",
    keyPoints:["Multi-analyte molecular panel billing with correct CPT stacking rules","Prior authorization tracking and management for high-cost tests","Reference lab split-billing model compliance and administration","PAMA clinical lab fee schedule compliance and monitoring","Toxicology definitive and presumptive testing billing accuracy"],
    cptCodes:[
      { code:"80305–80307", description:"Drug test presumptive, any number of drug classes",     reimbursement:"$20–$125"       },
      { code:"G0483",       description:"Drug test definitive — 22 or more classes of drugs",    reimbursement:"$400–$750"      },
      { code:"88305",       description:"Surgical pathology — Level IV (most tissue specimens)", reimbursement:"$75–$120"       },
      { code:"81479",       description:"Unlisted molecular pathology procedure",                reimbursement:"Per payer policy"},
      { code:"87635",       description:"Infectious agent detection — COVID-19",                 reimbursement:"$35–$75"        },
    ],
    howWeServe:"Our laboratory billing specialists understand the nuances of PAMA pricing, NCD coverage requirements, and the complex rules governing when panels can be billed versus individual analytes. We manage prior authorization submissions and track approvals to prevent retroactive denials on high-cost molecular tests.",
    stats:[{ val:"98%+", label:"First-pass rate" },{ val:"100%", label:"PAMA compliance" },{ val:"<28", label:"Average AR days" },{ val:"60%+", label:"Denial reduction" }],
    relatedServices:["imaging-billing","denial-management","reporting-analytics"],
  },

  "imaging-billing": {
    title:"Imaging Center Billing Services",
    subtitle:"Technical and professional component billing for diagnostic imaging",
    emoji:"📸",
    image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=75&fit=crop",
    overview:"Diagnostic imaging billing requires precise separation of professional and technical billing components, active defense against automated payer downcoding, and deep knowledge of Local Coverage Determinations for each imaging modality. MedCare RCM Solutions manages high-volume imaging pipelines — from X-ray to PET/CT — ensuring every study is coded at the correct level and every interpretation is reimbursed in full.",
    keyPoints:["Modifier 26 (professional component) and TC (technical component) billing splits","High-volume MRI, CT, X-ray, ultrasound, and nuclear medicine billing","Automated payer downcoding detection and appeal filing","LCD compliance review for all imaging orders before submission","Radiologist dictation-to-claim alignment audits"],
    cptCodes:[
      { code:"70553", description:"MRI brain — without and with contrast (complete)", reimbursement:"$380–$560"   },
      { code:"74177", description:"CT abdomen and pelvis — with contrast",            reimbursement:"$280–$420"   },
      { code:"76817", description:"Ultrasound transvaginal (complete)",               reimbursement:"$140–$210"   },
      { code:"71046", description:"X-ray chest — 2 views",                            reimbursement:"$45–$80"     },
      { code:"78816", description:"PET/CT — skull base to mid-thigh",                 reimbursement:"$1,400–$2,200"},
    ],
    howWeServe:"We automate professional vs. technical component splits based on site-of-service conditions, preventing billing duplications and hospital crossovers. Any payer that downcodes a high-complexity scan receives a pre-built appeal backed by clinical documentation — protecting your reimbursement rates consistently.",
    stats:[{ val:"98%+", label:"First-pass rate" },{ val:"100%", label:"Component accuracy" },{ val:"<25", label:"Average AR days" },{ val:"0%", label:"Downcoding loss" }],
    relatedServices:["laboratory-billing","denial-management","reporting-analytics"],
  },

  "ar-recovery": {
    title:"Accounts Receivable (A/R) Recovery",
    subtitle:"We recover the revenue your practice has already earned",
    emoji:"💵",
    image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=75&fit=crop",
    overview:"Aging accounts receivable is one of the most damaging — and most overlooked — problems in medical practice finance. Claims that sit unpaid beyond 60 days rapidly lose their likelihood of collection. MedCare RCM Solutions deploys a systematic, aggressive A/R recovery process that targets aging claims with focused denial analysis, targeted appeals, and direct payer negotiation — unlocking frozen revenue that most practices have mentally written off.",
    keyPoints:["Systematic pursuit of all claims aging beyond the 60-day threshold","Denial pattern analysis to identify root causes and prevent recurrence","Targeted appeal filing with complete clinical and coding documentation","Direct payer escalation and negotiation for large outstanding balances","Monthly A/R aging report with recovery rate tracking by payer"],
    cptCodes:[
      { code:"CO-4",  description:"Modifier inconsistency — corrected modifier applied and resubmitted", reimbursement:"Fully recoverable" },
      { code:"CO-22", description:"Coordination of benefits — verify primary/secondary coverage",         reimbursement:"Fully recoverable" },
      { code:"CO-97", description:"Payment included in another service — unbundle and appeal",           reimbursement:"Fully recoverable" },
      { code:"CO-16", description:"Claim lacks information — identify missing field and correct",        reimbursement:"Fully recoverable" },
      { code:"PR-1",  description:"Deductible amount — pursue patient responsibility collection",        reimbursement:"Patient portion"   },
    ],
    howWeServe:"Our A/R recovery team begins with a complete aging analysis — segmenting your outstanding claims by age bucket, payer, and denial reason code. We prioritize high-value claims in the 60–120 day range where recovery likelihood is still high. Most clients see measurable A/R reduction within the first 30 days.",
    stats:[{ val:"70%+", label:"Appeal success rate" },{ val:"30 days", label:"First recovery" },{ val:"$50M+", label:"Total recovered" },{ val:"100%", label:"Claims worked" }],
    relatedServices:["denial-management","reporting-analytics","hospital-billing"],
  },

  "credentialing": {
    title:"Provider Credentialing Services",
    subtitle:"Get your providers enrolled and billing — fast",
    emoji:"🪪",
    image:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=75&fit=crop",
    overview:"Every day a provider is not credentialed is revenue your practice will never recover. Credentialing delays are one of the most expensive and preventable problems in healthcare administration — a new physician unable to bill costs your practice $10,000–$30,000 per month in lost revenue. MedCare RCM Solutions manages the entire credentialing and payer enrollment process from initial application through approval.",
    keyPoints:["CAQH profile creation, completion, and ongoing re-attestation every 120 days","Medicare and Medicaid enrollment — Part B, Managed Medicaid, and CHIP","Commercial payer panel applications across all major carriers","Hospital and facility privilege coordination alongside payer enrollment","Credentialing expiration tracking and proactive renewal management"],
    cptCodes:[
      { code:"CAQH",        description:"Universal credentialing data source — required by most payers",     reimbursement:"Enables billing"       },
      { code:"855I / 855B", description:"Medicare enrollment applications for individual and group providers", reimbursement:"Medicare billing access" },
      { code:"NPI Type 1",  description:"Individual provider National Provider Identifier",                   reimbursement:"Required for all claims" },
      { code:"NPI Type 2",  description:"Organizational NPI for group practices and facilities",              reimbursement:"Required for group billing"},
      { code:"PECOS",       description:"Medicare Provider Enrollment, Chain and Ownership System",           reimbursement:"Medicare enrollment"      },
    ],
    howWeServe:"We assign a dedicated credentialing coordinator to every provider engagement. They handle CAQH profile setup and completion, gather all required documentation, and submit applications to every payer simultaneously. We follow up with payers every two weeks — documenting every contact, tracking status, and escalating delays proactively.",
    stats:[{ val:"7 days", label:"Avg onboarding start" },{ val:"90–120", label:"Days to approval" },{ val:"0", label:"Credentialing lapses" },{ val:"30+", label:"Payer relationships" }],
    relatedServices:["physician-billing","hospital-billing","asc-billing"],
  },

  "asc-billing": {
    title:"Ambulatory Surgery Center Billing",
    subtitle:"Specialized billing for ambulatory surgery centers",
    emoji:"🏨",
    image:"https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=700&q=75&fit=crop",
    overview:"Ambulatory surgery center billing operates under a completely different set of rules than physician office or hospital billing. ASC-specific fee schedules, device-intensive procedure groupings, facility modifier requirements, and multi-procedural discounting rules create a billing environment that demands specialized expertise. MedCare RCM Solutions has built dedicated ASC billing workflows that keep your facility profitable, compliant, and collecting on every procedure performed.",
    keyPoints:["ASC facility fee billing under Medicare's Ambulatory Payment Classification system","Device-intensive procedure group identification and proper billing structure","Multi-procedural discounting compliance to prevent over-collection audits","Implant and supply cost reporting with proper invoice documentation","Modifier SG application and facility-specific claim form compliance"],
    cptCodes:[
      { code:"45378",       description:"Diagnostic colonoscopy — proximal to splenic flexure",     reimbursement:"$320–$490"   },
      { code:"29881",       description:"Knee arthroscopy with meniscectomy and debridement",       reimbursement:"$1,400–$2,200"},
      { code:"66984",       description:"Extracapsular cataract extraction with IOL placement",     reimbursement:"$800–$1,400" },
      { code:"G0260",       description:"Injection procedure for sacroiliac joint — ASC facility", reimbursement:"$350–$600"   },
      { code:"Modifier SG", description:"ASC facility service — mandatory on all ASC claims",       reimbursement:"Enables ASC payment"},
    ],
    howWeServe:"Our ASC billing team verifies every procedure against the payer's ASC-approved list and confirms prior authorization before submission. We handle the facility claim separately from physician professional claims, ensuring correct payment for both components. Implant invoices are matched to claim submissions automatically.",
    stats:[{ val:"98%+", label:"First-pass rate" },{ val:"100%", label:"Implant cost capture" },{ val:"<28", label:"Average AR days" },{ val:"0", label:"SG modifier errors" }],
    relatedServices:["hospital-billing","denial-management","credentialing"],
  },

  "denial-management": {
    title:"Denial Management Services",
    subtitle:"Turn denied claims into recovered revenue — systematically",
    emoji:"🚫",
    image:"https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=75&fit=crop",
    overview:"Denied claims are the single largest source of preventable revenue loss in medical practices. Most billing companies resubmit obvious errors but write off complex denials — payers count on this. MedCare RCM Solutions treats every denial as recoverable revenue until proven otherwise. We analyze the root cause, correct the underlying issue, file a targeted appeal with full documentation, and track the outcome — all within 48 hours of the denial posting.",
    keyPoints:["Every denial reviewed and worked within 24 hours of receipt","Root cause analysis by denial reason code to identify systemic issues","Targeted appeal letters with clinical documentation and coding rationale","Payer-specific appeal strategies built from historical outcome data","Monthly denial trend reporting to drive upstream process improvements"],
    cptCodes:[
      { code:"CO-4",   description:"Modifier inconsistency — corrected modifier applied and resubmitted", reimbursement:"Fully recoverable"  },
      { code:"CO-11",  description:"Diagnosis inconsistent with procedure — documentation corrected",      reimbursement:"Fully recoverable"  },
      { code:"CO-29",  description:"Timely filing denial — appeal with proof of timely submission",        reimbursement:"Often recoverable"  },
      { code:"CO-50",  description:"Non-covered service — appeal with medical necessity documentation",    reimbursement:"Partially recoverable"},
      { code:"CO-197", description:"Precertification absent — retroactive auth requested if applicable",   reimbursement:"Case-by-case"       },
    ],
    howWeServe:"We build a denial dashboard for every client showing denial rate by payer, by reason code, and by provider — updated weekly. Our 70%+ first-level appeal success rate comes from writing appeals that argue the claim specifically, not generically — backed by the right documentation every time.",
    stats:[{ val:"70%+", label:"Appeal success rate" },{ val:"48h", label:"Appeal turnaround" },{ val:"65%", label:"Denial rate reduction" },{ val:"100%", label:"Claims worked" }],
    relatedServices:["ar-recovery","reporting-analytics","physician-billing"],
  },

  "patient-billing": {
    title:"Patient Billing Services",
    subtitle:"Clear statements that improve collections without damaging trust",
    emoji:"👤",
    image:"https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=700&q=75&fit=crop",
    overview:"Patient financial responsibility now accounts for 30–35% of practice revenue. Collecting it effectively without damaging the patient relationship is one of the hardest challenges in practice management. MedCare RCM Solutions manages the entire patient billing process with clear, compassionate communication and multiple convenient payment options that get balances paid without creating patient dissatisfaction.",
    keyPoints:["Patient statements generated and mailed within 5 days of claim adjudication","Online patient payment portal with 24/7 access and multiple payment methods","Proactive payment plan offers for balances over $200 before collections","Compassionate follow-up call and email sequences","HSA, FSA, credit card, debit card, and ACH payment acceptance"],
    cptCodes:[
      { code:"Copay Collection",    description:"Point-of-service copay collection protocols at check-in",    reimbursement:"Immediate"     },
      { code:"Deductible Tracking", description:"Real-time deductible status integrated into patient estimates", reimbursement:"Patient portion"},
      { code:"Coinsurance Billing", description:"Post-adjudication patient responsibility statements",          reimbursement:"After payer"   },
      { code:"Self-Pay Accounts",   description:"Uninsured patient billing with discounted self-pay rates",     reimbursement:"Case-by-case"  },
      { code:"Payment Plans",       description:"Structured installment plans for balances over threshold",     reimbursement:"Monthly"       },
    ],
    howWeServe:"We send your patients itemized, easy-to-read statements that explain exactly what their insurance paid and what they owe. Our follow-up sequence includes a second statement, an email reminder, and a courtesy phone call — all scripted to be informative and helpful, never threatening. Practices using our patient billing service average a 20–30% improvement in patient collections within the first 90 days.",
    stats:[{ val:"85%+", label:"Patient collection rate" },{ val:"5 days", label:"Statement turnaround" },{ val:"30%", label:"Collections increase" },{ val:"24/7", label:"Patient portal" }],
    relatedServices:["physician-billing","reporting-analytics","denial-management"],
  },

  "reporting-analytics": {
    title:"Reporting & Analytics Services",
    subtitle:"Real-time visibility into every corner of your revenue cycle",
    emoji:"📊",
    image:"https://images.unsplash.com/photo-1543286386-713bdd548da4?w=700&q=75&fit=crop",
    overview:"You cannot improve what you cannot measure. Most practices receive a monthly collections summary — a single number that tells them nothing about why their revenue cycle is performing the way it is. MedCare RCM Solutions delivers a live, comprehensive KPI dashboard and monthly executive reporting package that gives your leadership team complete visibility into every metric that drives your financial performance — updated in real time, explained in plain language.",
    keyPoints:["Live KPI dashboard with real-time updates — accessible 24/7 from any device","Monthly executive report with plain-language analysis and recommendations","Payer performance benchmarking — identify your slowest payers","AR aging analysis segmented by payer, age bucket, provider, and service line","Custom reports by location, specialty, procedure code, or referring provider"],
    cptCodes:[
      { code:"Days in AR",          description:"Target: under 30 days. Measures average time from service to payment.",  reimbursement:"Leading indicator" },
      { code:"First-Pass Rate",     description:"Target: 98%+. Percentage of claims paid without correction.",            reimbursement:"Quality metric"    },
      { code:"Denial Rate",         description:"Target: under 5%. Percentage of submitted claims denied.",               reimbursement:"Risk metric"       },
      { code:"Net Collection Rate", description:"Target: 95–98%. Collectible revenue actually collected.",                reimbursement:"Revenue metric"    },
      { code:"Charge Lag",          description:"Target: under 2 days. Time from service to charge entry.",               reimbursement:"Speed metric"      },
    ],
    howWeServe:"Every MedCare RCM client receives access to a live dashboard from day one. On the first business day of every month, you receive a full written executive report explaining performance trends, identifying areas of concern, and outlining the specific actions our team is taking to address them.",
    stats:[{ val:"Real-Time", label:"Dashboard updates" },{ val:"Monthly", label:"Executive reports" },{ val:"50+", label:"KPIs tracked" },{ val:"100%", label:"Data transparency" }],
    relatedServices:["denial-management","ar-recovery","physician-billing"],
  },
};

/* ══ SHARED PAGE LAYOUT ══ */
export default function ServiceDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const data = SERVICES[slug];
  const [imgLoaded, setImgLoaded] = useState(false);
  const [mounted,   setMounted]   = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  if (!data) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight:"80vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#F5F0E8", padding:"120px 24px" }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:64, marginBottom:16 }}>📋</div>
            <h1 style={{ fontSize:28, fontWeight:700, color:"#111111", marginBottom:12 }}>Service not found</h1>
            <p style={{ fontSize:16, color:"#666666", marginBottom:32 }}>This service page doesn't exist or may have been moved.</p>
            <button onClick={()=>router.push("/services")} style={{ background:"#111111", color:"#fff", border:"none", padding:"13px 28px", borderRadius:100, fontSize:15, fontWeight:700, cursor:"pointer" }}>
              ← Back to Services
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const relatedData = (data.relatedServices||[]).map(k => SERVICES[k] ? { slug:k, ...SERVICES[k] } : null).filter(Boolean);

  const rise = (d=0) => ({
    opacity: mounted?1:0,
    transform: mounted?"translateY(0)":"translateY(24px)",
    transition:`opacity 0.7s ease ${d}s, transform 0.7s ease ${d}s`,
  });

  return (
    <>
      <Navbar />
      <ReadingProgress />
      <main>

        {/* ── HERO ── */}
        <section style={{ paddingTop:68, position:"relative", height:440, overflow:"hidden" }}>
          <img loading="lazy" src={data.image} alt={data.title} onLoad={()=>setImgLoaded(true)}
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transform:imgLoaded?"scale(1)":"scale(1.06)", transition:"transform 1.2s ease", filter:imgLoaded?"none":"blur(4px)" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,rgba(17,17,17,0.12) 0%,rgba(17,17,17,0.78) 100%)" }} />
          <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"0 32px 44px", maxWidth:1000, margin:"0 auto" }}>
            <div style={{ opacity:mounted?1:0, transform:mounted?"translateY(0)":"translateY(20px)", transition:"all 0.6s ease 0.2s" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#F5E6A3", borderRadius:100, padding:"5px 16px", marginBottom:14 }}>
                <span style={{ fontSize:12, fontWeight:700, color:"#111111" }}>MedCare RCM Services</span>
              </div>
            </div>
            <h1 style={{ fontSize:"clamp(24px,4vw,46px)", fontWeight:800, color:"#fff", lineHeight:1.15, letterSpacing:-0.5, maxWidth:820, ...rise(0.3) }}>
              {data.emoji} {data.title}
            </h1>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.65)", marginTop:8, fontStyle:"italic", ...rise(0.4) }}>{data.subtitle}</p>
          </div>
        </section>

        {/* ── META BAR ── */}
        <section style={{ background:"#fff", borderBottom:"1px solid rgba(17,17,17,0.08)", padding:"14px 32px" }}>
          <div style={{ maxWidth:1000, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:30, height:30, borderRadius:"50%", background:"#111111", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#F5E6A3" }}>M</div>
                <span style={{ fontSize:13, fontWeight:600, color:"#111111" }}>MedCare RCM Solutions</span>
              </div>
              <span style={{ fontSize:13, color:"#999999" }}>Revenue Cycle Management</span>
              <span style={{ fontSize:13, color:"#999999" }}>HIPAA Compliant</span>
            </div>
            <button onClick={()=>router.push("/services")} style={{ background:"none", border:"1.5px solid rgba(17,17,17,0.2)", borderRadius:8, padding:"7px 16px", fontSize:13, fontWeight:600, color:"#111111", cursor:"pointer" }}>
              ← All Services
            </button>
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{ background:"#111111", padding:"36px 24px" }}>
          <div className="detail-stats" style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, textAlign:"center" }}>
            {data.stats.map((s,i)=>(
              <div key={i} style={{ opacity:mounted?1:0, transform:mounted?"translateY(0)":"translateY(20px)", transition:`all 0.5s ease ${0.1+i*0.08}s` }}>
                <div style={{ fontSize:22, fontWeight:800, color:"#F5E6A3", letterSpacing:-0.5 }}>{s.val}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:4, fontWeight:600, textTransform:"uppercase", letterSpacing:0.8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BODY ── */}
        <section style={{ background:"#F5F0E8", padding:"64px 24px 80px" }}>
          <div style={{ maxWidth:1020, margin:"0 auto", display:"flex", flexDirection:"column", gap:22 }}>

            {/* Overview */}
            <Reveal>
              <div style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:20, overflow:"hidden", boxShadow:"0 4px 24px rgba(17,17,17,0.05)" }}>
                <div style={{ padding:"10px 26px", background:"#111111", display:"flex", alignItems:"center", gap:10 }}>
                  <span>📋</span>
                  <span style={{ fontSize:11, fontWeight:700, color:"#F5E6A3", letterSpacing:1.5, textTransform:"uppercase" }}>Service Overview</span>
                </div>
                <div style={{ padding:"30px 34px" }}>
                  <p style={{ fontSize:16, color:"#444444", lineHeight:1.9 }}>{data.overview}</p>
                </div>
              </div>
            </Reveal>

            {/* ── RCM WHEEL (revenue-cycle-management only) ── */}
            {data.hasRCMWheel && (
              <Reveal delay={0.06}>
                <div style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:20, overflow:"hidden", boxShadow:"0 4px 24px rgba(17,17,17,0.05)" }}>
                  <div style={{ padding:"10px 26px", background:"#111111", display:"flex", alignItems:"center", gap:10 }}>
                    <span>🔄</span>
                    <span style={{ fontSize:11, fontWeight:700, color:"#F5E6A3", letterSpacing:1.5, textTransform:"uppercase" }}>The 10-Step RCM Process — Animated</span>
                  </div>
                  <div style={{ padding:"36px 28px" }}>
                    <p style={{ fontSize:14.5, color:"#555555", lineHeight:1.75, marginBottom:28, textAlign:"center", maxWidth:580, margin:"0 auto 32px" }}>
                      Click any step on the wheel to explore it in detail. The cycle auto-advances so you can watch the full process unfold.
                    </p>
                    <RCMWheel />
                  </div>
                </div>
              </Reveal>
            )}

            {/* ── MEDICAL BILLING CONTENT (medical-billing only) ── */}
            {data.hasMedicalBillingContent && (
              <Reveal delay={0.06}>
                <MedicalBillingContent />
              </Reveal>
            )}

            {/* Key Points */}
            <Reveal delay={0.07}>
              <div style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:20, overflow:"hidden", boxShadow:"0 4px 24px rgba(17,17,17,0.05)" }}>
                <div style={{ padding:"10px 26px", background:"#111111", display:"flex", alignItems:"center", gap:10 }}>
                  <span>✅</span>
                  <span style={{ fontSize:11, fontWeight:700, color:"#F5E6A3", letterSpacing:1.5, textTransform:"uppercase" }}>What We Manage For You</span>
                </div>
                <div style={{ padding:"30px 34px" }}>
                  <div className="points-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                    {data.keyPoints.map((point,i)=>(
                      <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"14px 16px", background:"#F5F0E8", borderRadius:12, border:"1px solid rgba(17,17,17,0.07)" }}>
                        <div style={{ width:22, height:22, borderRadius:"50%", background:"#F5E6A3", border:"1.5px solid rgba(17,17,17,0.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                          <span style={{ fontSize:11, fontWeight:800, color:"#111111" }}>✓</span>
                        </div>
                        <span style={{ fontSize:14, color:"#333333", fontWeight:500, lineHeight:1.5 }}>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* CPT Table */}
            <Reveal delay={0.1}>
              <div style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:20, overflow:"hidden", boxShadow:"0 4px 24px rgba(17,17,17,0.05)" }}>
                <div style={{ padding:"10px 26px", background:"#111111", display:"flex", alignItems:"center", gap:10 }}>
                  <span>🧾</span>
                  <span style={{ fontSize:11, fontWeight:700, color:"#F5E6A3", letterSpacing:1.5, textTransform:"uppercase" }}>Key Codes & Billing Reference</span>
                </div>
                <div style={{ overflowX:"auto" }}>
                  <table style={{ width:"100%", borderCollapse:"collapse" }}>
                    <thead>
                      <tr style={{ background:"#F5F0E8", borderBottom:"2px solid rgba(17,17,17,0.08)" }}>
                        <th style={{ padding:"13px 22px", textAlign:"left", fontSize:11, fontWeight:700, color:"#111111", textTransform:"uppercase", letterSpacing:1, whiteSpace:"nowrap" }}>Code / Reference</th>
                        <th style={{ padding:"13px 22px", textAlign:"left", fontSize:11, fontWeight:700, color:"#111111", textTransform:"uppercase", letterSpacing:1 }}>Description</th>
                        <th style={{ padding:"13px 22px", textAlign:"right", fontSize:11, fontWeight:700, color:"#111111", textTransform:"uppercase", letterSpacing:1, whiteSpace:"nowrap" }}>Reimbursement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.cptCodes.map((row,i)=>(
                        <tr key={i} style={{ borderBottom:i<data.cptCodes.length-1?"1px solid rgba(17,17,17,0.06)":"none", background:i%2===0?"#fff":"#FDFAF5", transition:"background 0.2s" }}
                          onMouseEnter={e=>e.currentTarget.style.background="#FFF9E6"}
                          onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"#fff":"#FDFAF5"}>
                          <td style={{ padding:"15px 22px", whiteSpace:"nowrap" }}>
                            <span style={{ fontFamily:"monospace", fontSize:13, fontWeight:700, color:"#111111", background:"#F5E6A3", padding:"3px 10px", borderRadius:6 }}>{row.code}</span>
                          </td>
                          <td style={{ padding:"15px 22px", fontSize:13.5, color:"#444444", lineHeight:1.55 }}>{row.description}</td>
                          <td style={{ padding:"15px 22px", textAlign:"right", fontSize:13.5, fontWeight:700, color:"#111111", whiteSpace:"nowrap" }}>{row.reimbursement}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ padding:"10px 22px", background:"#F5F0E8", borderTop:"1px solid rgba(17,17,17,0.07)" }}>
                    <p style={{ fontSize:11, color:"#999999", margin:0 }}>* Reimbursement ranges are estimates based on Medicare fee schedules. Commercial payer rates vary by contract and region.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* How We Serve */}
            <Reveal delay={0.12}>
              <div style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:20, overflow:"hidden", boxShadow:"0 4px 24px rgba(17,17,17,0.05)" }}>
                <div style={{ padding:"10px 26px", background:"#111111", display:"flex", alignItems:"center", gap:10 }}>
                  <span>🚀</span>
                  <span style={{ fontSize:11, fontWeight:700, color:"#F5E6A3", letterSpacing:1.5, textTransform:"uppercase" }}>How MedCare RCM Serves You</span>
                </div>
                <div className="how-grid" style={{ padding:"30px 34px", display:"grid", gridTemplateColumns:"1fr auto", gap:32, alignItems:"center" }}>
                  <p style={{ fontSize:16, color:"#444444", lineHeight:1.9, margin:0 }}>{data.howWeServe}</p>
                  <div style={{ background:"#F5F0E8", border:"1px solid rgba(17,17,17,0.1)", borderRadius:16, padding:"22px 22px", textAlign:"center", minWidth:160, flexShrink:0 }}>
                    <div style={{ fontSize:30, marginBottom:10 }}>{data.emoji}</div>
                    <div style={{ fontSize:20, fontWeight:800, color:"#111111", marginBottom:4 }}>{data.stats[0].val}</div>
                    <div style={{ fontSize:10, color:"#666666", fontWeight:600, textTransform:"uppercase", letterSpacing:0.8 }}>{data.stats[0].label}</div>
                    <div style={{ width:"100%", height:1, background:"rgba(17,17,17,0.08)", margin:"14px 0" }} />
                    <div style={{ fontSize:20, fontWeight:800, color:"#111111", marginBottom:4 }}>{data.stats[1].val}</div>
                    <div style={{ fontSize:10, color:"#666666", fontWeight:600, textTransform:"uppercase", letterSpacing:0.8 }}>{data.stats[1].label}</div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Process */}
            <Reveal delay={0.14}>
              <div style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:20, overflow:"hidden", boxShadow:"0 4px 24px rgba(17,17,17,0.05)" }}>
                <div style={{ padding:"10px 26px", background:"#111111", display:"flex", alignItems:"center", gap:10 }}>
                  <span>⚙️</span>
                  <span style={{ fontSize:11, fontWeight:700, color:"#F5E6A3", letterSpacing:1.5, textTransform:"uppercase" }}>Our Process — From Day One</span>
                </div>
                <div style={{ padding:"30px 34px" }}>
                  <div className="process-grid" style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:16 }}>
                    {[
                      { num:"01", icon:"🔍", title:"Free audit",        desc:"We analyze your billing gaps before anything starts." },
                      { num:"02", icon:"⚙️", title:"Onboard in 7 days", desc:"Full setup with zero disruption to your workflow." },
                      { num:"03", icon:"📤", title:"Daily submissions",  desc:"Clean claims submitted within 24 hours of service." },
                      { num:"04", icon:"🔄", title:"Denial appeals",    desc:"Every denial worked within 48 hours." },
                      { num:"05", icon:"📊", title:"Monthly reports",   desc:"Full KPI dashboard delivered every month." },
                    ].map((p,i)=>(
                      <div key={i} style={{ display:"flex", flexDirection:"column", gap:8 }}>
                        <div style={{ width:36, height:36, borderRadius:10, background:"#F5E6A3", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>{p.icon}</div>
                        <span style={{ fontSize:10, fontWeight:800, color:"#999999", letterSpacing:1 }}>{p.num}</span>
                        <h4 style={{ fontSize:13, fontWeight:700, color:"#111111", margin:0 }}>{p.title}</h4>
                        <p style={{ fontSize:12, color:"#666666", lineHeight:1.6, margin:0 }}>{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Related */}
            {relatedData.length > 0 && (
              <Reveal delay={0.1}>
                <div style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:20, padding:"26px 34px", boxShadow:"0 4px 24px rgba(17,17,17,0.05)" }}>
                  <h3 style={{ fontSize:15, fontWeight:700, color:"#111111", marginBottom:16 }}>Related services</h3>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                    {relatedData.map(r=>(
                      <Link key={r.slug} href={`/services/${r.slug}`}
                        style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#F5F0E8", border:"1px solid rgba(17,17,17,0.1)", borderRadius:100, padding:"8px 18px", fontSize:13.5, fontWeight:600, color:"#111111", transition:"all 0.2s" }}
                        onMouseEnter={e=>{ e.currentTarget.style.background="#111111"; e.currentTarget.style.color="#fff"; }}
                        onMouseLeave={e=>{ e.currentTarget.style.background="#F5F0E8"; e.currentTarget.style.color="#111111"; }}>
                        <span>{r.emoji}</span> {r.title.replace(" Services","")}
                      </Link>
                    ))}
                    <Link href="/services" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#F5E6A3", border:"1px solid rgba(17,17,17,0.15)", borderRadius:100, padding:"8px 18px", fontSize:13.5, fontWeight:700, color:"#111111" }}>
                      View all services →
                    </Link>
                  </div>
                </div>
              </Reveal>
            )}

          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background:"#111111", padding:"80px 24px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-80, right:-80, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,230,163,0.08),transparent 70%)", pointerEvents:"none" }} />
          <div style={{ maxWidth:640, margin:"0 auto", textAlign:"center", position:"relative", zIndex:2 }}>
            <div style={{ display:"inline-block", background:"#F5E6A3", borderRadius:100, padding:"6px 18px", fontSize:12, fontWeight:700, color:"#111111", letterSpacing:1.5, textTransform:"uppercase", marginBottom:22 }}>No obligation</div>
            <h2 style={{ fontSize:"clamp(26px,4vw,42px)", fontWeight:800, color:"#fff", letterSpacing:-1, marginBottom:16, lineHeight:1.15 }}>
              Ready to recover lost revenue<br/>on {data.title.replace(" Services","")}?
            </h2>
            <p style={{ fontSize:16, color:"rgba(255,255,255,0.5)", lineHeight:1.75, marginBottom:36, maxWidth:480, margin:"0 auto 36px" }}>
              Let our certified billing specialists run a free audit — we'll show you exactly what's being missed.
            </p>
            <div className="cta-btns" style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
              <Link href="/contact" style={{ background:"#F5E6A3", color:"#111111", padding:"15px 30px", borderRadius:100, fontSize:15, fontWeight:800, display:"inline-flex", alignItems:"center", gap:8 }}>
                Get a free audit →
              </Link>
              <Link href="/services" style={{ background:"transparent", color:"rgba(255,255,255,0.6)", padding:"15px 26px", borderRadius:100, fontSize:15, fontWeight:600, border:"1.5px solid rgba(255,255,255,0.18)", display:"inline-block" }}>
                View all services
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        @keyframes fadeSlideUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideright   { from{opacity:0;transform:translateX(32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideleft    { from{opacity:0;transform:translateX(-32px)} to{opacity:1;transform:translateX(0)} }
        @keyframes pulseRing    { 0%{r:28;opacity:0.5} 100%{r:40;opacity:0} }
        @keyframes breathe      { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(1.6)} }

        @media (max-width: 768px) {
          .wheel-layout  { grid-template-columns: 1fr !important; gap: 24px !important; }
          .step-pills    { display: flex !important; }
          .slide-inner   { grid-template-columns: 1fr !important; }
          .slide-inner > div:last-child { display: none; }
          .steps-grid    { grid-template-columns: 1fr !important; }
          .facts-grid    { grid-template-columns: 1fr 1fr !important; }
          .points-grid   { grid-template-columns: 1fr !important; }
          .how-grid      { grid-template-columns: 1fr !important; }
          .process-grid  { grid-template-columns: 1fr 1fr !important; }
          .detail-stats  { grid-template-columns: 1fr 1fr !important; gap: 20px 12px !important; }
          .cta-btns      { flex-direction: column !important; align-items: center !important; }
          .cta-btns a    { width: 100% !important; justify-content: center !important; text-align: center !important; }
        }
        @media (max-width: 480px) {
          .facts-grid   { grid-template-columns: 1fr !important; }
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
