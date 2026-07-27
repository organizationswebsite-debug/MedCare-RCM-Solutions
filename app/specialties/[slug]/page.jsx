"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

/* ── Scroll reveal ── */
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

/* ── Reading progress bar ── */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position: "fixed", top: 67, left: 0, right: 0, height: 3, background: "rgba(17,17,17,0.08)", zIndex: 200 }}>
      <div style={{ height: "100%", background: "#111111", width: `${progress}%`, transition: "width 0.1s linear", borderRadius: "0 2px 2px 0" }} />
    </div>
  );
}

/* ── Animated section ── */
function Reveal({ children, delay = 0, direction = "up" }) {
  const { ref, visible } = useReveal();
  const transforms = {
    up: "translateY(28px)", left: "translateX(-28px)",
    right: "translateX(28px)", scale: "scale(0.96)",
  };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[direction],
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════
   FULL SPECIALTY DATABASE
══════════════════════════════════════ */
const SPECIALTIES = {
  "family-medicine": {
    title: "Family Medicine Billing",
    tagline: "Full-cycle RCM for multi-generational primary care practices",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1400&q=85&fit=crop",
    overview: "Family medicine is the backbone of American healthcare — and one of the most billing-intensive specialties in medicine. High patient volumes, diverse encounter types, and complex preventive care coding make revenue leakage a constant risk. MedCare RCM delivers end-to-end billing support that keeps your clean claim rate above 98% and your AR days under 30.",
    keyPoints: [
      "Modifier 25 validation for same-day preventive and acute encounters",
      "Chronic Care Management (CCM) billing — 20+ min monthly tracking",
      "Annual Wellness Visit (AWV) and IPPE coding compliance",
      "High-volume immunization administration sequencing",
      "Risk adjustment and HCC documentation optimization",
    ],
    cptCodes: [
      { code: "99213 / 99214", description: "Established patient outpatient E&M — Level 3 & 4", reimbursement: "$110–$180" },
      { code: "99391–99397", description: "Preventive medicine evaluations by age tier", reimbursement: "$160–$250" },
      { code: "90471 / 90472", description: "Immunization administration — single or multiple injections", reimbursement: "$25–$45" },
      { code: "99490", description: "Chronic Care Management — minimum 20 mins/month", reimbursement: "$62–$105" },
      { code: "G0439", description: "Subsequent Annual Wellness Visit (AWV)", reimbursement: "$115–$175" },
    ],
    howWeServe: "Our family medicine billing engine deploys real-time pre-submission scrubbers that automatically validate Modifier 25 pairings when preventive and acute care occur in the same visit. We track CCM documentation logs monthly and alert your team before time thresholds lapse. Our HCC risk-adjustment tools capture chronic conditions that would otherwise go uncoded — directly protecting your value-based care contracts.",
    stats: [{ val: "98%+", label: "First-pass rate" }, { val: "<30", label: "Average AR days" }, { val: "65%", label: "Denial reduction" }, { val: "24h", label: "Claim submission" }],
  },
  "internal-medicine": {
    title: "Internal Medicine Billing",
    tagline: "Complex multi-system billing for adult medicine specialists",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=85&fit=crop",
    overview: "Internal medicine billing is among the most cognitively complex in outpatient medicine. Overlapping chronic conditions, transitional care management, and remote monitoring services require precision coding and proactive follow-up. MedCare RCM ensures every encounter is fully documented and billed at the correct complexity level.",
    keyPoints: [
      "High-complexity E&M (99215) documentation and coding support",
      "Transitional Care Management (TCM) — 7 and 14-day post-discharge billing",
      "Remote Patient Monitoring (RPM) — physiologic data transmission tracking",
      "HCC risk adjustment coding for value-based care contracts",
      "Multi-payer contract optimization for commercial and Medicare plans",
    ],
    cptCodes: [
      { code: "99215", description: "High-complexity outpatient office visit", reimbursement: "$200–$290" },
      { code: "99495 / 99496", description: "Transitional Care Management — 14 and 7-day post-discharge", reimbursement: "$165–$235" },
      { code: "99457 / 99458", description: "Remote Patient Monitoring — 20-min monthly interactive review", reimbursement: "$50–$120" },
      { code: "99204 / 99205", description: "New patient comprehensive evaluation and management", reimbursement: "$175–$260" },
      { code: "99354", description: "Prolonged outpatient services beyond standard time", reimbursement: "$130–$200" },
    ],
    howWeServe: "We map complex diagnostic pathways against HCC risk categories to ensure chronic conditions are coded at their highest documented severity. Our billing team cross-references every therapeutic or diagnostic injection with prior authorization clearinghouses — preventing retroactive denials. RPM billing is automated against documented time thresholds, so no monitoring revenue is lost between monthly billing cycles.",
    stats: [{ val: "98%+", label: "First-pass rate" }, { val: "<30", label: "Average AR days" }, { val: "40%", label: "RPM revenue captured" }, { val: "24h", label: "Claim submission" }],
  },
  "pediatrics": {
    title: "Pediatrics Billing",
    tagline: "Age-specific billing for well-child visits, vaccines, and developmental care",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1400&q=85&fit=crop",
    overview: "Pediatric billing requires navigating Medicaid-specific rules, EPSDT mandates, and complex immunization sequencing — all while managing high patient volumes. MedCare RCM protects your pediatric revenue cycle by ensuring age-specific code groupings, vaccine documentation, and developmental screening claims are always accurate.",
    keyPoints: [
      "EPSDT compliance and state-specific Medicaid billing expertise",
      "Well-child visit coding matched to exact age tier requirements",
      "Vaccine CVX product code verification before claim submission",
      "Modifier 25 validation for acute-care add-ons during wellness visits",
      "Developmental screening (96110) documentation and billing",
    ],
    cptCodes: [
      { code: "99381–99384", description: "New patient well-child preventive evaluations by age tier", reimbursement: "$145–$220" },
      { code: "96110", description: "Developmental screening with formal scoring and documentation", reimbursement: "$25–$45" },
      { code: "90460 / 90461", description: "Pediatric vaccine administration with counseling", reimbursement: "$25–$45/dose" },
      { code: "99213-25", description: "Acute care E&M with Modifier 25 during wellness visit", reimbursement: "$90–$150" },
      { code: "99391–99392", description: "Established patient preventive evaluations — infant through age 11", reimbursement: "$120–$190" },
    ],
    howWeServe: "We verify age-specific CPT code groupings and exact vaccine product codes (CVX) before submission to ensure early screening evaluations don't trigger automatic payer cross-reductions. Our team reconciles vaccine inventory logs against insurance remittance data to flag underpaid or mismatched biological units. We handle complex Medicaid EPSDT requirements and alert your team to any state-specific policy changes that affect reimbursement.",
    stats: [{ val: "98%+", label: "First-pass rate" }, { val: "EPSDT", label: "Compliance maintained" }, { val: "100%", label: "Vaccine reconciliation" }, { val: "<30", label: "AR days" }],
  },
  "cardiology": {
    title: "Cardiology Billing",
    tagline: "Precision RCM for interventional, diagnostic, and electrophysiology services",
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=1400&q=85&fit=crop",
    overview: "Cardiology billing involves navigating complex global surgical packages, professional and technical component splits, and high-value interventional procedure coding. MedCare RCM manages every layer of your cardiovascular revenue cycle — from routine EKGs to complex catheterizations — ensuring maximum reimbursement on every claim.",
    keyPoints: [
      "Professional and technical component billing splits (Modifier 26 / TC)",
      "Global surgical package management for interventional procedures",
      "Multi-procedural modifier application (Modifier 59, XS, XU)",
      "Holter and ambulatory telemetry monitoring billing",
      "Prior authorization management for high-cost cardiac procedures",
    ],
    cptCodes: [
      { code: "93000", description: "Routine ECG — 12-lead with interpretation and report", reimbursement: "$25–$45" },
      { code: "93306", description: "Complete echocardiography with spectral and color Doppler", reimbursement: "$380–$520" },
      { code: "93452", description: "Left heart catheterization with imaging and pressure measurements", reimbursement: "$1,200–$2,100" },
      { code: "93224", description: "Holter monitor — 24-hour continuous recording with analysis", reimbursement: "$180–$280" },
      { code: "93017", description: "Cardiovascular stress test — tracing and monitoring only (TC)", reimbursement: "$120–$190" },
    ],
    howWeServe: "We isolate technical component codes from professional billing parameters based on Local Coverage Determinations (LCDs), preventing hospital-site claim write-offs. By tracking complex multi-procedural hierarchies and applying modifiers 59 and XS accurately, we bypass automated bundling flags — securing separate, lawful reimbursement for multiple cardiac interventions performed in the same session.",
    stats: [{ val: "98%+", label: "First-pass rate" }, { val: "0%", label: "Unbilled procedures" }, { val: "<30", label: "AR days" }, { val: "100%", label: "Auth compliance" }],
  },
  "orthopedics": {
    title: "Orthopedic Surgery Billing",
    tagline: "High-value surgical billing with precise global period and implant tracking",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1400&q=85&fit=crop",
    overview: "Orthopedic billing involves managing high-value surgical claims, complex global periods, DME coding, and frequent bundling denials. MedCare RCM keeps your revenue velocity high by managing the full surgical cycle — from pre-auth to post-op follow-up — with zero revenue leakage on implants, supplies, or secondary procedures.",
    keyPoints: [
      "Global surgical period management — separating related from unrelated visits",
      "Worker's compensation and personal injury split-payer billing",
      "Implant and supply cost documentation and recovery",
      "Fracture care bundle management and unbundling defense",
      "Arthroscopy and joint replacement coding accuracy",
    ],
    cptCodes: [
      { code: "29881", description: "Knee arthroscopy with meniscectomy and debridement", reimbursement: "$1,400–$2,200" },
      { code: "27130", description: "Total hip arthroplasty — acetabular and femoral components", reimbursement: "$2,800–$4,500" },
      { code: "20610", description: "Major joint aspiration or injection with ultrasound guidance", reimbursement: "$140–$220" },
      { code: "99024", description: "Post-operative follow-up — global period zero-charge visit", reimbursement: "$0 (global)" },
      { code: "22632", description: "Posterior spinal fusion — additional interspace (add-on)", reimbursement: "$1,800–$3,200" },
    ],
    howWeServe: "We separate global fracture surgical care packages cleanly from unrelated outpatient visits using precise documentation review. Our team handles complex worker's compensation and personal injury auto claims — managing the unique documentation rules and split-payer pipelines that standard billing systems consistently miss. Implant invoices are matched to claim submissions automatically, capturing every dollar spent on device-intensive procedures.",
    stats: [{ val: "98%+", label: "First-pass rate" }, { val: "100%", label: "Implant cost capture" }, { val: "<28", label: "AR days" }, { val: "0", label: "Global period errors" }],
  },
  "mental-health": {
    title: "Mental Health & Psychiatry Billing",
    tagline: "Time-indexed behavioral health billing with parity compliance and telehealth expertise",
    image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=1400&q=85&fit=crop",
    overview: "Mental health billing requires precise session-length documentation, telehealth code compliance, and proactive authorization tracking. MedCare RCM keeps your behavioral health revenue steady by managing parity laws, tracking authorization limits before they lapse, and ensuring every therapy session is billed at the correct time-based code.",
    keyPoints: [
      "Session-length documentation matching carrier medical necessity guidelines",
      "Telehealth billing — POS 10 / Modifier 95 compliance",
      "Authorization tracking and renewal alerts before sessions lapse",
      "Mental Health Parity and Addiction Equity Act (MHPAEA) compliance",
      "Group and family therapy code management alongside individual sessions",
    ],
    cptCodes: [
      { code: "90837", description: "Individual psychotherapy — 53+ minutes", reimbursement: "$160–$250" },
      { code: "90834", description: "Individual psychotherapy — 38 to 52 minutes", reimbursement: "$110–$175" },
      { code: "90791", description: "Psychiatric diagnostic evaluation", reimbursement: "$185–$275" },
      { code: "90833", description: "Psychotherapy add-on with E&M service", reimbursement: "$65–$110" },
      { code: "90853", description: "Group psychotherapy — per session", reimbursement: "$50–$85" },
    ],
    howWeServe: "We implement systematic session-length tracking that matches carrier medical necessity guidelines exactly, preventing retroactive audit sweeps based on timing discrepancies. Authorization limits are tracked automatically — your clinic receives alerts before care boundaries are crossed. For telehealth visits, we apply POS 10 and Modifier 95 correctly, ensuring parity with in-person reimbursement rates wherever required by law.",
    stats: [{ val: "98%+", label: "First-pass rate" }, { val: "100%", label: "Auth tracking" }, { val: "0%", label: "Telehealth denials" }, { val: "<30", label: "AR days" }],
  },
  "dermatology": {
    title: "Dermatology Billing",
    tagline: "High-volume lesion, biopsy, and Mohs surgery billing with medical necessity precision",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1400&q=85&fit=crop",
    overview: "Dermatology practices perform dozens of procedures daily — from biopsies and lesion destructions to complex Mohs micrographic surgery. Each requires precise lesion count tracking, anatomical site documentation, and clear separation between cosmetic and medical services. MedCare RCM keeps your high-volume dermatology billing clean and profitable.",
    keyPoints: [
      "Lesion count and anatomical site tracking for multi-lesion billing",
      "Cosmetic vs. medical procedure separation — preventing claim crossover",
      "Mohs surgery stage-by-stage coding (17311–17315)",
      "Pathology submission and split-billing tracking",
      "Skin biopsy method documentation — tangential, punch, or incisional",
    ],
    cptCodes: [
      { code: "17000 / 17003", description: "Destruction of premalignant lesions — first and additional", reimbursement: "$50–$130" },
      { code: "11102", description: "Tangential biopsy of skin — first lesion", reimbursement: "$140–$210" },
      { code: "17311", description: "Mohs micrographic surgery — Stage I (head, neck, hands, feet)", reimbursement: "$850–$1,400" },
      { code: "11440", description: "Excision of benign lesion — face, ears, eyelids — up to 0.5cm", reimbursement: "$240–$380" },
      { code: "11900", description: "Intralesional injection — up to 7 lesions", reimbursement: "$90–$140" },
    ],
    howWeServe: "We track lesion counts and anatomical sites dynamically with exact unit numbers, ensuring multi-lesion surgeries aren't denied as duplicates. Our coding engine verifies that pathologically distinct lesions are linked to distinct diagnostic codes. Clear separation between cosmetic treatments and medically necessary procedures is applied at the pre-submission stage — reducing manual audit requests and protecting your revenue from cosmetic-exclusion denials.",
    stats: [{ val: "98%+", label: "First-pass rate" }, { val: "0%", label: "Cosmetic crossover denials" }, { val: "<28", label: "AR days" }, { val: "100%", label: "Lesion count accuracy" }],
  },
  "neurology": {
    title: "Neurology Billing",
    tagline: "Advanced neuro-diagnostic and infusion billing with prior auth management",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1400&q=85&fit=crop",
    overview: "Neurology billing involves complex diagnostic modalities, expensive therapeutic infusions, and strict medical necessity criteria. From EEG monitoring to nerve conduction studies, every service must be meticulously coded and backed by clear documentation. MedCare RCM ensures your neurological services are billed correctly and paid on the first submission.",
    keyPoints: [
      "EEG and continuous telemetry monitoring billing compliance",
      "Nerve conduction study (NCS) and EMG component billing",
      "Prior authorization management for therapeutic infusions",
      "Technical and professional component split billing",
      "Medical necessity documentation for high-cost neurologics",
    ],
    cptCodes: [
      { code: "95819", description: "EEG — awake and asleep with complete interpretation", reimbursement: "$240–$380" },
      { code: "95910", description: "Nerve conduction studies — 7 to 12 nerves", reimbursement: "$520–$780" },
      { code: "95861", description: "EMG — 2 extremities with related paraspinal areas", reimbursement: "$280–$420" },
      { code: "96413", description: "Chemotherapy / biologic IV infusion — initial hour", reimbursement: "$220–$380" },
      { code: "64483", description: "Transforaminal epidural injection — lumbar with imaging", reimbursement: "$680–$1,100" },
    ],
    howWeServe: "We track medication prior authorizations against regional medical necessity records to ensure expensive therapeutic infusions are paid on first submission. Technical diagnostic tests are aligned with professional interpretation codes — preventing split-billing issues that delay cash flow. Real-time authorization status is monitored so your team is never surprised by an expired approval mid-treatment series.",
    stats: [{ val: "98%+", label: "First-pass rate" }, { val: "100%", label: "Auth monitoring" }, { val: "<30", label: "AR days" }, { val: "0%", label: "Split-billing errors" }],
  },
  "radiology": {
    title: "Radiology & Imaging Billing",
    tagline: "High-volume diagnostic imaging billing with professional and technical component precision",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1400&q=85&fit=crop",
    overview: "Radiology billing demands speed, accuracy, and precise separation of professional and technical billing components. MedCare RCM manages high-volume imaging pipelines — from X-ray to PET scan — ensuring every study is coded correctly, component splits are applied accurately, and payer downcoding is actively challenged.",
    keyPoints: [
      "Modifier 26 (professional component) and TC (technical component) splits",
      "High-volume MRI, CT, X-ray, and ultrasound billing",
      "Automated downcoding detection and appeal filing",
      "Radiologist dictation-to-claim alignment and audit",
      "Prior authorization tracking for advanced imaging studies",
    ],
    cptCodes: [
      { code: "74177", description: "CT abdomen and pelvis — with contrast", reimbursement: "$280–$420" },
      { code: "70553", description: "MRI brain — without and with contrast (complete)", reimbursement: "$380–$560" },
      { code: "76817", description: "Ultrasound — transvaginal (complete)", reimbursement: "$140–$210" },
      { code: "71046", description: "X-ray chest — 2 views", reimbursement: "$45–$80" },
      { code: "78816", description: "PET/CT scan — skull base to mid-thigh", reimbursement: "$1,400–$2,200" },
    ],
    howWeServe: "We automate Modifier 26 and TC splits based on site-of-service conditions to prevent billing duplications and hospital crossovers. Our systems cross-reference radiologist dictation timelines with ordering physician records for complete compliance. Any payer that downcodes a high-complexity scan is met with a pre-built appeal backed by clinical documentation — protecting your reimbursement rates consistently.",
    stats: [{ val: "98%+", label: "First-pass rate" }, { val: "100%", label: "Component accuracy" }, { val: "<25", label: "AR days" }, { val: "0%", label: "Downcoding loss" }],
  },
  "oncology": {
    title: "Oncology Billing",
    tagline: "High-stakes chemotherapy, infusion, and radiation billing with real-time auth management",
    image: "https://images.unsplash.com/photo-1579684453423-f84349ef60b0?w=1400&q=85&fit=crop",
    overview: "Oncology billing carries the highest financial stakes in medicine. Chemotherapy drug costs, radiation planning complexity, and constant prior authorization demands create significant revenue risk. MedCare RCM protects your oncology revenue cycle with real-time authorization monitoring, drug waste tracking, and proactive appeal management.",
    keyPoints: [
      "Real-time prior authorization for all chemotherapy and biologic agents",
      "Drug waste tracking and Modifier JW documentation",
      "Chemotherapy administration sequencing — initial, concurrent, and sequential",
      "Radiation therapy planning and delivery billing compliance",
      "Clinical trial billing segregation from standard care",
    ],
    cptCodes: [
      { code: "96413", description: "Chemotherapy IV infusion — initial hour (primary drug)", reimbursement: "$220–$380" },
      { code: "96415", description: "Chemotherapy IV infusion — each additional hour", reimbursement: "$95–$160" },
      { code: "77263", description: "Radiation therapy treatment planning — high complexity", reimbursement: "$420–$680" },
      { code: "J9305", description: "Pemetrexed injection — per 10mg (HCPCS drug code)", reimbursement: "Per unit" },
      { code: "96375", description: "Therapeutic injection — additional sequential IV push", reimbursement: "$55–$95" },
    ],
    howWeServe: "We run real-time authorization checks on every oncology medication before infusion day — preventing mid-treatment denials that disrupt patient care. Drug waste is tracked to the milligram using Modifier JW documentation, ensuring every unused portion is billed correctly. Complex multi-drug infusion sequences are coded in the correct order with proper add-on code structure, so you never leave infusion revenue uncaptured.",
    stats: [{ val: "100%", label: "Auth pre-verified" }, { val: "0%", label: "Drug waste lost" }, { val: "<28", label: "AR days" }, { val: "98%+", label: "First-pass rate" }],
  },
  "gastroenterology": {
    title: "Gastroenterology Billing",
    tagline: "High-volume endoscopy billing with precise screening-to-diagnostic conversion tracking",
    image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1400&q=85&fit=crop",
    overview: "GI billing requires precise tracking of polyp removal methods, biopsy counts, and the critical transition from screening to diagnostic colonoscopy billing. MedCare RCM manages your high-volume endoscopy schedule with automated coding validation — ensuring every procedure is billed at its highest appropriate level.",
    keyPoints: [
      "Screening-to-diagnostic colonoscopy conversion — proper code and modifier application",
      "Polyp removal method tracking — hot forceps, cold snare, EMR",
      "Moderate sedation billing alongside primary GI procedures",
      "Biopsy count documentation and multi-site tissue tracking",
      "Prior authorization management for advanced GI procedures",
    ],
    cptCodes: [
      { code: "45385", description: "Colonoscopy with polypectomy by snare technique", reimbursement: "$480–$720" },
      { code: "43239", description: "EGD with transendoscopic biopsy, single or multiple", reimbursement: "$380–$560" },
      { code: "45378", description: "Diagnostic colonoscopy — proximal to splenic flexure", reimbursement: "$320–$490" },
      { code: "99152", description: "Moderate sedation — first 15 minutes (same physician)", reimbursement: "$85–$135" },
      { code: "45381", description: "Colonoscopy with directed submucosal injection", reimbursement: "$420–$640" },
    ],
    howWeServe: "We monitor exact polyp removal methods to prevent downcoding on complex GI interventions. Our team manages the critical billing transitions when a routine screening colonoscopy becomes a diagnostic or therapeutic procedure — applying the correct codes and modifiers so payers reimburse at the appropriate rate. Moderate sedation by the same physician is tracked separately and billed correctly on every claim.",
    stats: [{ val: "98%+", label: "First-pass rate" }, { val: "100%", label: "Screening conversion accuracy" }, { val: "<28", label: "AR days" }, { val: "0%", label: "Sedation billing errors" }],
  },
  "urology": {
    title: "Urology Billing",
    tagline: "Precise surgical and diagnostic billing for urological procedures and office-based care",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1400&q=85&fit=crop",
    overview: "Urology billing covers a wide spectrum — from routine office visits to complex robotic surgical procedures. Global period management, device documentation, and supply cost recovery are all critical to keeping your urology revenue cycle healthy. MedCare RCM handles every layer of urological billing with surgical precision.",
    keyPoints: [
      "Global surgical period management for urological procedures",
      "Robotic surgery billing (Modifier 22) for increased procedural complexity",
      "HCPCS supply code matching for high-cost urological devices",
      "Urodynamics and uroflowmetry billing compliance",
      "Prostate biopsy and cancer screening code management",
    ],
    cptCodes: [
      { code: "52000", description: "Cystourethroscopy — diagnostic visualization of lower urinary tract", reimbursement: "$280–$420" },
      { code: "55700", description: "Prostate biopsy — automated needle core sampling", reimbursement: "$380–$560" },
      { code: "51740", description: "Complex uroflowmetry with electronic measurement and analysis", reimbursement: "$140–$210" },
      { code: "52647", description: "Laser coagulation of prostate (TULIP/HOLEP)", reimbursement: "$1,400–$2,400" },
      { code: "50590", description: "Lithotripsy — extracorporeal shockwave (ESWL)", reimbursement: "$1,800–$3,200" },
    ],
    howWeServe: "We isolate global vasectomy and prostate packages from unexpected diagnostic follow-up visits using precise modifier routing and documentation review. Our billing engine matches HCPCS supply codes with corresponding office procedures — ensuring high-cost surgical consumables are fully reimbursed. Robotic surgical claims are defended with complete operative documentation to prevent automated downcoding.",
    stats: [{ val: "98%+", label: "First-pass rate" }, { val: "100%", label: "Supply cost capture" }, { val: "<30", label: "AR days" }, { val: "0", label: "Global period errors" }],
  },
  "physical-therapy": {
    title: "Physical Therapy Billing",
    tagline: "Time-based rehabilitation billing with 8-minute rule compliance and cap management",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=85&fit=crop",
    overview: "Physical therapy billing is highly time-sensitive and subject to strict insurance caps, daily treatment limits, and the 8-Minute Rule. MedCare RCM keeps your PT revenue clean by automating time-based documentation checks, tracking therapy cap thresholds, and applying Modifier KX correctly when medically necessary care extends beyond standard limits.",
    keyPoints: [
      "8-Minute Rule compliance for time-based service billing",
      "Medicare therapy cap tracking and Modifier KX application",
      "Functional limitation reporting (G-codes) compliance",
      "Multi-modality visit sequencing and billing optimization",
      "Home health and outpatient PT billing coordination",
    ],
    cptCodes: [
      { code: "97110", description: "Therapeutic exercise — per 15-minute time block", reimbursement: "$30–$55" },
      { code: "97140", description: "Manual therapy — mobilization/manipulation per 15 min", reimbursement: "$35–$60" },
      { code: "97161", description: "PT evaluation — low complexity condition", reimbursement: "$120–$190" },
      { code: "97530", description: "Therapeutic activities — dynamic functional tasks per 15 min", reimbursement: "$35–$60" },
      { code: "97112", description: "Neuromuscular re-education — balance and coordination per 15 min", reimbursement: "$32–$55" },
    ],
    howWeServe: "We build automatic 8-Minute Rule validation directly into our pre-submission scrubbing process — eliminating timing errors that cause line-item denials. Therapy cap thresholds are tracked against each patient's insurance plan in real time, and Modifier KX is applied automatically when documented medical necessity supports continued care. Your therapy team gets a clear dashboard showing exactly where each patient stands against their annual therapy benefit.",
    stats: [{ val: "98%+", label: "First-pass rate" }, { val: "0%", label: "8-min rule errors" }, { val: "100%", label: "Cap tracking accuracy" }, { val: "<30", label: "AR days" }],
  },
  "pain-management": {
    title: "Pain Management Billing",
    tagline: "Interventional injection and nerve block billing with imaging compliance",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1400&q=85&fit=crop",
    overview: "Pain management billing demands extreme precision regarding radiological guidance documentation, exact anatomical injection sites, and frequent payer policy changes. MedCare RCM validates every interventional claim before submission — ensuring imaging guidance is properly linked, frequency limits are tracked, and high-value injection claims are never downgraded.",
    keyPoints: [
      "Radiology guidance (fluoroscopy / ultrasound) documentation and billing",
      "Epidural and facet injection frequency tracking per payer policy",
      "Trigger point injection multi-site coding compliance",
      "Spinal cord stimulator implantation and trial billing",
      "Controlled substance documentation audit support",
    ],
    cptCodes: [
      { code: "62323", description: "Lumbar/sacral epidural injection with imaging guidance", reimbursement: "$480–$780" },
      { code: "64493", description: "Paravertebral facet injection — lumbar, single level", reimbursement: "$380–$560" },
      { code: "20553", description: "Trigger point injection — 3 or more muscle groups", reimbursement: "$140–$220" },
      { code: "64635", description: "Destruction of facet joint nerves — lumbar, single level", reimbursement: "$680–$980" },
      { code: "62350", description: "Implantation of spinal infusion pump — intrathecal", reimbursement: "$2,400–$4,800" },
    ],
    howWeServe: "We confirm that radiology guidance billing is properly linked to injection claims — blocking standard technique validation denials from payers who require documented fluoroscopy or ultrasound. Our system tracks regional frequency limits for spinal injections, alerting your clinic before compliance thresholds are crossed. Every facet injection series is pre-validated against LCD criteria before the patient arrives for treatment.",
    stats: [{ val: "98%+", label: "First-pass rate" }, { val: "100%", label: "Imaging guidance compliance" }, { val: "0%", label: "Frequency limit violations" }, { val: "<30", label: "AR days" }],
  },
  "urgent-care": {
    title: "Urgent Care Billing",
    tagline: "High-volume episodic care billing with rapid claim submission and modifier precision",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400&q=85&fit=crop",
    overview: "Urgent care centers see high volumes of episodic patients with diverse clinical needs — requiring fast, accurate coding across dozens of encounter types daily. MedCare RCM keeps your urgent care revenue moving with same-day claim submission, correct E&M level documentation, and proper after-hours modifier application.",
    keyPoints: [
      "E&M level determination and documentation support for walk-in encounters",
      "After-hours and weekend modifier (Modifier 93) application",
      "Point-of-care diagnostic coding — rapid strep, flu, COVID",
      "Minor procedure coding — laceration repair, splinting, wound care",
      "Real-time eligibility verification before service delivery",
    ],
    cptCodes: [
      { code: "99203", description: "New patient outpatient E&M — moderate severity", reimbursement: "$140–$200" },
      { code: "12001", description: "Simple wound repair — 2.5 cm or less (trunk/extremity)", reimbursement: "$140–$210" },
      { code: "87880", description: "Rapid Strep A antigen detection — point-of-care", reimbursement: "$25–$45" },
      { code: "99213", description: "Established patient E&M — low to moderate complexity", reimbursement: "$100–$160" },
      { code: "29125", description: "Static short arm splint application", reimbursement: "$80–$130" },
    ],
    howWeServe: "We apply precise emergency facility modifier splits to protect episodic care codes from being incorrectly grouped into standard office structures. After-hours and weekend modifiers are tracked and applied consistently — ensuring your urgent care center is fully compensated for extended operating hours. Same-day claim submission is standard across all encounters, keeping your AR days among the lowest in the industry.",
    stats: [{ val: "98%+", label: "First-pass rate" }, { val: "24h", label: "Claim submission" }, { val: "<25", label: "AR days" }, { val: "100%", label: "After-hours compliance" }],
  },
  "ob-gyn": {
    title: "OB/GYN Billing",
    tagline: "Global maternity package billing and gynecological surgical RCM",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=85&fit=crop",
    overview: "OB/GYN billing spans long-term global maternity bundles across multiple months, alongside independent gynecological surgeries, diagnostic tests, and preventive screenings. MedCare RCM manages the full complexity of obstetric and gynecological revenue — from first trimester through postpartum — without losing a single billable encounter.",
    keyPoints: [
      "Global obstetric package management across changing insurance coverage",
      "High-risk pregnancy unbundling — separate antepartum and monitoring billing",
      "Gynecological surgical coding for hysterectomy, colposcopy, and LEEP",
      "Well-woman visit coding and preventive screening compliance",
      "Fetal monitoring and ultrasound billing alongside global packages",
    ],
    cptCodes: [
      { code: "59400", description: "Global routine obstetric care — vaginal delivery with antepartum/postpartum", reimbursement: "$2,200–$3,800" },
      { code: "59510", description: "Global cesarean delivery with antepartum and postpartum care", reimbursement: "$2,600–$4,200" },
      { code: "57454", description: "Colposcopy with biopsy and endocervical curettage", reimbursement: "$280–$420" },
      { code: "76805", description: "Obstetric ultrasound — after 14 weeks, fetal and maternal", reimbursement: "$140–$210" },
      { code: "58150", description: "Total abdominal hysterectomy with or without tubes/ovaries", reimbursement: "$1,800–$3,200" },
    ],
    howWeServe: "We manage split-insurance transfers for multi-trimester global pregnancies — ensuring complete payment across plan changes that occur during pregnancy. High-risk fetal monitoring codes are tracked separately from global packages, capturing revenue that standard billing systems bundle incorrectly. Our team structures preventive well-woman visits alongside diagnostic labs using correct modifiers, preventing payers from incorrectly denying separate services on the same date.",
    stats: [{ val: "98%+", label: "First-pass rate" }, { val: "100%", label: "Global package accuracy" }, { val: "<30", label: "AR days" }, { val: "0%", label: "Split-insurance loss" }],
  },
};

/* ── Fallback for unlisted specialties ── */
const DEFAULT_SPECIALTY = {
  title: "Medical Billing Services",
  tagline: "Custom RCM solutions for your specialty",
  image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=85&fit=crop",
  overview: "MedCare RCM Solutions delivers end-to-end revenue cycle management for your specialty — from claim submission to final payment. Our certified billing specialists understand your specific payer rules, coding requirements, and reimbursement structures.",
  keyPoints: [
    "Specialty-specific coding by certified billing professionals",
    "Real-time eligibility verification before service delivery",
    "Proactive denial management and appeal filing",
    "Prior authorization tracking and renewal management",
    "Transparent monthly reporting and KPI dashboards",
  ],
  cptCodes: [
    { code: "99213 / 99214", description: "Standard outpatient evaluation and management", reimbursement: "$110–$180" },
    { code: "99204 / 99205", description: "New patient comprehensive evaluation", reimbursement: "$175–$260" },
    { code: "Specialty-specific codes", description: "Tailored to your clinical scope and procedures", reimbursement: "Varies" },
  ],
  howWeServe: "We configure specialized billing workflows for your practice — matching your clinical scope with the exact coding and documentation requirements your payers expect. Contact us for a custom assessment of your specialty's billing needs.",
  stats: [{ val: "98%+", label: "First-pass rate" }, { val: "<30", label: "AR days" }, { val: "65%", label: "Denial reduction" }, { val: "24h", label: "Claim submission" }],
};

export default function SpecialtyDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const data = SPECIALTIES[slug] || { ...DEFAULT_SPECIALTY, title: slug ? slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") + " Billing" : "Medical Billing Services" };

  const [imgLoaded, setImgLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  const s1 = useReveal(); const s2 = useReveal();
  const s3 = useReveal(); const s4 = useReveal();
  const s5 = useReveal(); const s6 = useReveal();

  return (
    <>
      <Navbar />
      <ReadingProgress />
      <main>

        {/* ── HERO IMAGE ── */}
        <section style={{ paddingTop: 68, position: "relative", height: 440, overflow: "hidden" }}>
          <img
            src={data.image} alt={data.title}
            onLoad={() => setImgLoaded(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: imgLoaded ? "scale(1)" : "scale(1.06)", transition: "transform 1.2s ease", filter: imgLoaded ? "none" : "blur(4px)" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(17,17,17,0.2) 0%, rgba(17,17,17,0.75) 100%)" }} />

          {/* Hero content */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 32px 48px", maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.15s" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#111111", background: "#F5E6A3", letterSpacing: "1.5px", textTransform: "uppercase", padding: "5px 14px", borderRadius: 100, display: "inline-block", marginBottom: 14 }}>
                MedCare RCM Solutions
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(26px,4vw,48px)", fontWeight: 800, color: "#fff", lineHeight: 1.15, letterSpacing: -1, maxWidth: 820, opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)", transition: "all 0.65s ease 0.25s" }}>
              {data.title}
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", marginTop: 10, maxWidth: 560, fontStyle: "italic", opacity: mounted ? 1 : 0, transition: "all 0.65s ease 0.35s" }}>
              {data.tagline}
            </p>
          </div>
        </section>

        {/* ── META BAR ── */}
        <section style={{ background: "#fff", borderBottom: "1px solid rgba(17,17,17,0.08)", padding: "14px 32px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#111111", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, color: "#F5E6A3" }}>M</div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111111" }}>MedCare RCM Solutions</span>
              </div>
              <span style={{ fontSize: 13, color: "#999999" }}>Specialty RCM</span>
              <span style={{ fontSize: 13, color: "#999999" }}>HIPAA Compliant</span>
            </div>
            <button onClick={() => router.push("/specialties")} style={{ background: "none", border: "1.5px solid rgba(17,17,17,0.2)", borderRadius: 8, padding: "7px 16px", fontSize: 13, fontWeight: 600, color: "#111111", cursor: "pointer" }}>
              ← All specialties
            </button>
          </div>
        </section>

        {/* ── STATS STRIP ── */}
        <section style={{ background: "#111111", padding: "36px 24px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, textAlign: "center" }}>
            {data.stats.map((s, i) => (
              <div key={i} style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: `all 0.5s ease ${0.1 + i * 0.08}s` }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#F5E6A3", letterSpacing: -0.5 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BODY ── */}
        <section style={{ background: "#F5F0E8", padding: "72px 24px" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexDirection: "column", gap: 28 }}>

            {/* Overview */}
            <div ref={s1.ref} style={{ opacity: s1.visible ? 1 : 0, transform: s1.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease" }}>
              <div style={{ background: "#fff", border: "1px solid rgba(17,17,17,0.08)", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(17,17,17,0.05)" }}>
                <div style={{ padding: "10px 28px", background: "#111111", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 14 }}>📋</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#F5E6A3", letterSpacing: 1.5, textTransform: "uppercase" }}>Clinical Overview</span>
                </div>
                <div style={{ padding: "32px 36px" }}>
                  <p style={{ fontSize: 16, color: "#444444", lineHeight: 1.85, margin: 0 }}>{data.overview}</p>
                </div>
              </div>
            </div>

            {/* Key Points */}
            <div ref={s2.ref} style={{ opacity: s2.visible ? 1 : 0, transform: s2.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease 0.08s" }}>
              <div style={{ background: "#fff", border: "1px solid rgba(17,17,17,0.08)", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(17,17,17,0.05)" }}>
                <div style={{ padding: "10px 28px", background: "#111111", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 14 }}>✅</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#F5E6A3", letterSpacing: 1.5, textTransform: "uppercase" }}>What We Manage for You</span>
                </div>
                <div style={{ padding: "32px 36px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="points-grid">
                    {data.keyPoints.map((point, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", background: "#F5F0E8", borderRadius: 12, border: "1px solid rgba(17,17,17,0.07)" }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#F5E6A3", border: "1.5px solid rgba(17,17,17,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          <span style={{ fontSize: 11, fontWeight: 800, color: "#111111" }}>✓</span>
                        </div>
                        <span style={{ fontSize: 14, color: "#333333", fontWeight: 500, lineHeight: 1.5 }}>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CPT Codes Table */}
            <div ref={s3.ref} style={{ opacity: s3.visible ? 1 : 0, transform: s3.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease 0.1s" }}>
              <div style={{ background: "#fff", border: "1px solid rgba(17,17,17,0.08)", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(17,17,17,0.05)" }}>
                <div style={{ padding: "10px 28px", background: "#111111", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 14 }}>🧾</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#F5E6A3", letterSpacing: 1.5, textTransform: "uppercase" }}>Core CPT & HCPCS Codes Managed</span>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#F5F0E8", borderBottom: "2px solid rgba(17,17,17,0.08)" }}>
                        <th style={{ padding: "14px 24px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#111111", textTransform: "uppercase", letterSpacing: 1, whiteSpace: "nowrap" }}>CPT / HCPCS Code</th>
                        <th style={{ padding: "14px 24px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#111111", textTransform: "uppercase", letterSpacing: 1 }}>Description</th>
                        <th style={{ padding: "14px 24px", textAlign: "right", fontSize: 12, fontWeight: 700, color: "#111111", textTransform: "uppercase", letterSpacing: 1, whiteSpace: "nowrap" }}>Est. Reimbursement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.cptCodes.map((row, i) => (
                        <tr key={i} style={{ borderBottom: i < data.cptCodes.length - 1 ? "1px solid rgba(17,17,17,0.07)" : "none", background: i % 2 === 0 ? "#fff" : "#FDFAF5", transition: "background 0.2s" }}
                          onMouseEnter={e => e.currentTarget.style.background = "#FFF9E6"}
                          onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? "#fff" : "#FDFAF5"}>
                          <td style={{ padding: "16px 24px", whiteSpace: "nowrap" }}>
                            <span style={{ fontFamily: "monospace", fontSize: 14, fontWeight: 700, color: "#111111", background: "#F5E6A3", padding: "3px 10px", borderRadius: 6 }}>{row.code}</span>
                          </td>
                          <td style={{ padding: "16px 24px", fontSize: 14, color: "#444444", lineHeight: 1.5 }}>{row.description}</td>
                          <td style={{ padding: "16px 24px", textAlign: "right", fontSize: 14, fontWeight: 700, color: "#111111", whiteSpace: "nowrap" }}>{row.reimbursement}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ padding: "12px 24px", background: "#F5F0E8", borderTop: "1px solid rgba(17,17,17,0.07)" }}>
                    <p style={{ fontSize: 11, color: "#999999", margin: 0 }}>* Reimbursement estimates are based on Medicare fee schedules. Commercial payer rates vary by contract and region.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How We Serve */}
            <div ref={s4.ref} style={{ opacity: s4.visible ? 1 : 0, transform: s4.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease 0.12s" }}>
              <div style={{ background: "#fff", border: "1px solid rgba(17,17,17,0.08)", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(17,17,17,0.05)" }}>
                <div style={{ padding: "10px 28px", background: "#111111", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 14 }}>🚀</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#F5E6A3", letterSpacing: 1.5, textTransform: "uppercase" }}>How MedCare RCM Serves You</span>
                </div>
                <div style={{ padding: "32px 36px", display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "center" }} className="how-grid">
                  <p style={{ fontSize: 16, color: "#444444", lineHeight: 1.9, margin: 0 }}>{data.howWeServe}</p>
                  <div style={{ background: "#F5F0E8", border: "1px solid rgba(17,17,17,0.1)", borderRadius: 16, padding: "24px 28px", textAlign: "center", minWidth: 180, flexShrink: 0 }}>
                    <div style={{ fontSize: 36, marginBottom: 10 }}>🏥</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#111111", letterSpacing: -0.5, marginBottom: 4 }}>98%+</div>
                    <div style={{ fontSize: 11, color: "#666666", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>First-pass rate</div>
                    <div style={{ width: "100%", height: 1, background: "rgba(17,17,17,0.1)", margin: "16px 0" }} />
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#111111", letterSpacing: -0.5, marginBottom: 4 }}>&lt;30</div>
                    <div style={{ fontSize: 11, color: "#666666", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Avg AR days</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Process steps */}
            <div ref={s5.ref} style={{ opacity: s5.visible ? 1 : 0, transform: s5.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease 0.14s" }}>
              <div style={{ background: "#fff", border: "1px solid rgba(17,17,17,0.08)", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(17,17,17,0.05)" }}>
                <div style={{ padding: "10px 28px", background: "#111111", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 14 }}>⚙️</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "#F5E6A3", letterSpacing: 1.5, textTransform: "uppercase" }}>Our Process — From Day One</span>
                </div>
                <div style={{ padding: "32px 36px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16 }}>
                    {[
                      { step: "01", title: "Free billing audit", desc: "We analyze your current billing gaps before we start." },
                      { step: "02", title: "Onboarding in 7 days", desc: "Full setup with zero disruption to your current workflow." },
                      { step: "03", title: "Clean claim submission", desc: "Pre-scrubbed claims submitted within 24 hours of service." },
                      { step: "04", title: "Active denial management", desc: "Every denial appealed within 48 hours with documentation." },
                      { step: "05", title: "Monthly reporting", desc: "Full KPI dashboard delivered every month — no surprises." },
                    ].map((p, i) => (
                      <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F5E6A3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#111111" }}>{p.step}</div>
                        <h4 style={{ fontSize: 14, fontWeight: 700, color: "#111111", margin: 0 }}>{p.title}</h4>
                        <p style={{ fontSize: 13, color: "#666666", lineHeight: 1.6, margin: 0 }}>{p.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related specialties */}
            <div ref={s6.ref} style={{ opacity: s6.visible ? 1 : 0, transform: s6.visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease 0.1s" }}>
              <div style={{ background: "#fff", border: "1px solid rgba(17,17,17,0.08)", borderRadius: 20, padding: "28px 36px", boxShadow: "0 4px 24px rgba(17,17,17,0.05)" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111111", marginBottom: 18 }}>Other specialties we serve</h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {Object.entries(SPECIALTIES).filter(([k]) => k !== slug).slice(0, 10).map(([k, v]) => (
                    <Link key={k} href={`/specialties/${k}`} style={{ fontSize: 13, fontWeight: 500, color: "#444444", background: "#F5F0E8", border: "1px solid rgba(17,17,17,0.1)", padding: "6px 14px", borderRadius: 100, transition: "all 0.2s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#111111"; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "#F5F0E8"; e.currentTarget.style.color = "#444444"; }}>
                      {v.title.replace(" Billing", "").replace(" Surgery", "").replace(" Medicine", "").replace(" & Psychiatry", "").replace(" & Imaging", "")}
                    </Link>
                  ))}
                  <Link href="/specialties" style={{ fontSize: 13, fontWeight: 700, color: "#111111", background: "#F5E6A3", border: "1px solid rgba(17,17,17,0.15)", padding: "6px 14px", borderRadius: 100 }}>
                    View all 40+ →
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ background: "#111111", padding: "80px 24px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,230,163,0.1),transparent 70%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-block", background: "#F5E6A3", borderRadius: 100, padding: "6px 18px", fontSize: 12, fontWeight: 700, color: "#111111", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 24 }}>No obligation</div>
            <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 800, color: "#fff", letterSpacing: -1, marginBottom: 16, lineHeight: 1.15 }}>
              Stop losing revenue on<br />{data.title.replace(" Billing", "").replace(" Surgery", "")} billing.
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
              Let our certified billing specialists run a free audit on your current claims. We'll show you exactly what's being missed — and how to fix it.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/contact" style={{ background: "#F5E6A3", color: "#111111", padding: "15px 30px", borderRadius: 100, fontSize: 15, fontWeight: 800, display: "inline-flex", alignItems: "center", gap: 8 }}>
                Get a free audit →
              </Link>
              <Link href="/specialties" style={{ background: "transparent", color: "rgba(255,255,255,0.6)", padding: "15px 28px", borderRadius: 100, fontSize: 15, fontWeight: 600, border: "1.5px solid rgba(255,255,255,0.15)", display: "inline-block" }}>
                View all specialties
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .points-grid { grid-template-columns: 1fr !important; }
          .how-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </>
  );
}