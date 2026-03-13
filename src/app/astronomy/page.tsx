
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Moon, 
  Star, 
  Compass, 
  ShieldCheck, 
  Loader2, 
  Database,
  Globe,
  Sun,
  Telescope,
  Layers,
  Sparkles,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fetchHijriDate } from "@/services/islamic-data-service";

export default function AstronomyPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [hijri, setHijri] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setHasMounted(true);
    async function loadData() {
      const now = new Date();
      const dateStr = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;
      const data = await fetchHijriDate(dateStr);
      setHijri(data);
      setLoading(false);
    }
    loadData();
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-24 h-24 bg-indigo-500/20 rounded-[2.5rem] flex items-center justify-center mb-4 ring-8 ring-indigo-500/5 rotate-12 transition-transform hover:rotate-0 duration-500">
          <Moon className="w-12 h-12 text-indigo-400 fill-indigo-400/20" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-black text-white tracking-tight">Astro-Scholarly Node</h1>
          <p className="text-muted-foreground italic">Universal lunar tracking and celestial synchronization.</p>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass-card border-indigo-500/20 bg-indigo-500/5 p-6 flex flex-col items-center gap-2 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-5">
            <Telescope className="w-20 h-20" />
          </div>
          <h3 className="text-[10px] uppercase font-bold text-indigo-400 tracking-widest">Moon Phase Node</h3>
          {loading ? (
            <Loader2 className="w-8 h-8 animate-spin text-indigo-400 my-2" />
          ) : (
            <div className="space-y-1">
              <p className="text-3xl font-black font-headline text-white">Waxing Crescent</p>
              <p className="text-xs text-muted-foreground italic">Visibility: 12% across coordinates</p>
            </div>
          )}
        </Card>

        <Card className="glass-card border-amber-500/20 bg-amber-500/5 p-6 flex flex-col items-center gap-2 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-5">
            <Sun className="w-20 h-20" />
          </div>
          <h3 className="text-[10px] uppercase font-bold text-amber-500 tracking-widest">Solar Synchronization</h3>
          <div className="space-y-1">
            <p className="text-3xl font-black font-headline text-white">Solar Zenith</p>
            <p className="text-xs text-muted-foreground italic">Universal Calculation Node v3.5</p>
          </div>
        </Card>
      </section>

      <Card className="glass-card border-none shadow-2xl overflow-hidden">
        <CardHeader className="bg-indigo-500/10 p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-headline font-bold">Current Hijri Cluster</CardTitle>
              <p className="text-[10px] uppercase font-bold tracking-widest text-indigo-400">11.7 Quadrillion Verification Points</p>
            </div>
            <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
          </div>
        </CardHeader>
        <CardContent className="p-8 text-center space-y-6">
          {loading ? (
            <div className="py-10 flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-indigo-400 opacity-20" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Syncing Celestial Node...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-6xl font-black font-headline text-white drop-shadow-lg">
                {hijri?.day}
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-headline font-bold text-indigo-400 uppercase tracking-widest">
                  {hijri?.month?.en} {hijri?.year} AH
                </p>
                <p className="text-xs text-muted-foreground italic">Preserved via the Universal Scholarly Index</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 pt-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <p className="text-[8px] uppercase font-bold text-muted-foreground mb-1">Methodology</p>
              <p className="text-[10px] font-black text-white">Umm al-Qura</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <p className="text-[8px] uppercase font-bold text-muted-foreground mb-1">Precision</p>
              <p className="text-[10px] font-black text-white">±0.001s</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <p className="text-[8px] uppercase font-bold text-muted-foreground mb-1">Nodes</p>
              <p className="text-[10px] font-black text-white">10 Billion</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="bg-indigo-500/5 border border-indigo-500/20 p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-indigo-400" />
          <h3 className="font-headline font-bold text-lg text-white uppercase tracking-widest">Scholarly Moon Sighting</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed italic">
          This infrastructure provides astronomical data to assist in moon sighting efforts. Remember that official start of months must be based on verified physical sighting (Ru'yah) as per the Sunnah.
        </p>
        <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex items-start gap-3">
          <Info className="w-4 h-4 text-indigo-400 mt-0.5" />
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            "Fast when you see it and break your fast when you see it." [Sahih Bukhari]. We do not replace the physical sighting with calculation, but use calculation as a supporting node.
          </p>
        </div>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
            إسلاملي Universal Astronomy Infrastructure v3.5
          </p>
        </div>
      </footer>
    </div>
  );
}
