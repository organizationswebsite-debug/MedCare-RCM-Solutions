"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

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

/* ══ FLOATING LABEL INPUT ══ */
function FloatInput({ label, type="text", value, onChange, placeholder, required, textarea, rows=4 }) {
  const [focused, setFocused] = useState(false);
  const hasVal = value.length > 0;
  const lifted = focused || hasVal;
  const base = {
    width:"100%", boxSizing:"border-box",
    padding: lifted ? "22px 16px 8px" : "16px 16px",
    border:`1.5px solid ${focused ? "#111111" : "rgba(17,17,17,0.12)"}`,
    borderRadius:14, fontSize:14, color:"#111111",
    outline:"none", fontFamily:"inherit", background: focused ? "#fff" : "#FDFAF5",
    boxShadow: focused ? "0 0 0 3px rgba(17,17,17,0.07)" : "none",
    transition:"all 0.2s cubic-bezier(0.16,1,0.3,1)",
  };
  return (
    <div style={{ position:"relative" }}>
      <label style={{
        position:"absolute", left:16, pointerEvents:"none", zIndex:1,
        fontSize:   lifted ? 10 : 14,
        fontWeight: lifted ? 700 : 400,
        color:      focused ? "#111111" : hasVal ? "rgba(17,17,17,0.45)" : "#999999",
        textTransform: lifted ? "uppercase" : "none",
        letterSpacing: lifted ? "0.8px" : "0",
        top:       lifted ? 8 : (textarea ? 16 : "50%"),
        transform: lifted ? "none" : (textarea ? "none" : "translateY(-50%)"),
        transition:"all 0.2s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {label}{required && " *"}
      </label>
      {textarea ? (
        <textarea rows={rows} value={value} placeholder={focused ? placeholder : ""}
          onChange={e=>onChange(e.target.value)}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
          style={{ ...base, resize:"vertical", minHeight:120 }} />
      ) : (
        <input type={type} value={value} placeholder={focused ? placeholder : ""}
          onChange={e=>onChange(e.target.value)}
          onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
          style={base} />
      )}
    </div>
  );
}

/* ══ DATA ══ */
const SERVICES = [
  "Medical Billing","Revenue Cycle Management","Denial Management",
  "AR Recovery","Provider Credentialing","Hospital Billing",
  "Physician Billing","Patient Billing","Reporting & Analytics",
  "Laboratory Billing","Imaging Billing","ASC Billing","General Inquiry",
];

const CONTACT_INFO = [
  { icon:"📧", label:"Email Us",       value:"info@medcarercmsolutions.com",    href:"mailto:info@medcarercmsolutions.com",    desc:"We respond within 2 business hours" },
  { icon:"📞", label:"Call Us",        value:"+1 (409) 419-3788",       href:"tel:+14094193788",              desc:"Mon–Fri, 9am–6pm EST" },
  { icon:"🏢", label:"Headquarters",   value:"United States",           href:"#",                             desc:"100% USA-based team" },
  { icon:"⚡", label:"Response Time",  value:"Under 2 Hours",           href:"#",                             desc:"For all business inquiries" },
];

const TRUST_BADGES = [
  { icon:"🔒", text:"HIPAA Certified" },
  { icon:"✅", text:"CPC Specialists" },
  { icon:"🇺🇸", text:"USA-Based" },
  { icon:"⭐", text:"98%+ First-Pass" },
  { icon:"💰", text:"$50M+ Recovered" },
  { icon:"🏥", text:"500+ Providers" },
];

const FAQS = [
  { q:"How quickly will you respond?",          a:"Our team responds to all inquiries within 2 business hours during Mon–Fri, 9am–6pm EST." },
  { q:"Is the billing audit really free?",      a:"Yes — completely free with no obligation. We analyze your current billing setup and show you exactly where revenue is being lost." },
  { q:"How long does onboarding take?",         a:"Most practices go live in 5–7 business days with zero disruption to your existing clinical workflows." },
  { q:"Do you sign a BAA?",                     a:"Yes. We sign a Business Associate Agreement with every client before work begins — no exceptions." },
];

/* ══ PAGE ══ */
export default function ContactPage() {
  const [mounted,    setMounted]    = useState(false);
  const [form,       setForm]       = useState({ name:"", practice:"", email:"", phone:"", service:"", message:"" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [error,      setError]      = useState("");
  const [openFaq,    setOpenFaq]    = useState(null);
  const statsReveal = useReveal(0.15);

  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const rise = (d=0) => ({
    opacity:   mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(28px)",
    transition:`opacity 0.7s ease ${d}s, transform 0.7s ease ${d}s`,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSubmitting(true);
    try {
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type":"application/json" },
        body:    JSON.stringify(form),
      });
      const data = await res.json();
      if (data && data.success !== false) {
        setSubmitted(true);
      } else {
        setError("Something went wrong — please try again or email us directly at info@medcarercmsolutions.com");
      }
    } catch {
      setError("Network error — please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>

        {/* ══ HERO ══ */}
        <section style={{ position:"relative", backgroundImage:"linear-gradient(160deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 100%), linear-gradient(160deg,#F5F0E8 0%,#FDFAF5 50%,#F0EBE0 100%)", padding:"140px 24px 90px", overflow:"hidden", minHeight:"60vh", display:"flex", alignItems:"center" }}>
          {/* Animated dot grid */}
          <div style={{ position:"absolute", inset:0, zIndex:-2, backgroundImage:"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVwon4p1db_Do8FDa-XUGx2seXZIQKcH-S1PUAuftlsc7Y5LCo942lCkFc&s=10')", backgroundSize:"cover", backgroundPosition:"center", backgroundAttachment: "fixed" }} />
          {/* Glow */}
          <div style={{ position:"absolute", top:-100, right:-100, width:560, height:560, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,230,163,0.35),transparent 70%)", pointerEvents:"none" }} />
          <div style={{ position:"absolute", bottom:-80, left:-60, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(17,17,17,0.04),transparent 65%)", pointerEvents:"none" }} />

          <div style={{ maxWidth:1160, margin:"0 auto", width:"100%", display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center", position:"relative", zIndex:2 }} className="hero-grid">

            {/* Left */}
            <div>
              <div style={{ ...rise(0.05), display:"inline-flex", alignItems:"center", gap:8, background:"#F5E6A3", border:"1px solid rgba(17,17,17,0.15)", borderRadius:100, padding:"7px 18px", marginBottom:24 }}>
                <span style={{ width:7, height:7, borderRadius:"50%", background:"#111111", animation:"breathe 2s infinite", willChange:"transform,opacity" }} />
                <span style={{ fontSize:12, fontWeight:700, color:"#111111", letterSpacing:1.2 }}>Contact MedCare RCM Solutions</span>
              </div>
              <h1 style={{ ...rise(0.15), fontSize:"clamp(32px,5vw,56px)", fontWeight:800, color:"#ffffff", lineHeight:1.1, letterSpacing:-2, marginBottom:20 }}>
                Let's talk about<br/>
                your <span style={{ color:"#F5E6A3" }}>revenue cycle.</span>
              </h1>
              <p style={{ ...rise(0.28), fontSize:17, color:"#ffffff", lineHeight:1.8, marginBottom:36, maxWidth:460 }}>
                Get a free, no-obligation billing audit from our certified specialists — we'll identify exactly where revenue is being lost and show you how to recover it.
              </p>
              {/* Quick contact info */}
              <div style={{ ...rise(0.38), display:"flex", flexDirection:"column", gap:14 }}>
                {CONTACT_INFO.slice(0,2).map((c,i)=>(
                  <a key={i} href={c.href}
                    style={{ display:"flex", alignItems:"center", gap:14, background:"rgba(255,255,255,0.8)", backdropFilter:"blur(8px)", border:"1px solid rgba(17,17,17,0.1)", borderRadius:16, padding:"14px 18px", transition:"all 0.25s", textDecoration:"none" }}
                    onMouseEnter={e=>{ e.currentTarget.style.background="#fff"; e.currentTarget.style.transform="translateX(6px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(17,17,17,0.09)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.8)"; e.currentTarget.style.transform="translateX(0)"; e.currentTarget.style.boxShadow="none"; }}>
                    <div style={{ width:44, height:44, borderRadius:12, background:"#F5E6A3", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize:11, fontWeight:700, color:"#999999", textTransform:"uppercase", letterSpacing:1, marginBottom:2 }}>{c.label}</div>
                      <div style={{ fontSize:15, fontWeight:700, color:"#111111" }}>{c.value}</div>
                      <div style={{ fontSize:12, color:"#888888", marginTop:1 }}>{c.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right — floating cards */}
            <div style={{ position:"relative", height:420, ...rise(0.25) }} className="hero-cards">
              <div style={{ position:"absolute", top:0, left:"5%", right:0, background:"#fff", border:"1px solid rgba(17,17,17,0.09)", borderRadius:22, padding:"28px", boxShadow:"0 20px 56px rgba(17,17,17,0.1)", animation:"floatA 6s ease-in-out infinite", willChange:"transform", zIndex:3 }}>
                <div style={{ display:"flex", gap:12, marginBottom:18 }}>
                  {["🏥","👨‍⚕️","🧪","📸","💰","🔒"].map((ico,i)=>(
                    <div key={i} style={{ width:36, height:36, borderRadius:10, background:"#F5F0E8", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>{ico}</div>
                  ))}
                </div>
                <h3 style={{ fontSize:16, fontWeight:800, color:"#111111", marginBottom:6 }}>Free Billing Audit</h3>
                <p style={{ fontSize:13, color:"#666666", lineHeight:1.65, marginBottom:16 }}>We'll analyze your entire revenue cycle and show you exactly where money is being lost — completely free.</p>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", background:"#F5E6A3", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800 }}>→</div>
                  <span style={{ fontSize:13, fontWeight:700, color:"#111111" }}>Takes less than 5 minutes to request</span>
                </div>
              </div>

              {/* Bottom left */}
              <div style={{ position:"absolute", bottom:10, left:0, width:190, background:"#111111", borderRadius:18, padding:"18px 20px", boxShadow:"0 12px 36px rgba(17,17,17,0.2)", animation:"floatB 7s ease-in-out infinite", willChange:"transform", zIndex:4 }}>
                <div style={{ fontSize:28, fontWeight:900, color:"#F5E6A3", letterSpacing:-1, marginBottom:4 }}>98%+</div>
                <div style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.6)", textTransform:"uppercase", letterSpacing:0.5 }}>First-pass rate</div>
              </div>

              {/* Bottom right */}
              <div style={{ position:"absolute", bottom:20, right:0, background:"#F5E6A3", borderRadius:18, padding:"16px 20px", boxShadow:"0 12px 32px rgba(17,17,17,0.12)", animation:"floatC 5.5s ease-in-out infinite", willChange:"transform", zIndex:3 }}>
                <div style={{ fontSize:11, fontWeight:700, color:"rgba(17,17,17,0.5)", textTransform:"uppercase", letterSpacing:1, marginBottom:4 }}>Response time</div>
                <div style={{ fontSize:20, fontWeight:800, color:"#111111" }}>⚡ Under 2hrs</div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS BAR ══ */}
        <section ref={statsReveal.ref} style={{ background:"#111111", padding:"44px 24px" }}>
          <div className="stats-grid" style={{ maxWidth:1000, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20, textAlign:"center" }}>
            {[
              { val:"2hrs",  label:"Avg response time", icon:"⚡" },
              { val:"500+",  label:"Providers served",  icon:"🏥" },
              { val:"$50M+", label:"Revenue recovered",  icon:"💰" },
              { val:"98%+",  label:"First-pass rate",    icon:"✅" },
            ].map((s,i)=>(
              <div key={i} style={{ opacity:statsReveal.visible?1:0, transform:statsReveal.visible?"translateY(0)":"translateY(24px)", transition:`all 0.6s ease ${i*0.1}s` }}>
                <div style={{ fontSize:22, marginBottom:6 }}>{s.icon}</div>
                <div style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:800, color:"#F5E6A3", letterSpacing:-0.5 }}>{s.val}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:4, fontWeight:600, textTransform:"uppercase", letterSpacing:0.8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ MAIN SECTION — Form + Info ══ */}
        <section style={{ background:"#F5F0E8", padding:"96px 24px" }}>
          <div style={{ maxWidth:1160, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"start" }} className="contact-grid">

            {/* ── LEFT: Contact Form ── */}
            <Reveal dir="left">
              <div style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:24, overflow:"hidden", boxShadow:"0 8px 40px rgba(17,17,17,0.06)" }}>

                {/* Form header */}
                <div style={{ background:"#111111", padding:"24px 28px" }}>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"#F5E6A3", borderRadius:100, padding:"5px 14px", marginBottom:14 }}>
                    <span style={{ width:6, height:6, borderRadius:"50%", background:"#111111", animation:"breathe 2s infinite" }} />
                    <span style={{ fontSize:11, fontWeight:700, color:"#111111", letterSpacing:1 }}>Free · No Obligation</span>
                  </div>
                  <h2 style={{ fontSize:22, fontWeight:800, color:"#fff", letterSpacing:-0.5, marginBottom:6 }}>Request a Free Billing Audit</h2>
                  <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.6 }}>Fill out the form and we'll reach out within 2 business hours.</p>
                </div>

                {/* Form body */}
                <div style={{ padding:"28px 28px 24px" }}>
                  {submitted ? (
                    /* Success state */
                    <div style={{ textAlign:"center", padding:"20px 0", animation:"fadeSlideUp 0.5s ease" }}>
                      <div style={{ width:72, height:72, borderRadius:"50%", background:"#F5E6A3", display:"flex", alignItems:"center", justifyContent:"center", fontSize:32, margin:"0 auto 18px", animation:"bounceIn 0.6s cubic-bezier(0.34,1.56,0.64,1)" }}>🎉</div>
                      <h3 style={{ fontSize:22, fontWeight:800, color:"#111111", marginBottom:10 }}>Message received!</h3>
                      <p style={{ fontSize:14.5, color:"#666666", lineHeight:1.75, maxWidth:360, margin:"0 auto 22px" }}>
                        Thanks, <strong>{form.name.split(" ")[0]}</strong>! Our team will contact you at <strong>{form.email}</strong> within 2 business hours.
                      </p>
                      <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#F5F0E8", border:"1px solid rgba(17,17,17,0.08)", borderRadius:100, padding:"9px 18px", marginBottom:22 }}>
                        <span>🔒</span>
                        <span style={{ fontSize:12, color:"#555555", fontWeight:600 }}>HIPAA Compliant & Secure</span>
                      </div>
                      <br/>
                      <button onClick={()=>{ setSubmitted(false); setForm({ name:"",practice:"",email:"",phone:"",service:"",message:"" }); }}
                        style={{ background:"transparent", color:"#111111", border:"1.5px solid rgba(17,17,17,0.2)", padding:"11px 22px", borderRadius:100, fontSize:13.5, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:14 }}>

                      {/* Row 1: Name + Practice */}
                      <div className="form-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                        <FloatInput label="Full Name" required value={form.name} onChange={v=>setForm({...form,name:v})} placeholder="Dr. Jane Smith" />
                        <FloatInput label="Practice Name" required value={form.practice} onChange={v=>setForm({...form,practice:v})} placeholder="Smith Family Practice" />
                      </div>

                      {/* Row 2: Email + Phone */}
                      <div className="form-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                        <FloatInput label="Work Email" type="email" required value={form.email} onChange={v=>setForm({...form,email:v})} placeholder="jane@clinic.com" />
                        <FloatInput label="Phone Number" type="tel" value={form.phone} onChange={v=>setForm({...form,phone:v})} placeholder="+1 (800) 000-0000" />
                      </div>

                      {/* Service dropdown */}
                      <div style={{ position:"relative" }}>
                        <label style={{ fontSize:10, fontWeight:700, color:"rgba(17,17,17,0.4)", textTransform:"uppercase", letterSpacing:"0.8px", display:"block", marginBottom:7 }}>
                          Service Interested In *
                        </label>
                        <select required value={form.service} onChange={e=>setForm({...form,service:e.target.value})}
                          style={{ width:"100%", padding:"13px 16px", border:"1.5px solid rgba(17,17,17,0.12)", borderRadius:14, fontSize:14, color:form.service?"#111111":"#999999", outline:"none", fontFamily:"inherit", background:"#FDFAF5", appearance:"none", cursor:"pointer", boxSizing:"border-box", transition:"border-color 0.2s, box-shadow 0.2s" }}
                          onFocus={e=>{ e.target.style.borderColor="#111111"; e.target.style.boxShadow="0 0 0 3px rgba(17,17,17,0.07)"; e.target.style.background="#fff"; }}
                          onBlur={e=>{  e.target.style.borderColor="rgba(17,17,17,0.12)"; e.target.style.boxShadow="none"; e.target.style.background="#FDFAF5"; }}>
                          <option value="" disabled>Select a service</option>
                          {SERVICES.map(s=><option key={s} value={s}>{s}</option>)}
                        </select>
                        {/* Arrow */}
                        <div style={{ position:"absolute", right:14, top:"60%", transform:"translateY(-50%)", pointerEvents:"none", fontSize:12, color:"#999" }}>▼</div>
                      </div>

                      {/* Message */}
                      <FloatInput label="Message" textarea required
                        value={form.message} onChange={v=>setForm({...form,message:v})}
                        placeholder="Tell us about your billing challenges, current denial rates, specialties, or anything else..." />

                      {/* Error */}
                      {error && (
                        <div style={{ background:"#FEF2F2", border:"1px solid rgba(220,38,38,0.2)", borderRadius:12, padding:"12px 16px", display:"flex", alignItems:"center", gap:8 }}>
                          <span>⚠️</span>
                          <span style={{ fontSize:13, color:"#DC2626", fontWeight:500 }}>{error}</span>
                        </div>
                      )}

                      {/* Submit */}
                      <button type="submit" disabled={submitting}
                        style={{ width:"100%", padding:"16px 20px", background:submitting?"#444":"#111111", color:"#fff", border:"none", borderRadius:100, fontSize:15, fontWeight:700, cursor:submitting?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10, boxShadow:"0 4px 20px rgba(17,17,17,0.18)", transition:"transform 0.2s, box-shadow 0.2s", fontFamily:"inherit" }}
                        onMouseEnter={e=>{ if(!submitting){e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 28px rgba(17,17,17,0.28)";} }}
                        onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 4px 20px rgba(17,17,17,0.18)"; }}
                        onMouseDown={e=>{ if(!submitting) e.currentTarget.style.transform="scale(0.98)"; }}
                        onMouseUp={e=>{ if(!submitting) e.currentTarget.style.transform="translateY(-2px)"; }}>
                        {submitting ? (
                          <><span style={{ width:18,height:18,border:"2px solid rgba(255,255,255,0.3)",borderTop:"2px solid #fff",borderRadius:"50%",animation:"spin 0.8s linear infinite",display:"inline-block" }} /> Sending message...</>
                        ) : (
                          <>Send Message <span style={{ background:"#F5E6A3",color:"#111111",borderRadius:"50%",width:26,height:26,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800 }}>→</span></>
                        )}
                      </button>

                      <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                        <span style={{ fontSize:13 }}>🔒</span>
                        <span style={{ fontSize:11.5, color:"rgba(17,17,17,0.4)", fontWeight:600 }}>100% HIPAA Compliant · Your info is never shared</span>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </Reveal>

            {/* ── RIGHT: Info + FAQ ── */}
            <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

              {/* Contact info cards */}
              <Reveal dir="right">
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }} className="info-grid">
                  {CONTACT_INFO.map((c,i)=>(
                    <a key={i} href={c.href}
                      style={{ display:"flex", flexDirection:"column", gap:10, background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:18, padding:"20px 18px", textDecoration:"none", boxShadow:"0 2px 14px rgba(17,17,17,0.04)", transition:"all 0.25s ease" }}
                      onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow="0 14px 36px rgba(17,17,17,0.09)"; e.currentTarget.style.borderColor="#111111"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 2px 14px rgba(17,17,17,0.04)"; e.currentTarget.style.borderColor="rgba(17,17,17,0.08)"; }}>
                      <div style={{ width:44, height:44, borderRadius:12, background:"#F5F0E8", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{c.icon}</div>
                      <div>
                        <div style={{ fontSize:10, fontWeight:700, color:"#999999", textTransform:"uppercase", letterSpacing:1, marginBottom:3 }}>{c.label}</div>
                        <div style={{ fontSize:14, fontWeight:700, color:"#111111", marginBottom:2 }}>{c.value}</div>
                        <div style={{ fontSize:11.5, color:"#888888" }}>{c.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </Reveal>

              {/* Trust badges */}
              <Reveal delay={0.08}>
                <div style={{ background:"#111111", borderRadius:20, padding:"22px 24px" }}>
                  <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:1.5, marginBottom:14 }}>Why choose MedCare RCM</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                    {TRUST_BADGES.map((b,i)=>(
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:7, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, padding:"9px 12px", transition:"all 0.2s" }}
                        onMouseEnter={e=>{ e.currentTarget.style.background="rgba(245,230,163,0.1)"; e.currentTarget.style.borderColor="rgba(245,230,163,0.2)"; }}
                        onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; }}>
                        <span style={{ fontSize:14 }}>{b.icon}</span>
                        <span style={{ fontSize:11.5, fontWeight:600, color:"rgba(255,255,255,0.6)" }}>{b.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* FAQ */}
              <Reveal delay={0.12}>
                <div style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:20, overflow:"hidden", boxShadow:"0 2px 14px rgba(17,17,17,0.04)" }}>
                  <div style={{ padding:"16px 22px", background:"#F5F0E8", borderBottom:"1px solid rgba(17,17,17,0.07)" }}>
                    <span style={{ fontSize:13, fontWeight:700, color:"#111111" }}>Common Questions</span>
                  </div>
                  {FAQS.map((f,i)=>(
                    <div key={i} style={{ borderBottom:i<FAQS.length-1?"1px solid rgba(17,17,17,0.06)":"none" }}>
                      <button onClick={()=>setOpenFaq(openFaq===i?null:i)}
                        style={{ width:"100%", background:"none", border:"none", padding:"16px 22px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, cursor:"pointer", textAlign:"left", fontFamily:"inherit", transition:"background 0.2s" }}
                        onMouseEnter={e=>e.currentTarget.style.background="rgba(17,17,17,0.02)"}
                        onMouseLeave={e=>e.currentTarget.style.background="none"}>
                        <span style={{ fontSize:13.5, fontWeight:700, color:"#111111", flex:1 }}>{f.q}</span>
                        <div style={{ width:26, height:26, borderRadius:"50%", background:openFaq===i?"#111111":"#F5F0E8", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.25s" }}>
                          <span style={{ fontSize:16, color:openFaq===i?"#F5E6A3":"#555", transform:openFaq===i?"rotate(45deg)":"rotate(0)", display:"block", lineHeight:1, transition:"transform 0.25s" }}>+</span>
                        </div>
                      </button>
                      <div style={{ maxHeight:openFaq===i?"200px":"0", opacity:openFaq===i?1:0, overflow:"hidden", transition:"all 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
                        <p style={{ fontSize:13.5, color:"#555555", lineHeight:1.75, padding:"0 22px 16px" }}>{f.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ══ CTA BANNER ══ */}
        <section style={{ background:"#111111", padding:"80px 24px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-80, right:-80, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,230,163,0.1),transparent 70%)", pointerEvents:"none" }} />
          <Reveal dir="scale">
            <div style={{ maxWidth:620, margin:"0 auto", textAlign:"center", position:"relative", zIndex:2 }}>
              <div style={{ display:"inline-block", background:"#F5E6A3", borderRadius:100, padding:"6px 20px", fontSize:11, fontWeight:800, color:"#111111", letterSpacing:2, textTransform:"uppercase", marginBottom:22 }}>No Obligation</div>
              <h2 style={{ fontSize:"clamp(24px,4vw,42px)", fontWeight:800, color:"#fff", letterSpacing:-1, marginBottom:16, lineHeight:1.15 }}>
                Not sure which service<br/>you need?
              </h2>
              <p style={{ fontSize:16, color:"rgba(255,255,255,0.5)", lineHeight:1.8, marginBottom:36, maxWidth:460, margin:"0 auto 36px" }}>
                Just send us a message and our team will assess your current billing setup — then recommend exactly what will help most.
              </p>
              <div className="cta-btns" style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
                <a href="#top" onClick={e=>{ e.preventDefault(); window.scrollTo({top:0,behavior:"smooth"}); }}
                  style={{ background:"#F5E6A3", color:"#111111", padding:"15px 30px", borderRadius:100, fontSize:15, fontWeight:800, display:"inline-flex", alignItems:"center", gap:8, cursor:"pointer" }}>
                  Send a Message →
                </a>
                <Link href="/services" style={{ background:"transparent", color:"rgba(255,255,255,0.6)", padding:"15px 26px", borderRadius:100, fontSize:15, fontWeight:600, border:"1.5px solid rgba(255,255,255,0.18)", display:"inline-block" }}>
                  View All Services
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

      </main>
      <Footer />

      <style>{`
        @keyframes dotsShift  { 0%{background-position:0 0} 100%{background-position:38px 38px} }
        @keyframes breathe    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(1.5)} }
        @keyframes floatA     { 0%,100%{transform:translateY(0) rotate(-0.5deg)} 50%{transform:translateY(-10px) rotate(-0.5deg)} }
        @keyframes floatB     { 0%,100%{transform:translateY(0) rotate(1.5deg)} 50%{transform:translateY(-9px) rotate(1.5deg)} }
        @keyframes floatC     { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-8px) rotate(-1deg)} }
        @keyframes bounceIn   { 0%{transform:scale(0.4)} 70%{transform:scale(1.1)} 100%{transform:scale(1)} }
        @keyframes spin       { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeSlideUp{ from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

        @media (max-width: 960px) {
          .hero-grid    { grid-template-columns: 1fr !important; gap: 40px !important; }
          .hero-cards   { display: none !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr 1fr !important; gap: 24px 12px !important; }
          .form-row   { grid-template-columns: 1fr !important; }
          .info-grid  { grid-template-columns: 1fr 1fr !important; }
          .cta-btns   { flex-direction: column !important; align-items: center !important; }
          .cta-btns a { width: 100% !important; text-align: center !important; justify-content: center !important; }
        }
        @media (max-width: 400px) {
          .info-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
