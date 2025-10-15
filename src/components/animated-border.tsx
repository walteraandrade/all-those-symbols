interface AnimatedBorderProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedBorder({
  children,
  className = "",
}: AnimatedBorderProps) {
  return (
    <div className={`border border-gray-400 bg-zinc-900 ${className}`}>
      {children}
    </div>
  );
}
