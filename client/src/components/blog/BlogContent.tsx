import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { slugify } from "@/lib/utils";
import { CertaintyMethod } from "./CertaintyMethod";
import { IfThenSlider } from "./IfThenSlider";
import { LogicCircuitWidget } from "./LogicCircuitWidget";
import { StateMachineWidget } from "./StateMachineWidget";

const sizeFromSrc = (src?: string) => {
  const match = src?.match(/-(\d+)x(\d+)\.\w+$/);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : {};
};

const components: Components = {
  img: ({ src, alt }) =>
    src === "#if-then" ? (
      <IfThenSlider label={alt} />
    ) : src === "#state-machine" ? (
      <StateMachineWidget label={alt} />
    ) : src === "#logic-circuit" ? (
      <LogicCircuitWidget label={alt} />
    ) : src === "#certainty-method" ? (
      <CertaintyMethod label={alt} />
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

export function BlogContent({ content }: BlogContentProps) {
  return (
    <article className="blog-prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
