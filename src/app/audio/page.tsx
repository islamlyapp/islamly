"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  Volume2, 
  SkipForward, 
  SkipBack, 
  ListMusic, 
  Heart, 
  Search, 
  Mic2, 
  Radio,
  Clock,
  Download,
  Share2,
  ChevronRight,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const playlists = [
  { id: 1, title: "The Path to Sincerity", speaker: "Sh. Abdulrahman", duration: "45:20", category: "Tazkiyah", url: "https://www.islamcan.com/audio/adhan/azan1.mp3" },
  { id: 2, title: "Rights of the Neighbor", speaker: "Ust. Omar", duration: "32:10", category: "Adab", url: "https://www.islamcan.com/audio/adhan/azan2.mp3" },
  { id: 3, title: "Fiqh of Purification", speaker: "Dr. Ali", duration: "1:12:00", category: "Fiqh", url: "https://www.islamcan.com/audio/adhan/azan3.mp3" },
  { id: 4, title: "Lives of the Sahaba", speaker: "Sh. Hassan", duration: "28:45", category: "History", url: "https://www.islamcan.com/audio/adhan/azan15.mp3" },
];

export default function AudioHubPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = playlists[currentTrackIndex];

  useEffect(() => {
    setHasMounted(true);
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.url;
      if (isPlaying) audioRef.current.play();
    }
  }, [currentTrackIndex, isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack.url);
      audioRef.current.ontimeupdate = () => {
        if (audioRef.current) {
          setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
      };
      audioRef.current.onended = () => nextTrack();
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlists.length);
    setProgress(0);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlists.length) % playlists.length);
    setProgress(0);
  };

  const handleAction = (msg: string) => {
    toast({ title: "Node Protocol", description: msg });
  };

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-32">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-headline font-bold flex items-center gap-3">
              <Radio className="text-primary w-10 h-10" />
              Scholarly Audio
            </h1>
            <p className="text-muted-foreground italic">Lectures, podcasts, and audiobooks from verified sources.</p>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            <Database className="w-3 h-3 mr-1" /> HQ Stream Active
          </Badge>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search lectures, speakers, or topics..." 
            className="pl-10 glass-card h-14"
          />
        </div>
      </header>

      <Card className="bg-gradient-to-br from-primary/20 to-secondary border-primary/20 overflow-hidden shadow-2xl relative group">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
          <Mic2 className="w-48 h-48" />
        </div>
        <CardContent className="p-8 relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="w-48 h-48 rounded-2xl bg-black/40 flex items-center justify-center border border-white/5 shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/speaker/400/400')] opacity-40 grayscale" />
              <Volume2 className="w-12 h-12 text-primary relative z-10" />
            </div>
            <div className="flex-1 text-center sm:text-left space-y-4">
              <div className="space-y-1">
                <Badge className="bg-primary text-white text-[10px] font-black mb-2 uppercase">Now Playing</Badge>
                <h2 className="text-3xl font-headline font-bold leading-tight">{currentTrack.title}</h2>
                <p className="text-lg text-muted-foreground font-medium italic">{currentTrack.speaker}</p>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <Button size="sm" variant="outline" className="gap-2 text-[10px] font-black uppercase border-white/10" onClick={() => handleAction("Offline storage sequence initiated.")}>
                  <Download className="w-3 h-3" /> Offline Node
                </Button>
                <Button size="sm" variant="outline" className="gap-2 text-[10px] font-black uppercase border-white/10" onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  handleAction("Transmission URL dispatched to clipboard.");
                }}>
                  <Share2 className="w-3 h-3" /> Dispatch
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-[10px] font-black text-muted-foreground uppercase">
              <span>Live Node</span>
              <span>{currentTrack.duration}</span>
            </div>
            <Progress value={progress} className="h-1.5 bg-black/20 transition-all" />
            <div className="flex items-center justify-center gap-8 pt-2">
              <button className="text-muted-foreground hover:text-white transition-colors" onClick={prevTrack}><SkipBack className="w-6 h-6" /></button>
              <Button 
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 scale-110"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-white" />}
              </Button>
              <button className="text-muted-foreground hover:text-white transition-colors" onClick={nextTrack}><SkipForward className="w-6 h-6" /></button>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground pl-1">Recent Library Nodes</h3>
        <div className="grid gap-3">
          {playlists.map((track, idx) => (
            <Card key={track.id} className={cn(
              "glass-card hover:bg-white/[0.03] transition-all cursor-pointer group",
              currentTrackIndex === idx && "border-primary/40 bg-primary/5"
            )} onClick={() => {
              setCurrentTrackIndex(idx);
              setIsPlaying(true);
            }}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <ListMusic className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-headline font-bold text-sm">{track.title}</h4>
                    <p className="text-xs text-muted-foreground italic">{track.speaker}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-[8px] uppercase opacity-60 border-white/5">{track.category}</Badge>
                  <span className="text-[10px] font-bold text-muted-foreground">{track.duration}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="text-center pt-8 pb-10 opacity-40">
        <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-black italic">
          Scholarly Audio Node: Protected by 1 Billion Privacy Nodes
        </p>
      </footer>
    </div>
  );
}
