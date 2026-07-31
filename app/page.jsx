import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const SERVICES_DATA = [
  { icon: "💰", title: "AR Recovery", href: "/services/ar-recovery", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=75&fit=crop", tag: "Fast ROI", desc: "We recover aging claims beyond 60 days that most practices write off permanently." },
  { icon: "🪪", title: "Provider Credentialing", href: "/services/credentialing", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=75&fit=crop", tag: "7-Day Setup", desc: "Fast-track CAQH, Medicare, Medicaid and commercial payer enrollment — zero delays." },
  { icon: "📊", title: "Reporting & Analytics", href: "/services/reporting-analytics", img: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=700&q=75&fit=crop", tag: "Real-Time", desc: "Live KPI dashboards and monthly executive reports — every metric in plain language." },
];

const SPECIALTIES_DATA = [
  { title: "Family Medicine", href: "/specialties/family-medicine" },
  { title: "Cardiology", href: "/specialties/cardiology" },
  { title: "Orthopedics", href: "/specialties/orthopedics" },
  { title: "Mental Health", href: "/specialties/mental-health" },
  { title: "Pediatrics", href: "/specialties/pediatrics" },
  { title: "Oncology", href: "/specialties/oncology" },
];

const TESTIMONIALS_DATA = [
  { name: "Dr. Mark Allen", title: "Practice Director", comment: "MedCare turned our denied claims into cash flow within 30 days. Their denial team is the difference." },
  { name: "Dr. Sarah Patel", title: "Clinic Owner", comment: "The audit uncovered billing errors we never saw — and our collection rate improved immediately." },
  { name: "Dr. Evan Moore", title: "Surgery Center CFO", comment: "Reliable RCM with transparent reporting. No surprises, just stronger revenue." },
];

const PRICING_TIERS = [
  { name: "Starter", rate: "4.99%", badge: "No Setup Fee", desc: "Perfect for smaller practices that want a simple, predictable RCM partner.", features: ["No long-term contracts", "Full claim submission", "Dedicated billing specialist"] },
  { name: "Growth", rate: "3.75%", badge: "Most Popular", desc: "For growing clinics needing faster reimbursements and better denial recovery.", features: ["Advanced denial management", "Real-time analytics", "Weekly AR review"] },
  { name: "Enterprise", rate: "1.99%", badge: "Enterprise-Ready", desc: "Designed for larger groups, surgery centers, and specialty networks.", features: ["Custom payer strategy", "Dedicated RCM team", "Revenue optimization"] },
];

const FAQS = [
  { q: "How quickly can we start?", a: "Most practices begin onboarding within 5–7 business days. We handle your EHR setup, payer enrollment, and staff coordination." },
  { q: "Do you support multi-specialty groups?", a: "Yes. We support primary care, cardiology, orthopedics, mental health, pediatrics, oncology, and more." },
  { q: "What makes your pricing performance-based?", a: "We charge a percentage of collections and share the risk with your practice. If you don’t collect, we don’t get paid." },
];

function SectionLabel({ text }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
      <div style={{ width: 32, height: 2, background: "#111111", borderRadius: 2 }} />
      <p style={{ fontSize: 11, fontWeight: 800, color: "#111111", letterSpacing: "3px", textTransform: "uppercase" }}>{text}</p>
    </div>
  );
}

function Hero() {
  return (
    <section style={{ minHeight: "100vh", paddingTop: 80, background: "linear-gradient(160deg, #F5F0E8 0%, #FDFAF5 45%, #F0EBE0 100%)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(circle, rgba(17,17,17,0.05) 1.5px, transparent 1.5px)", backgroundSize: "40px 40px" }} />
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "60px 20px 90px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", width: "100%" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#F5E6A3", border: "1px solid rgba(17,17,17,0.15)", borderRadius: 100, padding: "7px 18px", marginBottom: 24 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#111111", display: "inline-block" }} />
            <span style={{ fontSize: 12, color: "#111111", fontWeight: 700 }}>HIPAA-Compliant · USA-Based RCM Experts</span>
          </div>
          <h1 style={{ fontSize: "clamp(34px,4.5vw,60px)", fontWeight: 800, color: "#111111", lineHeight: 1.1, letterSpacing: -2, marginBottom: 20 }}>
            Recover More.<br />
            <span style={{ color: "#111111", opacity: 0.35 }}>Reduce Your</span><br />
            <span style={{ color: "#111111", borderBottom: "3px solid #F5E6A3", paddingBottom: 2 }}>Denials, Write-offs, AR Days</span>
          </h1>
          <p style={{ fontSize: 16, color: "#666666", lineHeight: 1.8, marginBottom: 32, maxWidth: 460 }}>
            MedCare RCM Solutions manages your complete revenue cycle — from claim submission to final payment — so you collect every dollar you've earned.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
            <Link href="/contact" style={{ background: "#111111", color: "#fff", padding: "14px 26px", borderRadius: 100, fontSize: 15, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 10, boxShadow: "0 4px 24px rgba(17,17,17,0.25)" }}>
              Get a Free Audit
              <span style={{ background: "#F5E6A3", color: "#111111", borderRadius: "50%", width: 26, height: 26, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>→</span>
            </Link>
            <Link href="/services" style={{ background: "transparent", color: "#111111", padding: "14px 26px", borderRadius: 100, fontSize: 15, fontWeight: 600, display: "inline-block", border: "1.5px solid rgba(17,17,17,0.2)" }}>
              Explore Services
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", background: "#fff", borderRadius: 16, border: "1px solid rgba(17,17,17,0.1)", boxShadow: "0 2px 20px rgba(17,17,17,0.06)", overflow: "hidden" }}>
            {[
              { value: "98%", label: "First-Pass Rate" },
              { value: "9.6%", label: "Denial Rate" },
              { value: "31.7%", label: "Revenue Growth" },
              { value: "500+", label: "Providers Served" },
            ].map((item, index) => (
              <div key={index} style={{ padding: "14px 8px", textAlign: "center", borderRight: index < 3 ? "1px solid rgba(17,17,17,0.08)" : "none" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#111111", letterSpacing: -0.5 }}>{item.value}</div>
                <div style={{ fontSize: 11, color: "#4B5563", marginTop: 3, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: "relative", minHeight: 520, borderRadius: 28, background: "linear-gradient(180deg, #ffffff 0%, #F5F0E8 100%)", border: "1px solid rgba(17,17,17,0.08)", boxShadow: "0 20px 60px rgba(17,17,17,0.08)" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle, rgba(245,230,163,0.18), transparent 52%)", borderRadius: 28 }} />
          <div style={{ position: "relative", padding: 32, height: "100%", display: "grid", gridTemplateRows: "1fr auto", gap: 22 }}>
            <div style={{ display: "grid", gap: 18 }}>
              <div style={{ background: "#111111", color: "#fff", borderRadius: 22, padding: "24px", boxShadow: "0 18px 40px rgba(17,17,17,0.18)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F5E6A3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏥</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.85)", textTransform: "uppercase", letterSpacing: 1.2 }}>Live revenue metrics</div>
                  </div>
                </div>
                <div style={{ fontSize: 50, fontWeight: 900 }}>98%</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.75)" }}>First-pass claim rate</div>
              </div>
              <div style={{ background: "#fff", border: "1px solid rgba(17,17,17,0.1)", borderRadius: 18, padding: 20, boxShadow: "0 10px 26px rgba(17,17,17,0.08)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Reduced Denials</div>
                <div style={{ fontSize: 34, fontWeight: 800, color: "#111111" }}>9.6%</div>
                <p style={{ fontSize: 11, color: "#4B5563", marginTop: 6 }}>Lower denial volume with every claim.</p>
              </div>
              <div style={{ background: "#fff", border: "1px solid rgba(17,17,17,0.1)", borderRadius: 18, padding: 20, boxShadow: "0 10px 26px rgba(17,17,17,0.08)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Revenue Growth</div>
                <div style={{ fontSize: 34, fontWeight: 800, color: "#111111" }}>31.7%</div>
                <p style={{ fontSize: 11, color: "#4B5563", marginTop: 6 }}>Improved cash flow through faster collections.</p>
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.9)", borderRadius: 18, padding: 20, border: "1px solid rgba(17,17,17,0.08)" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#111111", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>Trusted Outcomes</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
                {[
                  { label: "First-pass claims" },
                  { label: "HIPAA certified" },
                  { label: "USA-based team" },
                  { label: "500+ providers" },
                ].map((item, index) => (
                  <div key={index} style={{ background: "#F5F0E8", borderRadius: 14, padding: 16, textAlign: "center", fontSize: 13, fontWeight: 700, color: "#111111" }}>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <section style={{ background: "#fff", padding: "64px 20px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: 24, textAlign: "center" }}>
        {[
          { value: "98%", label: "First-pass approvals" },
          { value: "500+", label: "Providers supported" },
          { value: "40+", label: "Specialties served" },
          { value: "31.7%", label: "Average revenue gain" },
        ].map((item, index) => (
          <div key={index} style={{ padding: 24, borderRadius: 24, background: "#F5F0E8", border: "1px solid rgba(17,17,17,0.09)" }}>
            <div style={{ fontSize: 38, fontWeight: 900, color: "#111111", marginBottom: 8 }}>{item.value}</div>
            <div style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.8 }}>{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section style={{ background: "#F5F0E8", padding: "80px 20px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <SectionLabel text="Services" />
        <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, color: "#111111", letterSpacing: -1.5, marginBottom: 14 }}>High-impact RCM services that improve your bottom line</h2>
        <p style={{ fontSize: 16, color: "#666666", maxWidth: 560, lineHeight: 1.8, marginBottom: 40 }}>A complete suite of billing, denial, credentialing, and analytics services built for ambulatory clinics, specialists, and surgery centers.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 22 }}>
          {SERVICES_DATA.map((service, index) => (
            <Link key={index} href={service.href} style={{ display: "block", overflow: "hidden", borderRadius: 24, background: "#fff", border: "1px solid rgba(17,17,17,0.08)", boxShadow: "0 8px 28px rgba(17,17,17,0.06)" }}>
              <div style={{ aspectRatio: "4 / 3", overflow: "hidden" }}>
                <img loading="lazy" src={service.img} alt={service.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 10, fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#111111" }}>
                  <span>{service.icon}</span>
                  <span>{service.tag}</span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#111111", marginBottom: 10 }}>{service.title}</h3>
                <p style={{ fontSize: 14, color: "#555555", lineHeight: 1.75 }}>{service.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Specialties() {
  return (
    <section style={{ background: "#fff", padding: "80px 20px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <SectionLabel text="Specialties" />
        <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, color: "#111111", letterSpacing: -1.5, marginBottom: 14 }}>RCM expertise across every top specialty</h2>
        <p style={{ fontSize: 16, color: "#666666", maxWidth: 560, lineHeight: 1.8, marginBottom: 40 }}>We support the unique billing rules of specialties like cardiology, orthopedics, oncology, pediatrics, and more.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 18 }}>
          {SPECIALTIES_DATA.map((item, index) => (
            <Link key={index} href={item.href} style={{ padding: 24, borderRadius: 22, background: "#F5F0E8", border: "1px solid rgba(17,17,17,0.08)", color: "#111111", fontWeight: 700, minHeight: 160, display: "flex", flexDirection: "column", justifyContent: "space-between", transition: "transform 0.2s" }}>
              <span style={{ fontSize: 16 }}>{item.title}</span>
              <span style={{ fontSize: 12, color: "#4B5563", textTransform: "uppercase", letterSpacing: 1.2 }}>View Specialty</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section style={{ background: "#F5F0E8", padding: "80px 20px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <SectionLabel text="Why Us" />
        <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, color: "#111111", letterSpacing: -1.5, marginBottom: 14 }}>Dedicated RCM support that scales with your practice</h2>
        <p style={{ fontSize: 16, color: "#666666", maxWidth: 560, lineHeight: 1.8, marginBottom: 40 }}>We combine experienced billing specialists, payer advocacy, and exacting workflows to reduce write-offs and accelerate collections.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 20 }}>
          {[
            { title: "Transparent pricing", desc: "No hidden fees, no surprise audits, just performance-based billing." },
            { title: "Faster reimbursements", desc: "We fix claim errors before submission and track outstanding AR daily." },
            { title: "Team-backed support", desc: "Dedicated claims, credentialing, and denial specialists for every client." },
          ].map((item, index) => (
            <div key={index} style={{ padding: 28, borderRadius: 24, background: "#fff", border: "1px solid rgba(17,17,17,0.08)", boxShadow: "0 12px 30px rgba(17,17,17,0.05)" }}>
              <h3 style={{ fontSize: 19, fontWeight: 800, marginBottom: 12 }}>{item.title}</h3>
              <p style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.8 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section style={{ background: "#fff", padding: "80px 20px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <SectionLabel text="Testimonials" />
        <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, color: "#111111", letterSpacing: -1.5, marginBottom: 14 }}>What healthcare leaders say about us</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 22 }}>
          {TESTIMONIALS_DATA.map((item, index) => (
            <div key={index} style={{ padding: 28, borderRadius: 24, background: "#F5F0E8", border: "1px solid rgba(17,17,17,0.08)", minHeight: 240, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <p style={{ fontSize: 15, color: "#111111", lineHeight: 1.8, marginBottom: 24 }}>&ldquo;{item.comment}&rdquo;</p>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#111111" }}>{item.name}</div>
                <div style={{ fontSize: 13, color: "#4B5563" }}>{item.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingPreview() {
  return (
    <section style={{ background: "#FDFAF5", padding: "80px 20px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center", marginBottom: 60 }}>
        <SectionLabel text="Pricing" />
        <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, color: "#111111", letterSpacing: -1.5, marginBottom: 14 }}>Performance-based pricing with no hidden fees</h2>
        <p style={{ fontSize: 16, color: "#666666", maxWidth: 540, margin: "0 auto", lineHeight: 1.8 }}>We only win when you do — no setup fees, no long-term contracts, just results-based RCM support.</p>
      </div>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 22 }}>
        {PRICING_TIERS.map((tier, index) => (
          <div key={index} style={{ padding: 28, borderRadius: 24, background: "#fff", border: "1px solid rgba(17,17,17,0.1)", boxShadow: "0 10px 30px rgba(17,17,17,0.05)", minHeight: 380, display: "flex", flexDirection: "column" }}>
            <div style={{ marginBottom: 18 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#F5F0E8", borderRadius: 100, padding: "6px 14px", fontSize: 11, fontWeight: 700, color: "#111111", textTransform: "uppercase" }}>{tier.badge}</span>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#111111", margin: "18px 0 10px" }}>{tier.name}</h3>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#111111", lineHeight: 1.1, marginBottom: 8 }}>{tier.rate}</div>
              <p style={{ fontSize: 14, color: "#555555", lineHeight: 1.75 }}>{tier.desc}</p>
            </div>
            <div style={{ flex: 1, display: "grid", gap: 10, marginBottom: 24 }}>
              {tier.features.map((feature, featureIndex) => (
                <div key={featureIndex} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#F5E6A3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#111111", marginTop: 2 }}>✓</div>
                  <p style={{ fontSize: 14, color: "#555555", lineHeight: 1.75, margin: 0 }}>{feature}</p>
                </div>
              ))}
            </div>
            <Link href="/pricing" style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "14px 22px", borderRadius: 100, background: "#111111", color: "#fff", fontWeight: 700, textDecoration: "none" }}>
              Learn More
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section style={{ background: "#F5F0E8", padding: "80px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <SectionLabel text="Knowledge Base" />
        <h2 style={{ fontSize: "clamp(24px,4vw,42px)", fontWeight: 800, color: "#111111", letterSpacing: -1.5, marginBottom: 26 }}>Common questions answered</h2>
        <div style={{ display: "grid", gap: 12 }}>
          {FAQS.map((item, index) => (
            <details key={index} style={{ background: "#fff", border: "1px solid rgba(17,17,17,0.08)", borderRadius: 20, padding: 18, fontSize: 15, color: "#111111" }}>
              <summary style={{ cursor: "pointer", fontWeight: 800, marginBottom: 10, listStyle: "none", outline: "none" }}>{item.q}</summary>
              <p style={{ marginTop: 10, color: "#555555", lineHeight: 1.8 }}>{item.a}</p>
            </details>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 42 }}>
          <Link href="/faq" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#111111", color: "#fff", padding: "14px 32px", borderRadius: 100, fontWeight: 700, textDecoration: "none" }}>
            View All FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section style={{ background: "#111111", padding: "100px 20px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-10%", right: "-10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,230,163,0.15),transparent 65%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "-10%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,230,163,0.08),transparent 65%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-block", background: "#F5E6A3", borderRadius: 100, padding: "6px 20px", fontSize: 11, fontWeight: 800, color: "#111111", letterSpacing: 2, textTransform: "uppercase", marginBottom: 24 }}>Free — No Obligation</div>
        <h2 style={{ fontSize: "clamp(26px,4.5vw,50px)", fontWeight: 800, color: "#fff", letterSpacing: -2, marginBottom: 18, lineHeight: 1.1 }}>Ready to recover your outstanding revenue?</h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: 40, maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>
          Get a free billing audit — we'll identify exactly where you're losing revenue and show you how to fix it.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/contact" style={{ background: "#F5E6A3", color: "#111111", padding: "16px 32px", borderRadius: 100, fontSize: 15, fontWeight: 800, display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            Get Free Billing Audit →
          </Link>
          <Link href="/pricing" style={{ background: "transparent", color: "#fff", padding: "16px 28px", borderRadius: 100, fontSize: 15, fontWeight: 600, border: "1.5px solid rgba(255,255,255,0.2)", textDecoration: "none" }}>
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <Services />
        <Specialties />
        <WhyUs />
        <Testimonials />
        <PricingPreview />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
