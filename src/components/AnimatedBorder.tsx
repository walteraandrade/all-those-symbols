interface AnimatedBorderProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedBorder({
  children,
  className = "",
}: AnimatedBorderProps) {
  return (
    <div
      className={`relative border border-gray-400 bg-zinc-900 group overflow-hidden ${className}`}
    >
      <div
        className="absolute top-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 pointer-events-none animate-[shimmer-x_0.3s_ease-out]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, white 50%, transparent 100%)",
        }}
      />
      {children}
    </div>
  )
}
