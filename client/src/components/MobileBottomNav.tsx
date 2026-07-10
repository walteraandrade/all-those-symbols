import { Link, useLocation } from "wouter";
import { Home, User, Code, BookOpen, Mail, FileDown } from "lucide-react";
import { cvUrl } from "@/lib/data";

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
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#F5F5F0]/95 backdrop-blur-sm border-t-2 border-black md:hidden"
    >
      <ul className="flex items-center justify-around py-2">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location === path || (path !== "/" && location.startsWith(path));
          return (
            <li key={path}>
              <Link
                href={path}
                aria-current={isActive ? "page" : undefined}
                aria-label={label}
                className={`flex flex-col items-center gap-1 px-3 py-2 transition-colors ${
                  isActive
                    ? "text-red-500"
                    : "text-black/50"
                }`}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
                <span className="text-[10px] font-mono uppercase tracking-wider">{label}</span>
              </Link>
            </li>
          );
        })}
        <li>
          <a
            href={cvUrl}
            download
            aria-label="Download CV"
            className="flex flex-col items-center gap-1 px-3 py-2 text-red-500 transition-colors"
          >
            <FileDown className="w-5 h-5" aria-hidden="true" />
            <span className="text-[10px] font-mono uppercase tracking-wider">CV</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
