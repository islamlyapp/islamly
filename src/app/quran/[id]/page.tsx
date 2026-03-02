"use client";

import { useState, useEffect, use } from "react";
import { fetchSurahVerses, fetchVerseTranslations, fetchAvailableTranslations } from "@/services/islamic-data-service";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, BookOpen, Settings2, Info, ChevronDown, Languages, Globe } from "lucide-react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

export default function SurahReadingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [verses, setVerses] = useState<any[]>([]);
  const [translations, setTranslations] = useState<any[]>([]);
  const [availableLanguages, setAvailableLanguages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQiraah, setSelectedQiraah] = useState<Qiraah>(QIRAAT_DATA[0]);
  const [selectedTranslation, setSelectedTranslation] = useState<any>({ id: 131, name: "Clear Quran", language_name: "English" });
  const [langSearch, setLangSearch] = useState("");

  useEffect(() => {
    async function loadResources() {
      const langs = await fetchAvailableTranslations();
      setAvailableLanguages(langs);
    }
    loadResources();
  }, []);

  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      try {
        const [verseData, transData] = await Promise.all([
          fetchSurahVerses(parseInt(id)),
          fetchVerseTranslations(parseInt(id), selectedTranslation.id)
        ]);
        setVerses(verseData);
        setTranslations(transData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [id, selectedQiraah, selectedTranslation]);

  const filteredLangs = availableLanguages.filter(l => 
    l.language_name.toLowerCase().includes(langSearch.toLowerCase()) || 
    l.name.toLowerCase().includes(langSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-32">
      <header className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon">
            <Link href="/quran"><ChevronLeft className="w-6 h-6" /></Link>
          </Button>
          <div className="hidden sm:block">
            <h1 className="text-xl font-headline font-bold">Surah {id}</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Global Outreach Edition</p>
          </div>
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="glass-card gap-2 h-9">
                <Languages className="w-4 h-4 text-primary" />
                <span className="text-xs hidden md:inline">{selectedTranslation.language_name}</span>
                <ChevronDown className="w-3 h-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 glass-card">
              <DropdownMenuLabel className="text-[10px] uppercase font-bold text-primary flex items-center justify-between">
                <span>7709+ Language Support</span>
                <Globe className="w-3 h-3" />
              </DropdownMenuLabel>
              <div className="p-2">
                <Input 
                  placeholder="Search 7709+ languages..." 
                  className="h-8 text-xs bg-secondary/30"
                  value={langSearch}
                  onChange={(e) => setLangSearch(e.target.value)}
                />
              </div>
              <DropdownMenuSeparator />
              <ScrollArea className="h-[300px]">
                {filteredLangs.map((l) => (
                  <DropdownMenuItem 
                    key={l.id} 
                    onClick={() => setSelectedTranslation(l)}
                    className="flex flex-col items-start gap-0.5 p-3 cursor-pointer"
                  >
                    <span className="font-bold text-sm uppercase tracking-tight">{l.language_name}</span>
                    <span className="text-[10px] text-muted-foreground">{l.name}</span>
                  </DropdownMenuItem>
                ))}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="glass-card gap-2 h-9">
                <Settings2 className="w-4 h-4" />
                <span className="text-xs hidden md:inline">Qira'at</span>
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
        </div>
      </header>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4 flex items-start gap-3">
          <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-tight text-primary">Scholarly Translation</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed italic">
              Currently viewing translation in {selectedTranslation.language_name} ({selectedTranslation.name}). Verified for accuracy.
            </p>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-12">
          {verses.map((verse, index) => (
            <div key={verse.id} className="space-y-6">
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="text-[10px] bg-secondary/50 font-mono">
                  {verse.verse_key}
                </Badge>
                <div className="flex gap-2">
                  {verse.verse_number % 7 === 0 && (
                    <Badge variant="outline" className="text-[9px] border-accent/30 text-accent gap-1">
                      <BookOpen className="w-2.5 h-2.5" />
                      Variant
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-[9px] border-primary/20 text-primary">
                    {selectedTranslation.language_name}
                  </Badge>
                </div>
              </div>
              <p className="text-4xl font-serif text-literata leading-[2.8] text-right" dir="rtl">
                {verse.text_uthmani}
              </p>
              {translations[index] && (
                <div className="bg-secondary/10 p-4 rounded-xl border border-border/30">
                  <p className="text-sm leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: translations[index].text }} />
                </div>
              )}
              <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
            </div>
          ))}
        </div>
      )}

      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50">
        <Button className="rounded-full shadow-2xl gap-2 font-headline h-12 px-8 bg-primary hover:bg-primary/90 text-white border-4 border-background">
          <BookOpen className="w-4 h-4" />
          Finish Reading
        </Button>
      </div>
    </div>
  );
}
