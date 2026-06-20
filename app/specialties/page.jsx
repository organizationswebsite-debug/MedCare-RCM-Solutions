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
  { title: "Family Medicine", slug: "family-medicine", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80&fit=crop", desc: "Comprehensive primary care billing for family practices — from preventive visits to chronic disease management." },
  { title: "Internal Medicine", slug: "internal-medicine", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80&fit=crop", desc: "Complex E&M coding and multi-system billing optimized for internal medicine physicians." },
  { title: "Pediatrics", slug: "pediatrics", image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80&fit=crop", desc: "Pediatric-specific billing including well-child visits, vaccine administration, and developmental screenings." },
  { title: "Cardiology", slug: "cardiology", image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600&q=80&fit=crop", desc: "Cardiology RCM covering catheterizations, echocardiograms, stress tests, and interventional procedures." },
  { title: "Cardiovascular", slug: "cardiovascular", image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80&fit=crop", desc: "Vascular and cardiovascular surgical billing with precise procedure coding and modifier compliance." },
  { title: "Orthopedics", slug: "orthopedics", image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&q=80&fit=crop", desc: "Orthopedic billing for fracture care, joint replacements, arthroscopy, and physical medicine services." },
  { title: "Mental Health", slug: "mental-health", image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=600&q=80&fit=crop", desc: "Therapy and psychiatric billing with parity compliance, telehealth coding, and authorization tracking." },
  { title: "Dermatology", slug: "dermatology", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80&fit=crop", desc: "Dermatology billing for skin biopsies, Mohs surgery, cosmetic procedures, and pathology submissions." },
  { title: "Neurology", slug: "neurology", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80&fit=crop", desc: "Neurology RCM covering EEGs, EMGs, sleep studies, and complex neurological evaluation coding." },
  { title: "Primary Care", slug: "primary-care", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&fit=crop", desc: "End-to-end primary care billing with wellness visit coding, chronic care management, and annual AWVs." },
  { title: "Wound Care", slug: "wound-care", image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80&fit=crop", desc: "Wound care billing covering debridements, skin grafts, negative pressure therapy, and hyperbaric oxygen." },
  { title: "Podiatry", slug: "podiatry", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&fit=crop", desc: "Podiatry-specific coding for routine foot care, surgery, orthotics, and diabetic foot care protocols." },
  { title: "Radiology", slug: "radiology", image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80&fit=crop", desc: "Radiology billing with professional and technical component splits for MRI, CT, PET, and X-ray." },
  { title: "Ambulatory Surgery", slug: "ambulatory-surgery", image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80&fit=crop", desc: "ASC facility billing covering device-intensive procedures, multi-procedural discounting, and implants." },
  { title: "Nursing Home", slug: "nursing-home", image: "https://images.unsplash.com/photo-1576765607924-3f7b8410a787?w=600&q=80&fit=crop", desc: "Long-term care and SNF billing including nursing facility visits, care plan oversight, and MDS coding." },
  { title: "Nephrology", slug: "nephrology", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80&fit=crop", desc: "Nephrology billing for dialysis services, ESRD management, kidney biopsies, and transplant follow-up care." },
  { title: "Medical Clinics", slug: "medical-clinics", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80&fit=crop", desc: "Multi-specialty clinic billing with payer contract management and high-volume claim throughput." },
  { title: "General Surgery", slug: "general-surgery", image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80&fit=crop", desc: "General surgery billing for laparoscopic, open, and robotic procedures with global period management." },
  { title: "Gynecology", slug: "gynecology", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80&fit=crop", desc: "GYN billing for office procedures, surgical cases, preventive screenings, and maternity global billing." },
  { title: "Hematology", slug: "hematology", image: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=600&q=80&fit=crop", desc: "Hematology RCM covering infusion therapy, bone marrow biopsies, chemotherapy, and blood disorder management." },
  { title: "Immunology", slug: "immunology", image: "https://images.unsplash.com/photo-1576671414121-aa2d60f2d9c4?w=600&q=80&fit=crop", desc: "Allergy and immunology billing for antigen testing, immunotherapy, SLIT, and allergy injection services." },
  { title: "Infectious Disease", slug: "infectious-disease", image: "https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=600&q=80&fit=crop", desc: "ID billing for complex hospitalist care, HIV management, antibiotic infusion therapy, and outbreak documentation." },
  { title: "Pulmonology", slug: "pulmonology", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80&fit=crop", desc: "Pulmonology RCM covering spirometry, bronchoscopy, sleep studies, and chronic respiratory disease management." },
  { title: "Oncology", slug: "oncology", image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80&fit=crop", desc: "Oncology billing for chemotherapy infusions, radiation therapy, immunotherapy, and cancer screenings." },
  { title: "Endocrinology", slug: "endocrinology", image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600&q=80&fit=crop", desc: "Endocrinology billing for diabetes management, thyroid procedures, hormone therapy, and metabolic disorders.", },
  { title: "Gastroenterology", slug: "gastroenterology", image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80&fit=crop", desc: "GI billing for colonoscopies, endoscopies, capsule procedures, and complex GI motility studies." },
  { title: "Hepatology", slug: "hepatology", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80&fit=crop", desc: "Hepatology billing for liver biopsies, ERCP, cirrhosis management, and transplant follow-up care." },
  { title: "Urology", slug: "urology", image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&q=80&fit=crop", desc: "Urology billing for cystoscopy, prostate procedures, nephrolithiasis treatment, and robotic surgery." },
  { title: "Rheumatology", slug: "rheumatology", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&fit=crop", desc: "Rheumatology RCM for biologic infusions, joint injections, autoimmune disease management, and infusion suites." },
  { title: "Physical Therapy", slug: "physical-therapy", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&fit=crop", desc: "PT billing covering therapeutic exercises, manual therapy, modalities, and functional capacity evaluations." },
  { title: "Pain Management", slug: "pain-management", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80&fit=crop", desc: "Pain management billing for nerve blocks, spinal injections, stimulator implants, and medication management." },
  { title: "Chiropractic", slug: "chiropractic", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80&fit=crop", desc: "Chiropractic billing for spinal manipulation, maintenance care, Medicare compliance, and personal injury." },
  { title: "Urgent Care", slug: "urgent-care", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&q=80&fit=crop", desc: "Urgent care billing with high-volume claim throughput, walk-in coding compliance, and rapid payment cycles." },
  { title: "OB/GYN", slug: "ob-gyn", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80&fit=crop", desc: "OB/GYN billing for global maternity packages, antepartum care, delivery coding, and postpartum visits." },
  { title: "Ophthalmology", slug: "ophthalmology", image: "https://images.unsplash.com/photo-1576765607924-3f7b8410a787?w=600&q=80&fit=crop", desc: "Ophthalmology RCM for cataract surgery, retinal injections, glaucoma procedures, and routine eye exams." },
  { title: "Otolaryngology", slug: "otolaryngology", image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80&fit=crop", desc: "ENT billing for sinus surgery, tonsillectomies, hearing tests, laryngoscopy, and allergy injections." },
  { title: "Dentistry", slug: "dentistry", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&fit=crop", desc: "Dental billing for oral surgery, implants, medical-dental cross-coding, and anesthesia billing compliance." },
  { title: "Rehabilitation", slug: "rehabilitation", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&fit=crop", desc: "Rehab billing for inpatient and outpatient programs, occupational therapy, speech therapy, and functional assessments." },
  { title: "Geriatrics", slug: "geriatrics", image: "https://images.unsplash.com/photo-1576765607924-3f7b8410a787?w=600&q=80&fit=crop", desc: "Geriatric billing for annual wellness visits, care transition management, cognitive assessments, and SNF care." },
  { title: "Trichology", slug: "trichology", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80&fit=crop", desc: "Trichology billing for scalp treatments, hair restoration procedures, and dermatological hair disorder coding." },
];

/* ── Specialty Card Block ── */
function SpecialtyCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
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
          borderColor: hovered ? "#111111" : "rgba(17,17,17,0.06)",
          boxShadow: hovered ? "0 24px 50px rgba(17,17,17,0.08)" : "0 4px 20px rgba(17,17,17,0.02)",
          transform: hovered ? "translateY(-6px)" : visible ? "translateY(0)" : "translateY(24px)",
          opacity: visible ? 1 : 0,
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ position: "relative", height: 190, overflow: "hidden", flexShrink: 0 }}>
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(11,11,11,0.65) 100%)" }} />
          <div style={{ position: "absolute", bottom: 16, left: 20, right: 20 }}>
            <h3 style={{ fontSize: 19, fontWeight: 900, color: "#fff", letterSpacing: -0.4, margin: 0, textTransform: "uppercase" }}>
              {item.title}
            </h3>
          </div>
        </div>

        <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
          <p style={{ fontSize: 13.5, color: "#555555", lineHeight: 1.65, flex: 1, margin: "0 0 20px", fontWeight: 500 }}>
            {item.desc}
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid rgba(17,17,17,0.05)" }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: "#999999", textTransform: "uppercase", letterSpacing: 1.2 }}>
              Learn more
            </span>
            <div style={{
              width: 30, height: 30, borderRadius: "50%",
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
  const [showDropdown, setShowDropdown] = useState(false);
  const searchContainerRef = useRef(null);

  const heroReveal = useReveal(0.1);
  const statsReveal = useReveal(0.2);
  const whyReveal = useReveal(0.15);
  const ctaReveal = useReveal(0.2);

  const s1 = useCountUp(40, 1600, statsReveal.visible, "+");
  const s2 = useCountUp(500, 1800, statsReveal.visible, "+");
  const s3 = useCountUp(98, 1600, statsReveal.visible, "%");
  const s4 = useCountUp(50, 1600, statsReveal.visible, "M+");

  // 🔍 Filter results logic based on typed text
  const filtered = SPECIALTIES.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  // 🗂️ Dropdown Suggestion List: Sirf wahi options jo actual query text se START ho rahe hon
  const dropdownSuggestions = SPECIALTIES.filter(s =>
    s.title.toLowerCase().startsWith(search.toLowerCase()) && search.trim() !== ""
  );

  // Close dropdown if clicked anywhere outside the search container
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ background: "#F5F0E8", overflowX: "hidden" }}>

        {/* ── 1. HERO WITH SEARCH DROP-DOWN ── */}
        <section 
          style={{ 
            position: "relative",
            backgroundImage: `linear-gradient(180deg, rgba(245, 240, 232, 0.82) 0%, #F5F0E8 100%), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "180px 16px 100px", 
            textAlign: "center"
          }}
        >
          <div ref={heroReveal.ref} style={{ maxWidth: 820, margin: "0 auto", position: "relative", zIndex: 10 }}>
            <div style={{ opacity: heroReveal.visible ? 1 : 0, transform: heroReveal.visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease" }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#111111", background: "#F5E6A3", letterSpacing: "1.5px", textTransform: "uppercase", padding: "6px 14px", borderRadius: 4, display: "inline-block", marginBottom: 20 }}>
                Medical Billing Specialties
              </span>
            </div>

            <h1 style={{ opacity: heroReveal.visible ? 1 : 0, transform: heroReveal.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.65s ease 0.1s", fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 950, color: "#111111", lineHeight: 1.1, letterSpacing: "-1.5px", textTransform: "uppercase", marginBottom: 24 }}>
              Billing expertise for<br />Every Medical Specialty
            </h1>

            <p style={{ opacity: heroReveal.visible ? 1 : 0, transform: heroReveal.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.65s ease 0.2s", fontSize: "clamp(15px, 2vw, 17px)", color: "#444444", lineHeight: 1.7, maxWidth: 660, margin: "0 auto 40px", fontWeight: 500 }}>
              Our certified billing professionals understand the unique payer rules, complex coding structures, and reimbursement configurations of each healthcare branch.
            </p>

            {/* Autocomplete Dropdown Search Wrapper */}
            <div 
              ref={searchContainerRef}
              style={{ opacity: heroReveal.visible ? 1 : 0, transform: heroReveal.visible ? "translateY(0)" : "translateY(20px)", transition: "all 0.65s ease 0.3s", maxWidth: 500, margin: "0 auto", position: "relative" }}
            >
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Type a letter (e.g., A, C, P)..."
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => {
                    setSearchFocused(true);
                    setShowDropdown(true);
                  }}
                  onBlur={() => setSearchFocused(false)}
                  style={{
                    width: "100%", padding: "16px 24px",
                    border: `1px solid ${searchFocused ? "#111111" : "rgba(17,17,17,0.15)"}`,
                    borderRadius: 12, fontSize: 15, outline: "none",
                    fontFamily: "inherit", background: "#fff",
                    color: "#111111", boxSizing: "border-box",
                    boxShadow: searchFocused ? "0 10px 30px rgba(17,17,17,0.08)" : "0 4px 20px rgba(17,17,17,0.02)",
                    transition: "all 0.3s ease",
                  }}
                />
                {search && (
                  <button onClick={() => { setSearch(""); setShowDropdown(false); }} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, color: "#999" }}>✕</button>
                )}
              </div>

              {/* 🛑 THE AUTOCOMPLETE OPTIONS DROPDOWN BOX */}
              {showDropdown && dropdownSuggestions.length > 0 && (
                <div 
                  style={{
                    position: "absolute",
                    top: "105%",
                    left: 0,
                    right: 0,
                    backgroundColor: "#ffffff",
                    borderRadius: 12,
                    border: "1px solid rgba(17,17,17,0.1)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                    maxHeight: 260,
                    overflowY: "auto",
                    zIndex: 999,
                    textAlign: "left",
                    padding: "8px 0"
                  }}
                >
                  {dropdownSuggestions.map((item) => (
                    <div
                      key={item.slug}
                      onClick={() => {
                        setSearch(item.title);
                        setShowDropdown(false);
                      }}
                      className="dropdown-item"
                      style={{
                        padding: "12px 20px",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#111111",
                        cursor: "pointer",
                        transition: "background 0.2s ease",
                        borderBottom: "1px solid rgba(17,17,17,0.03)"
                      }}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── 2. STATS BLOCK ── */}
        <section ref={statsReveal.ref} style={{ background: "#111111", padding: "60px 24px", position: "relative", zIndex: 1 }}>
          <div className="stats-responsive-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, textAlign: "center" }}>
            {[
              { val: s1, label: "Specialties Supported" },
              { val: s2, label: "Providers Served" },
              { val: s3, label: "Clean Claim Rate" },
              { val: `$${s4}`, label: "Revenue Recovered" },
            ].map((item, i) => (
              <div key={i} style={{ opacity: statsReveal.visible ? 1 : 0, transform: statsReveal.visible ? "translateY(0)" : "translateY(20px)", transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s` }}>
                <div style={{ color: "#fff", fontSize: 36, fontWeight: 900, letterSpacing: -1 }}>{item.val}</div>
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginTop: 8, letterSpacing: 1 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. MAIN SPECIALTIES CARDS GRID ── */}
        <section style={{ padding: "100px 16px", background: "#F5F0E8" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 70 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#111111", letterSpacing: "2px", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
                Domain Knowledge
              </span>
              <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 900, color: "#111111", textTransform: "uppercase", letterSpacing: "-1px", margin: 0 }}>
                {search ? "Matching Results" : "Specialties We Serve"}
              </h2>
            </div>

            {filtered.length > 0 ? (
              <div className="specialties-cards-layout" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
                {filtered.map((item, index) => (
                  <SpecialtyCard key={item.slug} item={item} index={index} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "60px 24px" }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#111111", marginBottom: 8, textTransform: "uppercase" }}>No results match your search</h3>
                <p style={{ fontSize: 14, color: "#666666", marginBottom: 24, fontWeight: 500 }}>Try altering your search keywords or contact our team directly.</p>
                <button onClick={() => setSearch("")} style={{ background: "#111111", color: "#fff", border: "none", padding: "12px 28px", borderRadius: 6, fontSize: 13, fontWeight: 700, textTransform: "uppercase", cursor: "pointer" }}>Clear input filter</button>
              </div>
            )}
          </div>
        </section>

        {/* ── 4. WHY TRUST US SECTION ── */}
        <section ref={whyReveal.ref} style={{ background: "#fff", padding: "100px 16px", borderTop: "1px solid rgba(17,17,17,0.05)" }}>
          <div style={{ maxWidth: 1050, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 64, opacity: whyReveal.visible ? 1 : 0, transform: whyReveal.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease" }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#111111", letterSpacing: "2px", textTransform: "uppercase", display: "block", marginBottom: 12 }}>
                Operational Pillars
              </span>
              <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "#111111", letterSpacing: "-1px", textTransform: "uppercase", margin: 0 }}>
                Why practices trust MedCare RCM
              </h2>
            </div>

            <div className="trust-blocks-layout" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {[
                { title: "Specialty-specific expertise", desc: "Our billers are trained directly in your specialty's unique payer rules and framework guidelines — zero generic shortcuts." },
                { title: "Certified billing professionals", desc: "CPC and CCS certified billing experts who systematically analyze the structural clinical context behind data submissions." },
                { title: "HIPAA-compliant always", desc: "Security matrices are actively structured into every single data transit channel and operational clearinghouse line." },
                { title: "Lower denial rates", desc: "Deep domain pre-scrubbing keeps baseline rejection ratios cleanly under the critical 5% operational benchmark." },
                { title: "Faster reimbursements", desc: "Optimized clearinghouse pathways and aggressive processing structures minimize outstanding balance aging loops." },
                { title: "Dedicated account manager", desc: "Direct, fluid communication line with an asset manager who knows your historic pipeline logs implicitly." },
              ].map((item, i) => (
                <div key={i} style={{
                  background: "#F5F0E8", border: "1px solid rgba(17,17,17,0.05)", borderRadius: 12, padding: "32px 24px",
                  opacity: whyReveal.visible ? 1 : 0, transform: whyReveal.visible ? "translateY(0)" : "translateY(20px)",
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.06}s`,
                }}>
                  <h4 style={{ fontSize: 16, fontWeight: 900, color: "#111111", marginBottom: 10, textTransform: "uppercase", letterSpacing: "-0.3px" }}>{item.title}</h4>
                  <p style={{ fontSize: 13.5, color: "#555555", lineHeight: 1.65, fontWeight: 500, margin: 0 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. CLOSING CTA BLOCK ── */}
        <section ref={ctaReveal.ref} style={{ background: "#111111", padding: "110px 16px", textAlign: "center", position: "relative" }}>
          <div style={{
            maxWidth: 700, margin: "0 auto",
            opacity: ctaReveal.visible ? 1 : 0, transform: ctaReveal.visible ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}>
            <div style={{ display: "inline-block", background: "#F5E6A3", borderRadius: 4, padding: "6px 14px", fontSize: 11, fontWeight: 800, color: "#111111", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 24 }}>
              Don't see your specialty?
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4.5vw, 44px)", fontWeight: 950, color: "#fff", letterSpacing: "-1px", marginBottom: 18, textTransform: "uppercase", lineHeight: 1.15 }}>
              We optimize cross-platform setups.<br />Let's coordinate blueprints.
            </h2>
            <p style={{ fontSize: 15, color: "#a0a0a0", lineHeight: 1.7, marginBottom: 40, maxWidth: 540, margin: "0 auto 40px", fontWeight: 500 }}>
              We deploy custom data pathways across multi-department clinics nationwide. Reach out for a specialized consultation tracking overview.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ background: "#ffffff", color: "#111111", padding: "16px 36px", borderRadius: 6, fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", textDecoration: "none" }}>
                Get a free audit →
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      {/* 📱 DROPDOWN HOVER EFFECT & SYSTEM RESPONSIVE MEDIA QUERIES */}
      <style jsx global>{`
        .dropdown-item:hover {
          background-color: rgba(17, 17, 17, 0.05) !important;
        }

        @media (max-width: 1024px) {
          .specialties-cards-layout {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
          .trust-blocks-layout {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 768px) {
          .stats-responsive-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
          }
          .specialties-cards-layout {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .trust-blocks-layout {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }

        @media (max-width: 480px) {
          .stats-responsive-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </>
  );
}