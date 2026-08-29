// Shared helper for the site's server-rendered form-handling API routes
// (see src/pages/api/*.ts). Requires RESEND_API_KEY to be set as an
// environment variable in the Vercel project — never commit that key.

const RESEND_ENDPOINT = "https://api.resend.com/emails";

// Requires aaronjosephhall.com to be a verified sending domain in Resend
// (Resend dashboard → Domains → add + verify the DNS records it gives you).
// Sending from an unverified domain's address is rejected by Resend's API.
export const FROM_ADDRESS = "Aaron Joseph Hall <aaron@aaronjosephhall.com>";
// Form notifications go to Aaron directly, distinct from SITE.email (the
// public "aaron@" address shown elsewhere on the site — same address today,
// but this is the destination for form submissions specifically).
export const TO_ADDRESS = "aaron@aaronjosephhall.com";

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** True when a hidden honeypot field was filled in — real visitors never do this. */
export function isHoneypotFilled(data: Record<string, unknown>, field = "company") {
  return typeof data[field] === "string" && data[field].trim() !== "";
}

interface SendEmailResult {
  ok: boolean;
  status?: number;
  error?: string;
}

export async function sendNotificationEmail(opts: {
  apiKey: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
}): Promise<SendEmailResult> {
  const resendResponse = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${opts.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      reply_to: opts.replyTo,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
    }),
  });

  if (!resendResponse.ok) {
    const errorBody = await resendResponse.text();
    console.error("Resend API error:", resendResponse.status, errorBody);
    return { ok: false, status: 502, error: "Failed to send. Please try again." };
  }

  return { ok: true };
}
