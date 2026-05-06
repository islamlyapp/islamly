
"use client";

import { useState, useEffect } from "react";
import { 
  Book, 
  BookOpen, 
  Clock, 
  Heart, 
  Radio, 
  Users, 
  Bell, 
  Globe, 
  User, 
  Search,
  Layers,
  Sparkles,
  Trophy,
  ShieldCheck,
  Zap,
  MessageSquare,
  Baby,
  Star,
  Target,
  Compass
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SplashScreen } from "@/components/splash-screen";
import { cn } from "@/lib/utils";

const modules = [
  { name: "NOBLE QURAN", icon: BookOpen, href: "/quran", color: "text-emerald-400" },
  { name: "CANONICAL QIRA'AT", icon: Globe, href: "/qiraat", color: "text-blue-400" },
  { name: "HADITH INDEX", icon: Book, href: "/hadith", color: "text-orange-400" },
  { name: "SCHOLARLY LIBRARY", icon: Layers, href: "/library", color: "text-primary" },
  { name: "PRAYER TIMES", icon: Clock, href: "/prayer-times", color: "text-amber-400" },
  { name: "DIVINE ADHKAR", icon: Zap, href: "/adhkar", color: "text-yellow-400" },
  { name: "DUA REPOSITORY", icon: Heart, href: "/dua", color: "text-rose-400" },
  { name: "AUDIO HUB", icon: Radio, href: "/audio", color: "text-purple-400" },
  { name: "HERITAGE PATH", icon: HistoryIcon, href: "/history", color: "text-amber-600" },
  { name: "KNOWLEDGE SEARCH", icon: Search, href: "/ask", color: "text-blue-500" },
  { name: "AUTHENTIC SEERAH", icon: Compass, href: "/seerah", color: "text-emerald-600" },
  { name: "SCHOLARS DIRECTORY", icon: Users, href: "/scholars", color: "text-indigo-400" },
  { name: "PURPOSE PATH", icon: Target, href: "/purpose", color: "text-indigo-500" },
  { name: "KIDS HUB", icon: Baby, href: "/kids", color: "text-yellow-500" },
  { name: "YOUTH HUB", icon: Sparkles, href: "/teens", color: "text-pink-400" },
  { name: "SCHOLARLY CIRCLES", icon: MessageSquare, href: "/circles", color: "text-blue-400" },
];

function HistoryIcon(props: any) {
  return <Layers {...props} />;
}

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!hasMounted) return null;
  if (showSplash) return <SplashScreen />;

  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-primary/30 animate-in fade-in duration-700">
      {/* Exact Header Aesthetic */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center border-b border-white/5 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <h1 className="text-2xl font-headline font-black tracking-tighter transition-colors group-hover:text-primary">Islamly</h1>
          </Link>
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">19 DHŪ AL-QA‘DAH 1447 AH</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-white hover:bg-white/5 rounded-full" asChild>
            <Link href="/notifications"><Bell className="w-5 h-5" /></Link>
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-white hover:bg-white/5 rounded-full" asChild>
            <Link href="/language"><Globe className="w-5 h-5" /></Link>
          </Button>
          <Button className="ml-2 bg-primary hover:bg-primary/90 text-white rounded-full h-10 px-6 font-headline font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20" asChild>
            <Link href="/login">Account</Link>
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Exact Hero Logo Aesthetic */}
        <div className="relative border border-white/10 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center bg-zinc-900 overflow-hidden min-h-[400px] shadow-2xl group">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 transition-transform duration-1000 group-hover:scale-105"
            style={{ backgroundImage: "url(https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2070&auto=format&fit=crop)" }} 
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
          
          <div className="relative z-10 space-y-6">
            <div className="relative inline-block">
              <h2 className="text-8xl md:text-9xl font-serif text-white select-none drop-shadow-[0_0_30px_rgba(173,31,55,0.6)]" dir="rtl">
                إسل<span className="text-primary tracking-tighter">ا</span>ملي
              </h2>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.6em] text-white/50 font-black">Universal Scholarly Infrastructure</p>
              <div className="flex items-center justify-center gap-2 pt-4">
                <Badge variant="outline" className="text-[8px] uppercase tracking-widest border-primary/30 text-primary bg-primary/5">
                  <ShieldCheck className="w-3 h-3 mr-1" /> AHLUS-SUNNAH INFRASTRUCTURE
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Dense Module Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {modules.map((m) => (
            <Link key={m.name} href={m.href}>
              <Card className="glass-card hover:border-primary/40 transition-all group border-white/5 overflow-hidden h-32 flex flex-col justify-center items-center text-center relative active:scale-[0.98]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-4 space-y-3 relative z-10">
                  <div className={cn("w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mx-auto group-hover:bg-white/10 transition-colors shadow-inner", m.color)}>
                    <m.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/70 group-hover:text-white transition-colors">{m.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Global Status Footer */}
        <div className="text-center pt-12 pb-20 opacity-30">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/10 bg-white/5">
            <Globe className="w-3 h-3" />
            <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
              Universal Scholarly Signal • Production Environment v3.5
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
