import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { socialLinks } from "@/lib/data";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be at most 100 characters"),
  email: z.string().email("Invalid email address").max(254, "Email must be at most 254 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000, "Message must be at most 5000 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string }>();

  useDocumentMeta({
    title: "Contact | Walter Andrade",
    description: "Get in touch with Walter Andrade. Send a message for collaborations, questions, or just to say hello.",
    canonical: "/contact",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setStatus(undefined);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 429) {
        const minutes = Math.ceil(Number(response.headers.get("Retry-After")) / 60);
        setStatus({
          ok: false,
          text: `Too many messages. Try again in ${minutes > 0 ? `about ${minutes} min` : "a few minutes"}.`,
        });
        return;
      }

      if (response.status === 503) {
        setStatus({ ok: false, text: `The form is unavailable right now. Please email me directly at ${socialLinks.email}.` });
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus({ ok: true, text: "Message sent. Thanks for reaching out! I'll get back to you soon." });
      reset();
    } catch {
      setStatus({ ok: false, text: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="esc-page" style={{ maxWidth: 760 }}>
      <header className="esc-pagehead">
        <h1>Send a letter</h1>
        <p className="sub">
          The next train leaves whenever you write. For anything faster,
          email works too.
        </p>
      </header>

      <form className="esc-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" type="text" placeholder="Your name" {...register("name")} />
          {errors.name && <p className="err">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" type="email" placeholder="your@email.com" {...register("email")} />
          {errors.email && <p className="err">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" placeholder="What are you building?" {...register("message")} />
          {errors.message && <p className="err">{errors.message.message}</p>}
        </div>

        <p className={status?.ok === false ? "status bad" : "status"} role="status" aria-live="polite">
          {status?.text}
        </p>

        <div>
          <button className="esc-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
          </button>
        </div>
      </form>

      <p className="esc-sub" style={{ marginTop: 40, marginBottom: 0 }}>
        Or write directly:{" "}
        <a className="esc-link" style={{ fontSize: 22 }} href={`mailto:${socialLinks.email}`}>
          {socialLinks.email}
        </a>
      </p>
    </div>
  );
}
