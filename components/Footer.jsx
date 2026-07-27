"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

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

/* ── Data ── */
const FOOTER_COLS = [
  {
    title: "Services",
    icon: "🧾",
    links: [
      { label:"Revenue Cycle Management", href:"/services" },
      { label:"Medical Billing",          href:"/services/hospital-billing" },
      { label:"Physician Billing",        href:"/services/physician-billing" },
      { label:"Denial Management",        href:"/services/denial-management" },
      { label:"AR Recovery",              href:"/services/ar-recovery" },
      { label:"Provider Credentialing",   href:"/services/credentialing" },
      { label:"Patient Billing",          href:"/services/patient-billing" },
      { label:"Reporting & Analytics",    href:"/services/reporting-analytics" },
    ],
  },
  {
    title: "Specialties",
    icon: "🏥",
    links: [
      { label:"Family Medicine",  href:"/specialties/family-medicine" },
      { label:"Cardiology",       href:"/specialties/cardiology" },
      { label:"Orthopedics",      href:"/specialties/orthopedics" },
      { label:"Mental Health",    href:"/specialties/mental-health" },
      { label:"Pediatrics",       href:"/specialties/pediatrics" },
      { label:"Oncology",         href:"/specialties/oncology" },
      { label:"Dermatology",      href:"/specialties/dermatology" },
      { label:"View all 40+",     href:"/specialties" },
    ],
  },
  {
    title: "Company",
    icon: "🏢",
    links: [
      { label:"About Us",      href:"/about" },
      { label:"Our Team",      href:"/about/team" },
      { label:"Testimonials",  href:"/testimonials" },
      { label:"Blog",          href:"/blog" },
      { label:"Careers",       href:"/careers" },
      { label:"Pricing",       href:"/pricing" },
      { label:"FAQ",           href:"/faq" },
      { label:"Contact Us",    href:"/contact" },
    ],
  },
  {
    title: "Support",
    icon: "📞",
    links: [
      { label:"info@medcarercmsolutions.com",        href:"mailto:info@medcarercmsolutions.com" },
      { label:"+1 (409) 419-3788",          href:"tel:+14094193788" },
      { label:"Mon–Fri, 9am–6pm EST",       href:"#" },
      { label:"USA-Based Team",             href:"/about" },
      { label:"HIPAA Compliance",           href:"/faq" },
      { label:"Privacy Policy",             href:"#" },
      { label:"Terms of Service",           href:"#" },
    ],
  },
];

const BADGES = [
  { icon:"🔒", label:"HIPAA Certified" },
  { icon:"✅", label:"CPC Specialists" },
  { icon:"🇺🇸", label:"USA-Based" },
  { icon:"⚡", label:"98%+ First-Pass" },
];

const SOCIALS = [
  { icon:"in",  label:"LinkedIn",  href:"https://www.linkedin.com/company/medcarercmsolutions" },
  { icon:"f",   label:"Facebook",  href:"https://www.facebook.com/medcarercmsolutions" },
  { icon:"📷",  label:"Instagram", href:"https://www.instagram.com/medcarercmsolutions?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
];

export default function Footer() {
  const ctaReveal  = useReveal(0.15);
  const mainReveal = useReveal(0.08);

  /* Mobile accordion state */
  const [openCol, setOpenCol] = useState(null);

  return (
    <footer style={{ background:"#111111", fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", overflow:"hidden" }}>

      {/* ══ CTA BANNER ══ */}
      <div ref={ctaReveal.ref} style={{
        borderBottom:"1px solid rgba(255,255,255,0.07)",
        padding:"56px 24px",
        position:"relative", overflow:"hidden",
        opacity: ctaReveal.visible ? 1 : 0,
        transform: ctaReveal.visible ? "translateY(0)" : "translateY(32px)",
        transition:"opacity 0.7s ease, transform 0.7s ease",
      }}>
        {/* Glow */}
        <div style={{ position:"absolute", top:-100, right:"8%", width:420, height:420, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,230,163,0.12),transparent 65%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-60, left:"5%", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,240,232,0.05),transparent 65%)", pointerEvents:"none" }} />

        <div style={{ maxWidth:900, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:24, position:"relative", zIndex:2 }}>
          <div>
            <h3 style={{ fontSize:"clamp(20px,3vw,26px)", fontWeight:800, color:"#fff", marginBottom:8, letterSpacing:-0.5 }}>
              Ready to maximize your revenue?
            </h3>
            <p style={{ fontSize:14, color:"rgba(255,255,255,0.4)", maxWidth:420, lineHeight:1.65 }}>
              Get a free, no-obligation billing audit from our certified specialists — we'll show you exactly where you're losing money.
            </p>
          </div>
          <Link href="/contact" style={{
            background:"#F5E6A3", color:"#111111",
            padding:"15px 28px", borderRadius:100,
            fontSize:14, fontWeight:800, whiteSpace:"nowrap",
            boxShadow:"0 4px 20px rgba(245,230,163,0.25)",
            display:"inline-flex", alignItems:"center", gap:8,
            transition:"transform 0.2s, box-shadow 0.2s",
            flexShrink:0,
          }}
            onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 10px 30px rgba(245,230,163,0.4)"; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(245,230,163,0.25)"; }}>
            Get Free Audit →
          </Link>
        </div>
      </div>

      {/* ══ MAIN GRID ══ */}
      <div ref={mainReveal.ref} style={{ maxWidth:1240, margin:"0 auto", padding:"56px 24px 32px" }}>

        {/* Brand column */}
        <div style={{
          marginBottom:40, paddingBottom:32,
          borderBottom:"1px solid rgba(255,255,255,0.07)",
          display:"flex", alignItems:"flex-start", justifyContent:"space-between",
          flexWrap:"wrap", gap:24,
          opacity: mainReveal.visible ? 1 : 0,
          transform: mainReveal.visible ? "translateY(0)" : "translateY(24px)",
          transition:"opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
        }}>
          <div style={{ maxWidth:320 }}>
            <div style={{ marginBottom:16 }}>
              <Image src="/logo.png" alt="MedCare RCM Solutions" width={180} height={54}
                style={{ objectFit:"contain", height:40, width:"auto", filter:"brightness(0) invert(1)", opacity:0.9 }} />
            </div>
            <p style={{ fontSize:13.5, color:"rgba(255,255,255,0.35)", lineHeight:1.8, marginBottom:18 }}>
              Full-service revenue cycle management for healthcare providers across the United States. From claim submission to final payment — we handle it all.
            </p>
            <p style={{ fontSize:11, color:"rgba(255,255,255,0.18)", fontWeight:500 }}>A Moaz Group of Companies subsidiary</p>
          </div>

          {/* Social icons */}
          <div style={{ display:"flex", flexDirection:"column", gap:12, alignItems:"flex-end" }} className="social-col">
            <p style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:1.5 }}>Follow us</p>
            <div style={{ display:"flex", gap:8 }}>
              {SOCIALS.map((s,i)=>(
                <a key={i} href={s.href} aria-label={s.label} target="_blank" rel="noreferrer"
                  style={{
                    width:38, height:38, borderRadius:"50%",
                    background:"rgba(255,255,255,0.06)",
                    border:"1px solid rgba(255,255,255,0.1)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:13, color:"rgba(255,255,255,0.5)",
                    transition:"all 0.25s", textDecoration:"none",
                  }}
                  onMouseEnter={e=>{ e.currentTarget.style.background="#F5E6A3"; e.currentTarget.style.color="#111111"; e.currentTarget.style.border="1px solid #F5E6A3"; e.currentTarget.style.transform="translateY(-3px)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.color="rgba(255,255,255,0.5)"; e.currentTarget.style.border="1px solid rgba(255,255,255,0.1)"; e.currentTarget.style.transform="translateY(0)"; }}>
                  {s.label === "Instagram" ? (
                    <svg viewBox="0 0 24 24" width={18} height={18} style={{ display: "block", color: "currentColor" }} aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm10.5 1.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5ZM12 7.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5Zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5Z"
                      />
                    </svg>
                  ) : s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── DESKTOP LINK COLUMNS ── */}
        <div className="footer-desktop-cols" style={{
          display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:40, marginBottom:48,
          opacity: mainReveal.visible ? 1 : 0,
          transform: mainReveal.visible ? "translateY(0)" : "translateY(24px)",
          transition:"opacity 0.7s ease 0.18s, transform 0.7s ease 0.18s",
        }}>
          {FOOTER_COLS.map((col,ci)=>(
            <div key={ci}>
              <h4 style={{ fontSize:12, fontWeight:700, color:"#F5E6A3", marginBottom:16, textTransform:"uppercase", letterSpacing:"1.2px", display:"flex", alignItems:"center", gap:7 }}>
                <span>{col.icon}</span> {col.title}
              </h4>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {col.links.map((l,li)=>(
                  <Link key={li} href={l.href}
                    style={{ fontSize:13.5, color:"rgba(255,255,255,0.38)", transition:"color 0.2s, transform 0.2s", display:"inline-block" }}
                    onMouseEnter={e=>{ e.currentTarget.style.color="#F5E6A3"; e.currentTarget.style.transform="translateX(4px)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.color="rgba(255,255,255,0.38)"; e.currentTarget.style.transform="translateX(0)"; }}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── MOBILE ACCORDION COLUMNS ── */}
        <div className="footer-mobile-cols" style={{ display:"none", flexDirection:"column", gap:4, marginBottom:40 }}>
          {FOOTER_COLS.map((col,ci)=>(
            <div key={ci} style={{
              border:"1px solid rgba(255,255,255,0.07)",
              borderRadius:16, overflow:"hidden",
              opacity: mainReveal.visible ? 1 : 0,
              transform: mainReveal.visible ? "translateY(0)" : "translateY(20px)",
              transition:`opacity 0.6s ease ${0.05+ci*0.08}s, transform 0.6s ease ${0.05+ci*0.08}s`,
            }}>
              <button onClick={()=>setOpenCol(openCol===ci?null:ci)}
                style={{
                  width:"100%", background: openCol===ci ? "rgba(245,230,163,0.08)" : "rgba(255,255,255,0.03)",
                  border:"none", padding:"16px 18px",
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  cursor:"pointer", fontFamily:"inherit",
                  transition:"background 0.25s",
                }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ width:32, height:32, borderRadius:8, background: openCol===ci ? "#F5E6A3" : "rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, transition:"background 0.25s" }}>{col.icon}</span>
                  <span style={{ fontSize:14, fontWeight:700, color:"#fff" }}>{col.title}</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none"
                  style={{ transform:openCol===ci?"rotate(180deg)":"rotate(0)", transition:"transform 0.35s cubic-bezier(0.16,1,0.3,1)", flexShrink:0 }}>
                  <path d="M2 4l4 4 4-4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div style={{
                maxHeight: openCol===ci ? "500px" : "0px",
                opacity: openCol===ci ? 1 : 0,
                overflow:"hidden",
                transition:"max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
              }}>
                <div style={{ padding:"8px 18px 18px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px 16px" }}>
                  {col.links.map((l,li)=>(
                    <Link key={li} href={l.href}
                      style={{
                        fontSize:13, color:"rgba(255,255,255,0.45)",
                        display:"flex", alignItems:"center", gap:6,
                        transition:"color 0.2s",
                        animation: openCol===ci ? `fadeSlideIn 0.3s ease ${li*0.04}s both` : "none",
                      }}
                      onMouseEnter={e=>e.currentTarget.style.color="#F5E6A3"}
                      onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.45)"}>
                      <span style={{ width:4, height:4, borderRadius:"50%", background:"rgba(245,230,163,0.4)", flexShrink:0 }} />
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── TRUST BADGES ── */}
        <div style={{
          display:"flex", justifyContent:"center", gap:10, flexWrap:"wrap",
          marginBottom:32, paddingBottom:32,
          borderBottom:"1px solid rgba(255,255,255,0.07)",
          opacity: mainReveal.visible ? 1 : 0,
          transition:"opacity 0.7s ease 0.3s",
        }}>
          {BADGES.map((b,i)=>(
            <div key={i} style={{
              display:"flex", alignItems:"center", gap:7,
              background:"rgba(255,255,255,0.04)",
              border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:100, padding:"8px 16px",
              transition:"all 0.25s",
              animation: mainReveal.visible ? `fadeSlideIn 0.5s ease ${0.35+i*0.07}s both` : "none",
            }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(245,230,163,0.1)"; e.currentTarget.style.borderColor="rgba(245,230,163,0.3)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.08)"; }}>
              <span style={{ fontSize:14 }}>{b.icon}</span>
              <span style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.5)" }}>{b.label}</span>
            </div>
          ))}
        </div>

        {/* ── BOTTOM BAR ── */}
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between",
          flexWrap:"wrap", gap:14,
          opacity: mainReveal.visible ? 1 : 0,
          transition:"opacity 0.7s ease 0.4s",
        }} className="footer-bottom">
          <p style={{ fontSize:12.5, color:"rgba(255,255,255,0.2)" }}>
            © {new Date().getFullYear()} MedCare RCM Solutions. All rights reserved.
          </p>
          <div style={{ display:"flex", gap:18, flexWrap:"wrap" }}>
            {["Privacy Policy","Terms of Service","HIPAA Compliance","Sitemap"].map((l,i)=>(
              <Link key={i} href="#"
                style={{ fontSize:12.5, color:"rgba(255,255,255,0.2)", transition:"color 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.color="#F5E6A3"}
                onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.2)"}>
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ══ MOBILE STICKY BOTTOM NAV BAR ══ */}
      <div className="mobile-bottom-nav" style={{
        display:"none",
        position:"fixed", bottom:0, left:0, right:0, zIndex:200,
        background:"rgba(17,17,17,0.97)",
        backdropFilter:"blur(20px)",
        borderTop:"1px solid rgba(255,255,255,0.09)",
        padding:"10px 0 max(10px,env(safe-area-inset-bottom))",
      }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", maxWidth:500, margin:"0 auto" }}>
          {[
            { icon:"🏠", label:"Home",       href:"/" },
            { icon:"💼", label:"Services",   href:"/services" },
            { icon:"📞", label:"Contact",    href:"/contact", primary:true },
            { icon:"🏥", label:"Specialties",href:"/specialties" },
            { icon:"📝", label:"Blog",       href:"/blog" },
          ].map((item,i)=>(
            <Link key={i} href={item.href}
              style={{
                display:"flex", flexDirection:"column", alignItems:"center", gap:4,
                padding:"6px 4px",
                textDecoration:"none",
                position:"relative",
              }}>
              {item.primary ? (
                /* Center call-to-action raised button */
                <div style={{
                  width:48, height:48, borderRadius:"50%",
                  background:"#F5E6A3",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:20,
                  boxShadow:"0 -4px 20px rgba(245,230,163,0.4)",
                  marginTop:-18,
                  border:"3px solid #111111",
                  transition:"transform 0.2s",
                }}
                  onMouseEnter={e=>e.currentTarget.style.transform="scale(1.08)"}
                  onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
                  {item.icon}
                </div>
              ) : (
                <div style={{ width:28, height:28, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
                  {item.icon}
                </div>
              )}
              <span style={{ fontSize:9.5, fontWeight:600, color: item.primary ? "#F5E6A3" : "rgba(255,255,255,0.45)", textTransform:"uppercase", letterSpacing:0.5 }}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

    </footer>
  );
}
