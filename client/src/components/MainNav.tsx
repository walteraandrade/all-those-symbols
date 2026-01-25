import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Home, User, Code, Music, BookOpen } from "lucide-react";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/bio", label: "Bio", icon: User },
  { path: "/projects", label: "Projects", icon: Code },
  { path: "/music", label: "Music", icon: Music },
  { path: "/blog", label: "Blog", icon: BookOpen },
];

export function MainNav() {
  const [location] = useLocation();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-1">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location === path;
          return (
            <li key={path}>
              <Link
                href={path}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  "hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring",
                  isActive
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span className="hidden md:inline">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
