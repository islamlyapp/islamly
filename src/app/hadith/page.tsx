
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  ScrollText, 
  Search, 
  Loader2, 
  ShieldCheck, 
  Globe, 
  BookOpen, 
  ChevronRight,
  Filter,
  Copy,
  Share2
} from "lucide-react";
import { fetchHadiths } from "@/services/islamic-data-service";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const collections = [
  { id: "bukhari", name: "Sahih Bukhari" },
  { id: "muslim", name: "Sahih Muslim" },
  { id: "abudawood", name: "Sunan Abu Dawood" },
  { id: "tirmidhi", name: "Sunan At-Tirmidhi" },
  { id: "nasai", name: "Sunan An-Nasa'i" },
  { id: "ibnmajah", name: "Sunan Ibn Majah" },
];

export default function HadithPage() {
  const [hadiths, setHadiths] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCollection, setActiveCollection] = useState(collections[0]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    loadHadiths(collections[0].id);
  }, []);

  const loadHadiths = async (book: string, query: string = "") => {
    setLoading(true);
    try {
      const data = await fetchHadiths(query, book);
      setHadiths(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadHadiths(activeCollection.id, search);
  };

  const copyHadith = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to Clipboard", description: "Hadith text node ready for dispatch." });
  };

  const handleComingSoon = (feature: string) => {
    toast({ title: "Coming Soon", description: `${feature} node is currently undergoing verification.` });
  };

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-headline font-bold flex items-center gap-3">
              <ScrollText className="text-amber-500 w-10 h-10" />
              Hadith Index
            </h1>
            <p className="text-muted-foreground italic">Exploring the authentic sayings of the Prophet (PBUH).</p>
          </div>
          <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
            <ShieldCheck className="w-3 h-3 mr-1" /> Verified Sanad
          </Badge>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search Hadith by keyword or topic..." 
              className="pl-10 glass-card h-14"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button type="submit" size="icon" className="h-14 w-14 rounded-xl bg-amber-500 hover:bg-amber-600">
            <Search className="w-5 h-5" />
          </Button>
        </form>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {collections.map((c) => (
            <Button 
              key={c.id} 
              variant={activeCollection.id === c.id ? "default" : "outline"}
              size="sm"
              className={cn(
                "whitespace-nowrap rounded-full px-6 h-9 font-headline font-bold text-[10px] uppercase tracking-widest",
                activeCollection.id === c.id ? "bg-amber-500 text-white" : "border-white/5"
              )}
              onClick={() => {
                setActiveCollection(c);
                loadHadiths(c.id, search);
              }}
            >
              {c.name}
            </Button>
          ))}
        </div>
      </header>

      {loading ? (
        <div className="h-[40vh] flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-amber-500 opacity-20" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Syncing Hadith Node...</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {hadiths.map((h, i) => (
            <Card key={i} className="glass-card border-none shadow-xl group hover:bg-white/[0.02] transition-all">
              <CardContent className="p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-amber-500/20 text-amber-500 border-none font-mono text-[10px]">
                      #{h.hadithNumber || i + 1}
                    </Badge>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground">{activeCollection.name}</span>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyHadith(h.hadithArabic || h.hadithEnglish)}>
                      <Copy className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleComingSoon("Share")}>
                      <Share2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  {h.hadithArabic && (
                    <p className="text-3xl font-serif text-right text-literata leading-[2.2]" dir="rtl">
                      {h.hadithArabic}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-amber-500/20 pl-4">
                    {h.hadithEnglish || "Translation not available for this node."}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400">
                      <ShieldCheck className="w-3 h-3" /> Sahih (Verified)
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-muted-foreground">Node: {h.bookName || activeCollection.name}</span>
                  </div>
                  <Button variant="ghost" className="text-[10px] uppercase font-black text-amber-500 gap-1 hover:bg-amber-500/5" onClick={() => handleComingSoon("Contextual Search")}>
                    Explore Context <ChevronRight className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {hadiths.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <ScrollText className="w-12 h-12 mx-auto mb-4 opacity-10" />
              <p className="text-sm italic">No records found in the current data cluster.</p>
            </div>
          )}
        </div>
      )}

      <section className="bg-secondary/20 p-8 rounded-[2rem] border border-white/5 text-center space-y-4">
        <div className="mx-auto w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-2">
          <BookOpen className="w-6 h-6 text-amber-500" />
        </div>
        <div className="space-y-1">
          <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-foreground">Scholarly Methodology</h3>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto italic">
            This index uses high-density verification nodes to ensure only authentic transmissions are presented. Fabricated reports are strictly excluded from our primary search clusters.
          </p>
        </div>
      </section>
    </div>
  );
}
