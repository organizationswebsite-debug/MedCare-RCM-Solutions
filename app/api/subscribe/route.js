import { processSubmission } from "@/lib/form-backend";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const trimmedEmail = (email || "").trim();

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return Response.json({ success: false, error: "Please enter a valid email address." }, { status: 400 });
    }

    const result = await processSubmission({
      kind: "subscribe",
      payload: { email: trimmedEmail },
      fallbackMessage: "Newsletter subscription received and saved locally because email delivery is not configured yet.",
      mailJobs: [
        {
          to: process.env.GMAIL_USER || trimmedEmail,
          replyTo: trimmedEmail,
          subject: `New blog subscriber: ${trimmedEmail}`,
          html: `<p>A new blog subscriber joined the newsletter:</p><p><strong>${trimmedEmail}</strong></p>`,
          fromName: "MedCare RCM Newsletter",
          fallbackReason: "SMTP credentials are not configured yet.",
        },
      ],
    });

    return Response.json(result);
  } catch (error) {
    console.error("Subscribe route error:", error);
    return Response.json({ success: false, error: error.message || "Failed to subscribe." }, { status: 500 });
  }
}
