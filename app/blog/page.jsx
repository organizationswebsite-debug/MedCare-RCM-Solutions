"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { POSTS } from "./posts";

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
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          border: "1px solid rgba(17,17,17,0.15)",
          borderRadius: 22,
          overflow: "hidden",
          cursor: "pointer",
          boxShadow: hovered ? "0 24px 64px rgba(17,17,17,0.15)" : "0 8px 40px rgba(17,17,17,0.08)",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          transition: "all 0.3s ease",
        }}
        className="featured-grid"
      >
        <div style={{ position: "relative", minHeight: 340, overflow: "hidden" }}>
          <img
            loading="lazy"
            src={post.image}
            alt={post.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: imgErr ? "none" : "block",
              transform: hovered ? "scale(1.05)" : "scale(1)",
              transition: "transform 0.5s ease",
              minHeight: 340,
            }}
            onError={() => setImgErr(true)}
          />
          <div
            style={{
              width: "100%",
              height: "100%",
              minHeight: 340,
              background: post.bg,
              display: imgErr ? "flex" : "none",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 80,
            }}
          >
            {post.emoji}
          </div>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,transparent 50%,rgba(255,255,255,0.04))" }} />
        </div>
        <div style={{ padding: "44px 40px", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: post.categoryText, background: post.categoryColor, padding: "4px 14px", borderRadius: 100 }}>
              {post.category}
            </span>
            <span style={{ fontSize: 11, color: "#999999", fontWeight: 600, background: "#F0EBE0", padding: "4px 10px", borderRadius: 100 }}>
              ⭐ Featured
            </span>
          </div>
          <h2 style={{ fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 800, color: "#111111", lineHeight: 1.3, marginBottom: 16, letterSpacing: -0.5 }}>
            {post.title}
          </h2>
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
        borderRadius: 18,
        overflow: "hidden",
        background: "#fff",
        boxShadow: hovered ? "0 20px 48px rgba(17,17,17,0.13)" : "0 2px 16px rgba(17,17,17,0.05)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        animation: `fadeSlideUp 0.5s ease ${index * 0.07}s both`,
      }}
    >
      <div style={{ position: "relative", height: 200, overflow: "hidden", flexShrink: 0 }}>
        <img
          loading="lazy"
          src={post.image}
          alt={post.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: imgErr ? "none" : "block", transform: hovered ? "scale(1.07)" : "scale(1)", transition: "transform 0.5s ease" }}
          onError={() => setImgErr(true)}
        />
        <div style={{ width: "100%", height: "100%", background: post.bg, display: imgErr ? "flex" : "none", alignItems: "center", justifyContent: "center", fontSize: 56 }}>
          {post.emoji}
        </div>
        <div style={{ position: "absolute", top: 14, left: 14 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: post.categoryText, background: post.categoryColor, padding: "4px 12px", borderRadius: 100 }}>
            {post.category}
          </span>
        </div>
        <div style={{ position: "absolute", top: 14, right: 14 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "#fff", background: "rgba(0,0,0,0.4)", padding: "4px 10px", borderRadius: 100, backdropFilter: "blur(4px)" }}>
            ⏱ {post.readTime}
          </span>
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

function CategoryTabBar({ activeCategory, setActiveCategory, count }) {
  return (
    <div
      style={{
        background: "#F0EBE0",
        border: "1px solid rgba(17,17,17,0.08)",
        borderRadius: 100,
        padding: 6,
        display: "flex",
        alignItems: "center",
        gap: 4,
        overflowX: "auto",
        maxWidth: "100%",
      }}
      className="tab-scroll"
    >
      {CATEGORIES.map((c) => {
        const isActive = activeCategory === c.label;
        return (
          <button
            key={c.label}
            onClick={() => setActiveCategory(c.label)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
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
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.color = "#111111";
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.color = "#666666";
            }}
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
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const filtered = activeCategory === "All" ? POSTS : POSTS.filter((p) => p.category === activeCategory);
  const featuredPost = POSTS[0];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setFeedback({ type: "error", message: "Please enter your email address." });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFeedback({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    setIsSubmitting(true);
    setFeedback({ type: "", message: "" });

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmedEmail }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Unable to subscribe right now.");
      }
      setEmail("");
      setFeedback({ type: "success", message: "Thanks — you’re on the list for fresh RCM insights." });
    } catch (error) {
      setFeedback({ type: "error", message: error.message || "Please try again in a moment." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <section
          style={{
            position: "relative",
            padding: "140px 24px 80px",
            overflow: "hidden",
            isolation: "isolate",
            backgroundImage: `url(https://media.licdn.com/dms/image/v2/D5612AQHE03yZfv7iDA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1722700881001?e=2147483647&v=beta&t=IoYAYPenV7jONWhbN0j0hXjWCdJ5GJVI4bSB-Ps-xRI)`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
          className="blog-hero"
        >
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.14)", zIndex: -2 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(245,240,232,0.92) 0%, rgba(240,235,224,0.88) 45%, rgba(17,17,17,0.62) 100%)", zIndex: -1 }} className="blog-hero-overlay" />
          <div style={{ maxWidth: 720, textAlign: "left", position: "relative" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F5E6A3", border: "1px solid rgba(17,17,17,0.15)", borderRadius: 100, padding: "6px 18px", marginBottom: 20 }}>
              <span style={{ fontSize: 14 }}>📝</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#111111", letterSpacing: 1.5, textTransform: "uppercase" }}>RCM Resources & Blog</span>
            </div>
            <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, color: "#111111", letterSpacing: -1.5, marginBottom: 18, lineHeight: 1.12, textShadow: "0 2px 14px rgba(245,240,232,0.45)" }}>
              Insights that help you<br />
              <span style={{ color: "#111111" }}>get paid faster</span>
            </h1>
            <p style={{ fontSize: 18, color: "#222222", lineHeight: 1.75, maxWidth: 540, margin: "0", fontWeight: 500 }}>
              Practical guides, billing updates, and expert advice from the MedCare RCM team.
            </p>
          </div>
        </section>
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
        <section style={{ background: "#fff", padding: "28px 24px", borderBottom: "1px solid rgba(17,17,17,0.1)", position: "sticky", top: 67, zIndex: 50, backdropFilter: "blur(10px)" }} className="tab-bar-section">
          <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", justifyContent: "center" }}>
            <CategoryTabBar activeCategory={activeCategory} setActiveCategory={setActiveCategory} count={filtered.length} />
          </div>
        </section>
        {activeCategory === "All" && (
          <section style={{ background: "#fff", padding: "48px 24px 0" }}>
            <div style={{ maxWidth: 1160, margin: "0 auto" }}>
              <BlogCard post={POSTS[0]} featured={true} />
            </div>
          </section>
        )}
        <section style={{ background: "#fff", padding: "40px 24px 96px" }}>
          <div style={{ maxWidth: 1160, margin: "0 auto" }}>
            {activeCategory !== "All" ? (
              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111111" }}>{activeCategory}</h2>
                <p style={{ fontSize: 14, color: "#999999", marginTop: 4 }}>{filtered.length} article{filtered.length !== 1 ? "s" : ""}</p>
              </div>
            ) : (
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
        <section style={{ background: "linear-gradient(160deg,#F0EBE0,#F5F0E8)", padding: "80px 24px", borderTop: "1px solid rgba(17,17,17,0.1)" }}>
          <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>📬</div>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 800, color: "#111111", letterSpacing: -0.5, marginBottom: 12 }}>Get RCM insights in your inbox</h2>
            <p style={{ fontSize: 15, color: "#666666", lineHeight: 1.7, marginBottom: 28 }}>Join 2,000+ practice managers who get our weekly billing tips — free.</p>
            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: 10, maxWidth: 440, margin: "0 auto" }} className="newsletter-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                disabled={isSubmitting}
                style={{ flex: 1, padding: "13px 18px", border: "1.5px solid rgba(17,17,17,0.2)", borderRadius: 10, fontSize: 14, outline: "none", fontFamily: "inherit", color: "#111111" }}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                style={{ background: isSubmitting ? "#666666" : "#111111", color: "#fff", border: "none", padding: "13px 22px", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: isSubmitting ? "default" : "pointer", whiteSpace: "nowrap", boxShadow: "0 4px 16px rgba(17,17,17,0.28)" }}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe →"}
              </button>
            </form>
            {feedback.message ? (
              <p style={{ fontSize: 12, marginTop: 12, color: feedback.type === "success" ? "#0f766e" : "#b91c1c" }}>{feedback.message}</p>
            ) : (
              <p style={{ fontSize: 11, color: "#999999", marginTop: 12 }}>No spam. Unsubscribe anytime.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <style>{`
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @media (max-width: 768px) { .featured-grid { grid-template-columns: 1fr !important; } }
        .tab-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .tab-scroll::-webkit-scrollbar { display: none; }
        @media (max-width: 768px) {
          .blog-hero { padding: 120px 20px 56px !important; }
          .blog-hero-overlay { background: linear-gradient(180deg, rgba(245,240,232,0.97) 0%, rgba(245,240,232,0.94) 60%, rgba(17,17,17,0.62) 100%) !important; }
          .tab-bar-section { padding: 20px 16px !important; }
          .newsletter-row { flex-direction: column !important; }
        }
        @media (max-width: 480px) { .blog-hero { padding: 110px 16px 48px !important; } }
      `}</style>
    </>
  );
}
