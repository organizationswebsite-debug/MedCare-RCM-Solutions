"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

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

function Reveal({ children, delay = 0, dir = "up" }) {
  const { ref, visible } = useReveal();
  const t = { up:"translateY(28px)", left:"translateX(-28px)", right:"translateX(28px)", scale:"scale(0.95)" };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : t[dir],
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ══ ALL TEAM MEMBERS DATA ══ */
const TEAM = {
  "moazzam-founder": {
    name: "Moazzam",
    role: "Founder & CEO",
    dept: "Administration",
    initials: "MZ",
    img: "/photo.png",
    heroImg: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=700&q=75&fit=crop",
    years: "5+ years at MedCare",
    location: "USA",
    email: "info@medcarercmsolutions.com",
    certifications: ["Healthcare Executive", "Business Administration", "Revenue Cycle Leadership"],
    expertise: ["Revenue Cycle Strategy", "Business Development", "Healthcare Operations", "Team Leadership", "Financial Planning", "Client Relations"],
    whoIAm: "I'm the founder of MedCare RCM Solutions and the Moaz Group of Companies. I launched MedCare after watching healthcare providers across the United States lose millions in legitimate revenue — not because they weren't working hard, but because the billing system was working against them. I built this company to change that.",
    whatWeDo: "At MedCare RCM, we manage the complete revenue cycle for healthcare providers — from charge capture and claim submission through denial management, A/R recovery, and patient billing. We handle every billing workflow so providers can focus entirely on patient care.",
    howWeHelp: [
      { icon:"🎯", title:"Strategic Revenue Oversight", desc:"I personally oversee every client relationship to ensure MedCare's billing strategies are aligned with each practice's financial goals and growth trajectory." },
      { icon:"🤝", title:"Partnership Development", desc:"Building long-term partnerships with healthcare providers across 40+ specialties — we're not a vendor, we're an extension of your team." },
      { icon:"📈", title:"Financial Growth Planning", desc:"Identifying revenue optimization opportunities that go beyond billing — payer contract analysis, fee schedule benchmarking, and growth planning." },
      { icon:"🔒", title:"Compliance Leadership", desc:"Setting the compliance standard for every process at MedCare — HIPAA, CMS guidelines, and payer-specific requirements built into everything we do." },
    ],
    achievements: [
      "Founded MedCare RCM Solutions under Moaz Group of Companies",
      "Scaled to 500+ active healthcare providers in under 5 years",
      "Led the recovery of $50M+ in revenue for MedCare clients",
      "Built a team of 9 certified billing and compliance specialists",
      "Expanded specialty coverage to 40+ clinical disciplines nationwide",
    ],
    stats: [{ val:"500+", label:"Providers Served" }, { val:"$50M+", label:"Revenue Recovered" }, { val:"98%", label:"Client Retention" }, { val:"40+", label:"Specialties" }],
    relatedSlugs: ["operations-lead", "compliance-officer", "ar-recovery-lead"],
  },
  "operations-lead": {
    name: "John Doe",
    role: "Head of Billing Operations",
    dept: "Operations",
    initials: "JD",
    img: "https://images.unsplash.com/photo-1713946598467-fcf9332c56ea?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fit=crop&crop=face",
    heroImg: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=75&fit=crop",
    years: "12+ years experience",
    location: "USA — Remote",
    email: "billing@medcarercmsolutions.com",
    certifications: ["CPC — Certified Professional Coder", "CPMA — Certified Professional Medical Auditor", "Multi-Specialty Billing Certification"],
    expertise: ["Medical Billing", "Claims Management", "Denial Management", "E&M Coding", "Modifier Compliance", "Payer Negotiations"],
    whoIAm: "I'm John Doe, Head of Billing Operations at MedCare RCM Solutions. With 12+ years of multi-specialty billing experience and CPC certification, I lead a team of billing specialists who maintain our 98%+ first-pass claim rate across every client portfolio we manage.",
    whatWeDo: "My team handles the entire billing lifecycle for MedCare's clients — charge entry review, coding accuracy checks, claim scrubbing, electronic submission, payment posting, and patient statement generation. Every claim that goes out under my team has been reviewed by a certified billing professional.",
    howWeHelp: [
      { icon:"✅", title:"98%+ First-Pass Claim Rate", desc:"We maintain one of the highest first-pass rates in the industry by combining automated scrubbing with human review for every claim before submission." },
      { icon:"🧾", title:"Specialty-Specific Coding", desc:"My team includes coders specialized in 20+ clinical disciplines — ensuring every claim is coded at its highest accurate level, not the safest one." },
      { icon:"⚡", title:"24-Hour Claim Submission", desc:"Every charge entered today is reviewed, scrubbed, and submitted electronically by the next morning — keeping AR days consistently low." },
      { icon:"📋", title:"Documentation Compliance", desc:"We work directly with clinical teams to ensure documentation supports the codes billed — preventing denials before they happen." },
    ],
    achievements: [
      "Maintained 98%+ first-pass claim rate across 500+ providers",
      "Reduced average client denial rate to under 4%",
      "Led coding training for 15+ junior billing specialists",
      "Specialized in 20+ medical specialties including complex multi-system cases",
      "Implemented same-day charge capture workflows saving clients $2M+ annually",
    ],
    stats: [{ val:"98%+", label:"First-Pass Rate" }, { val:"<4%", label:"Denial Rate" }, { val:"20+", label:"Specialties" }, { val:"12yr", label:"Experience" }],
    relatedSlugs: ["coding-specialist", "ar-recovery-lead", "patient-billing-lead"],
  },
  "compliance-officer": {
    name: "James Holloway",
    role: "HIPAA & Compliance Officer",
    dept: "Compliance",
    initials: "JH",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&fit=crop&crop=face",
    heroImg: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=700&q=75&fit=crop",
    years: "10+ years experience",
    location: "USA — Remote",
    email: "compliance@medcarercmsolutions.com",
    certifications: ["CHPC — Certified HIPAA Professional", "CHSS — Certified Healthcare Security Specialist", "CPC — Certified Professional Coder"],
    expertise: ["HIPAA Compliance", "Data Security", "Audit Management", "Regulatory Affairs", "Risk Assessment", "BAA Administration"],
    whoIAm: "I'm James Holloway, HIPAA & Compliance Officer at MedCare RCM Solutions. My role is simple: ensure that every process, every system, and every team member at MedCare operates at the highest possible standard of compliance and data security — without exception.",
    whatWeDo: "I manage all compliance frameworks at MedCare including HIPAA Privacy and Security Rules, CMS billing regulations, OIG compliance guidelines, and state-specific healthcare laws. I oversee BAA administration with every client, conduct internal audits, and lead annual compliance training for the entire team.",
    howWeHelp: [
      { icon:"🔒", title:"HIPAA Privacy & Security", desc:"End-to-end encryption, role-based access controls, and strict minimum-necessary standards for all patient data handling across MedCare's systems." },
      { icon:"📋", title:"Business Associate Agreements", desc:"Every MedCare client receives a signed BAA before work begins. I personally review and maintain every BAA in our client portfolio." },
      { icon:"🔍", title:"Internal Audit Program", desc:"Quarterly internal audits of billing practices, coding accuracy, and data security protocols — identifying issues before they become violations." },
      { icon:"⚖️", title:"Regulatory Monitoring", desc:"Continuous monitoring of HIPAA updates, CMS rule changes, and payer policy revisions — so your billing stays compliant as regulations evolve." },
    ],
    achievements: [
      "Zero HIPAA violations across 5 years of MedCare operations",
      "Implemented BAA framework for 500+ client relationships",
      "Conducted 20+ internal compliance audits with zero regulatory actions",
      "Developed annual HIPAA training program for all MedCare staff",
      "Led data security upgrade reducing vulnerability exposure by 90%",
    ],
    stats: [{ val:"0", label:"HIPAA Violations" }, { val:"500+", label:"BAAs Administered" }, { val:"100%", label:"Audit Pass Rate" }, { val:"10yr", label:"Experience" }],
    relatedSlugs: ["moazzam-founder", "technology-lead", "operations-lead"],
  },
  "ar-recovery-lead": {
    name: "Filip Carter",
    role: "A/R Recovery Lead",
    dept: "Revenue Recovery",
    initials: "FC",
    img: "https://images.unsplash.com/photo-1733348137468-90b917d2ebf1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D&fit=crop&crop=face",
    heroImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=75&fit=crop",
    years: "9+ years experience",
    location: "USA — Remote",
    email: "recovery@medcarercmsolutions.com",
    certifications: ["CPC — Certified Professional Coder", "CPRC — Certified Patient Revenue Cycle Specialist", "Denial Management Certification"],
    expertise: ["Denial Appeals", "AR Recovery", "Payer Negotiation", "Collections Strategy", "Root Cause Analysis", "Timely Filing"],
    whoIAm: "I'm Filip Carter, and I lead MedCare's denial management and A/R recovery division. I have a simple philosophy: no denial gets written off until we've exhausted every legitimate recovery path. That mindset has driven a 70%+ first-level appeal success rate and $15M+ in recovered revenue.",
    whatWeDo: "My team works every denial within 24 hours of receipt — analyzing root causes, correcting underlying issues, writing targeted appeals with supporting documentation, and tracking outcomes. We also manage aging A/R recovery for claims beyond 60 days through payer follow-up, escalation, and direct negotiation.",
    howWeHelp: [
      { icon:"🚫", title:"48-Hour Appeal Turnaround", desc:"Every denial is reviewed, root-cause analyzed, corrected, and appealed with full clinical and coding documentation within 48 hours of posting." },
      { icon:"📊", title:"Denial Trend Analysis", desc:"Monthly denial dashboards identify systemic patterns — so the same denial stops recurring instead of being fixed one claim at a time." },
      { icon:"💰", title:"Aging A/R Recovery", desc:"Systematic pursuit of claims beyond 60 days — segmented by payer, age bucket, and denial reason code to maximize recovery likelihood." },
      { icon:"🤝", title:"Payer Escalation & Negotiation", desc:"Direct payer escalation for high-value claims and persistent underpayments — backed by documented appeal history and clinical rationale." },
    ],
    achievements: [
      "70%+ first-level appeal success rate across all payer types",
      "Recovered $15M+ in previously written-off client revenue",
      "Reduced average client denial rate from 12% to under 4%",
      "Built denial management playbook for 30+ payer-specific scenarios",
      "Trained and managed 5 junior denial management analysts",
    ],
    stats: [{ val:"70%+", label:"Appeal Success" }, { val:"$15M+", label:"Personally Recovered" }, { val:"<4%", label:"Client Denial Rate" }, { val:"9yr", label:"Experience" }],
    relatedSlugs: ["operations-lead", "analytics-lead", "coding-specialist"],
  },
  "credentialing-manager": {
    name: "Marcus Webb",
    role: "Credentialing Manager",
    dept: "Provider Services",
    initials: "MW",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80&fit=crop&crop=face",
    heroImg: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=75&fit=crop",
    years: "8+ years experience",
    location: "USA — Remote",
    email: "credentialing@medcarercmsolutions.com",
    certifications: ["CPCS — Certified Provider Credentialing Specialist", "NAMSS Credentialing Certification", "Medicare Enrollment Specialist"],
    expertise: ["Provider Enrollment", "CAQH Management", "Medicare Credentialing", "Payer Relations", "Re-credentialing", "Hospital Privileges"],
    whoIAm: "I'm Marcus Webb, and I manage provider credentialing and payer enrollment for MedCare RCM Solutions. Every day a provider isn't credentialed is revenue they'll never recover — my job is to make sure that never happens for our clients.",
    whatWeDo: "I manage the complete credentialing lifecycle for 500+ providers — from initial CAQH setup and application submission through approval, ongoing re-attestation, and re-credentialing. I simultaneously manage Medicare Part B, Managed Medicaid, CHIP, and commercial payer enrollments across all 50 states.",
    howWeHelp: [
      { icon:"🪪", title:"Complete Enrollment Management", desc:"CAQH profile setup, Medicare/Medicaid enrollment, and commercial payer applications all managed simultaneously to get providers billing faster." },
      { icon:"⏰", title:"Expiration Tracking & Renewals", desc:"Automated expiration tracking across all credentialing documents — licenses, DEA, board certifications — with proactive renewal management." },
      { icon:"📞", title:"Biweekly Payer Follow-Up", desc:"I follow up with every payer every two weeks — documenting every contact, tracking status, and escalating delays before they cost clients revenue." },
      { icon:"🏥", title:"Hospital Privilege Coordination", desc:"Coordination between hospital medical staff offices and payer enrollment to ensure both processes run in parallel — not sequentially." },
    ],
    achievements: [
      "Zero billing delays due to credentialing lapses across all 500+ providers",
      "Average payer approval achieved in 78 days — 25% faster than industry average",
      "Managed simultaneous enrollment with 30+ commercial payers",
      "Built re-credentialing tracking system preventing 200+ potential lapses",
      "Specialist in all 50-state Medicare enrollment workflows",
    ],
    stats: [{ val:"500+", label:"Providers Credentialed" }, { val:"78d", label:"Avg Approval Time" }, { val:"0", label:"Billing Lapses" }, { val:"30+", label:"Payer Networks" }],
    relatedSlugs: ["operations-lead", "moazzam-founder", "compliance-officer"],
  },
  "analytics-lead": {
    name: "Rachel Thompson",
    role: "Analytics & Reporting Lead",
    dept: "Data & Analytics",
    initials: "RT",
    img: "https://plus.unsplash.com/premium_photo-1682430145886-39c8decd85fa?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&fit=crop&crop=face",
    heroImg: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=700&q=75&fit=crop",
    years: "7+ years experience",
    location: "USA — Remote",
    email: "analytics@medcarercmsolutions.com",
    certifications: ["Healthcare Business Intelligence Certification", "Revenue Cycle Analytics Specialist", "CPC — Certified Professional Coder"],
    expertise: ["Revenue Analytics", "KPI Reporting", "Data Visualization", "Business Intelligence", "Trend Analysis", "Executive Reporting"],
    whoIAm: "I'm Rachel Thompson, and I lead analytics and reporting at MedCare RCM Solutions. My job is to turn complex billing data into clear, actionable insights — so every client always knows exactly how their revenue cycle is performing and what to improve next.",
    whatWeDo: "I design, build, and maintain MedCare's live KPI dashboards and monthly executive reporting packages. Every client receives access to a real-time dashboard from day one, and a full plain-language performance report on the first business day of every month.",
    howWeHelp: [
      { icon:"📊", title:"Live KPI Dashboards", desc:"Real-time dashboards showing clean claim rate, AR days, denial trends, payer performance, and collections — updated continuously, not at month-end." },
      { icon:"📝", title:"Monthly Executive Reports", desc:"Plain-language monthly summaries explaining exactly what happened, why, and what specific actions we're taking to improve — no jargon." },
      { icon:"🔍", title:"Payer Performance Benchmarking", desc:"Identifying which payers are paying slowest, denying most frequently, and which are underpaying — backed by data and payer contract terms." },
      { icon:"📈", title:"Trend Analysis & Forecasting", desc:"Using 6-month rolling data to identify denial patterns, coding trends, and seasonal revenue shifts before they impact collections." },
    ],
    achievements: [
      "Built live KPI dashboard deployed across 500+ client practices",
      "Designed monthly reporting framework used by every MedCare client",
      "Identified $8M+ in additional revenue through payer contract analysis",
      "Created denial trend reporting that reduced repeat denials by 65%",
      "Developed 50+ custom KPI reports for multi-specialty client groups",
    ],
    stats: [{ val:"50+", label:"KPIs Tracked" }, { val:"$8M+", label:"Revenue via Analytics" }, { val:"500+", label:"Dashboards Built" }, { val:"7yr", label:"Experience" }],
    relatedSlugs: ["ar-recovery-lead", "operations-lead", "technology-lead"],
  },
  "coding-specialist": {
    name: "Kevin Park",
    role: "Senior Coding Specialist",
    dept: "Operations",
    initials: "KP",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80&fit=crop&crop=face",
    heroImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=75&fit=crop",
    years: "11+ years experience",
    location: "USA — Remote",
    email: "coding@medcarercmsolutions.com",
    certifications: ["CCS — Certified Coding Specialist", "CPC — Certified Professional Coder", "Inpatient Coding Certification"],
    expertise: ["ICD-10 Coding", "CPT Compliance", "Specialty Coding", "Audit Defense", "E&M Optimization", "HCC Coding"],
    whoIAm: "I'm Kevin Park, Senior Coding Specialist at MedCare RCM Solutions. With CCS certification and 11+ years across 20+ specialties, I ensure every claim is coded at its highest accurate level — not the safest or easiest level.",
    whatWeDo: "I review and assign ICD-10, CPT, and HCPCS codes for every specialty we serve, with a focus on documentation-supported coding that maximizes legitimate reimbursement. I also lead coding audits, provide documentation feedback to clinical teams, and develop coding guidelines for new specialty onboardings.",
    howWeHelp: [
      { icon:"🧾", title:"Highest-Specificity ICD-10 Coding", desc:"Coding to the highest level of specificity supported by documentation — eliminating the revenue loss caused by unspecified code defaults." },
      { icon:"⚕️", title:"E&M Level Optimization", desc:"Reviewing documentation to ensure E&M complexity is coded correctly — recovering revenue lost to under-coding without creating audit risk." },
      { icon:"🔬", title:"HCC & Risk Adjustment Coding", desc:"Identifying and documenting chronic conditions that support HCC coding under Medicare Advantage plans — capturing risk adjustment revenue." },
      { icon:"📋", title:"Pre-Submission Coding Audits", desc:"Reviewing high-risk claims before submission to catch coding errors that would trigger denials or compliance flags." },
    ],
    achievements: [
      "Achieved 99.2% coding accuracy rate across all specialties",
      "Recovered $6M+ through E&M level corrections and HCC coding",
      "Developed coding guides for 20+ clinical specialties",
      "Led 50+ internal coding audits with zero adverse findings",
      "Reduced coding-related denials by 78% for new client onboardings",
    ],
    stats: [{ val:"99.2%", label:"Coding Accuracy" }, { val:"$6M+", label:"Recovered via Coding" }, { val:"20+", label:"Specialties" }, { val:"11yr", label:"Experience" }],
    relatedSlugs: ["operations-lead", "ar-recovery-lead", "compliance-officer"],
  },
  "patient-billing-lead": {
    name: "Tony Armstrong",
    role: "Patient Billing Manager",
    dept: "Operations",
    initials: "TA",
    img: "https://plus.unsplash.com/premium_photo-1663099872661-27f7136d558d?w=600&q=80&fit=crop&crop=face",
    heroImg: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=700&q=75&fit=crop",
    years: "8+ years experience",
    location: "USA — Remote",
    email: "patientbilling@medcarercmsolutions.com",
    certifications: ["CPRC — Certified Patient Revenue Cycle Specialist", "Healthcare Customer Service Certification", "CPC — Certified Professional Coder"],
    expertise: ["Patient Collections", "Payment Portals", "Statement Generation", "Balance Resolution", "Payment Plans", "Self-Pay Billing"],
    whoIAm: "I'm Tony Armstrong, Patient Billing Manager at MedCare RCM Solutions. I believe patient billing should be the most human part of healthcare finance — clear, honest, compassionate, and structured to make paying as easy as possible.",
    whatWeDo: "My team generates and delivers patient statements within 5 days of claim adjudication, manages online payment portal operations, administers payment plans, and conducts compassionate follow-up sequences for outstanding balances. We improve patient collections by 25–30% for every practice we serve.",
    howWeHelp: [
      { icon:"📄", title:"5-Day Statement Generation", desc:"Clear, itemized patient statements mailed and emailed within 5 days of payer adjudication — not at month-end when patients have forgotten the visit." },
      { icon:"💳", title:"Online Payment Portal", desc:"24/7 payment portal accepting all major cards, HSA/FSA, ACH, Apple Pay, and Google Pay — making it effortless for patients to pay their balance." },
      { icon:"🤝", title:"Compassionate Follow-Up", desc:"Scripted follow-up sequences that inform and assist — never threaten. Patients pay more when they feel respected throughout the process." },
      { icon:"📅", title:"Proactive Payment Plans", desc:"Offering payment plans for balances over $200 before patients ask — reducing write-offs and improving full-balance recovery rates." },
    ],
    achievements: [
      "Improved patient collection rate from 62% to 89% for average client",
      "Implemented payment portals generating $3M+ in additional collections",
      "Reduced time-to-payment from 45 days to 18 days on average",
      "Built compassionate follow-up framework adopted by all MedCare clients",
      "Managed patient billing for practices with 5,000+ patient encounters monthly",
    ],
    stats: [{ val:"89%", label:"Collection Rate" }, { val:"$3M+", label:"Portal Collections" }, { val:"18d", label:"Avg Time-to-Pay" }, { val:"8yr", label:"Experience" }],
    relatedSlugs: ["operations-lead", "ar-recovery-lead", "analytics-lead"],
  },
  "technology-lead": {
    name: "Thomas Nguyen",
    role: "Technology & Systems Lead",
    dept: "Data & Analytics",
    initials: "TN",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80&fit=crop&crop=face",
    heroImg: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&q=75&fit=crop",
    years: "9+ years experience",
    location: "USA — Remote",
    email: "tech@medcarercmsolutions.com",
    certifications: ["Healthcare IT Security Certification", "EHR Integration Specialist", "HIPAA Security Rule Certification"],
    expertise: ["EHR Integration", "Clearinghouse Systems", "RCM Technology", "Data Security", "API Development", "System Architecture"],
    whoIAm: "I'm Thomas Nguyen, Technology & Systems Lead at MedCare RCM Solutions. I manage the entire technology infrastructure that makes MedCare's billing operations possible — from EHR integrations and clearinghouse connections to our live KPI dashboard and data security systems.",
    whatWeDo: "I oversee MedCare's EHR and practice management system integrations, clearinghouse partnerships, claims submission technology, patient payment portal infrastructure, and all data security systems. I ensure every connection is HIPAA-compliant, reliable, and optimized for speed.",
    howWeHelp: [
      { icon:"🔗", title:"EHR & PM System Integrations", desc:"Seamless integration with 40+ major EHR and practice management systems — Epic, eClinicalWorks, Athena, Kareo, and more — with zero workflow disruption." },
      { icon:"⚡", title:"Real-Time Clearinghouse Processing", desc:"Direct connections to major clearinghouses enabling same-day electronic claim submission with real-time eligibility verification and claim status tracking." },
      { icon:"🛡️", title:"HIPAA-Compliant Infrastructure", desc:"End-to-end encryption, role-based access controls, encrypted data transmission, and HIPAA-compliant cloud infrastructure for all patient data." },
      { icon:"📊", title:"Live Dashboard Technology", desc:"The technology behind MedCare's real-time KPI dashboards — built for speed, accuracy, and accessibility across all devices for every client." },
    ],
    achievements: [
      "Integrated MedCare's systems with 40+ EHR and PM platforms",
      "Built real-time KPI dashboard infrastructure serving 500+ clients",
      "Reduced claim submission processing time by 70% through automation",
      "Achieved zero data breaches across all systems since founding",
      "Implemented AI-assisted claim scrubbing increasing first-pass rate to 98%+",
    ],
    stats: [{ val:"40+", label:"EHR Integrations" }, { val:"0", label:"Data Breaches" }, { val:"70%", label:"Processing Speed Gain" }, { val:"9yr", label:"Experience" }],
    relatedSlugs: ["analytics-lead", "compliance-officer", "moazzam-founder"],
  },
};

const ALL_SLUGS = Object.keys(TEAM);

export default function TeamMemberPage() {
  const { member } = useParams();
  const router = useRouter();
  const data = TEAM[member];
  const [mounted, setMounted] = useState(false);
  const [openTag, setOpenTag] = useState(null);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  if (!data) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight:"80vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#F5F0E8", padding:"120px 24px" }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:64, marginBottom:16 }}>👤</div>
            <h1 style={{ fontSize:28, fontWeight:800, color:"#111111", marginBottom:12 }}>Team member not found</h1>
            <button onClick={()=>router.push("/about/team")} style={{ background:"#111111", color:"#fff", border:"none", padding:"13px 28px", borderRadius:100, fontSize:15, fontWeight:700, cursor:"pointer" }}>
              ← Back to Team
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const rise = (d=0) => ({
    opacity: mounted?1:0,
    transform: mounted?"translateY(0)":"translateY(24px)",
    transition:`opacity 0.7s ease ${d}s, transform 0.7s ease ${d}s`,
  });

  const relatedData = (data.relatedSlugs||[]).map(s=>TEAM[s]?{slug:s,...TEAM[s]}:null).filter(Boolean);
  const quoteText = data.whoIAm.split(".")[0] + ".";

  return (
    <>
      <Navbar />
      <main>

        {/* ══ HERO — split: photo left, bio right (JarveX style) ══ */}
        <section style={{ background:"#F5F0E8", paddingTop:110, paddingBottom:80 }}>
          <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 24px" }}>

            {/* Back link */}
            <div style={{ ...rise(0), marginBottom:32 }}>
              <button onClick={()=>router.push("/about/team")} style={{ display:"inline-flex", alignItems:"center", gap:8, background:"none", border:"none", cursor:"pointer", fontSize:13.5, fontWeight:700, color:"#666666", padding:0 }}
                onMouseEnter={e=>e.currentTarget.style.color="#111111"}
                onMouseLeave={e=>e.currentTarget.style.color="#666666"}>
                ← All Team Members
              </button>
            </div>

            <div className="member-hero-grid" style={{ display:"grid", gridTemplateColumns:"0.85fr 1.15fr", gap:56, alignItems:"start" }}>

              {/* LEFT — photo card */}
              <div style={{ ...rise(0.08), position:"sticky", top:110 }} className="member-photo-col">
                <div style={{ position:"relative", borderRadius:28, overflow:"hidden", boxShadow:"0 20px 60px rgba(17,17,17,0.12)" }}>
                  <img src={data.img} alt={data.name} loading="lazy"
                    style={{ width:"100%", height:460, objectFit:"cover", display:"block" }} />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(17,17,17,0.55) 0%,transparent 40%)" }} />
                  <div style={{ position:"absolute", bottom:20, left:20, right:20 }}>
                    <div style={{ display:"inline-flex", alignItems:"center", gap:7, background:"rgba(255,255,255,0.15)", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.25)", borderRadius:100, padding:"7px 14px" }}>
                      <span style={{ width:6, height:6, borderRadius:"50%", background:"#F5E6A3" }} />
                      <span style={{ fontSize:11.5, fontWeight:700, color:"#fff" }}>On the team · {data.years}</span>
                    </div>
                  </div>
                </div>

                {/* Quick stats under photo */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:16 }}>
                  {data.stats.slice(0,4).map((s,i)=>(
                    <div key={i} style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.08)", borderRadius:14, padding:"14px 16px" }}>
                      <div style={{ fontSize:19, fontWeight:800, color:"#111111" }}>{s.val}</div>
                      <div style={{ fontSize:10.5, color:"#999999", fontWeight:600, textTransform:"uppercase", letterSpacing:0.5, marginTop:2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — bio content */}
              <div>
                <div style={{ ...rise(0.14), display:"inline-block", background:"#F5E6A3", borderRadius:100, padding:"5px 14px", fontSize:11, fontWeight:700, color:"#111111", marginBottom:16 }}>
                  {data.dept}
                </div>
                <h1 style={{ ...rise(0.2), fontSize:"clamp(34px,5.5vw,58px)", fontWeight:800, color:"#111111", letterSpacing:-1.5, lineHeight:1.05, marginBottom:8 }}>
                  {data.name}
                </h1>
                <p style={{ ...rise(0.26), fontSize:17, color:"#666666", fontWeight:500, marginBottom:24 }}>{data.role}</p>

                {/* Expertise tag pills */}
                <div style={{ ...rise(0.32), display:"flex", flexWrap:"wrap", gap:8, marginBottom:32 }}>
                  {data.expertise.slice(0,3).map((e,i)=>(
                    <span key={i} style={{ fontSize:12.5, fontWeight:600, color:"#111111", background:"#fff", border:"1px solid rgba(17,17,17,0.1)", borderRadius:100, padding:"7px 15px" }}>{e}</span>
                  ))}
                </div>

                {/* Pull quote */}
                <div style={{ ...rise(0.38), borderLeft:"3px solid #F5E6A3", paddingLeft:24, marginBottom:32 }}>
                  <p style={{ fontSize:19, fontStyle:"italic", color:"#111111", lineHeight:1.6, fontWeight:600 }}>&ldquo;{quoteText}&rdquo;</p>
                </div>

                {/* Narrative bio paragraphs */}
                <div style={{ ...rise(0.44), display:"flex", flexDirection:"column", gap:18, marginBottom:36 }}>
                  <p style={{ fontSize:15.5, color:"#444444", lineHeight:1.9 }}>{data.whoIAm}</p>
                  <p style={{ fontSize:15.5, color:"#444444", lineHeight:1.9 }}>{data.whatWeDo}</p>
                </div>

                <div style={{ ...rise(0.5) }}>
                  <Link href="/contact" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#111111", color:"#fff", padding:"15px 30px", borderRadius:100, fontSize:14.5, fontWeight:700, transition:"transform 0.2s" }}
                    onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
                    onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
                    Talk To The Team →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ HOW THEY HELP ══ */}
        <section style={{ background:"#fff", padding:"80px 24px" }}>
          <div style={{ maxWidth:900, margin:"0 auto" }}>
            <Reveal>
              <div style={{ textAlign:"center", marginBottom:48 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:14 }}>
                  <div style={{ width:26, height:2, background:"#111111", borderRadius:2 }} />
                  <span style={{ fontSize:11, fontWeight:700, color:"#666666", letterSpacing:2, textTransform:"uppercase" }}>How I Help</span>
                </div>
                <h2 style={{ fontSize:"clamp(24px,3.5vw,38px)", fontWeight:800, color:"#111111", letterSpacing:-1 }}>What I bring to the team</h2>
              </div>
            </Reveal>
            <div className="help-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              {data.howWeHelp.map((h,i)=>(
                <Reveal key={i} delay={i*0.07}>
                  <div style={{ background:"#F5F0E8", border:"1px solid rgba(17,17,17,0.06)", borderRadius:20, padding:"26px", height:"100%", transition:"all 0.3s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 16px 40px rgba(17,17,17,0.08)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"; }}>
                    <div style={{ width:44, height:44, borderRadius:14, background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, marginBottom:16 }}>{h.icon}</div>
                    <h3 style={{ fontSize:15.5, fontWeight:800, color:"#111111", marginBottom:8 }}>{h.title}</h3>
                    <p style={{ fontSize:13.5, color:"#555555", lineHeight:1.75 }}>{h.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CAREER HIGHLIGHTS — vertical timeline, JarveX style ══ */}
        <section style={{ background:"#F5F0E8", padding:"90px 24px" }}>
          <div style={{ maxWidth:720, margin:"0 auto" }}>
            <Reveal>
              <div style={{ textAlign:"center", marginBottom:52 }}>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:14 }}>
                  <div style={{ width:26, height:2, background:"#111111", borderRadius:2 }} />
                  <span style={{ fontSize:11, fontWeight:700, color:"#666666", letterSpacing:2, textTransform:"uppercase" }}>Career Highlights</span>
                </div>
                <h2 style={{ fontSize:"clamp(24px,3.5vw,38px)", fontWeight:800, color:"#111111", letterSpacing:-1 }}>Milestones & achievements</h2>
              </div>
            </Reveal>
            <div style={{ position:"relative" }}>
              <div style={{ position:"absolute", left:19, top:6, bottom:6, width:2, background:"rgba(17,17,17,0.1)" }} />
              {data.achievements.map((a,i)=>(
                <Reveal key={i} delay={i*0.08}>
                  <div style={{ display:"flex", gap:20, marginBottom: i<data.achievements.length-1 ? 28 : 0, position:"relative" }}>
                    <div style={{ width:40, height:40, borderRadius:"50%", background:"#111111", color:"#F5E6A3", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800, flexShrink:0, zIndex:2, boxShadow:"0 6px 18px rgba(17,17,17,0.2)" }}>
                      {i+1}
                    </div>
                    <div style={{ background:"#fff", border:"1px solid rgba(17,17,17,0.07)", borderRadius:16, padding:"18px 22px", flex:1, boxShadow:"0 4px 16px rgba(17,17,17,0.04)" }}>
                      <p style={{ fontSize:14, color:"#333333", lineHeight:1.7, fontWeight:500 }}>{a}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CERTIFICATIONS + FULL EXPERTISE ══ */}
        <section style={{ background:"#fff", padding:"80px 24px" }}>
          <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }} className="cert-grid">
            <Reveal dir="left">
              <div style={{ background:"#111111", borderRadius:22, padding:"30px" }}>
                <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.4)", letterSpacing:2, textTransform:"uppercase", marginBottom:16 }}>Certifications</div>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  {data.certifications.map((c,i)=>(
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:20, height:20, borderRadius:"50%", background:"#F5E6A3", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <span style={{ fontSize:10, fontWeight:800, color:"#111111" }}>✓</span>
                      </div>
                      <span style={{ fontSize:13.5, color:"rgba(255,255,255,0.8)", fontWeight:500 }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal dir="right" delay={0.08}>
              <div style={{ background:"#F5F0E8", borderRadius:22, padding:"30px" }}>
                <div style={{ fontSize:11, fontWeight:700, color:"#666666", letterSpacing:2, textTransform:"uppercase", marginBottom:16 }}>Areas of Expertise</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {data.expertise.map((e,i)=>(
                    <span key={i} style={{ fontSize:12.5, fontWeight:600, color:"#111111", background:"#fff", border:"1px solid rgba(17,17,17,0.1)", borderRadius:100, padding:"8px 15px" }}>{e}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ══ MORE FROM THE TEAM ══ */}
        {relatedData.length > 0 && (
          <section style={{ background:"#F5F0E8", padding:"90px 24px" }}>
            <div style={{ maxWidth:1000, margin:"0 auto" }}>
              <Reveal>
                <div style={{ textAlign:"center", marginBottom:44 }}>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:14 }}>
                    <div style={{ width:26, height:2, background:"#111111", borderRadius:2 }} />
                    <span style={{ fontSize:11, fontWeight:700, color:"#666666", letterSpacing:2, textTransform:"uppercase" }}>Meet The Team</span>
                  </div>
                  <h2 style={{ fontSize:"clamp(24px,3.5vw,38px)", fontWeight:800, color:"#111111", letterSpacing:-1 }}>More from the team</h2>
                </div>
              </Reveal>
              <div className="related-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
                {relatedData.map((m,i)=>(
                  <Reveal key={m.slug} delay={i*0.08}>
                    <Link href={`/about/team/${m.slug}`} style={{ display:"block", background:"#fff", borderRadius:22, overflow:"hidden", boxShadow:"0 4px 20px rgba(17,17,17,0.05)", textDecoration:"none", transition:"all 0.3s" }}
                      onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-6px)"; e.currentTarget.style.boxShadow="0 20px 48px rgba(17,17,17,0.1)"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 20px rgba(17,17,17,0.05)"; }}>
                      <img src={m.img} alt={m.name} loading="lazy" style={{ width:"100%", height:220, objectFit:"cover" }} />
                      <div style={{ padding:"18px 20px" }}>
                        <div style={{ fontSize:10.5, fontWeight:700, color:"#999999", textTransform:"uppercase", letterSpacing:1, marginBottom:6 }}>{m.dept}</div>
                        <h4 style={{ fontSize:16, fontWeight:800, color:"#111111", marginBottom:3 }}>{m.name}</h4>
                        <p style={{ fontSize:12.5, color:"#666666" }}>{m.role}</p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ══ LUXURIOUS CTA ══ */}
        <section style={{ background:"#111111", padding:"110px 24px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-100, right:-80, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(245,230,163,0.1),transparent 65%)", pointerEvents:"none" }} />
          <Reveal dir="scale">
            <div style={{ maxWidth:600, margin:"0 auto", textAlign:"center", position:"relative", zIndex:2 }}>
              <h2 style={{ fontSize:"clamp(28px,4.5vw,48px)", fontWeight:800, color:"#fff", letterSpacing:-1.5, lineHeight:1.1, marginBottom:20 }}>
                Want to work with {data.name.split(" ")[0]}?
              </h2>
              <p style={{ fontSize:15, color:"rgba(255,255,255,0.5)", marginBottom:32 }}>
                Let's talk about how MedCare RCM can recover more revenue for your practice.
              </p>
              <Link href="/contact" style={{ display:"inline-flex", alignItems:"center", gap:10, background:"#F5E6A3", color:"#111111", padding:"17px 32px", borderRadius:100, fontSize:14.5, fontWeight:800, boxShadow:"0 10px 30px rgba(245,230,163,0.25)" }}>
                Get In Touch →
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .member-hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .member-photo-col { position: static !important; }
          .help-grid { grid-template-columns: 1fr !important; }
          .cert-grid { grid-template-columns: 1fr !important; }
          .related-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}