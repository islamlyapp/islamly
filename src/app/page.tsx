
"use client";

import { useState, useEffect } from "react";
import { 
  Book, BookOpen, Clock, Heart, Radio, Users, Bell, Globe, Search, Layers, 
  Sparkles, Trophy, ShieldCheck, Zap, MessageSquare, Baby, Star, Target, 
  Compass, Scale, CheckCircle2, AlertTriangle, Columns, Sun, UserCheck, 
  User, ListOrdered, Bookmark, Shield, Triangle, Square, Tent, Navigation, 
  Calculator, Moon, Flame, Mic, Home as HomeIcon, Gift, Footprints, Percent, Link as LinkIcon, 
  Utensils, HandCoins, GraduationCap, Coffee, Plane, ShieldAlert, Activity, 
  Landmark, Map, Scroll, Calendar, MapPin, Megaphone, UserPlus, PenTool, 
  Mic2, Brain, Library, MessageCircle, Swords, Flag, Timer, AlertCircle, 
  CircleDot, Gavel, Cloud, Anchor, Smile, RefreshCcw, RotateCcw, DoorOpen, 
  Store, Shirt, EyeOff, Hourglass, Database, FileText, ClipboardCheck, 
  Briefcase, Key, Lock, Fingerprint, Volume2, SearchCode, History
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
  { name: "HERITAGE PATH", icon: History, href: "/history", color: "text-amber-600" },
  { name: "KNOWLEDGE SEARCH", icon: Search, href: "/ask", color: "text-blue-500" },
  { name: "AUTHENTIC SEERAH", icon: Compass, href: "/seerah", color: "text-emerald-600" },
  { name: "SCHOLARS DIRECTORY", icon: Users, href: "/scholars", color: "text-indigo-400" },
  { name: "PURPOSE PATH", icon: Target, href: "/purpose", color: "text-indigo-500" },
  { name: "KIDS HUB", icon: Baby, href: "/kids", color: "text-yellow-500" },
  { name: "YOUTH HUB", icon: Sparkles, href: "/teens", color: "text-pink-400" },
  { name: "SCHOLARLY CIRCLES", icon: MessageSquare, href: "/circles", color: "text-blue-400" },
  { name: "FIQH FOUNDATIONS", icon: Scale, href: "/fiqh", color: "text-emerald-500" },
  { name: "TAWHEED ULUHIYYAH", icon: ShieldCheck, href: "/tawheed", color: "text-red-500" },
  { name: "TAWHEED RUBUBIYYAH", icon: ShieldCheck, href: "/tawheed", color: "text-red-400" },
  { name: "ASMA WA-SIFAT", icon: Star, href: "/tawheed", color: "text-yellow-500" },
  { name: "SHAHADA CONDITIONS", icon: CheckCircle2, href: "/shahada", color: "text-emerald-400" },
  { name: "NULLIFIERS OF ISLAM", icon: AlertTriangle, href: "/shahada", color: "text-red-600" },
  { name: "PILLARS OF ISLAM", icon: Columns, href: "/coming-soon", color: "text-blue-500" },
  { name: "PILLARS OF IMAN", icon: Columns, href: "/coming-soon", color: "text-blue-400" },
  { name: "IHSAN PROTOCOL", icon: Sun, href: "/coming-soon", color: "text-amber-300" },
  { name: "SAHABA BIOS", icon: UserCheck, href: "/coming-soon", color: "text-indigo-500" },
  { name: "MOTHERS OF BELIEVERS", icon: User, href: "/coming-soon", color: "text-pink-500" },
  { name: "40 HADITH NAWAWI", icon: ListOrdered, href: "/hadith", color: "text-orange-500" },
  { name: "BULUGH AL-MARAM", icon: Bookmark, href: "/library/bulugh-al-maram", color: "text-primary" },
  { name: "UMDAT AL-AHKAM", icon: Bookmark, href: "/library/umdat-al-ahkam", color: "text-primary" },
  { name: "RIYAD AS-SALIHIN", icon: Star, href: "/coming-soon", color: "text-emerald-600" },
  { name: "KITAB AT-TAWHEED", icon: Shield, href: "/library/kitab-at-tawhid", color: "text-red-500" },
  { name: "AQIDAH WASITIYYAH", icon: Shield, href: "/library/wasitiyyah", color: "text-blue-600" },
  { name: "THREE PRINCIPLES", icon: Triangle, href: "/library/three-principles", color: "text-amber-600" },
  { name: "FOUR RULES", icon: Square, href: "/coming-soon", color: "text-orange-600" },
  { name: "HAJJ NAVIGATOR", icon: Tent, href: "/hajj", color: "text-amber-500" },
  { name: "UMRAH GUIDE", icon: Navigation, href: "/coming-soon", color: "text-blue-400" },
  { name: "ZAKAT CALCULATOR", icon: Calculator, href: "/zakat", color: "text-emerald-500" },
  { name: "FASTING RULINGS", icon: Moon, href: "/ramadan", color: "text-indigo-400" },
  { name: "RAMADAN PULSE", icon: Flame, href: "/ramadan", color: "text-orange-500" },
  { name: "TARAWEEH GUIDE", icon: Mic, href: "/taraweeh", color: "text-purple-400" },
  { name: "ITIKAF PROTOCOL", icon: HomeIcon, href: "/coming-soon", color: "text-blue-500" },
  { name: "EID ETIQUETTES", icon: Gift, href: "/coming-soon", color: "text-pink-400" },
  { name: "JANAZAH RULINGS", icon: Footprints, href: "/coming-soon", color: "text-zinc-500" },
  { name: "INHERITANCE LAWS", icon: Percent, href: "/coming-soon", color: "text-emerald-600" },
  { name: "MARRIAGE IN ISLAM", icon: Heart, href: "/family", color: "text-rose-500" },
  { name: "PARENTING HUB", icon: Users, href: "/parenting", color: "text-blue-400" },
  { name: "RIGHTS OF PARENTS", icon: Heart, href: "/family", color: "text-red-500" },
  { name: "TIES OF KINSHIP", icon: LinkIcon, href: "/family", color: "text-indigo-400" },
  { name: "HALAL GUIDE", icon: Utensils, href: "/halal", color: "text-emerald-500" },
  { name: "ISLAMIC FINANCE", icon: HandCoins, href: "/coming-soon", color: "text-amber-500" },
  { name: "MANNERS OF STUDENT", icon: GraduationCap, href: "/manners", color: "text-blue-600" },
  { name: "ETIQUETTE OF EATING", icon: Coffee, href: "/manners", color: "text-amber-700" },
  { name: "TRAVEL SUPPLICATIONS", icon: Plane, href: "/adhkar", color: "text-blue-400" },
  { name: "RUQYAH SHARIAH", icon: ShieldAlert, href: "/ruqyah", color: "text-red-500" },
  { name: "PROPHETIC MEDICINE", icon: Activity, href: "/coming-soon", color: "text-emerald-400" },
  { name: "HISTORY OF CALIPHS", icon: Landmark, href: "/history", color: "text-amber-800" },
  { name: "UMAYYAD HISTORY", icon: Map, href: "/history", color: "text-blue-800" },
  { name: "ABBASID ERA", icon: Map, href: "/history", color: "text-purple-800" },
  { name: "ANDALUSIA LEGACY", icon: Landmark, href: "/history", color: "text-amber-700" },
  { name: "MANUSCRIPT ARCHIVES", icon: Scroll, href: "/manuscripts", color: "text-yellow-600" },
  { name: "HIJRI CALENDAR", icon: Calendar, href: "/calendar", color: "text-zinc-400" },
  { name: "QIBLA FINDER", icon: Compass, href: "/coming-soon", color: "text-blue-500" },
  { name: "MASJID LOCATOR", icon: MapPin, href: "/masjid-locator", color: "text-primary" },
  { name: "HALAL LOCATOR", icon: MapPin, href: "/halal-locator", color: "text-emerald-600" },
  { name: "DAWAH INFRASTRUCTURE", icon: Megaphone, href: "/dawah", color: "text-red-500" },
  { name: "REVERTS SUPPORT", icon: UserPlus, href: "/reverts", color: "text-blue-400" },
  { name: "ARABIC GRAMMAR", icon: PenTool, href: "/language", color: "text-indigo-500" },
  { name: "TAJWEED SYSTEM", icon: Mic2, href: "/qiraat", color: "text-emerald-500" },
  { name: "HIFDH REVISION", icon: Brain, href: "/mualim", color: "text-purple-500" },
  { name: "TAFSIR IBN KATHIR", icon: Library, href: "/library/tafsir-ibn-kathir", color: "text-primary" },
  { name: "TAFSIR AS-SA'DI", icon: Library, href: "/coming-soon", color: "text-emerald-600" },
  { name: "40 HADITH QUDSI", icon: MessageCircle, href: "/hadith", color: "text-orange-500" },
  { name: "TEN PROMISED JANNAH", icon: Trophy, href: "/coming-soon", color: "text-yellow-500" },
  { name: "BATTLE OF BADR", icon: Swords, href: "/history", color: "text-zinc-600" },
  { name: "BATTLE OF UHUD", icon: Swords, href: "/history", color: "text-zinc-600" },
  { name: "BATTLE OF TRENCH", icon: Swords, href: "/history", color: "text-zinc-600" },
  { name: "CONQUEST OF MAKKAH", icon: Flag, href: "/history", color: "text-emerald-700" },
  { name: "FAREWELL SERMON", icon: Mic, href: "/seerah", color: "text-zinc-400" },
  { name: "MIRACLES OF PROPHET", icon: Sparkles, href: "/coming-soon", color: "text-blue-300" },
  { name: "LAST DAY SIGNS", icon: Timer, href: "/coming-soon", color: "text-red-400" },
  { name: "MAJOR SIGNS", icon: AlertCircle, href: "/coming-soon", color: "text-red-600" },
  { name: "MINOR SIGNS", icon: CircleDot, href: "/coming-soon", color: "text-amber-400" },
  { name: "DAY OF JUDGMENT", icon: Gavel, href: "/coming-soon", color: "text-zinc-700" },
  { name: "PARADISE & HELL", icon: Cloud, href: "/coming-soon", color: "text-blue-200" },
  { name: "SINCERITY (IKHLAS)", icon: Heart, href: "/manners", color: "text-red-500" },
  { name: "PATIENCE (SABR)", icon: Anchor, href: "/manners", color: "text-blue-500" },
  { name: "RELIANCE (TAWAKKUL)", icon: Shield, href: "/manners", color: "text-indigo-500" },
  { name: "GRATITUDE (SHUKR)", icon: Smile, href: "/manners", color: "text-yellow-500" },
  { name: "REPENTANCE (TAWBAH)", icon: RefreshCcw, href: "/coming-soon", color: "text-emerald-500" },
  { name: "SEEKING FORGIVENESS", icon: RotateCcw, href: "/coming-soon", color: "text-zinc-400" },
  { name: "RIGHTS OF NEIGHBORS", icon: DoorOpen, href: "/family", color: "text-amber-600" },
  { name: "HONESTY IN TRADE", icon: Store, href: "/coming-soon", color: "text-blue-600" },
  { name: "MODESTY & HIJAB", icon: Shirt, href: "/coming-soon", color: "text-pink-400" },
  { name: "LOWERING THE GAZE", icon: EyeOff, href: "/coming-soon", color: "text-zinc-500" },
  { name: "TIME MANAGEMENT", icon: Hourglass, href: "/goals", color: "text-blue-400" },
  { name: "ISLAMIC PSYCHOLOGY", icon: Brain, href: "/coming-soon", color: "text-indigo-400" },
  { name: "REFUTATION PATH", icon: ShieldAlert, href: "/refutation", color: "text-red-600" },
  { name: "SCHOLARLY DEFENSE", icon: ShieldCheck, href: "/refutation", color: "text-red-700" },
  { name: "UNIVERSAL SYSTEM", icon: Database, href: "/cloud", color: "text-blue-600" },
  { name: "NEW MODULE", icon: FileText, href: "/new-module", color: "text-gray-400" }
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
    <div className="bg-black text-white min-h-screen font-sans selection:bg-primary/30 animate-in fade-in duration-700">
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

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Exact Logo Aesthetic Background */}
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

        {/* 100 Module Dense Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {modules.map((m, idx) => (
            <Link key={idx} href={m.href}>
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
