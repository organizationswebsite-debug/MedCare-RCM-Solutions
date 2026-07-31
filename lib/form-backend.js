import fs from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";

const DATA_DIR =
  process.env.SUBMISSIONS_DIR ||
  (process.env.NODE_ENV === "production"
    ? "/tmp/medcare-rcm-submissions"
    : path.join(process.cwd(), "data", "submissions"));

function createTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });
}

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (error) {
    console.warn("Unable to create submissions directory:", error.message);
  }
}

export async function saveSubmission(kind, payload) {
  await ensureDataDir();

  const record = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    kind,
    createdAt: new Date().toISOString(),
    ...payload,
  };

  const filePath = path.join(DATA_DIR, `${kind}.jsonl`);

  try {
    await fs.appendFile(filePath, `${JSON.stringify(record)}\n`, "utf8");
    return { record, persisted: true };
  } catch (error) {
    console.warn("Unable to persist submission record:", error.message);
    return { record, persisted: false };
  }
}

export async function sendMailWithFallback({ to, replyTo, subject, html, fromName, fallbackReason }) {
  const transporter = createTransporter();

  if (!transporter) {
    return {
      sent: false,
      reason: fallbackReason || "SMTP credentials are not configured yet.",
    };
  }

  try {
    await transporter.sendMail({
      from: `${fromName} <${process.env.GMAIL_USER}>`,
      to,
      replyTo,
      subject,
      html,
    });

    return { sent: true };
  } catch (error) {
    return {
      sent: false,
      reason: error.message || "Email delivery failed.",
    };
  }
}

export async function processSubmission({
  kind,
  payload,
  fallbackMessage,
  mailJobs = [],
}) {
  const { record: saved, persisted } = await saveSubmission(kind, payload);
  const results = [];

  for (const job of mailJobs) {
    const result = await sendMailWithFallback(job);
    results.push(result);
  }

  const emailSent = results.some((result) => result.sent);

  if (!emailSent) {
    await saveSubmission(`${kind}-fallback`, {
      ...payload,
      savedId: saved.id,
      fallbackMessage,
      mailResults: results,
    });
  }

  return {
    success: true,
    stored: persisted,
    savedId: saved.id,
    emailSent,
    message: emailSent
      ? "Submission received and email sent."
      : fallbackMessage || "Submission received and stored locally.",
    fallbackUsed: !emailSent || !persisted,
  };
}
