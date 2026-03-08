"use client";

import { Card, CardContent } from "@/components/ui/card";
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
  Home as HomeIcon, 
  Globe, 
  Database, 
  Compass, 
  Library, 
  Video, 
  Volume2, 
  Trophy, 
  Target, 
  Flame, 
  Star,
  UserCheck,
  ShieldCheck,
  ShieldAlert,
  BookOpen,
  Baby,
  Rocket,
  Moon,
  Newspaper,
  Heart,
  Users,
  Settings,
  Cloud
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { calculateCurrentFeatures, formatFeatureCount } from "@/lib/feature-counter";
import { GoogleAd } from "@/components/google-ad";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [featureCount, setFeatureCount] = useState<string>("2.5 Billion");

  useEffect(() => {
    const count = calculateCurrentFeatures();
    setFeatureCount(formatFeatureCount(count));
  }, []);

  const brandHero = PlaceHolderImages.find(img => img.id === 'brand-hero')!;

  const allModules = [
    // Cluster 1: AI Infrastructure
    { title: "AI Teacher", href: "/mualim", icon: GraduationCap, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", group: "AI Infrastructure" },
    { title: "Recitation", href: "/mualim", icon: Mic, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", group: "AI Infrastructure" },
    { title: "Ask AI", href: "/ask", icon: MessageCircle, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20", group: "AI Infrastructure" },
    { title: "Simplifier", href: "/explain", icon: Sparkles, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", group: "AI Infrastructure" },
    
    // Cluster 2: Core Knowledge
    { title: "Quran", href: "/quran", icon: BookMarked, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", group: "Core Knowledge" },
    { title: "Hadith", href: "/hadith", icon: ScrollText, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", group: "Core Knowledge" },
    { title: "Seerah", href: "/seerah", icon: History, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", group: "Core Knowledge" },
    { title: "Fiqh", href: "/fiqh", icon: Scale, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", group: "Core Knowledge" },
    { title: "Aqidah", href: "/ask", icon: ShieldCheck, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", group: "Core Knowledge" },
    { title: "Tafsir", href: "/library", icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20", group: "Core Knowledge" },
    { title: "Manhaj", href: "/ask", icon: Compass, color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20", group: "Core Knowledge" },
    { title: "History", href: "/seerah", icon: History, color: "text-amber-600", bg: "bg-amber-600/10", border: "border-amber-600/20", group: "Core Knowledge" },

    // Cluster 3: Practical Living
    { title: "Salah", href: "/prayer-times", icon: Clock, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", group: "Practical Living" },
    { title: "Masjid", href: "/masjid-locator", icon: MapPin, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", group: "Practical Living" },
    { title: "Halal", href: "/halal-locator", icon: Utensils, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", group: "Practical Living" },
    { title: "Adhkar", href: "/adhkar", icon: Zap, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", group: "Practical Living" },
    { title: "Ruqyah", href: "/ruqyah", icon: ShieldCheck, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20", group: "Practical Living" },
    { title: "Dua", href: "/adhkar", icon: Heart, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20", group: "Practical Living" },
    { title: "Zakat", href: "/fiqh", icon: Database, color: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20", group: "Practical Living" },
    { title: "Ramadan", href: "/prayer-times", icon: Moon, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", group: "Practical Living" },

    // Cluster 4: Community & Family
    { title: "Family", href: "/family", icon: HomeIcon, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20", group: "Community" },
    { title: "Kids", href: "/kids", icon: Rocket, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", group: "Community" },
    { title: "Teens", href: "/teens", icon: Flame, color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20", group: "Community" },
    { title: "Reverts", href: "/reverts", icon: UserCheck, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", group: "Community" },
    { title: "Parenting", href: "/parenting", icon: Baby, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20", group: "Community" },
    { title: "Dawah", href: "/dawah", icon: Globe, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", group: "Community" },
    { title: "Circles", href: "/circles", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20", group: "Community" },
    { title: "Elderly", href: "/family", icon: Users, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", group: "Community" },

    // Cluster 5: Research & Heritage
    { title: "Archive", href: "/manuscripts", icon: ScrollText, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", group: "Heritage" },
    { title: "Cloud", href: "/cloud", icon: Cloud, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", group: "Heritage" },
    { title: "Astronomy", href: "/astronomy", icon: Compass, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", group: "Heritage" },
    { title: "Scholars", href: "/scholars", icon: UserCheck, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", group: "Heritage" },
    { title: "Defense", href: "/refutation", icon: ShieldAlert, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", group: "Heritage" },
    { title: "Library", href: "/library", icon: Library, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", group: "Heritage" },
    { title: "News", href: "/news", icon: Newspaper, color: "text-zinc-400", bg: "bg-zinc-500/10", border: "border-zinc-500/20", group: "Heritage" },
    { title: "Live", href: "/live", icon: Video, color: "text-red-500", bg: "bg-red-500/10", border: "border-primary/20", group: "Heritage" },
    { title: "Audio", href: "/audio", icon: Volume2, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", group: "Heritage" },

    // Cluster 6: Interactive
    { title: "Quizzes", href: "/quiz", icon: Trophy, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/20", group: "Interactive" },
    { title: "Goals", href: "/goals", icon: Target, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20", group: "Interactive" },
    { title: "Badges", href: "/goals", icon: ShieldCheck, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20", group: "Interactive" },
    { title: "Challenges", href: "/kids", icon: Star, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20", group: "Interactive" },
  ];

  const categories = Array.from(new Set(allModules.map(m => m.group)));
  const visibleModules = isExpanded ? allModules : allModules.slice(0, 8);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Hero Section */}
      <section className="flex flex-col items-center pt-4 px-4" aria-labelledby="hero-title">
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
              id="hero-title"
              className="text-7xl md:text-8xl font-serif text-white drop-shadow-[0_10px_30px_rgba(173,31,55,0.9)] select-none mb-2" 
              dir="rtl"
              aria-label="Islamly Arabic Calligraphy"
            >
              إسلاملي
            </span>
            <div className="h-px w-24 bg-primary/40 mt-2" aria-hidden="true" />
            <p className="text-[10px] uppercase tracking-[0.5em] text-white/60 font-bold mt-4">Universal Cloud Infrastructure</p>
          </div>
          <div className="absolute top-0 left-0 w-1/2 h-full pointer-events-none opacity-20 bg-gradient-to-br from-primary via-transparent to-transparent" aria-hidden="true" />
          <div className="absolute bottom-0 right-0 w-1/2 h-full pointer-events-none opacity-20 bg-gradient-to-tl from-primary via-transparent to-transparent" aria-hidden="true" />
        </div>
      </section>

      {/* Greeting & Ad Section */}
      <div className="px-6 space-y-6">
        <section className="text-right space-y-2" aria-label="Welcome Greeting">
          <h1 className="text-5xl font-headline font-bold text-white tracking-tight">السلام عليكم</h1>
          <p className="text-xl text-muted-foreground font-medium">Continue your scholarly journey</p>
        </section>

        <GoogleAd slot="home-top-responsive" />
      </div>

      {/* Module Navigation */}
      <section className="flex flex-col items-center gap-8 pt-4" aria-label="Application Modules">
        {!isExpanded && (
          <div className="w-full px-6 grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-500">
            {visibleModules.map((item) => (
              <Link key={item.title} href={item.href} aria-label={`Go to ${item.title}`}>
                <Card className={cn(
                  "glass-card hover:scale-[1.03] transition-all group h-full border-2",
                  item.border,
                  "hover:shadow-lg hover:shadow-primary/10"
                )}>
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-4">
                    <div className={cn(
                      "p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 shadow-inner",
                      item.bg,
                      item.color
                    )}>
                      <item.icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div className="space-y-1">
                      <span className="font-headline font-bold text-[10px] uppercase tracking-widest block group-hover:text-primary transition-colors">
                        {item.title}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        <Button 
          variant="ghost" 
          className="rounded-full h-14 px-12 gap-3 font-headline font-bold border border-white/10 text-white bg-white/5 hover:bg-white/10 shadow-xl transition-all active:scale-95"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls="expanded-modules"
        >
          {isExpanded ? (
            <>Show Featured Modules <ChevronUp className="w-5 h-5" /></>
          ) : (
            <>Explore All Modules <ChevronDown className="w-5 h-5" /></>
          )}
        </Button>

        {isExpanded && (
          <div id="expanded-modules" className="w-full space-y-14 animate-in slide-in-from-bottom-8 duration-500 px-6">
            {categories.map((group) => {
              const groupModules = allModules.filter(m => m.group === group);
              if (groupModules.length === 0) return null;

              return (
                <section key={group} className="space-y-6">
                  <div className="flex items-center gap-4">
                    <h3 className="text-[10px] font-headline font-bold uppercase tracking-[0.3em] text-muted-foreground whitespace-nowrap">
                      {group}
                    </h3>
                    <div className="h-px w-full bg-gradient-to-r from-border/50 to-transparent" aria-hidden="true" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {groupModules.map((item) => (
                      <Link key={item.title} href={item.href} aria-label={`Go to ${item.title}`}>
                        <Card className={cn(
                          "glass-card hover:scale-[1.03] transition-all group h-full border-2",
                          item.border,
                          "hover:shadow-lg hover:shadow-primary/5"
                        )}>
                          <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-4">
                            <div className={cn(
                              "p-4 rounded-2xl transition-all duration-300 group-hover:scale-110",
                              item.bg,
                              item.color
                            )}>
                              <item.icon className="w-6 h-6" aria-hidden="true" />
                            </div>
                            <div className="space-y-1">
                              <span className="font-headline font-bold text-[10px] uppercase tracking-widest block group-hover:text-primary transition-colors">
                                {item.title}
                              </span>
                            </div>
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

      <GoogleAd slot="home-bottom-fluid" format="fluid" />

      <footer className="py-12 text-center space-y-6 opacity-60" aria-label="System Compliance">
        <div className="flex justify-center gap-3">
          <Badge variant="outline" className="text-[9px] uppercase tracking-[0.2em] text-white/70 font-bold border-white/5 bg-white/5 py-1.5 px-4 rounded-full">
            No Shirk or Bid'ah
          </Badge>
          <Badge variant="outline" className="text-[9px] uppercase tracking-[0.2em] text-white/70 font-bold border-white/5 bg-white/5 py-1.5 px-4 rounded-full">
            {featureCount} Features
          </Badge>
          <Link href="/cloud">
            <Badge variant="outline" className="hidden sm:flex text-[9px] uppercase tracking-[0.2em] text-blue-400 font-bold border-blue-500/10 bg-blue-500/5 py-1.5 px-4 rounded-full gap-2 hover:bg-blue-500/10 cursor-pointer transition-colors">
              <Cloud className="w-3 h-3" /> Universal Cloud Active
            </Badge>
          </Link>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-muted-foreground uppercase tracking-[0.4em] font-bold">
            إسلاملي Universal Scholarly Platform v3.0
          </p>
          <p className="text-[8px] text-muted-foreground/50 uppercase tracking-[0.2em]">
            © 2025 Islamly • All Rights Reserved • Authorized Infrastructure Node
          </p>
        </div>
      </footer>
    </div>
  );
}
