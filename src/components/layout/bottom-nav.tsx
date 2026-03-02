
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Library, BookOpen, Clock, Sparkles, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/quran", label: "Quran", icon: BookOpen },
  { href: "/library", label: "Library", icon: Library },
  { href: "/explain", label: "AI Explain", icon: Sparkles },
  { href: "/prayer-times", label: "Salah", icon: Clock },
  { href: "/quizzes", label: "Quizzes", icon: MessageCircleQuestion },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-t border-border md:hidden">
      <div className="flex justify-around items-center h-16 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors",
                isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "text-primary")} />
              <span className="text-[10px] uppercase tracking-wider font-headline">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
