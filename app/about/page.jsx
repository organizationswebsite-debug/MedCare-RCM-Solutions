"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

/* ══ HOOKS ══ */
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

function useCountUp(target, duration = 1800, active = false, suffix = "") {
  const [val, setVal] = useState("0");
  useEffect(() => {
    if (!active) return;
    const s = Date.now();
    const isFloat = String(target).includes(".");
    const tick = () => {
      const p = Math.min((Date.now() - s) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      const v = isFloat ? (e * target).toFixed(1) : Math.round(e * target);
      setVal(v + suffix);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active]);
  return val;
}

function Reveal({ children, delay = 0, dir = "up" }) {
  const { ref, visible } = useReveal();
  const t = { up:"translateY(36px)", left:"translateX(-36px)", right:"translateX(36px)", scale:"scale(0.94)" };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : t[dir],
      transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ text, light = false }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:16 }}>
      <div style={{ width:32, height:2, background: light ? "#F5E6A3" : "#111111", borderRadius:2 }} />
      <p style={{ fontSize:11, fontWeight:800, color: light ? "#F5E6A3" : "#111111", letterSpacing:"3px", textTransform:"uppercase" }}>{text}</p>
    </div>
  );
}

/* ══ DATA ══ */
const MILESTONES = [
  { year:"2020", icon:"🚀", title:"Founded",            desc:"MedCare RCM Solutions launched as a subsidiary of Moaz Group of Companies with a mission to transform healthcare billing." },
  { year:"2021", icon:"🏥", title:"100+ Providers",     desc:"Reached our first 100 provider milestone across 10 specialties in under 12 months of operations." },
  { year:"2022", icon:"💰", title:"$10M Recovered",     desc:"Crossed $10 million in recovered revenue for clients through denial appeals and systematic A/R recovery." },
  { year:"2023", icon:"🌍", title:"40+ Specialties",    desc:"Expanded specialty coverage to over 40 clinical disciplines, serving providers in all 50 US states." },
  { year:"2024", icon:"⭐", title:"500+ Providers",     desc:"Surpassed 500 active providers and $50M+ in total revenue recovered — with a 98% client retention rate." },
  { year:"2025", icon:"🔬", title:"AI-Assisted RCM",   desc:"Launched AI-assisted claim scrubbing and denial prediction tools, pushing first-pass rates above 98%." },
];

const VALUES = [
  { icon:"🎯", title:"Accuracy First",           desc:"We treat every claim like it's the only one. Clean submissions, precise coding, zero shortcuts — ever." },
  { icon:"🤝", title:"Partnership Mindset",       desc:"We're not a vendor — we're an extension of your team. Your revenue is our responsibility." },
  { icon:"🔒", title:"Uncompromising Compliance", desc:"HIPAA compliance isn't a checkbox. It's built into every workflow, system, and employee we operate." },
  { icon:"📢", title:"Radical Transparency",      desc:"Every metric, every report, every insight shared openly. No hidden numbers, no surprises." },
  { icon:"⚡", title:"Speed Without Sacrifice",   desc:"24-hour claim submission, 48-hour denial appeals — speed that never comes at the cost of accuracy." },
  { icon:"🚀", title:"Continuous Improvement",    desc:"Every process is a draft. We review, measure, and improve constantly — driven by data and client feedback." },
];

const TEAM = [
  {
    slug: "moazzam-founder",
    name: "Moazzam",
    role: "Founder & CEO",
    dept: "Administration",
    initials: "MZ",
    img: "/photo.png",
    expertise: ["Revenue Cycle Strategy","Business Development","Healthcare Operations","Team Leadership"],
    bio: "Founder of Moaz Group of Companies with a decade of experience building healthcare solutions. Moazzam launched MedCare RCM to give providers a billing partner they can genuinely trust — one that fights for every dollar they've earned.",
  },
  {
    slug: "operations-lead",
    name: "jhon Doe",
    role: "Head of Billing Operations",
    dept: "Operations",
    initials: "SM",
    img: "https://images.unsplash.com/photo-1713946598467-fcf9332c56ea?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fit=crop&crop=face",
    expertise: ["Medical Billing","Claims Management","Denial Management","E&M Coding"],
    bio: "CPC-certified billing specialist with 12+ years of multi-specialty billing experience. Sarah leads a team of 20+ billing professionals, maintaining our 98%+ first-pass claim rate across all client portfolios.",
  },
  {
    slug: "compliance-officer",
    name: "James Holloway",
    role: "HIPAA & Compliance Officer",
    dept: "Compliance",
    initials: "JH",
    img: "https://images.unsplash.com/photo-1562788869-4ed32648eb72?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fit=crop&crop=face",
    expertise: ["HIPAA Compliance","Data Security","Audit Management","Regulatory Affairs"],
    bio: "Certified HIPAA compliance professional ensuring every process, system, and employee at MedCare RCM meets the highest standards of data security and regulatory compliance.",
  },
  {
    slug: "ar-recovery-lead",
    name: "Filip Carter",
    role: "A/R Recovery Lead",
    dept: "Revenue Recovery",
    initials: "PN",
    img: "https://images.unsplash.com/photo-1733348137468-90b917d2ebf1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D&fit=crop&crop=face",
    expertise: ["Denial Appeals","AR Recovery","Payer Negotiation","Collections Strategy"],
    bio: "Priya leads our denial management and A/R recovery division with a 70%+ first-level appeal success rate. She has personally recovered over $15M in previously written-off revenue for MedCare clients.",
  },
  {
    slug: "credentialing-manager",
    name: "Marcus Webb",
    role: "Credentialing Manager",
    dept: "Provider Services",
    initials: "MW",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fit=crop&crop=face",
    expertise: ["Provider Enrollment","CAQH Management","Medicare Credentialing","Payer Relations"],
    bio: "Marcus manages provider credentialing and payer enrollment for 500+ providers, ensuring zero billing delays for new and re-credentialing providers across Medicare, Medicaid, and all major commercial payers.",
  },
  {
    slug: "analytics-lead",
    name: "Linda Torres",
    role: "Analytics & Reporting Lead",
    dept: "Data & Analytics",
    initials: "LT",
    img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80&fit=crop&crop=face",
    expertise: ["Revenue Analytics","KPI Reporting","Data Visualization","Business Intelligence"],
    bio: "Linda designs and maintains MedCare's live KPI dashboards and monthly executive reports. She transforms complex billing data into plain-language insights that drive measurable improvements for every client.",
  },
];

const STATS = [
  { val:"500", suffix:"+",  label:"Providers Served",      icon:"🏥" },
  { val:"98",  suffix:"%",  label:"Client Retention Rate", icon:"🤝" },
  { val:"50",  suffix:"M+", label:"Revenue Recovered",     icon:"💰" },
  { val:"40",  suffix:"+",  label:"Specialties Covered",   icon:"🔬" },
];

/* ══════════════════════════════════
   PAGE
══════════════════════════════════ */
export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const statsReveal = useReveal(0.2);
  const timelineReveal = useReveal(0.1);

  const s1 = useCountUp(500, 1800, statsReveal.visible, "+");
  const s2 = useCountUp(98,  1600, statsReveal.visible, "%");
  const s3 = useCountUp(50,  1800, statsReveal.visible, "M+");
  const s4 = useCountUp(40,  1600, statsReveal.visible, "+");
  const statVals = [s1, s2, s3, s4];

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);
  const rise = (d = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.7s ease ${d}s, transform 0.7s ease ${d}s`,
  });

  return (
    <>
      <Navbar />
      <main style={{ overflowX:"hidden" }}>

        {/* ══ HERO ══ */}
        <section style={{ position:"relative", minHeight:"88vh", display:"flex", alignItems:"center", overflow:"hidden", isolation:"isolate" }}>
          {/* Background image */}
          <div style={{ position:"absolute", inset:0, zIndex:-2, backgroundImage:"url('/aboutushero.jpeg')", backgroundSize:"cover", backgroundPosition:"center", backgroundAttachment: "fixed" }} />
          {/* Animated dot grid */}
          <div style={{ position:"absolute", inset:0, zIndex:-1, backgroundImage:"radial-gradient(circle,rgba(245,240,232,0.1) 1.5px,transparent 1.5px)", backgroundSize:"38px 38px", animation:"dotsShift 28s linear infinite", pointerEvents:"none" , willChange:"transform" }} />
          {/* Gradient overlay */}
          <div style={{ position:"absolute", inset:0, zIndex:-1, background:"linear-gradient(110deg,rgba(245,240,232,0.97) 0%,rgba(245,240,232,0.93) 40%,rgba(17,17,17,0.65) 100%)" }} className="about-hero-overlay" />
          {/* Glow blobs */}
          <div style={{ position:"absolute", top:-80, right:-80, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,230,163,0.25),transparent 65%)", zIndex:-1, pointerEvents:"none" }} />

          <div style={{ maxWidth:1160, margin:"0 auto", padding:"140px 24px 90px", width:"100%", display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }} className="hero-grid">

            {/* LEFT */}
            <div>
              <div style={{ ...rise(0.05), display:"inline-flex", alignItems:"center", gap:8, background:"#F5E6A3", border:"1px solid rgba(17,17,17,0.15)", borderRadius:100, padding:"7px 18px", marginBottom:24 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"#111111", animation:"breathe 2s infinite" , willChange:"transform" }} />
                <span style={{ fontSize:12, fontWeight:700, color:"#111111", letterSpacing:1.2 }}>About MedCare RCM Solutions</span>
              </div>
              <h1 style={{ ...rise(0.15), fontSize:"clamp(34px,5vw,60px)", fontWeight:800, color:"#111111", lineHeight:1.08, letterSpacing:-2, marginBottom:22 }}>
                Built to fix what's<br/>
                broken in healthcare<br/>
                <span style={{ borderBottom:"3px solid #F5E6A3", paddingBottom:3 }}>billing.</span>
              </h1>
              <p style={{ ...rise(0.28), fontSize:17, color:"#444444", lineHeight:1.8, marginBottom:36, maxWidth:480 }}>
                MedCare RCM Solutions was founded with one mission: give healthcare providers a billing partner they can actually trust — one that fights for every dollar they've earned, every single day.
              </p>
              <div style={{ ...rise(0.4), display:"flex", gap:12, flexWrap:"wrap" }}>
                <Link href="/contact" style={{ background:"#111111", color:"#fff", padding:"15px 28px", borderRadius:100, fontSize:15, fontWeight:700, display:"inline-flex", alignItems:"center", gap:8, boxShadow:"0 6px 24px rgba(17,17,17,0.22)", transition:"transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 12px 32px rgba(17,17,17,0.3)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 24px rgba(17,17,17,0.22)"; }}>
                  Work with us
                  <span style={{ background:"#F5E6A3", color:"#111111", borderRadius:"50%", width:26, height:26, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800 }}>→</span>
                </Link>
                <Link href="/careers" style={{ background:"transparent", color:"#111111", padding:"15px 26px", borderRadius:100, fontSize:15, fontWeight:600, border:"1.5px solid rgba(17,17,17,0.22)", display:"inline-block", transition:"all 0.2s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="rgba(17,17,17,0.04)"; e.currentTarget.style.borderColor="#111111"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="rgba(17,17,17,0.22)"; }}>
                  Join our team
                </Link>
              </div>
            </div>

            {/* RIGHT — floating info cards */}
            <div style={{ position:"relative", height:400, ...rise(0.3) }} className="hero-cards">
              {/* Main card */}
              <div style={{ position:"absolute", top:20, left:"5%", width:"80%", background:"#fff", borderRadius:22, padding:"28px 28px", boxShadow:"0 24px 60px rgba(17,17,17,0.14)", border:"1px solid rgba(17,17,17,0.1)", animation:"floatA 6s ease-in-out infinite", zIndex:3 , willChange:"transform" }}>
                <div style={{ fontSize:12, fontWeight:700, color:"#999999", textTransform:"uppercase", letterSpacing:1.5, marginBottom:16 }}>Our Mission</div>
                <p style={{ fontSize:15, color:"#111111", lineHeight:1.75, fontWeight:500 }}>
                  "To maximize revenue for every healthcare provider we serve — through certified expertise, relentless accuracy, and total transparency."
                </p>
                <div style={{ marginTop:18, display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:"#111111", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color:"#F5E6A3" }}>MZ</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:"#111111" }}>Moazzam — Founder & CEO</div>
                    <div style={{ fontSize:11, color:"#888888" }}>Moaz Group of Companies</div>
                  </div>
                </div>
              </div>
              {/* Bottom right badge */}
              <div style={{ position:"absolute", bottom:20, right:0, background:"#F5E6A3", borderRadius:18, padding:"18px 22px", boxShadow:"0 12px 32px rgba(17,17,17,0.12)", animation:"floatB 7s ease-in-out infinite", zIndex:4 , willChange:"transform" }}>
                <div style={{ fontSize:28, fontWeight:900, color:"#111111", letterSpacing:-1 }}>$50M+</div>
                <div style={{ fontSize:12, color:"rgba(17,17,17,0.6)", fontWeight:600 }}>Revenue Recovered</div>
              </div>
              {/* Bottom left */}
              <div style={{ position:"absolute", bottom:10, left:0, background:"#111111", borderRadius:16, padding:"14px 18px", animation:"floatC 5.5s ease-in-out infinite", zIndex:3 , willChange:"transform" }}>
                <div style={{ fontSize:13, fontWeight:700, color:"#F5E6A3" }}>🔒 HIPAA Certified</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", marginTop:3 }}>100% Compliant</div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS BAR ══ */}
        <section ref={statsReveal.ref} style={{ background:"#111111", padding:"56px 24px" }}>
          <div className="stats-grid" style={{ maxWidth:1000, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24, textAlign:"center" }}>
            {STATS.map((s,i)=>(
              <div key={i} style={{ opacity:statsReveal.visible?1:0, transform:statsReveal.visible?"translateY(0)":"translateY(24px)", transition:`all 0.6s ease ${i*0.1}s` }}>
                <div style={{ fontSize:24, marginBottom:8 }}>{s.icon}</div>
                <div style={{ fontSize:"clamp(28px,4vw,40px)", fontWeight:800, color:"#F5E6A3", letterSpacing:-1 }}>{statVals[i]}</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:5, fontWeight:600, textTransform:"uppercase", letterSpacing:1 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ STORY SPLIT ══ */}
        <section style={{ background:"#FDFAF5", padding:"100px 24px" }}>
          <div className="split-grid" style={{ maxWidth:1160, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
            <Reveal dir="left">
              <div style={{ position:"relative", borderRadius:28, overflow:"hidden", aspectRatio:"4/3" }}>
                <img loading="lazy" src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fit=crop" alt="Our story" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(17,17,17,0.55),transparent 55%)" }} />
                <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"24px 28px" }}>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"#F5E6A3", borderRadius:100, padding:"7px 16px" }}>
                    <span style={{ fontSize:12, fontWeight:700, color:"#111111" }}>🏢 Subsidiary of Moaz Group of Companies</span>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal dir="right" delay={0.1}>
              <SectionLabel text="Our Story" />
              <h2 style={{ fontSize:"clamp(26px,3.5vw,40px)", fontWeight:800, color:"#111111", letterSpacing:-1, marginBottom:20, lineHeight:1.2 }}>
                Founded to fight for every dollar you've earned
              </h2>
              <p style={{ fontSize:15.5, color:"#555555", lineHeight:1.85, marginBottom:18 }}>
                MedCare RCM Solutions was born from a frustration Moazzam observed firsthand: healthcare providers across the United States were losing millions in legitimate revenue — not because they weren't working hard, but because the billing system was working against them.
              </p>
              <p style={{ fontSize:15.5, color:"#555555", lineHeight:1.85, marginBottom:28 }}>
                As a subsidiary of Moaz Group of Companies, we launched MedCare RCM with enterprise-grade infrastructure, certified billing professionals, and a single-minded commitment to maximizing revenue for every provider we serve.
              </p>
              {["Founded as a USA-based, HIPAA-certified RCM company","Serving 500+ providers across 40+ specialties","$50M+ in recovered revenue and counting","98%+ first-pass rate — consistently"].map((pt,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:11 }}>
                  <div style={{ width:22, height:22, borderRadius:"50%", background:"#F5E6A3", border:"1.5px solid rgba(17,17,17,0.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <span style={{ fontSize:11, fontWeight:800, color:"#111111" }}>✓</span>
                  </div>
                  <span style={{ fontSize:14, color:"#333333", fontWeight:500 }}>{pt}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ══ VISION & MISSION ══ */}
        <section style={{ background:"#111111", padding:"100px 24px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-100, right:-100, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,230,163,0.1),transparent 65%)", pointerEvents:"none" }} />
          <div style={{ maxWidth:1160, margin:"0 auto" }}>
            <Reveal>
              <div style={{ textAlign:"center", marginBottom:56 }}>
                <SectionLabel text="Vision & Mission" light />
                <h2 style={{ fontSize:"clamp(26px,4vw,44px)", fontWeight:800, color:"#fff", letterSpacing:-1 }}>What drives us forward</h2>
              </div>
            </Reveal>
            <div className="vm-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
              {[
                {
                  icon:"🔭", label:"Our Vision",
                  title:"To be the most trusted RCM partner in American healthcare",
                  desc:"We envision a healthcare system where no provider loses revenue due to billing errors, claim denials, or administrative complexity. MedCare RCM exists to make that vision a reality — one practice at a time.",
                  points:["Full revenue capture for every provider","Zero billing delays nationwide","Transparent, data-driven partnerships"],
                  bg:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.1)",
                },
                {
                  icon:"🎯", label:"Our Mission",
                  title:"Maximize revenue for every healthcare provider we serve",
                  desc:"Our mission is simple: fight for every dollar our clients have earned. We do this through certified expertise, relentless accuracy, cutting-edge technology, and a genuine commitment to each provider's long-term financial health.",
                  points:["98%+ first-pass rates on every claim","48-hour denial appeal turnaround","Complete billing transparency always"],
                  bg:"rgba(245,230,163,0.08)", border:"rgba(245,230,163,0.25)",
                },
              ].map((card,i)=>(
                <Reveal key={i} delay={i*0.1} dir={i===0?"left":"right"}>
                  <div style={{ background:card.bg, border:`1px solid ${card.border}`, borderRadius:24, padding:"36px 34px", height:"100%" }}>
                    <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.08)", borderRadius:100, padding:"6px 14px", marginBottom:20 }}>
                      <span style={{ fontSize:16 }}>{card.icon}</span>
                      <span style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.7)", letterSpacing:1.5, textTransform:"uppercase" }}>{card.label}</span>
                    </div>
                    <h3 style={{ fontSize:22, fontWeight:800, color:"#fff", letterSpacing:-0.5, marginBottom:16, lineHeight:1.3 }}>{card.title}</h3>
                    <p style={{ fontSize:14.5, color:"rgba(255,255,255,0.5)", lineHeight:1.8, marginBottom:24 }}>{card.desc}</p>
                    {card.points.map((pt,j)=>(
                      <div key={j} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                        <div style={{ width:20, height:20, borderRadius:"50%", background:"#F5E6A3", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <span style={{ fontSize:10, fontWeight:800, color:"#111111" }}>✓</span>
                        </div>
                        <span style={{ fontSize:13.5, color:"rgba(255,255,255,0.65)", fontWeight:500 }}>{pt}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TIMELINE ══ */}
        <section ref={timelineReveal.ref} style={{ background:"#F5F0E8", padding:"100px 24px" }}>
          <div style={{ maxWidth:900, margin:"0 auto" }}>
            <Reveal>
              <div style={{ textAlign:"center", marginBottom:64 }}>
                <SectionLabel text="Our Journey" />
                <h2 style={{ fontSize:"clamp(26px,4vw,44px)", fontWeight:800, color:"#111111", letterSpacing:-1 }}>How we got here</h2>
              </div>
            </Reveal>
            <div style={{ position:"relative" }}>
              {/* Vertical line */}
              <div style={{ position:"absolute", left:"50%", top:0, bottom:0, width:2, background:"rgba(17,17,17,0.12)", transform:"translateX(-50%)" }} className="timeline-line" />
              {MILESTONES.map((m,i)=>(
                <Reveal key={i} delay={i*0.1} dir={i%2===0?"left":"right"}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, marginBottom:48, alignItems:"center" }} className="timeline-row">
                    {/* Left side */}
                    <div style={{ textAlign: i%2===0?"right":"left", order: i%2===0?0:1 }}>
                      {i%2===0 && (
                        <div style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.1)", borderRadius:18, padding:"24px 26px", boxShadow:"0 8px 28px rgba(17,17,17,0.07)", display:"inline-block", textAlign:"left", transition:"all 0.3s ease", maxWidth:320 }}
                          onMouseEnter={e=>{ e.currentTarget.style.transform="translateX(-6px)"; e.currentTarget.style.boxShadow="0 16px 40px rgba(17,17,17,0.12)"; }}
                          onMouseLeave={e=>{ e.currentTarget.style.transform="translateX(0)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(17,17,17,0.07)"; }}>
                          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#F5E6A3", borderRadius:100, padding:"5px 14px", marginBottom:12, fontSize:12, fontWeight:700, color:"#111111" }}>
                            {m.icon} {m.year}
                          </div>
                          <h3 style={{ fontSize:18, fontWeight:800, color:"#111111", marginBottom:8 }}>{m.title}</h3>
                          <p style={{ fontSize:13.5, color:"#666666", lineHeight:1.65 }}>{m.desc}</p>
                        </div>
                      )}
                    </div>
                    {/* Right side */}
                    <div style={{ textAlign: i%2===0?"left":"right", order: i%2===0?1:0 }}>
                      {i%2!==0 && (
                        <div style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.1)", borderRadius:18, padding:"24px 26px", boxShadow:"0 8px 28px rgba(17,17,17,0.07)", display:"inline-block", textAlign:"left", transition:"all 0.3s ease", maxWidth:320 }}
                          onMouseEnter={e=>{ e.currentTarget.style.transform="translateX(6px)"; e.currentTarget.style.boxShadow="0 16px 40px rgba(17,17,17,0.12)"; }}
                          onMouseLeave={e=>{ e.currentTarget.style.transform="translateX(0)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(17,17,17,0.07)"; }}>
                          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#F5E6A3", borderRadius:100, padding:"5px 14px", marginBottom:12, fontSize:12, fontWeight:700, color:"#111111" }}>
                            {m.icon} {m.year}
                          </div>
                          <h3 style={{ fontSize:18, fontWeight:800, color:"#111111", marginBottom:8 }}>{m.title}</h3>
                          <p style={{ fontSize:13.5, color:"#666666", lineHeight:1.65 }}>{m.desc}</p>
                        </div>
                      )}
                    </div>
                    {/* Center dot */}
                    <div style={{ position:"absolute", left:"50%", transform:"translateX(-50%)", width:18, height:18, borderRadius:"50%", background:"#111111", border:"4px solid #F5E6A3", boxShadow:"0 0 0 4px rgba(17,17,17,0.1)", zIndex:2, top: `${i*96+8}px` }} className="timeline-dot" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ VALUES ══ */}
        <section style={{ background:"#fff", padding:"100px 24px" }}>
          <div style={{ maxWidth:1160, margin:"0 auto" }}>
            <Reveal>
              <div style={{ textAlign:"center", marginBottom:60 }}>
                <SectionLabel text="Our Values" />
                <h2 style={{ fontSize:"clamp(26px,4vw,44px)", fontWeight:800, color:"#111111", letterSpacing:-1, marginBottom:14 }}>What we believe in</h2>
                <p style={{ fontSize:16, color:"#666666", maxWidth:480, margin:"0 auto", lineHeight:1.75 }}>Six principles that guide every decision, every process, and every hire at MedCare RCM Solutions.</p>
              </div>
            </Reveal>
            <div className="values-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
              {VALUES.map((v,i)=>(
                <Reveal key={i} delay={i*0.08}>
                  <div style={{ background:"#F5F0E8", border:"1px solid rgba(17,17,17,0.07)", borderRadius:20, padding:"28px 24px", display:"flex", gap:16, alignItems:"flex-start", boxShadow:"0 2px 14px rgba(17,17,17,0.04)", transition:"all 0.3s ease" }}
                    onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.background="#fff"; e.currentTarget.style.boxShadow="0 16px 40px rgba(17,17,17,0.09)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.background="#F5F0E8"; e.currentTarget.style.boxShadow="0 2px 14px rgba(17,17,17,0.04)"; }}>
                    <div style={{ width:50, height:50, borderRadius:14, background:"#F5E6A3", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{v.icon}</div>
                    <div>
                      <h4 style={{ fontSize:15.5, fontWeight:800, color:"#111111", marginBottom:7 }}>{v.title}</h4>
                      <p style={{ fontSize:13.5, color:"#666666", lineHeight:1.7 }}>{v.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TEAM PREVIEW ══ */}
        <section style={{ background:"#F5F0E8", padding:"100px 24px" }}>
          <div style={{ maxWidth:1160, margin:"0 auto" }}>
            <Reveal>
              <div style={{ textAlign:"center", marginBottom:60 }}>
                <SectionLabel text="Our Team" />
                <h2 style={{ fontSize:"clamp(26px,4vw,44px)", fontWeight:800, color:"#111111", letterSpacing:-1, marginBottom:14 }}>The people behind MedCare RCM</h2>
                <p style={{ fontSize:16, color:"#666666", maxWidth:480, margin:"0 auto", lineHeight:1.75 }}>Certified billing professionals who treat your revenue cycle like their own.</p>
              </div>
            </Reveal>
            <div className="team-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
              {TEAM.slice(0,3).map((member,i)=>(
                <Reveal key={i} delay={i*0.1}>
                  <div onClick={()=>router.push(`/about/team/${member.slug}`)}
                    style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:22, overflow:"hidden", cursor:"pointer", transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)", boxShadow:"0 4px 20px rgba(17,17,17,0.06)" }}
                    onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-8px)"; e.currentTarget.style.boxShadow="0 24px 52px rgba(17,17,17,0.13)"; e.currentTarget.style.borderColor="#111111"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(17,17,17,0.06)"; e.currentTarget.style.borderColor="rgba(17,17,17,0.08)"; }}>
                    {/* Photo */}
                    <div style={{ height:200, overflow:"hidden", position:"relative" }}>
                      <img loading="lazy" src={member.img} alt={member.name} style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", transition:"transform 0.5s ease" }}
                        onMouseEnter={e=>e.target.style.transform="scale(1.06)"}
                        onMouseLeave={e=>e.target.style.transform="scale(1)"} />
                      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,transparent 50%,rgba(17,17,17,0.4) 100%)" }} />
                      <div style={{ position:"absolute", top:14, right:14, background:"#F5E6A3", borderRadius:100, padding:"4px 12px", fontSize:11, fontWeight:700, color:"#111111" }}>{member.dept}</div>
                    </div>
                    {/* Info */}
                    <div style={{ padding:"22px 22px 24px" }}>
                      <h3 style={{ fontSize:18, fontWeight:800, color:"#111111", marginBottom:4 }}>{member.name}</h3>
                      <p style={{ fontSize:13, color:"#888888", marginBottom:14, fontWeight:500 }}>{member.role}</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>
                        {member.expertise.slice(0,2).map((ex,j)=>(
                          <span key={j} style={{ fontSize:11, fontWeight:600, color:"#555555", background:"#F5F0E8", borderRadius:100, padding:"4px 10px" }}>{ex}</span>
                        ))}
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, fontWeight:700, color:"#111111" }}>
                        View profile <span style={{ background:"#F5E6A3", borderRadius:"50%", width:22, height:22, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:12 }}>→</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* See More button */}
            <div style={{ textAlign:"center", marginTop:44 }}>
              <Link href="/about/team" style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#111111", color:"#fff", padding:"15px 32px", borderRadius:100, fontSize:14, fontWeight:700, boxShadow:"0 4px 20px rgba(17,17,17,0.15)", transition:"transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 32px rgba(17,17,17,0.25)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(17,17,17,0.15)"; }}>
                Meet the Full Team
                <span style={{ background:"#F5E6A3", color:"#111111", borderRadius:"50%", width:24, height:24, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800 }}>→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section style={{ background:"#111111", padding:"100px 24px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-80, right:-80, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,230,163,0.1),transparent 70%)", pointerEvents:"none" }} />
          <Reveal dir="scale">
            <div style={{ maxWidth:680, margin:"0 auto", textAlign:"center", position:"relative", zIndex:2 }}>
              <div style={{ display:"inline-block", background:"#F5E6A3", borderRadius:100, padding:"6px 20px", fontSize:11, fontWeight:800, color:"#111111", letterSpacing:2, textTransform:"uppercase", marginBottom:24 }}>No Obligation</div>
              <h2 style={{ fontSize:"clamp(26px,4.5vw,48px)", fontWeight:800, color:"#fff", letterSpacing:-1.5, marginBottom:18, lineHeight:1.1 }}>
                Ready to work with a billing team<br/>you can actually trust?
              </h2>
              <p style={{ fontSize:16, color:"rgba(255,255,255,0.5)", lineHeight:1.8, marginBottom:40, maxWidth:520, margin:"0 auto 40px" }}>
                Get a free, no-obligation billing audit — we'll show you exactly where revenue is being lost and what we'd do to fix it.
              </p>
              <div className="cta-buttons" style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
                <Link href="/contact" style={{ background:"#F5E6A3", color:"#111111", padding:"16px 32px", borderRadius:100, fontSize:15, fontWeight:800, display:"inline-flex", alignItems:"center", gap:8 }}>
                  Get Free Billing Audit →
                </Link>
                <Link href="/careers" style={{ background:"transparent", color:"rgba(255,255,255,0.7)", padding:"16px 26px", borderRadius:100, fontSize:15, fontWeight:600, border:"1.5px solid rgba(255,255,255,0.2)", display:"inline-block" }}>
                  Join Our Team
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

      </main>
      <Footer />

      <style>{`
        @keyframes dotsShift { 0%{background-position:0 0} 100%{background-position:38px 38px} }
        @keyframes breathe   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(1.5)} }
        @keyframes floatA    { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-10px) rotate(-1deg)} }
        @keyframes floatB    { 0%,100%{transform:translateY(0) rotate(2deg)} 50%{transform:translateY(-9px) rotate(2deg)} }
        @keyframes floatC    { 0%,100%{transform:translateY(0) rotate(-1.5deg)} 50%{transform:translateY(-8px) rotate(-1.5deg)} }

        @media (max-width: 960px) {
          .hero-grid   { grid-template-columns: 1fr !important; }
          .hero-cards  { display: none !important; }
          .split-grid  { grid-template-columns: 1fr !important; }
          .vm-grid     { grid-template-columns: 1fr !important; }
          .values-grid { grid-template-columns: 1fr 1fr !important; }
          .team-grid   { grid-template-columns: 1fr 1fr !important; }
          .about-hero-overlay { background: linear-gradient(180deg,rgba(245,240,232,0.97) 0%,rgba(245,240,232,0.95) 65%,rgba(17,17,17,0.6) 100%) !important; }
        }
        @media (max-width: 768px) {
          .stats-grid  { grid-template-columns: 1fr 1fr !important; gap: 24px 16px !important; }
          .values-grid { grid-template-columns: 1fr !important; }
          .team-grid   { grid-template-columns: 1fr !important; }
          .timeline-line { left: 20px !important; }
          .timeline-row  { grid-template-columns: 1fr !important; padding-left: 44px; }
          .timeline-dot  { left: 20px !important; }
          .cta-buttons   { flex-direction: column !important; align-items: center !important; }
          .cta-buttons a { width: 100% !important; text-align: center !important; justify-content: center !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </>
  );
}
