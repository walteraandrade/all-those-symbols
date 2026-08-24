import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { z } from "zod";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

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

  const { name, email, message } = parsed.data;

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
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
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
