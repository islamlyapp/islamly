"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Radio, Users, Calendar, Play } from "lucide-react";
import Image from "next/image";

export default function LivePage() {
  const upcoming = [
    { title: "Sharh Al-Aqidah", scholar: "Sheikh Abu Zaid", time: "Today, 8 PM", viewers: "450" },
    { title: "Weekly Tafsir", scholar: "Dr. Muhammad", time: "Tomorrow, 6 PM", viewers: "1.2k" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-primary">
          <Video className="w-8 h-8" />
          <h1 className="text-3xl font-headline font-bold">Islamly Live</h1>
        </div>
        <Badge variant="destructive" className="animate-pulse">Live Now</Badge>
      </header>

      {/* Main Feature Video (Simulated) */}
      <section className="relative aspect-video rounded-2xl overflow-hidden bg-black group cursor-pointer shadow-2xl">
        <Image 
          src="https://picsum.photos/seed/lecture/800/450" 
          alt="Live Stream" 
          fill 
          className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
          data-ai-hint="scholar lecture"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:bg-primary/80 transition-all">
            <Play className="w-8 h-8 text-white fill-white" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 p-6 space-y-1 w-full bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-red-600 text-[10px]">LIVE</Badge>
            <span className="text-white/80 text-xs flex items-center gap-1">
              <Users className="w-3 h-3" /> 1,240 watching
            </span>
          </div>
          <h2 className="text-xl font-headline font-bold text-white">The Foundations of the Sunnah</h2>
          <p className="text-white/60 text-sm">Series explanation of Imam Ahmad's Usul-us-Sunnah.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-headline font-bold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent" />
          Upcoming Streams
        </h3>
        <div className="grid gap-3">
          {upcoming.map((stream) => (
            <Card key={stream.title} className="glass-card hover:bg-secondary/30 transition-colors">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="font-headline font-bold text-sm">{stream.title}</h4>
                  <p className="text-xs text-accent italic">{stream.scholar}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-primary">{stream.time}</p>
                  <Button variant="ghost" size="sm" className="h-7 text-[10px] mt-1">Set Reminder</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-secondary/20 p-6 rounded-xl border border-border flex items-center gap-4">
        <div className="p-3 bg-primary/20 rounded-full">
          <Radio className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-headline font-bold text-sm">24/7 Quran Radio</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Continuous recitation by world-renowned Qaris.</p>
          <Button variant="link" className="p-0 h-auto text-primary text-xs mt-2">Listen Now</Button>
        </div>
      </section>
    </div>
  );
}
