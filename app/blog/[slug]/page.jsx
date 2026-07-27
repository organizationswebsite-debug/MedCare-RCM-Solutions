import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogImage from "@/app/blog/BlogImage";
import { POSTS } from "@/app/blog/posts";

const ARTICLE_DATA = {
  "reduce-claim-denials": {
    intro: "Denied claims drain revenue, cash flow, and clinician confidence. This article gives you the precise upstream fixes your team can deploy today so denials become a rare exception instead of a recurring crisis.",
    sections: [
      {
        title: "Pinpoint the denial pattern before it becomes a trend",
        body: "Most denials are not random. They land in clusters around payer type, service line, or documentation gaps. The first premium move is to segment denials by root cause, then fix the most expensive pattern first.",
        bullets: [
          "Track denials by payer and denial reason code",
          "Score each denial by lost revenue and rework cost",
          "Automate alerts for repeat payer rejections",
        ],
      },
      {
        title: "Scrub claims with surgical precision",
        body: "A high-value claim scrub removes errors before a claim ever reaches the clearinghouse. Use the right combination of logic rules, front-end edits, and specialist review to eliminate common coding and eligibility failures.",
        bullets: [
          "Validate patient eligibility and payer contract details before billing",
          "Apply advanced code edits for modifiers, units, and NCCI rules",
          "Embed a second clinical quality review for high-risk specialties",
        ],
      },
      {
        title: "Turn denials into recoveries with a premium appeals workflow",
        body: "Winning appeals requires speed and clarity. Build a workflow that escalates the freshest denials, documents the medical necessity story, and keeps providers aligned with what payers want to see.",
        bullets: [
          "Create a denial dashboard with age, reason, and action date",
          "Standardize appeal language for the top 5 denial codes",
          "Enable a fast-track path for denials worth 3x the average revenue",
        ],
      },
    ],
    takeaways: [
      "Denials are predictable, not inevitable.",
      "Fix the root cause with payer-specific denial analytics.",
      "Use an appeals workflow designed around speed and revenue." ,
    ],
    stats: [
      { label: "First-pass claim rate", value: "98%" },
      { label: "Denial reduction target", value: "65%" },
      { label: "Cash flow impact", value: "$80k+" },
    ],
    cta: "Want this process built for your practice? Our team can benchmark your claims, stop the leaks, and recover revenue fast.",
  },
};

function getArticleData(slug) {
  const data = ARTICLE_DATA[slug];
  if (data) return data;

  return {
    intro: "This premium article walks you through the highest-impact revenue cycle strategies for modern practices — with clear steps, smart metrics, and a process that scales.",
    sections: [
      {
        title: "Why this topic matters now",
        body: "Healthcare revenue cycles are more complex than ever. Premium practices win by turning every operational gap into a measurable opportunity rather than an expense.",
        bullets: [
          "Capture revenue before claims hit the payer",
          "Reduce manual rework with automation rules",
          "Build visibility into denials, AR, and collections",
        ],
      },
      {
        title: "How to turn insight into action",
        body: "The difference between good and great is execution. Use this framework to move from analysis to team-level execution with clarity, ownership, and speed.",
        bullets: [
          "Define the top 3 KPIs for your billing team",
          "Align coding, operations, and provider teams on the same goals",
          "Review performance weekly with a clean dashboard",
        ],
      },
      {
        title: "What premium billing teams do differently",
        body: "Premium teams treat revenue as a continuous system, not a monthly project. That means constant tuning, rapid feedback loops, and a relentless focus on cash flow quality.",
        bullets: [
          "Update rules as payer edits change",
          "Automate patient eligibility and benefit verification",
          "Track recoverables by specialty and payer mix",
        ],
      },
    ],
    takeaways: [
      "Premium RCM is repeatable, not random.",
      "Build a denial prevention system, not just a reaction team.",
      "Measure progress with the right revenue cycle KPIs.",
    ],
    stats: [
      { label: "Premium insight score", value: "92" },
      { label: "Action plan clarity", value: "4 steps" },
      { label: "ROI focus", value: "3x" },
    ],
    cta: "Ready to craft a practice-specific revenue recovery plan? Our experts are already doing it for practices like yours.",
  };
}

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export default function BlogArticlePage({ params }) {
  const post = POSTS.find((item) => item.slug === params.slug);
  if (!post) notFound();

  const data = getArticleData(post.slug);
  const related = POSTS.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="blog-article-page" style={{ background: "#F5F0E8", color: "#111111" }}>
        <section style={{ position: "relative", overflow: "hidden", padding: "120px 24px 80px", background: "radial-gradient(circle at top left, rgba(245,234,163,0.32), transparent 20%), radial-gradient(circle at top right, rgba(17,17,17,0.12), transparent 22%), #F5F0E8" }}>
          <div style={{ position: "absolute", inset: 0, opacity: 0.18, background: "linear-gradient(120deg, rgba(245,230,163,0.35) 0%, rgba(245,230,163,0) 45%, rgba(17,17,17,0.09) 100%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "50%", left: "-120px", width: 320, height: 320, borderRadius: "50%", background: "rgba(245,230,163,0.22)" }} />
          <div style={{ position: "absolute", bottom: "-90px", right: "-90px", width: 320, height: 320, borderRadius: "50%", background: "rgba(17,17,17,0.05)" }} />
          <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, alignItems: "start" }}>
            <div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10, background: post.categoryColor, color: post.categoryText, padding: "10px 18px", borderRadius: 999, fontSize: 13, fontWeight: 700, marginBottom: 24, letterSpacing: "0.05em" }}>
                {post.category}
              </span>
              <h1 style={{ fontSize: "clamp(38px,5vw,62px)", lineHeight: 1.02, margin: 0, letterSpacing: "-1px", maxWidth: 760, marginBottom: 24 }}>
                {post.title}
              </h1>
              <p style={{ fontSize: 18, lineHeight: 1.8, maxWidth: 720, marginBottom: 30, color: "#333333" }}>
                {post.excerpt}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, color: "#555555", fontSize: 13, fontWeight: 600 }}>
                <span style={{ background: "rgba(255,255,255,0.9)", padding: "10px 14px", borderRadius: 999, border: "1px solid rgba(17,17,17,0.08)" }}>📅 {post.date}</span>
                <span style={{ background: "rgba(255,255,255,0.9)", padding: "10px 14px", borderRadius: 999, border: "1px solid rgba(17,17,17,0.08)" }}>⏱ {post.readTime}</span>
                <span style={{ background: "rgba(255,255,255,0.9)", padding: "10px 14px", borderRadius: 999, border: "1px solid rgba(17,17,17,0.08)" }}>{post.emoji}</span>
              </div>
            </div>
            <aside style={{ position: "sticky", top: 100, alignSelf: "start" }}>
              <div style={{ borderRadius: 30, padding: "28px", background: "rgba(255,255,255,0.88)", boxShadow: "0 32px 80px rgba(17,17,17,0.08)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.7)" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 22, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#666666" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#F5E6A3" }} />
                  Premium insight
                </div>
                <p style={{ color: "#111111", fontSize: 16, fontWeight: 600, lineHeight: 1.7, marginBottom: 24 }}>
                  {data.cta}
                </p>
                <div style={{ display: "grid", gap: 18 }}>
                  {data.stats.map((item) => (
                    <div key={item.label} style={{ display: "grid", gap: 6 }}>
                      <span style={{ fontSize: 15, color: "#999999", textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</span>
                      <strong style={{ fontSize: 28, color: "#111111", display: "block" }}>{item.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px 80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 32 }}>
            <article style={{ padding: "32px 0 0", position: "relative" }}>
              <div style={{ borderRadius: 32, overflow: "hidden", boxShadow: "0 30px 90px rgba(17,17,17,0.12)" }}>
                <BlogImage src={post.image} alt={post.title} bg={post.bg} emoji={post.emoji} imgStyle={{ width: "100%", display: "block", objectFit: "cover", aspectRatio: "16 / 10" }} />
              </div>
              <div style={{ marginTop: 28, display: "grid", gap: 28 }}>
                <div style={{ display: "grid", gap: 18, background: "#fff", borderRadius: 32, padding: "32px 34px", boxShadow: "0 18px 48px rgba(17,17,17,0.05)" }}>
                  <p style={{ fontSize: 17, lineHeight: 1.9, color: "#444444" }}>{data.intro}</p>
                  <div style={{ display: "grid", gap: 20 }}>
                    {data.sections.map((section) => (
                      <div key={section.title} style={{ display: "grid", gap: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 42, height: 42, borderRadius: 18, background: "#F5E6A3", display: "grid", placeItems: "center", color: "#111111", fontWeight: 800, fontSize: 18 }}>✓</div>
                          <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, lineHeight: 1.2 }}>{section.title}</h2>
                        </div>
                        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.85, color: "#555555" }}>{section.body}</p>
                        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 10 }}>
                          {section.bullets.map((item) => (
                            <li key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                              <span style={{ width: 20, height: 20, minWidth: 20, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#111111", color: "#F5E6A3", borderRadius: 999, fontSize: 12, marginTop: 3 }}>•</span>
                              <span style={{ fontSize: 15, color: "#4A4A4A", lineHeight: 1.75 }}>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
                  <div style={{ background: "#111111", color: "#fff", borderRadius: 28, padding: "28px", boxShadow: "0 22px 50px rgba(17,17,17,0.15)" }}>
                    <p style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: "0.24em", color: "#F5E6A3", marginBottom: 14 }}>Fast track</p>
                    <h3 style={{ margin: 0, fontSize: 20, lineHeight: 1.3 }}>The premium billing edge</h3>
                    <p style={{ marginTop: 14, color: "rgba(255,255,255,0.78)", lineHeight: 1.8, fontSize: 14 }}>Build systems that detect denials early and convert them into cash without extra provider work.</p>
                  </div>
                  <div style={{ background: "linear-gradient(180deg,#F5E6A3,#F0EBE0)", borderRadius: 28, padding: "28px", boxShadow: "0 22px 50px rgba(17,17,17,0.08)" }}>
                    <p style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: "0.22em", color: "#111111", marginBottom: 14 }}>Your first move</p>
                    <h3 style={{ margin: 0, fontSize: 20, lineHeight: 1.3, color: "#111111" }}>Measure before you fix</h3>
                    <p style={{ marginTop: 14, color: "#333333", lineHeight: 1.8, fontSize: 14 }}>A denial without a revenue score is just noise. Score it by dollars, frequency, and payer risk.</p>
                  </div>
                </div>
              </div>
            </article>

            <aside style={{ display: "grid", gap: 24, paddingTop: 16 }}>
              <div style={{ position: "sticky", top: 120, display: "grid", gap: 20 }}>
                <div style={{ background: "#111111", color: "#fff", borderRadius: 30, padding: "28px", boxShadow: "0 20px 60px rgba(17,17,17,0.14)" }}>
                  <div style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", opacity: 0.75, marginBottom: 16 }}>Quick takeaways</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 16 }}>
                    {data.takeaways.map((item) => (
                      <li key={item} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                        <span style={{ width: 10, height: 10, marginTop: 6, borderRadius: "50%", background: "#F5E6A3" }} />
                        <span style={{ fontSize: 14, lineHeight: 1.8, color: "#F5F5F5" }}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ background: "#fff", borderRadius: 30, border: "1px solid rgba(17,17,17,0.08)", padding: "28px", boxShadow: "0 18px 40px rgba(17,17,17,0.06)" }}>
                  <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#999999", marginBottom: 12 }}>Need expert help?</div>
                  <h3 style={{ fontSize: 20, lineHeight: 1.25, margin: 0 }}>Talk to our RCM specialists.</h3>
                  <p style={{ marginTop: 14, fontSize: 14, lineHeight: 1.8, color: "#555555" }}>We’ll audit your current workflow, identify the most expensive revenue leaks, and hand you a premium recovery plan.</p>
                  <a href="/contact" style={{ display: "inline-flex", marginTop: 22, alignItems: "center", justifyContent: "center", background: "#111111", color: "#fff", borderRadius: 999, padding: "14px 20px", fontWeight: 700, textDecoration: "none", boxShadow: "0 12px 30px rgba(17,17,17,0.16)" }}>Book a free audit</a>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section style={{ padding: "48px 24px 120px", background: "radial-gradient(circle at top, rgba(245,230,163,0.18), transparent 35%), #F5F0E8" }}>
          <div style={{ maxWidth: 1180, margin: "0 auto" }}>
            <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: "#999999", marginBottom: 10 }}>Explore related stories</div>
                <h2 style={{ fontSize: "clamp(26px,3vw,36px)", margin: 0, lineHeight: 1.15 }}>More premium RCM thinking</h2>
              </div>
              <a href="/blog" style={{ color: "#111111", fontSize: 14, fontWeight: 700, textDecoration: "none" }}>View full blog →</a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24 }}>
              {related.map((item) => (
                <a key={item.slug} href={`/blog/${item.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <article style={{ borderRadius: 28, overflow: "hidden", background: "#ffffff", boxShadow: "0 24px 80px rgba(17,17,17,0.08)", transform: "translateZ(0)", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}>
                    <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                      <img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.45s ease" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,0.35) 100%)" }} />
                      <div style={{ position: "absolute", left: 20, bottom: 20, right: 20 }}>
                        <span style={{ display: "inline-flex", padding: "6px 12px", borderRadius: 999, background: "rgba(245,230,163,0.96)", fontSize: 11, fontWeight: 700, color: "#111111" }}>{item.category}</span>
                      </div>
                    </div>
                    <div style={{ padding: "24px" }}>
                      <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>{item.emoji}</div>
                      <h3 style={{ fontSize: 20, margin: "0 0 14px", lineHeight: 1.25 }}>{item.title}</h3>
                      <p style={{ fontSize: 14, color: "#666666", lineHeight: 1.75, margin: 0 }}>{item.excerpt}</p>
                      <div style={{ marginTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center", color: "#999999", fontSize: 13 }}>
                        <span>Read more →</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </article>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
