import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useToast } from "@/hooks/use-toast";
import { socialLinks } from "@/lib/data";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast({
        title: "Message sent",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
      reset();
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
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
