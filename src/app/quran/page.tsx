"use client";

import { useState, useEffect } from "react";
import { fetchSurahList } from "@/services/islamic-data-service";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Search, Loader2, Sparkles, ChevronRight, Globe, ShieldCheck, Database, Binary, User } from "lucide-react";
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
            <h1 className="soft-title flex items-center gap-3 text-white">
              <BookOpen className="text-primary w-10 h-10" />
              Quran Library
            </h1>
            <p className="text-muted-foreground">Explore the Quran with clear translations, audio support, and thoughtful context.</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 gap-1">
              <ShieldCheck className="w-3 h-3" /> Uthmani mode
            </Badge>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Binary className="w-3 h-3 text-emerald-500" />
              <span className="text-[10px] text-emerald-300">Audio guide enabled</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search by Surah name or number..." 
            className="pl-10 soft-card h-14 focus-visible:ring-primary/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {/* High-Density Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="soft-card p-4 text-center space-y-2">
          <Binary className="w-5 h-5 text-emerald-400 mx-auto" />
          <p className="text-sm text-muted-foreground">Canonical Qira'at</p>
          <p className="text-xl font-semibold text-white">10 authentic reciters</p>
        </Card>
        <Card className="soft-card p-4 text-center space-y-2">
          <User className="w-5 h-5 text-primary mx-auto" />
          <p className="text-sm text-muted-foreground">Audio support</p>
          <p className="text-xl font-semibold text-white">Scholarly recitations</p>
        </Card>
        <Card className="soft-card p-4 text-center space-y-2">
          <Globe className="w-5 h-5 text-blue-400 mx-auto" />
          <p className="text-sm text-muted-foreground">Reach</p>
          <p className="text-xl font-semibold text-white">Global translations</p>
        </Card>
      </section>

      {loading ? (
        <div className="h-[40vh] flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
          <p className="text-sm text-muted-foreground">Loading chapter list…</p>
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

      <footer className="bg-secondary/20 p-8 rounded-[2.5rem] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary/20 rounded-2xl ring-8 ring-primary/5">
            <Globe className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Audio companion</h3>
            <p className="text-xs text-muted-foreground max-w-xs">Listen to recitations and translations from across the Quran.</p>
          </div>
        </div>
        <Badge variant="outline" className="text-[10px] py-2 px-6 border-white/10">
          Version 3.5
        </Badge>
      </footer>
    </div>
  );
}

function SurahCard({ surah }: { surah: any }) {
  return (
    <Link href={`/quran/hafs/${surah.name_simple.toLowerCase()}`}>
      <Card className="soft-card hover:border-primary/50 transition-all group overflow-hidden border-2 border-transparent active:scale-[0.98]">
        <CardContent className="p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors relative overflow-hidden">
              <span className="text-sm font-semibold text-primary relative z-10">{surah.id}</span>
              <div className="absolute inset-0 border border-primary/10 rounded-2xl" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{surah.name_simple}</h3>
              <p className="text-sm text-muted-foreground">
                {surah.translated_name?.name || "The Chapter"} • {surah.verses_count} verses
              </p>
            </div>
          </div>
          <div className="text-right flex items-center gap-3">
            <span className="text-3xl font-serif text-literata text-white/90 drop-shadow-sm" dir="rtl">{surah.name_arabic}</span>
            <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
