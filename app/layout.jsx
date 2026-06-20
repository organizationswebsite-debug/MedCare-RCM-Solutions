import "./globals.css";

export const metadata = {
  title: "MedCare RCM Solutions | Medical Billing & Revenue Cycle Management",
  description:
    "MedCare RCM Solutions provides full-service medical billing, claims management, denial management, and revenue cycle management for healthcare providers across the USA.",
  keywords: "medical billing, RCM, revenue cycle management, denial management, credentialing, healthcare billing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
