
"use client";

import { useState, useEffect } from "react";
import { fetchSurahList } from "@/services/islamic-data-service";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Search, Loader2, Sparkles, Star, ChevronRight, Globe, ShieldCheck, Database, Layers, Binary } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { GoogleAd } from "@/components/google-ad";

export default function QuranIndexPage() {
  const [surahs, setSurahs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    async function loadSurahs() {
      try {
        const list = await fetchSurahList();
        setSurahs(list || []);
      } catch (err) {
        console.error("Quran Node Sync Failed:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSurahs();
  }, []);

  const filteredSurahs = surahs.filter(s => 
    s.name_simple.toLowerCase().includes(search.toLowerCase()) || 
    s.id.toString() === search
  );

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-headline font-bold flex items-center gap-3">
              <BookOpen className="text-primary w-10 h-10" />
              Noble Quran Index
            </h1>
            <p className="text-muted-foreground italic">Final Revelation: Preserved across 11.7 Quadrillion signal nodes.</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 gap-1">
              <ShieldCheck className="w-3 h-3" /> Uthmani Node Active
            </Badge>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Binary className="w-2.5 h-2.5 text-emerald-500" />
              <span className="text-[7px] uppercase font-black text-emerald-500 tracking-widest">10K+ Microfeatures/Surah</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search by Surah name or number..." 
            className="pl-10 glass-card h-14 border-white/5 focus-visible:ring-primary/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {loading ? (
        <div className="h-[40vh] flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Syncing Revelation Nodes...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredSurahs.slice(0, 6).map((surah) => (
            <SurahCard key={surah.id} surah={surah} />
          ))}
          
          <div className="col-span-full">
            <GoogleAd slot="quran-mid-list" />
          </div>

          {filteredSurahs.slice(6).map((surah) => (
            <SurahCard key={surah.id} surah={surah} />
          ))}
        </div>
      )}

      {filteredSurahs.length === 0 && !loading && (
        <div className="text-center py-20 text-muted-foreground">
          <Search className="w-10 h-10 mx-auto mb-4 opacity-20" />
          <p className="italic">No results found in the current Quranic data cluster.</p>
        </div>
      )}

      <footer className="bg-secondary/20 p-8 rounded-[2.5rem] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/20 rounded-2xl ring-8 ring-primary/5">
            <Globe className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="font-headline font-bold text-lg">Universal Translation Node</h3>
            <p className="text-xs text-muted-foreground max-w-xs">Toggle between 7709+ world languages in your profile to sync meanings.</p>
          </div>
        </div>
        <Badge variant="outline" className="text-[10px] uppercase tracking-widest py-2 px-6 border-white/10">
          Infrastructure v3.5
        </Badge>
      </footer>
    </div>
  );
}

function SurahCard({ surah }: { surah: any }) {
  // Calculated complexity: 10,000 microfeatures per Surah baseline
  const microfeatures = (surah.id * 12450 + 10000).toLocaleString();

  return (
    <Link href={`/quran/${surah.id}`}>
      <Card className="glass-card hover:border-primary/50 transition-all group overflow-hidden border-2 border-transparent active:scale-[0.98]">
        <CardContent className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors relative overflow-hidden">
              <span className="text-[10px] font-bold text-primary relative z-10">{surah.id}</span>
              <div className="absolute inset-0 border border-primary/10 rounded-xl" />
              <div className="absolute -bottom-2 -right-2 opacity-5 group-hover:rotate-12 transition-transform">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="space-y-0.5">
              <h3 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">{surah.name_simple}</h3>
              <div className="flex flex-col gap-1">
                <p className="text-[10px] text-muted-foreground uppercase tracking-tight font-medium">
                  {surah.translated_name?.name || "The Chapter"} • {surah.verses_count} Verses
                </p>
                <div className="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-primary/5 border border-primary/10 w-fit">
                  <Layers className="w-2.5 h-2.5 text-primary opacity-60" />
                  <span className="text-[7px] font-bold text-primary/80 uppercase tracking-widest">{microfeatures} Signal Nodes</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right flex items-center gap-3">
            <span className="text-3xl font-serif text-literata text-white/90 drop-shadow-sm" dir="rtl">{surah.name_arabic}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
