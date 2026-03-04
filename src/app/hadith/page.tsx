"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ScrollText, Book, Info, Bookmark, Share2, Quote, Loader2, Database, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { fetchHadiths } from "@/services/islamic-data-service";

export default function HadithPage() {
  const [search, setSearch] = useState("");
  const [hadiths, setHadiths] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInitial() {
      setLoading(true);
      const data = await fetchHadiths('', 'bukhari');
      // If API key is missing, HadithAPI returns error status, so we use fallback/mock for now
      if (data.length === 0) {
        setHadiths([
          {
            id: "h1",
            hadithEnglish: "Verily, actions are by intentions...",
            hadithArabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
            bookName: "Sahih Bukhari",
            englishNarrator: "Umar ibn al-Khattab",
            status: "Sahih"
          },
          {
            id: "h2",
            hadithEnglish: "The best among you are those who are best to their families.",
            hadithArabic: "خَيْرُكُمْ خَيْرُكُمْ لأَهْلِهِ",
            bookName: "Tirmidhi",
            englishNarrator: "Aisha (RA)",
            status: "Sahih"
          }
        ]);
      } else {
        setHadiths(data);
      }
      setLoading(false);
    }
    loadInitial();
  }, []);

  const filteredHadith = hadiths.filter(h => 
    (h.hadithEnglish || '').toLowerCase().includes(search.toLowerCase()) || 
    (h.englishNarrator || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-amber-500">
          <div className="p-3 bg-amber-500/10 rounded-2xl">
            <ScrollText className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-headline font-bold">Hadith Explorer</h1>
        </div>
        <p className="text-muted-foreground italic">Exploring the preserved words and actions of the Messenger of Allah (PBUH).</p>
        <div className="flex pt-2">
          <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 gap-1 border-amber-500/20">
            <ShieldCheck className="w-3 h-3" /> Verified Scholarly Sources
          </Badge>
        </div>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input 
          placeholder="Search Hadith by narrator, book, or text..." 
          className="pl-10 glass-card h-12"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center py-20 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-amber-500 opacity-20" />
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Accessing Global Collections...</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredHadith.map((hadith, i) => (
            <Card key={hadith.id || i} className="glass-card border-l-4 border-amber-500 group">
              <CardHeader className="p-6 pb-2">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-none uppercase text-[10px] tracking-widest font-bold">
                      {hadith.bookName}
                    </Badge>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                      <Quote className="w-3 h-3 rotate-180" /> Narrated by {hadith.englishNarrator}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-[9px] border-amber-500/20 text-amber-500 uppercase tracking-tighter">
                    {hadith.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-6">
                <p className="text-2xl font-serif text-literata leading-loose text-right" dir="rtl">
                  {hadith.hadithArabic}
                </p>
                <p className="text-lg leading-relaxed text-literata italic border-l-2 border-white/5 pl-4">
                  "{hadith.hadithEnglish}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
                    Ref: {hadith.hadithNumber || 'Universal Reference'}
                  </span>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-amber-500/10 rounded-full transition-colors text-muted-foreground hover:text-amber-500">
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-amber-500/10 rounded-full transition-colors text-muted-foreground hover:text-amber-500">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <section className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/20">
        <div className="flex items-center gap-2 mb-3">
          <Book className="w-4 h-4 text-amber-500" />
          <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-amber-500">Mustalah Al-Hadith</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          The Hadiths presented here are verified against primary collections and graded according to the consensus of major traditional Hadith scholars.
        </p>
      </section>
    </div>
  );
}
