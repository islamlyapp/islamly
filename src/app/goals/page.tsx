
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Flame, 
  Trophy, 
  ShieldCheck, 
  Clock, 
  Star, 
  Zap, 
  ChevronRight,
  Database,
  ArrowUpRight,
  Fingerprint
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const dailyGoals = [
  { id: 1, title: "Morning Adhkar", progress: 100, target: 1, unit: "Session" },
  { id: 2, title: "Quran Memorization", progress: 45, target: 5, unit: "Verses" },
  { id: 3, title: "Knowledge Path", progress: 2, target: 10, unit: "Steps" },
  { id: 4, title: "Congregational Prayer", progress: 3, target: 5, unit: "Salah" },
];

export default function GoalsPage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-headline font-bold flex items-center gap-3">
              <Target className="text-primary w-10 h-10" />
              Scholarly Goals
            </h1>
            <p className="text-muted-foreground italic">Precision tracking for your spiritual journey.</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 text-orange-500 font-black">
              <Flame className="w-5 h-5 animate-bounce" /> 12 Day
            </div>
            <span className="text-[10px] uppercase font-bold text-muted-foreground">Continuous Streak</span>
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass-card p-6 border-primary/20 bg-primary/5 flex flex-col items-center gap-2 text-center">
          <Trophy className="w-8 h-8 text-primary mb-2" />
          <h3 className="text-3xl font-black font-headline">42</h3>
          <p className="text-[10px] uppercase font-bold text-muted-foreground">Badges Earned</p>
        </Card>
        <Card className="glass-card p-6 border-yellow-500/20 bg-yellow-500/5 flex flex-col items-center gap-2 text-center">
          <Star className="w-8 h-8 text-yellow-500 mb-2" />
          <h3 className="text-3xl font-black font-headline">1.2K</h3>
          <p className="text-[10px] uppercase font-bold text-muted-foreground">Knowledge XP</p>
        </Card>
        <Card className="glass-card p-6 border-blue-500/20 bg-blue-500/5 flex flex-col items-center gap-2 text-center">
          <Zap className="w-8 h-8 text-blue-400 mb-2" />
          <h3 className="text-3xl font-black font-headline">88%</h3>
          <p className="text-[10px] uppercase font-bold text-muted-foreground">Precision Rate</p>
        </Card>
      </section>

      <div className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground pl-1">Daily Protocol Nodes</h3>
        <div className="grid gap-3">
          {dailyGoals.map((goal) => (
            <Card key={goal.id} className="glass-card overflow-hidden">
              <CardContent className="p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                      <Fingerprint className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-headline font-bold text-sm">{goal.title}</span>
                  </div>
                  <span className="text-xs font-black text-primary">
                    {goal.progress === 100 ? "Verified" : `${goal.progress}%`}
                  </span>
                </div>
                <Progress value={goal.progress} className="h-1.5 bg-white/5" />
                <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">
                  <span>Current: {Math.round((goal.progress / 100) * goal.target)} {goal.unit}</span>
                  <span>Target: {goal.target} {goal.unit}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <section className="bg-secondary/20 p-8 rounded-3xl border border-white/5 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-primary" />
            <h3 className="font-headline font-bold text-lg text-foreground">Long-term Path</h3>
          </div>
          <Badge variant="outline" className="text-[8px] uppercase border-primary/30 text-primary">17Q Features</Badge>
        </div>
        <div className="grid gap-4">
          {["Complete 40 Hadith Path", "Hifz: Surah Al-Baqarah", "Fiqh Foundations Node"].map(path => (
            <div key={path} className="flex items-center justify-between p-4 rounded-xl bg-background/40 hover:bg-background/80 transition-all cursor-pointer group">
              <span className="text-xs font-medium">{path}</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-black">
          إسلاملي Universal Achievement Engine v1.0
        </p>
      </footer>
    </div>
  );
}
