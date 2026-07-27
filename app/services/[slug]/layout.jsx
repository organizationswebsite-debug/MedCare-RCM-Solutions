// FILE: app/services/[slug]/layout.jsx  ← CREATE THIS FILE
const SERVICE_META = {
  "medical-billing":          { title:"Medical Billing Services | 98%+ First-Pass Rate | MedCare RCM",        description:"Comprehensive medical billing with 98%+ first-pass rates. Certified specialists, same-day claim submission, denial management. Free audit." },
  "revenue-cycle-management": { title:"Revenue Cycle Management (RCM) Services | MedCare RCM Solutions",       description:"Full-spectrum RCM from scheduling to final payment. 10-step animated process, dedicated account managers, live KPI dashboards." },
  "denial-management":        { title:"Denial Management Services | 70%+ Appeal Success | MedCare RCM",        description:"Expert denial management — 70%+ first-level appeal success. Every denial appealed within 48 hours with root cause analysis." },
  "ar-recovery":              { title:"AR Recovery Services | Medical Accounts Receivable | MedCare RCM",      description:"Recover aging accounts receivable beyond 60 days. $50M+ recovered. Systematic A/R recovery with payer escalation and targeted appeals." },
  "credentialing":            { title:"Provider Credentialing & Payer Enrollment | MedCare RCM Solutions",     description:"Fast provider credentialing. CAQH setup, Medicare/Medicaid enrollment, commercial payer applications. Zero credentialing lapses." },
  "hospital-billing":         { title:"Hospital Billing Services | DRG & Facility Billing | MedCare RCM",     description:"Complete hospital billing — inpatient DRG bundling, outpatient facility coding, multi-departmental charge capture. 98%+ first-pass rate." },
  "physician-billing":        { title:"Physician Billing Services | Private Practice RCM | MedCare RCM",      description:"Physician billing for private practices and multi-specialty groups. E&M coding, modifier accuracy, 98%+ first-pass rates." },
  "patient-billing":          { title:"Patient Billing Services | Improve Collections | MedCare RCM",         description:"Clear patient statements, online payment portal, compassionate follow-up. Improve patient collections by 25–30%." },
  "reporting-analytics":      { title:"Medical Billing Analytics & KPI Reporting | MedCare RCM",              description:"Live KPI dashboards and monthly executive reports. Real-time AR days, denial rates, first-pass rates, and collections." },
  "laboratory-billing":       { title:"Laboratory Billing Services | PAMA Compliant | MedCare RCM",           description:"Expert laboratory billing for molecular, pathology, and toxicology labs. PAMA compliant, prior auth management, split-billing." },
  "imaging-billing":          { title:"Imaging Center Billing | Radiology Billing Services | MedCare RCM",    description:"Professional and technical component billing. MRI, CT, X-ray billing. Anti-downcoding defense and LCD compliance." },
  "asc-billing":              { title:"ASC Billing Services | Ambulatory Surgery Center | MedCare RCM",       description:"Specialized ASC billing. Facility fee billing, implant cost capture, Modifier SG compliance. 98%+ first-pass rate." },
};
export async function generateMetadata({ params }) {
  const meta = SERVICE_META[params.slug];
  if (!meta) return { title:"Service | MedCare RCM Solutions" };
  return {
    title:       meta.title,
    description: meta.description,
    alternates:  { canonical:`https://www.medcarercm.com/services/${params.slug}` },
    openGraph:   { title:meta.title, description:meta.description, url:`https://www.medcarercm.com/services/${params.slug}` },
  };
}
export default function ServiceSlugLayout({ children }) { return children; }
