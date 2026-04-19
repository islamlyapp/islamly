"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, Globe, LogIn, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser } from "@/firebase";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { fetchHijriDate } from "@/services/islamic-data-service";

export function GlobalHeader() {
  const pathname = usePathname();
  const { user } = useUser();
  const [hijriDate, setHijriDate] = useState<string | null>(null);

  useEffect(() => {
    async function loadHijri() {
      const now = new Date();
      const dateStr = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;
      const data = await fetchHijriDate(dateStr);
      if (data) {
        setHijriDate(`${data.day} ${data.month.en} ${data.year} AH`);
      }
    }
    loadHijri();
  }, []);

  if (pathname === '/login') return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-white/5 pt-safe" aria-label="Global Header">
      <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Islamly Home">
            <span className="font-headline font-bold text-2xl tracking-tight text-white">Islamly</span>
          </Link>
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 border border-primary/10">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] uppercase tracking-widest text-muted-foreground font-black">
              {hijriDate || "Network Active"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Link href="/notifications" className="relative group" aria-label="View notifications">
              <button className="text-white opacity-80 hover:opacity-100 transition-opacity p-2" aria-hidden="true" tabIndex={-1}>
                <Bell className="w-5 h-5" />
                <Badge className="absolute top-0 right-0 w-2 h-2 p-0 bg-primary border-2 border-background rounded-full animate-pulse" />
              </button>
            </Link>
            <Link href="/profile#settings" aria-label="Change language or scholarly settings">
              <button className="text-white opacity-80 hover:opacity-100 transition-opacity p-2" aria-hidden="true" tabIndex={-1}>
                <Globe className="w-5 h-5" />
              </button>
            </Link>
          </div>
          
          <Link href={user ? "/profile" : "/login"} aria-label={user ? "Manage account" : "Sign in to your account"}>
            <Button className="bg-[#AD1F37] hover:bg-[#8B182C] text-white rounded-full px-6 gap-2 font-headline font-bold h-10 shadow-lg shadow-red-900/20">
              {user ? (
                <>
                  <User className="w-4 h-4" aria-hidden="true" />
                  Account
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" aria-hidden="true" />
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