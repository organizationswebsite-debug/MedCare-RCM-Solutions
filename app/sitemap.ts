// FILE: app/sitemap.ts  ← CREATE THIS FILE
import { MetadataRoute } from "next";
const BASE = "https://www.medcarercm.com";
const SERVICES = ["medical-billing","revenue-cycle-management","hospital-billing","physician-billing","laboratory-billing","imaging-billing","ar-recovery","credentialing","asc-billing","denial-management","patient-billing","reporting-analytics"];
const SPECIALTIES = ["family-medicine","cardiology","orthopedics","mental-health","pediatrics","dermatology","oncology","neurology","urology","gastroenterology","ophthalmology","radiology","physical-therapy","chiropractic","podiatry","rheumatology","anesthesiology","obstetrics-gynecology","internal-medicine","emergency-medicine"];
const BLOGS = ["reduce-claim-denials","ar-days-guide","medical-billing-mistakes","credentialing-guide","hipaa-compliance","revenue-cycle-management-guide","denial-management-strategies","patient-billing-tips","medical-coding-updates","rcm-kpis","prior-authorization","telehealth-billing","patient-eligibility-verification","appeal-letter-templates","small-practice-billing-mistakes","prior-authorization-workflow","denial-trend-reporting","medicare-advantage-billing"];
const TEAM = ["moazzam-founder","operations-lead","compliance-officer","ar-recovery-lead","credentialing-manager","analytics-lead","coding-specialist","patient-billing-lead","technology-lead"];
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url:`${BASE}`,              lastModified:now, changeFrequency:"weekly",  priority:1.0 },
    { url:`${BASE}/services`,     lastModified:now, changeFrequency:"weekly",  priority:0.9 },
    { url:`${BASE}/specialties`,  lastModified:now, changeFrequency:"monthly", priority:0.8 },
    { url:`${BASE}/pricing`,      lastModified:now, changeFrequency:"monthly", priority:0.8 },
    { url:`${BASE}/contact`,      lastModified:now, changeFrequency:"monthly", priority:0.8 },
    { url:`${BASE}/about`,        lastModified:now, changeFrequency:"monthly", priority:0.7 },
    { url:`${BASE}/blog`,         lastModified:now, changeFrequency:"weekly",  priority:0.7 },
    { url:`${BASE}/testimonials`, lastModified:now, changeFrequency:"monthly", priority:0.6 },
    { url:`${BASE}/careers`,      lastModified:now, changeFrequency:"weekly",  priority:0.6 },
    { url:`${BASE}/faq`,          lastModified:now, changeFrequency:"monthly", priority:0.6 },
    { url:`${BASE}/about/team`,   lastModified:now, changeFrequency:"monthly", priority:0.6 },
    ...SERVICES.map(s=>({ url:`${BASE}/services/${s}`,    lastModified:now, changeFrequency:"monthly" as const, priority:0.85 })),
    ...SPECIALTIES.map(s=>({ url:`${BASE}/specialties/${s}`, lastModified:now, changeFrequency:"monthly" as const, priority:0.7 })),
    ...BLOGS.map(s=>({ url:`${BASE}/blog/${s}`,           lastModified:now, changeFrequency:"yearly"  as const, priority:0.65 })),
    ...TEAM.map(s=>({ url:`${BASE}/about/team/${s}`,      lastModified:now, changeFrequency:"yearly"  as const, priority:0.5 })),
  ];
}
