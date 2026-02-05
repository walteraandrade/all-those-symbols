import { Link, useLocation } from "wouter";
import { Home, User, Code, BookOpen, Mail } from "lucide-react";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/bio", label: "Bio", icon: User },
  { path: "/projects", label: "Projects", icon: Code },
  { path: "/blog", label: "Blog", icon: BookOpen },
  { path: "/contact", label: "Contact", icon: Mail },
];

export function MainNav() {
  const [location] = useLocation();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex items-center gap-1">
        {navItems.map(({ path, label, icon: Icon }, index) => {
          const isActive = location === path || (path !== "/" && location.startsWith(path));
          return (
            <li key={path}>
              <Link
                href={path}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-wider transition-colors ${
                  isActive
                    ? "bg-black text-white"
                    : "text-black/60 hover:text-black hover:bg-black/5"
                }`}
              >
                <span className="text-red-500 text-[10px]">
                  {String(index).padStart(2, "0")}
                </span>
                <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden lg:inline">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
