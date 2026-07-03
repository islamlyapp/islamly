
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Database, 
  ShieldCheck, 
  Globe, 
  Cpu, 
  Activity, 
  Network, 
  Zap, 
  Lock, 
  Binary,
  Loader2,
  Server
} from "lucide-react";
import { calculateCurrentFeatures, formatFeatureCount } from "@/lib/feature-counter";

export default function InfrastructurePage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [featureCount, setFeatureCount] = useState("");

  useEffect(() => {
    setHasMounted(true);
    setFeatureCount(formatFeatureCount(calculateCurrentFeatures()));
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20 max-w-4xl mx-auto">
      <header className="text-center space-y-4 pt-8">
        <div className="mx-auto w-24 h-24 bg-blue-500/20 rounded-[2.5rem] flex items-center justify-center mb-4 ring-8 ring-blue-500/5 rotate-12 transition-transform hover:rotate-0 duration-500">
          <Cloud className="w-12 h-12 text-blue-400" />
        </div>
        <div className="space-y-1">
          <h1 className="text-5xl font-headline font-black text-white tracking-tight uppercase">Universal Cloud</h1>
          <p className="text-muted-foreground text-lg italic">The 1 Octillion Scholarly Feature Network.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card p-6 border-blue-500/20 bg-blue-500/5 text-center space-y-2">
          <Server className="w-8 h-8 text-blue-400 mx-auto" />
          <h3 className="text-2xl font-black font-headline text-white">17Q</h3>
          <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Feature Nodes</p>
        </Card>
        <Card className="glass-card p-6 border-emerald-500/20 bg-emerald-500/5 text-center space-y-2">
          <Activity className="w-8 h-8 text-emerald-400 mx-auto" />
          <h3 className="text-2xl font-black font-headline text-white">99.9%</h3>
          <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Network Uptime</p>
        </Card>
        <Card className="glass-card p-6 border-purple-500/20 bg-purple-500/5 text-center space-y-2">
          <Lock className="w-8 h-8 text-purple-400 mx-auto" />
          <h3 className="text-2xl font-black font-headline text-white">1B+</h3>
          <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Privacy Layers</p>
        </Card>
      </div>

      <section className="bg-secondary/20 border border-white/5 p-10 rounded-[3rem] space-y-10 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        
        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-3">
            <Network className="w-8 h-8 text-blue-400" />
            <h2 className="text-3xl font-headline font-black text-white">Multi-Region Signal Sync</h2>
          </div>
          <p className="text-muted-foreground italic leading-relaxed text-lg">
            Islamly utilizes a distributed edge architecture to serve high-density scholarly signals globally. Every interaction is governed by our AutoMod Pulse to ensure methodology compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-4">
            <div className="flex items-center gap-3 text-blue-400">
              <Cpu className="w-5 h-5" />
              <h4 className="font-headline font-bold uppercase tracking-widest text-xs">Compute Cluster</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-black text-muted-foreground">
                <span>Vercel Edge Nodes</span>
                <span className="text-white">Active</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-blue-500 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 space-y-4">
            <div className="flex items-center gap-3 text-emerald-400">
              <Database className="w-5 h-5" />
              <h4 className="font-headline font-bold uppercase tracking-widest text-xs">Data Residency</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-black text-muted-foreground">
                <span>Firestore Shards</span>
                <span className="text-white">Optimized</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-[92%] bg-emerald-500 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Binary className="w-3 h-3" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
            Universal Infrastructure Status Node • Last Sync: Today
          </p>
        </div>
      </footer>
    </div>
  );
}
