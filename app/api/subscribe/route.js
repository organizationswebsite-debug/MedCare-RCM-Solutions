import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const trimmedEmail = (email || "").trim();

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return Response.json({ success: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"MedCare RCM Newsletter" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: trimmedEmail,
      subject: `New blog subscriber: ${trimmedEmail}`,
      html: `<p>A new blog subscriber joined the newsletter:</p><p><strong>${trimmedEmail}</strong></p>`,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Subscribe route error:", error);
    return Response.json({ success: false, error: error.message || "Failed to subscribe." }, { status: 500 });
  }
}
