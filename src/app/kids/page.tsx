
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Baby, 
  Gamepad2, 
  Star, 
  Sparkles, 
  BookOpen, 
  Trophy, 
  Heart,
  Music,
  Camera,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

const kidActivities = [
  { id: 1, title: "Arabic Alphabet", icon: GraduationCap, color: "bg-blue-500", desc: "Learn to read the Quran!" },
  { id: 2, title: "Prophet Stories", icon: BookOpen, color: "bg-amber-500", desc: "Exciting stories from history." },
  { id: 3, title: "Hero Quiz", icon: Trophy, color: "bg-purple-500", desc: "Test your knowledge!" },
  { id: 4, title: "Daily Duas", icon: Heart, color: "bg-rose-500", desc: "Special words for everyday." },
];

export default function KidsPage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20 overflow-hidden">
      <header className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-10 rounded-[3rem] text-center space-y-4 border-4 border-white/5 relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        
        <div className="mx-auto w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-4 ring-8 ring-white/5 group-hover:rotate-12 transition-transform duration-500">
          <Baby className="w-12 h-12 text-yellow-400" />
        </div>
        <h1 className="text-5xl font-headline font-black tracking-tight text-white drop-shadow-lg">Kids Hub</h1>
        <p className="text-indigo-200 font-medium max-w-sm mx-auto text-lg italic">
          Super-fun learning for little heroes of the Ummah!
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
        <Card className="glass-card border-none bg-yellow-500/10 col-span-full overflow-hidden relative group cursor-pointer h-48">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/adventure/800/400')] opacity-20 mix-blend-overlay group-hover:scale-110 transition-transform duration-1000" />
          <CardContent className="p-8 relative z-10 h-full flex flex-col justify-center">
            <Badge className="w-fit mb-3 bg-yellow-500 text-black font-black uppercase text-[10px]">Grand Adventure</Badge>
            <h3 className="text-3xl font-headline font-black text-white">Journey to Makkah</h3>
            <p className="text-sm text-yellow-200/80 font-medium">An interactive story game for kids.</p>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-100 transition-opacity">
              <Gamepad2 className="w-24 h-24 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        {kidActivities.map((act) => (
          <Card key={act.id} className="glass-card hover:scale-[1.05] transition-all cursor-pointer group border-white/5 overflow-hidden">
            <CardContent className="p-6 flex items-center gap-5">
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform", act.color)}>
                <act.icon className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-1">
                <h4 className="font-headline font-bold text-xl text-white">{act.title}</h4>
                <p className="text-xs text-muted-foreground font-medium">{act.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/20 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-bold text-lg flex items-center gap-2 text-primary">
            <Star className="w-5 h-5 fill-primary" />
            Badge Collection
          </h3>
          <span className="text-[10px] uppercase font-bold text-muted-foreground">Level 4 Hero</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="aspect-square rounded-full bg-white/5 flex items-center justify-center border-2 border-white/10 grayscale hover:grayscale-0 hover:border-primary/50 transition-all cursor-help relative group">
              <Sparkles className="w-6 h-6 text-yellow-500 opacity-40 group-hover:opacity-100" />
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Locked Badge
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center pb-10">
        <Button variant="ghost" className="text-muted-foreground text-[10px] uppercase tracking-[0.3em] font-bold">
          Parental Supervision Node Active
        </Button>
      </footer>
    </div>
  );
}
