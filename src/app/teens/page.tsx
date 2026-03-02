"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Zap, Trophy, MessageSquare, Play, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TeensPage() {
  const activities = [
    { title: "Youth Halaqa", time: "Friday Night", icon: Users, color: "text-blue-400" },
    { title: "Gaming Tournament", time: "Sat, 4 PM", icon: Zap, color: "text-yellow-400" },
    { title: "Quiz Night", time: "Weekly", icon: Trophy, color: "text-green-400" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-8 rounded-3xl text-center space-y-3 border border-white/5">
        <Zap className="w-12 h-12 mx-auto text-yellow-400 animate-pulse" />
        <h1 className="text-3xl font-headline font-bold">Youth Hub</h1>
        <p className="text-muted-foreground text-sm">Real talk, real faith, real community.</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        <Card className="glass-card col-span-2 overflow-hidden relative h-40">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/youth/800/400')] bg-cover opacity-20" />
          <CardContent className="p-6 relative z-10 h-full flex flex-col justify-end">
            <Badge className="w-fit mb-2 bg-red-500">New Video</Badge>
            <h3 className="text-xl font-headline font-bold">Finding Your Purpose</h3>
            <p className="text-xs text-muted-foreground">Watch our latest series for teens.</p>
          </CardContent>
        </Card>

        {activities.map((act) => (
          <Card key={act.title} className="glass-card hover:scale-105 transition-transform cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center gap-2 text-center">
              <act.icon className={`w-6 h-6 ${act.color}`} />
              <h4 className="font-headline font-bold text-xs">{act.title}</h4>
              <span className="text-[10px] text-muted-foreground">{act.time}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-secondary/20 p-6 rounded-2xl border border-border space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-bold text-sm flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500" />
            Trending Topics
          </h3>
          <Badge variant="outline" className="text-[10px]">Active Now</Badge>
        </div>
        <div className="space-y-2">
          {["Mental Health", "Social Media Ethics", "College Survival"].map(t => (
            <div key={t} className="flex items-center justify-between p-3 rounded-lg bg-card/40 hover:bg-card/80 transition-all cursor-pointer">
              <span className="text-xs font-medium">{t}</span>
              <MessageSquare className="w-3 h-3 text-muted-foreground" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
