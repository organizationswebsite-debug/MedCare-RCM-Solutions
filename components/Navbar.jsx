"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const SERVICES_MENU = [
  { icon:"💰", title:"Revenue Cycle Management", desc:"End-to-end billing from charge capture to payment.", href:"/services/revenue-cycle-management" },
  { icon:"👨‍⚕️", title:"Physician Billing",        desc:"Your patients deserve billing as dedicated as your care.", href:"/services/physician-billing" },
  { icon:"🧾", title:"Medical Billing",            desc:"Comprehensive, all-inclusive billing approach.", href:"/services/medical-billing" },
  { icon:"💵", title:"AR Recovery",                desc:"Meet the unique financial needs of your organization.", href:"/services/ar-recovery" },
  { icon:"🧪", title:"Laboratory Billing",         desc:"Expert coding that charts a path to success.", href:"/services/laboratory-billing" },
  { icon:"🏥", title:"Hospital Billing",           desc:"All-inclusive institutional billing approach.", href:"/services/hospital-billing" },
  { icon:"📸", title:"Imaging Billing",            desc:"Complicated imaging center coding, handled with precision.", href:"/services/imaging-billing" },
  { icon:"🚫", title:"Denial Management",          desc:"Turn denied claims into recovered revenue.", href:"/services/denial-management" },
  { icon:"🪪", title:"Provider Credentialing",     desc:"Get your providers enrolled and billing — fast.", href:"/services/credentialing" },
  { icon:"👤", title:"Patient Billing",            desc:"Clear statements that improve collections.", href:"/services/patient-billing" },
  { icon:"🏨", title:"ASC Billing",                desc:"Specialized billing for ambulatory surgery centers.", href:"/services/asc-billing" },
  { icon:"📊", title:"Reporting & Analytics",      desc:"Real-time visibility into your revenue cycle.", href:"/services/reporting-analytics" },
];

const COMPANY_MENU = [
  { icon:"⭐", title:"Testimonials", desc:"Read what 500+ healthcare providers say about us.",   href:"/testimonials", color:"#FFF9E6" },
  { icon:"📝", title:"Blog",         desc:"Expert billing tips, coding updates & RCM insights.",  href:"/blog",         color:"#F0F7FF" },
  { icon:"❓", title:"FAQ",          desc:"Quick answers to our most common questions.",           href:"/faq",          color:"#F0FFF4" },
  { icon:"🏢", title:"About Us",     desc:"Our story, mission, team and what drives us forward.", href:"/about",        color:"#FDF0FF" },
  { icon:"💼", title:"Careers",      desc:"Join our growing team of RCM specialists nationwide.", href:"/careers",      color:"#FFF5F0" },
  { icon:"📍", title:"Contact",      desc:"Speak directly with a billing expert — no pressure.",  href:"/contact",      color:"#F0FFFD" },
];

/* ── Desktop dropdown ── */
function MegaDropdown({ items, columns = 2, isCompany }) {
  return (
    <div style={{
      position:"absolute", top:"calc(100% + 12px)", left:"50%",
      transform:"translateX(-50%)",
      background:"rgba(255,255,255,0.97)", backdropFilter:"blur(20px)",
      border:"1px solid rgba(17,17,17,0.1)", borderRadius:20,
      boxShadow:"0 24px 64px rgba(17,17,17,0.13)",
      overflow:"hidden", animation:"dropIn 0.2s cubic-bezier(0.16,1,0.3,1)",
      zIndex:400, minWidth: columns===2 ? 680 : 400,
    }}>
      <div style={{ background:"#111111", padding:"12px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontSize:11, fontWeight:700, color:"#F5E6A3", letterSpacing:"1.5px", textTransform:"uppercase" }}>
          {isCompany ? "Company" : "RCM Services"}
        </span>
        <Link href={isCompany ? "/about" : "/services"} style={{ fontSize:12, fontWeight:700, color:"rgba(255,255,255,0.4)" }}>View all →</Link>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:`repeat(${columns},1fr)`, padding:"7px" }}>
        {items.map((item,i)=>(
          <Link key={i} href={item.href}
            style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"12px 14px", borderRadius:12, transition:"background 0.18s", textDecoration:"none" }}
            onMouseEnter={e=>e.currentTarget.style.background=item.color||"#F5F0E8"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <div style={{ width:38, height:38, borderRadius:10, background:item.color||"#F5E6A3", border:"1px solid rgba(17,17,17,0.07)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{item.icon}</div>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:"#111111", marginBottom:2 }}>{item.title}</div>
              <div style={{ fontSize:11.5, color:"#888888", lineHeight:1.5 }}>{item.desc}</div>
            </div>
          </Link>
        ))}
      </div>
      <div style={{ borderTop:"1px solid rgba(17,17,17,0.06)", padding:"11px 16px", background:"#FDFAF5", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontSize:11.5, color:"#888888" }}>🔒 HIPAA-Compliant · USA-Based · 98%+ First-Pass Rate</span>
        <Link href="/contact" style={{ background:"#111111", color:"#fff", padding:"6px 14px", borderRadius:100, fontSize:11.5, fontWeight:700 }}>Free Audit →</Link>
      </div>
    </div>
  );
}

function Chevron({ open }) {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
      style={{ transform:open?"rotate(180deg)":"rotate(0)", transition:"transform 0.3s", flexShrink:0 }}>
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [activeMenu,   setActiveMenu]   = useState(null);
  const [mobileExpand, setMobileExpand] = useState(null);
  const [mounted,      setMounted]      = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    setMounted(true);
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) document.body.classList.add("nav-open"); else document.body.classList.remove("nav-open");
    return () => { document.body.style.overflow = ""; document.body.classList.remove("nav-open"); };
  }, [menuOpen]);

  const openMenu = (n) => {
    clearTimeout(closeTimer.current);
    setActiveMenu(n);
  };

  const closeMenu = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 140);
  };

  const toggleMenu = (menu, e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  const linkStyle = { fontSize:14, fontWeight:500, color:"#111111", padding:"9px 14px", borderRadius:100, whiteSpace:"nowrap", transition:"background 0.18s", background:"transparent" };
  const hoverIn  = e => e.currentTarget.style.background = "rgba(17,17,17,0.07)";
  const hoverOut = e => e.currentTarget.style.background = "transparent";

  return (
    <>
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:300, padding:"12px 24px", display:"flex", justifyContent:"center", pointerEvents:"none" }}>
        {/* Floating pill */}
        <div style={{
          width:"auto",
          background: scrolled ? "rgba(245,240,232,0.97)" : "rgba(253,250,245,0.82)",
          backdropFilter:"blur(22px)", WebkitBackdropFilter:"blur(22px)",
          border:"1px solid rgba(17,17,17,0.10)", borderRadius:100,
          boxShadow: scrolled ? "0 8px 32px rgba(17,17,17,0.10)" : "0 2px 16px rgba(17,17,17,0.06)",
          transition:"opacity 0.25s ease, transform 0.25s ease, background 0.3s ease",
          display:"inline-flex", alignItems:"center", padding:"6px 8px 6px 8px",
          gap:2, position:"relative", pointerEvents: menuOpen ? "none" : "all", flexShrink:0,
          opacity: menuOpen ? 0 : 1,
          transform: menuOpen ? "translateY(-12px)" : "translateY(0)",
        }}>
          {/* Logo inside pill — desktop */}
          <Link href="/" className="nav-logo-pill" style={{ flexShrink:0, marginRight:14, display:"flex", alignItems:"center" }}>
            <Image src="/logo.png" alt="MedCare RCM" width={260} height={78}
              style={{ objectFit:"contain", height:56, width:"auto", display:"block", minWidth:120 }} priority />
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop" style={{ display:"flex", alignItems:"center", flex:1, gap:2 }}>
            <Link href="/" style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>Home</Link>

            {/* Services */}
            <div style={{ position:"relative" }} onMouseEnter={() => openMenu("services")} onMouseLeave={closeMenu}>
              <button
                onClick={(e) => toggleMenu("services", e)}
                onFocus={() => openMenu("services")}
                onBlur={(e) => {
                  if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) {
                    closeMenu();
                  }
                }}
                style={{ ...linkStyle, border:"none", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:5, background:activeMenu==="services"?"rgba(17,17,17,0.07)":"transparent" }}
                onMouseEnter={(event) => { hoverIn(event); openMenu("services"); }}
                onMouseLeave={hoverOut}>
                Services <Chevron open={activeMenu==="services"} />
              </button>
              {activeMenu==="services" && <MegaDropdown items={SERVICES_MENU} columns={2} />}
            </div>

            <Link href="/specialties" style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>Specialties</Link>
            <Link href="/pricing"     style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>Pricing</Link>

            {/* Company */}
            <div style={{ position:"relative" }} onMouseEnter={() => openMenu("company")} onMouseLeave={closeMenu}>
              <button
                onClick={(e) => toggleMenu("company", e)}
                onFocus={() => openMenu("company")}
                onBlur={(e) => {
                  if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) {
                    closeMenu();
                  }
                }}
                style={{ ...linkStyle, border:"none", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:5, background:activeMenu==="company"?"rgba(17,17,17,0.07)":"transparent" }}
                onMouseEnter={(event) => { hoverIn(event); openMenu("company"); }}
                onMouseLeave={hoverOut}>
                Company <Chevron open={activeMenu==="company"} />
              </button>
              {activeMenu==="company" && <MegaDropdown items={COMPANY_MENU} columns={2} isCompany />}
            </div>
          </div>

          {/* Right CTAs */}
          <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
            <Link href="/contact" className="nav-desktop" style={{ background:"#111111", color:"#fff", padding:"11px 20px", borderRadius:100, fontSize:14, fontWeight:700, display:"inline-flex", alignItems:"center", gap:8, boxShadow:"0 4px 16px rgba(17,17,17,0.22)", transition:"transform 0.2s, box-shadow 0.2s", whiteSpace:"nowrap" }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(17,17,17,0.32)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 16px rgba(17,17,17,0.22)"; }}>
              Free Audit →
            </Link>

            {/* Hamburger — mobile only */}
            <button onClick={()=>setMenuOpen(!menuOpen)}
              className="nav-hamburger"
              aria-label="Menu"
              style={{
                width:40, height:40, borderRadius:"50%",
                background: menuOpen ? "#111111" : "rgba(17,17,17,0.07)",
                border:"1px solid rgba(17,17,17,0.12)",
                alignItems:"center", justifyContent:"center",
                cursor:"pointer", flexShrink:0, position:"relative",
                transition:"background 0.25s, transform 0.25s",
                transform: menuOpen ? "rotate(90deg)" : "rotate(0)",
              }}>
              {/* Animated burger lines */}
              <div style={{ width:18, height:14, position:"relative", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                {[0,1,2].map(i=>(
                  <span key={i} style={{
                    display:"block", height:2, borderRadius:2,
                    background: menuOpen ? "#fff" : "#111111",
                    transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)",
                    transformOrigin:"center",
                    transform: menuOpen
                      ? i===0 ? "rotate(45deg) translateY(6px)" : i===1 ? "scaleX(0) opacity(0)" : "rotate(-45deg) translateY(-6px)"
                      : "none",
                    opacity: menuOpen && i===1 ? 0 : 1,
                  }} />
                ))}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ══════════════════════════════════════
          MOBILE MENU — full screen slide-down
      ══════════════════════════════════════ */}
      <div style={{
        position:"fixed", inset:0, zIndex:290,
        pointerEvents: menuOpen ? "all" : "none",
      }}>
        {/* Backdrop */}
        <div onClick={()=>setMenuOpen(false)} style={{
          position:"absolute", inset:0,
          background:"rgba(17,17,17,0.45)",
          backdropFilter:"blur(4px)",
          opacity: menuOpen ? 1 : 0,
          transition:"opacity 0.35s ease",
        }} />

        {/* Slide-down drawer */}
        <div style={{
          position:"absolute", top:0, left:0, right:0,
          background:"linear-gradient(175deg,#F5F0E8 0%,#FDFAF5 100%)",
          borderRadius:"0 0 28px 28px",
          boxShadow:"0 24px 60px rgba(17,17,17,0.2)",
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          transition:"transform 0.45s cubic-bezier(0.16,1,0.3,1)",
          overflow:"hidden",
          maxHeight:"92vh", overflowY:"auto",
        }}>
          {/* Top bar */}
          <div style={{ padding:"16px 20px 12px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid rgba(17,17,17,0.08)", position:"sticky", top:0, background:"rgba(253,250,245,0.96)", backdropFilter:"blur(12px)", zIndex:2 }}>
            <div style={{ width:140, height:44 }} />
            <button onClick={()=>setMenuOpen(false)}
              style={{ width:36, height:36, borderRadius:"50%", background:"rgba(17,17,17,0.08)", border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, color:"#111111", transition:"background 0.2s, transform 0.2s" }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(17,17,17,0.15)"; e.currentTarget.style.transform="rotate(90deg)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background="rgba(17,17,17,0.08)"; e.currentTarget.style.transform="rotate(0)"; }}>
              ✕
            </button>
          </div>

          {/* Nav items */}
          <div style={{ padding:"12px 16px" }}>

            {/* Quick links */}
            {[
              { href:"/", label:"Home", icon:"🏠", delay:0.04 },
              { href:"/specialties", label:"Specialties", icon:"🏥", delay:0.07 },
              { href:"/pricing", label:"Pricing", icon:"💰", delay:0.10 },
            ].map((l,i)=>(
              <Link key={i} href={l.href} onClick={()=>setMenuOpen(false)}
                style={{
                  display:"flex", alignItems:"center", gap:14,
                  padding:"14px 16px", borderRadius:16, marginBottom:4,
                  fontSize:16, fontWeight:600, color:"#111111",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateX(0)" : "translateX(-24px)",
                  transition:`opacity 0.4s ease ${l.delay}s, transform 0.4s ease ${l.delay}s`,
                  background:"transparent",
                }}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(17,17,17,0.05)"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{ width:40, height:40, borderRadius:12, background:"#F5F0E8", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{l.icon}</div>
                {l.label}
              </Link>
            ))}

            {/* Divider */}
            <div style={{ height:1, background:"rgba(17,17,17,0.07)", margin:"8px 0 12px" }} />

            {/* Services accordion */}
            <MobileAccordion
              label="Services" icon="💼"
              open={mobileExpand==="services"}
              onToggle={()=>setMobileExpand(mobileExpand==="services"?null:"services")}
              menuOpen={menuOpen} delay={0.13}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, padding:"4px 0 8px" }}>
                {SERVICES_MENU.map((item,i)=>(
                  <Link key={i} href={item.href} onClick={()=>setMenuOpen(false)}
                    style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:12, fontSize:13, color:"#111111", fontWeight:500, transition:"background 0.18s" }}
                    onMouseEnter={e=>e.currentTarget.style.background="#F5F0E8"}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <span style={{ width:30, height:30, borderRadius:8, background:"#F5E6A3", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>{item.icon}</span>
                    <span style={{ fontSize:12.5, lineHeight:1.3 }}>{item.title}</span>
                  </Link>
                ))}
              </div>
              <Link href="/services" onClick={()=>setMenuOpen(false)}
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"10px", borderRadius:12, background:"#111111", color:"#fff", fontSize:13, fontWeight:700, marginTop:4 }}>
                View all services →
              </Link>
            </MobileAccordion>

            {/* Company accordion */}
            <MobileAccordion
              label="Company" icon="🏢"
              open={mobileExpand==="company"}
              onToggle={()=>setMobileExpand(mobileExpand==="company"?null:"company")}
              menuOpen={menuOpen} delay={0.16}>
              <div style={{ display:"flex", flexDirection:"column", gap:4, padding:"4px 0 8px" }}>
                {COMPANY_MENU.map((item,i)=>(
                  <Link key={i} href={item.href} onClick={()=>setMenuOpen(false)}
                    style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", borderRadius:12, fontSize:14, color:"#111111", fontWeight:500, transition:"background 0.18s" }}
                    onMouseEnter={e=>e.currentTarget.style.background=item.color||"#F5F0E8"}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <span style={{ width:36, height:36, borderRadius:10, background:item.color||"#F5E6A3", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontWeight:700, fontSize:14 }}>{item.title}</div>
                      <div style={{ fontSize:11.5, color:"#888888", marginTop:1 }}>{item.desc}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </MobileAccordion>

            {/* Divider */}
            <div style={{ height:1, background:"rgba(17,17,17,0.07)", margin:"12px 0" }} />

            {/* Bottom CTAs */}
            <div style={{
              display:"flex", flexDirection:"column", gap:10, padding:"4px 0 20px",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(16px)",
              transition:"opacity 0.4s ease 0.22s, transform 0.4s ease 0.22s",
            }}>
              <Link href="/contact" onClick={()=>setMenuOpen(false)}
                style={{ background:"#111111", color:"#fff", padding:"16px 20px", borderRadius:100, fontSize:15, fontWeight:700, textAlign:"center", display:"flex", alignItems:"center", justifyContent:"center", gap:8, boxShadow:"0 6px 20px rgba(17,17,17,0.2)" }}>
                Get Free Billing Audit
                <span style={{ width:24, height:24, borderRadius:"50%", background:"#F5E6A3", color:"#111111", display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800 }}>→</span>
              </Link>
              <Link href="tel:+18000000000" onClick={()=>setMenuOpen(false)}
                style={{ background:"#F5F0E8", color:"#111111", padding:"14px 20px", borderRadius:100, fontSize:14, fontWeight:600, textAlign:"center", border:"1.5px solid rgba(17,17,17,0.1)", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                <span style={{ fontSize:16 }}>📞</span> Call +1 (800) 000-0000
              </Link>

              {/* HIPAA badge */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:7, paddingTop:6 }}>
                <span style={{ fontSize:11 }}>🔒</span>
                <span style={{ fontSize:11.5, color:"rgba(17,17,17,0.35)", fontWeight:600 }}>HIPAA-Compliant · USA-Based Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

/* ── Mobile accordion ── */
function MobileAccordion({ label, icon, open, onToggle, menuOpen, delay, children }) {
  return (
    <div style={{
      marginBottom:4,
      opacity: menuOpen ? 1 : 0,
      transform: menuOpen ? "translateX(0)" : "translateX(-24px)",
      transition:`opacity 0.4s ease ${delay}s, transform 0.4s ease ${delay}s`,
    }}>
      <button onClick={onToggle} style={{
        width:"100%", background: open ? "#F5F0E8" : "transparent",
        border:"none", padding:"14px 16px", borderRadius:16,
        fontSize:16, fontWeight:600, color:"#111111",
        cursor:"pointer", textAlign:"left", fontFamily:"inherit",
        display:"flex", alignItems:"center", gap:14,
        transition:"background 0.2s",
      }}>
        <div style={{ width:40, height:40, borderRadius:12, background: open ? "#F5E6A3" : "#F5F0E8", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0, transition:"background 0.25s" }}>{icon}</div>
        <span style={{ flex:1 }}>{label}</span>
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none"
          style={{ transform:open?"rotate(180deg)":"rotate(0)", transition:"transform 0.3s cubic-bezier(0.16,1,0.3,1)", flexShrink:0 }}>
          <path d="M2 4l4 4 4-4" stroke="#111111" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <div style={{
        overflow:"hidden",
        maxHeight: open ? "600px" : "0px",
        opacity: open ? 1 : 0,
        transition:"max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
        padding: open ? "0 8px" : "0",
      }}>
        {children}
      </div>
    </div>
  );
}
