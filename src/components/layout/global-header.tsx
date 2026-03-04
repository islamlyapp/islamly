
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Globe, LogIn, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function GlobalHeader() {
  const pathname = usePathname();
  const { user } = useUser();

  if (pathname === '/login') return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-white/5 pt-safe">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-headline font-bold text-2xl tracking-tight text-white">Islamly</span>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Link href="/notifications" className="relative group">
              <button className="text-white opacity-80 hover:opacity-100 transition-opacity p-2">
                <Bell className="w-5 h-5" />
                <Badge className="absolute top-0 right-0 w-2 h-2 p-0 bg-primary border-2 border-background rounded-full animate-pulse" />
              </button>
            </Link>
            <button className="text-white opacity-80 hover:opacity-100 transition-opacity">
              <Globe className="w-5 h-5" />
            </button>
            <span className="text-xl" role="img" aria-label="Bulgaria Flag">🇧🇬</span>
          </div>
          
          <Link href={user ? "/profile" : "/login"}>
            <Button className="bg-[#AD1F37] hover:bg-[#8B182C] text-white rounded-full px-6 gap-2 font-headline font-bold h-10 shadow-lg shadow-red-900/20">
              {user ? (
                <>
                  <User className="w-4 h-4" />
                  Account
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
