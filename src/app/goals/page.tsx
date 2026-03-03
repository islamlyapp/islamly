
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, Trophy, Clock, BookOpen, GraduationCap, CheckCircle2, Flame, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const goals = [
  { id: 1, title: "Memorize Surah Al-Mulk", progress: 65, type: "Hifz", icon: BookOpen, deadline: "12 days left" },
  { id: 2, title: "Complete Aqidah Course", progress: 40, type: "Study", icon: GraduationCap, deadline: "Ongoing" },
  { id: 3, title: "Daily Morning Adhkar", progress: 90, type: "Practice", icon: Clock, deadline: "Current Streak: 14" },
];

export default function GoalsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-2">
        <div className="flex items-center gap-3 text-blue-400">
          <Target className="w-8 h-8" />
          <h1 className="text-3xl font-headline font-bold">Scholarly Goals</h1>
        </div>
        <p className="text-muted-foreground italic">Structured progression for the serious student of knowledge.</p>
      </header>

      <section className="grid grid-cols-2 gap-4">
        <Card className="glass-card p-6 flex flex-col items-center gap-2 text-center border-yellow-500/20">
          <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center">
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-lg text-yellow-500">12</h4>
            <p className="text-[10px] uppercase text-muted-foreground font-bold">Badges Earned</p>
          </div>
        </Card>
        <Card className="glass-card p-6 flex flex-col items-center gap-2 text-center border-orange-500/20">
          <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
            <Flame className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <h4 className="font-headline font-bold text-lg text-orange-500">21</h4>
            <p className="text-[10px] uppercase text-muted-foreground font-bold">Day Streak</p>
          </div>
        </Card>
      </section>

      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground pl-1">Active Progression</h3>
        <div className="grid gap-4">
          {goals.map((goal) => (
            <Card key={goal.id} className="glass-card group hover:border-blue-400/50 transition-all">
              <CardContent className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-400/10 rounded-xl flex items-center justify-center shrink-0">
                      <goal.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-sm group-hover:text-blue-400 transition-colors">{goal.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-[8px] uppercase">{goal.type}</Badge>
                        <span className="text-[10px] text-muted-foreground italic">{goal.deadline}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-400">{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-1.5 bg-blue-400/10" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <section className="bg-blue-400/5 border border-blue-400/20 p-6 rounded-2xl flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-blue-400" />
          <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-blue-400">Weekly Achievement</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Complete your "Foundations of Aqidah" quiz this week to unlock the **Student of Proof** digital badge.
        </p>
        <Button className="w-full bg-blue-400 hover:bg-blue-500 text-white font-headline gap-2">
          Go to Quiz <ArrowRight className="w-4 h-4" />
        </Button>
      </section>
    </div>
  );
}
