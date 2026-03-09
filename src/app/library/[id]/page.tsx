"use client";

import { use, useState, useEffect } from "react";
import { LIBRARY_BOOKS } from "../page";
import { Button } from "@/components/ui/button";
import { ChevronLeft, BookOpen, User, Tag, Calendar, Download, Bookmark, Share2, Loader2, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [hasMounted, setHasMounted] = useState(false);
  
  const book = LIBRARY_BOOKS.find(b => b.id === id);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-2xl font-bold font-headline">Text Not Found</h1>
        <Button asChild variant="outline">
          <Link href="/library">Back to Library</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex items-center gap-2">
        <Button asChild variant="ghost" size="icon">
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
          <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary/20 to-secondary border-2 border-primary/10 flex flex-col items-center justify-center p-8 text-center shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/paper/400/600')] opacity-10 mix-blend-overlay" />
            <BookOpen className="w-16 h-16 text-primary mb-6 group-hover:scale-110 transition-transform" />
            <h2 className="font-headline font-bold text-xl leading-tight mb-2">{book.title}</h2>
            <p className="text-xs text-muted-foreground italic">{book.author}</p>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 text-primary text-[8px] uppercase">{book.category}</Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button className="w-full gap-2 h-11 uppercase font-bold text-[10px]" variant="outline">
              <Download className="w-3.5 h-3.5" /> PDF Node
            </Button>
            <Button className="w-full gap-2 h-11 uppercase font-bold text-[10px]" variant="outline">
              <Share2 className="w-3.5 h-3.5" /> Dispatch
            </Button>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex flex-wrap gap-4 text-xs font-medium text-muted-foreground border-b border-white/5 pb-4">
            <div className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-primary" /> {book.author}</div>
            <div className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5 text-primary" /> {book.category}</div>
            <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-primary" /> Classical Era</div>
          </div>

          <Tabs defaultValue="about" className="w-full">
            <TabsList className="bg-secondary/50 p-1 h-10 w-fit mb-6">
              <TabsTrigger value="about" className="text-[10px] uppercase font-bold tracking-widest px-6">About Text</TabsTrigger>
              <TabsTrigger value="contents" className="text-[10px] uppercase font-bold tracking-widest px-6">Index Nodes</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6 animate-in fade-in duration-300">
              <div className="prose prose-invert max-w-none">
                <h3 className="text-lg font-headline font-bold mb-3">Scholarly Summary</h3>
                <p className="text-muted-foreground leading-relaxed text-literata">
                  {book.description}
                </p>
                <div className="bg-secondary/20 p-6 rounded-2xl border border-white/5 mt-6">
                  <h4 className="text-xs uppercase tracking-widest font-bold text-primary mb-3">Historical Context</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    {book.content}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contents" className="animate-in fade-in duration-300">
              <div className="grid gap-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl glass-card hover:bg-white/5 transition-all group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold text-primary opacity-50">0{i}</span>
                      <span className="font-headline font-medium text-sm group-hover:text-primary transition-colors">Scholarly Module {i}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground/20" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Button className="w-full h-14 text-md font-headline gap-3 uppercase tracking-widest shadow-xl shadow-primary/20 group">
            <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform" /> Begin Reading
          </Button>
        </div>
      </section>

      <section className="bg-emerald-500/5 p-6 rounded-2xl border border-emerald-500/20 mt-10">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-emerald-400">Authenticity node Active</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          This digital edition has been cross-referenced against the authorized scholarly manuscripts from the global index. No alterations have been made to the original meanings as understood by the Salaf.
        </p>
      </section>
    </div>
  );
}
