import { lazy, memo, Suspense } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/utils";

const widgetSrcs = new Set(["#if-then", "#state-machine", "#logic-circuit", "#certainty-method"]);
const Widget = lazy(() => import("./Widgets"));

const sizeFromSrc = (src?: string) => {
  const match = src?.match(/-(\d+)x(\d+)\.\w+$/);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : {};
};

const components: Components = {
  img: ({ src, alt }) =>
    src && widgetSrcs.has(src) ? (
      <Suspense fallback={<span className="block min-h-64" />}>
        <Widget src={src} label={alt} />
      </Suspense>
    ) : (
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
};

interface BlogContentProps {
  content: string;
}

export const BlogContent = memo(function BlogContent({ content }: BlogContentProps) {
  return (
    <article className="blog-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </article>
  );
});
