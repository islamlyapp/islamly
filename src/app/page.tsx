"use client";

import { useState, useEffect } from "react";
import { Book, BookOpen, Calendar, Columns, History, Library, MapPin, Newspaper, Bot, ShieldCheck, Utensils, Video as VideoIcon, Calculator, Globe, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SplashScreen } from "@/components/splash-screen";
import Image from "next/image";

const modules = [
  { name: "Quran Reader", icon: BookOpen, href: "/quran", description: "Complete Uthmani text and recitation.", category: "Quran" },
  { name: "Hadith Collection", icon: Book, href: "/hadith", description: "Authentic narrations from the Prophet ﷺ.", category: "Hadith" },
  { name: "Fiqh Hub", icon: Columns, href: "/fiqh", description: "Jurisprudence rulings and practical guidance.", category: "Fiqh" },
  { name: "Ask Al-Mualim", icon: Bot, href: "/ask", description: "AI scholarly assistant for questions and clarifications.", category: "Al-Mualim" },
  { name: "Aqidah Hub", icon: ShieldCheck, href: "/tawheed", description: "Core creed and monotheism essentials.", category: "Aqidah" },
  { name: "Media Center", icon: VideoIcon, href: "/videos", description: "Verified lectures, audio, and Islamic media.", category: "Media" },
  { name: "Islamic Studies", icon: Library, href: "/library", description: "Study resources and classical scholarship.", category: "Studies" },
  { name: "Sunnah Calendar", icon: Calendar, href: "/calendar", description: "Prayer, fasting and Islamic event schedules.", category: "Calendar" },
  { name: "Halal Food", icon: Utensils, href: "/halal", description: "Halal rulings, food guidance and dietary ethics.", category: "Halal" },
  { name: "News Center", icon: Newspaper, href: "/news", description: "Latest Islamic news and community updates.", category: "News" },
  { name: "Masjid Locator", icon: MapPin, href: "/masjid-locator", description: "Find nearby mosques and prayer spaces.", category: "Locator" },
  { name: "Seerah Stories", icon: History, href: "/seerah", description: "Life of the Prophet ﷺ and prophetic events.", category: "Seerah" },
  { name: "Scholar Tools", icon: Calculator, href: "/goals", description: "Study planning, trackers, and useful tools.", category: "Tools" },
];

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
    <div className="bg-[#0a0304] text-white min-h-screen font-sans selection:bg-primary/30 animate-in fade-in duration-1000">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[#0a0304]/70 shadow-xl shadow-black/20">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(173,31,55,0.18),transparent_35%)]" />
          </div>

          <div className="relative z-10 flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 lg:p-10">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                <Image src="/logo.png" alt="Islamly logo" fill className="object-cover" priority />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white">Islamly</h1>
                <p className="mt-2 text-sm text-white/70">Trusted Islamic knowledge, presented with clarity and care.</p>
              </div>
            </div>

            <div className="max-w-xl text-center sm:text-right">
              <p className="text-base leading-7 text-muted-foreground">A calm, natural home for authentic Islamic guidance and study.</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] text-white/80 border border-white/10">
                Salafi/Athari
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-white/5 pb-8">
            <div>
              <h2 className="text-2xl font-headline font-bold">Explore the app</h2>
              <p className="mt-2 text-sm text-muted-foreground">Browse Quran, Hadith, Fiqh, Al-Mualim, Aqidah, media, study resources, calendar guidance, halal support, news, masjid locator, and more.</p>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-semibold text-primary">Easy to explore</p>
              <p className="text-[11px] text-muted-foreground italic">13 thoughtfully organized sections</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {modules.map((m, index) => (
              <Link key={index} href={m.href}>
                <Card className="glass-card hover:border-primary/40 transition-all group border-white/5 overflow-hidden h-full flex flex-col justify-between text-left relative active:scale-[0.98]">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-5 relative z-10 flex flex-col h-full space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors shadow-inner border border-white/5">
                        <m.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="space-y-1 flex-grow">
                      <h3 className="text-sm font-headline font-bold text-white group-hover:text-primary transition-colors">{m.name}</h3>
                      <p className="text-[10px] text-muted-foreground leading-relaxed italic">{m.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <Badge variant="secondary" className="bg-white/5 text-muted-foreground text-[8px] border-none">{m.category}</Badge>
                      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <footer className="text-center pt-20 pb-32 opacity-30">
          <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-white/10 bg-white/5">
            <Globe className="w-4 h-4 text-primary" />
            <p className="text-[10px] font-semibold italic">A trusted resource built for the Ummah</p>
          </div>
          <p className="mt-4 text-[9px] font-medium">© 2025 Islamly • Trusted Islamic knowledge</p>
        </footer>
      </main>
    </div>
  );
}
