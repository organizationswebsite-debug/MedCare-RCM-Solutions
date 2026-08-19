import LegalPage from "@/components/LegalPage";

export const metadata = {
  title: "Privacy Policy | MedCare RCM Solutions",
  description: "Learn how MedCare RCM Solutions collects, uses, protects, and manages information on our website and in our services.",
  alternates: { canonical: "https://www.medcarercm.com/privacy-policy" },
};

const sections = [
  { id: "information", heading: "Information we collect", paragraphs: ["We may collect information you provide directly, such as your name, work email, phone number, organization, and details submitted through a contact, audit, or inquiry form.", "When you use our website, we may also receive basic technical information such as browser type, device information, pages viewed, and approximate location through cookies, analytics, and similar technologies."] },
  { id: "use", heading: "How we use information", paragraphs: ["We use information to respond to inquiries, provide and improve our revenue cycle management services, coordinate consultations, maintain website security, and send relevant communications when you have asked to receive them."] },
  { id: "sharing", heading: "When information is shared", paragraphs: ["We do not sell personal information. We may share information with trusted service providers that help us operate our website and business, when required by law, or when necessary to protect our rights, users, and systems."] },
  { id: "security", heading: "Security and retention", paragraphs: ["We use reasonable administrative, technical, and organizational safeguards to protect information. No internet transmission is completely secure, and we retain information only for as long as needed for the purpose collected, legal obligations, and legitimate business needs."] },
  { id: "choices", heading: "Your choices", paragraphs: ["You may request access to, correction of, or deletion of personal information we hold about you, subject to applicable law. You can also unsubscribe from marketing communications at any time.", "To make a request, email info@medcarercmsolutions.com. We may need to verify your identity before completing a request."] },
  { id: "contact", heading: "Contact us", paragraphs: ["For privacy questions or requests, contact MedCare RCM Solutions at info@medcarercmsolutions.com or +1 (409) 419-3788."] },
];

export default function PrivacyPolicyPage() { return <LegalPage eyebrow="Privacy" title="Privacy Policy" intro="Your trust matters. This policy explains how MedCare RCM Solutions handles information across our website and business communications." updated="August 18, 2026" sections={sections} />; }