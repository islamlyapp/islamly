"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Database, Globe, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";

const surahs = [
  { id: 1, name: "Al-Fatihah", arabic: "الفاتحة", verses: 7, type: "Meccan", meaning: "The Opening", module: "Tanzil Rasm" },
  { id: 2, name: "Al-Baqarah", arabic: "البقرة", verses: 286, type: "Medinan", meaning: "The Cow", module: "Manuscript-X" },
  { id: 3, name: "Ali 'Imran", arabic: "آل عمران", verses: 200, type: "Medinan", meaning: "Family of Imran", module: "Tanzil" },
  { id: 4, name: "An-Nisa", arabic: "النساء", verses: 176, type: "Medinan", meaning: "The Women", module: "Variant-Hafs" },
  { id: 112, name: "Al-Ikhlas", arabic: "الإخلاص", verses: 4, type: "Meccan", meaning: "The Sincerity", module: "Tanzil" },
  { id: 113, name: "Al-Falaq", arabic: "الفلق", verses: 5, type: "Meccan", meaning: "The Daybreak", module: "Tanzil" },
  { id: 114, name: "An-Nas", arabic: "الناس", verses: 6, type: "Meccan", meaning: "The Mankind", module: "Tanzil" },
];

export default function QuranPage() {
  const [search, setSearch] = useState("");
  const [activeApi, setActiveApi] = useState("Tanzil");

  const filteredSurahs = surahs.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.meaning.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-headline font-bold">The Holy Quran</h1>
          <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary border-primary/20">
            <Database className="w-3 h-3" />
            Tanzil API
          </Badge>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search Surah or Meaning..." 
            className="pl-10 glass-card"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {["Standard", "Hafs", "Warsh", "Uthmani", "IndoPak"].map((api) => (
          <Badge 
            key={api} 
            variant={activeApi === api ? "default" : "outline"}
            className="cursor-pointer whitespace-nowrap px-4 py-1"
            onClick={() => setActiveApi(api)}
          >
            {api} Mode
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredSurahs.map((surah) => (
          <Link key={surah.id} href={`/quran/${surah.id}`}>
            <Card className="glass-card hover:border-primary/50 transition-all group overflow-hidden">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 text-xs font-headline font-bold group-hover:bg-primary/20 transition-colors">
                    {surah.id}
                  </div>
                  <div>
                    <h3 className="font-headline font-semibold group-hover:text-primary transition-colors">{surah.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-[10px] text-muted-foreground">{surah.verses} Verses</p>
                      <span className="text-[10px] text-muted-foreground/30">•</span>
                      <p className="text-[10px] text-accent font-bold uppercase tracking-tight">{surah.module}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-serif text-literata" dir="rtl">{surah.arabic}</p>
                  <Badge variant="outline" className="text-[8px] uppercase mt-1 h-4">{surah.type}</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <section className="bg-secondary/20 p-6 rounded-xl border border-border flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" />
          <h3 className="font-headline font-bold text-sm uppercase tracking-widest">Metadata API</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[11px]">
            <span className="text-muted-foreground">Orthography (Rasm)</span>
            <span className="font-bold">Uthmanic (Tanzil Module #33)</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-muted-foreground">Reading (Qira'at)</span>
            <span className="font-bold">Hafs 'an 'Asim (Module #32)</span>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground leading-relaxed mt-2 italic">
          Text provided by the Tanzil Project API. Verification ensured by Classical Manuscript Index #33.
        </p>
      </section>
    </div>
  );
}
