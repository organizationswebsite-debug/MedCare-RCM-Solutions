// app/api/pricing-inquiry/route.js
// Receives pricing plan requests from the home page modal
// Sends formatted email to your inbox + auto-reply to the prospect

import { processSubmission } from "@/lib/form-backend";

export async function POST(req) {
  try {
    const { name, practice, email, phone, revenue, volume, message, plan, rate } = await req.json();

    const result = await processSubmission({
      kind: "pricing-inquiry",
      payload: { name, practice, email, phone, revenue, volume, message, plan, rate },
      fallbackMessage: "Pricing inquiry received and saved locally because email delivery is not configured yet.",
      mailJobs: [
        {
          to: process.env.GMAIL_USER || email,
          replyTo: email,
          subject: `💰 New Pricing Inquiry: ${plan} Plan (${rate}) — ${name} · ${practice}`,
          html: `
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#F5F0E8;border-radius:16px;overflow:hidden">
              <div style="background:#111111;padding:28px 32px">
                <div style="display:inline-block;background:#F5E6A3;border-radius:100px;padding:5px 16px;margin-bottom:14px">
                  <span style="font-size:12px;font-weight:700;color:#111111">${plan} Plan · ${rate} of collections</span>
                </div>
                <h2 style="color:#ffffff;margin:0;font-size:20px;font-weight:800">New Pricing Inquiry Received</h2>
                <p style="color:rgba(255,255,255,0.45);margin:6px 0 0;font-size:13px">MedCare RCM Solutions — Pricing Modal</p>
              </div>
              <div style="padding:28px 32px;background:#fff">
                <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
                  <tr><td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:12px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;width:160px">Full Name</td><td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:14px;color:#111;font-weight:600">${name}</td></tr>
                  <tr><td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:12px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Practice</td><td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:14px;color:#111;font-weight:600">${practice}</td></tr>
                  <tr><td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:12px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Email</td><td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:14px"><a href="mailto:${email}" style="color:#111">${email}</a></td></tr>
                  ${phone ? `<tr><td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:12px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Phone</td><td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:14px;color:#111">${phone}</td></tr>` : ""}
                  <tr><td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:12px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Monthly Revenue</td><td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:14px;color:#111;font-weight:700">${revenue || "Not specified"}</td></tr>
                  <tr><td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:12px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Volume Range</td><td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:14px;color:#111">${volume || "Not specified"}</td></tr>
                  <tr><td style="padding:10px 0;font-size:12px;color:#888;font-weight:700;text-transform:uppercase;letter-spacing:0.5px">Plan Selected</td><td style="padding:10px 0;font-size:14px;color:#111;font-weight:800">${plan} Plan — ${rate} of collections</td></tr>
                </table>
                ${message ? `<div style="background:#F5F0E8;border-radius:12px;padding:18px 20px;margin-bottom:8px"><div style="font-size:11px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Message / Billing Challenges</div><p style="font-size:14px;color:#444;line-height:1.75;margin:0">${message.replace(/\n/g,"<br>")}</p></div>` : ""}
              </div>
              <div style="padding:16px 32px;background:#F5F0E8;text-align:center"><p style="font-size:11px;color:#999;margin:0">Reply directly to this email to respond to ${name} · MedCare RCM Solutions</p></div>
            </div>
          `,
          fromName: "MedCare RCM Website",
          fallbackReason: "SMTP credentials are not configured yet.",
        },
        {
          to: email,
          replyTo: email,
          subject: `We received your request — ${plan} Plan · MedCare RCM`,
          html: `
            <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto">
              <div style="background:#111111;padding:28px 32px;border-radius:16px 16px 0 0"><div style="display:inline-block;background:#F5E6A3;border-radius:100px;padding:5px 14px;margin-bottom:14px"><span style="font-size:11px;font-weight:700;color:#111111">${plan} Plan · ${rate}</span></div><h2 style="color:#ffffff;margin:0;font-size:19px;font-weight:800">Thank you, ${name.split(" ")[0]}!</h2></div>
              <div style="background:#fff;padding:28px 32px;border-radius:0 0 16px 16px;border:1px solid rgba(17,17,17,0.08)">
                <p style="font-size:15px;color:#333;line-height:1.75">We've received your request for the <strong>${plan} Plan (${rate} of collections)</strong> at MedCare RCM Solutions.</p>
                <p style="font-size:14px;color:#555;line-height:1.75">A certified billing specialist will contact you at this email within <strong>2 business hours</strong> to discuss your practice needs and begin your <strong>free billing audit</strong>.</p>
                <div style="background:#F5F0E8;border-radius:12px;padding:16px 18px;margin:20px 0"><p style="font-size:13px;color:#666;margin:0;line-height:1.7">📋 <strong>Plan selected:</strong> ${plan} — ${rate} of collections<br>🏥 <strong>Practice:</strong> ${practice}<br>📧 <strong>Your email:</strong> ${email}${revenue ? `<br>💰 <strong>Monthly revenue:</strong> ${revenue}` : ""}</p></div>
                <p style="font-size:13px;color:#888;line-height:1.6">If you have any questions before then, reply directly to this email.</p>
                <p style="font-size:13px;color:#888;margin-top:20px">— The MedCare RCM Team</p>
              </div>
            </div>
          `,
          fromName: "MedCare RCM Solutions",
          fallbackReason: "SMTP credentials are not configured yet.",
        },
      ],
    });

    return Response.json(result);
  } catch (err) {
    console.error("Pricing inquiry error:", err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
