// FILE: app/specialties/[slug]/layout.jsx  ← CREATE THIS FILE
const SPECIALTY_META = {
  "family-medicine":   { title:"Family Medicine Medical Billing Services | MedCare RCM",   description:"Expert family medicine billing — E&M coding, annual wellness visits, chronic care management. 98%+ first-pass rate." },
  "cardiology":        { title:"Cardiology Billing Services | Cardiac RCM | MedCare RCM",  description:"Specialized cardiology billing — echocardiography, stress testing, cardiac catheterization billing experts." },
  "orthopedics":       { title:"Orthopedic Billing Services | MedCare RCM Solutions",      description:"Expert orthopedic billing — joint replacements, arthroscopy, fracture care, physical therapy billing." },
  "mental-health":     { title:"Mental Health Billing Services | MedCare RCM Solutions",   description:"HIPAA-compliant mental health billing — psychotherapy, psychiatry, counseling with parity compliance." },
  "pediatrics":        { title:"Pediatric Billing Services | MedCare RCM Solutions",       description:"Specialized pediatric billing — well-child visits, immunizations, developmental screenings, EPSDT billing." },
  "dermatology":       { title:"Dermatology Billing Services | MedCare RCM Solutions",     description:"Expert dermatology billing — Mohs surgery, excisions, biopsies, and phototherapy billing specialists." },
  "oncology":          { title:"Oncology Billing Services | Cancer Care RCM | MedCare RCM",description:"Specialized oncology billing — chemotherapy, radiation, immunotherapy with prior authorization management." },
  "neurology":         { title:"Neurology Billing Services | MedCare RCM Solutions",       description:"Expert neurology billing — EEG, EMG, sleep studies, neurological procedures and documentation compliance." },
  "gastroenterology":  { title:"Gastroenterology Billing Services | GI RCM | MedCare RCM",description:"Specialized GI billing — colonoscopy, endoscopy, ERCP, capsule endoscopy billing experts." },
  "ophthalmology":     { title:"Ophthalmology Billing Services | MedCare RCM Solutions",   description:"Expert ophthalmology billing — cataract surgery, retina procedures, global period and modifier compliance." },
  "urology":           { title:"Urology Billing Services | MedCare RCM Solutions",         description:"Specialized urology billing — cystoscopy, prostate procedures, lithotripsy, urodynamics billing." },
  "radiology":         { title:"Radiology Billing Services | Imaging RCM | MedCare RCM",  description:"Professional and technical component radiology billing — MRI, CT, X-ray, nuclear medicine specialists." },
  "physical-therapy":  { title:"Physical Therapy Billing Services | PT RCM | MedCare RCM",description:"Expert PT billing — therapeutic exercises, manual therapy, Medicare therapy cap management." },
  "podiatry":          { title:"Podiatry Billing Services | MedCare RCM Solutions",        description:"Specialized podiatry billing — routine foot care, surgical procedures, diabetic foot care, orthotics." },
};
export async function generateMetadata({ params }) {
  const meta = SPECIALTY_META[params.slug];
  const fmt  = params.slug?.split("-").map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(" ")||"Specialty";
  return {
    title:       meta?.title       || `${fmt} Medical Billing Services | MedCare RCM`,
    description: meta?.description || `Expert ${fmt} medical billing — HIPAA-compliant, 98%+ first-pass rate.`,
    alternates:  { canonical:`https://www.medcarercm.com/specialties/${params.slug}` },
    openGraph:   { title:meta?.title||`${fmt} Billing`, description:meta?.description||"", url:`https://www.medcarercm.com/specialties/${params.slug}` },
  };
}
export default function SpecialtySlugLayout({ children }) { return children; }
