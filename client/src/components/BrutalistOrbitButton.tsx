import { Link } from "wouter";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface Props {
  path: string;
  label: string;
  icon: LucideIcon;
  index: number;
  x: number;
  y: number;
  onHover?: () => void;
  onClick?: () => void;
}

export function BrutalistOrbitButton({
  path,
  label,
  icon: Icon,
  index,
  x,
  y,
  onHover,
  onClick,
}: Props) {
  const prefix = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      animate={{ opacity: 1, x, y }}
      transition={{ duration: 0 }}
      className="absolute"
    >
      <Link
        href={path}
        onMouseEnter={onHover}
        onClick={onClick}
        className="group flex items-center gap-2 px-3 py-2 bg-[#F5F5F0] border-brutal transition-none hover:bg-black hover:text-white hover:border-brutal-red"
      >
        <span className="font-mono text-xs text-black/50 group-hover:text-white/50">
          {`> ${prefix}`}
        </span>
        <Icon className="w-4 h-4" />
        <span className="font-mono text-xs uppercase tracking-wider group-hover:line-through">
          {label}
        </span>
      </Link>
    </motion.div>
  );
}
