"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

const POSTS = [
  {
    slug: "reduce-claim-denials",
    category: "Denial Management",
    categoryColor: "#E8F4FF",
    categoryText: "#111111",
    title: "7 proven ways to reduce claim denials in your practice",
    excerpt: "Claim denials cost US medical practices billions every year. Here are the most effective strategies our billing specialists use to prevent denials before they happen.",
    date: "June 5, 2025",
    readTime: "6 min read",
    emoji: "🚫",
    bg: "linear-gradient(135deg,#F0EBE0 0%,#E8F7F5 100%)",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80&fit=crop",
  },
  {
    slug: "medical-billing-2025",
    category: "Industry News",
    categoryColor: "#FFF4E8",
    categoryText: "#C47A00",
    title: "Medical billing changes to know about in 2025",
    excerpt: "From updated ICD-10 codes to new Medicare reimbursement rules, here's what every practice manager needs to know heading into 2025.",
    date: "May 28, 2025",
    readTime: "5 min read",
    emoji: "📰",
    bg: "linear-gradient(135deg,#FFF8EE 0%,#FFF4E0 100%)",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80&fit=crop",
  },
  {
    slug: "ar-days-improvement",
    category: "Revenue Cycle",
    categoryColor: "#E8F9F4",
    categoryText: "#00875A",
    title: "How to get your AR days under 30 — and keep them there",
    excerpt: "High AR days mean cash flow problems. We break down the exact strategies MedCare uses to consistently keep client AR days below 30.",
    date: "May 14, 2025",
    readTime: "8 min read",
    emoji: "📈",
    bg: "linear-gradient(135deg,#E8F9F4 0%,#EAF7FF 100%)",
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&q=80&fit=crop",
  },
  {
    slug: "credentialing-mistakes",
    category: "Credentialing",
    categoryColor: "#F3E8FF",
    categoryText: "#7C3AED",
    title: "5 credentialing mistakes that delay your revenue",
    excerpt: "Credentialing errors can delay a provider's billing by weeks or months. Learn the most common mistakes and how to avoid them.",
    date: "April 30, 2025",
    readTime: "5 min read",
    emoji: "🪪",
    bg: "linear-gradient(135deg,#F3E8FF 0%,#F0EBE0 100%)",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80&fit=crop",
  },
  {
    slug: "patient-billing-collections",
    category: "Patient Billing",
    categoryColor: "#FFE8F0",
    categoryText: "#C0185B",
    title: "Improving patient collections without damaging relationships",
    excerpt: "Collecting patient balances is one of the hardest parts of running a practice. Here's how to do it effectively while preserving trust.",
    date: "April 18, 2025",
    readTime: "7 min read",
    emoji: "👤",
    bg: "linear-gradient(135deg,#FFE8F0 0%,#FFF0F5 100%)",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80&fit=crop",
  },
  {
    slug: "rcm-technology-2025",
    category: "Technology",
    categoryColor: "#E8FFF0",
    categoryText: "#00875A",
    title: "The RCM technology stack every modern practice should consider",
    excerpt: "From AI-powered claim scrubbing to automated eligibility verification, we break down the tools transforming revenue cycle management.",
    date: "April 5, 2025",
    readTime: "6 min read",
    emoji: "💻",
    bg: "linear-gradient(135deg,#E8FFF0 0%,#F0EBE0 100%)",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80&fit=crop",
  },
  {
    slug: "hipaa-compliance-guide",
    category: "Compliance",
    categoryColor: "#E8F4FF",
    categoryText: "#111111",
    title: "The complete HIPAA compliance guide for medical billing teams",
    excerpt: "HIPAA violations can cost your practice hundreds of thousands of dollars. This guide covers everything your billing team needs to stay compliant in 2025.",
    date: "March 28, 2025",
    readTime: "9 min read",
    emoji: "🔒",
    bg: "linear-gradient(135deg,#F0EBE0 0%,#F5E6A3 100%)",
    image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=600&q=80&fit=crop",
  },
  {
    slug: "telehealth-billing",
    category: "Industry News",
    categoryColor: "#FFF4E8",
    categoryText: "#C47A00",
    title: "Telehealth billing in 2025: what's changed and what to watch",
    excerpt: "Telehealth reimbursement rules have shifted dramatically since 2020. Here's your up-to-date guide to billing virtual visits correctly and getting paid every time.",
    date: "March 15, 2025",
    readTime: "7 min read",
    emoji: "📱",
    bg: "linear-gradient(135deg,#FFF8EE 0%,#F0FAFF 100%)",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&fit=crop",
  },
  {
    slug: "mental-health-billing",
    category: "Specialty Billing",
    categoryColor: "#F0E8FF",
    categoryText: "#6B21A8",
    title: "Mental health billing: navigating payer complexities with confidence",
    excerpt: "Mental health billing comes with unique coding challenges and payer rules. Our specialists break down how to maximize reimbursements for therapy and psychiatric services.",
    date: "March 3, 2025",
    readTime: "6 min read",
    emoji: "🧠",
    bg: "linear-gradient(135deg,#F0E8FF 0%,#F0EBE0 100%)",
    image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=600&q=80&fit=crop",
  },
  {
    slug: "outsource-medical-billing",
    category: "Revenue Cycle",
    categoryColor: "#E8F9F4",
    categoryText: "#00875A",
    title: "In-house vs outsourced billing: which is right for your practice?",
    excerpt: "Should you keep billing in-house or hand it to experts? We break down the real costs, benefits, and hidden risks of both options so you can make the right call.",
    date: "February 20, 2025",
    readTime: "8 min read",
    emoji: "⚖️",
    bg: "linear-gradient(135deg,#E8F9F4 0%,#FFF8EE 100%)",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80&fit=crop",
  },
  {
    slug: "icd-10-coding-tips",
    category: "Coding",
    categoryColor: "#FFF0E8",
    categoryText: "#B45309",
    title: "ICD-10 coding tips that directly increase your reimbursement rate",
    excerpt: "The difference between a paid and denied claim often comes down to a single digit in your ICD-10 code. Here are the coding best practices our team swears by.",
    date: "February 8, 2025",
    readTime: "5 min read",
    emoji: "🧾",
    bg: "linear-gradient(135deg,#FFF0E8 0%,#FFF8EE 100%)",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80&fit=crop",
  },
  {
    slug: "revenue-cycle-kpis",
    category: "Analytics",
    categoryColor: "#E8FFF0",
    categoryText: "#00875A",
    title: "10 revenue cycle KPIs every practice manager must track",
    excerpt: "If you're not tracking the right KPIs, you're flying blind. These 10 metrics tell you exactly how healthy your revenue cycle is — and where to fix it fast.",
    date: "January 25, 2025",
    readTime: "7 min read",
    emoji: "📊",
    bg: "linear-gradient(135deg,#E8FFF0 0%,#F0EBE0 100%)",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&fit=crop",
  },
  /* ── 6 NEW POSTS ── */
  {
    slug: "patient-eligibility-verification",
    category: "Revenue Cycle",
    categoryColor: "#E8F9F4",
    categoryText: "#00875A",
    title: "Why eligibility verification is your first line of defense against denials",
    excerpt: "Nearly a quarter of all denials trace back to eligibility issues caught too late. Here's how to verify coverage before the patient even sits in the waiting room.",
    date: "July 2, 2025",
    readTime: "6 min read",
    emoji: "🪪",
    bg: "linear-gradient(135deg,#E8F9F4 0%,#F0EBE0 100%)",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&fit=crop",
  },
  {
    slug: "appeal-letter-templates",
    category: "Denial Management",
    categoryColor: "#E8F4FF",
    categoryText: "#111111",
    title: "How to write an appeal letter that actually gets claims overturned",
    excerpt: "Most appeal letters get rejected because they restate the claim instead of arguing it. Here's the structure our team uses to win first-level appeals.",
    date: "July 14, 2025",
    readTime: "7 min read",
    emoji: "✉️",
    bg: "linear-gradient(135deg,#E8F4FF 0%,#F0EBE0 100%)",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80&fit=crop",
  },
  {
    slug: "small-practice-billing-mistakes",
    category: "Revenue Cycle",
    categoryColor: "#E8F9F4",
    categoryText: "#00875A",
    title: "The 6 billing mistakes that quietly drain small practice revenue",
    excerpt: "Small practices lose more to silent leaks than to outright denials. We walk through the most common — and most fixable — gaps we find during audits.",
    date: "July 22, 2025",
    readTime: "6 min read",
    emoji: "🩹",
    bg: "linear-gradient(135deg,#FFE8F0 0%,#F0EBE0 100%)",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80&fit=crop",
  },
  {
    slug: "prior-authorization-workflow",
    category: "Specialty Billing",
    categoryColor: "#F0E8FF",
    categoryText: "#6B21A8",
    title: "Building a prior authorization workflow that doesn't slow your practice down",
    excerpt: "Prior auth delays are one of the top causes of patient drop-off and denied claims. Here's how to build a tracking system that catches expirations before they cost you.",
    date: "August 1, 2025",
    readTime: "7 min read",
    emoji: "📋",
    bg: "linear-gradient(135deg,#F0E8FF 0%,#F0EBE0 100%)",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80&fit=crop",
  },
  {
    slug: "denial-trend-reporting",
    category: "Analytics",
    categoryColor: "#E8FFF0",
    categoryText: "#00875A",
    title: "Turning denial data into a roadmap for fewer denials next quarter",
    excerpt: "A denial report only matters if someone acts on it. Here's how we use monthly denial trend data to fix root causes instead of just resubmitting claims.",
    date: "August 12, 2025",
    readTime: "6 min read",
    emoji: "📉",
    bg: "linear-gradient(135deg,#E8FFF0 0%,#FFF8EE 100%)",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&fit=crop",
  },
  {
    slug: "medicare-advantage-billing",
    category: "Compliance",
    categoryColor: "#E8F4FF",
    categoryText: "#111111",
    title: "Medicare Advantage billing: what's different and why it trips up practices",
    excerpt: "MA plans don't follow traditional Medicare rules. Prior auth requirements, network restrictions, and appeal timelines all change — here's what to watch for.",
    date: "August 20, 2025",
    readTime: "8 min read",
    emoji: "🏥",
    bg: "linear-gradient(135deg,#F0EBE0 0%,#F5E6A3 100%)",
    image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=600&q=80&fit=crop",
  },
];

const CATEGORIES = [
  { label: "All", icon: "📚" },
  { label: "Denial Management", icon: "🚫" },
  { label: "Revenue Cycle", icon: "📈" },
  { label: "Credentialing", icon: "🪪" },
  { label: "Patient Billing", icon: "👤" },
  { label: "Industry News", icon: "📰" },
  { label: "Technology", icon: "💻" },
  { label: "Compliance", icon: "🔒" },
  { label: "Specialty Billing", icon: "🧠" },
  { label: "Coding", icon: "🧾" },
  { label: "Analytics", icon: "📊" },
];

function BlogCard({ post, featured = false, index = 0 }) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);

  const handleClick = () => router.push(`/blog/${post.slug}`);

  if (featured) {
    return (
      <div
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          border: "1px solid rgba(17,17,17,0.15)", borderRadius: 22,
          overflow: "hidden", cursor: "pointer",
          boxShadow: hovered ? "0 24px 64px rgba(17,17,17,0.15)" : "0 8px 40px rgba(17,17,17,0.08)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "all 0.3s ease",
        }}
        className="featured-grid"
      >
        <div style={{ position: "relative", minHeight: 340, overflow: "hidden" }}>
          {!imgErr ? (
            <img src={post.image} alt={post.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.5s ease", minHeight: 340 }}
              onError={() => setImgErr(true)} />
          ) : (
            <div style={{ width: "100%", height: "100%", minHeight: 340, background: post.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 }}>{post.emoji}</div>
          )}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,transparent 50%,rgba(255,255,255,0.04))" }} />
        </div>
        <div style={{ padding: "44px 40px", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: post.categoryText, background: post.categoryColor, padding: "4px 14px", borderRadius: 100 }}>{post.category}</span>
            <span style={{ fontSize: 11, color: "#999999", fontWeight: 600, background: "#F0EBE0", padding: "4px 10px", borderRadius: 100 }}>⭐ Featured</span>
          </div>
          <h2 style={{ fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 800, color: "#111111", lineHeight: 1.3, marginBottom: 16, letterSpacing: -0.5 }}>{post.title}</h2>
          <p style={{ fontSize: 15, color: "#666666", lineHeight: 1.8, marginBottom: 28 }}>{post.excerpt}</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", gap: 16 }}>
              <span style={{ fontSize: 12, color: "#999999" }}>📅 {post.date}</span>
              <span style={{ fontSize: 12, color: "#999999" }}>⏱ {post.readTime}</span>
            </div>
            <div style={{ background: "#111111", color: "#fff", padding: "10px 22px", borderRadius: 10, fontSize: 14, fontWeight: 700, boxShadow: "0 4px 16px rgba(17,17,17,0.28)" }}>
              Read article →
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "1px solid",
        borderColor: hovered ? "rgba(17,17,17,0.35)" : "rgba(17,17,17,0.12)",
        borderRadius: 18, overflow: "hidden", background: "#fff",
        boxShadow: hovered ? "0 20px 48px rgba(17,17,17,0.13)" : "0 2px 16px rgba(17,17,17,0.05)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.3s ease",
        display: "flex", flexDirection: "column",
        cursor: "pointer",
        animation: `fadeSlideUp 0.5s ease ${index * 0.07}s both`,
      }}
    >
      <div style={{ position: "relative", height: 200, overflow: "hidden", flexShrink: 0 }}>
        {!imgErr ? (
          <img src={post.image} alt={post.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: hovered ? "scale(1.07)" : "scale(1)", transition: "transform 0.5s ease" }}
            onError={() => setImgErr(true)} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: post.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56 }}>{post.emoji}</div>
        )}
        <div style={{ position: "absolute", top: 14, left: 14 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: post.categoryText, background: post.categoryColor, padding: "4px 12px", borderRadius: 100 }}>{post.category}</span>
        </div>
        <div style={{ position: "absolute", top: 14, right: 14 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#fff", background: "rgba(0,0,0,0.4)", padding: "4px 10px", borderRadius: 100, backdropFilter: "blur(4px)" }}>⏱ {post.readTime}</span>
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(17,17,17,0.08)", opacity: hovered ? 1 : 0, transition: "opacity 0.3s", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 100, padding: "10px 22px", fontSize: 13, fontWeight: 700, color: "#111111", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", transform: hovered ? "scale(1)" : "scale(0.85)", transition: "transform 0.3s" }}>
            Read article →
          </div>
        </div>
      </div>

      <div style={{ padding: "22px 24px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#111111", lineHeight: 1.45, marginBottom: 10 }}>{post.title}</h2>
        <p style={{ fontSize: 13, color: "#666666", lineHeight: 1.7, marginBottom: 20, flex: 1 }}>{post.excerpt}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTop: "1px solid rgba(17,17,17,0.1)" }}>
          <span style={{ fontSize: 12, color: "#999999" }}>📅 {post.date}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#111111" }}>Read more →</span>
        </div>
      </div>
    </article>
  );
}

/* ── Grovia-style pill tab bar (matches the "Built for high performance" reference) ── */
function CategoryTabBar({ activeCategory, setActiveCategory, count }) {
  return (
    <div style={{
      background: "#F0EBE0",
      border: "1px solid rgba(17,17,17,0.08)",
      borderRadius: 100,
      padding: 6,
      display: "flex",
      alignItems: "center",
      gap: 4,
      overflowX: "auto",
      maxWidth: "100%",
    }} className="tab-scroll">
      {CATEGORIES.map((c) => {
        const isActive = activeCategory === c.label;
        return (
          <button
            key={c.label}
            onClick={() => setActiveCategory(c.label)}
            style={{
              display: "flex", alignItems: "center", gap: 7,
              padding: "10px 18px",
              borderRadius: 100,
              border: "none",
              background: isActive ? "#fff" : "transparent",
              color: isActive ? "#111111" : "#666666",
              fontSize: 13.5,
              fontWeight: isActive ? 700 : 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
              boxShadow: isActive ? "0 2px 10px rgba(17,17,17,0.1)" : "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = "#111111"; }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = "#666666"; }}
          >
            <span style={{ fontSize: 14 }}>{c.icon}</span>
            <span>{c.label}</span>
            {isActive && <span style={{ fontSize: 11, opacity: 0.6 }}>({count})</span>}
          </button>
        );
      })}
    </div>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? POSTS : POSTS.filter(p => p.category === activeCategory);

  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO with background image ── */}
        <section style={{ position: "relative", padding: "140px 24px 80px", overflow: "hidden", isolation: "isolate" }} className="blog-hero">
          {/* Background image */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1554774853-b415df9eeb92?w=1600&q=80&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center 35%",
            zIndex: -2,
          }} />
          {/* Overlay — Grovia cream fading to dark, matches palette */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(160deg, rgba(245,240,232,0.95) 0%, rgba(240,235,224,0.92) 45%, rgba(17,17,17,0.6) 100%)",
            zIndex: -1,
          }} className="blog-hero-overlay" />

          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F5E6A3", border: "1px solid rgba(17,17,17,0.15)", borderRadius: 100, padding: "6px 18px", marginBottom: 20 }}>
              <span style={{ fontSize: 14 }}>📝</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#111111", letterSpacing: 1.5, textTransform: "uppercase" }}>RCM Resources & Blog</span>
            </div>
            <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, color: "#111111", letterSpacing: -1.5, marginBottom: 18, lineHeight: 1.12, textShadow: "0 2px 14px rgba(245,240,232,0.45)" }}>
              Insights that help you<br />
              <span style={{ color: "#111111" }}>get paid faster</span>
            </h1>
            <p style={{ fontSize: 18, color: "#222222", lineHeight: 1.75, maxWidth: 540, margin: "0 auto", fontWeight: 500 }}>
              Practical guides, billing updates, and expert advice from the MedCare RCM team.
            </p>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section style={{ background: "#111111", padding: "24px 32px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "center", gap: 64, flexWrap: "wrap" }}>
            {[{ val: "18", label: "Articles published" }, { val: "11", label: "Topics covered" }, { val: "Free", label: "Always free to read" }].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>{s.val}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 2, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CATEGORY TAB BAR (Grovia pill style) ── */}
        <section style={{ background: "#fff", padding: "28px 24px", borderBottom: "1px solid rgba(17,17,17,0.1)", position: "sticky", top: 67, zIndex: 50, backdropFilter: "blur(10px)" }} className="tab-bar-section">
          <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", justifyContent: "center" }}>
            <CategoryTabBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} count={filtered.length} />
          </div>
        </section>

        {/* ── FEATURED ── */}
        {activeCategory === "All" && (
          <section style={{ background: "#fff", padding: "48px 24px 0" }}>
            <div style={{ maxWidth: 1160, margin: "0 auto" }}>
              <BlogCard post={POSTS[0]} featured={true} />
            </div>
          </section>
        )}

        {/* ── GRID ── */}
        <section style={{ background: "#fff", padding: "40px 24px 96px" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto" }}>
            {activeCategory !== "All" && (
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111111" }}>{activeCategory}</h2>
                <p style={{ fontSize: 14, color: "#999999", marginTop: 4 }}>{filtered.length} article{filtered.length !== 1 ? "s" : ""}</p>
              </div>
            )}
            {activeCategory === "All" && (
              <div style={{ marginBottom: 28, marginTop: 12 }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "#111111" }}>All articles <span style={{ fontSize: 14, color: "#999999", fontWeight: 500 }}>({POSTS.length})</span></h2>
              </div>
            )}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 24 }}>
              {(activeCategory === "All" ? POSTS.slice(1) : filtered).map((p, i) => (
                <BlogCard key={p.slug} post={p} index={i} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "80px 24px" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#111111", marginBottom: 8 }}>No articles in this category yet</h3>
                <p style={{ fontSize: 15, color: "#999999" }}>Check back soon — we publish new content every week.</p>
              </div>
            )}
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section style={{ background: "linear-gradient(160deg,#F0EBE0,#F5F0E8)", padding: "80px 24px", borderTop: "1px solid rgba(17,17,17,0.1)" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>📬</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 800, color: "#111111", letterSpacing: -0.5, marginBottom: 12 }}>Get RCM insights in your inbox</h2>
            <p style={{ fontSize: 15, color: "#666666", lineHeight: 1.7, marginBottom: 28 }}>Join 2,000+ practice managers who get our weekly billing tips — free.</p>
            <div style={{ display: "flex", gap: 10, maxWidth: 440, margin: "0 auto" }} className="newsletter-row">
              <input type="email" placeholder="Enter your email address"
                style={{ flex: 1, padding: "13px 18px", border: "1.5px solid rgba(17,17,17,0.2)", borderRadius: 10, fontSize: 14, outline: "none", fontFamily: "inherit", color: "#111111" }} />
              <button style={{ background: "#111111", color: "#fff", border: "none", padding: "13px 22px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(17,17,17,0.28)" }}>
                Subscribe →
              </button>
            </div>
            <p style={{ fontSize: 11, color: "#999999", marginTop: 12 }}>No spam. Unsubscribe anytime.</p>
          </div>
        </section>

      </main>
      <Footer />
      <style>{`
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @media (max-width: 768px) { .featured-grid { grid-template-columns: 1fr !important; } }

        /* Tab bar scrolls horizontally on mobile instead of wrapping/breaking */
        .tab-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .tab-scroll::-webkit-scrollbar { display: none; }

        @media (max-width: 768px) {
          .blog-hero { padding: 120px 20px 56px !important; }
          .blog-hero-overlay {
            background: linear-gradient(180deg, rgba(245,240,232,0.97) 0%, rgba(245,240,232,0.94) 60%, rgba(17,17,17,0.62) 100%) !important;
          }
          .tab-bar-section { padding: 20px 16px !important; }
          .newsletter-row { flex-direction: column !important; }
        }
        @media (max-width: 480px) {
          .blog-hero { padding: 110px 16px 48px !important; }
        }
      `}</style>
    </>
  );
}