"use client";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

/* ── Scroll reveal ── */
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

function Reveal({ children, delay = 0 }) {
  const { ref, visible } = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ── All 12 reviews ── */
const ALL_TESTIMONIALS = [
  {
    name: "Dr. Sarah Mitchell", role: "Family Practice, Texas",
    initials: "SM", specialty: "Family Medicine", stars: 5,
    result: "28% increase in collections",
    quote: "MedCare RCM cut our denial rate in half within 60 days. Our collections are up 28% and the team is incredibly responsive. I wish we had switched sooner.",
  },
  {
    name: "James Holloway", role: "Practice Manager, Florida",
    initials: "JH", specialty: "Multi-specialty Group", stars: 5,
    result: "AR days reduced from 48 → 31",
    quote: "Switching to MedCare was the best decision we made this year. We finally have full visibility into our revenue cycle and our AR days dropped from 48 to 31.",
  },
  {
    name: "Dr. Priya Nair", role: "Pediatrics Group, California",
    initials: "PN", specialty: "Pediatrics", stars: 5,
    result: "97%+ first-pass claim rate",
    quote: "Professional, knowledgeable, and always available. They feel like an in-house billing team, not a vendor. Our first-pass rate is now above 97%.",
  },
  {
    name: "Dr. Marcus Webb", role: "Orthopedic Surgeon, New York",
    initials: "MW", specialty: "Orthopedics", stars: 5,
    result: "$180K recovered in 90 days",
    quote: "We were skeptical at first, but MedCare recovered over $180,000 in previously denied claims in just the first 90 days. Outstanding results.",
  },
  {
    name: "Linda Torres", role: "Office Director, Arizona",
    initials: "LT", specialty: "Internal Medicine", stars: 5,
    result: "Full onboarding in under 7 days",
    quote: "The onboarding was seamless — we were fully transitioned in less than a week with zero disruption. The reporting dashboard alone is worth it.",
  },
  {
    name: "Dr. Kevin Park", role: "Mental Health Practice, Illinois",
    initials: "KP", specialty: "Mental Health", stars: 5,
    result: "Zero billing disruptions in 12 months",
    quote: "Mental health billing is complex and payer rules change constantly. MedCare stays ahead of it all and keeps our revenue flowing without interruption.",
  },
  /* ── 6 additional reviews (marquee row) ── */
  {
    name: "Dr. Angela Reyes", role: "Cardiology Group, Houston TX",
    initials: "AR", specialty: "Cardiology", stars: 5,
    result: "Clean claim rate up to 99%",
    quote: "Cardiology billing is highly complex and we had constant bundling denials. MedCare's certified coders eliminated those issues almost immediately. Our clean claim rate went from 88% to 99%.",
  },
  {
    name: "Dr. Thomas Nguyen", role: "Urgent Care Network, Seattle WA",
    initials: "TN", specialty: "Urgent Care", stars: 5,
    result: "Revenue up 22% across 3 locations",
    quote: "We have three urgent care locations and needed a team that could handle volume. MedCare manages all three seamlessly. Revenue is up 22% since we brought them on.",
  },
  {
    name: "Dr. Rachel Kim", role: "Dermatology Practice, Chicago IL",
    initials: "RK", specialty: "Dermatology", stars: 5,
    result: "Denied claims cut by 65%",
    quote: "We had a serious problem with cosmetic vs. medical billing crossovers causing denials. MedCare built a pre-submission review that cut our denied claims by 65% in the first month.",
  },
  {
    name: "Michael Osei", role: "Revenue Cycle Director, Atlanta GA",
    initials: "MO", specialty: "Hospital System", stars: 5,
    result: "$1.2M additional revenue in Year 1",
    quote: "MedCare identified $1.2 million in recoverable revenue in the first year alone. The ROI on this partnership is extraordinary.",
  },
  {
    name: "Dr. Patricia Okafor", role: "OB/GYN Practice, Dallas TX",
    initials: "PO", specialty: "OB/GYN", stars: 5,
    result: "Global package errors eliminated",
    quote: "Global maternity billing across changing insurance coverage used to be a nightmare. MedCare's team handles every split-insurance transfer flawlessly.",
  },
  {
    name: "Dr. James Okonkwo", role: "Neurology Practice, Boston MA",
    initials: "JO", specialty: "Neurology", stars: 5,
    result: "Prior auth denials down 78%",
    quote: "MedCare implemented a real-time authorization monitoring system that cut our prior auth denials by 78%. A massive improvement for our infusion patients.",
  },
];

const GRID_ITEMS    = ALL_TESTIMONIALS.slice(0, 6);
const MARQUEE_ITEMS = ALL_TESTIMONIALS.slice(6);

/* ── Single card component ── */
function TestimonialCard({ t, index = 0, mounted = true }) {
  return (
    <div
      className="testimonial-card"
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid rgba(17,17,17,0.07)",
        borderRadius: 12,
        padding: "40px 32px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 10px 30px rgba(17,17,17,0.03)",
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s,
                     transform 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.08}s`,
        height: "100%",
      }}
    >
      <div>
        {/* Stars */}
        <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
          {[...Array(t.stars)].map((_, j) => (
            <span key={j} style={{ color: "#111111", fontSize: 14 }}>★</span>
          ))}
        </div>
        <p style={{ fontSize: 15, color: "#333333", lineHeight: 1.75, marginBottom: 28, fontStyle: "italic", fontWeight: 500 }}>
          "{t.quote}"
        </p>
      </div>

      <div>
        {/* Result bar */}
        <div style={{ backgroundColor: "#F5F0E8", borderRadius: 6, padding: "12px 16px", marginBottom: 24, border: "1px solid rgba(17,17,17,0.04)" }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: "#666666", textTransform: "uppercase", letterSpacing: "0.5px" }}>Result: </span>
          <span style={{ fontSize: 14, color: "#111111", fontWeight: 700 }}>{t.result}</span>
        </div>

        {/* Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 16, borderTop: "1px solid rgba(17,17,17,0.06)" }}>
          <div style={{ width: 46, height: 46, borderRadius: "50%", background: "#111111", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, color: "#ffffff", flexShrink: 0, letterSpacing: "-0.5px" }}>
            {t.initials}
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#111111" }}>{t.name}</div>
            <div style={{ fontSize: 12, color: "#666666", fontWeight: 500, marginTop: 1 }}>{t.role}</div>
            <span style={{ display: "inline-block", fontSize: 10, fontWeight: 700, color: "#111111", backgroundColor: "#F5E6A3", padding: "2px 8px", borderRadius: 3, marginTop: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {t.specialty}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Marquee row ── */
function MarqueeRow() {
  return (
    <div style={{ overflow: "hidden", padding: "6px 0" }}>
      <div className="marquee-track">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((t, i) => (
          <div key={i} className="marquee-card">
            <TestimonialCard t={t} mounted />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════
   PAGE
════════════════════════════ */
export default function TestimonialsPage() {
  const [mounted, setMounted] = useState(false);
  const statsReveal = useReveal(0.2);

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <Navbar />

      <main style={{ backgroundColor: "#F5F0E8", overflowX: "hidden" }}>

        {/* ── HERO ── */}
        <section
          className="hero-section"
          style={{
            position: "relative",
            backgroundImage: `linear-gradient(180deg, rgba(245,240,232,0.88) 0%, #F5F0E8 100%),
              url('https://cdn.searchenginejournal.com/wp-content/uploads/2021/04/10-steps-to-help-you-turn-client-testimonials-into-seo-wins-2-608bf543c9a23-1280x720.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            padding: "180px 24px 100px",
            textAlign: "center",
            overflow: "hidden",
          }}
        >
          {/* Animated dot grid overlay */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            backgroundImage: "radial-gradient(circle, rgba(17,17,17,0.07) 1.5px, transparent 1.5px)",
            backgroundSize: "36px 36px",
            animation: "dotsShift 28s linear infinite",
          }} />
          {/* Glow blobs */}
          <div style={{ position: "absolute", top: -100, right: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,230,163,0.22),transparent 65%)", pointerEvents: "none", animation: "blob1 10s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: -60, left: -60, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(17,17,17,0.04),transparent 65%)", pointerEvents: "none", animation: "blob2 14s ease-in-out infinite" }} />

          <div style={{
            maxWidth: 800, position: "relative", zIndex: 2,
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#111111", backgroundColor: "#F5E6A3", letterSpacing: "1.5px", textTransform: "uppercase", padding: "6px 14px", borderRadius: 4, display: "inline-block", marginBottom: 20 }}>
              Client Stories
            </span>
            <h1 style={{ fontSize: "clamp(34px,5vw,56px)", fontWeight: 950, color: "#111111", textTransform: "uppercase", letterSpacing: "-1.5px", lineHeight: 1.1, marginBottom: 24 }}>
              Real results from real providers
            </h1>
            <p style={{ fontSize: "clamp(16px,2vw,18px)", color: "#555555", lineHeight: 1.7, maxWidth: 650, marginBottom: 32, fontWeight: 500 }}>
              Don't take our word for it. Here's how our specialized revenue cycle management empowers healthcare operations across the nation.
            </p>
            {/* Rating pills */}
            <div className="hero-pills" style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.85)", border: "1px solid rgba(17,17,17,0.1)", borderRadius: 100, padding: "8px 18px", backdropFilter: "blur(8px)" }}>
                <div style={{ display: "flex", gap: 2 }}>{[...Array(5)].map((_,i)=><span key={i} style={{ color:"#F0B429",fontSize:13 }}>★</span>)}</div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#111111" }}>4.9 / 5</span>
                <span style={{ fontSize: 12, color: "#666666" }}>average rating</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.85)", border: "1px solid rgba(17,17,17,0.1)", borderRadius: 100, padding: "8px 18px", backdropFilter: "blur(8px)" }}>
                <span style={{ fontSize: 14 }}>🏥</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#111111" }}>500+ providers</span>
                <span style={{ fontSize: 12, color: "#666666" }}>trust MedCare RCM</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section style={{ background: "#111111", padding: "48px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div ref={statsReveal.ref} className="stats-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, textAlign: "center" }}>
            {[
              { value: "500+", label: "Providers served" },
              { value: "98%",  label: "Client retention rate" },
              { value: "$50M+",label: "Revenue optimized" },
              { value: "4.9/5",label: "Average client rating" },
            ].map((s, i) => (
              <div key={i} style={{ opacity: statsReveal.visible ? 1 : 0, transform: statsReveal.visible ? "scale(1)" : "scale(0.9)", transition: `all 0.6s ease ${i * 0.1}s` }}>
                <div style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 900, color: "#F5E6A3", letterSpacing: "-1px" }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "#888888", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── MAIN GRID (6 reviews) ── */}
        <section style={{ padding: "100px 24px", backgroundColor: "#F5F0E8" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 26, height: 2, background: "#111111", borderRadius: 2 }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#111111", letterSpacing: "2px", textTransform: "uppercase" }}>Featured Reviews</span>
              </div>
              <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: "#111111", letterSpacing: -1 }}>What our clients say</h2>
            </div>
          </Reveal>

          <div className="cards-grid" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px,1fr))", gap: 28 }}>
            {GRID_ITEMS.map((t, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <TestimonialCard t={t} index={i} mounted />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── MARQUEE ROW (6 more reviews) ── */}
        <section style={{ background: "#fff", padding: "72px 0", overflow: "hidden" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: 40, padding: "0 24px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 26, height: 2, background: "#111111", borderRadius: 2 }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: "#111111", letterSpacing: "2px", textTransform: "uppercase" }}>More Success Stories</span>
              </div>
              <h2 style={{ fontSize: "clamp(22px,3.5vw,36px)", fontWeight: 800, color: "#111111", letterSpacing: -1 }}>Across every specialty</h2>
            </div>
          </Reveal>
          {/* Fade edges */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 100, background: "linear-gradient(to right,#fff,transparent)", zIndex: 2, pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 100, background: "linear-gradient(to left,#fff,transparent)", zIndex: 2, pointerEvents: "none" }} />
            <MarqueeRow />
          </div>
        </section>

        {/* ── TRUST BADGES ── */}
        <Reveal>
          <section style={{ background: "#F5F0E8", padding: "52px 24px", borderTop: "1px solid rgba(17,17,17,0.07)" }}>
            <div className="trust-badges" style={{ maxWidth: 960, margin: "0 auto", display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
              {[
                { icon: "🔒", label: "HIPAA Certified" },
                { icon: "✅", label: "CPC Billing Specialists" },
                { icon: "🇺🇸", label: "USA-Based Team" },
                { icon: "⚡", label: "98%+ First-Pass Rate" },
                { icon: "📞", label: "Dedicated Account Manager" },
                { icon: "📊", label: "Real-Time Reporting" },
              ].map((b, i) => (
                <div key={i} className="trust-badge" style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid rgba(17,17,17,0.1)", borderRadius: 100, padding: "10px 20px", boxShadow: "0 2px 10px rgba(17,17,17,0.04)" }}>
                  <span style={{ fontSize: 16 }}>{b.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#111111" }}>{b.label}</span>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* ── CTA ── */}
        <section style={{ background: "#111111", padding: "100px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(28px,4.5vw,44px)", fontWeight: 950, color: "#ffffff", textTransform: "uppercase", letterSpacing: "-1px", marginBottom: 18 }}>
              Ready to add your success story?
            </h2>
            <p style={{ fontSize: 16, color: "#888888", fontWeight: 500, lineHeight: 1.65, marginBottom: 36, maxWidth: 540, margin: "0 auto 36px" }}>
              Join hundreds of high-performance practice networks nationwide who secure full billing transparency with MedCare.
            </p>
            <div className="cta-buttons" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" className="cta-btn" style={{ display: "inline-block", background: "#F5E6A3", color: "#111111", padding: "16px 36px", borderRadius: 6, fontSize: 15, fontWeight: 700, letterSpacing: "0.5px" }}>
                Get a free audit →
              </Link>
              <Link href="/services" style={{ display: "inline-block", background: "transparent", color: "rgba(255,255,255,0.65)", padding: "16px 28px", borderRadius: 6, fontSize: 15, fontWeight: 600, border: "1.5px solid rgba(255,255,255,0.18)" }}>
                Explore services
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      <style jsx global>{`
        /* Card hover lift */
        .testimonial-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease !important;
        }
        .testimonial-card:hover {
          transform: translateY(-6px) !important;
          box-shadow: 0 20px 48px rgba(17,17,17,0.10) !important;
        }
        .cta-btn:hover { opacity: 0.88; }

        /* Marquee track */
        .marquee-track {
          display: flex;
          gap: 20px;
          animation: marquee 38s linear infinite;
          width: max-content;
        }
        .marquee-track:hover { animation-play-state: paused; }
        .marquee-card { width: 340px; flex-shrink: 0; }

        /* Animations */
        @keyframes dotsShift { 0%{background-position:0 0} 100%{background-position:36px 36px} }
        @keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-20px,18px) scale(1.05)} }
        @keyframes blob2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(18px,-14px) scale(1.04)} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        /* ── MOBILE ── */
        @media (max-width: 768px) {
          .hero-section {
            padding: 130px 16px 64px !important;
            background-image:
              linear-gradient(180deg, rgba(245,240,232,0.96) 0%, #F5F0E8 100%),
              url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2000&q=80') !important;
          }
          .hero-pills {
            flex-direction: column !important;
            align-items: center !important;
            gap: 10px !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2,1fr) !important;
            gap: 32px 16px !important;
          }
          .cards-grid {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
          .testimonial-card {
            padding: 28px 20px !important;
          }
          .marquee-card { width: 280px !important; }
          .trust-badges { gap: 10px !important; }
          .trust-badge { padding: 8px 14px !important; }
          .trust-badge span:last-child { font-size: 12px !important; }
          .cta-buttons {
            flex-direction: column !important;
            align-items: center !important;
          }
          .cta-buttons a { width: 100% !important; text-align: center !important; }
        }

        @media (max-width: 480px) {
          .hero-section { padding: 110px 14px 52px !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; gap: 24px 12px !important; }
          .marquee-card { width: 260px !important; }
        }
      `}</style>
    </>
  );
}
