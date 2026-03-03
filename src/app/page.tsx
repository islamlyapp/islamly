"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookMarked, 
  ArrowRight, 
  Moon, 
  Sparkles, 
  Scale, 
  UserPlus, 
  Globe, 
  Video,
  MessageCircle,
  ShieldAlert,
  Clock,
  MapPin,
  Utensils,
  Home as HomeIcon,
  Zap,
  Newspaper,
  Trophy,
  ShieldCheck,
  Loader2,
  History,
  ScrollText,
  Mic,
  GraduationCap
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { generateDailyReflection, type DailyReflectionOutput } from "@/ai/flows/daily-reflection-flow";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";

export default function Home() {
  const { user } = useUser();
  const db = useFirestore();
  const [reflection, setReflection] = useState<DailyReflectionOutput | null>(null);
  const [loadingReflection, setLoadingReflection] = useState(true);

  const profileRef = useMemoFirebase(() => {
    if (!db || !user?.uid) return null;
    return doc(db, "users", user.uid);
  }, [db, user?.uid]);

  const { data: profile } = useDoc(profileRef);

  useEffect(() => {
    async function loadReflection() {
      try {
        const data = await generateDailyReflection();
        setReflection(data);
      } catch (err) {
        console.error("Failed to load daily reflection:", err);
      } finally {
        setLoadingReflection(false);
      }
    }
    loadReflection();
  }, []);

  const categories = [
    { 
      group: "AI Recitation & Teacher",
      items: [
        { title: "Al-Mualim", href: "/mualim", icon: GraduationCap, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
        { title: "Recite", href: "/mualim", icon: Mic, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
        { title: "Ask AI", href: "/ask", icon: MessageCircle, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" },
        { title: "Explain", href: "/explain", icon: Sparkles, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
      ]
    },
    { 
      group: "Core Knowledge",
      items: [
        { title: "Quran", href: "/quran", icon: BookMarked, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
        { title: "Hadith", href: "/hadith", icon: ScrollText, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
        { title: "Seerah", href: "/seerah", icon: History, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
        { title: "Fiqh", href: "/fiqh", icon: Scale, color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
      ]
    },
    {
      group: "Interactive & Protection",
      items: [
        { title: "Quizzes", href: "/quiz", icon: Trophy, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
        { title: "Ruqyah", href: "/ruqyah", icon: ShieldCheck, color: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20" },
        { title: "Defense", href: "/refutation", icon: ShieldAlert, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" },
        { title: "News", href: "/news", icon: Newspaper, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" },
      ]
    },
    {
      group: "Community",
      items: [
        { title: "Families", href: "/family", icon: HomeIcon, color: "text-pink-400", bg: "bg-pink-500/10", border: "border-pink-500/20" },
        { title: "Youth", href: "/teens", icon: Zap, color: "text-yellow-300", bg: "bg-yellow-400/10", border: "border-yellow-400/20" },
        { title: "Masjids", href: "/masjid-locator", icon: MapPin, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
        { title: "Halal", href: "/halal-locator", icon: Utensils, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-headline font-bold tracking-tight text-foreground flex items-center gap-3">
          Assalamu Alaikum
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg animate-bounce">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
        </h1>
        <div className="flex items-center gap-2">
          <p className="text-muted-foreground text-lg italic">
            Welcome to Islamly, your authentic scholarly companion.
          </p>
          {profile?.preferredLanguage && (
            <Badge variant="outline" className="text-[10px] gap-1 py-0 border-accent/30 text-accent">
              <Globe className="w-3 h-3" />
              {profile.preferredLanguage} Active
            </Badge>
          )}
        </div>
      </header>

      {/* Main Feature Highlight */}
      <section>
        <Link href="/mualim">
          <Card className="bg-primary/5 border-2 border-primary/20 hover:border-primary/50 transition-all group overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Mic className="w-40 h-40 rotate-12" />
            </div>
            <CardContent className="p-8 space-y-4 relative z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-primary rounded-xl shadow-lg">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-headline font-bold">Start Al-Mualim Recitation</h2>
                  <p className="text-sm text-muted-foreground">Get instant AI-powered feedback on your Tajweed and Hifz.</p>
                </div>
              </div>
              <Button className="w-full h-12 gap-2 text-md font-headline shadow-xl shadow-primary/20 group-hover:scale-[1.02] transition-transform">
                Recite to AI <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        </Link>
      </section>

      {/* Quick Status Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/10 border-primary/20 hover:bg-primary/20 transition-all cursor-pointer group">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Next Prayer</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Dhuhr</div>
            <p className="text-xs text-muted-foreground">In 2 hours 15 minutes</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card hover:border-accent/50 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Daily Adhkar</CardTitle>
            <Moon className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">Evening Adhkar</div>
            <Link href="/adhkar" className="text-xs text-accent hover:underline flex items-center gap-1 mt-1">
              Read now <ArrowRight className="w-3 h-3" />
            </Link>
          </CardContent>
        </Card>

        <Card className="glass-card border-l-4 border-yellow-500 hover:bg-yellow-500/5 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Memorization Goal</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">Surah Al-Mulk</div>
            <p className="text-xs text-muted-foreground mt-1">65% Completed</p>
          </CardContent>
        </Card>
      </section>

      {/* Feature Groups */}
      {categories.map((group) => (
        <section key={group.group} className="space-y-4">
          <h3 className="text-sm font-headline font-bold uppercase tracking-widest text-muted-foreground/80 pl-1 border-l-2 border-primary/30 ml-1">
            {group.group}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {group.items.map((item) => (
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
                    <div className="space-y-1">
                      <span className="font-headline font-bold text-xs uppercase tracking-widest block group-hover:text-primary transition-colors">
                        {item.title}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* AI Reflection Section */}
      <section className="py-4">
        <Card className="bg-accent/5 border-accent/20 overflow-hidden relative group">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Daily Reflection
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingReflection ? (
              <div className="flex items-center gap-2 py-4 text-muted-foreground italic text-sm">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                Retrieving spiritual insight...
              </div>
            ) : reflection && (
              <div className="space-y-4 animate-in fade-in duration-700">
                {reflection.arabicText && (
                  <p className="text-2xl font-serif text-literata text-right leading-loose" dir="rtl">
                    {reflection.arabicText}
                  </p>
                )}
                <p className="text-lg text-foreground/90 font-medium italic leading-relaxed">
                  "{reflection.reflection}"
                </p>
                <p className="text-[10px] uppercase tracking-widest text-accent font-bold">
                  Source: {reflection.source}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <footer className="py-10 pb-20 text-center space-y-4">
        <div className="flex flex-col items-center gap-2">
          <Badge variant="outline" className="text-[10px] uppercase tracking-widest text-primary font-headline">
            Islamly Infrastructure
          </Badge>
          <span className="text-[9px] text-muted-foreground uppercase tracking-widest flex items-center gap-1">
            <Globe className="w-2 h-2" />
            Universal Authentic Knowledge for All Humanity
          </span>
        </div>
      </footer>
    </div>
  );
}
