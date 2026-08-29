import type { APIRoute } from "astro";
import { SITE } from "@/data/site";

// This is the one dynamic route on an otherwise fully static site (see
// `output: "server"` + `export const prerender = true` on every page in
// astro.config.mjs / each page file). Requires RESEND_API_KEY to be set as
// an environment variable in the Vercel project — never commit that key.
export const prerender = false;

const RESEND_ENDPOINT = "https://api.resend.com/emails";
// Requires aaronjosephhall.com to be a verified sending domain in Resend
// (Resend dashboard → Domains → add + verify the DNS records it gives you).
// Sending from an unverified domain's address is rejected by Resend's API.
const FROM_ADDRESS = "Aaron Joseph Hall <aaron@aaronjosephhall.com>";

const REQUIRED_FIELDS = ["name", "email", "topic", "message"] as const;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const POST: APIRoute = async ({ request }) => {
  let data: Record<string, string>;
  try {
    data = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid request body." }), { status: 400 });
  }

  // Honeypot: a hidden field real visitors never fill in. Bots that
  // autofill every field trip it; pretend success without sending.
  if (typeof data.company === "string" && data.company.trim() !== "") {
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }

  for (const field of REQUIRED_FIELDS) {
    if (!data[field] || String(data[field]).trim() === "") {
      return new Response(JSON.stringify({ ok: false, error: `Missing required field: ${field}` }), {
        status: 400,
      });
    }
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — cannot send speaking request email.");
    return new Response(JSON.stringify({ ok: false, error: "Email delivery is not configured yet." }), {
      status: 500,
    });
  }

  const name = String(data.name).trim();
  const email = String(data.email).trim();
  const organization = String(data.organization ?? "").trim();
  const eventDate = String(data.eventDate ?? "").trim();
  const eventType = String(data.eventType ?? "").trim();
  const topic = String(data.topic).trim();
  const topicOther = String(data.topicOther ?? "").trim();
  const message = String(data.message).trim();

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Organization / Church", organization || "—"],
    ["Event date", eventDate || "—"],
    ["Event type", eventType || "—"],
    ["Desired topic", topic === "Other Topics" && topicOther ? `Other — ${topicOther}` : topic],
  ];

  const html = `
    <h2>New speaking request</h2>
    <table cellpadding="4" cellspacing="0">
      ${rows.map(([label, value]) => `<tr><td><strong>${escapeHtml(label)}</strong></td><td>${escapeHtml(value)}</td></tr>`).join("")}
    </table>
    <p><strong>Message</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
  `;

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    message,
  ].join("\n");

  const resendResponse = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [SITE.email],
      reply_to: email,
      subject: `New speaking request from ${name}`,
      html,
      text,
    }),
  });

  if (!resendResponse.ok) {
    const errorBody = await resendResponse.text();
    console.error("Resend API error:", resendResponse.status, errorBody);
    return new Response(JSON.stringify({ ok: false, error: "Failed to send. Please try again." }), {
      status: 502,
    });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
