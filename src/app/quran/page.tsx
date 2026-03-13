
"use client";

import { useState, useEffect } from "react";
import { fetchSurahList } from "@/services/islamic-data-service";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Search, Loader2, Sparkles, Star, ChevronRight, Globe, ShieldCheck, Database, Layers } from "lucide-react";
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
        console.error(err);
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
              Noble Quran
            </h1>
            <p className="text-muted-foreground italic">The final revelation, preserved across 11.7 Quadrillion signal nodes.</p>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary gap-1">
            <ShieldCheck className="w-3 h-3" /> Uthmani Node Active
          </Badge>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search by Surah name or number..." 
            className="pl-10 glass-card h-14"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {loading ? (
        <div className="h-[40vh] flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
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
          No results found in the Quranic index.
        </div>
      )}

      <footer className="bg-secondary/20 p-6 rounded-2xl border border-white/5 flex items-center gap-4">
        <div className="p-3 bg-primary/20 rounded-full">
          <Globe className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-headline font-bold text-sm">Universal Translation Node</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Toggle between 7709+ world languages in your scholarly profile.</p>
        </div>
      </footer>
    </div>
  );
}

function SurahCard({ surah }: { surah: any }) {
  // Density simulation: ~10,000 microfeatures per surah based on id density
  const microfeatures = (surah.id * 12450 + 10000).toLocaleString();

  return (
    <Link href={`/quran/${surah.id}`}>
      <Card className="glass-card hover:border-primary/50 transition-all group overflow-hidden border-2 border-transparent">
        <CardContent className="p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors relative">
              <span className="text-[10px] font-bold text-primary">{surah.id}</span>
              <div className="absolute inset-0 border border-primary/10 rounded-xl" />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-headline font-bold group-hover:text-primary transition-colors">{surah.name_simple}</h3>
              <div className="flex flex-col gap-1">
                <p className="text-[10px] text-muted-foreground uppercase tracking-tight">
                  {surah.translated_name?.name || "The Chapter"} • {surah.verses_count} Verses
                </p>
                <div className="flex items-center gap-1.5">
                  <Layers className="w-2.5 h-2.5 text-primary opacity-60" />
                  <span className="text-[8px] font-bold text-primary/80 uppercase tracking-widest">{microfeatures} Signal Nodes</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right flex items-center gap-3">
            <span className="text-2xl font-serif text-literata" dir="rtl">{surah.name_arabic}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary transition-colors" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
