"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

/* ══ HOOKS ══ */
function useReveal(threshold = 0.12) {
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
  const transforms = {
    up:    "translateY(32px)",
    left:  "translateX(-32px)",
    right: "translateX(32px)",
    scale: "scale(0.94)",
  };
  return (
    <div ref={ref} style={{
      opacity:   visible ? 1 : 0,
      transform: visible ? "none" : transforms[dir],
      transition:`opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ══ DATA ══ */
const OPEN_ROLES = [
  {
    title: "Medical Billing Specialist",
    dept: "Billing Operations",
    type: "Full-Time",
    location: "Remote — USA",
    icon: "🧾",
    color: "#FFF9E6",
    desc: "Own the full billing cycle for a portfolio of healthcare clients — from charge entry and claim scrubbing to denial resolution and payment posting.",
    requirements: [
      "2+ years of medical billing experience",
      "CPC or CCS certification preferred",
      "Proficiency in at least one major EHR/PM system",
      "Strong knowledge of CPT, ICD-10, and HCPCS coding",
    ],
  },
  {
    title: "Denial Management Analyst",
    dept: "Revenue Recovery",
    type: "Full-Time",
    location: "Remote — USA",
    icon: "🚫",
    color: "#FFF0F0",
    desc: "Investigate, appeal, and resolve complex claim denials. Identify root causes, write winning appeal letters, and drive systemic process improvements.",
    requirements: [
      "3+ years of denial management or appeals experience",
      "Deep knowledge of payer-specific denial codes (CO, PR, OA)",
      "Strong written communication for appeal letter drafting",
      "Experience with Medicare and commercial payer appeals",
    ],
  },
  {
    title: "Credentialing Coordinator",
    dept: "Provider Services",
    type: "Full-Time",
    location: "Remote — USA",
    icon: "🪪",
    color: "#F0F7FF",
    desc: "Manage end-to-end provider credentialing and payer enrollment for a growing roster of healthcare clients across multiple specialties.",
    requirements: [
      "2+ years of credentialing or payer enrollment experience",
      "Hands-on experience with CAQH and PECOS platforms",
      "Familiarity with Medicare Part B enrollment workflows",
      "Detail-oriented with strong follow-up and documentation skills",
    ],
  },
  {
    title: "RCM Account Manager",
    dept: "Client Success",
    type: "Full-Time",
    location: "Remote — USA",
    icon: "📞",
    color: "#F0FFF4",
    desc: "Serve as the primary point of contact for a dedicated book of healthcare clients — managing relationships, delivering monthly KPI reports, and driving continuous performance improvement.",
    requirements: [
      "3+ years in healthcare revenue cycle management",
      "Strong client-facing communication and presentation skills",
      "Ability to analyze billing data and communicate findings clearly",
      "Experience managing multi-specialty practice accounts",
    ],
  },
  {
    title: "Healthcare Data Analyst",
    dept: "Analytics & Reporting",
    type: "Full-Time",
    location: "Remote — USA",
    icon: "📊",
    color: "#F5F0FF",
    desc: "Build and maintain revenue cycle dashboards, generate KPI reports, and surface actionable insights that help clients and internal teams improve performance.",
    requirements: [
      "2+ years of healthcare data analysis experience",
      "Proficiency in Excel, SQL, or BI tools (Power BI / Tableau)",
      "Understanding of RCM KPIs — AR days, first-pass rate, denial rate",
      "Strong attention to detail and data accuracy",
    ],
  },
  {
    title: "Medical Coding Specialist",
    dept: "Coding & Compliance",
    type: "Full-Time",
    location: "Remote — USA",
    icon: "🔬",
    color: "#FFF5F0",
    desc: "Assign accurate ICD-10, CPT, and HCPCS codes for a variety of medical specialties — ensuring claim accuracy, compliance, and maximum appropriate reimbursement.",
    requirements: [
      "Active CPC, CCS, or equivalent coding certification",
      "2+ years of multi-specialty coding experience",
      "Working knowledge of OIG and CMS compliance requirements",
      "Experience with E&M coding and documentation guidelines",
    ],
  },
];

const PERKS = [
  { icon:"🏠", title:"100% Remote",          desc:"Work from anywhere in the United States. We've been remote-first since day one — no exceptions, no hybrid mandates." },
  { icon:"💰", title:"Competitive Pay",        desc:"Market-leading base salaries benchmarked quarterly, plus performance bonuses tied to client outcomes you directly impact." },
  { icon:"📚", title:"Certification Support",  desc:"We cover CPC, CCS, CPMA, and other coding and billing certification exam fees, plus paid study time." },
  { icon:"🏥", title:"Full Benefits",          desc:"Medical, dental, and vision insurance from day one — no waiting periods. We cover 80% of premiums for employees and families." },
  { icon:"⏰", title:"Flexible Hours",         desc:"Core collaboration hours exist, but we trust you to manage your schedule. Most team members build their own optimal workday." },
  { icon:"📈", title:"Clear Growth Path",      desc:"Defined promotion ladders from Specialist → Senior → Lead → Manager. Every level has objective criteria — no politics, no guesswork." },
  { icon:"🎓", title:"Learning Budget",        desc:"$1,000 annual budget for courses, conferences, books, or any professional development resource you find valuable." },
  { icon:"🤝", title:"Collaborative Culture",  desc:"Small, tight-knit teams where your contributions are visible and your feedback actually changes how we work." },
];

const VALUES = [
  { icon:"🎯", title:"Accuracy First",         desc:"In medical billing, a single digit makes the difference between paid and denied. We obsess over getting it right the first time." },
  { icon:"🔒", title:"Privacy Always",         desc:"Patient data is sacred. Every team member trains on HIPAA compliance from day one and maintains it every day after." },
  { icon:"⚡", title:"Speed With Quality",     desc:"Fast turnaround only matters if the work is right. We build processes that achieve both — not one at the expense of the other." },
  { icon:"💬", title:"Radical Transparency",   desc:"We tell clients and each other the truth — especially when it's uncomfortable. No sugarcoating, no blame-shifting." },
  { icon:"🚀", title:"Continuous Improvement", desc:"Every process we have today is a draft. We review, measure, and improve constantly — and every team member is part of that." },
  { icon:"🤝", title:"Own Your Work",          desc:"We hire experienced professionals and trust them to deliver. Micromanagement doesn't exist here." },
];

const TEAM_PHOTOS = [
  { name:"Jhon Doe",  role:"Sr. Billing Specialist", img:"https://images.unsplash.com/photo-1713946598467-fcf9332c56ea?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fit=crop&crop=face" },
  { name:"James Holloway",  role:"Denial Management Lead", img:"https://images.unsplash.com/photo-1562788869-4ed32648eb72?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fit=crop&crop=face" },
  { name:"Alvin Smith",      role:"RCM Account Manager",    img:"https://images.unsplash.com/photo-1558222218-b7b54eede3f3?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fit=crop&crop=face" },
  { name:"Marcus Webb",     role:"Coding Specialist",      img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&fit=crop&crop=face" },
  { name:"Harry Watson",    role:"Credentialing Coord.",   img:"https://images.unsplash.com/photo-1714974528889-d51109fb6ae9?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fit=crop&crop=face" },
  { name:"Kevin Park",      role:"Data Analyst",           img:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fit=crop&crop=face" },
];

const PROCESS_STEPS = [
  { num:"01", icon:"📝", title:"Apply Online",       desc:"Submit your resume and a short note about why MedCare. No lengthy cover letter required — just be yourself." },
  { num:"02", icon:"📞", title:"30-Min Phone Screen", desc:"A casual conversation with our hiring team. We'll tell you exactly what to expect — no trick questions." },
  { num:"03", icon:"💻", title:"Skills Assessment",   desc:"A short, practical exercise relevant to the role. We respect your time — nothing longer than 90 minutes." },
  { num:"04", icon:"🤝", title:"Team Interview",      desc:"Meet the people you'd work with daily. Ask us anything — we want you to make an informed decision too." },
  { num:"05", icon:"🎉", title:"Offer & Onboard",     desc:"Clear, written offer within 48 hours of your final interview. Onboarding starts the following Monday." },
];

/* ══ PAGE ══ */
export default function CareersPage() {
  const [mounted, setMounted] = useState(false);
  const [openRole, setOpenRole] = useState(null);
  const [applied,    setApplied]    = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError,  setFormError]  = useState("");
  const [form, setForm] = useState({ name:"", email:"", phone:"", role:"", resumeLink:"", message:"" });
  const [file,     setFile]     = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef(null);

  const handleFile = (f) => {
    if (!f) return;
    const allowed = ["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(f.type)) { setFormError("Please upload a PDF or Word document (.pdf, .doc, .docx)"); return; }
    if (f.size > 5 * 1024 * 1024)  { setFormError("File must be under 5MB"); return; }
    setFormError("");
    setFile(f);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k,v]) => fd.append(k, v));
      if (file) fd.append("file", file);
      const res  = await fetch("/api/apply", { method:"POST", body:fd });
      const data = await res.json();
      if (data && data.success !== false) { setApplied(true); }
      else { setFormError("Something went wrong — please try again or email us directly."); }
    } catch { setFormError("Network error — please check your connection and try again."); }
    finally  { setSubmitting(false); }
  };

  const statsReveal = useReveal(0.2);

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const rise = (d = 0) => ({
    opacity:   mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(28px)",
    transition:`opacity 0.7s ease ${d}s, transform 0.7s ease ${d}s`,
  });

  return (
    <>
      <Navbar />
      <main>

        {/* ══ HERO ══ */}
        <section style={{ position:"relative", minHeight:"92vh", display:"flex", alignItems:"center", overflow:"hidden", isolation:"isolate" }} className="careers-hero">
          {/* Background image */}
          <div style={{
            position:"absolute", inset:0, zIndex:-2,
            backgroundImage:"url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80&fit=crop')",
            backgroundSize:"cover", backgroundPosition:"center 30%", backgroundAttachment: "fixed",
          }} />
          {/* Animated dot grid */}
          <div style={{ position:"absolute", inset:0, zIndex:-1, backgroundImage:"radial-gradient(circle,rgba(245,240,232,0.12) 1.5px,transparent 1.5px)", backgroundSize:"38px 38px", animation:"dotsShift 28s linear infinite", pointerEvents:"none" , willChange:"transform" }} />
          {/* Gradient overlay — Grovia cream on left, dark on right */}
          <div style={{ position:"absolute", inset:0, zIndex:-1, background:"linear-gradient(110deg,rgba(245,240,232,0.97) 0%,rgba(245,240,232,0.92) 38%,rgba(17,17,17,0.65) 100%)" }} className="hero-overlay" />
          {/* Yellow glow top-right */}
          <div style={{ position:"absolute", top:-80, right:-80, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,230,163,0.25),transparent 65%)", zIndex:-1, pointerEvents:"none" }} />

          <div style={{ maxWidth:1160, margin:"0 auto", padding:"130px 24px 90px", width:"100%", display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center" }} className="hero-grid">

            {/* LEFT */}
            <div>
              {/* Badge */}
              <div style={{ ...rise(0.05), display:"inline-flex", alignItems:"center", gap:9, background:"#F5E6A3", border:"1px solid rgba(17,17,17,0.15)", borderRadius:100, padding:"7px 18px", marginBottom:26 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"#111111", animation:"breathe 2s infinite" , willChange:"transform" }} />
                <span style={{ fontSize:12, fontWeight:700, color:"#111111", letterSpacing:1.2 }}>We're Hiring · USA Remote</span>
              </div>

              <h1 style={{ ...rise(0.18), fontSize:"clamp(36px,5vw,62px)", fontWeight:800, color:"#111111", lineHeight:1.08, letterSpacing:-2, marginBottom:22 }}>
                Build your career<br/>
                in <span style={{ borderBottom:"3px solid #F5E6A3", paddingBottom:2 }}>healthcare</span><br/>
                <span style={{ color:"#111111", opacity:0.28 }}>revenue cycle.</span>
              </h1>

              <p style={{ ...rise(0.3), fontSize:17, color:"#444444", lineHeight:1.8, marginBottom:36, maxWidth:460 }}>
                MedCare RCM Solutions is a fast-growing, fully remote RCM company serving 500+ healthcare providers. We're looking for experienced billing professionals who want ownership, growth, and work they're proud of.
              </p>

              <div style={{ ...rise(0.42), display:"flex", gap:12, flexWrap:"wrap" }}>
                <a href="#open-roles" style={{ background:"#111111", color:"#fff", padding:"15px 28px", borderRadius:100, fontSize:15, fontWeight:700, display:"inline-flex", alignItems:"center", gap:9, boxShadow:"0 6px 24px rgba(17,17,17,0.22)", transition:"transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 32px rgba(17,17,17,0.3)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 6px 24px rgba(17,17,17,0.22)"; }}>
                  View Open Roles
                  <span style={{ background:"#F5E6A3", color:"#111111", borderRadius:"50%", width:26, height:26, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800 }}>↓</span>
                </a>
                <a href="#apply" style={{ background:"transparent", color:"#111111", padding:"15px 26px", borderRadius:100, fontSize:15, fontWeight:600, border:"1.5px solid rgba(17,17,17,0.22)", display:"inline-block", transition:"border-color 0.2s, background 0.2s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor="#111111"; e.currentTarget.style.background="rgba(17,17,17,0.04)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(17,17,17,0.22)"; e.currentTarget.style.background="transparent"; }}>
                  Apply Now
                </a>
              </div>

              {/* Quick facts */}
              <div style={{ ...rise(0.55), display:"flex", gap:20, marginTop:36, flexWrap:"wrap" }}>
                {[{val:"100%",label:"Remote"},{val:"500+",label:"Clients"},{val:"48h",label:"Offer turnaround"},{val:"$1K",label:"Learning budget"}].map((s,i)=>(
                  <div key={i} style={{ textAlign:"center", background:"rgba(255,255,255,0.7)", backdropFilter:"blur(10px)", border:"1px solid rgba(17,17,17,0.1)", borderRadius:14, padding:"14px 18px", minWidth:80 }}>
                    <div style={{ fontSize:20, fontWeight:800, color:"#111111", letterSpacing:-0.5 }}>{s.val}</div>
                    <div style={{ fontSize:10, color:"#666666", fontWeight:600, textTransform:"uppercase", letterSpacing:0.8, marginTop:3 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — team photo collage */}
            <div style={{ position:"relative", height:480, ...rise(0.28) }} className="hero-photos">
              {/* Main large photo */}
              <div style={{ position:"absolute", top:0, left:"10%", width:"80%", height:300, borderRadius:24, overflow:"hidden", boxShadow:"0 24px 60px rgba(17,17,17,0.18)", animation:"floatY 6s ease-in-out infinite" , willChange:"transform" }}>
                <img loading="lazy" src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=75&fit=crop" alt="Team working" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(17,17,17,0.35),transparent 60%)" }} />
                <div style={{ position:"absolute", bottom:16, left:18, color:"#fff" }}>
                  <div style={{ fontSize:13, fontWeight:700 }}>Our billing team in action</div>
                  <div style={{ fontSize:11, opacity:0.7 }}>Remote-first · Nationwide</div>
                </div>
              </div>

              {/* Bottom-left card */}
              <div style={{ position:"absolute", bottom:0, left:0, width:200, background:"#fff", border:"1px solid rgba(17,17,17,0.1)", borderRadius:18, overflow:"hidden", boxShadow:"0 12px 36px rgba(17,17,17,0.12)", animation:"floatYL 7s ease-in-out infinite" , willChange:"transform" }}>
                <img loading="lazy" src="https://static.vecteezy.com/system/resources/thumbnails/011/166/139/small_2x/expertise-banner-web-icon-illustration-concept-representing-high-level-knowledge-and-experience-with-an-icon-of-expert-consulting-knowledge-team-advice-trust-and-research-vector.jpg" alt="Team member" style={{ width:"100%", height:110, objectFit:"cover" }} />
                <div style={{ padding:"12px 14px" }}>
                  <div style={{ fontSize:12, fontWeight:700, color:"#111111" }}>Grow your expertise</div>
                  <div style={{ fontSize:11, color:"#888888", marginTop:3 }}>CPC certification supported</div>
                </div>
              </div>

              {/* Bottom-right badge */}
              <div style={{ position:"absolute", bottom:10, right:10, background:"#F5E6A3", border:"1px solid rgba(17,17,17,0.12)", borderRadius:16, padding:"14px 18px", boxShadow:"0 8px 24px rgba(17,17,17,0.1)", animation:"floatYR 5s ease-in-out infinite" , willChange:"transform" }}>
                <div style={{ fontSize:22, marginBottom:6 }}>🏆</div>
                <div style={{ fontSize:13, fontWeight:800, color:"#111111" }}>#1 RCM Team</div>
                <div style={{ fontSize:11, color:"rgba(17,17,17,0.55)" }}>2024 — Top Rated</div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS BAR ══ */}
        <section ref={statsReveal.ref} style={{ background:"#111111", padding:"52px 24px" }}>
          <div className="stats-grid" style={{ maxWidth:1000, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24, textAlign:"center" }}>
            {[
              { val:"6",    label:"Open positions",       icon:"💼" },
              { val:"500+", label:"Clients we serve",      icon:"🏥" },
              { val:"100%", label:"Remote workforce",       icon:"🏠" },
              { val:"48h",  label:"Offer after final round",icon:"⚡" },
            ].map((s,i)=>(
              <div key={i} style={{ opacity:statsReveal.visible?1:0, transform:statsReveal.visible?"translateY(0)":"translateY(24px)", transition:`all 0.5s ease ${i*0.1}s` }}>
                <div style={{ fontSize:22, marginBottom:8 }}>{s.icon}</div>
                <div style={{ fontSize:"clamp(28px,3.5vw,38px)", fontWeight:800, color:"#F5E6A3", letterSpacing:-1 }}>{s.val}</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:5, fontWeight:600, textTransform:"uppercase", letterSpacing:0.8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ WHY MEDCARE ══ */}
        <section style={{ background:"#FDFAF5", padding:"96px 24px" }}>
          <div style={{ maxWidth:1160, margin:"0 auto" }}>
            <Reveal>
              <div style={{ textAlign:"center", marginBottom:60 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:14 }}>
                  <div style={{ width:26, height:2, background:"#111111", borderRadius:2 }} />
                  <span style={{ fontSize:11, fontWeight:700, color:"#111111", letterSpacing:"2px", textTransform:"uppercase" }}>Why Work Here</span>
                </div>
                <h2 style={{ fontSize:"clamp(28px,4vw,44px)", fontWeight:800, color:"#111111", letterSpacing:-1, marginBottom:14 }}>
                  A company built around its people
                </h2>
                <p style={{ fontSize:16, color:"#666666", maxWidth:520, margin:"0 auto", lineHeight:1.75 }}>
                  We're a remote-first RCM company that invests in real billing expertise — yours included.
                </p>
              </div>
            </Reveal>

            {/* Split: photo left, points right */}
            <div className="why-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center", marginBottom:64 }}>
              <Reveal dir="left">
                <div style={{ position:"relative", borderRadius:24, overflow:"hidden", aspectRatio:"4/3" }}>
                  <img loading="lazy" src="https://cdn.corporatefinanceinstitute.com/assets/macro-manager-1024x683.jpeg" alt="Team culture" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(17,17,17,0.5),transparent 60%)" }} />
                  {/* Floating card on image */}
                  <div style={{ position:"absolute", bottom:20, left:20, right:20, background:"rgba(245,230,163,0.95)", backdropFilter:"blur(8px)", borderRadius:14, padding:"16px 18px" }}>
                    <div style={{ fontSize:13, fontWeight:700, color:"#111111", marginBottom:4 }}>🌟 Glassdoor Rating</div>
                    <div style={{ display:"flex", gap:3 }}>{[...Array(5)].map((_,i)=><span key={i} style={{ color:"#F0B429", fontSize:16 }}>★</span>)}</div>
                    <div style={{ fontSize:12, color:"rgba(17,17,17,0.6)", marginTop:4 }}>4.8/5 from 120+ employee reviews</div>
                  </div>
                </div>
              </Reveal>

              <Reveal dir="right" delay={0.1}>
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  {PERKS.slice(0,4).map((p,i)=>(
                    <div key={i} style={{ display:"flex", gap:16, alignItems:"flex-start", background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:16, padding:"20px 22px", boxShadow:"0 2px 12px rgba(17,17,17,0.04)", transition:"transform 0.25s, box-shadow 0.25s" }}
                      onMouseEnter={e=>{ e.currentTarget.style.transform="translateX(6px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(17,17,17,0.08)"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.transform="translateX(0)"; e.currentTarget.style.boxShadow="0 2px 12px rgba(17,17,17,0.04)"; }}>
                      <div style={{ width:44, height:44, borderRadius:12, background:"#F5F0E8", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{p.icon}</div>
                      <div>
                        <h4 style={{ fontSize:15, fontWeight:700, color:"#111111", marginBottom:5 }}>{p.title}</h4>
                        <p style={{ fontSize:13.5, color:"#666666", lineHeight:1.65 }}>{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Remaining perks grid */}
            <div className="perks-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:18 }}>
              {PERKS.slice(4).map((p,i)=>(
                <Reveal key={i} delay={i*0.08}>
                  <div style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:18, padding:"24px 20px", textAlign:"center", boxShadow:"0 2px 12px rgba(17,17,17,0.04)", transition:"transform 0.25s" }}
                    onMouseEnter={e=>e.currentTarget.style.transform="translateY(-5px)"}
                    onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                    <div style={{ fontSize:28, marginBottom:12 }}>{p.icon}</div>
                    <h4 style={{ fontSize:14, fontWeight:700, color:"#111111", marginBottom:7 }}>{p.title}</h4>
                    <p style={{ fontSize:12.5, color:"#666666", lineHeight:1.65 }}>{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ OUR VALUES ══ */}
        <section style={{ background:"#F5F0E8", padding:"96px 24px" }}>
          <div style={{ maxWidth:1160, margin:"0 auto" }}>
            <Reveal>
              <div style={{ textAlign:"center", marginBottom:56 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:14 }}>
                  <div style={{ width:26, height:2, background:"#111111", borderRadius:2 }} />
                  <span style={{ fontSize:11, fontWeight:700, color:"#111111", letterSpacing:"2px", textTransform:"uppercase" }}>Our Values</span>
                </div>
                <h2 style={{ fontSize:"clamp(26px,4vw,42px)", fontWeight:800, color:"#111111", letterSpacing:-1 }}>What we believe in</h2>
              </div>
            </Reveal>
            <div className="values-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
              {VALUES.map((v,i)=>(
                <Reveal key={i} delay={i*0.08}>
                  <div style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:18, padding:"28px 24px", display:"flex", gap:16, alignItems:"flex-start", boxShadow:"0 2px 14px rgba(17,17,17,0.04)", transition:"transform 0.25s, box-shadow 0.25s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow="0 14px 36px rgba(17,17,17,0.09)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 14px rgba(17,17,17,0.04)"; }}>
                    <div style={{ width:48, height:48, borderRadius:13, background:"#F5E6A3", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{v.icon}</div>
                    <div>
                      <h4 style={{ fontSize:15, fontWeight:700, color:"#111111", marginBottom:7 }}>{v.title}</h4>
                      <p style={{ fontSize:13.5, color:"#666666", lineHeight:1.7 }}>{v.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ MEET THE TEAM ══ */}
        <section style={{ background:"#fff", padding:"96px 24px", overflow:"hidden" }}>
          <div style={{ maxWidth:1160, margin:"0 auto" }}>
            <Reveal>
              <div style={{ textAlign:"center", marginBottom:56 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:14 }}>
                  <div style={{ width:26, height:2, background:"#111111", borderRadius:2 }} />
                  <span style={{ fontSize:11, fontWeight:700, color:"#111111", letterSpacing:"2px", textTransform:"uppercase" }}>The Team</span>
                </div>
                <h2 style={{ fontSize:"clamp(26px,4vw,42px)", fontWeight:800, color:"#111111", letterSpacing:-1, marginBottom:12 }}>People you'd work with</h2>
                <p style={{ fontSize:16, color:"#666666", maxWidth:440, margin:"0 auto", lineHeight:1.7 }}>A tight-knit, experienced team of billing professionals who genuinely love what they do.</p>
              </div>
            </Reveal>
            <div className="team-grid" style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:18 }}>
              {TEAM_PHOTOS.map((person,i)=>(
                <Reveal key={i} delay={i*0.07}>
                  <div style={{ textAlign:"center", transition:"transform 0.25s" }}
                    onMouseEnter={e=>e.currentTarget.style.transform="translateY(-6px)"}
                    onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                    <div style={{ width:"100%", aspectRatio:"1", borderRadius:20, overflow:"hidden", marginBottom:12, border:"2px solid rgba(17,17,17,0.08)", boxShadow:"0 8px 24px rgba(17,17,17,0.08)" }}>
                      <img loading="lazy" src={person.img} alt={person.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                    </div>
                    <div style={{ fontSize:13, fontWeight:700, color:"#111111" }}>{person.name}</div>
                    <div style={{ fontSize:11.5, color:"#888888", marginTop:3 }}>{person.role}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ OPEN ROLES ══ */}
        <section id="open-roles" style={{ background:"#F5F0E8", padding:"96px 24px" }}>
          <div style={{ maxWidth:980, margin:"0 auto" }}>
            <Reveal>
              <div style={{ textAlign:"center", marginBottom:56 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:14 }}>
                  <div style={{ width:26, height:2, background:"#111111", borderRadius:2 }} />
                  <span style={{ fontSize:11, fontWeight:700, color:"#111111", letterSpacing:"2px", textTransform:"uppercase" }}>Open Positions</span>
                </div>
                <h2 style={{ fontSize:"clamp(26px,4vw,42px)", fontWeight:800, color:"#111111", letterSpacing:-1, marginBottom:12 }}>
                  {OPEN_ROLES.length} open roles
                </h2>
                <p style={{ fontSize:16, color:"#666666", maxWidth:440, margin:"0 auto", lineHeight:1.7 }}>All positions are fully remote within the United States. We welcome applications from all experience levels.</p>
              </div>
            </Reveal>

            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {OPEN_ROLES.map((role,i)=>(
                <Reveal key={i} delay={0.04+i*0.06}>
                  <div style={{ background:"#fff", border:`1px solid ${openRole===i?"#111111":"rgba(17,17,17,0.1)"}`, borderRadius:20, overflow:"hidden", boxShadow: openRole===i?"0 12px 36px rgba(17,17,17,0.1)":"0 2px 14px rgba(17,17,17,0.04)", transition:"all 0.3s ease" }}>
                    {/* Header row */}
                    <button onClick={()=>setOpenRole(openRole===i?null:i)}
                      style={{ width:"100%", background:"none", border:"none", padding:"22px 28px", display:"flex", alignItems:"center", gap:16, cursor:"pointer", textAlign:"left", fontFamily:"inherit" }}>
                      <div style={{ width:48, height:48, borderRadius:13, background:role.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{role.icon}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:17, fontWeight:700, color:"#111111", marginBottom:4 }}>{role.title}</div>
                        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                          {[role.dept, role.type, role.location].map((tag,j)=>(
                            <span key={j} style={{ fontSize:12, fontWeight:600, color:"#666666", background:"#F5F0E8", borderRadius:100, padding:"3px 10px" }}>{tag}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ width:32, height:32, borderRadius:"50%", background:openRole===i?"#111111":"#F5F0E8", border:"none", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.25s" }}>
                        <span style={{ fontSize:20, color:openRole===i?"#F5E6A3":"#666666", transform:openRole===i?"rotate(45deg)":"rotate(0)", display:"block", lineHeight:1, transition:"transform 0.25s" }}>+</span>
                      </div>
                    </button>

                    {/* Expanded details */}
                    {openRole===i && (
                      <div style={{ padding:"0 28px 28px", borderTop:"1px solid rgba(17,17,17,0.07)", animation:"dropIn 0.25s ease" }}>
                        <p style={{ fontSize:14.5, color:"#444444", lineHeight:1.8, margin:"20px 0 22px" }}>{role.desc}</p>
                        <h4 style={{ fontSize:13, fontWeight:700, color:"#111111", textTransform:"uppercase", letterSpacing:1, marginBottom:12 }}>Requirements</h4>
                        <div className="req-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:24 }}>
                          {role.requirements.map((req,j)=>(
                            <div key={j} style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"12px 14px", background:"#F5F0E8", borderRadius:12 }}>
                              <div style={{ width:20, height:20, borderRadius:"50%", background:"#F5E6A3", border:"1.5px solid rgba(17,17,17,0.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                                <span style={{ fontSize:10, fontWeight:800, color:"#111111" }}>✓</span>
                              </div>
                              <span style={{ fontSize:13, color:"#333333", fontWeight:500, lineHeight:1.45 }}>{req}</span>
                            </div>
                          ))}
                        </div>
                        <a href="#apply" onClick={()=>setForm(f=>({...f,role:role.title}))}
                          style={{ background:"#111111", color:"#fff", padding:"13px 26px", borderRadius:100, fontSize:14, fontWeight:700, display:"inline-flex", alignItems:"center", gap:8, boxShadow:"0 4px 16px rgba(17,17,17,0.2)", transition:"transform 0.2s" }}
                          onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
                          onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                          Apply for this role
                          <span style={{ background:"#F5E6A3", color:"#111111", borderRadius:"50%", width:22, height:22, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800 }}>→</span>
                        </a>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ HIRING PROCESS ══ */}
        <section style={{ background:"#111111", padding:"96px 24px" }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <Reveal>
              <div style={{ textAlign:"center", marginBottom:56 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:14 }}>
                  <div style={{ width:26, height:2, background:"#F5E6A3", borderRadius:2 }} />
                  <span style={{ fontSize:11, fontWeight:700, color:"#F5E6A3", letterSpacing:"2px", textTransform:"uppercase" }}>Hiring Process</span>
                </div>
                <h2 style={{ fontSize:"clamp(26px,4vw,42px)", fontWeight:800, color:"#fff", letterSpacing:-1, marginBottom:12 }}>No surprises. Ever.</h2>
                <p style={{ fontSize:16, color:"rgba(255,255,255,0.45)", maxWidth:440, margin:"0 auto", lineHeight:1.7 }}>We respect your time. Here's exactly what happens from application to offer.</p>
              </div>
            </Reveal>
            <div className="process-grid" style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:16 }}>
              {PROCESS_STEPS.map((p,i)=>(
                <Reveal key={i} delay={i*0.08}>
                  <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:18, padding:"24px 20px", textAlign:"center", transition:"background 0.25s, transform 0.25s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.background="rgba(245,230,163,0.08)"; e.currentTarget.style.transform="translateY(-5px)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.transform="translateY(0)"; }}>
                    <div style={{ width:50, height:50, borderRadius:14, background:"#F5E6A3", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, margin:"0 auto 12px" }}>{p.icon}</div>
                    <div style={{ fontSize:10, fontWeight:800, color:"rgba(255,255,255,0.3)", letterSpacing:1.5, marginBottom:8 }}>{p.num}</div>
                    <h4 style={{ fontSize:14, fontWeight:700, color:"#fff", marginBottom:8 }}>{p.title}</h4>
                    <p style={{ fontSize:12.5, color:"rgba(255,255,255,0.45)", lineHeight:1.65 }}>{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ APPLICATION FORM ══ */}
        <section id="apply" style={{ background:"#FDFAF5", padding:"96px 24px" }}>
          <div style={{ maxWidth:680, margin:"0 auto" }}>
            <Reveal>
              <div style={{ textAlign:"center", marginBottom:48 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:14 }}>
                  <div style={{ width:26, height:2, background:"#111111", borderRadius:2 }} />
                  <span style={{ fontSize:11, fontWeight:700, color:"#111111", letterSpacing:"2px", textTransform:"uppercase" }}>Apply Now</span>
                </div>
                <h2 style={{ fontSize:"clamp(24px,4vw,40px)", fontWeight:800, color:"#111111", letterSpacing:-1, marginBottom:12 }}>Start your application</h2>
                <p style={{ fontSize:15, color:"#666666", maxWidth:440, margin:"0 auto", lineHeight:1.75 }}>Takes less than 3 minutes. Upload your resume and we'll be in touch within 2 business days.</p>
              </div>
            </Reveal>

            {applied ? (
              <Reveal dir="scale">
                <div style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:24, padding:"60px 32px", textAlign:"center", boxShadow:"0 8px 40px rgba(17,17,17,0.05)" }}>
                  <div style={{ width:72, height:72, borderRadius:"50%", background:"#F5E6A3", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, margin:"0 auto 20px", animation:"bounceIn 0.6s cubic-bezier(0.34,1.56,0.64,1)" }}>🎉</div>
                  <h3 style={{ fontSize:24, fontWeight:800, color:"#111111", marginBottom:10 }}>Application received!</h3>
                  <p style={{ fontSize:15, color:"#666666", lineHeight:1.75, maxWidth:400, margin:"0 auto 24px" }}>
                    Thank you, <strong>{form.name.split(" ")[0]}</strong>! Our hiring team will review your application within <strong>2 business days</strong> and follow up by email.
                  </p>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#F5F0E8", border:"1px solid rgba(17,17,17,0.08)", borderRadius:100, padding:"10px 20px", marginBottom:24 }}>
                    <span style={{ fontSize:13 }}>📧</span>
                    <span style={{ fontSize:13, color:"#555555" }}>Confirmation sent to <strong>{form.email}</strong></span>
                  </div>
                  <br/>
                  <button onClick={()=>{ setApplied(false); setFile(null); setForm({ name:"", email:"", phone:"", role:"", resumeLink:"", message:"" }); }}
                    style={{ background:"transparent", color:"#111111", border:"1.5px solid rgba(17,17,17,0.2)", padding:"11px 22px", borderRadius:100, fontSize:13.5, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
                    Submit another application
                  </button>
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <form onSubmit={handleSubmit}
                  style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:24, padding:"40px 36px", boxShadow:"0 8px 40px rgba(17,17,17,0.04)" }}
                  className="apply-form">

                  {/* ── Row 1: Name + Email ── */}
                  <div className="form-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:18 }}>
                    {[
                      { key:"name",  label:"Full Name",      type:"text",  placeholder:"Jane Smith"      },
                      { key:"email", label:"Email Address",  type:"email", placeholder:"jane@email.com"  },
                    ].map(f=>(
                      <div key={f.key}>
                        <label style={{ fontSize:12, fontWeight:700, color:"#111111", display:"block", marginBottom:7, textTransform:"uppercase", letterSpacing:"0.5px" }}>{f.label} *</label>
                        <input type={f.type} placeholder={f.placeholder} required
                          value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})}
                          style={{ width:"100%", padding:"12px 14px", border:"1.5px solid rgba(17,17,17,0.12)", borderRadius:11, fontSize:14, color:"#111111", outline:"none", fontFamily:"inherit", background:"#FDFAF5", transition:"border-color 0.2s, background 0.2s", boxSizing:"border-box" }}
                          onFocus={e=>{ e.target.style.borderColor="#111111"; e.target.style.background="#fff"; }}
                          onBlur={e=>{  e.target.style.borderColor="rgba(17,17,17,0.12)"; e.target.style.background="#FDFAF5"; }} />
                      </div>
                    ))}
                  </div>

                  {/* ── Row 2: Phone + Role ── */}
                  <div className="form-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:18 }}>
                    <div>
                      <label style={{ fontSize:12, fontWeight:700, color:"#111111", display:"block", marginBottom:7, textTransform:"uppercase", letterSpacing:"0.5px" }}>Phone Number</label>
                      <input type="tel" placeholder="+1 (800) 000-0000"
                        value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}
                        style={{ width:"100%", padding:"12px 14px", border:"1.5px solid rgba(17,17,17,0.12)", borderRadius:11, fontSize:14, color:"#111111", outline:"none", fontFamily:"inherit", background:"#FDFAF5", transition:"border-color 0.2s", boxSizing:"border-box" }}
                        onFocus={e=>{ e.target.style.borderColor="#111111"; e.target.style.background="#fff"; }}
                        onBlur={e=>{  e.target.style.borderColor="rgba(17,17,17,0.12)"; e.target.style.background="#FDFAF5"; }} />
                    </div>
                    <div>
                      <label style={{ fontSize:12, fontWeight:700, color:"#111111", display:"block", marginBottom:7, textTransform:"uppercase", letterSpacing:"0.5px" }}>Position *</label>
                      <select required value={form.role} onChange={e=>setForm({...form,role:e.target.value})}
                        style={{ width:"100%", padding:"12px 14px", border:"1.5px solid rgba(17,17,17,0.12)", borderRadius:11, fontSize:14, color:"#111111", outline:"none", fontFamily:"inherit", background:"#FDFAF5", appearance:"none", cursor:"pointer", boxSizing:"border-box" }}
                        onFocus={e=>{ e.target.style.borderColor="#111111"; e.target.style.background="#fff"; }}
                        onBlur={e=>{  e.target.style.borderColor="rgba(17,17,17,0.12)"; e.target.style.background="#FDFAF5"; }}>
                        <option value="">Select a position</option>
                        {OPEN_ROLES.map(r=><option key={r.title} value={r.title}>{r.title}</option>)}
                        <option value="General Inquiry">General Inquiry — Don't see the right role?</option>
                      </select>
                    </div>
                  </div>

                  {/* ── Resume File Upload ── */}
                  <div style={{ marginBottom:18 }}>
                    <label style={{ fontSize:12, fontWeight:700, color:"#111111", display:"block", marginBottom:7, textTransform:"uppercase", letterSpacing:"0.5px" }}>
                      Resume / CV <span style={{ color:"#999999", fontWeight:400, textTransform:"none", letterSpacing:0 }}>(PDF or Word — max 5MB)</span>
                    </label>
                    <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={e=>handleFile(e.target.files[0])} style={{ display:"none" }} />
                    <div
                      onClick={()=>fileRef.current?.click()}
                      onDragOver={e=>{ e.preventDefault(); setDragOver(true); }}
                      onDragLeave={()=>setDragOver(false)}
                      onDrop={e=>{ e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                      style={{
                        border:`2px dashed ${dragOver?"#111111":file?"#22c55e":"rgba(17,17,17,0.18)"}`,
                        borderRadius:14, padding:"26px 20px", textAlign:"center",
                        cursor:"pointer", background:dragOver?"#F5F0E8":file?"#F0FFF4":"#FDFAF5",
                        transition:"all 0.25s ease",
                      }}
                      onMouseEnter={e=>{ if(!file) e.currentTarget.style.borderColor="#111111"; }}
                      onMouseLeave={e=>{ if(!file) e.currentTarget.style.borderColor="rgba(17,17,17,0.18)"; }}>
                      {file ? (
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14 }}>
                          <div style={{ width:42, height:42, borderRadius:11, background:"#DCFCE7", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>📄</div>
                          <div style={{ textAlign:"left" }}>
                            <div style={{ fontSize:14, fontWeight:700, color:"#111111" }}>{file.name}</div>
                            <div style={{ fontSize:12, color:"#22c55e", fontWeight:600, marginTop:2 }}>✓ Ready — {(file.size/1024/1024).toFixed(2)}MB</div>
                          </div>
                          <button type="button" onClick={e=>{ e.stopPropagation(); setFile(null); if(fileRef.current) fileRef.current.value=""; }}
                            style={{ width:26, height:26, borderRadius:"50%", background:"rgba(17,17,17,0.08)", border:"none", cursor:"pointer", fontSize:13, color:"#555", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>✕</button>
                        </div>
                      ) : (
                        <>
                          <div style={{ fontSize:32, marginBottom:8 }}>📎</div>
                          <div style={{ fontSize:14, fontWeight:700, color:"#111111", marginBottom:5 }}>{dragOver?"Drop it here!":"Drag & drop your resume"}</div>
                          <div style={{ fontSize:12.5, color:"#888888", marginBottom:12 }}>or click to browse</div>
                          <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#111111", color:"#fff", borderRadius:100, padding:"7px 16px", fontSize:12.5, fontWeight:700 }}>Browse Files</div>
                          <div style={{ fontSize:11, color:"#aaaaaa", marginTop:8 }}>PDF, DOC, DOCX — Max 5MB</div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* ── LinkedIn link ── */}
                  <div style={{ marginBottom:18 }}>
                    <label style={{ fontSize:12, fontWeight:700, color:"#111111", display:"block", marginBottom:7, textTransform:"uppercase", letterSpacing:"0.5px" }}>
                      LinkedIn or Portfolio <span style={{ color:"#999999", fontWeight:400, textTransform:"none" }}>(optional)</span>
                    </label>
                    <input type="url" placeholder="https://linkedin.com/in/yourname"
                      value={form.resumeLink} onChange={e=>setForm({...form,resumeLink:e.target.value})}
                      style={{ width:"100%", padding:"12px 14px", border:"1.5px solid rgba(17,17,17,0.12)", borderRadius:11, fontSize:14, color:"#111111", outline:"none", fontFamily:"inherit", background:"#FDFAF5", transition:"border-color 0.2s", boxSizing:"border-box" }}
                      onFocus={e=>{ e.target.style.borderColor="#111111"; e.target.style.background="#fff"; }}
                      onBlur={e=>{  e.target.style.borderColor="rgba(17,17,17,0.12)"; e.target.style.background="#FDFAF5"; }} />
                  </div>

                  {/* ── Cover note ── */}
                  <div style={{ marginBottom:24 }}>
                    <label style={{ fontSize:12, fontWeight:700, color:"#111111", display:"block", marginBottom:7, textTransform:"uppercase", letterSpacing:"0.5px" }}>
                      Anything you'd like us to know? <span style={{ color:"#999999", fontWeight:400, textTransform:"none" }}>(optional)</span>
                    </label>
                    <textarea rows={4} placeholder="Your experience, certifications, why MedCare, or anything else..."
                      value={form.message} onChange={e=>setForm({...form,message:e.target.value})}
                      style={{ width:"100%", padding:"12px 14px", border:"1.5px solid rgba(17,17,17,0.12)", borderRadius:11, fontSize:14, color:"#111111", outline:"none", resize:"vertical", fontFamily:"inherit", background:"#FDFAF5", transition:"border-color 0.2s", boxSizing:"border-box" }}
                      onFocus={e=>{ e.target.style.borderColor="#111111"; e.target.style.background="#fff"; }}
                      onBlur={e=>{  e.target.style.borderColor="rgba(17,17,17,0.12)"; e.target.style.background="#FDFAF5"; }} />
                  </div>

                  {/* ── Error message ── */}
                  {formError && (
                    <div style={{ background:"#FFF0F0", border:"1px solid rgba(220,38,38,0.2)", borderRadius:10, padding:"12px 16px", marginBottom:18, display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:15 }}>⚠️</span>
                      <span style={{ fontSize:13.5, color:"#dc2626", fontWeight:500 }}>{formError}</span>
                    </div>
                  )}

                  {/* ── Submit ── */}
                  <button type="submit" disabled={submitting}
                    style={{ width:"100%", background:submitting?"#444444":"#111111", color:"#fff", border:"none", padding:"15px", borderRadius:100, fontSize:15, fontWeight:700, cursor:submitting?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10, boxShadow:"0 4px 20px rgba(17,17,17,0.18)", transition:"transform 0.2s, box-shadow 0.2s", fontFamily:"inherit" }}
                    onMouseEnter={e=>{ if(!submitting){ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(17,17,17,0.26)"; }}}
                    onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(17,17,17,0.18)"; }}>
                    {submitting ? (
                      <>
                        <span style={{ width:18, height:18, border:"2px solid rgba(255,255,255,0.3)", borderTop:"2px solid #fff", borderRadius:"50%", animation:"spin 0.8s linear infinite", display:"inline-block" }} />
                        Sending your application...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <span style={{ background:"#F5E6A3", color:"#111111", borderRadius:"50%", width:26, height:26, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:800 }}>→</span>
                      </>
                    )}
                  </button>
                  <p style={{ fontSize:11.5, color:"#999999", textAlign:"center", marginTop:12 }}>🔒 Your information is never shared. We'll respond within 2 business days.</p>
                </form>
              </Reveal>
            )}
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        @keyframes dotsShift { 0%{background-position:0 0} 100%{background-position:38px 38px} }
        @keyframes breathe   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(1.5)} }
        @keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes floatYL   { 0%,100%{transform:translateY(0) rotate(-1.5deg)} 50%{transform:translateY(-10px) rotate(-1.5deg)} }
        @keyframes floatYR   { 0%,100%{transform:translateY(0) rotate(2deg)} 50%{transform:translateY(-9px) rotate(2deg)} }
        @keyframes dropIn    { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bounceIn  { 0%{transform:scale(0.4)} 70%{transform:scale(1.1)} 100%{transform:scale(1)} }
        @keyframes spin      { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

        /* ── TABLET ── */
        @media (max-width: 900px) {
          .why-grid      { grid-template-columns: 1fr !important; }
          .values-grid   { grid-template-columns: 1fr 1fr !important; }
          .team-grid     { grid-template-columns: repeat(3,1fr) !important; }
          .process-grid  { grid-template-columns: 1fr 1fr !important; }
          .perks-grid    { grid-template-columns: 1fr 1fr !important; }
        }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .careers-hero  { min-height: auto !important; }
          .hero-grid     { grid-template-columns: 1fr !important; gap: 36px !important; }
          .hero-photos   { display: none !important; }
          .hero-overlay  { background: linear-gradient(180deg,rgba(245,240,232,0.97) 0%,rgba(245,240,232,0.95) 60%,rgba(17,17,17,0.6) 100%) !important; }
          .stats-grid    { grid-template-columns: 1fr 1fr !important; gap: 28px 16px !important; }
          .values-grid   { grid-template-columns: 1fr !important; }
          .team-grid     { grid-template-columns: repeat(2,1fr) !important; }
          .process-grid  { grid-template-columns: 1fr !important; }
          .perks-grid    { grid-template-columns: 1fr 1fr !important; }
          .req-grid      { grid-template-columns: 1fr !important; }
          .form-row      { grid-template-columns: 1fr !important; }
        }

        @media (max-width: 480px) {
          .team-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .perks-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
