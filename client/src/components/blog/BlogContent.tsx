import ReactMarkdown from "react-markdown";
import { slugify } from "@/lib/utils";

interface BlogContentProps {
  content: string;
}

export function BlogContent({ content }: BlogContentProps) {
  return (
    <article className="blog-prose">
      <ReactMarkdown
        components={{
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
