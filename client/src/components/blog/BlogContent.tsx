import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { codeToHtml } from "shiki";

interface BlogContentProps {
  content: string;
}

const CodeBlock = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  const [html, setHtml] = useState<string>("");
  const match = /language-(\w+)/.exec(className || "");
  const lang = match ? match[1] : "text";
  const code = String(children).replace(/\n$/, "");

  useEffect(() => {
    codeToHtml(code, {
      lang,
      theme: "github-dark",
    }).then(setHtml);
  }, [code, lang]);

  if (!html) {
    return (
      <pre className="bg-card/80 border border-border rounded-sm p-4 overflow-x-auto">
        <code className="font-mono text-sm">{code}</code>
      </pre>
    );
  }

  return (
    <div className="relative group">
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.05)_2px,rgba(0,255,255,0.05)_4px)] rounded-sm" />
      <div
        className="[&>pre]:!bg-card/80 [&>pre]:border [&>pre]:border-border [&>pre]:rounded-sm [&>pre]:p-4 [&>pre]:overflow-x-auto [&_code]:font-mono [&_code]:text-sm"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className="absolute top-2 right-2 font-mono text-[10px] text-muted-foreground uppercase opacity-0 group-hover:opacity-100 transition-opacity">
        {lang}
      </div>
    </div>
  );
};

const InlineCode = ({ children }: { children?: React.ReactNode }) => (
  <code className="font-mono text-sm bg-card/80 border border-border px-1.5 py-0.5 rounded-sm text-primary">
    {children}
  </code>
);

export function BlogContent({ content }: BlogContentProps) {
  return (
    <article className="blog-prose">
      <ReactMarkdown
        components={{
          h2: ({ children }) => {
            const text = String(children);
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            return (
              <h2 id={id} className="scroll-mt-24">
                {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const text = String(children);
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            return (
              <h3 id={id} className="scroll-mt-24">
                {children}
              </h3>
            );
          },
          code: ({ className, children, ...props }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return <CodeBlock className={className}>{children}</CodeBlock>;
            }
            return <InlineCode>{children}</InlineCode>;
          },
          pre: ({ children }) => <>{children}</>,
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
