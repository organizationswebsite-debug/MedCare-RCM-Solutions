"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const t = { up:"translateY(32px)", left:"translateX(-32px)", right:"translateX(32px)", scale:"scale(0.94)" };
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

const DEPARTMENTS = ["All", "Leadership", "Operations", "Compliance", "Revenue Recovery", "Provider Services", "Data & Analytics"];

const TEAM = [
  {
    slug: "moazzam-founder",
    name: "Moazzam",
    role: "Founder & CEO",
    dept: "Administration",
    initials: "MZ",
    img: "/photo.png",
    expertise: ["Revenue Cycle Strategy", "Business Development", "Healthcare Operations", "Team Leadership"],
    bio: "Founder of Moaz Group of Companies. Launched MedCare RCM to give providers a billing partner they can genuinely trust.",
    years: "5+ years",
  },
  {
    slug: "operations-lead",
    name: "Jhon Doe",
    role: "Head of Billing Operations",
    dept: "Operations",
    initials: "JD",
    img: "https://images.unsplash.com/photo-1713946598467-fcf9332c56ea?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fit=crop&crop=face",
    expertise: ["Medical Billing", "Claims Management", "Denial Management", "E&M Coding"],
    bio: "CPC-certified billing specialist with 12+ years of multi-specialty billing experience. Maintains our 98%+ first-pass rate.",
    years: "12+ years",
  },
  {
    slug: "compliance-officer",
    name: "James Holloway",
    role: "HIPAA & Compliance Officer",
    dept: "Compliance",
    initials: "JH",
    img: "https://images.unsplash.com/photo-1562788869-4ed32648eb72?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fit=crop&crop=face",
    expertise: ["HIPAA Compliance", "Data Security", "Audit Management", "Regulatory Affairs"],
    bio: "Certified HIPAA compliance professional ensuring every process and system meets the highest standards.",
    years: "10+ years",
  },
  {
    slug: "ar-recovery-lead",
    name: "Filip Carter",
    role: "A/R Recovery Lead",
    dept: "Revenue Recovery",
    initials: "FC",
    img: "https://images.unsplash.com/photo-1733348137468-90b917d2ebf1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D&fit=crop&crop=face",
    expertise: ["Denial Appeals", "AR Recovery", "Payer Negotiation", "Collections Strategy"],
    bio: "70%+ first-level appeal success rate. Personally recovered over $15M in previously written-off revenue.",
    years: "9+ years",
  },
  {
    slug: "credentialing-manager",
    name: "Marcus Webb",
    role: "Credentialing Manager",
    dept: "Provider Services",
    initials: "MW",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&fit=crop&crop=face",
    expertise: ["Provider Enrollment", "CAQH Management", "Medicare Credentialing", "Payer Relations"],
    bio: "Manages provider credentialing for 500+ providers across Medicare, Medicaid, and all major commercial payers.",
    years: "8+ years",
  },
  {
    slug: "analytics-lead",
    name: "Rachel Thompson",
    role: "Analytics & Reporting Lead",
    dept: "Data & Analytics",
    initials: "RT",
    img: "https://plus.unsplash.com/premium_photo-1682430145886-39c8decd85fa?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fit=crop&crop=face",
    expertise: ["Revenue Analytics", "KPI Reporting", "Data Visualization", "Business Intelligence"],
    bio: "Designs live KPI dashboards and monthly executive reports that drive measurable improvements for every client.",
    years: "7+ years",
  },
  {
    slug: "coding-specialist",
    name: "Kevin Park",
    role: "Senior Coding Specialist",
    dept: "Operations",
    initials: "KP",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&fit=crop&crop=face",
    expertise: ["ICD-10 Coding", "CPT Compliance", "Specialty Coding", "Audit Defense"],
    bio: "CCS-certified coder with expertise across 20+ specialties. Ensures every claim is coded at its highest accurate level.",
    years: "11+ years",
  },
  {
    slug: "patient-billing-lead",
    name: "Tony Armstrong",
    role: "Patient Billing Manager",
    dept: "Operations",
    initials: "TA",
    img: "https://plus.unsplash.com/premium_photo-1663099872661-27f7136d558d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8&fit=crop&crop=face",
    expertise: ["Patient Collections", "Payment Portals", "Statement Generation", "Balance Resolution"],
    bio: "Leads patient billing operations with a compassionate approach that improves collections by 25-30% without damaging relationships.",
    years: "8+ years",
  },
  {
    slug: "technology-lead",
    name: "Thomas Nguyen",
    role: "Technology & Systems Lead",
    dept: "Data & Analytics",
    initials: "TN",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80&fit=crop&crop=face",
    expertise: ["EHR Integration", "Clearinghouse Systems", "RCM Technology", "Data Security"],
    bio: "Manages MedCare's technology stack including EHR integrations, clearinghouse connections, and our live KPI dashboard infrastructure.",
    years: "9+ years",
  },
];

export default function TeamPage() {
  const [activeDept, setActiveDept] = useState("All");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const heroReveal = useReveal(0.1);

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const filtered = activeDept === "All" ? TEAM : TEAM.filter(m => m.dept === activeDept);

  const rise = (d = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s ease ${d}s, transform 0.7s ease ${d}s`,
  });

  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ── */}
        <section style={{ background:"linear-gradient(160deg,#F5F0E8 0%,#FDFAF5 50%,#F0EBE0 100%)", padding:"140px 24px 80px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, zIndex:-2, backgroundImage:"url('https://img.magnific.com/free-vector/people-working-as-team-background-flat-style_23-2147767891.jpg?semt=ais_hybrid&w=740&q=80')", backgroundSize:"cover", backgroundPosition:"center", backgroundAttachment: "fixed" }} />
          <div style={{ position:"absolute", top:-100, right:-100, width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,230,163,0.3),transparent 70%)", pointerEvents:"none" }} />

          <div style={{ maxWidth:760, margin:"0 auto", textAlign:"center", position:"relative", zIndex:2 }}>
            <div style={{ ...rise(0.05), display:"inline-flex", alignItems:"center", gap:8, background:"#F5E6A3", border:"1px solid rgba(17,17,17,0.15)", borderRadius:100, padding:"7px 18px", marginBottom:22 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"#111111", animation:"breathe 2s infinite" , willChange:"transform" }} />
              <span style={{ fontSize:12, fontWeight:700, color:"#111111", letterSpacing:1.2 }}>Meet Our Team</span>
            </div>
            <h1 style={{ ...rise(0.15), fontSize:"clamp(32px,5vw,56px)", fontWeight:800, color:"#111111", letterSpacing:-2, marginBottom:20, lineHeight:1.1 }}>
              The certified specialists<br/>
              <span style={{ color:"#111111", opacity:0.28 }}>behind every result</span>
            </h1>
            <p style={{ ...rise(0.28), fontSize:17, color:"#555555", lineHeight:1.8, maxWidth:520, margin:"0 auto" }}>
              9 billing professionals. Certified. USA-based. Obsessed with getting your claims paid right the first time.
            </p>
          </div>
        </section>

        {/* ── DEPT FILTER ── */}
        <section style={{ background:"#fff", borderBottom:"1px solid rgba(17,17,17,0.08)", padding:"20px 24px", position:"sticky", top:67, zIndex:50, backdropFilter:"blur(12px)" }}>
          <div style={{ maxWidth:1160, margin:"0 auto", display:"flex", justifyContent:"center" }}>
            <div style={{ background:"#F5F0E8", border:"1px solid rgba(17,17,17,0.08)", borderRadius:100, padding:5, display:"flex", alignItems:"center", gap:4, overflowX:"auto" }} className="filter-scroll">
              {DEPARTMENTS.map(dept => {
                const isActive = activeDept === dept;
                return (
                  <button key={dept} onClick={() => setActiveDept(dept)}
                    style={{ padding:"9px 18px", borderRadius:100, border:"none", background:isActive?"#111111":"transparent", color:isActive?"#fff":"#555555", fontSize:13.5, fontWeight:isActive?700:500, cursor:"pointer", whiteSpace:"nowrap", flexShrink:0, transition:"all 0.22s ease", fontFamily:"inherit" }}
                    onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = "#111111"; e.currentTarget.style.background = "rgba(17,17,17,0.06)"; }}}
                    onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = "#555555"; e.currentTarget.style.background = "transparent"; }}}>
                    {dept}
                    {isActive && <span style={{ marginLeft:6, fontSize:11, opacity:0.6 }}>({filtered.length})</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── TEAM GRID ── */}
        <section style={{ background:"#F5F0E8", padding:"64px 24px 96px" }}>
          <div style={{ maxWidth:1160, margin:"0 auto" }}>
            <div className="team-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:22 }}>
              {filtered.map((member, i) => (
                <Reveal key={member.slug} delay={i * 0.07}>
                  <div onClick={() => router.push(`/about/team/${member.slug}`)}
                    style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:22, overflow:"hidden", cursor:"pointer", transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)", boxShadow:"0 4px 20px rgba(17,17,17,0.05)" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 24px 52px rgba(17,17,17,0.13)"; e.currentTarget.style.borderColor = "#111111"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(17,17,17,0.05)"; e.currentTarget.style.borderColor = "rgba(17,17,17,0.08)"; }}>

                    {/* Photo */}
                    <div style={{ position:"relative", height:220, overflow:"hidden" }}>
                      <img loading="lazy" src={member.img} alt={member.name}
                        style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", transition:"transform 0.5s ease" }}
                        onMouseEnter={e => e.target.style.transform = "scale(1.06)"}
                        onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom,transparent 45%,rgba(17,17,17,0.5) 100%)" }} />
                      <div style={{ position:"absolute", top:14, left:14, background:"#F5E6A3", borderRadius:100, padding:"4px 12px", fontSize:11, fontWeight:700, color:"#111111" }}>{member.dept}</div>
                      <div style={{ position:"absolute", top:14, right:14, background:"rgba(17,17,17,0.5)", backdropFilter:"blur(8px)", borderRadius:100, padding:"4px 12px", fontSize:11, fontWeight:600, color:"#fff" }}>{member.years}</div>
                    </div>

                    {/* Content */}
                    <div style={{ padding:"24px 24px 26px" }}>
                      <h3 style={{ fontSize:19, fontWeight:800, color:"#111111", marginBottom:4 }}>{member.name}</h3>
                      <p style={{ fontSize:13, color:"#888888", fontWeight:500, marginBottom:14 }}>{member.role}</p>
                      <p style={{ fontSize:13.5, color:"#555555", lineHeight:1.65, marginBottom:16 }}>{member.bio}</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:18 }}>
                        {member.expertise.slice(0, 2).map((ex, j) => (
                          <span key={j} style={{ fontSize:11, fontWeight:600, color:"#555555", background:"#F5F0E8", borderRadius:100, padding:"4px 10px" }}>{ex}</span>
                        ))}
                      </div>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:14, borderTop:"1px solid rgba(17,17,17,0.07)" }}>
                        <span style={{ fontSize:13, fontWeight:700, color:"#111111" }}>View full profile</span>
                        <div style={{ width:32, height:32, borderRadius:"50%", background:"#F5E6A3", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800, color:"#111111" }}>→</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign:"center", padding:"80px 24px" }}>
                <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
                <h3 style={{ fontSize:20, fontWeight:700, color:"#111111" }}>No team members in this department yet</h3>
              </div>
            )}
          </div>
        </section>

        {/* ── JOIN CTA ── */}
        <section style={{ background:"#111111", padding:"80px 24px" }}>
          <Reveal dir="scale">
            <div style={{ maxWidth:640, margin:"0 auto", textAlign:"center" }}>
              <div style={{ display:"inline-block", background:"#F5E6A3", borderRadius:100, padding:"6px 18px", fontSize:11, fontWeight:800, color:"#111111", letterSpacing:1.5, textTransform:"uppercase", marginBottom:22 }}>We're Hiring</div>
              <h2 style={{ fontSize:"clamp(24px,4vw,40px)", fontWeight:800, color:"#fff", letterSpacing:-1, marginBottom:16, lineHeight:1.15 }}>Want to join this team?</h2>
              <p style={{ fontSize:15, color:"rgba(255,255,255,0.5)", lineHeight:1.75, marginBottom:32 }}>We're always looking for certified billing professionals who are passionate about healthcare revenue cycle management.</p>
              <Link href="/careers" style={{ background:"#F5E6A3", color:"#111111", padding:"15px 30px", borderRadius:100, fontSize:15, fontWeight:800, display:"inline-flex", alignItems:"center", gap:8 }}>
                View Open Roles →
              </Link>
            </div>
          </Reveal>
        </section>

      </main>
      <Footer />

      <style>{`
        @keyframes dotsShift { 0%{background-position:0 0} 100%{background-position:38px 38px} }
        @keyframes breathe   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(1.5)} }
        .filter-scroll { -ms-overflow-style:none; scrollbar-width:none; }
        .filter-scroll::-webkit-scrollbar { display:none; }
        @media (max-width: 900px) { .team-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .team-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
