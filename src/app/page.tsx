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
  Users
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);

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
    { title: "Astronomy", href: "/astronomy", icon: Compass, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", group: "Heritage" },
    { title: "Scholars", href: "/scholars", icon: UserCheck, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", group: "Heritage" },
    { title: "Defense", href: "/refutation", icon: ShieldAlert, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", group: "Heritage" },
    { title: "Library", href: "/library", icon: Library, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20", group: "Heritage" },
    { title: "News", href: "/news", icon: Newspaper, color: "text-zinc-400", bg: "bg-zinc-500/10", border: "border-zinc-500/20", group: "Heritage" },
    { title: "Live", href: "/live", icon: Video, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20", group: "Heritage" },
    { title: "Audio", href: "/live", icon: Volume2, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", group: "Heritage" },

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
      <section className="flex flex-col items-center pt-4">
        <div className="relative w-72 h-72 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5">
          <Image 
            src="https://images.unsplash.com/photo-1720701575003-51dafcf39cb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxxdXJhbiUyMGNhbGxpZ3JhcGh5fGVufDB8fHx8MTc3MjQ0OTEzMHww&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Islamly Calligraphy Hero" 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-6xl font-serif text-white drop-shadow-lg" dir="rtl">إسلامي</span>
          </div>
        </div>
      </section>

      {/* Greeting Section */}
      <section className="text-right px-4 space-y-2">
        <h1 className="text-5xl font-headline font-bold text-white tracking-tight">السلام عليكم</h1>
        <p className="text-xl text-muted-foreground font-medium">Continue your Islamic learning journey</p>
      </section>

      {/* Universal Module Infrastructure */}
      <div className="flex flex-col items-center gap-6 pt-4">
        {!isExpanded && (
          <div className="w-full px-4 grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-500">
            {visibleModules.map((item) => (
              <Link key={item.title} href={item.href}>
                <Card className={cn(
                  "glass-card hover:scale-[1.03] transition-all group h-full border-2",
                  item.border,
                  "hover:shadow-lg hover:shadow-primary/5"
                )}>
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-4">
                    <div className={cn(
                      "p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 shadow-inner",
                      item.bg,
                      item.color
                    )}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <span className="font-headline font-bold text-xs uppercase tracking-widest block group-hover:text-primary transition-colors">
                      {item.title}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        <Button 
          variant="ghost" 
          className="rounded-full h-14 px-10 gap-3 font-headline font-bold border border-white/10 text-white bg-white/5 hover:bg-white/10"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>Show Featured Modules <ChevronUp className="w-5 h-5" /></>
          ) : (
            <>Explore Full Infrastructure <ChevronDown className="w-5 h-5" /></>
          )}
        </Button>

        {isExpanded && (
          <div className="w-full space-y-12 animate-in slide-in-from-bottom-8 duration-500 px-4">
            {categories.map((group) => {
              const groupModules = allModules.filter(m => m.group === group);
              if (groupModules.length === 0) return null;

              return (
                <section key={group} className="space-y-4">
                  <h3 className="text-xs font-headline font-bold uppercase tracking-widest text-muted-foreground/80 pl-1 border-l-2 border-[#AD1F37]/30 ml-1">
                    {group}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {groupModules.map((item) => (
                      <Link key={item.title} href={item.href}>
                        <Card className={cn(
                          "glass-card hover:scale-[1.03] transition-all group h-full border-2",
                          item.border,
                          "hover:shadow-lg hover:shadow-primary/5"
                        )}>
                          <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-4">
                            <div className={cn(
                              "p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 shadow-inner",
                              item.bg,
                              item.color
                            )}>
                              <item.icon className="w-6 h-6" />
                            </div>
                            <span className="font-headline font-bold text-xs uppercase tracking-widest block group-hover:text-primary transition-colors">
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
      </div>

      <footer className="py-10 text-center space-y-4 opacity-50">
        <div className="flex justify-center gap-2 mb-4">
          <Badge variant="outline" className="text-[10px] uppercase tracking-widest text-white/60 font-headline border-white/10">
            No Shirk or Bid'ah
          </Badge>
          <Badge variant="outline" className="text-[10px] uppercase tracking-widest text-white/60 font-headline border-white/10">
            10,000+ Features Active
          </Badge>
        </div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
          Islamly Universal Platform v2.5
        </p>
      </footer>
    </div>
  );
}
