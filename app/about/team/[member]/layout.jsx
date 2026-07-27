// FILE: app/about/team/[member]/layout.jsx  ← CREATE THIS FILE
const TEAM_META = {
  "moazzam-founder":       { title:"Moazzam — Founder & CEO | MedCare RCM Solutions",                     description:"Meet Moazzam, Founder of MedCare RCM and Moaz Group of Companies. Built a 500+ provider RCM company from the ground up." },
  "operations-lead":       { title:"Sarah Mitchell — Head of Billing Operations | MedCare RCM",           description:"CPC-certified billing specialist with 12+ years experience. Maintains 98%+ first-pass claim rates for 500+ providers." },
  "compliance-officer":    { title:"James Holloway — HIPAA & Compliance Officer | MedCare RCM",           description:"Certified HIPAA professional ensuring zero violations across all MedCare operations. 10+ years healthcare data security." },
  "ar-recovery-lead":      { title:"Priya Nair — A/R Recovery Lead | MedCare RCM Solutions",              description:"70%+ appeal success rate and $15M+ in personally recovered revenue for healthcare clients." },
  "credentialing-manager": { title:"Marcus Webb — Credentialing Manager | MedCare RCM Solutions",         description:"Managing credentialing for 500+ providers across Medicare, Medicaid, and all major commercial payers. Zero billing lapses." },
  "analytics-lead":        { title:"Linda Torres — Analytics & Reporting Lead | MedCare RCM",             description:"Designed live KPI dashboards identifying $8M+ in additional revenue through data-driven analytics." },
  "coding-specialist":     { title:"Kevin Park — Senior Medical Coding Specialist | MedCare RCM",         description:"CCS-certified coder with 99.2% accuracy rate across 20+ specialties. $6M+ recovered through E&M and HCC coding." },
  "patient-billing-lead":  { title:"Angela Reyes — Patient Billing Manager | MedCare RCM Solutions",     description:"Improved patient collection rates from 62% to 89% and generated $3M+ through payment portal implementation." },
  "technology-lead":       { title:"Thomas Nguyen — Technology & Systems Lead | MedCare RCM",            description:"Managing 40+ EHR integrations and HIPAA-compliant infrastructure with zero data breaches since founding." },
};
export async function generateMetadata({ params }) {
  const meta = TEAM_META[params.member];
  if (!meta) return { title:"Team Member | MedCare RCM Solutions", description:"Meet the certified billing specialists behind MedCare RCM." };
  return {
    title:       meta.title,
    description: meta.description,
    alternates:  { canonical:`https://www.medcarercm.com/about/team/${params.member}` },
    openGraph:   { title:meta.title, description:meta.description, url:`https://www.medcarercm.com/about/team/${params.member}` },
  };
}
export default function TeamMemberLayout({ children }) { return children; }
