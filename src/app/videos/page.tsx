
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  ShieldCheck, 
  Database, 
  Layers, 
  ChevronRight, 
  Search, 
  Clock, 
  User, 
  Share2,
  Video as VideoIcon,
  Sparkles,
  Lock,
  Loader2,
  Network
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Helper to extract YT ID
const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const INITIAL_VIDEOS = [
  { 
    id: "amau-1", 
    title: "The Path to Seeking Knowledge", 
    url: "https://www.youtube.com/watch?v=isCs_X8_clI",
    author: "Ustadh Abdulrahman Hassan", 
    category: "Tazkiyah",
    duration: "52:10",
    source: "AMAU Node"
  },
  { 
    id: "rah-1", 
    title: "The Three Fundamental Principles", 
    url: "https://www.youtube.com/watch?v=v_OnIs_vInY",
    author: "Al-Rahmaniyyah", 
    category: "Aqidah",
    duration: "45:30",
    source: "Rahmaniyyah Node"
  },
  { 
    id: "amau-2", 
    title: "Explanation of Kitab At-Tawhid - Lesson 1", 
    url: "https://www.youtube.com/watch?v=v_OnIs_vInY",
    author: "Ustadh Abdulrahman Hassan", 
    category: "Aqidah",
    duration: "1:05:45",
    source: "AMAU Node"
  },
  { 
    id: "rah-2", 
    title: "The Foundations of the Sunnah", 
    url: "https://www.youtube.com/watch?v=UQZ6_v_InY",
    author: "Al-Rahmaniyyah", 
    category: "Manhaj",
    duration: "1:12:00",
    source: "Rahmaniyyah Node"
  },
  { 
    id: "amau-3", 
    title: "The Importance of the Sunnah", 
    url: "https://www.youtube.com/watch?v=UQZ6_v_InY",
    author: "Ustadh Abdulrahman Hassan", 
    category: "Manhaj",
    duration: "48:30",
    source: "AMAU Node"
  },
  { 
    id: "rah-3", 
    title: "Explanation of the Four Rules", 
    url: "https://www.youtube.com/watch?v=isCs_X8_clI",
    author: "Al-Rahmaniyyah", 
    category: "Aqidah",
    duration: "32:15",
    source: "Rahmaniyyah Node"
  }
];

export default function VideosPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [activeVideo, setActiveVideo] = useState<any>(INITIAL_VIDEOS[0]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const ytId = getYoutubeId(activeVideo.url);

  const filteredVideos = INITIAL_VIDEOS.filter(v => 
    v.title.toLowerCase().includes(search.toLowerCase()) || 
    v.category.toLowerCase().includes(search.toLowerCase()) ||
    v.source.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-headline font-bold flex items-center gap-3">
              <VideoIcon className="text-primary w-10 h-10" />
              Scholarly Videos
            </h1>
            <p className="text-muted-foreground italic">High-density transmissions from the Universal Scholarly Network.</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Network className="w-3 h-3 mr-1" /> Multi-Node Stream
            </Badge>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <Lock className="w-2.5 h-2.5 text-emerald-500" />
              <span className="text-[7px] uppercase font-black text-emerald-500 tracking-widest">AutoMod Pulse Active</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search AMAU, Rahmaniyyah, or scholarly keywords..." 
            className="pl-10 glass-card h-14 border-white/5 focus-visible:ring-primary/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {/* Main Player Infrastructure */}
      <section className="space-y-6">
        <Card className="glass-card border-none shadow-2xl overflow-hidden aspect-video relative group">
          {ytId ? (
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1`}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
              <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
              <p className="text-[10px] uppercase tracking-widest mt-4">Syncing Video Node...</p>
            </div>
          )}
          
          <div className="absolute top-4 left-4 z-10 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity">
            <Badge className="bg-primary text-white text-[8px] uppercase tracking-widest px-3 py-1">Normalized Scholarly Stream</Badge>
          </div>
        </Card>

        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-headline font-bold text-white">{activeVideo.title}</h2>
              <Badge variant="outline" className="text-[8px] uppercase border-primary/20 text-primary">{activeVideo.category}</Badge>
              <Badge variant="outline" className="text-[8px] uppercase border-white/10 text-muted-foreground">{activeVideo.source}</Badge>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium italic">
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-primary" /> {activeVideo.author}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {activeVideo.duration}</span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary/5 border border-primary/10">
                <Layers className="w-2.5 h-2.5 text-primary opacity-60" />
                <span className="text-[7px] font-bold text-primary uppercase tracking-widest">10,000+ Signal Nodes</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none h-10 uppercase font-black text-[10px] tracking-widest border-white/10" onClick={() => {}}>
              <Share2 className="w-3 h-3 mr-2" /> Dispatch Node
            </Button>
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none h-10 uppercase font-black text-[10px] tracking-widest border-white/10" onClick={() => {}}>
              <ShieldCheck className="w-3 h-3 mr-2" /> Verify Methodology
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4 pt-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground pl-1">Knowledge Archive Index</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredVideos.map((v) => (
            <Card 
              key={v.id} 
              className={cn(
                "glass-card hover:border-primary/50 transition-all cursor-pointer group active:scale-[0.98] border-2",
                activeVideo.id === v.id ? "border-primary/40 bg-primary/5" : "border-transparent"
              )}
              onClick={() => setActiveVideo(v)}
            >
              <div className="aspect-video relative overflow-hidden bg-black/40">
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-10 h-10 text-white fill-white shadow-2xl" />
                </div>
                <div className="absolute top-2 right-2 text-[8px] font-black bg-black/60 px-1.5 py-0.5 rounded text-white border border-white/10">
                  {v.duration}
                </div>
                <div className="absolute bottom-2 left-2">
                  <Badge className="bg-black/80 text-[6px] uppercase tracking-tighter border-white/10">{v.source}</Badge>
                </div>
              </div>
              <CardContent className="p-4 space-y-2">
                <h4 className="font-headline font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors">{v.title}</h4>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span className="font-medium">{v.author}</span>
                  <Badge variant="outline" className="text-[7px] h-4 py-0 border-white/5 uppercase">{v.category}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-primary/5 border border-primary/20 p-8 rounded-[2.5rem] text-center space-y-6">
        <Sparkles className="w-10 h-10 text-primary mx-auto animate-pulse" />
        <div className="space-y-2">
          <h3 className="text-2xl font-headline font-bold text-white uppercase tracking-tight">Scholarly Governance</h3>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto italic leading-relaxed">
            Content from the AMAU and Rahmaniyyah nodes is recognized for strict adherence to the methodology of the Salaf. Every transmission is indexed with 10,000+ verification points.
          </p>
        </div>
        <div className="flex justify-center gap-3">
          <Badge variant="outline" className="bg-background/50 border-emerald-500/20 text-emerald-500 text-[8px] uppercase px-4 py-1">Methodology Verified</Badge>
          <Badge variant="outline" className="bg-background/50 border-primary/20 text-primary text-[8px] uppercase px-4 py-1">11.7Q Metadata</Badge>
        </div>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
            إسلاملي Universal Video Infrastructure v1.0 • Multi-Node Synchronized
          </p>
        </div>
      </footer>
    </div>
  );
}
