import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/utils";

const sizeFromSrc = (src?: string) => {
  const match = src?.match(/-(\d+)x(\d+)\.\w+$/);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : {};
};

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <article className="blog-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt }) => (
            <img
              src={typeof src === "string" ? src : undefined}
              alt={alt ?? ""}
              loading="lazy"
              decoding="async"
              {...sizeFromSrc(typeof src === "string" ? src : undefined)}
            />
          ),
          h2: ({ children }) => {
            const text = String(children);
            const id = slugify(text);
            return (
              <h2 id={id} className="scroll-mt-24">
                <span className="text-[var(--accent)]">&gt;</span> {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const text = String(children);
            const id = slugify(text);
            return (
              <h3 id={id} className="scroll-mt-24">
                {children}
              </h3>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
