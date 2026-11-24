import { type ComponentProps, type ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const Lead = ({ children, focusOnMount }: { children: ReactNode; focusOnMount?: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (focusOnMount) ref.current?.focus();
  }, [focusOnMount]);

  return (
    <span
      ref={ref}
      tabIndex={focusOnMount ? -1 : undefined}
      className="block scroll-mt-24 text-center font-['League_Spartan',sans-serif] text-lg font-bold leading-snug text-[var(--bone)] outline-none sm:text-xl"
    >
      {children}
    </span>
  );
};

export const Status = ({ children }: { children: ReactNode }) => (
  <span aria-live="polite" className="block min-h-[3rem] max-w-md text-center font-mono text-sm leading-snug text-[var(--soft)]">
    {children}
  </span>
);

export const Btn = ({
  active,
  cta,
  className,
  ...props
}: ComponentProps<"button"> & { active?: boolean; cta?: boolean }) => (
  <button
    type="button"
    {...props}
    className={cn(
      "min-h-11 cursor-pointer border-[3px] px-3 py-2 font-bold leading-tight hover:border-[var(--bone)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
      cta ? "font-['League_Spartan',sans-serif] text-base" : "font-mono text-sm",
      active
        ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--ink)]"
        : "border-[var(--mid)] bg-[var(--ink)] text-[var(--bone)]",
      className,
    )}
  />
);
