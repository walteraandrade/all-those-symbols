import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Home, User, Code, BookOpen, Mail } from "lucide-react";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/bio", label: "Bio", icon: User },
  { path: "/projects", label: "Projects", icon: Code },
  { path: "/blog", label: "Blog", icon: BookOpen },
  { path: "/contact", label: "Contact", icon: Mail },
];

export function MobileBottomNav() {
  const [location] = useLocation();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border md:hidden"
    >
      <ul className="flex items-center justify-around py-2">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location === path;
          return (
            <li key={path}>
              <Link
                href={path}
                aria-current={isActive ? "page" : undefined}
                aria-label={label}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-md transition-colors",
                  "focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
