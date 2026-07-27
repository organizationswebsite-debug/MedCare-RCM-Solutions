// app/api/apply/route.js
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const name    = formData.get("name")    || "";
    const email   = formData.get("email")   || "";
    const role    = formData.get("role")    || "";
    const resume  = formData.get("resume")  || "";
    const message = formData.get("message") || "";
    const phone   = formData.get("phone")   || "";
    const file    = formData.get("file");   // the uploaded resume file

    /* ── Build transporter ── */
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,   // your Gmail address
        pass: process.env.GMAIL_PASS,   // Gmail App Password (NOT your real password)
      },
    });

    /* ── Build attachments array ── */
    const attachments = [];
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content:  buffer,
        contentType: file.type,
      });
    }

    /* ── Send email ── */
    await transporter.sendMail({
      from:    `"MedCare RCM Careers" <${process.env.GMAIL_USER}>`,
      to:      process.env.GMAIL_USER,          // your inbox
      replyTo: email,                           // reply goes to applicant
      subject: `📋 New Application: ${role} — ${name}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#F5F0E8;border-radius:16px;overflow:hidden">

          <!-- Header -->
          <div style="background:#111111;padding:28px 32px">
            <h2 style="color:#F5E6A3;margin:0;font-size:20px;font-weight:800;letter-spacing:-0.5px">
              New Job Application Received
            </h2>
            <p style="color:rgba(255,255,255,0.45);margin:6px 0 0;font-size:13px">
              MedCare RCM Solutions — Careers Portal
            </p>
          </div>

          <!-- Body -->
          <div style="padding:28px 32px;background:#fff">

            <!-- Role badge -->
            <div style="display:inline-block;background:#F5E6A3;border-radius:100px;padding:6px 16px;font-size:12px;font-weight:700;color:#111111;margin-bottom:24px;letter-spacing:0.5px">
              🎯 ${role}
            </div>

            <!-- Applicant details -->
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:13px;color:#888;font-weight:600;width:140px">Full Name</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:14px;color:#111;font-weight:600">${name}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:13px;color:#888;font-weight:600">Email</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:14px;color:#111"><a href="mailto:${email}" style="color:#111">${email}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:13px;color:#888;font-weight:600">Phone</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:14px;color:#111">${phone}</td>
              </tr>` : ""}
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:13px;color:#888;font-weight:600">Position</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:14px;color:#111;font-weight:700">${role}</td>
              </tr>
              ${resume ? `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:13px;color:#888;font-weight:600">Resume Link</td>
                <td style="padding:10px 0;border-bottom:1px solid rgba(17,17,17,0.07);font-size:14px"><a href="${resume}" style="color:#0052cc">${resume}</a></td>
              </tr>` : ""}
            </table>

            <!-- Message -->
            ${message ? `
            <div style="background:#F5F0E8;border-radius:12px;padding:18px 20px;margin-bottom:24px">
              <div style="font-size:12px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Cover Note</div>
              <p style="font-size:14px;color:#444;line-height:1.75;margin:0">${message.replace(/\n/g,"<br>")}</p>
            </div>` : ""}

            ${file && file.size > 0 ? `
            <div style="background:#E8FFF4;border:1px solid rgba(17,17,17,0.1);border-radius:12px;padding:14px 18px;display:flex;align-items:center;gap:10px">
              <span style="font-size:18px">📎</span>
              <div>
                <div style="font-size:13px;font-weight:700;color:#111">Resume Attached</div>
                <div style="font-size:12px;color:#666">${file.name}</div>
              </div>
            </div>` : `
            <div style="background:#FFF9E8;border:1px solid rgba(17,17,17,0.1);border-radius:12px;padding:14px 18px">
              <div style="font-size:13px;color:#888">⚠️ No resume file attached — applicant may have provided a link above.</div>
            </div>`}
          </div>

          <!-- Footer -->
          <div style="padding:18px 32px;background:#F5F0E8;text-align:center">
            <p style="font-size:11px;color:#999;margin:0">
              Received from MedCare RCM Solutions Careers Page · Reply directly to respond to this applicant
            </p>
          </div>
        </div>
      `,
      attachments,
    });

    /* ── Auto-reply to applicant ── */
    await transporter.sendMail({
      from:    `"MedCare RCM Solutions" <${process.env.GMAIL_USER}>`,
      to:      email,
      subject: `We received your application — ${role}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:0 auto">
          <div style="background:#111111;padding:28px 32px;border-radius:16px 16px 0 0">
            <h2 style="color:#F5E6A3;margin:0;font-size:18px;font-weight:800">Thank you, ${name.split(" ")[0]}!</h2>
          </div>
          <div style="background:#fff;padding:28px 32px;border-radius:0 0 16px 16px;border:1px solid rgba(17,17,17,0.08)">
            <p style="font-size:15px;color:#333;line-height:1.75">
              We've received your application for <strong>${role}</strong> at MedCare RCM Solutions.
            </p>
            <p style="font-size:14px;color:#555;line-height:1.75">
              Our hiring team will review your application within <strong>2 business days</strong> and follow up by email.
            </p>
            <div style="background:#F5F0E8;border-radius:10px;padding:16px 18px;margin:20px 0">
              <p style="font-size:13px;color:#666;margin:0">
                📋 <strong>Position applied for:</strong> ${role}<br>
                📧 <strong>Your email on file:</strong> ${email}
              </p>
            </div>
            <p style="font-size:13px;color:#888;line-height:1.6">
              If you have any questions in the meantime, reply directly to this email.
            </p>
            <p style="font-size:13px;color:#888;margin-top:20px">
              — The MedCare RCM Team
            </p>
          </div>
        </div>
      `,
    });

    return Response.json({ success: true });

  } catch (err) {
    console.error("Apply route error:", err);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}
