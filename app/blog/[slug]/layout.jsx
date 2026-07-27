// FILE: app/blog/[slug]/layout.jsx  ← CREATE THIS FILE
const BLOG_META = {
  "reduce-claim-denials":             { title:"How to Reduce Medical Claim Denials in 2025 | MedCare RCM Blog",           description:"Proven strategies to reduce medical claim denials — root cause analysis, payer appeals, upstream fixes to get below 4%." },
  "ar-days-guide":                    { title:"What Are AR Days & How to Reduce Them | MedCare RCM Blog",                 description:"Complete guide to accounts receivable days — benchmarks, causes of high AR, and proven strategies to get below 30 days." },
  "medical-billing-mistakes":         { title:"10 Most Common Medical Billing Mistakes | MedCare RCM Blog",               description:"The most costly medical billing mistakes draining practice revenue — and exactly how to fix each one." },
  "credentialing-guide":              { title:"Complete Guide to Provider Credentialing | MedCare RCM Blog",               description:"Step-by-step credentialing guide — CAQH setup, Medicare enrollment, commercial payer applications." },
  "hipaa-compliance":                 { title:"HIPAA Compliance in Medical Billing | MedCare RCM Blog",                    description:"Essential HIPAA compliance guide — BAA requirements, PHI handling, and data security rules." },
  "revenue-cycle-management-guide":   { title:"What is Revenue Cycle Management? Complete RCM Guide | MedCare RCM",       description:"Complete RCM guide — the 10-step process, key KPIs, common problems, and how it improves collections." },
  "denial-management-strategies":     { title:"Denial Management Strategies That Actually Work | MedCare RCM Blog",       description:"Effective denial management — appeal templates, payer escalation, 70%+ first-level success strategies." },
  "patient-billing-tips":             { title:"Patient Billing Best Practices to Improve Collections | MedCare RCM Blog", description:"Proven patient billing strategies — clear statements, payment portals, follow-up that improves collections 25–30%." },
  "medical-coding-updates":           { title:"ICD-10 & CPT Coding Updates 2025 | MedCare RCM Blog",                     description:"Latest ICD-10 and CPT coding updates — new codes, deleted codes, revised guidelines, reimbursement impacts." },
  "rcm-kpis":                         { title:"6 Medical Billing KPIs Every Practice Should Track | MedCare RCM Blog",    description:"The 6 most important RCM KPIs — AR days, first-pass rate, denial rate, net collection, charge lag, cost to collect." },
  "prior-authorization":              { title:"Prior Authorization in Medical Billing | MedCare RCM Blog",                description:"Complete prior auth guide — which services need it, how to submit, how to appeal denials." },
  "telehealth-billing":               { title:"Telehealth Billing Guide 2025 | MedCare RCM Blog",                         description:"Complete telehealth billing guide — POS codes, CPT codes for virtual visits, payer-specific rules." },
  "patient-eligibility-verification": { title:"Patient Eligibility Verification Guide | MedCare RCM Blog",               description:"How real-time eligibility verification prevents claim denials and improves billing workflows." },
  "appeal-letter-templates":          { title:"Medical Billing Appeal Letter Templates | MedCare RCM Blog",               description:"Effective appeal letter templates for CO-4, CO-11, CO-29, CO-50 — strategies for appeals that get paid." },
  "small-practice-billing-mistakes":  { title:"Billing Mistakes Small Practices Make | MedCare RCM Blog",                description:"Common billing mistakes costing small practices revenue — and exactly how to fix each one." },
  "prior-authorization-workflow":     { title:"Prior Authorization Workflow Guide | MedCare RCM Blog",                    description:"Step-by-step prior authorization workflow — checklist, tracking, appeal process, reduce delays by 40%." },
  "denial-trend-reporting":           { title:"How Denial Trend Reporting Fixes Your Revenue Cycle | MedCare RCM Blog",  description:"Using denial trend data to fix upstream billing problems — segmenting by payer, reason code, provider." },
  "medicare-advantage-billing":       { title:"Medicare Advantage Billing Guide 2025 | HCC Coding | MedCare RCM Blog",   description:"Complete Medicare Advantage guide — HCC coding, risk adjustment, prior auth, MA plan rules for 2025." },
};
export async function generateMetadata({ params }) {
  const meta = BLOG_META[params.slug];
  const fmt  = params.slug?.split("-").map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(" ")||"Article";
  return {
    title:       meta?.title       || `${fmt} | MedCare RCM Blog`,
    description: meta?.description || "Expert medical billing insights from MedCare RCM certified specialists.",
    alternates:  { canonical:`https://www.medcarercm.com/blog/${params.slug}` },
    openGraph:   { title:meta?.title||fmt, description:meta?.description||"", url:`https://www.medcarercm.com/blog/${params.slug}`, type:"article" },
  };
}
export default function BlogSlugLayout({ children }) { return children; }
