"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserCheck, Search, Filter, History, MapPin, Book, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const scholars = [
  { id: 1, name: "Imam Malik ibn Anas", era: "Salaf", title: "Imam of Dar al-Hijrah", work: "Al-Muwatta", region: "Madinah" },
  { id: 2, name: "Ibn Taymiyyah", era: "Classical", title: "Shaykh al-Islam", work: "Majmu' al-Fatawa", region: "Damascus" },
  { id: 3, name: "Sheikh Ibn Baz", era: "Modern", title: "Grand Mufti", work: "Fatawa bin Baz", region: "Riyadh" },
  { id: 4, name: "Sheikh Al-Albani", era: "Modern", title: "The Muhaddith", work: "Silsilah al-Ahadith", region: "Damascus/Jordan" },
  { id: 5, name: "Imam Ahmad ibn Hanbal", era: "Salaf", title: "Imam of Sunnah", work: "Al-Musnad", region: "Baghdad" },
];

export default function ScholarsPage() {
  const [query, setQuery] = useState("");

  const filtered = scholars.filter(s => 
    s.name.toLowerCase().includes(query.toLowerCase()) || 
    s.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-2">
        <div className="flex items-center gap-3 text-orange-400">
          <UserCheck className="w-8 h-8" />
          <h1 className="text-3xl font-headline font-bold">Scholars Directory</h1>
        </div>
        <p className="text-muted-foreground italic">Biographies and legacies of the giants of Islamic knowledge.</p>
      </header>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search by scholar name or work..." 
            className="pl-10 glass-card h-12"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button className="p-3 glass-card rounded-xl hover:bg-secondary/50">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className="grid gap-4">
        {filtered.map((s) => (
          <Card key={s.id} className="glass-card group hover:border-orange-500/40 transition-all">
            <CardContent className="p-5 flex gap-4">
              <div className="w-14 h-14 bg-orange-500/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-orange-500/20 transition-colors">
                <History className="w-6 h-6 text-orange-400" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-headline font-bold text-lg">{s.name}</h3>
                    <p className="text-xs text-orange-400 italic">{s.title}</p>
                  </div>
                  <Badge variant="secondary" className="bg-orange-500/5 text-orange-400 text-[9px] uppercase">{s.era}</Badge>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Badge variant="outline" className="text-[10px] gap-1 border-white/5 bg-white/5">
                    <Book className="w-3 h-3" /> {s.work}
                  </Badge>
                  <Badge variant="outline" className="text-[10px] gap-1 border-white/5 bg-white/5">
                    <MapPin className="w-3 h-3" /> {s.region}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-orange-500/5 p-6 rounded-2xl border border-orange-500/20">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-4 h-4 text-orange-400" />
          <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-orange-400">Authenticity Guard</h3>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed italic">
          This directory only includes scholars whose methodology and belief align with that of the righteous predecessors. Every entry is cross-referenced with established biographical dictionaries (Tabaqat).
        </p>
      </section>
    </div>
  );
}
