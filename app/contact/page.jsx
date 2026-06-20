"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", practice: "", specialty: "", message: "" });
  const [sent, setSent] = useState(false);

  const specialties = ["Family Medicine", "Internal Medicine", "Pediatrics", "Cardiology", "Orthopedics", "Mental Health", "Dermatology", "Urgent Care", "OB/GYN", "Other"];

  return (
    <>
      <Navbar />
      <main>
        {/* Hero with background image */}
        <section style={{
          position: "relative",
          padding: "150px 24px 70px",
          overflow: "hidden",
          isolation: "isolate",
        }} className="contact-hero">
          {/* Background image */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            zIndex: -2,
          }} />
          {/* Overlay for readability — warm cream-to-dark fade matching Grovia palette */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(160deg, rgba(245,240,232,0.96) 0%, rgba(240,235,224,0.93) 45%, rgba(17,17,17,0.55) 100%)",
            zIndex: -1,
          }} className="contact-hero-overlay" />

          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "#111111", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12, background: "#F5E6A3", display: "inline-block", padding: "6px 14px", borderRadius: 100 }}>
              Get in touch
            </p>
            <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 700, color: "#0D1B2A", letterSpacing: "-1px", marginBottom: 20, textShadow: "0 2px 12px rgba(245,240,232,0.5)" }}>
              Let's talk about your practice
            </h1>
            <p style={{ fontSize: 18, color: "#222222", lineHeight: 1.7, fontWeight: 500 }}>
              Fill out the form and we'll be in touch within one business day. Or call us directly at +1 (800) 000-0000.
            </p>
          </div>
        </section>

        {/* Content */}
        <section style={{ background: "#fff", padding: "64px 24px 96px" }}>
          <div className="contact-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 64, alignItems: "start" }}>
            {/* Info panel */}
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0D1B2A", marginBottom: 24 }}>Contact information</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {[
                  { icon: "📧", label: "Email", value: "info@medcarercm.com" },
                  { icon: "📞", label: "Phone", value: "+1 (800) 000-0000" },
                  { icon: "🕐", label: "Hours", value: "Mon–Fri, 9am–6pm EST" },
                  { icon: "📍", label: "Serving", value: "Providers across the United States" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 20, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#666666", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 3 }}>{item.label}</div>
                      <div style={{ fontSize: 15, color: "#0D1B2A" }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 40, background: "#F0EBE0", border: "1px solid #D6E4F0", borderRadius: 14, padding: "24px" }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>🎁</div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#0D1B2A", marginBottom: 8 }}>Free billing audit</h3>
                <p style={{ fontSize: 13, color: "#666666", lineHeight: 1.6 }}>
                  Every new inquiry comes with a complimentary revenue cycle audit. We'll show you exactly where you're losing money and how to fix it — no obligation.
                </p>
              </div>
            </div>

            {/* Form */}
            {sent ? (
              <div style={{ background: "#F0EBE0", border: "1px solid #D6E4F0", borderRadius: 16, padding: "60px 40px", textAlign: "center" }}>
                <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: "#0D1B2A", marginBottom: 12 }}>Message received!</h2>
                <p style={{ fontSize: 16, color: "#666666", lineHeight: 1.7 }}>Thank you for reaching out. A member of our team will contact you within one business day.</p>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSent(true); }}
                style={{ background: "#F0EBE0", border: "1px solid #D6E4F0", borderRadius: 16, padding: "40px" }}>
                <div className="form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                  {[
                    { key: "name", label: "Full name *", type: "text", placeholder: "Dr. Jane Smith", required: true },
                    { key: "email", label: "Email address *", type: "email", placeholder: "jane@clinic.com", required: true },
                    { key: "phone", label: "Phone number", type: "tel", placeholder: "+1 (555) 000-0000", required: false },
                    { key: "practice", label: "Practice name *", type: "text", placeholder: "Smith Family Practice", required: true },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "#0D1B2A", display: "block", marginBottom: 6 }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder} required={f.required}
                        value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        style={{ width: "100%", padding: "10px 12px", border: "1px solid #D6E4F0", borderRadius: 8, fontSize: 14, color: "#0D1B2A", outline: "none", fontFamily: "inherit", background: "#fff" }} />
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#0D1B2A", display: "block", marginBottom: 6 }}>Specialty</label>
                  <select value={form.specialty} onChange={e => setForm({ ...form, specialty: e.target.value })}
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #D6E4F0", borderRadius: 8, fontSize: 14, color: "#0D1B2A", outline: "none", fontFamily: "inherit", background: "#fff" }}>
                    <option value="">Select your specialty</option>
                    {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#0D1B2A", display: "block", marginBottom: 6 }}>Message</label>
                  <textarea placeholder="Tell us about your practice and what billing challenges you're facing..."
                    rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ width: "100%", padding: "10px 12px", border: "1px solid #D6E4F0", borderRadius: 8, fontSize: 14, color: "#0D1B2A", outline: "none", resize: "vertical", fontFamily: "inherit", background: "#fff" }} />
                </div>

                <button type="submit"
                  style={{ width: "100%", background: "#111111", color: "#fff", border: "none", padding: "14px", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
                  Send message →
                </button>
                <p style={{ fontSize: 12, color: "#666666", textAlign: "center", marginTop: 12 }}>
                  We'll respond within one business day. Your information is never shared.
                </p>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .form-grid { grid-template-columns: 1fr !important; }
          .contact-hero { padding: 120px 20px 50px !important; }
          .contact-hero-overlay {
            background: linear-gradient(180deg, rgba(245,240,232,0.97) 0%, rgba(245,240,232,0.94) 60%, rgba(17,17,17,0.6) 100%) !important;
          }
        }
        @media (max-width: 480px) {
          .contact-hero { padding: 110px 16px 44px !important; }
        }
      `}</style>
    </>
  );
}