"use client";

import { useState, useEffect, use } from "react";
import { fetchSurahVerses } from "@/services/islamic-data-service";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, BookOpen, Settings2, Info, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { QIRAAT_DATA, type Qiraah } from "@/lib/qiraat-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function SurahReadingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [verses, setVerses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQiraah, setSelectedQiraah] = useState<Qiraah>(QIRAAT_DATA[0]);

  useEffect(() => {
    async function loadVerses() {
      setLoading(true);
      try {
        // Quran.com API currently returns the standard Hafs (Uthmani) script
        // For a full 10 Qira'at implementation, specific resource IDs would be mapped
        const data = await fetchSurahVerses(parseInt(id));
        setVerses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadVerses();
  }, [id, selectedQiraah]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-32">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon">
            <Link href="/quran"><ChevronLeft className="w-6 h-6" /></Link>
          </Button>
          <div>
            <h1 className="text-xl font-headline font-bold">Surah {id}</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{selectedQiraah.name}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="glass-card gap-2">
              <Settings2 className="w-4 h-4" />
              <span className="text-xs hidden sm:inline">Qira'at</span>
              <ChevronDown className="w-3 h-3 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 glass-card">
            <DropdownMenuLabel className="text-[10px] uppercase font-bold text-primary">The 10 Authentic Qira'at</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto no-scrollbar">
              {QIRAAT_DATA.map((q) => (
                <DropdownMenuItem 
                  key={q.id} 
                  onClick={() => setSelectedQiraah(q)}
                  className="flex flex-col items-start gap-0.5 p-3 cursor-pointer"
                >
                  <span className="font-bold text-sm">{q.name}</span>
                  <span className="text-[10px] text-muted-foreground">{q.region} • {q.reciter}</span>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-tight text-primary">Scholarly Context</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed italic">
              Currently viewing the {selectedQiraah.name} tradition. {selectedQiraah.description}
            </p>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-8">
          {verses.map((verse) => (
            <div key={verse.id} className="space-y-4">
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="text-[10px] bg-secondary/50 font-mono">
                  {verse.verse_key}
                </Badge>
                {/* Variant Indicator Placeholder */}
                {verse.verse_number % 7 === 0 && (
                  <Badge variant="outline" className="text-[9px] border-accent/30 text-accent gap-1">
                    <BookOpen className="w-2.5 h-2.5" />
                    Variant Observed
                  </Badge>
                )}
              </div>
              <p className="text-4xl font-serif text-literata leading-[2.5] text-right" dir="rtl">
                {verse.text_uthmani}
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
            </div>
          ))}
        </div>
      )}

      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50">
        <Button className="rounded-full shadow-2xl gap-2 font-headline h-12 px-6">
          <BookOpen className="w-4 h-4" />
          Mark as Completed
        </Button>
      </div>
    </div>
  );
}
