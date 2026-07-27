// FILE: components/StructuredData.jsx  ← CREATE THIS FILE
export default function StructuredData() {
  const organization = {
    "@context":"https://schema.org","@type":"MedicalOrganization",
    "name":"MedCare RCM Solutions","alternateName":"MedCare RCM",
    "url":"https://www.medcarercm.com","logo":"https://www.medcarercm.com/logo.png",
    "description":"USA-based medical billing and revenue cycle management company serving 500+ healthcare providers across 40+ specialties with a 98%+ first-pass claim rate.",
    "foundingDate":"2020",
    "parentOrganization":{ "@type":"Organization","name":"Moaz Group of Companies" },
    "address":{ "@type":"PostalAddress","addressCountry":"US","addressRegion":"USA" },
    "contactPoint":{ "@type":"ContactPoint","contactType":"customer service","email":"info@medcarercm.com","availableLanguage":"English","areaServed":"US" },
    "hasOfferCatalog":{ "@type":"OfferCatalog","name":"Revenue Cycle Management Services","itemListElement":[
      { "@type":"Offer","itemOffered":{ "@type":"Service","name":"Medical Billing" } },
      { "@type":"Offer","itemOffered":{ "@type":"Service","name":"Revenue Cycle Management" } },
      { "@type":"Offer","itemOffered":{ "@type":"Service","name":"Denial Management" } },
      { "@type":"Offer","itemOffered":{ "@type":"Service","name":"Provider Credentialing" } },
      { "@type":"Offer","itemOffered":{ "@type":"Service","name":"AR Recovery" } },
      { "@type":"Offer","itemOffered":{ "@type":"Service","name":"Patient Billing" } },
      { "@type":"Offer","itemOffered":{ "@type":"Service","name":"Reporting & Analytics" } },
    ]},
  };
  const faq = {
    "@context":"https://schema.org","@type":"FAQPage",
    "mainEntity":[
      { "@type":"Question","name":"What is revenue cycle management (RCM)?","acceptedAnswer":{ "@type":"Answer","text":"Revenue cycle management is the complete financial process of a healthcare practice — from patient scheduling through claim submission, denial management, and final payment. MedCare RCM manages this entire process for healthcare providers." } },
      { "@type":"Question","name":"How much does medical billing outsourcing cost?","acceptedAnswer":{ "@type":"Answer","text":"MedCare RCM uses performance-based pricing — a percentage of monthly collections ranging from 4.99% for small practices down to 1.99% for high-volume groups. No setup fees, no long-term contracts." } },
      { "@type":"Question","name":"What is a good first-pass claim rate?","acceptedAnswer":{ "@type":"Answer","text":"A good first-pass claim rate is 95% or above. The industry average is 75-80%. MedCare RCM consistently achieves 98%+ first-pass rates through certified coding and pre-submission claim scrubbing." } },
      { "@type":"Question","name":"Is MedCare RCM HIPAA compliant?","acceptedAnswer":{ "@type":"Answer","text":"Yes. MedCare RCM Solutions is fully HIPAA-compliant. We sign a Business Associate Agreement (BAA) with every client before work begins. All patient data is encrypted end-to-end." } },
      { "@type":"Question","name":"How long does medical billing onboarding take?","acceptedAnswer":{ "@type":"Answer","text":"MedCare RCM onboards most practices in 5-7 business days with zero disruption to clinical operations." } },
    ],
  };
  const website = {
    "@context":"https://schema.org","@type":"WebSite",
    "name":"MedCare RCM Solutions","url":"https://www.medcarercm.com",
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html:JSON.stringify(organization) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html:JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html:JSON.stringify(website) }} />
    </>
  );
}
