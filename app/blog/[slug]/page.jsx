"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ALL_POSTS = [
  {
    slug: "reduce-claim-denials",
    category: "Denial Management", categoryColor: "#E8F4FF", categoryText: "#111111",
    title: "7 proven ways to reduce claim denials in your practice",
    excerpt: "Claim denials cost US medical practices billions every year. Here are the most effective strategies our billing specialists use to prevent denials before they happen.",
    date: "June 5, 2025", readTime: "6 min read", author: "MedCare RCM Team",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&q=85&fit=crop",
    content: [
      { heading: "Why claim denials are costing you more than you think", body: "The average medical practice loses 5–10% of its potential revenue to claim denials every year. Multiply that by your annual collections and the number is staggering. The good news? The majority of denials are preventable with the right processes in place." },
      { heading: "1. Verify patient eligibility before every visit", body: "The single most common cause of claim denials is ineligible coverage. Always verify insurance eligibility at least 24–48 hours before an appointment — not just at registration. Coverage can change without notice, and a denied claim discovered weeks later costs far more to fix than catching it upfront." },
      { heading: "2. Scrub every claim before submission", body: "Claim scrubbing — checking claims for errors before they go to the payer — is non-negotiable. Common scrubbing catches include missing modifiers, incorrect diagnosis codes, and mismatched patient demographics. A 98%+ first-pass rate is achievable when scrubbing is done consistently." },
      { heading: "3. Stay current on payer-specific rules", body: "Every payer has its own set of billing rules, timely filing limits, and covered service lists. What Medicare accepts, a commercial payer may deny. Maintain a payer-specific cheat sheet for your top 10 payers and update it quarterly." },
      { heading: "4. Identify your top denial codes and attack them", body: "Pull a denial report every month. What are your top 5 denial reason codes? CO-4, CO-97, CO-16? Each code points to a specific process failure. Fix the root cause — not just the individual claim — and your denial rate will drop consistently over time." },
      { heading: "5. Appeal every denial — immediately", body: "Most practices write off denials that should be appealed. Payers count on this. Establish a 48-hour appeal turnaround policy for all denials. Include clinical notes, prior authorization records, and a well-written appeal letter. Recovery rates on first-level appeals average 60–70%." },
      { heading: "6. Train your front desk staff on billing impact", body: "Billing errors often start at registration. Incorrect patient name, wrong date of birth, or a misspelled insurance ID can sink a claim before it's even coded. Monthly training sessions for your front desk staff on common intake errors pay massive dividends." },
      { heading: "7. Partner with a specialized RCM team", body: "If denial management feels overwhelming, you're not alone. Many practices find that outsourcing their RCM to specialists — like MedCare RCM Solutions — reduces denials by 40–60% within the first 90 days, while freeing your in-house team to focus on patients." },
    ],
  },
  {
    slug: "medical-billing-2025",
    category: "Industry News", categoryColor: "#FFF4E8", categoryText: "#C47A00",
    title: "Medical billing changes to know about in 2025",
    excerpt: "From updated ICD-10 codes to new Medicare reimbursement rules, here's what every practice manager needs to know heading into 2025.",
    date: "May 28, 2025", readTime: "5 min read", author: "MedCare RCM Team",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1400&q=85&fit=crop",
    content: [
      { heading: "The billing landscape is shifting — here's what matters", body: "Every year brings a new wave of billing rule changes, code updates, and reimbursement adjustments. 2025 is no exception. Here's your concise breakdown of what's changed and what your practice needs to do about it." },
      { heading: "ICD-10 code updates for 2025", body: "CMS added over 250 new ICD-10-CM codes for fiscal year 2025, revised 36 existing codes, and deleted 25 codes. Key additions affect mental health, substance use disorders, and long COVID sequelae. Make sure your EHR and billing software are updated before submitting claims." },
      { heading: "Medicare Physician Fee Schedule changes", body: "The 2025 Physician Fee Schedule includes a conversion factor adjustment that affects reimbursement rates across specialties. Behavioral health and primary care saw modest increases, while some surgical specialties face reductions. Review your most-billed CPT codes against the new fee schedule now." },
      { heading: "Prior authorization reforms taking effect", body: "CMS is implementing new prior authorization transparency rules in 2025 requiring payers to provide more specific denial reasons and faster decisions. This is good news for practices — but you still need to document prior auth requirements meticulously." },
      { heading: "What to do right now", body: "Update your billing software, retrain your coding staff on the new ICD-10 codes, and review your payer contracts against the new fee schedules. If you're not sure where to start, our team at MedCare RCM Solutions offers a free billing audit to identify gaps before they cost you money." },
    ],
  },
  {
    slug: "ar-days-improvement",
    category: "Revenue Cycle", categoryColor: "#E8F9F4", categoryText: "#00875A",
    title: "How to get your AR days under 30 — and keep them there",
    excerpt: "High AR days mean cash flow problems. We break down the exact strategies MedCare uses to consistently keep client AR days below 30.",
    date: "May 14, 2025", readTime: "8 min read", author: "MedCare RCM Team",
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=1400&q=85&fit=crop",
    content: [
      { heading: "What are AR days and why do they matter?", body: "AR days (Accounts Receivable days) measure how long it takes your practice to collect payment after a service is rendered. The lower the number, the faster you're getting paid. Industry benchmark is under 30 days — but many practices sit at 45, 60, or even 90+ days." },
      { heading: "Step 1: Submit claims within 24 hours", body: "Every day between service and claim submission is a day of lost cash flow. Build a same-day or next-day claim submission workflow. Batch charges at the end of each clinical day and submit electronically before noon the following day." },
      { heading: "Step 2: Follow up on unpaid claims at 14 days", body: "Don't wait for 30 or 45 days to follow up. Set a 14-day follow-up trigger for any unpaid claim. Early follow-up identifies issues before they snowball into aged AR." },
      { heading: "Step 3: Segment your AR by age and payer", body: "Not all AR is equal. Prioritize claims over $500 in the 30–60 day bucket first. Know which payers are your slowest and build specific follow-up workflows for them." },
      { heading: "Step 4: Work denials daily — not weekly", body: "Denied claims sitting untouched are the primary driver of high AR days. Assign denial working as a daily task, not a weekly one. Even 30 minutes per day of focused denial resolution can reduce your AR days by 5–10 days within a month." },
      { heading: "Step 5: Set a hard write-off policy", body: "Old AR over 180 days that hasn't been collected needs a clear write-off policy. Chasing uncollectable AR wastes staff time and inflates your AR numbers. Clean your books quarterly and focus energy on collectible claims." },
    ],
  },
  {
    slug: "credentialing-mistakes",
    category: "Credentialing", categoryColor: "#F3E8FF", categoryText: "#7C3AED",
    title: "5 credentialing mistakes that delay your revenue",
    excerpt: "Credentialing errors can delay a provider's billing by weeks or months. Learn the most common mistakes and how to avoid them.",
    date: "April 30, 2025", readTime: "5 min read", author: "MedCare RCM Team",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=85&fit=crop",
    content: [
      { heading: "Credentialing delays cost more than you realize", body: "A new provider who can't bill because credentialing isn't complete can cost your practice $10,000–$30,000 per month in unbillable revenue. The good news is most credentialing delays are avoidable." },
      { heading: "Mistake 1: Starting the process too late", body: "Credentialing with Medicare and most commercial payers takes 90–180 days. Start the process the moment an offer is accepted — or even during the interview stage." },
      { heading: "Mistake 2: Incomplete or inconsistent applications", body: "A single discrepancy — a different address format, a missing DEA number, or an undisclosed gap in employment — can trigger additional information requests and add weeks to the process." },
      { heading: "Mistake 3: Letting CAQH profiles go stale", body: "CAQH profiles must be re-attested every 120 days. Expired attestations cause application rejections. Monitor CAQH expiration dates and re-attest proactively." },
      { heading: "Mistake 4: No follow-up system", body: "Applications submitted without a follow-up process disappear into payer black holes. Call payers every 2 weeks to check status. Document every contact — date, representative name, and status update." },
      { heading: "Mistake 5: Handling it in-house without expertise", body: "Credentialing is a full-time job. Practices that assign it to an already-overloaded front desk staff member consistently experience delays. Consider outsourcing credentialing to specialists." },
    ],
  },
  {
    slug: "patient-billing-collections",
    category: "Patient Billing", categoryColor: "#FFE8F0", categoryText: "#C0185B",
    title: "Improving patient collections without damaging relationships",
    excerpt: "Collecting patient balances is one of the hardest parts of running a practice. Here's how to do it effectively while preserving trust.",
    date: "April 18, 2025", readTime: "7 min read", author: "MedCare RCM Team",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1400&q=85&fit=crop",
    content: [
      { heading: "Patient balances are the fastest-growing part of your AR", body: "With deductibles rising every year, patient responsibility now accounts for 30–35% of practice revenue. Collecting it effectively — without damaging the patient relationship — is one of the most important skills a modern practice can develop." },
      { heading: "Collect copays and known balances at the time of service", body: "The single highest-yield change you can make: collect everything owed at check-in. Patients who leave without paying are 3x harder to collect from later." },
      { heading: "Send clear, itemized statements — fast", body: "Statements should go out within 5 days of claim adjudication — not at month-end. The longer you wait, the less patients remember about the visit and the less motivated they are to pay." },
      { heading: "Offer multiple payment options", body: "Accept credit cards, debit cards, HSA/FSA cards, and online payments. Patients who can pay easily, do pay. An online patient portal where they can view and pay their balance 24/7 can increase collections by 20–30%." },
      { heading: "Use payment plans proactively", body: "Offer payment plans for balances over $200 before patients ask. A patient on a $50/month plan is far more likely to pay their full balance than one who receives a collections notice." },
      { heading: "Train your team on compassionate financial conversations", body: "Money conversations feel uncomfortable — for your staff and your patients. Use language like 'your portion is $X today' rather than 'you owe us $X.' The framing matters enormously for both collections and patient satisfaction." },
    ],
  },
  {
    slug: "rcm-technology-2025",
    category: "Technology", categoryColor: "#E8FFF0", categoryText: "#00875A",
    title: "The RCM technology stack every modern practice should consider",
    excerpt: "From AI-powered claim scrubbing to automated eligibility verification, we break down the tools transforming revenue cycle management.",
    date: "April 5, 2025", readTime: "6 min read", author: "MedCare RCM Team",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1400&q=85&fit=crop",
    content: [
      { heading: "Technology is reshaping what's possible in RCM", body: "Five years ago, most billing was reactive. Today, AI-powered tools can predict which claims will be denied before submission, automate eligibility checks, and flag coding errors in real time." },
      { heading: "Automated eligibility verification", body: "Manual eligibility checks take 3–5 minutes per patient. Automated tools run checks overnight on your entire schedule and flag issues before the patient arrives. This single tool can reduce eligibility-related denials by 60–70%." },
      { heading: "AI-powered claim scrubbing", body: "Next-generation claim scrubbers use machine learning to catch errors that rule-based systems miss. They learn your payers' specific quirks and improve over time. First-pass rates of 98%+ are now achievable." },
      { heading: "Denial prediction engines", body: "The newest category of RCM technology: tools that score each claim for denial risk before submission and recommend corrections. Early adopters are seeing 20–30% reductions in denial rates within the first 90 days." },
      { heading: "Patient payment technology", body: "Text-to-pay, online portals, and automated payment plan management have transformed patient collections. Practices using text-to-pay see 40% faster patient payments compared to paper statements alone." },
      { heading: "What matters most: the team behind the tech", body: "Technology is only as good as the people using it. At MedCare RCM Solutions, we combine best-in-class RCM technology with certified billing specialists who know how to act on the insights these tools provide." },
    ],
  },
  {
    slug: "hipaa-compliance-guide",
    category: "Compliance", categoryColor: "#E8F4FF", categoryText: "#111111",
    title: "The complete HIPAA compliance guide for medical billing teams",
    excerpt: "HIPAA violations can cost your practice hundreds of thousands of dollars. This guide covers everything your billing team needs to stay compliant in 2025.",
    date: "March 28, 2025", readTime: "9 min read", author: "MedCare RCM Team",
    image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=1400&q=85&fit=crop",
    content: [
      { heading: "HIPAA compliance is not optional — and violations are costly", body: "HIPAA penalties range from $100 to $50,000 per violation, with annual caps up to $1.9 million per violation category. Compliance isn't just good ethics — it's financial protection." },
      { heading: "Understanding PHI in billing contexts", body: "Protected Health Information (PHI) in billing includes patient names, dates of service, diagnosis codes, procedure codes, account numbers, and any combination of data that could identify a patient." },
      { heading: "Minimum necessary standard", body: "Only access, use, or disclose the minimum amount of PHI necessary to accomplish the task. Role-based access controls in your systems enforce this automatically." },
      { heading: "Business Associate Agreements (BAAs)", body: "Every vendor that handles PHI on your behalf — billing companies, clearinghouses, EHR vendors — must sign a BAA. At MedCare RCM Solutions, we sign BAAs with every client before any work begins." },
      { heading: "Encryption and secure transmission", body: "Claims and remittances transmitted electronically must be encrypted. Email is not a HIPAA-compliant transmission method for PHI unless encrypted. Use secure messaging platforms or clearinghouses." },
      { heading: "Staff training — your most important compliance tool", body: "HIPAA requires annual training for all staff who handle PHI. Training should cover what PHI is, how to handle it, breach notification requirements, and what to do if they suspect a violation." },
    ],
  },
  {
    slug: "telehealth-billing",
    category: "Industry News", categoryColor: "#FFF4E8", categoryText: "#C47A00",
    title: "Telehealth billing in 2025: what's changed and what to watch",
    excerpt: "Telehealth reimbursement rules have shifted dramatically since 2020. Here's your up-to-date guide to billing virtual visits correctly and getting paid every time.",
    date: "March 15, 2025", readTime: "7 min read", author: "MedCare RCM Team",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=85&fit=crop",
    content: [
      { heading: "Telehealth billing has never been more complex", body: "The temporary flexibilities introduced during COVID-19 have been extended, modified, and in some cases made permanent — but the rules vary by payer, state, and service type." },
      { heading: "Medicare telehealth extensions through 2025", body: "Congress extended many Medicare telehealth flexibilities through December 2025. This includes coverage for audio-only visits, mental health services without an in-person requirement, and expanded originating site rules." },
      { heading: "Place of service codes still matter", body: "Use POS 02 for telehealth from a location other than the patient's home, and POS 10 for telehealth to a patient in their home. Getting this wrong is a leading cause of telehealth claim denials." },
      { heading: "Commercial payer rules vary widely", body: "Unlike Medicare, commercial payer telehealth policies are all over the map. Some require audio-video for all visits; others cover audio-only. Verify payer-specific rules before billing." },
      { heading: "Consent documentation is critical", body: "Most states and payers require documented patient consent for telehealth services. Missing consent documentation is a growing audit target — get it right every time." },
    ],
  },
  {
    slug: "mental-health-billing",
    category: "Specialty Billing", categoryColor: "#F0E8FF", categoryText: "#6B21A8",
    title: "Mental health billing: navigating payer complexities with confidence",
    excerpt: "Mental health billing comes with unique coding challenges and payer rules. Our specialists break down how to maximize reimbursements for therapy and psychiatric services.",
    date: "March 3, 2025", readTime: "6 min read", author: "MedCare RCM Team",
    image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=1400&q=85&fit=crop",
    content: [
      { heading: "Mental health billing has its own rulebook", body: "If you're billing mental health services using the same approach as primary care, you're leaving money on the table — and probably generating denials." },
      { heading: "CPT codes specific to mental health", body: "The most commonly billed codes include 90837 (60-minute individual therapy), 90834 (45-minute), 90832 (30-minute), 90847 (family therapy with patient), and 90853 (group therapy)." },
      { heading: "The Mental Health Parity Act — know your rights", body: "The MHPAEA requires that mental health benefits be no more restrictive than medical/surgical benefits. If a payer is imposing visit limits not applied to medical services, that may be a parity violation." },
      { heading: "Prior authorization for mental health services", body: "Many commercial payers require prior authorization for ongoing therapy after an initial assessment. Build a system to track authorization limits and expiration dates." },
      { heading: "Telehealth and mental health — the best pairing", body: "Mental health is the specialty that has benefited most from telehealth expansion. Audio-only mental health visits remain covered by Medicare through 2025, and most commercial payers cover video visits at parity." },
    ],
  },
  {
    slug: "outsource-medical-billing",
    category: "Revenue Cycle", categoryColor: "#E8F9F4", categoryText: "#00875A",
    title: "In-house vs outsourced billing: which is right for your practice?",
    excerpt: "Should you keep billing in-house or hand it to experts? We break down the real costs, benefits, and hidden risks of both options so you can make the right call.",
    date: "February 20, 2025", readTime: "8 min read", author: "MedCare RCM Team",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=85&fit=crop",
    content: [
      { heading: "The honest comparison most billing articles won't give you", body: "Most articles on this topic are written by billing companies — including us. So we'll be upfront: outsourcing isn't right for every practice." },
      { heading: "The real cost of in-house billing", body: "Most practices dramatically undercount in-house billing costs. Direct costs include salaries ($40,000–$65,000+ per billing staff), benefits (30% on top), software licenses, training, and management time." },
      { heading: "What outsourcing actually costs", body: "Most RCM companies charge 3–8% of collected revenue. On $1M in annual collections, that's $30,000–$80,000 — often less than one full-time in-house biller with benefits and software." },
      { heading: "When in-house billing makes sense", body: "In-house billing can work well for very large practices (10+ providers) with dedicated billing departments, or practices with highly specialized billing needs that require deep clinical knowledge." },
      { heading: "When outsourcing wins", body: "Outsourcing consistently outperforms in-house billing for practices under 10 providers, practices with high denial rates or AR days above 45, and any practice where billing staff turnover is a recurring problem." },
      { heading: "The right questions to ask any RCM partner", body: "What is your average first-pass claim rate? How do you handle denials? What is your average AR days for clients in my specialty? Do you sign a BAA? Get answers in writing." },
    ],
  },
  {
    slug: "icd-10-coding-tips",
    category: "Coding", categoryColor: "#FFF0E8", categoryText: "#B45309",
    title: "ICD-10 coding tips that directly increase your reimbursement rate",
    excerpt: "The difference between a paid and denied claim often comes down to a single digit in your ICD-10 code. Here are the coding best practices our team swears by.",
    date: "February 8, 2025", readTime: "5 min read", author: "MedCare RCM Team",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=85&fit=crop",
    content: [
      { heading: "Coding precision is revenue precision", body: "ICD-10 has over 70,000 codes. The difference between a reimbursed claim and a denied one often comes down to specificity." },
      { heading: "Always code to the highest level of specificity", body: "Unspecified codes are red flags for payers. If a patient has Type 2 diabetes with diabetic chronic kidney disease stage 3, use E11.6522 — not E11.9 (Type 2 diabetes, unspecified)." },
      { heading: "Code all documented conditions — not just the chief complaint", body: "Secondary diagnoses that affect care or complexity should be coded. This supports medical necessity and can affect risk adjustment payments." },
      { heading: "Sequence codes correctly", body: "The principal diagnosis (listed first) must be the condition chiefly responsible for the visit or admission. Sequencing errors are a leading cause of claim denials." },
      { heading: "Watch for Medicare LCD and NCD coverage requirements", body: "Medicare Local Coverage Determinations (LCDs) specify which ICD-10 codes support coverage for specific procedures. Check LCDs before billing — not after." },
      { heading: "Use Z codes appropriately", body: "Z codes document factors influencing health status. These codes often support medical necessity and are commonly overlooked. Training your providers to document these encounters properly is a quick win." },
    ],
  },
  {
    slug: "revenue-cycle-kpis",
    category: "Analytics", categoryColor: "#E8FFF0", categoryText: "#00875A",
    title: "10 revenue cycle KPIs every practice manager must track",
    excerpt: "If you're not tracking the right KPIs, you're flying blind. These 10 metrics tell you exactly how healthy your revenue cycle is — and where to fix it fast.",
    date: "January 25, 2025", readTime: "7 min read", author: "MedCare RCM Team",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=85&fit=crop",
    content: [
      { heading: "What gets measured gets managed", body: "Most practices track revenue. Few track the leading indicators that predict revenue performance weeks before it shows up in collections." },
      { heading: "1. Days in AR", body: "Target: under 30 days. Days in AR measures how long it takes to collect payment after service. Above 35 days is a yellow flag; above 45 is a red flag." },
      { heading: "2. First-pass claim rate", body: "Target: above 95%, ideally 98%+. This is the percentage of claims paid on the first submission. Low first-pass rates indicate systemic coding or eligibility verification issues." },
      { heading: "3. Denial rate", body: "Target: under 5%. Your denial rate is the percentage of submitted claims that are denied. Track this by payer and by denial reason code to identify patterns." },
      { heading: "4. Net collection rate", body: "Target: 95–98%. This measures how much of your collectible revenue you're actually collecting. A net collection rate below 95% indicates revenue leakage." },
      { heading: "5–10. Additional KPIs to watch", body: "Also track: Charge lag (target under 2 days), Aged AR percentage (target under 15% over 90 days), Patient collection rate (target 85%+), Payer mix, and Cost to collect (target under 5% for outsourced RCM)." },
    ],
  },

  /* ══ 6 NEW POSTS (added to match the blog listing page) ══ */
  {
    slug: "patient-eligibility-verification",
    category: "Revenue Cycle", categoryColor: "#E8F9F4", categoryText: "#00875A",
    title: "Why eligibility verification is your first line of defense against denials",
    excerpt: "Nearly a quarter of all denials trace back to eligibility issues caught too late. Here's how to verify coverage before the patient even sits in the waiting room.",
    date: "July 2, 2025", readTime: "6 min read", author: "MedCare RCM Team",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=85&fit=crop",
    content: [
      { heading: "Eligibility denials are the most preventable denials in medicine", body: "Roughly 24% of all claim denials are tied to eligibility issues — coverage that lapsed, a plan that changed, or a service that wasn't covered under the patient's current plan. Unlike coding or documentation denials, these are almost entirely preventable with the right process in place." },
      { heading: "Verify 24–48 hours before the appointment, not at check-in", body: "Checking eligibility the morning of a visit leaves no time to fix a problem. Run verification 1–2 days ahead so your front desk can call the patient, confirm updated insurance, or reschedule if coverage has truly lapsed — before the appointment, not after the claim bounces." },
      { heading: "Don't just check 'active' — check the details", body: "An active plan isn't the whole story. Confirm the patient's deductible status, copay amount, whether the specific service requires prior authorization, and whether your provider is in-network for that specific plan tier. A 'yes' on eligibility can still mean 'no' on a specific service." },
      { heading: "Automate where you can, but verify the automation", body: "Automated eligibility tools can run checks on your entire schedule overnight, flagging issues before patients arrive. But automated checks fail silently sometimes — spot-check a sample of automated verifications weekly to make sure the tool itself isn't missing edge cases." },
      { heading: "Train front desk staff to ask the right follow-up questions", body: "'Do you still have the same insurance?' isn't enough. Train staff to ask about job changes, marriage, divorce, or turning 65 — all common triggers for coverage changes that patients don't think to mention unless asked directly." },
      { heading: "The payoff: fewer denials, faster payments, happier patients", body: "Practices that implement rigorous eligibility verification typically see a 60–70% reduction in eligibility-related denials within 90 days — and patients appreciate knowing their costs upfront instead of receiving a surprise bill weeks later." },
    ],
  },
  {
    slug: "appeal-letter-templates",
    category: "Denial Management", categoryColor: "#E8F4FF", categoryText: "#111111",
    title: "How to write an appeal letter that actually gets claims overturned",
    excerpt: "Most appeal letters get rejected because they restate the claim instead of arguing it. Here's the structure our team uses to win first-level appeals.",
    date: "July 14, 2025", readTime: "7 min read", author: "MedCare RCM Team",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=85&fit=crop",
    content: [
      { heading: "Most appeal letters fail before they're even read", body: "A weak appeal letter simply restates what was already submitted — same codes, same notes, no new argument. Payers reject these instantly because nothing has changed. A strong appeal makes a specific case for why the original decision was wrong, backed by something the payer didn't have the first time." },
      { heading: "Start with the denial reason code — and address it directly", body: "Open the letter by quoting the exact denial reason code and explaining precisely why it doesn't apply. If a claim was denied for 'not medically necessary,' your first paragraph should establish medical necessity in plain clinical language, not bury it on page two." },
      { heading: "Attach the documentation that was missing — or wasn't reviewed", body: "Include clinical notes, prior authorization confirmations, medical necessity letters, or peer-reviewed literature that supports the treatment. If the denial suggests the reviewer didn't have full documentation, make that gap impossible to repeat." },
      { heading: "Reference the specific policy or guideline that supports you", body: "Cite the payer's own medical policy, an LCD/NCD, or clinical practice guidelines that support the service. Appeals that reference the payer's own rulebook are far harder to deny a second time than appeals based on general clinical opinion." },
      { heading: "Keep it tight — one page, one argument, clear ask", body: "Reviewers handle dozens of appeals a day. A focused one-page letter with a clear request ('we are requesting full reimbursement of $X for CPT 99214 based on the attached documentation') outperforms a rambling three-page narrative every time." },
      { heading: "Track outcomes and refine your templates", body: "Keep a record of which appeal arguments succeeded and which didn't, by payer and by denial code. Over time this becomes a playbook — and our team's average first-level appeal success rate of 70%+ comes directly from this kind of iteration." },
    ],
  },
  {
    slug: "small-practice-billing-mistakes",
    category: "Revenue Cycle", categoryColor: "#E8F9F4", categoryText: "#00875A",
    title: "The 6 billing mistakes that quietly drain small practice revenue",
    excerpt: "Small practices lose more to silent leaks than to outright denials. We walk through the most common — and most fixable — gaps we find during audits.",
    date: "July 22, 2025", readTime: "6 min read", author: "MedCare RCM Team",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1400&q=85&fit=crop",
    content: [
      { heading: "The leaks you don't see are the ones that hurt most", body: "A denied claim is visible — it shows up in your denial report and someone has to deal with it. A silent revenue leak, like under-coding or a missed charge, never shows up anywhere. It just quietly reduces collections month after month without anyone noticing." },
      { heading: "Mistake 1: Under-coding to avoid audit risk", body: "Many small practices default to lower-complexity E&M codes out of fear of audits, even when documentation supports a higher level. This is one of the most common — and costly — patterns we find. Code to what's documented, not to what feels 'safe.'" },
      { heading: "Mistake 2: Missed charges for incidental services", body: "Vaccine administration, point-of-care testing, and minor procedures performed alongside a visit often go unbilled because they aren't part of the 'main' encounter note. A monthly charge-capture audit catches these before they become permanent losses." },
      { heading: "Mistake 3: No follow-up system for unpaid claims", body: "Small practices without dedicated billing staff often submit a claim and simply wait. Without a 14-day follow-up trigger, unpaid claims drift past 60, then 90 days — at which point recovery becomes far less likely." },
      { heading: "Mistake 4: Stale fee schedules", body: "Fee schedules that haven't been updated in 2–3 years often sit below current Medicare or commercial allowables. If you're billing below what payers will actually pay, you're capping your own revenue regardless of how clean your claims are." },
      { heading: "Mistake 5 & 6: No KPI visibility, and treating billing as 'set and forget'", body: "Without monthly visibility into clean claim rate, AR days, and denial trends, small issues compound silently for months. Billing isn't a one-time setup — it's an ongoing process that needs the same attention as patient care." },
    ],
  },
  {
    slug: "prior-authorization-workflow",
    category: "Specialty Billing", categoryColor: "#F0E8FF", categoryText: "#6B21A8",
    title: "Building a prior authorization workflow that doesn't slow your practice down",
    excerpt: "Prior auth delays are one of the top causes of patient drop-off and denied claims. Here's how to build a tracking system that catches expirations before they cost you.",
    date: "August 1, 2025", readTime: "7 min read", author: "MedCare RCM Team",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1400&q=85&fit=crop",
    content: [
      { heading: "Prior authorization is necessary — but it doesn't have to be chaotic", body: "Prior auth exists to control utilization, but for practices without a system, it becomes a source of constant fire-fighting: missed expirations, services rendered without approval, and claims denied after the fact for something that was preventable." },
      { heading: "Step 1: Identify which services actually require prior auth", body: "Not every procedure needs authorization, and payer rules change frequently. Maintain a living list, by payer, of which CPT codes in your specialty typically require prior auth — and review it quarterly, since payers update these lists without much notice." },
      { heading: "Step 2: Submit authorization requests before scheduling, not after", body: "Build prior auth into your scheduling workflow as a required step before a procedure is booked — not a parallel task someone remembers to do later. This single change eliminates the majority of 'service rendered without auth' denials." },
      { heading: "Step 3: Track authorization numbers and expiration dates centrally", body: "Authorizations have visit limits and expiration windows. A spreadsheet or PM-system tracker showing patient, authorization number, approved units, and expiration date prevents the common mistake of billing a visit after the authorization has already run out." },
      { heading: "Step 4: Build in a buffer for renewal", body: "Don't wait until the authorization expires to request a renewal. Flag authorizations 2–3 weeks before expiration so renewal requests are submitted with enough lead time to avoid a gap in covered care." },
      { heading: "Step 5: Escalate aging requests — don't just wait", body: "If a payer hasn't responded to a prior auth request within their stated turnaround time, call. Passive waiting is the single biggest reason prior auth delays drag on longer than they need to." },
    ],
  },
  {
    slug: "denial-trend-reporting",
    category: "Analytics", categoryColor: "#E8FFF0", categoryText: "#00875A",
    title: "Turning denial data into a roadmap for fewer denials next quarter",
    excerpt: "A denial report only matters if someone acts on it. Here's how we use monthly denial trend data to fix root causes instead of just resubmitting claims.",
    date: "August 12, 2025", readTime: "6 min read", author: "MedCare RCM Team",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=85&fit=crop",
    content: [
      { heading: "A denial report is data — denial trend analysis is insight", body: "Most practices generate a denial report and immediately move to resubmitting individual claims. That fixes today's problem but ignores the pattern. The real value comes from asking: why are we getting this denial repeatedly, and what process is causing it?" },
      { heading: "Group denials by reason code, not by claim", body: "Looking at 40 individual denied claims tells you very little. Grouping those same 40 claims by denial reason code (CO-4, CO-97, CO-16, etc.) usually reveals that 70% of them trace back to just 2–3 root causes — which is exactly where to focus fixes." },
      { heading: "Map each top denial code to a process owner", body: "CO-4 (missing modifier) often points to coding. CO-22 (coordination of benefits) often points to front desk intake. Assign each recurring denial category to the team or role responsible for the upstream process, not just to the billing team for resubmission." },
      { heading: "Set a monthly denial review meeting — even a short one", body: "Fifteen minutes a month reviewing the top 3 denial trends, what caused them, and what changed since last month keeps denial management proactive instead of purely reactive. Practices that skip this step tend to see the same denials recur indefinitely." },
      { heading: "Track the trend line, not just the monthly number", body: "A single month's denial rate can be noisy. What matters is the trend over 3–6 months. If a specific denial category is trending down after a process fix, that's confirmation the fix worked — if it's flat, the root cause hasn't actually been addressed yet." },
      { heading: "Use the data to prevent, not just to appeal", body: "The end goal of denial trend reporting isn't a better appeal — it's fewer denials to appeal in the first place. Practices that treat denial data as a feedback loop into their front-end processes consistently see denial rates fall well below the 5% benchmark." },
    ],
  },
  {
    slug: "medicare-advantage-billing",
    category: "Compliance", categoryColor: "#E8F4FF", categoryText: "#111111",
    title: "Medicare Advantage billing: what's different and why it trips up practices",
    excerpt: "MA plans don't follow traditional Medicare rules. Prior auth requirements, network restrictions, and appeal timelines all change — here's what to watch for.",
    date: "August 20, 2025", readTime: "8 min read", author: "MedCare RCM Team",
    image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=1400&q=85&fit=crop",
    content: [
      { heading: "Medicare Advantage is not 'just Medicare with a different card'", body: "With over half of Medicare beneficiaries now enrolled in Medicare Advantage (MA) plans, practices that treat MA claims the same as traditional Medicare run into avoidable denials. MA plans are administered by private payers and follow their own rules layered on top of CMS requirements." },
      { heading: "Prior authorization requirements are far more common", body: "Traditional Medicare requires prior auth for relatively few services. MA plans frequently require it for imaging, certain procedures, and even some routine services. Verify MA-specific prior auth requirements separately — don't assume traditional Medicare rules apply." },
      { heading: "Network restrictions actually matter here", body: "Traditional Medicare has no network in the HMO sense. Many MA plans do — HMO and even some PPO variants have network rules that affect reimbursement or coverage entirely if a provider is out-of-network. Confirm network status per plan, not just 'Medicare acceptance.'" },
      { heading: "Appeal timelines and processes differ from traditional Medicare", body: "MA plans have their own appeal deadlines and processes, separate from the traditional Medicare appeals process. Missing an MA-specific deadline because you followed the traditional Medicare timeline is a common and entirely avoidable loss." },
      { heading: "Risk adjustment documentation matters more under MA", body: "MA plans are paid based partly on risk adjustment (HCC) scores tied to documented chronic conditions. Thorough annual documentation of chronic conditions isn't just good clinical practice under MA — it directly affects how practices are evaluated and sometimes reimbursed within value-based arrangements." },
      { heading: "Build a payer-specific MA cheat sheet", body: "Because MA plan rules vary so much by carrier, maintain a simple reference sheet per major MA payer in your area covering: prior auth requirements, network rules, appeal deadlines, and claims submission addresses. This single document prevents the majority of MA-specific denials we see in audits." },
    ],
  },
];

/* ── Animated section component ── */
function AnimatedSection({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const transforms = { up: "translateY(32px)", left: "translateX(-32px)", right: "translateX(32px)", scale: "scale(0.95)" };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[direction],
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
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
    <div style={{ position: "fixed", top: 67, left: 0, right: 0, height: 3, background: "rgba(17,17,17,0.12)", zIndex: 200 }}>
      <div style={{ height: "100%", background: "linear-gradient(90deg,#111111,#111111)", width: `${progress}%`, transition: "width 0.1s linear", borderRadius: "0 2px 2px 0" }} />
    </div>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const router = useRouter();
  const post = ALL_POSTS.find(p => p.slug === slug);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  if (!post) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F0E8", padding: "120px 24px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>📭</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#111111", marginBottom: 12 }}>Article not found</h1>
            <p style={{ fontSize: 16, color: "#666666", marginBottom: 32 }}>This article doesn't exist or may have been moved.</p>
            <button onClick={() => router.push("/blog")} style={{ background: "#111111", color: "#fff", border: "none", padding: "13px 28px", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              ← Back to Blog
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const related = ALL_POSTS.filter(p => p.slug !== slug && p.category === post.category).slice(0, 3);
  const otherPosts = related.length > 0 ? related : ALL_POSTS.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <ReadingProgress />
      <main>

        {/* ── HERO ── */}
        <section style={{ paddingTop: 68, position: "relative", height: 480, overflow: "hidden" }}>
          <img
            src={post.image} alt={post.title}
            onLoad={() => setImgLoaded(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: imgLoaded ? "scale(1)" : "scale(1.08)", transition: "transform 1.2s ease", filter: imgLoaded ? "none" : "blur(4px)" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(10,22,40,0.15) 0%,rgba(10,22,40,0.72) 100%)" }} />

          {/* Hero content */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 32px 48px", maxWidth: 900, margin: "0 auto" }}>
            <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: post.categoryColor, borderRadius: 100, padding: "5px 16px", marginBottom: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: post.categoryText }}>{post.category}</span>
              </div>
            </div>
            <h1 style={{
              fontSize: "clamp(24px,4vw,44px)", fontWeight: 800, color: "#fff",
              lineHeight: 1.2, letterSpacing: -0.5, maxWidth: 820,
              opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
            }}>{post.title}</h1>
          </div>
        </section>

        {/* ── META BAR ── */}
        <section style={{
          background: "#fff", borderBottom: "1px solid rgba(17,17,17,0.1)", padding: "16px 32px",
          opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease 0.5s",
        }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#111111", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>M</div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111111" }}>{post.author}</span>
              </div>
              <span style={{ fontSize: 13, color: "#999999" }}>📅 {post.date}</span>
              <span style={{ fontSize: 13, color: "#999999" }}>⏱ {post.readTime}</span>
            </div>
            <button onClick={() => router.push("/blog")} style={{ background: "none", border: "1.5px solid rgba(17,17,17,0.25)", borderRadius: 8, padding: "7px 16px", fontSize: 13, fontWeight: 600, color: "#111111", cursor: "pointer" }}>
              ← Back to Blog
            </button>
          </div>
        </section>

        {/* ── ARTICLE BODY ── */}
        <section style={{ background: "#fff", padding: "64px 32px 80px" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>

            {/* Lead excerpt */}
            <AnimatedSection delay={0.1}>
              <p style={{ fontSize: 19, color: "#666666", lineHeight: 1.85, marginBottom: 48, paddingBottom: 40, borderBottom: "2px solid rgba(17,17,17,0.12)", fontStyle: "italic", borderLeft: "4px solid #111111", paddingLeft: 24, borderLeftStyle: "solid" }}>
                {post.excerpt}
              </p>
            </AnimatedSection>

            {/* Article sections */}
            {post.content.map((section, i) => (
              <AnimatedSection key={i} delay={0.05} direction="up">
                <div style={{ marginBottom: 48, paddingBottom: 48, borderBottom: i < post.content.length - 1 ? "1px solid rgba(17,17,17,0.08)" : "none" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "#111111", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                      <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{i + 1}</span>
                    </div>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111111", letterSpacing: -0.3, lineHeight: 1.3 }}>
                      {section.heading}
                    </h2>
                  </div>
                  <p style={{ fontSize: 16, color: "#666666", lineHeight: 1.9, paddingLeft: 48 }}>
                    {section.body}
                  </p>
                </div>
              </AnimatedSection>
            ))}

            {/* CTA box */}
            <AnimatedSection delay={0.1} direction="scale">
              <div style={{ background: "linear-gradient(135deg,#F0EBE0,#F5F0E8)", border: "1px solid rgba(17,17,17,0.2)", borderRadius: 22, padding: "40px 36px", marginTop: 24, textAlign: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle,rgba(17,17,17,0.1),transparent 70%)", pointerEvents: "none" }} />
                <div style={{ fontSize: 40, marginBottom: 14 }}>🚀</div>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: "#111111", marginBottom: 10, letterSpacing: -0.3 }}>Ready to improve your revenue cycle?</h3>
                <p style={{ fontSize: 15, color: "#666666", lineHeight: 1.7, marginBottom: 26, maxWidth: 440, margin: "0 auto 26px" }}>
                  Get a free, no-obligation audit from the MedCare RCM team. We'll show you exactly where you're losing revenue.
                </p>
                <button onClick={() => router.push("/contact")} style={{ background: "#111111", color: "#fff", border: "none", padding: "14px 30px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(17,17,17,0.3)", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(17,17,17,0.4)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(17,17,17,0.3)"; }}>
                  Get my free audit →
                </button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── RELATED / MORE ARTICLES ── */}
        <section style={{ background: "#F5F0E8", padding: "72px 32px", borderTop: "1px solid rgba(17,17,17,0.1)" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <AnimatedSection delay={0}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111111" }}>
                  {related.length > 0 ? "Related articles" : "More articles"}
                </h2>
                <button onClick={() => router.push("/blog")} style={{ background: "none", border: "none", fontSize: 14, fontWeight: 600, color: "#111111", cursor: "pointer" }}>
                  View all →
                </button>
              </div>
            </AnimatedSection>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
              {otherPosts.map((r, i) => (
                <AnimatedSection key={r.slug} delay={i * 0.1} direction="up">
                  <div
                    onClick={() => router.push(`/blog/${r.slug}`)}
                    style={{ background: "#fff", border: "1px solid rgba(17,17,17,0.12)", borderRadius: 16, overflow: "hidden", cursor: "pointer", transition: "transform 0.25s, box-shadow 0.25s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(17,17,17,0.12)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div style={{ height: 150, overflow: "hidden" }}>
                      <img src={r.image} alt={r.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                        onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                        onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                    </div>
                    <div style={{ padding: "18px 20px" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: r.categoryText, background: r.categoryColor, padding: "3px 10px", borderRadius: 100 }}>{r.category}</span>
                      <h3 style={{ fontSize: 15, fontWeight: 600, color: "#111111", marginTop: 10, lineHeight: 1.4 }}>{r.title}</h3>
                      <div style={{ fontSize: 12, color: "#999999", marginTop: 8 }}>{r.date} · {r.readTime}</div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </>
  );
}