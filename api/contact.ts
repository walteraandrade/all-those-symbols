import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";
import { checkRateLimit } from "./rate-limit";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "";
const ALLOWED_ORIGIN = "https://all-those-symbols.vercel.app";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return character;
    }
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Vary", "Origin");
  if (req.headers.origin === ALLOWED_ORIGIN) {
    res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid request", details: parsed.error.flatten() });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "Email service not configured" });
  }

  const rateLimit = await checkRateLimit(req, "contact");
  if (rateLimit.status === "unavailable") {
    return res.status(503).json({ error: "Rate limit service unavailable" });
  }
  if (rateLimit.status === "limited") {
    res.setHeader("Retry-After", String(rateLimit.retryAfter));
    return res.status(429).json({ error: "Too many requests" });
  }

  const { name, email, message } = parsed.data;
  const escapedName = escapeHtml(name);
  const escapedEmail = escapeHtml(email);
  const escapedMessage = escapeHtml(message).replace(/\r?\n/g, "<br>");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapedName}</p>
        <p><strong>Email:</strong> ${escapedEmail}</p>
        <h3>Message:</h3>
        <p>${escapedMessage}</p>
      `,
    });

    if (error) {
      console.error("Email service rejected request:", error);
      return res.status(502).json({ error: "Failed to send message" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to send email:", error);
    return res.status(502).json({ error: "Failed to send message" });
  }
}
