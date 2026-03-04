"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Library, BookOpen, Clock, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/firebase";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/quran", label: "Quran", icon: BookOpen },
  { href: "/ask", label: "Ask AI", icon: MessageCircle },
  { href: "/library", label: "Library", icon: Library },
  { href: "/prayer-times", label: "Salah", icon: Clock },
];

export function BottomNav() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border/50 md:hidden pb-safe" aria-label="Main Navigation">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 gap-1 py-1 transition-all duration-200",
                isActive ? "text-primary scale-105" : "text-muted-foreground hover:text-foreground"
              )}
              aria-current={isActive ? "page" : undefined}
            >
              <div className={cn(
                "p-1 rounded-lg transition-colors",
                isActive && "bg-primary/10"
              )}>
                <item.icon className={cn("w-5 h-5", isActive && "text-primary")} aria-hidden="true" />
              </div>
              <span className={cn(
                "text-[9px] uppercase tracking-tighter font-headline font-bold",
                isActive ? "opacity-100" : "opacity-70"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
        <Link
          href={user ? "/profile" : "/login"}
          className={cn(
            "flex flex-col items-center justify-center flex-1 gap-1 py-1 transition-all duration-200",
            pathname === "/profile" || pathname === "/login" ? "text-primary scale-105" : "text-muted-foreground hover:text-foreground"
          )}
          aria-label={user ? "Go to your Profile" : "Sign In"}
          aria-current={pathname === "/profile" || pathname === "/login" ? "page" : undefined}
        >
          <div className={cn(
            "p-1 rounded-lg transition-colors",
            (pathname === "/profile" || pathname === "/login") && "bg-primary/10"
          )}>
            <User className={cn("w-5 h-5", (pathname === "/profile" || pathname === "/login") && "text-primary")} aria-hidden="true" />
          </div>
          <span className={cn(
            "text-[9px] uppercase tracking-tighter font-headline font-bold",
            pathname === "/profile" || pathname === "/login" ? "opacity-100" : "opacity-70"
          )}>
            {user ? "Profile" : "Login"}
          </span>
        </Link>
      </div>
    </nav>
  );
}
