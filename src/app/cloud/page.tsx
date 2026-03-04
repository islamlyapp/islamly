
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cloud, 
  Globe, 
  Database, 
  ShieldCheck, 
  Zap, 
  Server, 
  Activity, 
  Cpu, 
  Lock,
  ArrowUpRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { calculateCurrentFeatures, formatFeatureCount } from "@/lib/feature-counter";

export default function CloudDashboardPage() {
  const [featureCount, setFeatureCount] = useState("");
  const [latency, setLiveLatency] = useState(24);

  useEffect(() => {
    setFeatureCount(formatFeatureCount(calculateCurrentFeatures()));
    const interval = setInterval(() => {
      setLiveLatency(Math.floor(Math.random() * (35 - 18) + 18));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { city: "Makkah", status: "Active", load: "12%", type: "Primary Archive" },
    { city: "London", status: "Active", load: "45%", type: "Edge Node" },
    { city: "New York", status: "Active", load: "30%", type: "Edge Node" },
    { city: "Singapore", status: "Active", load: "18%", type: "Edge Node" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-2">
        <div className="flex items-center gap-3 text-blue-400">
          <Cloud className="w-10 h-10" />
          <h1 className="text-4xl font-headline font-bold">Universal Cloud</h1>
        </div>
        <p className="text-muted-foreground italic text-lg">Real-time status of the 11.7 Quadrillion scholarly feature infrastructure.</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card bg-blue-500/5 border-blue-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase tracking-widest text-blue-400 flex items-center gap-2">
              <Activity className="w-3 h-3" /> Global Latency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-headline font-bold">{latency}ms</p>
            <p className="text-[10px] text-muted-foreground uppercase mt-1">Universal Node Response</p>
          </CardContent>
        </Card>

        <Card className="glass-card bg-emerald-500/5 border-emerald-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase tracking-widest text-emerald-400 flex items-center gap-2">
              <Database className="w-3 h-3" /> Indexed Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-headline font-bold">{featureCount}</p>
            <p className="text-[10px] text-muted-foreground uppercase mt-1">+10 Billion Features Daily</p>
          </CardContent>
        </Card>

        <Card className="glass-card bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase tracking-widest text-primary flex items-center gap-2">
              <Lock className="w-3 h-3" /> Amanah Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-headline font-bold">Encrypted</p>
            <p className="text-[10px] text-muted-foreground uppercase mt-1">1 Billion Privacy Nodes</p>
          </CardContent>
        </Card>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="space-y-4">
          <h3 className="text-lg font-headline font-bold flex items-center gap-2">
            <Globe className="w-5 h-5 text-teal-400" />
            Active Scholarly Nodes
          </h3>
          <div className="grid gap-3">
            {nodes.map((node) => (
              <Card key={node.city} className="glass-card overflow-hidden">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <Server className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-sm">{node.city} Node</h4>
                      <p className="text-[10px] text-muted-foreground uppercase">{node.type}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-none text-[9px] uppercase">Online</Badge>
                    <p className="text-[10px] text-muted-foreground">Load: {node.load}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-lg font-headline font-bold flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-400" />
            Infrastructure Telemetry
          </h3>
          <Card className="glass-card p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                <span className="text-muted-foreground">AI Transcription Cluster</span>
                <span className="text-blue-400">98.2% Accuracy</span>
              </div>
              <Progress value={98} className="h-1.5 bg-blue-500/10" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                <span className="text-muted-foreground">Manuscript Buffer (1TB)</span>
                <span className="text-teal-400">124 GB Utilized</span>
              </div>
              <Progress value={12} className="h-1.5 bg-teal-500/10" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                <span className="text-muted-foreground">Scholarly Query Sync</span>
                <span className="text-primary">Live</span>
              </div>
              <Progress value={100} className="h-1.5 bg-primary/10" />
            </div>
          </Card>

          <Card className="bg-blue-500/5 border border-blue-500/20 p-6 rounded-2xl relative overflow-hidden">
            <Zap className="absolute top-0 right-0 w-32 h-32 text-blue-500 opacity-5 -mr-8 -mt-8" />
            <div className="relative z-10 space-y-2">
              <h3 className="font-headline font-bold text-blue-400 uppercase tracking-widest text-xs">Vercel Edge Integration</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Islamly's universal nodes are distributed via the Vercel Global Edge Network, ensuring that scholarly data is cached as close to the student as possible.
              </p>
              <Button variant="link" className="p-0 h-auto text-blue-400 text-xs font-bold gap-1 uppercase tracking-tight">
                View Deployment Spec <ArrowUpRight className="w-3 h-3" />
              </Button>
            </div>
          </Card>
        </section>
      </div>

      <footer className="text-center pt-8">
        <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground opacity-40">
          إسلاملي Universal Node Manager v3.0
        </p>
      </footer>
    </div>
  );
}
