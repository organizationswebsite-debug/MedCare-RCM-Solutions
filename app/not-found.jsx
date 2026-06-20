import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F0EBE0", padding: "120px 24px" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 72, fontWeight: 700, color: "#D6E4F0", letterSpacing: "-3px", marginBottom: 8 }}>404</div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#0D1B2A", marginBottom: 12 }}>Page not found</h1>
          <p style={{ fontSize: 16, color: "#666666", marginBottom: 32 }}>The page you're looking for doesn't exist or has been moved.</p>
          <Link href="/" style={{ background: "#111111", color: "#fff", padding: "13px 28px", borderRadius: 10, fontSize: 15, fontWeight: 600 }}>
            Back to home →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
