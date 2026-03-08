"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Volume2, 
  Play, 
  Pause, 
  Search, 
  Loader2, 
  Globe, 
  Music, 
  ChevronRight, 
  ListMusic, 
  Heart,
  Database
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchReciters, fetchSurahList, fetchSurahAudio } from "@/services/islamic-data-service";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function AudioPage() {
  const [reciters, setReciters] = useState<any[]>([]);
  const [surahs, setSurahs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  
  // Playback State
  const [currentReciter, setCurrentReciter] = useState<any>(null);
  const [currentSurah, setCurrentSurah] = useState<any>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    async function init() {
      try {
        const [r, s] = await Promise.all([fetchReciters(), fetchSurahList()]);
        setReciters(r || []);
        setSurahs(s || []);
        if (r && r.length > 0) {
          const defaultReciter = r.find((rec: any) => rec.id === 7) || r[0];
          setCurrentReciter(defaultReciter); 
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const playSurah = async (surah: any) => {
    if (!currentReciter) return;
    
    if (currentSurah?.id === surah.id && audioElement) {
      togglePlayback();
      return;
    }

    if (audioElement) {
      audioElement.pause();
    }

    setIsBuffering(true);
    setCurrentSurah(surah);
    
    try {
      const audioData = await fetchSurahAudio(surah.id, currentReciter.id);
      if (!audioData?.audio_url) throw new Error("No audio URL found");
      
      const audio = new Audio(audioData.audio_url);
      
      audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
          setProgress((audio.currentTime / audio.duration) * 100);
        }
      });
      
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setProgress(0);
      });

      audio.addEventListener('canplaythrough', () => {
        setIsBuffering(false);
        audio.play();
        setIsPlaying(true);
      });

      setAudioElement(audio);
    } catch (err) {
      console.error(err);
      setIsBuffering(false);
    }
  };

  const togglePlayback = () => {
    if (!audioElement) return;
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  const filteredReciters = (reciters || []).filter(r => 
    (r.reciter_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (r.style || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-40">
      <header className="space-y-2">
        <div className="flex items-center gap-3 text-emerald-400">
          <Volume2 className="w-8 h-8" />
          <h1 className="text-3xl font-headline font-bold">Audio Recitations</h1>
        </div>
        <p className="text-muted-foreground italic">High-fidelity Quranic audio from world-renowned Qaris.</p>
        <div className="flex pt-2">
          <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400 gap-1 border-emerald-500/20">
            <Globe className="w-3 h-3" /> Global Recitation Network
          </Badge>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Reciters List */}
        <section className="md:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search Qaris..." 
              className="pl-10 glass-card h-10 text-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ScrollArea className="h-[500px] rounded-2xl border border-white/5 bg-secondary/10 p-2">
            <div className="space-y-1">
              {loading ? (
                <div className="py-20 flex justify-center"><Loader2 className="w-6 h-6 animate-spin opacity-20" /></div>
              ) : (
                filteredReciters.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setCurrentReciter(r);
                      if (audioElement) {
                        audioElement.pause();
                        setAudioElement(null);
                        setIsPlaying(false);
                        setCurrentSurah(null);
                      }
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all",
                      currentReciter?.id === r.id ? "bg-emerald-500/20 border border-emerald-500/30" : "hover:bg-white/5"
                    )}
                  >
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <Music className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs font-bold truncate">{r.reciter_name}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">{r.style || "Standard Hafs"}</p>
                    </div>
                    {currentReciter?.id === r.id && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </section>

        {/* Surahs List */}
        <section className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-muted-foreground">Select Surah</h3>
            <Badge variant="outline" className="text-[10px] border-white/10 uppercase">114 Chapters</Badge>
          </div>
          <ScrollArea className="h-[500px] rounded-2xl border border-white/5 bg-secondary/10 p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {surahs.map((surah) => (
                <Card 
                  key={surah.id} 
                  className={cn(
                    "glass-card hover:border-emerald-500/30 transition-all cursor-pointer group",
                    currentSurah?.id === surah.id && "border-emerald-500/50 bg-emerald-500/5"
                  )}
                  onClick={() => playSurah(surah)}
                >
                  <CardContent className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary/50 flex items-center justify-center text-[10px] font-bold group-hover:bg-emerald-500/20 transition-colors">
                        {surah.id}
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold">{surah.name_simple}</p>
                        <p className="text-[10px] text-muted-foreground">{surah.verses_count} Verses</p>
                      </div>
                    </div>
                    {currentSurah?.id === surah.id && isPlaying && hasMounted ? (
                      <div className="flex gap-0.5 items-end h-3">
                        {[1, 2, 3].map(i => (
                          <div 
                            key={i} 
                            className="w-1 bg-emerald-400 animate-bounce" 
                            style={{ 
                              height: `${40 + (i * 15)}%`, 
                              animationDelay: `${i*0.1}s`,
                              animationDuration: '0.5s'
                            }} 
                          />
                        ))}
                      </div>
                    ) : (
                      <Play className="w-3 h-3 text-muted-foreground group-hover:text-emerald-400 transition-colors" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </section>
      </div>

      {/* Global Player Controller */}
      {currentSurah && (
        <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-8 md:w-[400px] z-50 animate-in slide-in-from-bottom-8 duration-500">
          <Card className="glass-card bg-background/80 backdrop-blur-2xl border-emerald-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <Progress value={progress} className="h-1 rounded-none bg-emerald-500/10" />
            <CardContent className="p-4 flex items-center gap-4">
              <Button 
                size="icon" 
                className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shrink-0 shadow-lg shadow-emerald-900/20"
                onClick={togglePlayback}
                disabled={isBuffering}
              >
                {isBuffering ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5 fill-white" />
                )}
              </Button>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] uppercase font-bold text-emerald-400 tracking-widest truncate">{currentReciter?.reciter_name}</p>
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full"><Heart className="w-3 h-3" /></Button>
                </div>
                <h4 className="text-sm font-headline font-bold">Surah {currentSurah.name_simple}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full">HQ Audio</span>
                  <span className="text-[10px] text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full uppercase">{currentReciter?.style || "Hafs"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}