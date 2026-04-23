"use client";

import { use, useState, useEffect } from "react";
import { LIBRARY_BOOKS } from "@/lib/books";
import { Button } from "@/components/ui/button";
import { ChevronLeft, BookOpen, User, Tag, Calendar, Download, Share2, ShieldCheck, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const BOOK_INDICES: Record<string, string[]> = {
  "kitab-at-tawhid": [
    "Introduction to the Oneness of Allah",
    "The Merit of Tawhid and what it expiates of Sins",
    "Fear of Shirk",
    "The Call to Testifying that there is no deity worthy of worship except Allah",
    "Explanation of Tawhid and the Testimony",
    "Rulings on Amulets and Charms"
  ],
  "wasitiyyah": [
    "The General Statement of the Creed",
    "Allah's Names and Attributes mentioned in the Quran",
    "Allah's High Status and Descent",
    "Belief in the Books and Messengers",
    "The Last Day and the Events of the Grave",
    "Divine Decree (Qadar)"
  ],
  "three-principles": [
    "Knowledge of Allah",
    "Knowledge of the Religion of Islam",
    "Knowledge of our Prophet Muhammad (PBUH)",
    "The Evidence for the Three Principles",
    "The Conclusion regarding Hijrah"
  ],
  "bulugh-al-maram": [
    "Book of Purification (Kitab at-Taharah)",
    "Book of Prayer (Kitab as-Salah)",
    "Book of Funerals (Kitab al-Jana'iz)",
    "Book of Zakat (Kitab az-Zakat)",
    "Book of Fasting (Kitab as-Siyam)",
    "Book of Hajj (Kitab al-Hajj)"
  ],
  "umdat-al-ahkam": [
    "The Purity of Water",
    "The Timings of Prayer",
    "The Prostration of Forgetfulness",
    "The Conditions of Marriage",
    "The Rulings of Sales and Trade"
  ],
  "tafsir-ibn-kathir": [
    "Virtues of the Quran",
    "Tafsir of Surah Al-Fatiha",
    "Tafsir of Surah Al-Baqarah",
    "Chronological Revelation Map",
    "Abrogated Verses Index"
  ],
  "usul-as-sunnah": [
    "The Foundation of Sunnah is following the Sahaba",
    "Abandoning Innovations (Bid'ah)",
    "Belief in seeing Allah on the Last Day",
    "Obedience to the Rulers in Goodness",
    "The Prohibition of Theological Rhetoric"
  ]
};

export default function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [hasMounted, setHasMounted] = useState(false);
  
  const book = LIBRARY_BOOKS.find(b => b.id === id);
  const indices = id ? BOOK_INDICES[id] || ["General Scholarly Module", "Evidence Collection", "Summary of Rulings"] : [];

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-2xl font-bold font-headline uppercase tracking-widest">Text Not Found</h1>
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/library">Back to Global Library</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex items-center gap-2">
        <Button asChild variant="ghost" size="icon" className="rounded-full">
          <Link href="/library"><ChevronLeft className="w-6 h-6" /></Link>
        </Button>
        <div className="space-y-0.5">
          <h1 className="text-xl font-headline font-bold">{book.title}</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Universal Scholarly Node</p>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Book Cover Visual */}
        <div className="md:col-span-1 space-y-4">
          <div className="aspect-[3/4] rounded-3xl bg-gradient-to-br from-primary/20 to-secondary border-2 border-primary/10 flex flex-col items-center justify-center p-8 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/paper/400/600')] opacity-10 mix-blend-overlay grayscale" />
            <div className="p-4 bg-primary/10 rounded-2xl mb-6 relative z-10 group-hover:scale-110 transition-transform duration-500">
              <BookOpen className="w-16 h-16 text-primary" />
            </div>
            <h2 className="font-headline font-bold text-xl leading-tight mb-2 relative z-10">{book.title}</h2>
            <p className="text-xs text-muted-foreground italic relative z-10">{book.author}</p>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 text-primary text-[8px] uppercase px-4">{book.category}</Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button className="w-full gap-2 h-11 uppercase font-bold text-[10px] rounded-xl" variant="outline">
              <Download className="w-3.5 h-3.5" /> PDF Node
            </Button>
            <Button className="w-full gap-2 h-11 uppercase font-bold text-[10px] rounded-xl" variant="outline">
              <Share2 className="w-3.5 h-3.5" /> Dispatch
            </Button>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex flex-wrap gap-4 text-xs font-medium text-muted-foreground border-b border-white/5 pb-4">
            <div className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-primary" /> {book.author}</div>
            <div className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-primary" /> {book.category}</div>
            <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-primary" /> Verified Signal</div>
          </div>

          <Tabs defaultValue="about" className="w-full">
            <TabsList className="bg-secondary/50 p-1 h-12 w-fit mb-6">
              <TabsTrigger value="about" className="text-[10px] uppercase font-bold tracking-widest px-8">About Text</TabsTrigger>
              <TabsTrigger value="contents" className="text-[10px] uppercase font-bold tracking-widest px-8">Index Nodes</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6 animate-in fade-in duration-300">
              <div className="prose prose-invert max-w-none">
                <h3 className="text-lg font-headline font-bold mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Scholarly Summary
                </h3>
                <p className="text-muted-foreground leading-relaxed text-literata text-lg italic">
                  {book.description}
                </p>
                <div className="bg-secondary/20 p-6 rounded-2xl border border-white/5 mt-8">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-primary mb-3">Governance Metadata</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    This digital node is operating within our scholarly framework. Every passage has been vetted by the AutoMod Pulse cluster to ensure strict alignment with the creed of the Salaf.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contents" className="animate-in fade-in duration-300">
              <div className="grid gap-2">
                {indices.map((title, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl glass-card hover:border-primary/30 transition-all group cursor-pointer border border-transparent">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold text-primary opacity-50 font-mono">{(i + 1).toString().padStart(2, '0')}</span>
                      <span className="font-headline font-medium text-sm group-hover:text-primary transition-colors">{title}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Button className="w-full h-16 text-lg font-headline gap-3 uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 group rounded-2xl">
            <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform" /> Begin Reading Node
          </Button>
        </div>
      </section>

      <section className="bg-emerald-500/5 p-8 rounded-3xl border border-emerald-500/20 mt-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="font-headline font-bold text-md uppercase tracking-widest text-emerald-400">Authenticity Protocol</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed italic">
          This digital edition has been cross-referenced against the authorized scholarly manuscripts from the global index. No alterations have been made to the original meanings as understood by the Salaf-us-Salih. Your scholarly telemetry is protected by our privacy infrastructure.
        </p>
      </section>
    </div>
  );
}
