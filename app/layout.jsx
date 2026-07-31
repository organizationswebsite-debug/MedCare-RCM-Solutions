// ════════════════════════════════════════════════
// FILE: app/layout.jsx  ← REPLACE your existing one
// ════════════════════════════════════════════════
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const inter = Inter({
  subsets:["latin"], display:"swap", variable:"--font-inter",
  preload:true, weight:["400","500","600","700","800","900"],
});

export const metadata = {
  metadataBase: new URL("https://www.medcarercm.com"),
  title: {
    default:  "MedCare RCM Solutions — Medical Billing & Revenue Cycle Management",
    template: "%s | MedCare RCM Solutions",
  },
  description: "USA-based medical billing and revenue cycle management. 98%+ first-pass claim rate, 500+ providers served, $50M+ recovered. HIPAA-certified billing specialists across 40+ specialties.",
  keywords: ["medical billing","revenue cycle management","RCM services","denial management","provider credentialing","AR recovery","HIPAA compliant billing","physician billing","hospital billing","medical billing company","healthcare billing","medical coding","patient billing","MedCare RCM"],
  authors:   [{ name:"MedCare RCM Solutions", url:"https://www.medcarercm.com" }],
  creator:   "MedCare RCM Solutions",
  publisher: "MedCare RCM Solutions",
  robots: { index:true, follow:true, googleBot:{ index:true, follow:true, "max-video-preview":-1, "max-image-preview":"large", "max-snippet":-1 } },
  openGraph: { type:"website", locale:"en_US", url:"https://www.medcarercm.com", siteName:"MedCare RCM Solutions", title:"MedCare RCM Solutions — Medical Billing & Revenue Cycle Management", description:"USA-based medical billing and RCM. 98%+ first-pass rate, 500+ providers, $50M+ recovered.", images:[{ url:"/og-image.jpg", width:1200, height:630, alt:"MedCare RCM Solutions" }] },
  twitter:   { card:"summary_large_image", title:"MedCare RCM Solutions", description:"USA-based medical billing. 98%+ first-pass. HIPAA-certified.", images:["/og-image.jpg"] },
  alternates:{ canonical:"https://www.medcarercm.com" },
  verification:{ google:"PASTE_YOUR_GSC_CODE_HERE" },
  category:"healthcare",
};

export const viewport = { width:"device-width", initialScale:1, themeColor:"#F5F0E8" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body style={{ fontFamily:"var(--font-inter),-apple-system,sans-serif", margin:0, padding:0, background:"#F5F0E8", overflowX:"hidden", WebkitFontSmoothing:"antialiased", MozOsxFontSmoothing:"grayscale" }}>
        <StructuredData />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
