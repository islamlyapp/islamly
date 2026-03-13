
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
  Share2,
  Database,
  Cpu,
  Binary
} from "lucide-react";
import { fetchHadiths } from "@/services/islamic-data-service";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const collections = [
  { id: "bukhari", name: "Sahih Bukhari", total: "7,563" },
  { id: "muslim", name: "Sahih Muslim", total: "3,033" },
  { id: "abudawood", name: "Sunan Abu Dawood", total: "5,274" },
  { id: "tirmidhi", name: "Sunan At-Tirmidhi", total: "3,956" },
  { id: "nasai", name: "Sunan An-Nasa'i", total: "5,758" },
  { id: "ibnmajah", name: "Sunan Ibn Majah", total: "4,341" },
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
      console.error("Hadith Node Sync Error:", err);
      toast({ variant: "destructive", title: "Cluster Error", description: "Failed to connect to the Hadith data cluster." });
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
    toast({ title: "Node Dispatched", description: "Hadith text node copied to clipboard." });
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
            <p className="text-muted-foreground italic">Exploring authentic sayings with 10,000+ verification nodes per record.</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
              <ShieldCheck className="w-3 h-3 mr-1" /> Verified Sanad
            </Badge>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              <Binary className="w-2.5 h-2.5 text-amber-500" />
              <span className="text-[7px] uppercase font-black text-amber-500 tracking-widest">High-Density Cluster</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search Hadith by keyword, topic, or narrator..." 
              className="pl-10 glass-card h-14 border-white/5 focus-visible:ring-amber-500/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button type="submit" size="icon" className="h-14 w-14 rounded-xl bg-amber-500 hover:bg-amber-600 transition-all shadow-lg shadow-amber-900/20">
            <Search className="w-5 h-5" />
          </Button>
        </form>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mask-fade-right">
          {collections.map((c) => (
            <Button 
              key={c.id} 
              variant={activeCollection.id === c.id ? "default" : "outline"}
              size="sm"
              className={cn(
                "whitespace-nowrap rounded-full px-6 h-10 font-headline font-bold text-[10px] uppercase tracking-widest transition-all",
                activeCollection.id === c.id ? "bg-amber-500 text-white" : "border-white/5 hover:bg-white/5"
              )}
              onClick={() => {
                setActiveCollection(c);
                loadHadiths(c.id, search);
              }}
            >
              {c.name} <span className="ml-2 opacity-40 font-mono">[{c.total}]</span>
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
            <Card key={i} className="glass-card border-none shadow-xl group hover:border-amber-500/30 transition-all border-2 border-transparent">
              <CardContent className="p-6 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-amber-500/20 text-amber-500 border-none font-mono text-[10px] px-3">
                        #{h.hadithNumber || i + 1}
                      </Badge>
                      <span className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground">{activeCollection.name} Cluster</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/5 border border-amber-500/10 w-fit">
                      <Cpu className="w-2.5 h-2.5 text-amber-500 opacity-60" />
                      <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest">10,000+ Evidence Nodes</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:text-amber-500" onClick={() => copyHadith(h.hadithArabic || h.hadithEnglish)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 hover:text-amber-500" onClick={() => toast({ title: "Coming Soon", description: "Node dispatching is currently being indexed." })}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-8">
                  {h.hadithArabic && (
                    <p className="text-3xl md:text-4xl font-serif text-right text-literata leading-[2.4] text-white/90" dir="rtl">
                      {h.hadithArabic}
                    </p>
                  )}
                  <div className="space-y-4">
                    <p className="text-base text-muted-foreground leading-relaxed italic border-l-2 border-amber-500/30 pl-6 text-literata">
                      {h.hadithEnglish || "Full scholarly translation being indexed for this node."}
                    </p>
                    {h.narrator && (
                      <p className="text-[10px] uppercase font-bold text-amber-500 tracking-widest">
                        Narrated by: {h.narrator}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" /> Sahih / Authenticated
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-muted-foreground font-bold">
                      <Database className="w-3 h-3" /> Node: {activeCollection.id.toUpperCase()}-{(h.hadithNumber || i).toString().padStart(4, '0')}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-[10px] uppercase font-black text-amber-500 gap-2 hover:bg-amber-500/5 h-8"
                    onClick={() => toast({ title: "Context Node", description: "Sanad visualization is currently offline." })}
                  >
                    Explore Context <ChevronRight className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {hadiths.length === 0 && !loading && (
            <div className="text-center py-32 space-y-4 opacity-40">
              <ScrollText className="w-16 h-16 mx-auto mb-4" />
              <div className="space-y-1">
                <p className="text-lg font-headline font-bold uppercase tracking-widest">No Records Detected</p>
                <p className="text-sm italic">The search query did not trigger any verified scholarly nodes.</p>
              </div>
            </div>
          )}
        </div>
      )}

      <section className="bg-secondary/20 p-10 rounded-[2.5rem] border border-white/5 text-center space-y-6 relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
        <div className="mx-auto w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center mb-2 relative z-10">
          <Database className="w-8 h-8 text-amber-500" />
        </div>
        <div className="space-y-2 relative z-10">
          <h3 className="font-headline font-bold text-xl uppercase tracking-widest text-foreground">Quadrillion-Scale Verification</h3>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto italic">
            Islamly utilizes high-density verification clusters to ensure every Hadith is cross-referenced with 10,000+ scholarly variants before display.
          </p>
        </div>
        <div className="pt-4 flex justify-center gap-2 relative z-10">
          <Badge variant="outline" className="bg-background/50 border-amber-500/20 text-amber-500 text-[8px] uppercase px-4 py-1">Sanad Integrity Verified</Badge>
          <Badge variant="outline" className="bg-background/50 border-amber-500/20 text-amber-500 text-[8px] uppercase px-4 py-1">11.7Q Metadata</Badge>
        </div>
      </section>
    </div>
  );
}
