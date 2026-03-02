"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/firebase";

export function GlobalHeader() {
  const pathname = usePathname();
  const { user } = useUser();

  // Don't show header on login page to keep it clean
  if (pathname === '/login') return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/50 pt-safe">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg group-active:scale-95 transition-transform">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight">Islamly</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href={user ? "/profile" : "/login"}
            className={cn(
              "flex items-center gap-2 p-2 rounded-full transition-all duration-200 active:scale-95",
              pathname === "/profile" || pathname === "/login" 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-secondary/50"
            )}
          >
            <User className="w-5 h-5" />
            <span className="text-xs font-headline font-bold uppercase tracking-tight hidden sm:inline">
              {user ? "Account" : "Sign In"}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
