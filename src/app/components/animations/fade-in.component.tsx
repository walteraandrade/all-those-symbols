interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const FadeIn = ({ children, className }: FadeInProps) => {
  return (
    <div
      className={`animate-fade-in ${className || ''}`}
    >
      {children}
    </div>
  );
};