
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  ChevronUp, 
  GraduationCap, 
  Mic, 
  MessageCircle, 
  Sparkles, 
  BookMarked, 
  ScrollText, 
  History, 
  Scale, 
  Clock, 
  MapPin, 
  Utensils, 
  Zap, 
  Globe, 
  Database, 
  Compass, 
  Library, 
  Trophy, 
  Target, 
  ShieldCheck,
  BookOpen,
  Moon,
  Heart,
  Quote,
  Loader2,
  Fingerprint,
  RotateCcw,
  Star,
  HandCoins,
  Megaphone,
  Tent,
  Calendar as CalendarIcon,
  ShieldAlert
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { calculateCurrentFeatures, formatFeatureCount } from "@/lib/feature-counter";
import { GoogleAd } from "@/components/google-ad";
import { generateDailyReflection, type DailyReflectionOutput } from "@/ai/flows/daily-reflection-flow";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [featureCount, setFeatureCount] = useState<string>("");
  const [hasMounted, setHasMounted] = useState(false);
  const [reflection, setReflection] = useState<DailyReflectionOutput | null>(null);
  const [isLoadingReflection, setIsLoadingReflection] = useState(true);
  const [dhikrCount, setDhikrCount] = useState(0);

  useEffect(() => {
    setHasMounted(true);
    const count = calculateCurrentFeatures();
    setFeatureCount(formatFeatureCount(count));

    async function loadReflection() {
      try {
        const data = await generateDailyReflection();
        setReflection(data);
      } catch (err) {
        console.error("Reflection node failed to sync:", err);
      } finally {
        setIsLoadingReflection(false);
      }
    }
    loadReflection();
  }, []);

  const brandHero = PlaceHolderImages?.find(img => img.id === 'brand-hero') || PlaceHolderImages[0];

  const allModules = [
    { title: "AI Teacher", href: "/mualim", icon: GraduationCap, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", group: "AI Infrastructure" },
    { title: "Ask AI", href: "/ask", icon: MessageCircle, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20", group: "AI Infrastructure" },
    { title: "Simplifier", href: "/explain", icon: Sparkles, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", group: "AI Infrastructure" },
    { title: "Defense", href: "/refutation", icon: ShieldAlert, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20", group: "AI Infrastructure" },
    { title: "Quran", href: "/quran", icon: BookMarked, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", group: "Core Knowledge" },
    { title: "Hadith", href: "/hadith", icon: ScrollText, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", group: "Core Knowledge" },
    { title: "Seerah", href: "/seerah", icon: History, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", group: "Core Knowledge" },
    { title: "Calendar", href: "/calendar", icon: CalendarIcon, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", group: "Core Knowledge" },
    { title: "Dawah Hub", href: "/dawah", icon: Megaphone, color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20", group: "Core Knowledge" },
    { title: "Aqidah", href: "/ask", icon: ShieldCheck, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", group: "Core Knowledge" },
    { title: "Tafsir", href: "/library", icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", group: "Core Knowledge" },
    { title: "Salah", href: "/prayer-times", icon: Clock, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", group: "Practical Living" },
    { title: "Masjid", href: "/masjid-locator", icon: MapPin, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", group: "Practical Living" },
    { title: "Adhkar", href: "/adhkar", icon: Zap, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", group: "Practical Living" },
    { title: "Zakat", href: "/zakat", icon: HandCoins, color: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20", group: "Practical Living" },
    { title: "Ramadan", href: "/ramadan", icon: Moon, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", group: "Practical Living" },
    { title: "Hajj Guide", href: "/hajj", icon: Tent, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", group: "Practical Living" },
    { title: "Ruqyah", href: "/ruqyah", icon: ShieldCheck, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20", group: "Practical Living" },
    { title: "Quizzes", href: "/quiz", icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20", group: "Interactive" },
    { title: "Goals", href: "/goals", icon: Target, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20", group: "Interactive" },
    { title: "Badges", href: "/goals", icon: ShieldCheck, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", group: "Interactive" },
    { title: "Challenges", href: "/kids", icon: Star, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20", group: "Interactive" },
  ];

  const categories = Array.from(new Set(allModules.map(m => m.group)));
  const visibleModules = isExpanded ? allModules : allModules.slice(0, 8);

  const incrementDhikr = () => setDhikrCount(prev => prev + 1);
  const resetDhikr = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDhikrCount(0);
  };

  if (!hasMounted) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Hero Section */}
      <section className="flex flex-col items-center pt-4 px-4">
        <div className="relative w-full max-w-lg aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black border border-white/5 group">
          <Image 
            src={brandHero.imageUrl} 
            alt="Deep dark scholarly library background" 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-40"
            priority
            data-ai-hint="dark library"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <span 
              className="text-7xl md:text-8xl font-serif text-white drop-shadow-[0_10px_30px_rgba(173,31,55,0.9)] select-none mb-2" 
              dir="rtl"
            >
              إسلاملي
            </span>
            <div className="h-px w-24 bg-primary/40 mt-2" />
            <p className="text-[10px] uppercase tracking-[0.5em] text-white/60 font-bold mt-4">Universal Scholarly Infrastructure</p>
          </div>
        </div>
      </section>

      {/* Interactive Worship Cluster */}
      <section className="px-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Dhikr Pulse Node */}
        <Card 
          className="glass-card border-primary/20 bg-primary/5 active:scale-[0.98] transition-all cursor-pointer group relative overflow-hidden"
          onClick={incrementDhikr}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary flex items-center gap-2">
                <Fingerprint className="w-3 h-3" /> Dhikr Pulse Node
              </span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 text-muted-foreground hover:text-primary"
                onClick={resetDhikr}
              >
                <RotateCcw className="w-3 h-3" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-6 gap-2">
            <div className="text-5xl font-headline font-bold text-white group-active:text-primary transition-colors">
              {dhikrCount}
            </div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">Tap to Glorify</p>
            <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap className="w-24 h-24 text-primary" />
            </div>
          </CardContent>
        </Card>

        {/* Daily Reflection Node */}
        <Card className="glass-card border-accent/20 bg-accent/5 overflow-hidden flex flex-col justify-center">
          <CardContent className="p-6">
            {isLoadingReflection ? (
              <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span className="text-xs italic">Syncing spiritual node...</span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-accent">
                  <Quote className="w-3 h-3" />
                  <span className="text-[9px] uppercase font-bold tracking-widest">Divine Reflection</span>
                </div>
                <p className="text-literata text-base leading-relaxed italic text-foreground line-clamp-3">
                  "{reflection?.reflection}"
                </p>
                <p className="text-[9px] text-accent font-bold uppercase tracking-tight">{reflection?.source}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Greeting & Ad Section */}
      <div className="px-6 space-y-6">
        <section className="text-right space-y-2">
          <h1 className="text-5xl font-headline font-bold text-white tracking-tight">السلام عليكم</h1>
          <p className="text-xl text-muted-foreground font-medium">{featureCount} Features Active</p>
        </section>
        <GoogleAd slot="home-top-responsive" />
      </div>

      {/* Module Navigation */}
      <section className="flex flex-col items-center gap-8 pt-4">
        <div className="w-full px-6 grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-500">
          {visibleModules.map((item) => (
            <Link key={item.title} href={item.href}>
              <Card className={cn(
                "glass-card hover:scale-[1.03] transition-all group h-full border-2",
                item.border,
                "hover:shadow-lg hover:shadow-primary/10"
              )}>
                <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-4">
                  <div className={cn(
                    "p-4 rounded-2xl transition-all duration-300 group-hover:scale-110",
                    item.bg,
                    item.color
                  )}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <span className="font-headline font-bold text-[10px] uppercase tracking-widest block group-hover:text-primary transition-colors">
                    {item.title}
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Button 
          variant="ghost" 
          className="rounded-full h-14 px-12 gap-3 font-headline font-bold border border-white/10 text-white bg-white/5 hover:bg-white/10 shadow-xl transition-all"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>Collapse Infrastructure <ChevronUp className="w-5 h-5" /></>
          ) : (
            <>Explore All {featureCount} Modules <ChevronDown className="w-5 h-5" /></>
          )}
        </Button>

        {isExpanded && (
          <div className="w-full space-y-14 animate-in slide-in-from-bottom-8 duration-500 px-6">
            {categories.map((group) => {
              const groupModules = allModules.filter(m => m.group === group);
              if (groupModules.length === 0) return null;

              return (
                <section key={group} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h3 className="text-[10px] font-headline font-bold uppercase tracking-[0.3em] text-muted-foreground whitespace-nowrap">
                      {group}
                    </h3>
                    <div className="h-px w-full bg-gradient-to-r from-border/50 to-transparent" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {groupModules.map((item) => (
                      <Link key={item.title} href={item.href}>
                        <Card className={cn(
                          "glass-card hover:scale-[1.03] transition-all group h-full border-2",
                          item.border
                        )}>
                          <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-4">
                            <div className={cn(
                              "p-4 rounded-2xl",
                              item.bg,
                              item.color
                            )}>
                              <item.icon className="w-6 h-6" />
                            </div>
                            <span className="font-headline font-bold text-[10px] uppercase tracking-widest">
                              {item.title}
                            </span>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </section>

      <footer className="py-12 text-center space-y-6 opacity-60">
        <div className="flex justify-center gap-3">
          <Badge variant="outline" className="text-[9px] uppercase tracking-[0.2em] font-bold border-red-500/20 bg-red-500/5 py-1.5 px-4 rounded-full text-red-500">
            Strictly No Bid'ah
          </Badge>
          <Link href="/credits">
            <Badge variant="outline" className="text-[9px] uppercase tracking-[0.2em] font-bold border-white/5 bg-white/5 py-1.5 px-4 rounded-full hover:bg-white/10 transition-colors">
              Scholarly Credits
            </Badge>
          </Link>
        </div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em] font-black">
          إسلاملي Universal Scholarly Platform v3.5
        </p>
      </footer>
    </div>
  );
}
