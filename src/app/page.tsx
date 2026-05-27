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
  Briefcase, Key, Lock, Fingerprint, Volume2, SearchCode, History, ChevronRight,
  Binary, Bot, Droplets, Video as VideoIcon
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SplashScreen } from "@/components/splash-screen";
import { cn } from "@/lib/utils";
import Image from "next/image";

// HIGH DENSITY SCHOLARLY INDEX: 100 UNIQUE PATHS
const modules = [
  // Cluster 1: The Final Revelation (1-20)
  { name: "Quran Reader", icon: BookOpen, href: "/quran", description: "Complete Uthmani Text", category: "Quran" },
  { name: "Qira'at Index", icon: Binary, href: "/qiraat", description: "10 Canonical Variants", category: "Quran" },
  { name: "Tafsir Archives", icon: Library, href: "/library/tafsir-ibn-kathir", description: "Scholarly Exegesis", category: "Quran" },
  { name: "Quranic Grammar", icon: SearchCode, href: "/language", description: "I'rab and Linguistics", category: "Quran" },
  { name: "Hifz Tracker", icon: Target, href: "/goals", description: "Memorization Pathway", category: "Quran" },
  { name: "Quranic Duas", icon: Sparkles, href: "/dua", description: "Supplications from the Quran", category: "Quran" },
  { name: "Manuscript Scans", icon: Scroll, href: "/manuscripts", description: "Early Historical Mushafs", category: "Quran" },
  { name: "Reciter Hub", icon: Mic2, href: "/quran", description: "Global Audio Cluster", category: "Quran" },
  { name: "Asbab al-Nuzul", icon: History, href: "/history", description: "Context of the Revelation", category: "Quran" },
  { name: "Tajweed Rules", icon: ShieldCheck, href: "/mualim", description: "Precision Articulation", category: "Quran" },
  { name: "Thematic Index", icon: ListOrdered, href: "/library", description: "Subjects in Quran", category: "Quran" },
  { name: "Quranic Miracles", icon: Zap, href: "/ask", description: "Scientific Evidences", category: "Quran" },
  { name: "Translation Hub", icon: Globe, href: "/language", description: "Reach in 7709+ Languages", category: "Quran" },
  { name: "Vocabulary Root", icon: Search, href: "/search", description: "Lexicon Infrastructure", category: "Quran" },
  { name: "Daily Ayah", icon: Calendar, href: "/inspire", description: "Spiritual Reflection", category: "Quran" },
  { name: "Khatm Plan", icon: Timer, href: "/goals", description: "Reading Cycle System", category: "Quran" },
  { name: "Uthmani Script", icon: PenTool, href: "/quran", description: "Digital Calligraphy", category: "Quran" },
  { name: "Quranic Atlas", icon: Map, href: "/history", description: "Locations in the Quran", category: "Quran" },
  { name: "Recitation Feedback", icon: Volume2, href: "/mualim", description: "AI Assessment Hub", category: "Quran" },
  { name: "Global Audio", icon: Radio, href: "/audio", description: "Universal Audio Hub", category: "Quran" },

  // Cluster 2: The Prophetic Path (21-40)
  { name: "Hadith Search", icon: Search, href: "/hadith", description: "Authentic Narrations", category: "Sunnah" },
  { name: "Sahih Bukhari", icon: Book, href: "/hadith", description: "The Most Authentic Book", category: "Sunnah" },
  { name: "Sahih Muslim", icon: Book, href: "/hadith", description: "Foundational Collection", category: "Sunnah" },
  { name: "40 Hadith Path", icon: ListOrdered, href: "/library", description: "An-Nawawi Collection", category: "Sunnah" },
  { name: "Prophetic Seerah", icon: History, href: "/seerah", description: "Life of the Prophet (ﷺ)", category: "Sunnah" },
  { name: "Shama'il Hub", icon: Heart, href: "/seerah", description: "Characteristics of Muhammad (ﷺ)", category: "Sunnah" },
  { name: "Sunnah Revival", icon: Flame, href: "/sunnah", description: "Forgotten Traditions", category: "Sunnah" },
  { name: "Hadith Grades", icon: ShieldCheck, href: "/hadith", description: "Authentication System", category: "Sunnah" },
  { name: "Sahaba Registry", icon: Users, href: "/scholars", description: "The Noble Companions", category: "Sunnah" },
  { name: "Prophetic Manners", icon: Smile, href: "/manners", description: "Akhlaq Infrastructure", category: "Sunnah" },
  { name: "Medical Sunnah", icon: Activity, href: "/ruqyah", description: "Prophetic Medicine (Tibb)", category: "Sunnah" },
  { name: "Dreams Index", icon: Moon, href: "/ask", description: "Interpretation Science", category: "Sunnah" },
  { name: "Hadith Sciences", icon: Brain, href: "/library", description: "Mustalah al-Hadith", category: "Sunnah" },
  { name: "Battle Sites", icon: Swords, href: "/history", description: "Historical Expeditions", category: "Sunnah" },
  { name: "Prophetic Diet", icon: Utensils, href: "/halal", description: "Etiquettes of Eating", category: "Sunnah" },
  { name: "Morning Adhkar", icon: Sun, href: "/adhkar", description: "Essential Protections", category: "Sunnah" },
  { name: "Evening Adhkar", icon: Moon, href: "/adhkar", description: "Nightly Remembrances", category: "Sunnah" },
  { name: "Travel Duas", icon: Plane, href: "/dua", description: "Sunnah of Journey", category: "Sunnah" },
  { name: "Family Ethics", icon: Baby, href: "/parenting", description: "Prophetic Households", category: "Sunnah" },
  { name: "Legacy System", icon: Landmark, href: "/history", description: "Preservation of Path", category: "Sunnah" },

  // Cluster 3: Jurisprudence (41-60)
  { name: "Prayer Times", icon: Clock, href: "/prayer-times", description: "Precision Solar Tracking", category: "Fiqh" },
  { name: "Qibla Compass", icon: Compass, href: "/hajj", description: "Directional Infrastructure", category: "Fiqh" },
  { name: "Wudu Guide", icon: Droplets, href: "/wudu", description: "Purification Protocol", category: "Fiqh" },
  { name: "Salah Pillars", icon: Columns, href: "/salah", description: "The 14 Essentials", category: "Fiqh" },
  { name: "Zakat Calculator", icon: Calculator, href: "/zakat", description: "Wealth Purification", category: "Fiqh" },
  { name: "Ramadan Hub", icon: Moon, href: "/ramadan", description: "Fasting Resources", category: "Fiqh" },
  { name: "Hajj Navigator", icon: MapPin, href: "/hajj", description: "Pilgrimage Pathways", category: "Fiqh" },
  { name: "Umrah Guide", icon: Footprints, href: "/hajj", description: "Step-by-Step Rituals", category: "Fiqh" },
  { name: "Halal Locator", icon: Utensils, href: "/halal-locator", description: "Tayyib Map Search", category: "Fiqh" },
  { name: "Inheritance", icon: Scale, href: "/zakat", description: "Mawarith Calculator", category: "Fiqh" },
  { name: "Trade Ethics", icon: Briefcase, href: "/sharia", description: "Fiqh of Transactions", category: "Fiqh" },
  { name: "Marriage Laws", icon: Heart, href: "/family", description: "Nikah Infrastructure", category: "Fiqh" },
  { name: "Islamic Finance", icon: HandCoins, href: "/zakat", description: "Riba-Free System", category: "Fiqh" },
  { name: "Food Laws", icon: Coffee, href: "/halal", description: "Rulings on Consumption", category: "Fiqh" },
  { name: "Dress Code", icon: Shirt, href: "/manners", description: "Haya and Modesty", category: "Fiqh" },
  { name: "Travel Fiqh", icon: Plane, href: "/sharia", description: "Shortening Prayers", category: "Fiqh" },
  { name: "Funeral Rites", icon: Landmark, href: "/library", description: "Janazah Protocol", category: "Fiqh" },
  { name: "Slaughter Rules", icon: Utensils, href: "/halal", description: "Udhiya and Zabiha", category: "Fiqh" },
  { name: "Water Purity", icon: Droplets, href: "/wudu", description: "Fiqh of Taharah", category: "Fiqh" },
  { name: "Justice System", icon: Gavel, href: "/sharia", description: "Judiciary Infrastructure", category: "Fiqh" },

  // Cluster 4: Creed & Scholars (61-80)
  { name: "Tawheed Hub", icon: ShieldCheck, href: "/tawheed", description: "Monotheism Foundation", category: "Aqidah" },
  { name: "Three Principles", icon: Triangle, href: "/tawheed", description: "Essential Knowledge", category: "Aqidah" },
  { name: "Name of Allah", icon: Star, href: "/tawheed", description: "99 Attributes System", category: "Aqidah" },
  { name: "Angels Realm", icon: Cloud, href: "/ask", description: "The Unseen Protocol", category: "Aqidah" },
  { name: "Day of Judgment", icon: Hourglass, href: "/ask", description: "The Final Reckoning", category: "Aqidah" },
  { name: "Divine Decree", icon: Anchor, href: "/tawheed", description: "Belief in Qadar", category: "Aqidah" },
  { name: "Refutation Lab", icon: ShieldAlert, href: "/refutation", description: "Defending the Creed", category: "Aqidah" },
  { name: "Major Scholars", icon: UserCheck, href: "/scholars", description: "Directory of Giants", category: "Aqidah" },
  { name: "Manhaj Study", icon: Compass, href: "/library", description: "Methodology Paths", category: "Aqidah" },
  { name: "Aqidah Quizzes", icon: Brain, href: "/quiz", description: "Interactive Assessments", category: "Aqidah" },
  { name: "Ahlus-Sunnah", icon: Flag, href: "/purpose", description: "Core Identity Hub", category: "Aqidah" },
  { name: "Nullifiers", icon: AlertCircle, href: "/tawheed", description: "Actions that Nullify Faith", category: "Aqidah" },
  { name: "Intercession", icon: Users, href: "/ask", description: "Rulings on Shafa'ah", category: "Aqidah" },
  { name: "Historical Sects", icon: EyeOff, href: "/refutation", description: "Analysis of Deviations", category: "Aqidah" },
  { name: "Sincerity (Ikhlas)", icon: Heart, href: "/manners", description: "Purification of Intent", category: "Aqidah" },
  { name: "Faith (Iman)", icon: Zap, href: "/tawheed", description: "Levels and Increase", category: "Aqidah" },
  { name: "Prophets Hub", icon: Users, href: "/history", description: "Stories of Messengers", category: "Aqidah" },
  { name: "Jinn Protocol", icon: EyeOff, href: "/ask", description: "Understanding the Unseen", category: "Aqidah" },
  { name: "Evidence Lab", icon: FileText, href: "/ask", description: "Scholarly Proofs System", category: "Aqidah" },
  { name: "Salaf Path", icon: History, href: "/library", description: "Understanding of Sahaba", category: "Aqidah" },

  // Cluster 5: Community & Tools (81-100)
  { name: "Ask Al-Mualim", icon: Bot, href: "/ask", description: "AI Scholarly Assistant", category: "Community" },
  { name: "Study Circles", icon: CircleDot, href: "/circles", description: "Interactive Halaqat", category: "Community" },
  { name: "Live Broadcasts", icon: Radio, href: "/live", description: "Real-time Knowledge", category: "Community" },
  { name: "Video Index", icon: VideoIcon, href: "/videos", description: "Verified Lectures Hub", category: "Community" },
  { name: "Dawah Lab", icon: Megaphone, href: "/dawah", description: "Outreach Infrastructure", category: "Community" },
  { name: "Reverts Hub", icon: UserPlus, href: "/reverts", description: "Welcome Home System", category: "Community" },
  { name: "Kids Zone", icon: Baby, href: "/kids", description: "Learning for Little Heroes", category: "Community" },
  { name: "Teens Hub", icon: Zap, href: "/teens", description: "Youth Faith Network", category: "Community" },
  { name: "Masjid Finder", icon: MapPin, href: "/masjid-locator", description: "GPS Global Search", category: "Community" },
  { name: "Ummah Status", icon: Activity, href: "/ummah", description: "Global Network Status", category: "Community" },
  { name: "Privacy Vault", icon: Lock, href: "/privacy", description: "Amanah Data Protection", category: "Infrastructure" },
  { name: "Cloud Status", icon: Cloud, href: "/cloud", description: "Infrastructure Health", category: "Infrastructure" },
  { name: "Achievement Hub", icon: Trophy, href: "/goals", description: "Digital Proofs System", category: "Personal" },
  { name: "Bookmarks", icon: Bookmark, href: "/library", description: "Archived Knowledge", category: "Personal" },
  { name: "Account Hub", icon: Key, href: "/login", description: "Identity Management", category: "Personal" },
  { name: "Scholarly Notes", icon: PenTool, href: "/library", description: "Personal Research Path", category: "Personal" },
  { name: "Alerts Center", icon: Bell, href: "/notifications", description: "System Dispatch Hub", category: "Infrastructure" },
  { name: "Linguistic Hub", icon: Globe, href: "/language", description: "Universal Translation", category: "Infrastructure" },
  { name: "Security Audit", icon: Fingerprint, href: "/privacy", description: "High-Security Layers", category: "Infrastructure" },
  { name: "System Credits", icon: HandCoins, href: "/credits", description: "Infrastructure Partners", category: "Infrastructure" },
];

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Features");
  const categories = ["All Features", "Quran", "Sunnah", "Fiqh", "Aqidah", "Community", "Infrastructure"];

  useEffect(() => {
    setHasMounted(true);
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!hasMounted) return null;
  if (showSplash) return <SplashScreen />;

  const filteredModules = activeCategory === "All Features" 
    ? modules 
    : modules.filter(m => m.category === activeCategory);

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
                <Image
                  src="/logo.png"
                  alt="Islamly logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div>
                <h1 className="text-3xl font-black uppercase tracking-[0.25em] text-white">Islamly</h1>
                <p className="mt-2 text-sm uppercase tracking-[0.35em] text-white/70">Scholarly infrastructure</p>
              </div>
            </div>

            <div className="max-w-xl text-center sm:text-right">
              <p className="text-base leading-7 text-muted-foreground">A naturally integrated experience for authentic Islamic knowledge, built to look and feel effortless.</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[10px] uppercase tracking-[0.32em] text-white/80 border border-white/10">
                Ahlus-Sunnah wal-Jama'ah
              </div>
            </div>
          </div>
        </section>

        {/* HIGH DENSITY 100 MODULE GRID */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/5 pb-8">
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 w-full sm:w-auto">
              {categories.map(cat => (
                <Button 
                  key={cat}
                  variant={activeCategory === cat ? "default" : "outline"}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full px-6 h-10 text-[10px] font-black uppercase tracking-widest transition-all",
                    activeCategory === cat ? "bg-primary shadow-lg shadow-primary/20" : "border-white/10 hover:bg-white/5"
                  )}
                >
                  {cat}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right hidden md:block">
                <p className="text-[10px] uppercase font-black text-primary tracking-widest">Global Status</p>
                <p className="text-[11px] text-muted-foreground italic">100 Primary Features Active</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {filteredModules.map((m, i) => (
              <Link key={i} href={m.href}>
                <Card className="glass-card hover:border-primary/40 transition-all group border-white/5 overflow-hidden h-full flex flex-col justify-between text-left relative active:scale-[0.98]">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <CardContent className="p-5 relative z-10 flex flex-col h-full space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-xl bg-secondary/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors shadow-inner border border-white/5">
                        <m.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="space-y-1 flex-grow">
                      <h3 className="text-sm font-headline font-bold text-white group-hover:text-primary transition-colors uppercase tracking-tight">{m.name}</h3>
                      <p className="text-[10px] text-muted-foreground leading-relaxed italic">{m.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <Badge variant="secondary" className="bg-white/5 text-muted-foreground text-[7px] uppercase tracking-tighter border-none">{m.category}</Badge>
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
            <p className="text-[10px] uppercase tracking-[0.5em] font-black italic">
              Universal Scholarly Resource • Built for the Ummah
            </p>
          </div>
          <p className="mt-4 text-[9px] uppercase tracking-[0.2em] font-bold">© 2025 Islamly Infrastructure v3.7 • Secured Path</p>
        </footer>
      </main>
    </div>
  );
}
