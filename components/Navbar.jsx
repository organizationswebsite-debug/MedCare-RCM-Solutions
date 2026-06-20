"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Specialties", href: "/specialties" },
  { label: "About", href: "/about" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "12px 24px",
      transition: "all 0.3s ease",
    }}>
      {/* Pill navbar — Grovia style */}
      <div style={{
        maxWidth: 1000,
        margin: "0 auto",
        background: scrolled ? "rgba(245,240,232,0.96)" : "rgba(245,240,232,0.85)",
        backdropFilter: "blur(16px)",
        borderRadius: 100,
        border: "1px solid rgba(17,17,17,0.1)",
        boxShadow: scrolled ? "0 4px 24px rgba(17,17,17,0.1)" : "0 2px 12px rgba(17,17,17,0.06)",
        padding: "10px 10px 10px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.3s ease",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#111111", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#F5E6A3", fontWeight: 800, fontSize: 14 }}>M</span>
          </div>
          <div>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#111111", display: "block", letterSpacing: -0.3 }}>MedCare</span>
            <span style={{ fontWeight: 400, fontSize: 11, color: "#666666", display: "block", lineHeight: 1 }}>RCM Solutions</span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="navbar-desktop" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} style={{
              fontSize: 14, color: "#444444", fontWeight: 500,
              padding: "7px 14px", borderRadius: 100,
              transition: "background 0.2s, color 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(17,17,17,0.07)"; e.currentTarget.style.color = "#111111"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#444444"; }}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" style={{
            background: "#111111", color: "#ffffff",
            padding: "10px 22px", borderRadius: 100,
            fontSize: 14, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 8,
            transition: "background 0.2s, transform 0.2s",
            marginLeft: 6,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#333333"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#111111"; }}>
            Get Free Audit <span style={{ background: "#F5E6A3", color: "#111111", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>→</span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="navbar-hamburger"
          style={{ background: "#111111", border: "none", cursor: "pointer", fontSize: 18, color: "#fff", width: 38, height: 38, borderRadius: "50%", display: "none", alignItems: "center", justifyContent: "center" }}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ maxWidth: 1000, margin: "8px auto 0", background: "rgba(245,240,232,0.97)", backdropFilter: "blur(16px)", border: "1px solid rgba(17,17,17,0.1)", borderRadius: 20, padding: "16px 20px", display: "flex", flexDirection: "column", gap: 4, boxShadow: "0 8px 32px rgba(17,17,17,0.1)" }}>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              style={{ fontSize: 15, color: "#111111", fontWeight: 500, padding: "10px 14px", borderRadius: 10 }}>
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setMenuOpen(false)}
            style={{ background: "#111111", color: "#fff", padding: "12px 20px", borderRadius: 100, fontSize: 14, fontWeight: 600, textAlign: "center", marginTop: 8 }}>
            Get Free Audit →
          </Link>
        </div>
      )}

      <style>{`
        .show-mobile-flex { display: none; }
        @media (max-width: 768px) {
          .navbar-desktop { display: none !important; }
          .navbar-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
