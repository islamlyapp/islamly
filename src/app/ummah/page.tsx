"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Globe, 
  Users, 
  Database, 
  Layers, 
  Sparkles, 
  ChevronRight, 
  Map,
  ShieldCheck,
  TrendingUp,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ummahStats = [
  { label: "Global Population", value: "2.1 Billion", icon: Users, color: "text-blue-400" },
  { label: "Daily Data Inflow", value: "Verified Signals", icon: Activity, color: "text-emerald-400" },
  { label: "Scholarly Units", value: "Active", icon: ShieldCheck, color: "text-amber-400" },
  { label: "Search Capacity", value: "Universal", icon: Database, color: "text-rose-400" },
];

export default function UmmahPage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <header className="text-center space-y-4 pt-8">
        <div className="mx-auto w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-4 ring-8 ring-primary/5">
          <Globe className="w-12 h-12 text-primary animate-spin-slow" />
        </div>
        <div className="space-y-1">
          <h1 className="text-5xl font-headline font-black text-white tracking-tight">Global Ummah Infrastructure</h1>
          <p className="text-muted-foreground text-lg italic">Real-time status of the universal scholarly network.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
        {ummahStats.map((stat) => (
          <Card key={stat.label} className="glass-card p-6 flex flex-col items-center gap-3 text-center border-white/5 hover:border-primary/20 transition-all">
            <div className={cn("p-3 rounded-2xl bg-white/5", stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</p>
              <p className="text-2xl font-headline font-black text-white">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <section className="bg-primary/5 border border-primary/20 p-10 rounded-[3rem] text-center space-y-8 relative overflow-hidden group">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="space-y-4 relative z-10">
          <h2 className="text-3xl font-headline font-black text-white">Universal Infrastructure Reach</h2>
          <p className="text-muted-foreground max-w-xl mx-auto italic leading-relaxed">
            The Islamly network currently facilitates the flow of authentic signals across all global coordinates, from the deserts of the Hijaz to the digital resources of the West.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="space-y-2">
            <div className="text-4xl font-headline font-black text-primary">7,709+</div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Languages Supported</p>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-headline font-black text-primary">High Density</div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Privacy Layers Active</p>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-headline font-black text-primary">100%</div>
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Methodology Compliance</p>
          </div>
        </div>

        <Button className="w-full h-14 rounded-2xl bg-primary shadow-xl shadow-primary/20 font-headline font-black uppercase tracking-widest text-sm relative z-10">
          Explore Geospatial Heritage Map
        </Button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card border-none bg-emerald-500/10 p-8 flex flex-col justify-center gap-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            <h3 className="text-xl font-headline font-bold text-white">Growth Hub</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed italic">
            "Islam will reach every place that day and night reach." [Sahih Hadith]. We track the expansion of the Sunnah through digital and physical archives.
          </p>
        </Card>
        
        <Card className="glass-card border-none bg-blue-500/10 p-8 flex flex-col justify-center gap-4">
          <div className="flex items-center gap-3">
            <Map className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-headline font-bold text-white">Archive Sync</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed italic">
            Real-time synchronization with OpenStreetMap and Quran.com v4 ensures that every Ummah entry remains accurate and verified.
          </p>
        </Card>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
            إسلاملي Universal Ummah Index v3.5
          </p>
        </div>
      </footer>
    </div>
  );
}
