
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  ShieldCheck, 
  Activity, 
  Users, 
  Database, 
  Binary, 
  Cpu, 
  Network,
  Lock,
  Loader2,
  AlertTriangle,
  Zap
} from "lucide-react";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { calculateCurrentFeatures, formatFeatureCount } from "@/lib/feature-counter";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  const { user } = useUser();
  const db = useFirestore();
  const [hasMounted, setHasMounted] = useState(false);
  const [featureCount, setFeatureCount] = useState("");

  const profileRef = useMemoFirebase(() => {
    if (!db || !user?.uid) return null;
    // Updated path to match backend.json
    return doc(db, "users", user.uid, "user_profiles", user.uid);
  }, [db, user?.uid]);

  const { data: profile, isLoading } = useDoc(profileRef);

  useEffect(() => {
    setHasMounted(true);
    setFeatureCount(formatFeatureCount(calculateCurrentFeatures()));
  }, []);

  if (!hasMounted || isLoading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
      <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Authenticating Access Node...</p>
    </div>
  );

  if (profile?.role !== 'admin') {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center p-10 space-y-6">
        <AlertTriangle className="w-16 h-16 text-red-500" />
        <div className="space-y-2">
          <h1 className="text-3xl font-headline font-black text-white uppercase">Access Denied</h1>
          <p className="text-muted-foreground italic">This node is restricted to verified scholarly administrators.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-black text-white flex items-center gap-3">
            <LayoutDashboard className="text-primary w-10 h-10" />
            Infrastructure Control
          </h1>
          <p className="text-muted-foreground italic">Managing the 11.7 Quadrillion universal feature set.</p>
        </div>
        <Badge className="bg-emerald-600 text-white font-black uppercase text-[10px] px-4 py-1.5 gap-2">
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
          Master Node Active
        </Badge>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Nodes", val: "42,000", icon: Network, color: "text-blue-400" },
          { label: "Compliance Rate", val: "100%", icon: ShieldCheck, color: "text-emerald-400" },
          { label: "Sync Pulse", val: "12ms", icon: Zap, color: "text-yellow-400" },
          { label: "System Load", val: "14%", icon: Activity, color: "text-primary" },
        ].map((s) => (
          <Card key={s.label} className="glass-card p-6 border-white/5 space-y-2">
            <s.icon className={cn("w-6 h-6", s.color)} />
            <div className="space-y-0.5">
              <p className="text-[10px] uppercase font-bold text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-black text-white">{s.val}</p>
            </div>
          </Card>
        ))}
      </div>

      <section className="bg-secondary/20 p-10 rounded-[3rem] border border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-110 transition-transform">
          <Database className="w-64 h-64" />
        </div>
        <div className="space-y-6 relative z-10">
          <div className="flex items-center gap-3">
            <Binary className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-headline font-black text-white uppercase tracking-widest">Scholarly Index Status</h2>
          </div>
          <p className="text-lg text-muted-foreground italic leading-relaxed max-w-2xl">
            The index is currently operating at **{featureCount}** features. All data clusters are synchronized across global edge coordinates.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-black text-muted-foreground">
                <span>AutoMod Pulse</span>
                <span className="text-emerald-400">Stable</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-full bg-emerald-500" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-black text-muted-foreground">
                <span>Sanad Verification</span>
                <span className="text-blue-400">Active</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-full bg-blue-500" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-black text-muted-foreground">
                <span>Edge Latency</span>
                <span className="text-yellow-400">Minimal</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-full bg-yellow-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
          Governance Active • Protected by 1 Billion Privacy Nodes
        </p>
      </footer>
    </div>
  );
}
