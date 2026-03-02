
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";

const surahs = [
  { id: 1, name: "Al-Fatihah", arabic: "الفاتحة", verses: 7, type: "Meccan", meaning: "The Opening" },
  { id: 2, name: "Al-Baqarah", arabic: "البقرة", verses: 286, type: "Medinan", meaning: "The Cow" },
  { id: 3, name: "Ali 'Imran", arabic: "آل عمران", verses: 200, type: "Medinan", meaning: "Family of Imran" },
  { id: 4, name: "An-Nisa", arabic: "النساء", verses: 176, type: "Medinan", meaning: "The Women" },
  { id: 5, name: "Al-Ma'idah", arabic: "المائدة", verses: 120, type: "Medinan", meaning: "The Table Spread" },
  { id: 112, name: "Al-Ikhlas", arabic: "الإخلاص", verses: 4, type: "Meccan", meaning: "The Sincerity" },
  { id: 113, name: "Al-Falaq", arabic: "الفلق", verses: 5, type: "Meccan", meaning: "The Daybreak" },
  { id: 114, name: "An-Nas", arabic: "الناس", verses: 6, type: "Meccan", meaning: "The Mankind" },
];

export default function QuranPage() {
  const [search, setSearch] = useState("");

  const filteredSurahs = surahs.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.meaning.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col gap-4">
        <h1 className="text-3xl font-headline font-bold">The Holy Quran</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search Surah by name or meaning..." 
            className="pl-10 glass-card"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

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
                    <p className="text-xs text-muted-foreground">{surah.meaning} • {surah.verses} Verses</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-serif text-literata" dir="rtl">{surah.arabic}</p>
                  <Badge variant="outline" className="text-[9px] uppercase mt-1">{surah.type}</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
