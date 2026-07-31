"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

/* ══ HOOKS ══ */
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
  const t = { up:"translateY(36px)", left:"translateX(-36px)", right:"translateX(36px)", scale:"scale(0.93)" };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : t[dir],
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ text }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:16 }}>
      <div style={{ width:32, height:2, background:"#111111", borderRadius:2 }} />
      <p style={{ fontSize:11, fontWeight:800, color:"#111111", letterSpacing:"3px", textTransform:"uppercase" }}>{text}</p>
    </div>
  );
}

function ViewMoreBtn({ href, label = "View More" }) {
  return (
    <div style={{ textAlign:"center", marginTop:48 }}>
      <Link href={href} style={{
        display:"inline-flex", alignItems:"center", gap:10,
        background:"#111111", color:"#fff",
        padding:"14px 32px", borderRadius:100,
        fontSize:14, fontWeight:700,
        boxShadow:"0 4px 20px rgba(17,17,17,0.15)",
        transition:"transform 0.2s, box-shadow 0.2s",
      }}
        onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 32px rgba(17,17,17,0.25)"; }}
        onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(17,17,17,0.15)"; }}>
        {label}
        <span style={{ background:"#F5E6A3", color:"#111111", borderRadius:"50%", width:24, height:24, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800 }}>→</span>
      </Link>
    </div>
  );
}

/* ══════════════════════════════════════
   HERO — UNCHANGED
══════════════════════════════════════ */
function Hero() {
  const [mounted, setMounted] = useState(false);
  const [tick, setTick] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const words = ["Denials", "Write-offs", "AR Days", "Rejections"];
  const [wIdx, setWIdx] = useState(0);
  const [chars, setChars] = useState("");
  const [del, setDel] = useState(false);
  const [counting, setCounting] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);
  useEffect(() => { const t = setInterval(() => setTick(n => n + 1), 16); return () => clearInterval(t); }, []);
  useEffect(() => { if (mounted) setTimeout(() => setCounting(true), 500); }, [mounted]);

  useEffect(() => {
    const word = words[wIdx]; let t;
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

  const c1 = useCountUp(98, 1600, counting);
  const c2 = useCountUp(9.6, 1800, counting, 1);
  const c3 = useCountUp(31.7, 1600, counting, 1);
  const c4 = useCountUp(500, 2000, counting);
  const ribbonOffset = -(tick * 0.4) % 700;
  const claimSteps = ["Submitted", "Verified", "Processing", "Approved ✓"];

  const rise = (d = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(30px)",
    transition: `opacity 0.65s ease ${d}s, transform 0.65s ease ${d}s`,
  });

  return (
    <section className="home-hero" style={{ minHeight:"100vh", paddingTop:80, background:"linear-gradient(160deg, #F5F0E8 0%, #FDFAF5 45%, #F0EBE0 100%)", position:"relative", overflow:"hidden", display:"flex", flexDirection:"column", justifyContent:"center" }}>
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", backgroundImage:"radial-gradient(circle, rgba(17,17,17,0.08) 1.5px, transparent 1.5px)", backgroundSize:"40px 40px", animation:"dotsShift 30s linear infinite" , willChange:"transform" }} />
      <div style={{ position:"absolute", top:-70, right:-70, width:320, height:320, borderRadius:"50%", background:"radial-gradient(circle, rgba(245,230,163,0.24) 0%, transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-45, left:-45, width:260, height:260, borderRadius:"50%", background:"radial-gradient(circle, rgba(17,17,17,0.05) 0%, transparent 72%)", pointerEvents:"none" }} />
      {[220,170,120].map((size,i) => (
        <div key={i} style={{ position:"absolute", top:24 + i*8, right:24 + i*6, width:size, height:size, borderRadius:"50%", border:`1px solid rgba(17,17,17,${0.06-i*0.01})`, animation:`ringExpand ${3.2+i}s ease-in-out ${i*0.4}s infinite`, pointerEvents:"none" }} className="hero-ring" />
      ))}
      <div style={{ position:"absolute", bottom:24, left:0, right:0, overflow:"hidden", pointerEvents:"none", zIndex:1 }} className="hero-ribbon">
        <div style={{ display:"flex", gap:56, whiteSpace:"nowrap", transform:`translateX(${ribbonOffset}px)`, willChange:"transform" }}>
          {[...Array(4)].map((_,ri)=>["HIPAA Compliant","Secure Encryption","First-Pass Rate 98%","Denial Reduction 65%","Revenue Growth 31.7%","500+ Providers Served","24/7 Support","USA-Based Team"].map((txt,i)=>(
            <span key={`${ri}-${i}`} style={{ fontSize:11, fontWeight:700, color:"rgba(17,17,17,0.3)", letterSpacing:2, textTransform:"uppercase" }}>
              {txt} <span style={{ color:"rgba(17,17,17,0.15)", marginLeft:28 }}>✦</span>
            </span>
          )))}
        </div>
      </div>
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"60px 20px 90px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"center", position:"relative", zIndex:2, width:"100%" }} className="hero-grid">
        <div>
          <div style={{ ...rise(0.05), display:"inline-flex", alignItems:"center", gap:9, background:"#F5E6A3", border:"1px solid rgba(17,17,17,0.15)", borderRadius:100, padding:"7px 18px", marginBottom:24 }}>
            <span style={{ width:7, height:7, borderRadius:"50%", background:"#111111", display:"inline-block", animation:"breathe 2s infinite" , willChange:"transform" }} />
            <span style={{ fontSize:12, color:"#111111", fontWeight:700, letterSpacing:0.4 }}>HIPAA-Compliant · USA-Based RCM Experts</span>
          </div>
          <h1 style={{ ...rise(0.18), fontSize:"clamp(34px,4.5vw,60px)", fontWeight:800, color:"#111111", lineHeight:1.1, letterSpacing:-2, marginBottom:20 }}>
            Recover More.<br/>
            <span style={{ color:"#111111", opacity:0.35 }}>Reduce Your</span><br/>
            <span style={{ color:"#111111", borderBottom:"3px solid #F5E6A3", paddingBottom:2 }}>{chars}</span>
            <span style={{ display:"inline-block", width:3, height:"0.82em", background:"#111111", marginLeft:3, verticalAlign:"middle", borderRadius:2, animation:"blink 0.85s step-end infinite" }} />
          </h1>
          <p style={{ ...rise(0.32), fontSize:16, color:"#666666", lineHeight:1.8, marginBottom:32, maxWidth:460 }}>
            MedCare RCM Solutions manages your complete revenue cycle — from claim submission to final payment — so you collect every dollar you've earned.
          </p>
          <div className="hero-cta" style={{ ...rise(0.44), display:"flex", gap:12, flexWrap:"wrap", marginBottom:36 }}>
            <Link href="/contact" style={{ background:"#111111", color:"#fff", padding:"14px 26px", borderRadius:100, fontSize:15, fontWeight:700, display:"inline-flex", alignItems:"center", gap:10, boxShadow:"0 4px 24px rgba(17,17,17,0.25)", transition:"transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 32px rgba(17,17,17,0.35)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 24px rgba(17,17,17,0.25)"; }}>
              Get a Free Audit
              <span style={{ background:"#F5E6A3", color:"#111111", borderRadius:"50%", width:26, height:26, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800 }}>→</span>
            </Link>
            <Link href="/services" style={{ background:"transparent", color:"#111111", padding:"14px 26px", borderRadius:100, fontSize:15, fontWeight:600, display:"inline-block", border:"1.5px solid rgba(17,17,17,0.2)", transition:"border-color 0.2s, background 0.2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor="#111111"; e.currentTarget.style.background="rgba(17,17,17,0.04)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(17,17,17,0.2)"; e.currentTarget.style.background="transparent"; }}>
              Explore Services
            </Link>
          </div>
          <div style={{ ...rise(0.56), display:"grid", gridTemplateColumns:"repeat(4,1fr)", background:"#fff", borderRadius:16, border:"1px solid rgba(17,17,17,0.1)", boxShadow:"0 2px 20px rgba(17,17,17,0.06)", overflow:"hidden" }} className="hero-stats">
            {[{val:`${c1}%`,label:"First-Pass"},{val:`${c2}%`,label:"Denial Rate"},{val:`${c3}%`,label:"Rev. Growth"},{val:`${c4}+`,label:"Providers"}].map((s,i)=>(
              <div key={i} style={{ padding:"14px 8px", textAlign:"center", borderRight:i<3?"1px solid rgba(17,17,17,0.08)":"none" }}>
                <div style={{ fontSize:18, fontWeight:800, color:"#111111", letterSpacing:-0.5 }}>{s.val}</div>
                <div style={{ fontSize:11, color:"#4B5563", marginTop:3, fontWeight:700, textTransform:"uppercase", letterSpacing:0.5 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position:"relative", height:520, ...rise(0.25) }} className="hero-animation-side">
          <div style={{ position:"absolute", top:50, left:10, width:220, background:"#111111", borderRadius:22, padding:"24px", boxShadow:"0 24px 64px rgba(17,17,17,0.25)", animation:"floatA 5s ease-in-out infinite", zIndex:3 , willChange:"transform" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:"#F5E6A3", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🏥</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.6)", background:"rgba(255,255,255,0.1)", padding:"3px 10px", borderRadius:100 }}>Live</div>
            </div>
            <div style={{ fontSize:50, fontWeight:900, color:"#fff", letterSpacing:-2, lineHeight:1, marginBottom:4 }}>{c1}%</div>
            <div style={{ fontSize:13, fontWeight:700, color:"rgba(255,255,255,0.85)" }}>First-Pass Claim Rate</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.45)", marginTop:5 }}>↑ Up from 91% last quarter</div>
          </div>
          <div style={{ position:"absolute", top:50, right:0, width:200, background:"#fff", border:"1px solid rgba(17,17,17,0.1)", borderRadius:18, padding:"20px", boxShadow:"0 8px 32px rgba(17,17,17,0.08)", animation:"floatB 6s ease-in-out infinite", zIndex:3 , willChange:"transform" }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#374151", textTransform:"uppercase", letterSpacing:1, marginBottom:8 }}>Reduced Denials</div>
            <div style={{ fontSize:34, fontWeight:800, color:"#111111", letterSpacing:-1 }}>{c2}%</div>
            <svg width="76" height="76" style={{ display:"block", margin:"8px auto 0" }}>
              <circle cx="38" cy="38" r="28" fill="none" stroke="#F0EBE0" strokeWidth="7" />
              <circle cx="38" cy="38" r="28" fill="none" stroke="#111111" strokeWidth="7" strokeDasharray={`${(counting?51:0)*1.76} 176`} strokeLinecap="round" transform="rotate(-90 38 38)" style={{ transition:"stroke-dasharray 1.8s ease" }} />
              <text x="38" y="43" textAnchor="middle" fontSize="11" fontWeight="800" fill="#111111">51%</text>
            </svg>
            <div style={{ fontSize:11, color:"#4B5563", fontWeight:600, textAlign:"center", marginTop:4 }}>↓ Denial reduction</div>
          </div>
          <div style={{ position:"absolute", top:220, left:"50%", transform:"translateX(-50%)", width:250, background:"#fff", border:"1px solid rgba(17,17,17,0.1)", borderRadius:18, padding:"20px", boxShadow:"0 8px 32px rgba(17,17,17,0.08)", animation:"floatC 7s ease-in-out infinite", zIndex:4 , willChange:"transform" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:"#374151", textTransform:"uppercase", letterSpacing:1 }}>Faster Reimbursements</div>
                <div style={{ fontSize:11, color:"#4B5563", fontWeight:600, marginTop:2 }}>+1.33% this month</div>
              </div>
              <div style={{ background:"#F5E6A3", borderRadius:8, padding:"4px 8px", fontSize:11, fontWeight:700, color:"#111111" }}>✓</div>
            </div>
            <svg width="100%" height="44" viewBox="0 0 220 44">
              <defs><linearGradient id="lineG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#111111" stopOpacity="0.15"/><stop offset="100%" stopColor="#111111" stopOpacity="0"/></linearGradient></defs>
              <path d="M0,40 C30,36 60,30 90,22 C120,14 150,8 180,5 C200,3 210,2 220,1" fill="none" stroke="#111111" strokeWidth="2.5" strokeLinecap="round" style={{ strokeDasharray:300, strokeDashoffset:counting?0:300, transition:"stroke-dashoffset 1.8s ease" }} />
              <path d="M0,40 C30,36 60,30 90,22 C120,14 150,8 180,5 C200,3 210,2 220,1 L220,44 L0,44Z" fill="url(#lineG)" />
            </svg>
            <div style={{ fontSize:19, fontWeight:800, color:"#111111", marginTop:6 }}>35% Faster <span style={{ fontSize:12, fontWeight:400, color:"#4B5563" }}>avg reimbursement</span></div>
          </div>
          <div style={{ position:"absolute", bottom:20, right:40, width:186, background:"#fff", border:"1px solid rgba(17,17,17,0.1)", borderRadius:18, padding:"18px", boxShadow:"0 8px 32px rgba(17,17,17,0.08)", animation:"floatD 8s ease-in-out infinite", zIndex:3 , willChange:"transform" }}>
            <div style={{ fontSize:11, fontWeight:700, color:"#374151", textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>Revenue Growth</div>
            <div style={{ fontSize:30, fontWeight:800, color:"#111111", letterSpacing:-1 }}>{c3}%</div>
            <div style={{ fontSize:11, color:"#4B5563", fontWeight:600, marginBottom:10 }}>↑ Your Growth</div>
            <div style={{ display:"flex", alignItems:"flex-end", gap:3, height:30 }}>
              {[12,20,16,26,22,34,30,38].map((h,i)=>(
                <div key={i} style={{ flex:1, height:h, background:i===7?"#111111":"#F0EBE0", borderRadius:3 }} />
              ))}
            </div>
          </div>
          <div style={{ position:"absolute", bottom:28, left:46, width:170, background:"#fff", border:"1px solid rgba(17,17,17,0.1)", borderRadius:16, padding:"16px", boxShadow:"0 8px 28px rgba(17,17,17,0.08)", animation:"floatE 6.5s ease-in-out 0.5s infinite", zIndex:3 , willChange:"transform" }}>
            <div style={{ fontSize:10, fontWeight:700, color:"#374151", textTransform:"uppercase", letterSpacing:1, marginBottom:12 }}>Claim #48291</div>
            {claimSteps.map((step,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", flexShrink:0, background:i<activeStep?"#111111":i===activeStep?"#F5E6A3":"#E8E2D8", border:i===activeStep?"2px solid #111111":"none", transition:"all 0.3s" }} />
                <span style={{ fontSize:11, fontWeight:i<=activeStep?600:400, color:i<=activeStep?"#111111":"#4B5563", transition:"color 0.3s" }}>{step}</span>
              </div>
            ))}
          </div>
          <div style={{ position:"absolute", top:56, left:"16%", background:"#F5E6A3", border:"1px solid rgba(17,17,17,0.15)", borderRadius:14, padding:"10px 16px", display:"flex", alignItems:"center", gap:10, boxShadow:"0 4px 20px rgba(17,17,17,0.1)", animation:"floatF 4.5s ease-in-out infinite", zIndex:5 , willChange:"transform" }}>
            <span style={{ fontSize:18 }}>🔒</span>
            <div>
              <div style={{ fontSize:12, fontWeight:700, color:"#111111" }}>HIPAA Certified</div>
              <div style={{ fontSize:10, color:"rgba(17,17,17,0.55)" }}>100% Compliant</div>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-stat-cards" style={{ display:"none", padding:"0 20px 60px", gap:12, flexWrap:"wrap", justifyContent:"center", position:"relative", zIndex:2 }}>
        {[
          { icon:"🏥", val:`${c1}%`, label:"First-Pass Rate", color:"#111111", textColor:"#fff" },
          { icon:"💰", val:`${c3}%`, label:"Revenue Growth",  color:"#F5E6A3", textColor:"#111111" },
          { icon:"⚡", val:`${c4}+`, label:"Providers Served",color:"#fff",    textColor:"#111111" },
          { icon:"🔒", val:"HIPAA",  label:"Certified",       color:"#F5F0E8", textColor:"#111111" },
        ].map((s,i)=>(
          <div key={i} style={{ background:s.color, borderRadius:16, padding:"18px 20px", display:"flex", alignItems:"center", gap:12, border:"1px solid rgba(17,17,17,0.1)", boxShadow:"0 4px 16px rgba(17,17,17,0.08)", width:"calc(50% - 6px)" }}>
            <span style={{ fontSize:22 }}>{s.icon}</span>
            <div>
              <div style={{ fontSize:20, fontWeight:800, color:s.textColor, letterSpacing:-0.5 }}>{s.val}</div>
              <div style={{ fontSize:10, color:s.textColor, opacity:0.6, fontWeight:600, textTransform:"uppercase", letterSpacing:0.5 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══ STATS STRIP ══ */
function StatsStrip() {
  const { ref, visible } = useReveal(0.15);
  const s1 = useCountUp(98,  1600, visible);
  const s2 = useCountUp(500, 1800, visible);
  const s3 = useCountUp(50,  1600, visible);
  const s4 = useCountUp(35,  1400, visible);
  const items = [
    { val:`${s1}%`,    label:"Clean Claim Rate",       icon:"✅", desc:"Industry-leading accuracy." },
    { val:`${s2}+`,    label:"Providers Served",        icon:"🏥", desc:"Trusted nationwide." },
    { val:`$${s3}M+`,  label:"Revenue Recovered",       icon:"💰", desc:"Write-offs turned into profit." },
    { val:`${s4}%`,    label:"Faster Reimbursements",   icon:"⚡", desc:"Drops average AR days from day one." },
  ];
  return (
    <section ref={ref} style={{ background:"#111111", padding:"72px 20px", position:"relative", overflow:"hidden" }}>
      <div className="stats-grid" style={{ maxWidth:1160, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24, position:"relative", zIndex:2 }}>
        {items.map((s,i)=>(
          <div key={i} style={{ textAlign:"center", padding:"20px 16px", borderRadius:16, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.05)", opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(40px)", transition:`opacity 0.8s ease ${i*0.12}s, transform 0.8s ease ${i*0.12}s` }}>
            <div style={{ fontSize:28, marginBottom:10 }}>{s.icon}</div>
            <div style={{ fontSize:"clamp(28px,3.5vw,40px)", fontWeight:900, color:"#fff", letterSpacing:"-1px", lineHeight:1.1 }}>{s.val}</div>
            <div style={{ fontSize:12, color:"#F5E6A3", marginTop:8, fontWeight:700, textTransform:"uppercase", letterSpacing:1 }}>{s.label}</div>
            <p style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:8, lineHeight:1.5 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══ SERVICES — image cards ══ */
const SERVICES_DATA = [
  { icon:"🧾", title:"Medical Billing",        href:"/services/medical-billing",    img:"https://plus.unsplash.com/premium_photo-1661374851109-1216f527ee49?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fit=crop", tag:"Most Popular",  desc:"End-to-end billing from charge capture to payment posting with 98%+ first-pass rates." },
  { icon:"🚫", title:"Denial Management",       href:"/services/denial-management",   img:"https://blog.curemd.com/wp-content/uploads/2020/09/Pay-close-attention-to-claims-and-denials.jpg", tag:"High Impact",   desc:"Every denied claim fought and appealed within 48 hours — 70%+ first-level success rate." },
  { icon:"💰", title:"AR Recovery",             href:"/services/ar-recovery",          img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=75&fit=crop", tag:"Fast ROI",       desc:"We recover aging claims beyond 60 days that most practices write off permanently." },
  { icon:"🪪", title:"Provider Credentialing",  href:"/services/credentialing",        img:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=75&fit=crop", tag:"7-Day Setup",   desc:"Fast-track CAQH, Medicare, Medicaid and commercial payer enrollment — zero delays." },
  { icon:"👤", title:"Patient Billing",         href:"/services/patient-billing",      img:"https://plus.unsplash.com/premium_photo-1661434879388-63271644d6ef?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D&fit=crop", tag:"Trust-Building", desc:"Clear statements and payment portals that get balances paid without damaging relationships." },
  { icon:"📊", title:"Reporting & Analytics",   href:"/services/reporting-analytics",  img:"https://images.unsplash.com/photo-1543286386-713bdd548da4?w=700&q=75&fit=crop", tag:"Real-Time",      desc:"Live KPI dashboards and monthly executive reports — every metric in plain language." },
];

function Services() {
  const { ref, visible } = useReveal(0.08);
  return (
    <section ref={ref} style={{ background:"#FDFAF5", padding:"100px 20px", overflow:"hidden" }}>
      <div style={{ maxWidth:1180, margin:"0 auto" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:60 }}>
            <SectionLabel text="Core Expertise" />
            <h2 style={{ fontSize:"clamp(26px,4vw,46px)", fontWeight:800, color:"#111111", letterSpacing:-1.5, marginBottom:14, lineHeight:1.1 }}>Full-Spectrum RCM Workflows</h2>
            <p style={{ fontSize:16, color:"#666666", maxWidth:560, margin:"0 auto", lineHeight:1.8 }}>Certified billing specialists configured for your specific clinical practice ecosystem.</p>
          </div>
        </Reveal>
        <div className="cards-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:22 }}>
          {SERVICES_DATA.map((s,i)=>(
            <Reveal key={i} delay={i*0.08}>
              <Link href={s.href} style={{ display:"block", textDecoration:"none" }}>
                <div className="img-card" style={{ background:"#fff", borderRadius:22, overflow:"hidden", border:"1px solid rgba(17,17,17,0.08)", boxShadow:"0 4px 24px rgba(17,17,17,0.05)", transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)", cursor:"pointer" }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-8px)"; e.currentTarget.style.boxShadow="0 24px 56px rgba(17,17,17,0.13)"; e.currentTarget.style.borderColor="#111111"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 24px rgba(17,17,17,0.05)"; e.currentTarget.style.borderColor="rgba(17,17,17,0.08)"; }}>
                  {/* Image */}
                  <div style={{ position:"relative", height:180, overflow:"hidden" }}>
                    <img loading="lazy" src={s.img} alt={s.title} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s ease" }}
                      onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
                      onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(17,17,17,0.06) 0%, rgba(17,17,17,0.36) 100%)" }} />
                    <div style={{ position:"absolute", top:14, left:14, background:"#F5E6A3", borderRadius:100, padding:"4px 12px", fontSize:11, fontWeight:700, color:"#111111" }}>{s.tag}</div>
                    <div style={{ position:"absolute", bottom:14, right:14, width:42, height:42, borderRadius:12, background:"rgba(255,255,255,0.85)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, border:"1px solid rgba(17,17,17,0.12)", color:"#111111" }}>{s.icon}</div>
                  </div>
                  {/* Content */}
                  <div style={{ padding:"22px 22px 24px" }}>
                    <h3 style={{ fontSize:17, fontWeight:800, color:"#111111", marginBottom:8, letterSpacing:-0.3 }}>{s.title}</h3>
                    <p style={{ fontSize:13.5, color:"#555555", lineHeight:1.7, marginBottom:16 }}>{s.desc}</p>
                    <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, fontWeight:700, color:"#111111" }}>
                      Learn more <span style={{ background:"#F5E6A3", borderRadius:"50%", width:20, height:20, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:11 }}>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <ViewMoreBtn href="/services" label="View All Services" />
      </div>
    </section>
  );
}

/* ══ SPECIALTIES — image cards ══ */
const SPECIALTIES_DATA = [
  { title:"Family Medicine",  slug:"family-medicine",  img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScOWpDfgtYC-jn7aUID-QRk1Qs9i6u1_T6fcJNXAuuoPfh8q985gv97ER8&s=10&fit=crop", icon:"👨‍⚕️", stat:"98% first-pass" },
  { title:"Cardiology",       slug:"cardiology",        img:"https://saifeehospital.com.pk/wp-content/uploads/2024/10/cardiology-images.jpg?auto=format&fit=crop", icon:"❤️",   stat:"30+ payers" },
  { title:"Mental Health",    slug:"mental-health",     img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH-XxOrozrVxSftxAqEHBAtWs_hp9d6nA9K_5IU90ls9-1wGzwcgWklJA&s=10&fit=crop", icon:"🧠",   stat:"Parity compliant" },
  { title:"Orthopedics",      slug:"orthopedics",       img:"https://www.premier-ortho.com/wp-content/uploads/2020/11/orthopedic-doctor-1200x675.jpg?auto=format&fit=crop", icon:"🦴",   stat:"Complex coding" },
  { title:"Pediatrics",       slug:"pediatrics",        img:"https://balunihospital.com/img/blog/a0bbad22c810b4d4e905f05d2f9a18e8.jpg?auto=format&fit=crop", icon:"👶",   stat:"Well-child visits" },
  { title:"Dermatology",      slug:"dermatology",       img:"https://smb.ibsrv.net/imageresizer/image/article_manager/1200x1200/107496/1101930/heroimage0.828788001705088048.jpg?auto=format&fit=crop", icon:"✨",   stat:"Mohs + cosmetic" },
];

function Specialties() {
  return (
    <section style={{ background:"#F5F0E8", padding:"100px 20px" }}>
      <div style={{ maxWidth:1180, margin:"0 auto" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:60 }}>
            <SectionLabel text="Specialties We Serve" />
            <h2 style={{ fontSize:"clamp(26px,4vw,44px)", fontWeight:800, color:"#111111", letterSpacing:-1.5, marginBottom:14 }}>Billing expertise for every specialty</h2>
            <p style={{ fontSize:16, color:"#666666", maxWidth:500, margin:"0 auto", lineHeight:1.8 }}>Our certified specialists understand the unique payer rules of your clinical scope.</p>
          </div>
        </Reveal>
        <div className="cards-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
          {SPECIALTIES_DATA.map((sp,i)=>(
            <Reveal key={i} delay={i*0.08}>
              <Link href={`/specialties/${sp.slug}`} style={{ display:"block", textDecoration:"none" }}>
                <div className="img-card" style={{ position:"relative", height:240, borderRadius:22, overflow:"hidden", border:"1px solid rgba(17,17,17,0.1)", boxShadow:"0 4px 20px rgba(17,17,17,0.07)", transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)", cursor:"pointer" }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-7px) scale(1.01)"; e.currentTarget.style.boxShadow="0 24px 52px rgba(17,17,17,0.15)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0) scale(1)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(17,17,17,0.07)"; }}>
                  <div style={{ position:"relative", width:"100%", height:"100%", overflow:"hidden", backgroundColor:"#f3f4f6" }}>
                    <img loading="lazy" src={sp.img} alt={sp.title} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s ease" }}
                      onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"}
                      onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(17,17,17,0.16) 0%, rgba(17,17,17,0.5) 100%)" }} />
                    <div style={{ position:"absolute", top:14, left:14, background:"rgba(255,255,255,0.9)", borderRadius:100, padding:"6px 14px", display:"inline-flex", alignItems:"center", gap:8, fontSize:12, fontWeight:700, color:"#111111" }}>
                      <span>{sp.icon}</span> {sp.stat}
                    </div>
                  </div>
                  {/* Title bottom */}
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"20px 20px", background:"linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.72) 80%)" }}>
                    <h3 style={{ fontSize:19, fontWeight:800, color:"#ffffff", marginBottom:6 }}>{sp.title}</h3>
                    <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(255,255,255,0.18)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.22)", borderRadius:100, padding:"5px 14px", fontSize:12, fontWeight:700, color:"#ffffff" }}>
                      View billing info →
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <ViewMoreBtn href="/specialties" label="View All 40+ Specialties" />
      </div>
    </section>
  );
}

/* ══ WHY US ══ */
function WhyUs() {
  const { ref, visible } = useReveal(0.12);
  const points = [
    { icon:"⚡", title:"Accelerated Reimbursement Speeds",   desc:"Real-time clearinghouse checks minimize technical rejections before claims reach payer networks." },
    { icon:"🔒", title:"Strict Institutional HIPAA Compliance", desc:"Encrypted databases, audited cloud parameters, and uncompromising compliance tracking guidelines." },
    { icon:"📞", title:"Dedicated RCM Advocates",             desc:"Direct priority coordination with assigned medical billing administrators — no offshore call centers." },
    { icon:"📈", title:"Uncompromised Performance Visibility", desc:"On-demand analytical dashboards displaying claim lifetimes, denial velocities, and monthly reports." },
  ];
  return (
    <section ref={ref} style={{ background:"#fff", padding:"100px 20px", position:"relative", overflow:"hidden" }}>
      <div className="why-grid" style={{ maxWidth:1160, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center" }}>
        <div style={{ opacity:visible?1:0, transform:visible?"translateX(0)":"translateX(-50px)", transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
          <SectionLabel text="Operational Excellence" />
          <h2 style={{ fontSize:"clamp(24px,3.8vw,42px)", fontWeight:800, color:"#111111", letterSpacing:-1.5, marginBottom:18, lineHeight:1.15 }}>We treat your revenue like our own.</h2>
          <p style={{ fontSize:15, color:"#555555", lineHeight:1.85, marginBottom:28 }}>
            MedCare actively re-engineers your cashflow patterns — uncovering hidden revenue leakages and accelerating your practice growth month over month.
          </p>
          {/* Feature bullets */}
          {["98%+ first-pass claim rate","48-hour denial appeal turnaround","Live KPI dashboard — 24/7 access","Onboard in under 7 days"].map((pt,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
              <div style={{ width:22, height:22, borderRadius:"50%", background:"#F5E6A3", border:"1.5px solid rgba(17,17,17,0.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <span style={{ fontSize:11, fontWeight:800, color:"#111111" }}>✓</span>
              </div>
              <span style={{ fontSize:14, color:"#333333", fontWeight:500 }}>{pt}</span>
            </div>
          ))}
          <div style={{ marginTop:32 }}>
            <Link href="/contact" style={{ background:"#111111", color:"#fff", padding:"15px 28px", borderRadius:100, fontSize:15, fontWeight:700, display:"inline-flex", alignItems:"center", gap:10, boxShadow:"0 10px 30px rgba(17,17,17,0.15)" }}>
              Get Free Consultation
              <span style={{ background:"#F5E6A3", color:"#111111", borderRadius:"50%", width:22, height:22, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800 }}>→</span>
            </Link>
          </div>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {points.map((p,i)=>(
            <div key={i} className="why-point-row" style={{ display:"flex", gap:18, alignItems:"flex-start", background:"#F5F0E8", border:"1px solid rgba(17,17,17,0.06)", borderRadius:16, padding:"22px", boxShadow:"0 4px 20px rgba(17,17,17,0.02)", opacity:visible?1:0, transform:visible?"translateX(0)":"translateX(50px)", transition:`all 0.8s cubic-bezier(0.16,1,0.3,1) ${0.1+i*0.1}s` }}>
              <span style={{ fontSize:22, flexShrink:0, background:"#fff", width:46, height:46, borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 10px rgba(17,17,17,0.06)" }}>{p.icon}</span>
              <div>
                <h3 style={{ fontSize:15, fontWeight:800, color:"#111111", marginBottom:6 }}>{p.title}</h3>
                <p style={{ fontSize:13.5, color:"#666666", lineHeight:1.65 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══ TESTIMONIALS ══ */
const TESTIMONIALS_DATA = [
  { name:"Dr. Sarah Mitchell",  role:"Family Medicine, Texas",      initials:"SM", result:"28% more collections", stars:5, quote:"MedCare RCM completely restructured our billing framework, slashing rejections by 51% within 60 days. Cash flow is at an all-time high." },
  { name:"James Holloway",      role:"Practice Manager, Florida",   initials:"JH", result:"AR days 48 → 29",      stars:5, quote:"Transitioning to MedCare was our best decision this year. We finally have complete visibility into every insurance parameter." },
  { name:"Dr. Priya Nair",      role:"Pediatrics, California",      initials:"PN", result:"97%+ first-pass rate", stars:5, quote:"Impeccable communication and profound billing authority. They operate exactly like an integrated internal department." },
  { name:"Dr. Marcus Webb",     role:"Orthopedic Surgeon, New York", initials:"MW", result:"$180K recovered in 90d",stars:5, quote:"We were skeptical at first, but MedCare recovered over $180,000 in previously denied claims in just the first 90 days." },
  { name:"Linda Torres",        role:"Office Director, Arizona",     initials:"LT", result:"Onboarded in 7 days",  stars:5, quote:"The onboarding was seamless — fully transitioned in under a week with zero disruption to our existing workflows." },
  { name:"Dr. Kevin Park",      role:"Mental Health, Illinois",      initials:"KP", result:"Zero disruptions 12mo", stars:5, quote:"Mental health billing is complex. MedCare stays ahead of every payer rule change and keeps our revenue flowing without interruption." },
];

function Testimonials() {
  return (
    <section style={{ background:"#F5F0E8", padding:"100px 20px" }}>
      <div style={{ maxWidth:1180, margin:"0 auto" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:60 }}>
            <SectionLabel text="Client Stories" />
            <h2 style={{ fontSize:"clamp(24px,4vw,44px)", fontWeight:800, color:"#111111", letterSpacing:-1.5 }}>Trusted by providers nationwide</h2>
          </div>
        </Reveal>
        <div className="cards-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
          {TESTIMONIALS_DATA.map((t,i)=>(
            <Reveal key={i} delay={i*0.08}>
              <div className="testimonial-card-premium" style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:20, padding:"28px 24px", height:"100%", boxShadow:"0 4px 20px rgba(17,17,17,0.04)", transition:"all 0.3s ease" }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow="0 20px 48px rgba(17,17,17,0.1)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(17,17,17,0.04)"; }}>
                {/* Stars */}
                <div style={{ display:"flex", gap:3, marginBottom:14 }}>
                  {[...Array(t.stars)].map((_,j)=><span key={j} style={{ color:"#F0B429", fontSize:14 }}>★</span>)}
                </div>
                <p style={{ fontSize:14, color:"#444444", lineHeight:1.8, marginBottom:18, fontStyle:"italic" }}>"{t.quote}"</p>
                {/* Result pill */}
                <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#F5F0E8", border:"1px solid rgba(17,17,17,0.08)", borderRadius:100, padding:"5px 14px", marginBottom:18 }}>
                  <span style={{ fontSize:11, fontWeight:700, color:"#111111" }}>↑ {t.result}</span>
                </div>
                {/* Author */}
                <div style={{ display:"flex", alignItems:"center", gap:12, paddingTop:16, borderTop:"1px solid rgba(17,17,17,0.07)" }}>
                  <div style={{ width:40, height:40, borderRadius:"50%", background:"#111111", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:13, color:"#F5E6A3", flexShrink:0 }}>{t.initials}</div>
                  <div>
                    <div style={{ fontSize:13.5, fontWeight:700, color:"#111111" }}>{t.name}</div>
                    <div style={{ fontSize:11.5, color:"#888888", marginTop:1 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <ViewMoreBtn href="/testimonials" label="Read More Stories" />
      </div>
    </section>
  );
}

/* ══ PRICING PREVIEW ══ */
/* ══ VOLUME OPTIONS ══ */
const VOLUME_OPTIONS = [
  { label:"Under $50K / month",     value:"<50K",        rate:"4.99%" },
  { label:"$50K – $100K / month",   value:"50K-100K",    rate:"4.99%" },
  { label:"$100K – $250K / month",  value:"100K-250K",   rate:"3.49%" },
  { label:"$250K – $500K / month",  value:"250K-500K",   rate:"3.49%" },
  { label:"Over $500K / month",     value:">500K",        rate:"1.99%" },
];

const PRICING_TIERS = [
  {
    name:"Starter",    rate:"4.99%", popular:false,
    color:"#F5F0E8",  accent:"#111111",
    desc:"For small practices under $100K/month in collections.",
    badge:"Best for small practices",
    features:["Medical billing & coding","Claim scrubbing & submission","Denial management","Monthly KPI report","Email support"],
    cta:"Get Started",
  },
  {
    name:"Growth",     rate:"3.49%", popular:true,
    color:"#111111",  accent:"#F5E6A3",
    desc:"For growing practices $100K–$500K/month.",
    badge:"Most popular",
    features:["Everything in Starter","AR recovery & follow-up","Patient billing portal","Provider credentialing","Dedicated account manager","Weekly KPI dashboard"],
    cta:"Get Started",
  },
  {
    name:"Enterprise", rate:"1.99%", popular:false,
    color:"#F5E6A3",  accent:"#111111",
    desc:"For high-volume groups over $500K/month.",
    badge:"Best value",
    features:["Everything in Growth","Real-time analytics suite","Multi-location support","Priority appeal team","Custom reporting","On-call billing specialist"],
    cta:"Talk to Sales",
  },
];

/* ══ FLOATING LABEL INPUT ══ */
function FloatInput({ label, type="text", value, onChange, placeholder, required }) {
  const [focused, setFocused] = useState(false);
  const hasVal = value.length > 0;
  const lifted = focused || hasVal;
  return (
    <div style={{ position:"relative" }}>
      <label style={{
        position:"absolute", left:14, pointerEvents:"none", zIndex:1,
        fontSize:   lifted ? 10 : 14,
        fontWeight: lifted ? 700 : 400,
        color:      focused ? "#3B82F6" : hasVal ? "rgba(17,17,17,0.45)" : "#999",
        textTransform: lifted ? "uppercase" : "none",
        letterSpacing: lifted ? "0.8px" : "0",
        top:       lifted ? 8 : "50%",
        transform: lifted ? "none" : "translateY(-50%)",
        transition:"color 0.15s ease, top 0.15s ease, transform 0.15s ease, font-size 0.15s ease, font-weight 0.15s ease, letter-spacing 0.15s ease",
      }}>
        {label}{required && " *"}
      </label>
      <input type={type} value={value} onChange={e=>onChange(e.target.value)}
        placeholder={focused ? placeholder : ""}
        onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
        style={{
          width:"100%", boxSizing:"border-box",
          padding: lifted ? "22px 14px 8px" : "15px 14px",
          border:`1.5px solid ${focused?"#3B82F6":"rgba(17,17,17,0.12)"}`,
          borderRadius:11, fontSize:14, color:"#111111",
          outline:"none", fontFamily:"inherit", background:"#FAFAFA",
          boxShadow: focused?"0 0 0 3px rgba(59,130,246,0.12)":"none",
          transition:"border-color 0.15s ease, box-shadow 0.15s ease",
        }} />
    </div>
  );
}

/* ══ PRICING MODAL ══ */
function PricingModal({ plan, onClose }) {
  const [form, setForm]     = useState({ name:"",practice:"",email:"",phone:"",revenue:"",volume:"",message:"" });
  const [submitting,setSubmitting] = useState(false);
  const [submitted, setSubmitted]  = useState(false);
  const [error,     setError]      = useState("");
  const [visible,   setVisible]    = useState(false);
  const overlayRef = useRef(null);

  useEffect(()=>{
    if(plan){ setTimeout(()=>setVisible(true),10); document.body.style.overflow="hidden"; }
    return ()=>{ document.body.style.overflow=""; };
  },[plan]);

  useEffect(()=>{
    const fn=(e)=>{ if(e.key==="Escape") handleClose(); };
    window.addEventListener("keydown",fn);
    return ()=>window.removeEventListener("keydown",fn);
  },[]);

  const handleClose=()=>{
    setVisible(false);
    setTimeout(()=>{ onClose(); setSubmitted(false); setForm({name:"",practice:"",email:"",phone:"",revenue:"",volume:"",message:""}); },220);
  };

  const handleSubmit=async(e)=>{
    e.preventDefault(); setError(""); setSubmitting(true);
    try {
      const res  = await fetch("/api/pricing-inquiry",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({...form, plan:plan?.name, rate:plan?.rate}),
      });
      const data = await res.json();
      if(data.success) setSubmitted(true);
      else setError("Something went wrong — please try again or email us directly.");
    } catch { setError("Network error — please check your connection."); }
    finally { setSubmitting(false); }
  };

  if(!plan) return null;
  const isDark = plan.color==="#111111";

  return (
    <div ref={overlayRef} onClick={e=>{ if(e.target===overlayRef.current) handleClose(); }}
      style={{
        position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:1000,
        width:"100vw",height:"100vh",
        display:"flex",alignItems:"center",justifyContent:"center",
        padding:"16px",
        background:"rgba(17,17,17,0.55)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",
        opacity:visible?1:0, transition:"opacity 0.18s ease",
        overflowY:"auto", WebkitOverflowScrolling:"touch", overscrollBehavior:"contain",
      }}>
      <div style={{
        width:"100%",maxWidth:540,background:"#fff",borderRadius:24,
        boxShadow:"0 32px 80px rgba(17,17,17,0.22),0 0 0 1px rgba(17,17,17,0.08)",
        overflow:"hidden",maxHeight:"min(92vh, 920px)",overflowY:"auto",margin:"0 auto",
        transform:visible?"scale(1) translateY(0)":"scale(0.95) translateY(14px)",
        transition:"transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.18s ease",
        opacity:visible?1:0, WebkitOverflowScrolling:"touch",
      }}>

        {/* Header */}
        <div style={{ background:"#111111", padding:"26px 28px 22px", position:"relative" }}>
          <button onClick={handleClose}
            style={{ position:"absolute",top:18,right:18,width:32,height:32,borderRadius:"50%",background:"rgba(255,255,255,0.1)",border:"none",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"rgba(255,255,255,0.7)",fontSize:15,transition:"background 0.2s",fontFamily:"inherit" }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.2)"}
            onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}>✕</button>
          <div style={{ display:"inline-flex",alignItems:"center",gap:7,background:"#F5E6A3",borderRadius:100,padding:"5px 14px",marginBottom:14 }}>
            <span style={{ width:6,height:6,borderRadius:"50%",background:"#111111",animation:"breathe 2s infinite" }} />
            <span style={{ fontSize:11,fontWeight:700,color:"#111111",letterSpacing:"0.5px" }}>{plan.name} Plan · {plan.rate} of collections</span>
          </div>
          <h2 style={{ fontSize:22,fontWeight:800,color:"#fff",letterSpacing:-0.5,lineHeight:1.25,marginBottom:6 }}>
            Get started with the<br/>{plan.name} Plan
          </h2>
          <p style={{ fontSize:13,color:"rgba(255,255,255,0.45)",lineHeight:1.6 }}>
            Our billing specialists will reach out within 2 business hours.
          </p>
        </div>

        {/* Body */}
        <div style={{ padding:"26px 28px 22px" }}>
          {submitted ? (
            <div style={{ textAlign:"center",padding:"16px 0 8px",animation:"modalFadeUp 0.4s ease" }}>
              <div style={{ width:72,height:72,borderRadius:"50%",background:"#F5E6A3",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,margin:"0 auto 18px",animation:"bounceIn 0.6s cubic-bezier(0.34,1.56,0.64,1)" }}>🎉</div>
              <h3 style={{ fontSize:22,fontWeight:800,color:"#111111",marginBottom:8,letterSpacing:-0.5 }}>Request received!</h3>
              <p style={{ fontSize:14.5,color:"#666",lineHeight:1.75,marginBottom:20 }}>
                Thanks, <strong>{form.name.split(" ")[0]}</strong>! A certified billing specialist will contact you at <strong>{form.email}</strong> within 2 business hours to begin your free audit.
              </p>
              <div style={{ display:"inline-flex",alignItems:"center",gap:7,background:"#F5F0E8",border:"1px solid rgba(17,17,17,0.08)",borderRadius:100,padding:"9px 18px",marginBottom:20 }}>
                <span>🔒</span>
                <span style={{ fontSize:12,color:"#555",fontWeight:600 }}>100% HIPAA Compliant & Secure</span>
              </div>
              <br/>
              <button onClick={handleClose}
                style={{ background:"#111111",color:"#fff",border:"none",padding:"13px 28px",borderRadius:100,fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",marginTop:8 }}>
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>

              {/* Row 1: Name + Practice */}
              <div className="modal-row" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
                <FloatInput label="Full Name" required value={form.name} onChange={v=>setForm({...form,name:v})} placeholder="Dr. Jane Smith" />
                <FloatInput label="Practice / Clinic Name" required value={form.practice} onChange={v=>setForm({...form,practice:v})} placeholder="Smith Family Practice" />
              </div>

              {/* Row 2: Email + Phone */}
              <div className="modal-row" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12 }}>
                <FloatInput label="Work Email" type="email" required value={form.email} onChange={v=>setForm({...form,email:v})} placeholder="jane@clinic.com" />
                <FloatInput label="Phone Number" type="tel" value={form.phone} onChange={v=>setForm({...form,phone:v})} placeholder="+1 (800) 000-0000" />
              </div>

              {/* Monthly Revenue — free text input */}
              <div style={{ marginBottom:12 }}>
                <FloatInput label="Your Monthly Revenue / Collections" type="text" required
                  value={form.revenue} onChange={v=>setForm({...form,revenue:v})}
                  placeholder="e.g. $150,000 / month" />
                <p style={{ fontSize:11,color:"#999",marginTop:5,marginLeft:2 }}>Enter your approximate monthly billing collections as a provider</p>
              </div>

              {/* Volume dropdown */}
              <div style={{ marginBottom:12 }}>
                <label htmlFor="billing-volume" style={{ fontSize:10,fontWeight:700,color:"rgba(17,17,17,0.4)",textTransform:"uppercase",letterSpacing:"0.8px",display:"block",marginBottom:6 }}>
                  Monthly Billing Volume Range *
                </label>
                <select id="billing-volume" required value={form.volume} onChange={e=>setForm({...form,volume:e.target.value})}
                  style={{ width:"100%",padding:"13px 14px",border:`1.5px solid ${form.volume?"rgba(17,17,17,0.12)":"rgba(17,17,17,0.12)"}`,borderRadius:11,fontSize:14,color:form.volume?"#111111":"#999",outline:"none",fontFamily:"inherit",background:"#FAFAFA",appearance:"none",cursor:"pointer",boxSizing:"border-box",transition:"border-color 0.2s,box-shadow 0.2s" }}
                  onFocus={e=>{ e.target.style.borderColor="#3B82F6"; e.target.style.boxShadow="0 0 0 3px rgba(59,130,246,0.12)"; }}
                  onBlur={e=>{  e.target.style.borderColor="rgba(17,17,17,0.12)"; e.target.style.boxShadow="none"; }}>
                  <option value="" disabled>Select your billing volume range</option>
                  {VOLUME_OPTIONS.map(o=>(
                    <option key={o.value} value={o.value}>{o.label} — Qualifies for {o.rate} rate</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div style={{ marginBottom:20 }}>
                <label style={{ fontSize:10,fontWeight:700,color:"rgba(17,17,17,0.4)",textTransform:"uppercase",letterSpacing:"0.8px",display:"block",marginBottom:6 }}>
                  Message / Billing Challenges <span style={{ fontWeight:400,textTransform:"none",letterSpacing:0 }}>(optional)</span>
                </label>
                <textarea rows={3}
                  placeholder="Tell us about your current billing challenges, denial rates, specialties, or any specific needs..."
                  value={form.message} onChange={e=>setForm({...form,message:e.target.value})}
                  style={{ width:"100%",padding:"13px 14px",border:"1.5px solid rgba(17,17,17,0.12)",borderRadius:11,fontSize:14,color:"#111111",outline:"none",resize:"vertical",fontFamily:"inherit",background:"#FAFAFA",transition:"border-color 0.2s,box-shadow 0.2s",boxSizing:"border-box" }}
                  onFocus={e=>{ e.target.style.borderColor="#3B82F6"; e.target.style.boxShadow="0 0 0 3px rgba(59,130,246,0.12)"; }}
                  onBlur={e=>{  e.target.style.borderColor="rgba(17,17,17,0.12)"; e.target.style.boxShadow="none"; }} />
              </div>

              {error && (
                <div style={{ background:"#FEF2F2",border:"1px solid rgba(220,38,38,0.2)",borderRadius:10,padding:"11px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:8 }}>
                  <span>⚠️</span>
                  <span style={{ fontSize:13,color:"#DC2626",fontWeight:500 }}>{error}</span>
                </div>
              )}

              <button type="submit" disabled={submitting}
                style={{ width:"100%",padding:"15px 20px",background:submitting?"#555":"#111111",color:"#fff",border:"none",borderRadius:100,fontSize:15,fontWeight:700,cursor:submitting?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,boxShadow:"0 4px 20px rgba(17,17,17,0.2)",transition:"transform 0.2s,box-shadow 0.2s",fontFamily:"inherit" }}
                onMouseEnter={e=>{ if(!submitting){e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 28px rgba(17,17,17,0.28)";} }}
                onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 20px rgba(17,17,17,0.2)"; }}
                onMouseDown={e=>{ if(!submitting) e.currentTarget.style.transform="scale(0.98)"; }}
                onMouseUp={e=>{ if(!submitting) e.currentTarget.style.transform="translateY(-2px)"; }}>
                {submitting ? (
                  <><span style={{ width:18,height:18,border:"2px solid rgba(255,255,255,0.3)",borderTop:"2px solid #fff",borderRadius:"50%",animation:"spin 0.8s linear infinite",display:"inline-block" }} /> Submitting...</>
                ) : (
                  <>Request Audit & Onboarding <span style={{ background:"#F5E6A3",color:"#111111",borderRadius:"50%",width:26,height:26,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800 }}>→</span></>
                )}
              </button>

              <div style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:6,marginTop:12 }}>
                <span style={{ fontSize:13 }}>🔒</span>
                <span style={{ fontSize:11.5,color:"rgba(17,17,17,0.4)",fontWeight:600 }}>100% HIPAA Compliant & Secure · No commitment required</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══ PRICING PREVIEW SECTION ══ */
function PricingPreview() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <section style={{ background:"#FDFAF5", padding:"80px 20px", position:"relative" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:60 }}>
            <SectionLabel text="Pricing" />
            <h2 style={{ fontSize:"clamp(26px,4vw,44px)", fontWeight:800, color:"#111111", letterSpacing:-1.5, marginBottom:14 }}>Performance-based pricing</h2>
            <p style={{ fontSize:16, color:"#666666", maxWidth:500, margin:"0 auto", lineHeight:1.8 }}>We only win when you do. No setup fees, no long-term contracts — just results.</p>
          </div>
        </Reveal>

        <div className="pricing-cards" style={{ display:"grid", gridTemplateColumns:"1fr", gap:22, maxWidth:720, margin:"0 auto" }}>
          {PRICING_TIERS.map((tier,i)=>(
            <Reveal key={i} delay={i*0.1} dir={i===1?"scale":"up"}>
              <div className="pricing-card" style={{
                background:tier.color, borderRadius:20, padding:"24px 20px",
                border:tier.popular?"2px solid #111111":"1px solid rgba(17,17,17,0.12)",
                boxShadow:tier.popular?"0 16px 34px rgba(17,17,17,0.14)":"0 2px 14px rgba(17,17,17,0.06)",
                display:"flex", flexDirection:"column", position:"relative",
                transition:"box-shadow 0.2s ease, transform 0.2s ease",
                cursor:"pointer",
              }}
                onClick={()=>setSelectedPlan(tier)}
                onKeyDown={(e)=>{ if(e.key==="Enter" || e.key === " ") { e.preventDefault(); setSelectedPlan(tier); } }}
                role="button"
                tabIndex={0}
                onMouseEnter={e=>{ if(!tier.popular){e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 8px 18px rgba(17,17,17,0.08)"; } }}
                onMouseLeave={e=>{ if(!tier.popular){e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 4px 20px rgba(17,17,17,0.05)"; } }}>

                {tier.popular && (
                  <div style={{ position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",background:"#111111",color:"#F5E6A3",fontSize:11,fontWeight:800,letterSpacing:1.5,textTransform:"uppercase",padding:"6px 18px",borderRadius:100,whiteSpace:"nowrap" }}>
                    Most Popular
                  </div>
                )}

                <div style={{ marginBottom:18 }}>
                  {/* Badge */}
                  <div style={{ display:"inline-flex",alignItems:"center",gap:5,background:tier.popular?"rgba(245,230,163,0.14)":"rgba(17,17,17,0.06)",borderRadius:100,padding:"4px 12px",marginBottom:10 }}>
                    <span style={{ fontSize:10,fontWeight:700,color:tier.accent,opacity:0.78,letterSpacing:"0.4px" }}>{tier.badge}</span>
                  </div>
                  <h3 style={{ fontSize:18,fontWeight:800,color:tier.accent,marginBottom:8 }}>{tier.name}</h3>
                  <div style={{ fontSize:36,fontWeight:900,color:tier.accent,letterSpacing:-1.2,lineHeight:1.1,marginBottom:6 }}>
                    {tier.rate}
                    <span style={{ fontSize:12,fontWeight:500,opacity:0.65 }}> of collections</span>
                  </div>
                  <p style={{ fontSize:14,color:tier.accent,opacity:0.72,lineHeight:1.6,margin:0 }}>{tier.desc}</p>
                </div>

                <div style={{ flex:1,display:"flex",flexDirection:"column",gap:10,marginBottom:22 }}>
                  {tier.features.map((f,j)=>(
                    <div key={j} style={{ display:"flex",alignItems:"flex-start",gap:10 }}>
                      <div style={{ width:18,height:18,borderRadius:"50%",background:tier.popular?"#F5E6A3":"#F5F0E8",border:`1.5px solid ${tier.popular?"rgba(245,230,163,0.5)":"rgba(17,17,17,0.12)"}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:3 }}>
                        <span style={{ fontSize:9,fontWeight:800,color:"#111111" }}>✓</span>
                      </div>
                      <span style={{ fontSize:13,color:tier.accent,opacity:0.85 }}>{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA — opens modal */}
                <button type="button" onClick={(e)=>{ e.stopPropagation(); setSelectedPlan(tier); }}
                  style={{
                    display:"block", width:"100%", textAlign:"center", border:"none", cursor:"pointer",
                    background:tier.popular?"#F5E6A3":tier.color==="#111111"?"rgba(255,255,255,0.14)":"#111111",
                    color:tier.popular?"#111111":tier.color==="#111111"?"#fff":"#fff",
                    outline:tier.popular?"none":tier.color==="#111111"?"1.5px solid rgba(255,255,255,0.2)":"none",
                    padding:"12px 18px", borderRadius:100, fontSize:14, fontWeight:700,
                    boxShadow:tier.popular?"0 4px 20px rgba(245,230,163,0.22)":"none",
                    fontFamily:"inherit",
                    transition:"transform 0.16s ease, box-shadow 0.16s ease",
                  }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow=tier.popular?"0 6px 18px rgba(245,230,163,0.4)":"0 6px 16px rgba(17,17,17,0.16)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow=tier.popular?"0 4px 20px rgba(245,230,163,0.3)":"none"; }}
                  onMouseDown={e=>e.currentTarget.style.transform="scale(0.99)"}
                  onMouseUp={e=>e.currentTarget.style.transform="translateY(-1px)"}>
                  {tier.cta} →
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <ViewMoreBtn href="/pricing" label="See Full Pricing Details" />
      </div>

      {/* Modal */}
      <PricingModal plan={selectedPlan} onClose={()=>setSelectedPlan(null)} />
    </section>
  );
}

/* ══ FAQ ══ */
const FAQS = [
  { q:"What does the onboarding process look like?",           a:"Most practices are fully integrated within 5–7 business days. We handle EHR setup, payer configuration, and staff orientation with zero disruption to your active workflows." },
  { q:"Do you support multi-specialty practices?",             a:"Yes. MedCare handles 40+ specialties — from primary care to cardiology, orthopedics, mental health, and more. Each gets a specialist who knows its specific payer rules." },
  { q:"How is patient data protected?",                        a:"All patient data is encrypted end-to-end and stored on HIPAA-compliant infrastructure. We sign a BAA with every client before work begins — no exceptions." },
  { q:"What does your pricing look like?",                     a:"We use performance-based pricing — a percentage of your monthly collections. Rates range from 4.99% (small practices) down to 1.99% (high-volume groups). No setup fees." },
];

function FAQ() {
  const { ref, visible } = useReveal(0.1);
  const [open, setOpen] = useState(null);
  return (
    <section ref={ref} style={{ background:"#F5F0E8", padding:"100px 20px" }}>
      <div style={{ maxWidth:760, margin:"0 auto" }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:52 }}>
            <SectionLabel text="Knowledge Base" />
            <h2 style={{ fontSize:"clamp(24px,4vw,42px)", fontWeight:800, color:"#111111", letterSpacing:-1.5 }}>Common questions</h2>
          </div>
        </Reveal>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {FAQS.map((f,i)=>(
            <Reveal key={i} delay={0.04+i*0.07}>
              <div style={{ background:"#fff", border:`1.5px solid ${open===i?"#111111":"rgba(17,17,17,0.08)"}`, borderRadius:16, overflow:"hidden", boxShadow:"0 4px 20px rgba(17,17,17,0.03)", transition:"border-color 0.25s" }}>
                <button onClick={()=>setOpen(open===i?null:i)} style={{ width:"100%", background:"none", border:"none", padding:"22px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", textAlign:"left", gap:12 }}>
                  <span style={{ fontSize:15, fontWeight:800, color:"#111111", flex:1 }}>{f.q}</span>
                  <div style={{ width:32, height:32, borderRadius:"50%", background:open===i?"#111111":"#F5F0E8", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.3s" }}>
                    <span style={{ fontSize:20, color:open===i?"#F5E6A3":"#111111", transform:open===i?"rotate(45deg)":"rotate(0)", display:"block", lineHeight:1, transition:"transform 0.3s" }}>+</span>
                  </div>
                </button>
                <div style={{ maxHeight:open===i?"300px":"0px", opacity:open===i?1:0, overflow:"hidden", transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)", borderTop:open===i?"1px solid rgba(17,17,17,0.06)":"none" }}>
                  <p style={{ fontSize:14, color:"#555555", lineHeight:1.8, padding:"18px 22px 22px" }}>{f.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <ViewMoreBtn href="/faq" label="View All FAQs" />
      </div>
    </section>
  );
}

/* ══ CTA BANNER ══ */
function CTABanner() {
  const { ref, visible } = useReveal(0.15);
  return (
    <section ref={ref} style={{ background:"#111111", padding:"100px 20px", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"-10%", right:"-10%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,230,163,0.15),transparent 65%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-10%", left:"-5%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,230,163,0.08),transparent 65%)", pointerEvents:"none" }} />
      <div style={{ maxWidth:720, margin:"0 auto", textAlign:"center", position:"relative", zIndex:2, opacity:visible?1:0, transform:visible?"translateY(0) scale(1)":"translateY(40px) scale(0.98)", transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ display:"inline-block", background:"#F5E6A3", borderRadius:100, padding:"6px 20px", fontSize:11, fontWeight:800, color:"#111111", letterSpacing:2, textTransform:"uppercase", marginBottom:24 }}>Free — No Obligation</div>
        <h2 style={{ fontSize:"clamp(26px,4.5vw,50px)", fontWeight:800, color:"#fff", letterSpacing:-2, marginBottom:18, lineHeight:1.1 }}>Ready to recover your outstanding revenue?</h2>
        <p style={{ fontSize:16, color:"rgba(255,255,255,0.5)", lineHeight:1.8, marginBottom:40, maxWidth:540, margin:"0 auto 40px" }}>
          Get a free billing audit — we'll identify exactly where you're losing revenue and show you how to fix it.
        </p>
        <div className="cta-buttons" style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
          <Link href="/contact" style={{ background:"#F5E6A3", color:"#111111", padding:"16px 32px", borderRadius:100, fontSize:15, fontWeight:800, display:"inline-flex", alignItems:"center", gap:8, boxShadow:"0 10px 30px rgba(245,230,163,0.2)" }}>
            Get Free Billing Audit →
          </Link>
          <Link href="/pricing" style={{ background:"transparent", color:"#fff", padding:"16px 28px", borderRadius:100, fontSize:15, fontWeight:600, border:"1.5px solid rgba(255,255,255,0.2)", display:"inline-block" }}>
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ══ CONTACT ══ */
function Contact() {
  const { ref, visible } = useReveal(0.1);
  const [form, setForm] = useState({ name:"", email:"", practice:"", phone:"", service:"", message:"" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError("Something went wrong — please try again or email us directly at info@medcarercm.com");
      }
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setError("");
    setForm({ name:"", email:"", practice:"", phone:"", service:"", message:"" });
  };

  return (
    <section ref={ref} style={{ background:"#FDFAF5", padding:"100px 20px" }}>
      <div style={{ maxWidth:720, margin:"0 auto", opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(40px)", transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <SectionLabel text="Secure Communications" />
          <h2 style={{ fontSize:"clamp(24px,4vw,42px)", fontWeight:800, color:"#111111", letterSpacing:-1.5 }}>Request an Executive Strategy Panel</h2>
        </div>
        {submitted ? (
          <div style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:24, padding:"56px 32px", textAlign:"center", boxShadow:"0 10px 40px rgba(17,17,17,0.03)" }}>
            <div style={{ width:60, height:60, borderRadius:"50%", background:"#F5E6A3", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, margin:"0 auto 20px" }}>✅</div>
            <h3 style={{ fontSize:22, fontWeight:800, color:"#111111", marginBottom:10 }}>Message Received!</h3>
            <p style={{ fontSize:15, color:"#666666", lineHeight:1.6 }}>
              Thanks, <strong>{form.name.split(" ")[0] || "there"}</strong>! Our team will contact you within one business day.
            </p>
            <button onClick={resetForm} style={{ marginTop:22, background:"transparent", color:"#111111", border:"1.5px solid rgba(17,17,17,0.2)", padding:"12px 20px", borderRadius:100, fontSize:14, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.06)", borderRadius:24, padding:"40px 32px", boxShadow:"0 10px 50px rgba(17,17,17,0.02)" }}>
            <div style={{ display:"grid", gap:18 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                <div>
                  <label style={{ fontSize:12, fontWeight:800, color:"#111111", display:"block", marginBottom:7, textTransform:"uppercase", letterSpacing:"0.5px" }}>Full Name</label>
                  <input type="text" placeholder="Dr. Jane Smith" required value={form.name}
                    onChange={e=>setForm({...form, name:e.target.value})}
                    style={{ width:"100%", padding:"13px 16px", border:"1.5px solid rgba(17,17,17,0.1)", borderRadius:12, fontSize:14, color:"#111111", outline:"none", fontFamily:"inherit", background:"#FDFAF5", transition:"all 0.25s" }}
                    onFocus={e=>{e.target.style.borderColor="#111111"; e.target.style.background="#fff";}}
                    onBlur={e=>{e.target.style.borderColor="rgba(17,17,17,0.1)"; e.target.style.background="#FDFAF5";}} />
                </div>
                <div>
                  <label style={{ fontSize:12, fontWeight:800, color:"#111111", display:"block", marginBottom:7, textTransform:"uppercase", letterSpacing:"0.5px" }}>Practice Name</label>
                  <input type="text" placeholder="Smith Family Practice" required value={form.practice}
                    onChange={e=>setForm({...form, practice:e.target.value})}
                    style={{ width:"100%", padding:"13px 16px", border:"1.5px solid rgba(17,17,17,0.1)", borderRadius:12, fontSize:14, color:"#111111", outline:"none", fontFamily:"inherit", background:"#FDFAF5", transition:"all 0.25s" }}
                    onFocus={e=>{e.target.style.borderColor="#111111"; e.target.style.background="#fff";}}
                    onBlur={e=>{e.target.style.borderColor="rgba(17,17,17,0.1)"; e.target.style.background="#FDFAF5";}} />
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                <div>
                  <label style={{ fontSize:12, fontWeight:800, color:"#111111", display:"block", marginBottom:7, textTransform:"uppercase", letterSpacing:"0.5px" }}>Email Address</label>
                  <input type="email" placeholder="jane@clinic.com" required value={form.email}
                    onChange={e=>setForm({...form, email:e.target.value})}
                    style={{ width:"100%", padding:"13px 16px", border:"1.5px solid rgba(17,17,17,0.1)", borderRadius:12, fontSize:14, color:"#111111", outline:"none", fontFamily:"inherit", background:"#FDFAF5", transition:"all 0.25s" }}
                    onFocus={e=>{e.target.style.borderColor="#111111"; e.target.style.background="#fff";}}
                    onBlur={e=>{e.target.style.borderColor="rgba(17,17,17,0.1)"; e.target.style.background="#FDFAF5";}} />
                </div>
                <div>
                  <label style={{ fontSize:12, fontWeight:800, color:"#111111", display:"block", marginBottom:7, textTransform:"uppercase", letterSpacing:"0.5px" }}>Phone Number</label>
                  <input type="tel" placeholder="+1 (800) 000-0000" value={form.phone}
                    onChange={e=>setForm({...form, phone:e.target.value})}
                    style={{ width:"100%", padding:"13px 16px", border:"1.5px solid rgba(17,17,17,0.1)", borderRadius:12, fontSize:14, color:"#111111", outline:"none", fontFamily:"inherit", background:"#FDFAF5", transition:"all 0.25s" }}
                    onFocus={e=>{e.target.style.borderColor="#111111"; e.target.style.background="#fff";}}
                    onBlur={e=>{e.target.style.borderColor="rgba(17,17,17,0.1)"; e.target.style.background="#FDFAF5";}} />
                </div>
              </div>

              <div>
                <label htmlFor="service-interest" style={{ fontSize:12, fontWeight:800, color:"#111111", display:"block", marginBottom:7, textTransform:"uppercase", letterSpacing:"0.5px" }}>Service Interested In</label>
                <select id="service-interest" required value={form.service} onChange={e=>setForm({...form, service:e.target.value})}
                  style={{ width:"100%", padding:"13px 16px", border:"1.5px solid rgba(17,17,17,0.1)", borderRadius:12, fontSize:14, color:"#111111", outline:"none", fontFamily:"inherit", background:"#FDFAF5", transition:"all 0.25s" }}>
                  <option value="" disabled>Select a service</option>
                  <option value="Medical Billing">Medical Billing</option>
                  <option value="Revenue Cycle Management">Revenue Cycle Management</option>
                  <option value="Denial Management">Denial Management</option>
                  <option value="AR Recovery">AR Recovery</option>
                  <option value="Provider Credentialing">Provider Credentialing</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize:12, fontWeight:800, color:"#111111", display:"block", marginBottom:7, textTransform:"uppercase", letterSpacing:"0.5px" }}>Message</label>
                <textarea placeholder="Tell us about your billing challenges..." rows={4} required value={form.message}
                  onChange={e=>setForm({...form, message:e.target.value})}
                  style={{ width:"100%", padding:"13px 16px", border:"1.5px solid rgba(17,17,17,0.1)", borderRadius:12, fontSize:14, color:"#111111", outline:"none", resize:"vertical", fontFamily:"inherit", background:"#FDFAF5" }}
                  onFocus={e=>{e.target.style.borderColor="#111111"; e.target.style.background="#fff";}}
                  onBlur={e=>{e.target.style.borderColor="rgba(17,17,17,0.1)"; e.target.style.background="#FDFAF5";}} />
              </div>

              {error && (
                <div style={{ background:"#FEF2F2", border:"1px solid rgba(220,38,38,0.2)", borderRadius:12, padding:"12px 16px", fontSize:13, color:"#DC2626" }}>
                  {error}
                </div>
              )}

              <button type="submit" disabled={submitting} style={{ width:"100%", background:submitting?"#444":"#111111", color:"#fff", border:"none", padding:"16px", borderRadius:100, fontSize:15, fontWeight:700, cursor:submitting?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10, boxShadow:"0 4px 20px rgba(17,17,17,0.15)", transition:"transform 0.2s" }}
                onMouseEnter={e=>{ if(!submitting) e.currentTarget.style.transform="translateY(-1px)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; }}>
                {submitting ? "Sending..." : "Send Message"}
                <span style={{ background:"#F5E6A3", color:"#111111", borderRadius:"50%", width:26, height:26, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800 }}>→</span>
              </button>
            </div>
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
        <Specialties />
        <WhyUs />
        <Testimonials />
        <PricingPreview />
        <FAQ />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
