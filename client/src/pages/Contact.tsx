import { motion } from "framer-motion";
import { Send, Terminal } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { BrutalistBackground } from "@/components/BrutalistBackground";
import { useIsMobile } from "@/hooks/use-mobile";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useIsMobile();

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
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
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
    <div className="relative min-h-[calc(100vh-10rem)] bg-[#F5F5F0]">
      {!isMobile && <BrutalistBackground />}

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <header>
            <h1 className="font-mono text-4xl md:text-5xl tracking-tight uppercase mb-4 text-black glitch-hover">
              Contact<span className="text-red-500">/</span>Say_Hello
              <span className="cursor-blink text-red-500">_</span>
            </h1>
            <p className="font-mono text-sm text-black/60 uppercase tracking-wider">
              &gt; Have a question or want to work together?
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-black/70 mb-2">
                <span className="text-red-500">&gt;</span> Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                {...register("name")}
                className="w-full px-4 py-3 bg-white/50 border-brutal font-mono text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-red-500 transition-colors"
              />
              {errors.name && (
                <p className="mt-1 font-mono text-xs text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-black/70 mb-2">
                <span className="text-red-500">&gt;</span> Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                {...register("email")}
                className="w-full px-4 py-3 bg-white/50 border-brutal font-mono text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-red-500 transition-colors"
              />
              {errors.email && (
                <p className="mt-1 font-mono text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-black/70 mb-2">
                <span className="text-red-500">&gt;</span> Message
              </label>
              <textarea
                placeholder="What's on your mind?"
                {...register("message")}
                className="w-full px-4 py-3 bg-white/50 border-brutal font-mono text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-red-500 transition-colors min-h-[150px] resize-none"
              />
              {errors.message && (
                <p className="mt-1 font-mono text-xs text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-4 bg-black text-white border-brutal border-red-500 font-mono text-sm uppercase tracking-wider hover:bg-red-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Terminal className="w-4 h-4 animate-pulse" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send_Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
