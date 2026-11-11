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
    <div className="esc-page">
      <header className="esc-pagehead">
        <h1>Send a letter</h1>
        <p className="sub">
          The next train leaves whenever you write. For anything faster,
          email works too.
        </p>
      </header>

      <div className="esc-split">
      <form className="esc-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" type="text" autoComplete="name" placeholder="Your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-err" : undefined} {...register("name")} />
          {errors.name && <p id="contact-name-err" className="err">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" type="email" autoComplete="email" inputMode="email" placeholder="your@email.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-err" : undefined} {...register("email")} />
          {errors.email && <p id="contact-email-err" className="err">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" placeholder="What are you building?" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-err" : undefined} {...register("message")} />
          {errors.message && <p id="contact-message-err" className="err">{errors.message.message}</p>}
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

      <aside className="esc-aside" aria-labelledby="contact-direct-h">
        <h2 id="contact-direct-h" className="esc-card-title">Or write directly</h2>
        <p>No form, no queue. I read everything that arrives.</p>
        <a className="esc-link" href={`mailto:${socialLinks.email}`}>{socialLinks.email}</a>
        <a className="esc-link" href={`https://linkedin.com${socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a className="esc-link" href={`https://github.com/${socialLinks.github.replace("@", "")}`} target="_blank" rel="noopener noreferrer">GitHub</a>
      </aside>
      </div>
    </div>
  );
}
