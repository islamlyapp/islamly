
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
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-4xl mx-auto px-4 pt-6">
      <header className="flex items-center gap-2">
        <Button asChild variant="ghost" size="icon" className="rounded-full h-12 w-12">
          <Link href="/library"><ChevronLeft className="w-6 h-6" /></Link>
        </Button>
        <div className="space-y-0.5">
          <h1 className="text-xl font-headline font-bold">{book.title}</h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black italic">Scholarly Resource System</p>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4">
          <div className="aspect-[3/4] rounded-[2rem] bg-gradient-to-br from-primary/20 to-secondary border-2 border-primary/10 flex flex-col items-center justify-center p-8 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/paper/400/600')] opacity-10 mix-blend-overlay grayscale" />
            <div className="p-4 bg-primary/10 rounded-2xl mb-6 relative z-10 group-hover:scale-110 transition-transform duration-500 shadow-xl">
              <BookOpen className="w-16 h-16 text-primary" />
            </div>
            <h2 className="font-headline font-bold text-xl leading-tight mb-2 relative z-10">{book.title}</h2>
            <p className="text-xs text-muted-foreground italic relative z-10">{book.author}</p>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 text-primary text-[8px] uppercase px-4 py-1">VERIFIED SIGNAL</Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button className="w-full gap-2 h-12 uppercase font-black text-[9px] rounded-xl border-white/5" variant="outline">
              <Download className="w-3.5 h-3.5" /> DOWNLOAD PDF
            </Button>
            <Button className="w-full gap-2 h-12 uppercase font-black text-[9px] rounded-xl border-white/5" variant="outline">
              <Share2 className="w-3.5 h-3.5" /> SHARE PATH
            </Button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-white/5 pb-4">
            <div className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-primary" /> {book.author}</div>
            <div className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-primary" /> {book.category}</div>
            <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-primary" /> SCHOLARLY SYSTEM</div>
          </div>

          <Tabs defaultValue="about" className="w-full">
            <TabsList className="bg-secondary/50 p-1 h-14 w-fit mb-6 rounded-xl">
              <TabsTrigger value="about" className="text-[10px] uppercase font-black tracking-widest px-8 rounded-lg">ABOUT TEXT</TabsTrigger>
              <TabsTrigger value="contents" className="text-[10px] uppercase font-black tracking-widest px-8 rounded-lg">INDEX NODES</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6 animate-in fade-in duration-300">
              <div className="prose prose-invert max-w-none">
                <h3 className="text-lg font-headline font-bold mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Scholarly Summary
                </h3>
                <p className="text-muted-foreground leading-relaxed text-literata text-xl italic">
                  {book.description}
                </p>
                <div className="bg-primary/5 p-8 rounded-[2rem] border border-primary/20 mt-12 relative overflow-hidden">
                  <ShieldCheck className="absolute top-0 right-0 w-32 h-32 text-primary opacity-[0.03] -translate-y-8 translate-x-8" />
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-primary mb-4 italic underline decoration-primary/40">Infrastructure Governance</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed italic relative z-10">
                    This digital resource operates within our high-fidelity scholarly framework. Every passage is vetted by the methodology guard to ensure strict alignment with the creed of the Salaf-us-Salih.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contents" className="animate-in fade-in duration-300">
              <div className="grid gap-2">
                {indices.map((title, i) => (
                  <div key={i} className="flex items-center justify-between p-5 rounded-2xl glass-card hover:border-primary/40 transition-all group cursor-pointer border border-transparent active:scale-[0.99]">
                    <div className="flex items-center gap-5">
                      <span className="text-[10px] font-black text-primary/40 font-mono italic">{(i + 1).toString().padStart(2, '0')}</span>
                      <span className="font-headline font-bold text-sm group-hover:text-primary transition-colors">{title}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Button className="w-full h-16 text-lg font-headline gap-3 uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 group rounded-2xl mt-6">
            <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform" /> START READING PATH
          </Button>
        </div>
      </section>

      <footer className="pt-16 pb-12 text-center opacity-40">
        <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">إسلاملي Universal Infrastructure v3.5</p>
      </footer>
    </div>
  );
}
