"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

/* ── Scroll reveal hook ── */
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

/* ── Count-up hook ── */
function useCountUp(target, duration = 1800, active = false, suffix = "") {
  const [val, setVal] = useState("0");
  useEffect(() => {
    if (!active) return;
    const s = Date.now();
    const isFloat = String(target).includes(".");
    const tick = () => {
      const p = Math.min((Date.now() - s) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      const v = isFloat ? (e * target).toFixed(1) : Math.round(e * target);
      setVal(v + suffix);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active]);
  return val;
}

const SPECIALTIES = [
  {
    icon: "👨‍⚕️", title: "Family Medicine", slug: "family-medicine",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=75&fit=crop",
    desc: "Comprehensive primary care billing for family practices — from preventive visits to chronic disease management.",
  },
  {
    icon: "🏥", title: "Internal Medicine", slug: "internal-medicine",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=75&fit=crop",
    desc: "Complex E&M coding and multi-system billing optimized for internal medicine physicians.",
  },
  {
    icon: "👶", title: "Pediatrics", slug: "pediatrics",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&q=75&fit=crop",
    desc: "Pediatric-specific billing including well-child visits, vaccine administration, and developmental screenings.",
  },
  {
    icon: "❤️", title: "Cardiology", slug: "cardiology",
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&q=75&fit=crop",
    desc: "Cardiology RCM covering catheterizations, echocardiograms, stress tests, and interventional procedures.",
  },
  {
    icon: "🫀", title: "Cardiovascular", slug: "cardiovascular",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&q=75&fit=crop",
    desc: "Vascular and cardiovascular surgical billing with precise procedure coding and modifier compliance.",
  },
  {
    icon: "🦴", title: "Orthopedics", slug: "orthopedics",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&q=75&fit=crop",
    desc: "Orthopedic billing for fracture care, joint replacements, arthroscopy, and physical medicine services.",
  },
  {
    icon: "🧠", title: "Mental Health", slug: "mental-health",
    image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=400&q=75&fit=crop",
    desc: "Therapy and psychiatric billing with parity compliance, telehealth coding, and authorization tracking.",
  },
  {
    icon: "✨", title: "Dermatology", slug: "dermatology",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=75&fit=crop",
    desc: "Dermatology billing for skin biopsies, Mohs surgery, cosmetic procedures, and pathology submissions.",
  },
  {
    icon: "⚡", title: "Neurology", slug: "neurology",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=75&fit=crop",
    desc: "Neurology RCM covering EEGs, EMGs, sleep studies, and complex neurological evaluation coding.",
  },
  {
    icon: "🩺", title: "Primary Care", slug: "primary-care",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=75&fit=crop",
    desc: "End-to-end primary care billing with wellness visit coding, chronic care management, and annual AWVs.",
  },
  {
    icon: "🩹", title: "Wound Care", slug: "wound-care",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&q=75&fit=crop",
    desc: "Wound care billing covering debridements, skin grafts, negative pressure therapy, and hyperbaric oxygen.",
  },
  {
    icon: "🦶", title: "Podiatry", slug: "podiatry",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=75&fit=crop",
    desc: "Podiatry-specific coding for routine foot care, surgery, orthotics, and diabetic foot care protocols.",
  },
  {
    icon: "📸", title: "Radiology", slug: "radiology",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=75&fit=crop",
    desc: "Radiology billing with professional and technical component splits for MRI, CT, PET, and X-ray.",
  },
  {
    icon: "🏨", title: "Ambulatory Surgery", slug: "ambulatory-surgery",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&q=75&fit=crop",
    desc: "ASC facility billing covering device-intensive procedures, multi-procedural discounting, and implants.",
  },
  {
    icon: "🏡", title: "Nursing Home", slug: "nursing-home",
    image: "https://images.unsplash.com/photo-1576765607924-3f7b8410a787?w=400&q=75&fit=crop",
    desc: "Long-term care and SNF billing including nursing facility visits, care plan oversight, and MDS coding.",
  },
  {
    icon: "🫘", title: "Nephrology", slug: "nephrology",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=75&fit=crop",
    desc: "Nephrology billing for dialysis services, ESRD management, kidney biopsies, and transplant follow-up.",
  },
  {
    icon: "🏥", title: "Medical Clinics", slug: "medical-clinics",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=75&fit=crop",
    desc: "Multi-specialty clinic billing with payer contract management and high-volume claim throughput.",
  },
  {
    icon: "🔪", title: "General Surgery", slug: "general-surgery",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&q=75&fit=crop",
    desc: "General surgery billing for laparoscopic, open, and robotic procedures with global period management.",
  },
  {
    icon: "👩‍⚕️", title: "Gynecology", slug: "gynecology",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=75&fit=crop",
    desc: "GYN billing for office procedures, surgical cases, preventive screenings, and maternity global billing.",
  },
  {
    icon: "🩸", title: "Hematology", slug: "hematology",
    image: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=400&q=75&fit=crop",
    desc: "Hematology RCM covering infusion therapy, bone marrow biopsies, chemotherapy, and blood disorder management.",
  },
  {
    icon: "🛡️", title: "Immunology", slug: "immunology",
    image: "https://images.unsplash.com/photo-1576671414121-aa2d60f2d9c4?w=400&q=75&fit=crop",
    desc: "Allergy and immunology billing for antigen testing, immunotherapy, SLIT, and allergy injection services.",
  },
  {
    icon: "🦠", title: "Infectious Disease", slug: "infectious-disease",
    image: "https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=400&q=75&fit=crop",
    desc: "ID billing for complex hospitalist care, HIV management, antibiotic infusion therapy, and outbreak documentation.",
  },
  {
    icon: "🫁", title: "Pulmonology", slug: "pulmonology",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=75&fit=crop",
    desc: "Pulmonology RCM covering spirometry, bronchoscopy, sleep studies, and chronic respiratory disease management.",
  },
  {
    icon: "💊", title: "Oncology", slug: "oncology",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=75&fit=crop",
    desc: "Oncology billing for chemotherapy infusions, radiation therapy, immunotherapy, and cancer screenings.",
  },
  {
    icon: "🧪", title: "Endocrinology", slug: "endocrinology",
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&q=75&fit=crop",
    desc: "Endocrinology billing for diabetes management, thyroid procedures, hormone therapy, and metabolic disorders.",
  },
  {
    icon: "🧬", title: "Gastroenterology", slug: "gastroenterology",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&q=75&fit=crop",
    desc: "GI billing for colonoscopies, endoscopies, capsule procedures, and complex GI motility studies.",
  },
  {
    icon: "🧫", title: "Hepatology", slug: "hepatology",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=75&fit=crop",
    desc: "Hepatology billing for liver biopsies, ERCP, cirrhosis management, and transplant follow-up care.",
  },
  {
    icon: "🚻", title: "Urology", slug: "urology",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&q=75&fit=crop",
    desc: "Urology billing for cystoscopy, prostate procedures, nephrolithiasis treatment, and robotic surgery.",
  },
  {
    icon: "🤲", title: "Rheumatology", slug: "rheumatology",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=75&fit=crop",
    desc: "Rheumatology RCM for biologic infusions, joint injections, autoimmune disease management, and infusion suites.",
  },
  {
    icon: "🏃", title: "Physical Therapy", slug: "physical-therapy",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=75&fit=crop",
    desc: "PT billing covering therapeutic exercises, manual therapy, modalities, and functional capacity evaluations.",
  },
  {
    icon: "💉", title: "Pain Management", slug: "pain-management",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=75&fit=crop",
    desc: "Pain management billing for nerve blocks, spinal injections, stimulator implants, and medication management.",
  },
  {
    icon: "👐", title: "Chiropractic", slug: "chiropractic",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=75&fit=crop",
    desc: "Chiropractic billing for spinal manipulation, maintenance care, Medicare compliance, and personal injury.",
  },
  {
    icon: "🩺", title: "Urgent Care", slug: "urgent-care",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=75&fit=crop",
    desc: "Urgent care billing with high-volume claim throughput, walk-in coding compliance, and rapid payment cycles.",
  },
  {
    icon: "⚕️", title: "OB/GYN", slug: "ob-gyn",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=75&fit=crop",
    desc: "OB/GYN billing for global maternity packages, antepartum care, delivery coding, and postpartum visits.",
  },
  {
    icon: "👁️", title: "Ophthalmology", slug: "ophthalmology",
    image: "https://images.unsplash.com/photo-1576765607924-3f7b8410a787?w=400&q=75&fit=crop",
    desc: "Ophthalmology RCM for cataract surgery, retinal injections, glaucoma procedures, and routine eye exams.",
  },
  {
    icon: "👂", title: "Otolaryngology", slug: "otolaryngology",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&q=75&fit=crop",
    desc: "ENT billing for sinus surgery, tonsillectomies, hearing tests, laryngoscopy, and allergy injections.",
  },
  {
    icon: "🦷", title: "Dentistry", slug: "dentistry",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=75&fit=crop",
    desc: "Dental billing for oral surgery, implants, medical-dental cross-coding, and anesthesia billing compliance.",
  },
  {
    icon: "🧑‍🦽", title: "Rehabilitation", slug: "rehabilitation",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=75&fit=crop",
    desc: "Rehab billing for inpatient and outpatient programs, occupational therapy, speech therapy, and functional assessments.",
  },
  {
    icon: "🧑‍🦼", title: "Geriatrics", slug: "geriatrics",
    image: "https://images.unsplash.com/photo-1576765607924-3f7b8410a787?w=400&q=75&fit=crop",
    desc: "Geriatric billing for annual wellness visits, care transition management, cognitive assessments, and SNF care.",
  },
  {
    icon: "🧑‍🦲", title: "Trichology", slug: "trichology",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=75&fit=crop",
    desc: "Trichology billing for scalp treatments, hair restoration procedures, and dermatological hair disorder coding.",
  },
];

/* ── Specialty Card ── */
function SpecialtyCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Link href={`/specialties/${item.slug}`} style={{ textDecoration: "none" }}>
      <div
        ref={ref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#fff",
          borderRadius: 20,
          overflow: "hidden",
          border: "1px solid",
          borderColor: hovered ? "#111111" : "rgba(17,17,17,0.1)",
          boxShadow: hovered ? "0 24px 56px rgba(17,17,17,0.12)" : "0 2px 16px rgba(17,17,17,0.05)",
          transform: hovered ? "translateY(-8px)" : visible ? "translateY(0)" : "translateY(32px)",
          opacity: visible ? 1 : 0,
          transition: `all 0.4s cubic-bezier(0.16,1,0.3,1) ${(index % 6) * 0.06}s`,
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", height: 180, overflow: "hidden", flexShrink: 0 }}>
          {!imgErr ? (
            <img
              src={item.image}
              alt={item.title}
              style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block",
                transform: hovered ? "scale(1.08)" : "scale(1)",
                transition: "transform 0.5s ease",
              }}
              onError={() => setImgErr(true)}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#F5F0E8,#F0EBE0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56 }}>
              {item.icon}
            </div>
          )}
          {/* Gradient overlay */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(17,17,17,0.55) 100%)" }} />
          {/* Title over image */}
          <div style={{ position: "absolute", bottom: 14, left: 16, right: 16 }}>
            <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: -0.3, margin: 0, textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>{item.title}</h3>
          </div>
          {/* Icon pill */}
          <div style={{ position: "absolute", top: 12, right: 12, background: "#F5E6A3", borderRadius: 100, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
            {item.icon}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
          <p style={{ fontSize: 13, color: "#666666", lineHeight: 1.7, flex: 1, margin: "0 0 16px" }}>{item.desc}</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid rgba(17,17,17,0.07)" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#999999", textTransform: "uppercase", letterSpacing: 1 }}>Learn more</span>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: hovered ? "#111111" : "#F5E6A3",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 800,
              color: hovered ? "#F5E6A3" : "#111111",
              transition: "all 0.25s ease",
            }}>→</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function SpecialtiesPage() {
  const [search, setSearch] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const heroReveal = useReveal(0.1);
  const statsReveal = useReveal(0.2);
  const whyReveal = useReveal(0.15);
  const ctaReveal = useReveal(0.2);

  const s1 = useCountUp(40, 1600, statsReveal.visible, "+");
  const s2 = useCountUp(500, 1800, statsReveal.visible, "+");
  const s3 = useCountUp(98, 1600, statsReveal.visible, "%");
  const s4 = useCountUp(50, 1600, statsReveal.visible, "M+");

  const filtered = SPECIALTIES.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main style={{ background: "#F5F0E8" }}>

        {/* ── HERO ── */}
        <section style={{ background: "linear-gradient(160deg,#F5F0E8 0%,#FDFAF5 50%,#F0EBE0 100%)", padding: "150px 24px 90px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -120, right: -120, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,230,163,0.3),transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, left: -60, width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle,rgba(17,17,17,0.04),transparent 70%)", pointerEvents: "none" }} />

          <div ref={heroReveal.ref} style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
            {/* Badge */}
            <div style={{ opacity: heroReveal.visible ? 1 : 0, transform: heroReveal.visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.05s" }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#111111", background: "#F5E6A3", letterSpacing: "1.5px", textTransform: "uppercase", padding: "7px 18px", borderRadius: 100, display: "inline-block", marginBottom: 24, border: "1px solid rgba(17,17,17,0.12)" }}>
                Medical Billing Specialties
              </span>
            </div>

            {/* Headline */}
            <h1 style={{ opacity: heroReveal.visible ? 1 : 0, transform: heroReveal.visible ? "translateY(0)" : "translateY(28px)", transition: "all 0.65s ease 0.15s", fontSize: "clamp(34px,5vw,62px)", fontWeight: 800, color: "#111111", lineHeight: 1.08, letterSpacing: -2, marginBottom: 22 }}>
              Billing expertise for<br />
              <span style={{ color: "#111111", opacity: 0.3 }}>every</span> specialty
            </h1>

            {/* Subtitle */}
            <p style={{ opacity: heroReveal.visible ? 1 : 0, transform: heroReveal.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.65s ease 0.25s", fontSize: 17, color: "#666666", lineHeight: 1.8, maxWidth: 600, margin: "0 auto 40px" }}>
              Our certified billing professionals understand the unique payer rules, coding guidelines, and reimbursement models of each healthcare specialty — not just billing in general.
            </p>

            {/* Search bar */}
            <div style={{ opacity: heroReveal.visible ? 1 : 0, transform: heroReveal.visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.65s ease 0.35s", maxWidth: 480, margin: "0 auto" }}>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", fontSize: 18, pointerEvents: "none" }}>🔍</span>
                <input
                  type="text"
                  placeholder="Search specialties..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  style={{
                    width: "100%", padding: "15px 20px 15px 52px",
                    border: `2px solid ${searchFocused ? "#111111" : "rgba(17,17,17,0.15)"}`,
                    borderRadius: 100, fontSize: 15, outline: "none",
                    fontFamily: "inherit", background: "#fff",
                    color: "#111111", boxSizing: "border-box",
                    boxShadow: searchFocused ? "0 4px 20px rgba(17,17,17,0.1)" : "0 2px 12px rgba(17,17,17,0.05)",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                />
                {search && (
                  <button onClick={() => setSearch("")} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#999" }}>✕</button>
                )}
              </div>
              {search && (
                <p style={{ fontSize: 12, color: "#999999", marginTop: 10, textAlign: "center" }}>
                  {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "<strong style={{ color: "#111111" }}>{search}</strong>"
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section ref={statsReveal.ref} style={{ background: "#111111", padding: "56px 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, textAlign: "center" }}>
            {[
              { val: s1, label: "Specialties Supported" },
              { val: s2, label: "Providers Served" },
              { val: s3, label: "Clean Claim Rate" },
              { val: `$${s4}`, label: "Revenue Recovered" },
            ].map((item, i) => (
              <div key={i} style={{ opacity: statsReveal.visible ? 1 : 0, transform: statsReveal.visible ? "translateY(0)" : "translateY(24px)", transition: `all 0.5s ease ${i * 0.08}s` }}>
                <div style={{ color: "#fff", fontSize: 36, fontWeight: 800, letterSpacing: -1 }}>{item.val}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", marginTop: 6, letterSpacing: 1 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SPECIALTIES GRID ── */}
        <section style={{ padding: "100px 24px", background: "#F5F0E8" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 26, height: 2, background: "#111111", borderRadius: 2 }} />
                <p style={{ fontSize: 12, fontWeight: 700, color: "#111111", letterSpacing: "2px", textTransform: "uppercase" }}>40+ Specialties</p>
              </div>
              <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, color: "#111111", letterSpacing: -1, marginBottom: 14 }}>
                {search ? `Results for "${search}"` : "Specialties we serve"}
              </h2>
              <p style={{ fontSize: 16, color: "#666666", maxWidth: 480, margin: "0 auto" }}>
                Revenue cycle management precisely configured for your clinical scope.
              </p>
            </div>

            {filtered.length > 0 ? (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 22 }}>
                {filtered.map((item, index) => (
                  <SpecialtyCard key={item.slug} item={item} index={index} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "60px 24px" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#111111", marginBottom: 8 }}>No specialties found</h3>
                <p style={{ fontSize: 14, color: "#666666", marginBottom: 20 }}>Try a different search or contact us — we may still cover it.</p>
                <button onClick={() => setSearch("")} style={{ background: "#111111", color: "#fff", border: "none", padding: "11px 24px", borderRadius: 100, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Clear search</button>
              </div>
            )}
          </div>
        </section>

        {/* ── WHY TRUST US ── */}
        <section ref={whyReveal.ref} style={{ background: "#fff", padding: "100px 24px", borderTop: "1px solid rgba(17,17,17,0.06)" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56, opacity: whyReveal.visible ? 1 : 0, transform: whyReveal.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 26, height: 2, background: "#111111", borderRadius: 2 }} />
                <p style={{ fontSize: 12, fontWeight: 700, color: "#111111", letterSpacing: "2px", textTransform: "uppercase" }}>Why MedCare</p>
              </div>
              <h2 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: "#111111", letterSpacing: -1, marginBottom: 12 }}>Why practices trust MedCare RCM</h2>
              <p style={{ fontSize: 15, color: "#666666", maxWidth: 460, margin: "0 auto" }}>Every specialty gets the same commitment — maximum reimbursement, minimum hassle.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
              {[
                { icon: "🎯", title: "Specialty-specific expertise", desc: "Our billers are trained in your specialty's unique payer rules and coding guidelines — not generic billing." },
                { icon: "✅", title: "Certified billing professionals", desc: "CPC and CCS certified coders who understand the clinical context behind every code they submit." },
                { icon: "🔒", title: "HIPAA-compliant always", desc: "Every workflow and system meets the highest data security and compliance standards." },
                { icon: "📉", title: "Lower denial rates", desc: "Specialty-specific scrubbing catches errors before submission — keeping your denial rate below 5%." },
                { icon: "⚡", title: "Faster reimbursements", desc: "Optimized claim pathways and proactive follow-up cut your average AR days significantly." },
                { icon: "📞", title: "Dedicated account manager", desc: "One person who knows your practice, your payers, and your billing history — always available." },
              ].map((item, i) => (
                <div key={i} style={{
                  background: "#F5F0E8", border: "1px solid rgba(17,17,17,0.07)", borderRadius: 16, padding: "22px 22px",
                  display: "flex", gap: 14, alignItems: "flex-start",
                  opacity: whyReveal.visible ? 1 : 0, transform: whyReveal.visible ? "translateY(0)" : "translateY(24px)",
                  transition: `all 0.5s ease ${0.06 + i * 0.07}s`,
                }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "#F5E6A3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: "#111111", marginBottom: 5 }}>{item.title}</h4>
                    <p style={{ fontSize: 13, color: "#666666", lineHeight: 1.65 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section ref={ctaReveal.ref} style={{ background: "#111111", padding: "100px 24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,230,163,0.1),transparent 70%)", pointerEvents: "none" }} />
          <div style={{
            maxWidth: 680, margin: "0 auto", textAlign: "center",
            opacity: ctaReveal.visible ? 1 : 0, transform: ctaReveal.visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
            transition: "all 0.7s ease",
          }}>
            <div style={{ display: "inline-block", background: "#F5E6A3", borderRadius: 100, padding: "6px 18px", fontSize: 12, fontWeight: 700, color: "#111111", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 24 }}>
              Don't see your specialty?
            </div>
            <h2 style={{ fontSize: "clamp(28px,4vw,46px)", fontWeight: 800, color: "#fff", letterSpacing: -1.5, marginBottom: 18, lineHeight: 1.1 }}>
              We probably cover it.<br />
              <span style={{ color: "rgba(255,255,255,0.4)" }}>Let's find out.</span>
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 40, maxWidth: 520, margin: "0 auto 40px" }}>
              We work with over 40 specialties and build custom billing workflows for practices with unique needs. Talk to our team — no obligation.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ background: "#F5E6A3", color: "#111111", padding: "15px 32px", borderRadius: 100, fontSize: 15, fontWeight: 800, display: "inline-flex", alignItems: "center", gap: 8 }}>
                Get a free audit →
              </Link>
              <Link href="/contact" style={{ background: "transparent", color: "#fff", padding: "15px 28px", borderRadius: 100, fontSize: 15, fontWeight: 600, border: "1.5px solid rgba(255,255,255,0.2)", display: "inline-block" }}>
                Talk to our team
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
        @media (max-width: 768px) {
          .specialty-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
