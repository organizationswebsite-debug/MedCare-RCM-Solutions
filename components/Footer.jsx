import Link from "next/link";

const COLS = [
  {
    title: "Services",
    links: [
      { label: "Medical Billing", href: "/services" },
      { label: "Claims Management", href: "/services" },
      { label: "Denial Management", href: "/services" },
      { label: "Credentialing", href: "/services" },
      { label: "Patient Billing", href: "/services" },
      { label: "Reporting & Analytics", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "FAQ", href: "/faq" },
      { label: "Specialties", href: "/specialties" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "info@medcarercm.com", href: "mailto:info@medcarercm.com" },
      { label: "+1 (800) 000-0000", href: "tel:+18000000000" },
      { label: "Mon–Fri, 9am–6pm EST", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "#111111", padding: "64px 24px 32px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "#F5E6A3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#111111", fontWeight: 800, fontSize: 14 }}>M</span>
              </div>
              <span style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>MedCare RCM Solutions</span>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: 260 }}>
              Full-service revenue cycle management for healthcare providers across the United States.
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 20 }}>
              A Moaz Group of Companies subsidiary
            </p>
          </div>

          {/* Link columns */}
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: 18 }}>{col.title}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {col.links.map((l) => (
                  <Link key={l.label} href={l.href} style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "#F5E6A3"}
                    onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>© 2025 MedCare RCM Solutions. All rights reserved.</p>
          <div style={{ display: "flex", gap: 24 }}>
            <Link href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#F5E6A3"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.25)"}>Privacy policy</Link>
            <Link href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#F5E6A3"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.25)"}>Terms of service</Link>
            <Link href="#" style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#F5E6A3"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.25)"}>HIPAA compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
