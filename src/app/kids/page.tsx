
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Baby, Star, Trophy, Palette, PlayCircle } from "lucide-react";
import Image from "next/image";

export default function KidsPage() {
  const activities = [
    { title: "Prophet Stories", icon: Star, color: "bg-yellow-500/20 text-yellow-500", items: "12 Stories" },
    { title: "Arabic Games", icon: Palette, color: "bg-blue-500/20 text-blue-500", items: "5 Games" },
    { title: "Daily Duas", icon: Trophy, color: "bg-green-500/20 text-green-500", items: "20 Duas" },
    { title: "Cartoon Series", icon: PlayCircle, color: "bg-red-500/20 text-red-500", items: "8 Episodes" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-8 rounded-3xl text-center space-y-2">
        <Baby className="w-12 h-12 mx-auto text-primary mb-2" />
        <h1 className="text-3xl font-headline font-bold">Kids Corner</h1>
        <p className="text-muted-foreground italic">Learning Islam is fun!</p>
      </header>

      <section className="grid grid-cols-2 gap-4">
        {activities.map((act) => (
          <Card key={act.title} className="glass-card border-none overflow-hidden hover:scale-105 transition-transform cursor-pointer">
            <CardContent className="p-6 flex flex-col items-center gap-3 text-center">
              <div className={`p-4 rounded-2xl ${act.color}`}>
                <act.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-sm">{act.title}</h3>
                <Badge variant="secondary" className="mt-1 text-[10px]">{act.items}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-headline font-bold pl-2">Daily Challenge</h2>
        <Card className="bg-primary/10 border-primary/20 p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <Star className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <div>
              <h3 className="font-headline font-bold">Learn Surah Al-Ikhlas</h3>
              <p className="text-xs text-muted-foreground mt-1">Memorize the meaning of this short Surah today and earn a digital badge!</p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
