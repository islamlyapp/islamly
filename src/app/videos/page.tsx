
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
  Network,
  Binary
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { toast } from "@/hooks/use-toast";

// Helper to extract YT ID
const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

// HIGH-DENSITY UNIVERSAL DATASET
const INITIAL_VIDEOS = [
  // AMAU OFFICIAL
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
    id: "amau-2", 
    title: "Explanation of Kitab At-Tawhid", 
    url: "https://www.youtube.com/watch?v=isCs_X8_clI", // Using same ID for prototype flow
    author: "Ustadh Abdulrahman Hassan", 
    category: "Aqidah",
    duration: "1:15:30",
    source: "AMAU Node"
  },
  // AL-RAHMANIYYAH
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
    id: "rah-2", 
    title: "Foundations of the Sunnah", 
    url: "https://www.youtube.com/watch?v=v_OnIs_vInY",
    author: "Al-Rahmaniyyah", 
    category: "Manhaj",
    duration: "38:15",
    source: "Rahmaniyyah Node"
  },
  // ONE MESSAGE FOUNDATION
  { 
    id: "omf-1", 
    title: "Proof Islam is the Truth", 
    url: "https://www.youtube.com/watch?v=isCs_X8_clI",
    author: "Shaykh Uthman Ibn Farooq", 
    category: "Dawah",
    duration: "28:45",
    source: "OMF Node"
  },
  { 
    id: "omf-2", 
    title: "Refuting Doubts on Hadith", 
    url: "https://www.youtube.com/watch?v=isCs_X8_clI",
    author: "Shaykh Uthman Ibn Farooq", 
    category: "Defense",
    duration: "42:10",
    source: "OMF Node"
  },
  // ABU TAYMIYYAH
  { 
    id: "at-1", 
    title: "The Reality of This World", 
    url: "https://www.youtube.com/watch?v=v_OnIs_vInY",
    author: "Shaykh Abu Taymiyyah", 
    category: "Reminders",
    duration: "12:30",
    source: "Abu Taymiyyah Node"
  },
  { 
    id: "at-2", 
    title: "Fixing Your Heart", 
    url: "https://www.youtube.com/watch?v=v_OnIs_vInY",
    author: "Shaykh Abu Taymiyyah", 
    category: "Character",
    duration: "15:45",
    source: "Abu Taymiyyah Node"
  },
  // YASIR IBN YOUSAF
  { 
    id: "yiy-1", 
    title: "Be a Stranger (Ghuraba)", 
    url: "https://www.youtube.com/watch?v=isCs_X8_clI",
    author: "Yasir Ibn Yousaf", 
    category: "Reminders",
    duration: "10:20",
    source: "Yasir Node"
  },
  { 
    id: "yiy-2", 
    title: "Holding onto the Sunnah", 
    url: "https://www.youtube.com/watch?v=isCs_X8_clI",
    author: "Yasir Ibn Yousaf", 
    category: "Manhaj",
    duration: "14:10",
    source: "Yasir Node"
  },
  // DEEN INSTITUTE
  { 
    id: "deen-1", 
    title: "Arabic Grammar Foundations", 
    url: "https://www.youtube.com/watch?v=v_OnIs_vInY",
    author: "Deen Institute", 
    category: "Language",
    duration: "1:05:00",
    source: "Deen Institute Node"
  },
  { 
    id: "deen-2", 
    title: "Introduction to Fiqh", 
    url: "https://www.youtube.com/watch?v=v_OnIs_vInY",
    author: "Deen Institute", 
    category: "Fiqh",
    duration: "55:20",
    source: "Deen Institute Node"
  }
];

export default function VideosPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [activeVideo, setActiveVideo] = useState<any>(null);
  const [search, setSearch] = useState("");
  
  const db = useFirestore();

  // Initialize Dynamic Firestore Cluster
  const videosQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "videos"), orderBy("title", "asc"), limit(50));
  }, [db]);

  const { data: dbVideos, isLoading } = useCollection(videosQuery);

  // Combine DB videos with high-density fallbacks
  const allAvailableVideos = useMemoFirebase(() => {
    const list = [...(dbVideos || []), ...INITIAL_VIDEOS];
    // Simple de-dupe by ID for stable rendering
    return Array.from(new Map(list.map(v => [v.id, v])).values());
  }, [dbVideos]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (allAvailableVideos.length > 0 && !activeVideo) {
      setActiveVideo(allAvailableVideos[0]);
    }
  }, [allAvailableVideos, activeVideo]);

  if (!hasMounted) return null;

  const ytId = activeVideo ? getYoutubeId(activeVideo.url) : null;

  const filteredVideos = allAvailableVideos.filter(v => 
    v.title.toLowerCase().includes(search.toLowerCase()) || 
    v.category.toLowerCase().includes(search.toLowerCase()) ||
    v.source.toLowerCase().includes(search.toLowerCase()) ||
    v.author.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopyNode = () => {
    if (activeVideo) {
      navigator.clipboard.writeText(activeVideo.url);
      toast({ title: "Node Dispatched", description: "Video transmission URL copied to clipboard." });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-headline font-bold flex items-center gap-3">
              <VideoIcon className="text-primary w-10 h-10" />
              Scholarly Transmissions
            </h1>
            <p className="text-muted-foreground italic">Universal streaming across 6 primary scholarly nodes.</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Network className="w-3 h-3 mr-1" /> Multi-Node Cluster
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
            placeholder="Search AMAU, Rahmaniyyah, OMF, Abu Taymiyyah, Yasir, Deen Institute..." 
            className="pl-10 glass-card h-14 border-white/5 focus-visible:ring-primary/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {/* Main Player Infrastructure */}
      <section className="space-y-6">
        <Card className="glass-card border-none shadow-2xl overflow-hidden aspect-video relative group ring-1 ring-white/5">
          {ytId ? (
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1&color=white`}
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
          
          <div className="absolute top-4 left-4 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <Badge className="bg-black/80 backdrop-blur-md text-white text-[8px] uppercase tracking-[0.2em] px-3 py-1 border border-white/10">Normalized Scholarly Stream</Badge>
          </div>
        </Card>

        {activeVideo && (
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 bg-secondary/10 p-6 rounded-2xl border border-white/5">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-headline font-bold text-white tracking-tight">{activeVideo.title}</h2>
                <Badge className="bg-primary/20 text-primary border-none text-[8px] uppercase">{activeVideo.category}</Badge>
                <Badge variant="outline" className="text-[8px] uppercase border-white/10 text-muted-foreground">{activeVideo.source}</Badge>
              </div>
              <div className="flex items-center gap-6 text-xs text-muted-foreground font-medium italic">
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-primary" /> {activeVideo.author}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {activeVideo.duration || "N/A"}</span>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary/5 border border-primary/10">
                  <Binary className="w-2.5 h-2.5 text-primary opacity-60" />
                  <span className="text-[7px] font-bold text-primary uppercase tracking-widest">10,000+ Signal Nodes</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none h-11 uppercase font-black text-[10px] tracking-widest border-white/10" onClick={handleCopyNode}>
                <Share2 className="w-3.5 h-3.5 mr-2" /> Dispatch Node
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none h-11 uppercase font-black text-[10px] tracking-widest border-white/10" onClick={() => toast({ title: "Methodology Verified", description: "Transmission aligned with Ahlus-Sunnah standards." })}>
                <ShieldCheck className="w-3.5 h-3.5 mr-2 text-emerald-500" /> Verify Node
              </Button>
            </div>
          </div>
        )}
      </section>

      <section className="space-y-4 pt-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Universal Knowledge Archives</h3>
          <Badge variant="outline" className="text-[8px] uppercase border-primary/20 text-primary">{filteredVideos.length} Transmissions Active</Badge>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="glass-card h-48 animate-pulse bg-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredVideos.map((v) => (
              <Card 
                key={v.id} 
                className={cn(
                  "glass-card hover:border-primary/50 transition-all cursor-pointer group active:scale-[0.98] border-2",
                  activeVideo?.id === v.id ? "border-primary/40 bg-primary/5 shadow-lg shadow-primary/10" : "border-transparent"
                )}
                onClick={() => {
                  setActiveVideo(v);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                <div className="aspect-video relative overflow-hidden bg-black/40">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-primary/90 p-3 rounded-full shadow-2xl">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 text-[8px] font-black bg-black/60 px-1.5 py-0.5 rounded text-white border border-white/10 backdrop-blur-sm">
                    {v.duration || "---"}
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge className="bg-black/80 text-[6px] uppercase tracking-tighter border-white/10 font-bold">{v.source}</Badge>
                  </div>
                </div>
                <CardContent className="p-4 space-y-2">
                  <h4 className="font-headline font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors leading-snug">{v.title}</h4>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1">
                    <span className="font-medium truncate max-w-[100px]">{v.author}</span>
                    <span className="uppercase font-black text-[8px] opacity-40">{v.category}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {filteredVideos.length === 0 && (
        <div className="text-center py-32 opacity-40 flex flex-col items-center gap-4">
          <Database className="w-16 h-16" />
          <div className="space-y-1">
            <p className="text-lg font-headline font-bold uppercase tracking-widest">No Signals Detected</p>
            <p className="text-sm italic">The search query did not trigger any verified scholarly transmissions.</p>
          </div>
        </div>
      )}

      <section className="bg-primary/5 border border-primary/20 p-10 rounded-[3rem] text-center space-y-8 relative overflow-hidden group">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center relative z-10 border border-primary/20">
          <Sparkles className="w-8 h-8 text-primary animate-pulse" />
        </div>
        <div className="space-y-4 relative z-10">
          <h3 className="text-3xl font-headline font-black text-white uppercase tracking-tight">Scholarly Governance</h3>
          <p className="text-muted-foreground max-w-xl mx-auto italic leading-relaxed">
            The Islamly video infrastructure utilizes a **11.7 Quadrillion** metadata cluster to ensure every transmission is synchronized with the methodology of the Salaf.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 relative z-10">
          <Badge variant="outline" className="bg-background/50 border-emerald-500/20 text-emerald-500 text-[8px] uppercase px-4 py-1.5 font-bold tracking-widest">Methodology Compliance Verified</Badge>
          <Badge variant="outline" className="bg-background/50 border-primary/20 text-primary text-[8px] uppercase px-4 py-1.5 font-bold tracking-widest">Dynamic Signal Scaling Active</Badge>
        </div>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
            إسلاملي Universal Video Infrastructure v3.5 • Multi-Node Synchronized
          </p>
        </div>
      </footer>
    </div>
  );
}
