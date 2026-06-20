"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const TESTIMONIALS = [
  { name: "Dr. Sarah Mitchell", role: "Family Practice, Texas", initials: "SM", specialty: "Family Medicine", quote: "MedCare RCM cut our denial rate in half within 60 days. Our collections are up 28% and the team is incredibly responsive. I wish we had switched sooner.", result: "28% increase in collections" },
  { name: "James Holloway", role: "Practice Manager, Florida", initials: "JH", specialty: "Multi-specialty Group", quote: "Switching to MedCare was the best decision we made this year. We finally have full visibility into our revenue cycle and our AR days dropped from 48 to 31.", result: "AR days reduced from 48 → 31" },
  { name: "Dr. Priya Nair", role: "Pediatrics Group, California", initials: "PN", specialty: "Pediatrics", quote: "Professional, knowledgeable, and always available. They feel like an in-house billing team, not a vendor. Our first-pass rate is now above 97%.", result: "97%+ first-pass claim rate" },
  { name: "Dr. Marcus Webb", role: "Orthopedic Surgeon, New York", initials: "MW", specialty: "Orthopedics", quote: "We were skeptical at first, but MedCare recovered over $180,000 in previously denied claims in just the first 90 days. Outstanding results.", result: "$180K recovered in 90 days" },
  { name: "Linda Torres", role: "Office Director, Arizona", initials: "LT", specialty: "Internal Medicine", quote: "The onboarding was seamless — we were fully transitioned in less than a week with zero disruption. The reporting dashboard alone is worth it.", result: "Full onboarding in under 7 days" },
  { name: "Dr. Kevin Park", role: "Mental Health Practice, Illinois", initials: "KP", specialty: "Mental Health", quote: "Mental health billing is complex and payer rules change constantly. MedCare stays ahead of it all and keeps our revenue flowing without interruption.", result: "Zero billing disruptions in 12 months" },
];

export default function TestimonialsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Navbar />
      
      <main style={{ backgroundColor: "#F5F0E8", overflowX: "hidden" }}>
        
        {/* HERO SECTION WITH SUBTLE BACKGROUND GRAPHIC OVERLAY */}
        <section 
          className="hero-section"
          style={{ 
            position: "relative",
            // 🖼️ High-end medical corporate background texture overlayed with custom desaturated soft cream opacity
            backgroundImage: `linear-gradient(180deg, rgba(245, 240, 232, 0.85) 0%, #F5F0E8 100%), url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2000&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "180px 24px 100px", 
            textAlign: "center"
          }}
        >
          <div 
            style={{ 
              maxWidth: 800, 
              margin: "0 auto",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, color: "#111111", backgroundColor: "#F5E6A3", letterSpacing: "1.5px", textTransform: "uppercase", padding: "6px 14px", borderRadius: 4, display: "inline-block", marginBottom: 20 }}>
              Client Stories
            </span>
            <h1 style={{ fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 950, color: "#111111", textTransform: "uppercase", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 24 }}>
              Real results from real providers
            </h1>
            <p style={{ fontSize: "clamp(16px, 2vw, 18px)", color: "#555555", lineHeight: 1.7, maxWidth: 650, margin: "0 auto", fontWeight: 500 }}>
              Don't take our word for it. Here's how our specialized revenue cycle management empowers healthcare operations across the nation.
            </p>
          </div>
        </section>

        {/* STATS BAR WITH MOBILE GRID SNAPPING */}
        <section style={{ background: "#111111", padding: "48px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="stats-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, textAlign: "center" }}>
            {[
              { value: "500+", label: "Providers served" },
              { value: "98%", label: "Client retention rate" },
              { value: "$50M+", label: "Revenue optimized" },
              { value: "4.9/5", label: "Average client rating" },
            ].map((s, i) => (
              <div key={i} style={{ opacity: mounted ? 1 : 0, transform: mounted ? "scale(1)" : "scale(0.95)", transition: `all 0.6s ease ${i * 0.1}s` }}>
                <div style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 900, color: "#ffffff", letterSpacing: "-1px" }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#888888", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS INTERACTIVE GRID CONTAINER */}
        <section style={{ padding: "100px 24px", backgroundColor: "#F5F0E8" }}>
          <div className="cards-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 32 }}>
            {TESTIMONIALS.map((t, i) => (
              <div 
                key={i} 
                className="testimonial-card"
                style={{ 
                  backgroundColor: "#ffffff",
                  border: "1px solid rgba(17, 17, 17, 0.05)", 
                  borderRadius: 12, 
                  padding: "40px 32px", 
                  display: "flex", 
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 10px 30px rgba(17, 17, 17, 0.02)",
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`
                }}
              >
                <div>
                  {/* Premium Clean Stars Grouping */}
                  <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
                    {[...Array(5)].map((_, j) => (
                      <span key={j} style={{ color: "#111111", fontSize: 14 }}>★</span>
                    ))}
                  </div>
                  
                  <p style={{ fontSize: "15px", color: "#333333", lineHeight: 1.7, marginBottom: 28, fontStyle: "italic", fontWeight: 500 }}>
                    "{t.quote}"
                  </p>
                </div>

                <div>
                  {/* Highlighting Metrics Bar */}
                  <div style={{ backgroundColor: "#F5F0E8", borderRadius: 6, padding: "12px 16px", marginBottom: 24, border: "1px solid rgba(17,17,17,0.02)" }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: "#666666", textTransform: "uppercase", letterSpacing: "0.5px" }}>Result: </span>
                    <span style={{ fontSize: 14, color: "#111111", fill: "#111111", fontWeight: 750 }}>{t.result}</span>
                  </div>

                  {/* Profile Layout Section */}
                  <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 16, borderTop: "1px solid rgba(17,17,17,0.05)" }}>
                    <div style={{ width: 46, height: 46, borderRadius: "50%", background: "#111111", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#ffffff", flexShrink: 0, letterSpacing: "-0.5px" }}>
                      {t.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: "#111111" }}>{t.name}</div>
                      <div style={{ fontSize: 12, color: "#666666", fontWeight: 500, marginTop: 1 }}>{t.role}</div>
                      <span style={{ display: "inline-block", fontSize: 10, fontWeight: 700, color: "#111111", backgroundColor: "#F5E6A3", padding: "2px 6px", borderRadius: 3, marginTop: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                        {t.specialty}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* CTA CONCLUDING ACTIONS */}
        <section style={{ background: "#111111", padding: "100px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(30px, 4.5vw, 44px)", fontWeight: 950, color: "#ffffff", textTransform: "uppercase", letterSpacing: "-1px", marginBottom: 18 }}>
              Ready to add your success story?
            </h2>
            <p style={{ fontSize: 16, color: "#888888", fontWeight: 500, lineHeight: 1.6, marginBottom: 36, maxWidth: 550, margin: "0 auto 36px" }}>
              Join hundreds of high-performance practice networks nationwide who secure full billing transparency with MedCare.
            </p>
            
            {/* 🚀 FIXED LINK PARAMETER AREA FOR SECURE ROUTING CLICK TRIGGER */}
            <Link 
              href="/contact" 
              style={{ 
                display: "inline-block", 
                background: "#ffffff", 
                color: "#111111", 
                padding: "16px 36px", 
                borderRadius: 6, 
                fontSize: 15, 
                fontWeight: 700,
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                transition: "transform 0.25s ease"
              }}
              className="cta-btn"
            >
              Get a free audit →
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />

      {/* GLOBAL SCOPED CLEAN COMPILER INTERACTIVE STYLES */}
      <style jsx global>{`
        /* Smooth micro-lifts on hover cards positioning */
        .testimonial-card {
          transform: translateY(0);
          transition: transform 0.3s ease, box-shadow 0.3s ease !important;
        }
        .testimonial-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 20px 40px rgba(17, 17, 17, 0.04) !important;
        }
        .cta-btn:hover {
          transform: scale(1.02);
        }

        /* 📱 ULTRA DYNAMIC MOBILE MEDIA RESPONSIVENESS */
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important; /* Locks readable 2x2 grid instead of ugly text squishing */
            gap: 32px 16px !important;
          }
          .cards-grid {
            grid-template-columns: 1fr !important; /* Pure uniform single column on phones */
            gap: 20px !important;
          }
          .hero-section {
            padding: 140px 16px 60px !important; /* Optimizes compact safe margins for smaller phone glasses */
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr !important; /* Vertical stack for ultra-small legacy screens */
          }
        }
      `}</style>
    </>
  );
}