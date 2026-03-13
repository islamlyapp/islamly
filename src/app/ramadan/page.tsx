
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Moon, 
  Timer, 
  Calendar, 
  CheckCircle2, 
  Flame, 
  Utensils, 
  Sparkles, 
  Clock, 
  BookOpen,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const sunnahTracker = [
  { id: 1, title: "Tahajjud / Qiyam", icon: Sparkles },
  { id: 2, title: "Suhoor (Sunnah)", icon: Utensils },
  { id: 3, title: "Quran Recitation", icon: BookOpen },
  { id: 4, title: "Congregational Iftar", icon: Utensils },
];

export default function RamadanPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    setHasMounted(true);
    // Simulate current day progress
    setProgress(65);
  }, []);

  const toggleTask = (id: number) => {
    setCompleted(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-24 h-24 bg-indigo-500/20 rounded-[2.5rem] flex items-center justify-center mb-4 ring-8 ring-indigo-500/5 rotate-12 transition-transform hover:rotate-0 duration-500">
          <Moon className="w-12 h-12 text-indigo-400 fill-indigo-400/20" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-black text-white tracking-tight">Ramadan Pulse</h1>
          <p className="text-muted-foreground italic">Maximizing the spiritual harvest of the blessed month.</p>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass-card border-indigo-500/20 bg-indigo-500/5 p-6 flex flex-col items-center gap-2 text-center">
          <Timer className="w-8 h-8 text-indigo-400 mb-2" />
          <h3 className="text-3xl font-black font-headline text-white">12 Days</h3>
          <p className="text-[10px] uppercase font-bold text-muted-foreground">Until Eid al-Fitr</p>
        </Card>
        <Card className="glass-card border-orange-500/20 bg-orange-500/5 p-6 flex flex-col items-center gap-2 text-center">
          <Flame className="w-8 h-8 text-orange-500 mb-2" />
          <h3 className="text-3xl font-black font-headline text-white">18</h3>
          <p className="text-[10px] uppercase font-bold text-muted-foreground">Total Fasts Completed</p>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Day 19 Protocol</h3>
          <Badge className="bg-indigo-600 text-[10px] font-black uppercase">Active Node</Badge>
        </div>
        
        <Card className="glass-card overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                <span>Fasting Duration</span>
                <span className="text-indigo-400">14h 22m Remaining</span>
              </div>
              <Progress value={progress} className="h-2 bg-indigo-500/10" />
            </div>

            <div className="grid gap-3">
              {sunnahTracker.map((task) => (
                <button 
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-xl border-2 transition-all group",
                    completed.includes(task.id) 
                      ? "border-indigo-500/30 bg-indigo-500/10" 
                      : "border-transparent bg-secondary/20 hover:bg-secondary/40"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <task.icon className={cn(
                      "w-5 h-5",
                      completed.includes(task.id) ? "text-indigo-400" : "text-muted-foreground"
                    )} />
                    <span className={cn(
                      "text-sm font-headline font-bold",
                      completed.includes(task.id) ? "text-white" : "text-muted-foreground"
                    )}>{task.title}</span>
                  </div>
                  {completed.includes(task.id) ? (
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 animate-in zoom-in" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-white/10 group-hover:border-indigo-500/30" />
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="bg-primary/5 p-8 rounded-3xl border border-primary/20 space-y-4">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-primary" />
          <h3 className="font-headline font-bold text-lg text-white">Daily Dua (Iftar)</h3>
        </div>
        <p className="text-2xl font-serif text-literata text-right leading-loose text-white" dir="rtl">
          ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ
        </p>
        <p className="text-xs text-muted-foreground italic leading-relaxed">
          "The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills." [Abu Dawood]
        </p>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-black italic">
          إسلاملي Universal Ramadan Infrastructure v1.0
        </p>
      </footer>
    </div>
  );
}
