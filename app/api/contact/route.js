// app/api/contact/route.js
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const payload = await req.json();
    const { name = "", practice = "", email = "", phone = "", service = "", message = "" } = payload;

    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.log("Contact form received without SMTP credentials", { name, email, service });
      return Response.json({ success: true, message: "Email delivery skipped because SMTP is not configured yet." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"MedCare RCM Website" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `📋 New Contact: ${name} — ${service || "General Inquiry"}`,
      html: `
        <div style="font-family:sans-serif;max-width:580px;margin:0 auto">
          <div style="background:#111111;padding:24px 28px;border-radius:12px 12px 0 0">
            <div style="display:inline-block;background:#F5E6A3;border-radius:100px;padding:4px 14px;margin-bottom:12px">
              <span style="font-size:11px;font-weight:700;color:#111">${service || "General Inquiry"}</span>
            </div>
            <h2 style="color:#fff;margin:0;font-size:18px">New Contact Form Submission</h2>
          </div>
          <div style="background:#fff;padding:24px 28px;border:1px solid rgba(0,0,0,0.08)">
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:9px 0;border-bottom:1px solid #f0f0f0;font-size:12px;color:#888;width:140px;font-weight:700;text-transform:uppercase">Name</td><td style="padding:9px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#111;font-weight:600">${name}</td></tr>
              <tr><td style="padding:9px 0;border-bottom:1px solid #f0f0f0;font-size:12px;color:#888;font-weight:700;text-transform:uppercase">Practice</td><td style="padding:9px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#111">${practice}</td></tr>
              <tr><td style="padding:9px 0;border-bottom:1px solid #f0f0f0;font-size:12px;color:#888;font-weight:700;text-transform:uppercase">Email</td><td style="padding:9px 0;border-bottom:1px solid #f0f0f0;font-size:14px"><a href="mailto:${email}">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding:9px 0;border-bottom:1px solid #f0f0f0;font-size:12px;color:#888;font-weight:700;text-transform:uppercase">Phone</td><td style="padding:9px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#111">${phone}</td></tr>` : ""}
              <tr><td style="padding:9px 0;font-size:12px;color:#888;font-weight:700;text-transform:uppercase">Service</td><td style="padding:9px 0;font-size:14px;color:#111;font-weight:700">${service || "General Inquiry"}</td></tr>
            </table>
            ${message ? `<div style="background:#F5F0E8;border-radius:10px;padding:16px 18px;margin-top:18px"><div style="font-size:11px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:8">Message</div><div style="font-size:14px;color:#333;line-height:1.7">${message}</div></div>` : ""}
          </div>
        </div>
      `,
    });

    await transporter.sendMail({
      from: `"MedCare RCM Solutions" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "We received your message — MedCare RCM Solutions",
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto">
          <div style="background:#111111;padding:24px 28px;border-radius:12px 12px 0 0">
            <h2 style="color:#F5E6A3;margin:0;font-size:18px">Thank you, ${name.split(" ")[0] || "there"}!</h2>
          </div>
          <div style="background:#fff;padding:24px 28px;border:1px solid rgba(0,0,0,0.08);border-radius:0 0 12px 12px">
            <p style="font-size:15px;color:#333;line-height:1.75">We received your message about <strong>${service || "our services"}</strong>. Our team will get back to you within <strong>2 business hours</strong>.</p>
            <div style="background:#F5F0E8;border-radius:10px;padding:14px 16px;margin:16px 0">
              <p style="font-size:13px;color:#666;margin:0">📧 <strong>Your email:</strong> ${email}<br>🏥 <strong>Practice:</strong> ${practice}</p>
            </div>
            <p style="font-size:13px;color:#888">— The MedCare RCM Team</p>
          </div>
        </div>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
