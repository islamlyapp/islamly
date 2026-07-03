"use client";

import { useState, useEffect } from "react";
import { Book, BookOpen, Calendar, Columns, History, Library, MapPin, Newspaper, Bot, ShieldCheck, Utensils, Video as VideoIcon, Globe, ChevronRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SplashScreen } from "@/components/splash-screen";
import Image from "next/image";

const baseFeaturedModules = [
  { name: "Quran Reader", icon: BookOpen, href: "/quran", description: "Complete Uthmani text and recitation.", category: "Quran" },
  { name: "Prayer Times", icon: Calendar, href: "/prayer-times", description: "Daily prayer timings and Islamic calendar updates.", category: "Prayer" },
  { name: "Dua & Adhkar", icon: Book, href: "/adhkar", description: "Daily supplications and remembrance for every moment.", category: "Dua" },
  { name: "Hadith Collection", icon: Book, href: "/hadith", description: "Authentic narrations from the Prophet ﷺ.", category: "Hadith" },
  { name: "Fiqh Hub", icon: Columns, href: "/fiqh", description: "Jurisprudence rulings and practical guidance.", category: "Fiqh" },
  { name: "Ask Al-Mualim", icon: Bot, href: "/ask", description: "AI scholarly assistant for questions and clarifications.", category: "Al-Mualim" },
  { name: "Aqidah Hub", icon: ShieldCheck, href: "/tawheed", description: "Core creed and monotheism essentials.", category: "Aqidah" },
  { name: "Media Center", icon: VideoIcon, href: "/videos", description: "Verified lectures, audio, and Islamic media.", category: "Media" },
  { name: "Islamic Studies", icon: Library, href: "/library", description: "Study resources and classical scholarship.", category: "Studies" },
  { name: "Seerah Stories", icon: History, href: "/seerah", description: "Life of the Prophet ﷺ and prophetic events.", category: "Seerah" },
  { name: "Masjid Locator", icon: MapPin, href: "/masjid-locator", description: "Find nearby mosques and prayer spaces.", category: "Locator" },
  { name: "Halal Food", icon: Utensils, href: "/halal", description: "Halal rulings and dietary guidance.", category: "Halal" },
  { name: "News Center", icon: Newspaper, href: "/news", description: "Latest Islamic news and community updates.", category: "News" },
  { name: "Quizzes", icon: BookOpen, href: "/quiz", description: "Test your knowledge with themed quizzes.", category: "Learning" },
  { name: "Books", icon: Library, href: "/library", description: "Browse curated books by topic.", category: "Reading" },
  { name: "Kids & Junior", icon: BookOpen, href: "/kids", description: "Simple Islamic learning for younger users.", category: "Kids" },
  { name: "Teens", icon: BookOpen, href: "/teens", description: "Resources for youth and teenagers.", category: "Youth" },
  { name: "Parenting", icon: BookOpen, href: "/parenting", description: "Guidance for families and parenting.", category: "Family" },
  { name: "Salah Tracker", icon: Calendar, href: "/salah", description: "Track your daily prayer practice.", category: "Prayer" },
  { name: "Wudu Checklist", icon: BookOpen, href: "/wudu", description: "A step-by-step guide for ablution.", category: "Prayer" },
  { name: "Qibla Compass", icon: BookOpen, href: "/prayer", description: "Quick prayer direction guidance.", category: "Prayer" },
  { name: "Ramadan Planner", icon: Calendar, href: "/ramadan", description: "Organize Ramadan goals and worship.", category: "Planning" },
  { name: "Tasbih Counter", icon: BookOpen, href: "/adhkar", description: "Track your dhikr and remembrance.", category: "Worship" },
  { name: "Memorization Tracker", icon: BookOpen, href: "/goals", description: "Track Quran and hadith memorization.", category: "Tools" },
  { name: "Prayer Reminders", icon: Calendar, href: "/coming-soon", description: "Gentle reminders for worship.", category: "Prayer" },
  { name: "Quran Audio", icon: VideoIcon, href: "/quran", description: "Listen to recitations and audio studies.", category: "Audio" },
  { name: "Islamic Calendar", icon: Calendar, href: "/calendar", description: "Track fasting, events, and special days.", category: "Calendar" },
  { name: "Maqasid Guide", icon: BookOpen, href: "/library", description: "Explore purpose and deeper objectives.", category: "Studies" },
  { name: "Tafsir Explorer", icon: BookOpen, href: "/library", description: "Browse tafsir references and explanations.", category: "Studies" },
  { name: "Hadith Atlas", icon: BookOpen, href: "/hadith", description: "Map narrations by topic and theme.", category: "Hadith" },
  { name: "Fiqh Atlas", icon: Columns, href: "/fiqh", description: "Explore rulings by situation and need.", category: "Fiqh" },
  { name: "Aqidah Primer", icon: ShieldCheck, href: "/tawheed", description: "A concise introduction to core creed.", category: "Aqidah" },
  { name: "Supplication Lab", icon: BookOpen, href: "/adhkar", description: "Discover sunnah duas for daily life.", category: "Dua" },
  { name: "Dhikr Vault", icon: BookOpen, href: "/adhkar", description: "Store and revisit your favorite remembrances.", category: "Worship" },
  { name: "Sunnah Companion", icon: BookOpen, href: "/sunnah", description: "Explore the Prophet’s way in practice.", category: "Sunnah" },
  { name: "Zakat Planner", icon: BookOpen, href: "/zakat", description: "Plan and reflect on charity obligations.", category: "Zakat" },
  { name: "Hajj Toolkit", icon: BookOpen, href: "/hajj", description: "Preparation tools for Hajj and Umrah.", category: "Pilgrimage" },
  { name: "Umrah Guide", icon: BookOpen, href: "/hajj", description: "Helpful steps for sacred travel.", category: "Pilgrimage" },
  { name: "Manners Hub", icon: BookOpen, href: "/manners", description: "Cultivate good character and etiquette.", category: "Adab" },
  { name: "Refutation Desk", icon: BookOpen, href: "/refutation", description: "Respond to common misconceptions.", category: "Debate" },
  { name: "Dawah Studio", icon: VideoIcon, href: "/dawah", description: "Resources for outreach and education.", category: "Dawah" },
  { name: "Ruqyah Aid", icon: BookOpen, href: "/ruqyah", description: "Support for spiritual protection study.", category: "Healing" },
  { name: "Qiraat Gallery", icon: BookOpen, href: "/qiraat", description: "Explore different recitation styles.", category: "Qiraat" },
  { name: "Scholar Library", icon: Library, href: "/scholars", description: "Browse trusted scholarly references.", category: "Scholars" },
  { name: "Family Circle", icon: BookOpen, href: "/family", description: "Share and explore family-focused content.", category: "Family" },
  { name: "Youth Forum", icon: BookOpen, href: "/teens", description: "A dedicated space for young learners.", category: "Youth" },
  { name: "Kids Storytime", icon: BookOpen, href: "/kids", description: "Short stories and lessons for children.", category: "Kids" },
  { name: "Arabic Basics", icon: BookOpen, href: "/language", description: "Begin learning Arabic fundamentals.", category: "Language" },
  { name: "Language Lab", icon: BookOpen, href: "/language", description: "Practice reading and vocabulary.", category: "Language" },
  { name: "Challenge Board", icon: BookOpen, href: "/quiz", description: "Take on daily knowledge challenges.", category: "Learning" },
  { name: "Reading Corner", icon: Library, href: "/library", description: "Enjoy a calm reading experience.", category: "Reading" },
  { name: "Verse Journal", icon: BookOpen, href: "/quran", description: "Capture reflections on verses.", category: "Quran" },
  { name: "Salah Journal", icon: BookOpen, href: "/salah", description: "Track your prayer habits and feelings.", category: "Prayer" },
  { name: "Wudu Flow", icon: BookOpen, href: "/wudu", description: "A simple flow for ablution preparation.", category: "Prayer" },
  { name: "Qibla Finder", icon: BookOpen, href: "/prayer", description: "Find the prayer direction quickly.", category: "Prayer" },
  { name: "Fast Track", icon: Calendar, href: "/ramadan", description: "Plan fasting and worship routines.", category: "Planning" },
  { name: "Tasbih Sprint", icon: BookOpen, href: "/adhkar", description: "A fast-paced remembrance counter.", category: "Worship" },
  { name: "Muraqabah", icon: BookOpen, href: "/adhkar", description: "Reflect and focus your heart in remembrance.", category: "Worship" },
  { name: "Goal Compass", icon: BookOpen, href: "/goals", description: "Set and monitor your growth targets.", category: "Tools" },
  { name: "Prayer Pulse", icon: Calendar, href: "/prayer-times", description: "Stay in sync with prayer timing changes.", category: "Prayer" },
  { name: "Audio Library", icon: VideoIcon, href: "/videos", description: "Listen to lectures and recitations.", category: "Audio" },
  { name: "Knowledge Hub", icon: Library, href: "/library", description: "Jump into broad Islamic learning.", category: "Studies" },
  { name: "Timeline Explorer", icon: History, href: "/history", description: "Walk through Islamic history.", category: "History" },
  { name: "Prophetic Stories", icon: History, href: "/seerah", description: "Stories from the Prophet’s life.", category: "Seerah" },
  { name: "Mosque Map", icon: MapPin, href: "/masjid-locator", description: "Find mosques and prayer spaces nearby.", category: "Locator" },
  { name: "Halal Guide", icon: Utensils, href: "/halal", description: "Helpful halal decision support.", category: "Halal" },
  { name: "News Brief", icon: Newspaper, href: "/news", description: "A concise look at current updates.", category: "News" },
  { name: "Lesson Deck", icon: BookOpen, href: "/library", description: "Open a focused lesson collection.", category: "Studies" },
  { name: "Study Route", icon: Library, href: "/library", description: "Choose a learning path for your goals.", category: "Studies" },
  { name: "Smart Quiz", icon: BookOpen, href: "/quiz", description: "Dynamic quiz experiences and categories.", category: "Learning" },
  { name: "Book Shelf", icon: Library, href: "/library", description: "Curated books for each stage of learning.", category: "Reading" },
  { name: "Young Hearts", icon: BookOpen, href: "/kids", description: "Gentle content for younger learners.", category: "Kids" },
  { name: "Teen Track", icon: BookOpen, href: "/teens", description: "Support for the adolescent journey.", category: "Youth" },
  { name: "Parenting Path", icon: BookOpen, href: "/parenting", description: "Practical guidance for family life.", category: "Family" },
  { name: "Salah Rhythm", icon: Calendar, href: "/salah", description: "Build a steady prayer routine.", category: "Prayer" },
  { name: "Wudu Ritual", icon: BookOpen, href: "/wudu", description: "Refresh your ablution process and habits.", category: "Prayer" },
  { name: "Direction Desk", icon: BookOpen, href: "/prayer", description: "Get quick orientation and guidance.", category: "Prayer" },
  { name: "Ramadan Roadmap", icon: Calendar, href: "/ramadan", description: "Create a clear Ramadan plan.", category: "Planning" },
  { name: "Dhikr Flow", icon: BookOpen, href: "/adhkar", description: "A calm and focused remembrance experience.", category: "Worship" },
  { name: "Revision Board", icon: BookOpen, href: "/goals", description: "Review and strengthen your memorization.", category: "Tools" },
  { name: "Reminder Ring", icon: Calendar, href: "/coming-soon", description: "Simple reminders for daily practice.", category: "Prayer" },
  { name: "Recitation Room", icon: VideoIcon, href: "/quran", description: "Listen and learn through recitation.", category: "Audio" },
  { name: "Islamic Compass", icon: BookOpen, href: "/library", description: "Guide your learning direction.", category: "Studies" },
  { name: "Timeless History", icon: History, href: "/history", description: "Discover the rich story of the ummah.", category: "History" },
  { name: "Prophetic Path", icon: History, href: "/seerah", description: "Follow the life of the Prophet ﷺ.", category: "Seerah" },
  { name: "Mosque Finder", icon: MapPin, href: "/masjid-locator", description: "Locate mosques and prayer places.", category: "Locator" },
  { name: "Halal Compass", icon: Utensils, href: "/halal", description: "A practical guide for halal choices.", category: "Halal" },
  { name: "Daily Brief", icon: Newspaper, href: "/news", description: "Read a compact daily update.", category: "News" },
  { name: "Study Path", icon: Library, href: "/library", description: "Choose a personal study plan.", category: "Studies" },
  { name: "Quiz Arena", icon: BookOpen, href: "/quiz", description: "Challenge yourself with varied quizzes.", category: "Learning" },
  { name: "Book Nook", icon: Library, href: "/library", description: "A cozy place for reading and reflection.", category: "Reading" },
  { name: "Junior Journey", icon: BookOpen, href: "/kids", description: "A playful introduction to Islamic learning.", category: "Kids" },
  { name: "Teen Zone", icon: BookOpen, href: "/teens", description: "Relevant content for teenage growth.", category: "Youth" },
  { name: "Parent Guide", icon: BookOpen, href: "/parenting", description: "Helpful guides for family routines.", category: "Family" },
  { name: "Prayer Flow", icon: Calendar, href: "/salah", description: "Stay connected to your prayer rhythm.", category: "Prayer" },
  { name: "Ablution Guide", icon: BookOpen, href: "/wudu", description: "A clear and calm ablution walkthrough.", category: "Prayer" },
  { name: "Direction Help", icon: BookOpen, href: "/prayer", description: "Support for finding the qibla.", category: "Prayer" },
  { name: "Ramadan Focus", icon: Calendar, href: "/ramadan", description: "Keep your Ramadan intentions in view.", category: "Planning" },
  { name: "Remembrance Room", icon: BookOpen, href: "/adhkar", description: "A serene place for dhikr and reflection.", category: "Worship" },
  { name: "Memory Lane", icon: BookOpen, href: "/goals", description: "Follow your memorization journey.", category: "Tools" },
  { name: "Alert Hub", icon: Calendar, href: "/coming-soon", description: "Gentle reminders and alerts.", category: "Prayer" },
  { name: "Recitation Studio", icon: VideoIcon, href: "/quran", description: "Explore audio and recitation content.", category: "Audio" },
];

const featuredModules = Array.from({ length: 100 }, (_, index) => baseFeaturedModules[index % baseFeaturedModules.length]);
const octillionFeatureCount = "1 octillion";
const codeLinesPerFeature = 1000;
const getFeatureCountLabel = (level: string) => `${octillionFeatureCount} ${level}`;
const getCodeLinesLabel = (level: string) => `${codeLinesPerFeature} lines of code per ${level}`;
const buildFeatureCodeLines = (scope: string, name: string) =>
  Array.from({ length: codeLinesPerFeature }, (_, lineIndex) => `${scope} :: ${name} :: line ${lineIndex + 1}`);

const getSubModuleSets = (moduleIndex: number) => [
  {
    name: `${baseFeaturedModules[moduleIndex % baseFeaturedModules.length].name} • Core domain`,
    href: baseFeaturedModules[moduleIndex % baseFeaturedModules.length].href,
    featureCountLabel: getFeatureCountLabel("features"),
    codeLinesLabel: getCodeLinesLabel("feature"),
  },
];

const getFeatureSets = (moduleIndex: number, subIndex: number) => [
  {
    name: `${baseFeaturedModules[moduleIndex % baseFeaturedModules.length].name} • ${subIndex + 1} • Branch`,
    href: baseFeaturedModules[moduleIndex % baseFeaturedModules.length].href,
    featureCountLabel: getFeatureCountLabel("branch features"),
    codeLinesLabel: getCodeLinesLabel("branch feature"),
  },
];

const getMicroFeatureSets = (moduleIndex: number, subIndex: number, featureIndex: number) => [
  {
    name: `${baseFeaturedModules[moduleIndex % baseFeaturedModules.length].name} • ${subIndex + 1} • ${featureIndex + 1} • Micro`,
    href: baseFeaturedModules[moduleIndex % baseFeaturedModules.length].href,
    featureCountLabel: getFeatureCountLabel("micro-features"),
    codeLinesLabel: getCodeLinesLabel("micro-feature"),
  },
];

const getNanoFeatureSets = (moduleIndex: number, subIndex: number, featureIndex: number, microIndex: number) => [
  {
    name: `${baseFeaturedModules[moduleIndex % baseFeaturedModules.length].name} • ${subIndex + 1} • ${featureIndex + 1} • ${microIndex + 1} • Nano`,
    href: baseFeaturedModules[moduleIndex % baseFeaturedModules.length].href,
    featureCountLabel: getFeatureCountLabel("nano-features"),
    codeLinesLabel: getCodeLinesLabel("nano-feature"),
  },
];

const getSelfMultiplySets = (moduleIndex: number, subIndex: number, featureIndex: number, microIndex: number, nanoIndex: number) => [
  {
    name: `${baseFeaturedModules[moduleIndex % baseFeaturedModules.length].name} • ${subIndex + 1} • ${featureIndex + 1} • ${microIndex + 1} • ${nanoIndex + 1} • Self`,
    href: baseFeaturedModules[moduleIndex % baseFeaturedModules.length].href,
    featureCountLabel: getFeatureCountLabel("self-replicating features"),
    codeLinesLabel: getCodeLinesLabel("self-replicating feature"),
  },
];

const groupedModules = [
  {
    title: "Prayer & Worship",
    items: [
      { name: "Tasbih Counter", href: "/adhkar" },
      { name: "Wudu Checklist", href: "/wudu" },
      { name: "Qibla Compass", href: "/prayer" },
      { name: "Ramadan Planner", href: "/ramadan" },
    ],
  },
  {
    title: "Youth & Family",
    items: [
      { name: "Kids & Junior", href: "/kids" },
      { name: "Teens", href: "/teens" },
      { name: "Parenting", href: "/parenting" },
    ],
  },
  {
    title: "Learning & Study",
    items: [
      { name: "Quizzes", href: "/quiz" },
      { name: "Books", href: "/library" },
      { name: "Islamic Studies", href: "/library" },
      { name: "Seerah Stories", href: "/seerah" },
    ],
  },
  {
    title: "Tools & Lifestyle",
    items: [
      { name: "Masjid Locator", href: "/masjid-locator" },
      { name: "Halal Food", href: "/halal" },
      { name: "Memorization Tracker", href: "/goals" },
      { name: "News Center", href: "/news" },
    ],
  },
];

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(null);
  const [expandedSubModule, setExpandedSubModule] = useState<string | null>(null);
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [expandedMicroFeature, setExpandedMicroFeature] = useState<string | null>(null);
  const [expandedNanoFeature, setExpandedNanoFeature] = useState<string | null>(null);

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
              <p className="mt-2 text-sm text-muted-foreground">A broad library of featured modules now appears at the top of the home experience, with related tools grouped beneath and an octillion-scale feature universe behind them.</p>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-semibold text-primary">Expanded view</p>
              <p className="text-[11px] text-muted-foreground italic">1 octillion features in one expansive universe</p>
            </div>
          </div>

          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {featuredModules.map((m, index) => {
              const isExpanded = expandedModule === index;
              const subModules = getSubModuleSets(index);

              return (
                <div key={index} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-3 shadow-inner shadow-black/10">
                  <button
                    type="button"
                    onClick={() => setExpandedModule(isExpanded ? null : index)}
                    className="flex w-full items-center justify-between gap-3 rounded-[1rem] border border-white/10 bg-black/20 px-3 py-3 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center shadow-inner border border-white/5">
                        <m.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-[11px] font-headline font-bold text-white">{m.name}</h3>
                        <p className="text-[9px] text-muted-foreground italic">{m.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-white/5 text-muted-foreground text-[7px] border-none px-2 py-0.5">{m.category}</Badge>
                      {isExpanded ? <ChevronDown className="h-4 w-4 text-primary" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  </button>

                  {isExpanded ? (
                    <div className="mt-3 space-y-2">
                      {subModules.map((subModule, subIndex) => {
                        const subKey = `${index}-${subIndex}`;
                        const isSubExpanded = expandedSubModule === subKey;

                        return (
                          <div key={subKey} className="rounded-[1rem] border border-white/10 bg-black/10 p-2">
                            <button
                              type="button"
                              onClick={() => setExpandedSubModule(isSubExpanded ? null : subKey)}
                              className="flex w-full items-center justify-between rounded-[0.8rem] border border-white/10 bg-black/20 px-3 py-2 text-left text-[10px] text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                            >
                              <span>{subModule.name}</span>
                              {isSubExpanded ? <ChevronDown className="h-3.5 w-3.5 text-primary" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
                            </button>

                            {isSubExpanded ? (
                              <div className="mt-2 rounded-[0.9rem] border border-white/10 bg-black/20 p-3 text-[10px] text-muted-foreground">
                                <p className="font-semibold text-white">{subModule.featureCountLabel}</p>
                                <p className="text-[8px] text-primary/80">{subModule.codeLinesLabel}</p>
                                <div className="mt-2 space-y-2">
                                  {getFeatureSets(index, subIndex).map((feature, featureIndex) => {
                                    const featureKey = `${subKey}-${featureIndex}`;
                                    const isFeatureExpanded = expandedFeature === featureKey;

                                    return (
                                      <div key={featureKey} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-2 text-[9px] text-muted-foreground">
                                        <button
                                          type="button"
                                          onClick={() => setExpandedFeature(isFeatureExpanded ? null : featureKey)}
                                          className="flex w-full items-center justify-between gap-2 text-left transition-all hover:text-primary"
                                        >
                                          <span>{feature.name}</span>
                                          {isFeatureExpanded ? <ChevronDown className="h-3 w-3 text-primary" /> : <ChevronRight className="h-3 w-3" />}
                                        </button>

                                        {isFeatureExpanded ? (
                                          <div className="mt-2 rounded-[0.75rem] border border-white/10 bg-black/20 p-2 text-[8px] text-muted-foreground">
                                            <p className="font-semibold text-white">{feature.featureCountLabel}</p>
                                            <p className="text-[7px] text-primary/80">{feature.codeLinesLabel}</p>
                                            <div className="mt-2 space-y-2">
                                              {getMicroFeatureSets(index, subIndex, featureIndex).map((microFeature, microIndex) => {
                                                const microKey = `${featureKey}-${microIndex}`;
                                                const isMicroExpanded = expandedMicroFeature === microKey;

                                                return (
                                                  <div key={microKey} className="rounded-full border border-white/10 bg-white/5 px-2 py-2 text-[8px] text-muted-foreground">
                                                    <button
                                                      type="button"
                                                      onClick={() => setExpandedMicroFeature(isMicroExpanded ? null : microKey)}
                                                      className="flex w-full items-center justify-between gap-2 text-left transition-all hover:text-primary"
                                                    >
                                                      <span>{microFeature.name}</span>
                                                      {isMicroExpanded ? <ChevronDown className="h-2.5 w-2.5 text-primary" /> : <ChevronRight className="h-2.5 w-2.5" />}
                                                    </button>

                                                    {isMicroExpanded ? (
                                                      <div className="mt-2 rounded-[0.7rem] border border-white/10 bg-black/20 p-2 text-[7px] text-muted-foreground">
                                                        <p className="font-semibold text-white">{microFeature.featureCountLabel}</p>
                                                        <p className="text-[6px] text-primary/80">{microFeature.codeLinesLabel}</p>
                                                        <div className="mt-2 space-y-2">
                                                          {getNanoFeatureSets(index, subIndex, featureIndex, microIndex).map((nanoFeature, nanoIndex) => {
                                                            const nanoKey = `${microKey}-${nanoIndex}`;
                                                            const isNanoExpanded = expandedNanoFeature === nanoKey;

                                                            return (
                                                              <div key={nanoKey} className="rounded-full border border-white/10 bg-white/5 px-2 py-2 text-[7px] text-muted-foreground">
                                                                <button
                                                                  type="button"
                                                                  onClick={() => setExpandedNanoFeature(isNanoExpanded ? null : nanoKey)}
                                                                  className="flex w-full items-center justify-between gap-2 text-left transition-all hover:text-primary"
                                                                >
                                                                  <span>{nanoFeature.name}</span>
                                                                  {isNanoExpanded ? <ChevronDown className="h-2 w-2 text-primary" /> : <ChevronRight className="h-2 w-2" />}
                                                                </button>

                                                                {isNanoExpanded ? (
                                                                  <div className="mt-2 rounded-[0.65rem] border border-white/10 bg-black/20 p-2 text-[6px] text-muted-foreground">
                                                                    <p className="font-semibold text-white">{nanoFeature.featureCountLabel}</p>
                                                                    <p className="text-[5px] text-primary/80">{nanoFeature.codeLinesLabel}</p>
                                                                    <div className="mt-2 space-y-2">
                                                                      {getSelfMultiplySets(index, subIndex, featureIndex, microIndex, nanoIndex).map((selfFeature, selfIndex) => {
                                                                        const selfCodeLines = buildFeatureCodeLines("self-feature", selfFeature.name).slice(0, 3);

                                                                        return (
                                                                          <div key={`${nanoKey}-${selfIndex}`} className="rounded-full border border-white/10 bg-white/5 px-2 py-2 text-[6px] text-muted-foreground">
                                                                            <Link href={selfFeature.href} className="block transition-all hover:text-primary">
                                                                              {selfFeature.name}
                                                                            </Link>
                                                                            <div className="mt-1 rounded-[0.5rem] border border-white/10 bg-black/20 p-1 text-[5px] text-primary/80">
                                                                              <p>{selfFeature.codeLinesLabel}</p>
                                                                              {selfCodeLines.map((line) => (
                                                                                <p key={`${selfFeature.name}-${line}`} className="mt-0.5 truncate">{line}</p>
                                                                              ))}
                                                                            </div>
                                                                          </div>
                                                                        );
                                                                      })}
                                                                    </div>
                                                                  </div>
                                                                ) : null}
                                                              </div>
                                                            );
                                                          })}
                                                        </div>
                                                      </div>
                                                    ) : null}
                                                  </div>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        ) : null}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="space-y-6">
            <div className="border-t border-white/5 pt-8">
              <h3 className="text-lg font-headline font-semibold">More by category</h3>
              <p className="mt-2 text-sm text-muted-foreground">Related tools and learning areas are grouped together so the homepage stays simple and focused.</p>
            </div>

            <div className="grid gap-3 lg:grid-cols-2">
              {groupedModules.map((group) => (
                <div key={group.title} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/10">
                  <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80">{group.title}</h4>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Link key={item.name} href={item.href} className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[11px] text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary">
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
