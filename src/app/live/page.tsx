"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Radio, 
  CircleDot, 
  Users, 
  ShieldCheck, 
  Database, 
  ChevronRight, 
  Globe, 
  Calendar,
  MessageCircle,
  Video as VideoIcon,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const upcomingLives = [
  { id: 1, title: "Explanation of 40 Hadith", speaker: "Sh. Abdulrahman", time: "Tonight, 8 PM GMT", viewers: "4.2k", status: "Live Soon" },
  { id: 2, title: "Friday Khutbah Re-broadcast", speaker: "Ust. Omar", time: "Every Friday", viewers: "12k", status: "Recurring" },
  { id: 3, title: "Q&A Session: Aqidah", speaker: "Sh. Hassan", time: "Sat, 4 PM GMT", viewers: "800", status: "Scheduled" },
];

export default function LiveNodePage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleJoinStream = (title: string) => {
    toast({ title: "Signal Syncing", description: `Joining ${title} scholarly node...` });
  };

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-4 ring-8 ring-red-500/5 relative">
          <Radio className="w-12 h-12 text-red-500" />
          <div className="absolute -top-1 -right-1">
            <div className="w-4 h-4 bg-red-600 rounded-full animate-ping absolute" />
            <div className="w-4 h-4 bg-red-600 rounded-full relative" />
          </div>
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-white uppercase tracking-tighter">Scholarly Broadcast</h1>
          <p className="text-muted-foreground italic">Real-time knowledge synchronization from verified nodes.</p>
        </div>
      </header>

      <section className="bg-red-500/5 border border-red-500/20 p-8 rounded-3xl text-center space-y-6">
        <h3 className="text-2xl font-headline font-black text-white uppercase tracking-widest">Global Live Hub</h3>
        <p className="text-sm text-muted-foreground leading-relaxed italic max-w-md mx-auto">
          "The best of you are those who learn the Quran and teach it." Access live transmissions from students of knowledge across the globe.
        </p>
        <div className="flex justify-center gap-3">
          <Badge className="bg-red-600 text-white text-[10px] font-black uppercase px-4 py-1.5 flex gap-2">
            <CircleDot className="w-3 h-3 animate-pulse" /> 12 Active Transmissions
          </Badge>
        </div>
      </section>

      <div className="grid gap-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground pl-1">Knowledge Broadcast Schedule</h3>
        {upcomingLives.map((item) => (
          <Card key={item.id} className="glass-card group hover:border-red-500/50 transition-all cursor-pointer overflow-hidden border-2 border-transparent" onClick={() => handleJoinStream(item.title)}>
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
                  <VideoIcon className="w-6 h-6 text-muted-foreground group-hover:text-red-500" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline font-bold text-lg group-hover:text-red-500 transition-colors">{item.title}</h3>
                    <Badge variant="outline" className="text-[8px] uppercase border-red-500/20 text-red-500">{item.status}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-bold uppercase">
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {item.viewers} Students</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.time}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground/20 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-secondary/20 p-8 rounded-[2.5rem] border border-white/5 text-center space-y-6">
        <Globe className="w-10 h-10 text-red-500 mx-auto animate-spin-slow" />
        <div className="space-y-2">
          <h3 className="text-xl font-headline font-bold text-white uppercase tracking-widest">Initialize Stream</h3>
          <p className="text-sm text-muted-foreground italic max-w-sm mx-auto">
            Ready to participate in the interactive scholarly network? Authenticated students can access the live chat node.
          </p>
        </div>
        <Button className="w-full h-14 bg-red-600 hover:bg-red-700 text-md font-headline font-black uppercase tracking-widest shadow-xl shadow-red-900/20" onClick={() => handleJoinStream("Universal Hub")}>
          Enter Live Cluster <MessageCircle className="ml-2 w-5 h-5" />
        </Button>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
            إسلاملي Universal Live Node v3.5 • 17Q Metadata
          </p>
        </div>
      </footer>
    </div>
  );
}
