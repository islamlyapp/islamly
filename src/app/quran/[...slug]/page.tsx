
"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { fetchReciters, fetchSurahAudio, fetchSurahList, fetchSurahVerses } from "@/services/islamic-data-service";
import { getDefaultReciterId, getReciterLabel } from "@/lib/quran-audio";
import { Loader2, Pause, Play, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Surah {
  id: number;
  name_simple: string;
}

interface Reciter {
  id: number;
  name?: string;
  translated_name?: {
    name?: string;
  };
}

export default function QuranPage() {
  const params = useParams();
  const [slugParts, setSlugParts] = useState<string[]>([]);
  const [verses, setVerses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [surahName, setSurahName] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioLoading, setAudioLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [selectedReciterId, setSelectedReciterId] = useState<number>(7);
  const [surahId, setSurahId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const verseRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (params.slug) {
      const parts = Array.isArray(params.slug) ? params.slug : [params.slug];
      setSlugParts(parts);

      async function loadVerses() {
        try {
          const surahName = parts[1];
          const ayahNumber = parts[2];
          setSurahName(surahName);
          const surahs = await fetchSurahList();
          const surah = surahs.find((s: Surah) => s.name_simple.toLowerCase() === surahName);

          if (surah) {
            const verseData = await fetchSurahVerses(surah.id);
            setVerses(verseData);
            setSurahId(surah.id);

            const loadedReciters = await fetchReciters();
            setReciters(loadedReciters);
            setSelectedReciterId(getDefaultReciterId(loadedReciters, 7));

            if (ayahNumber && verseRefs.current[ayahNumber]) {
              verseRefs.current[ayahNumber]?.scrollIntoView({ behavior: 'smooth' });
            }
          }
        } catch (error) {
          console.error("Error fetching verses:", error);
        } finally {
          setLoading(false);
        }
      }

      loadVerses();
    }
  }, [params.slug]);

  useEffect(() => {
    if (verses.length > 0 && slugParts.length > 2) {
      const ayahNumber = slugParts[2];
      if (verseRefs.current[ayahNumber]) {
        verseRefs.current[ayahNumber]?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [verses, slugParts]);

  useEffect(() => {
    if (!surahId) return;

    const loadAudio = async () => {
      setAudioLoading(true);
      const url = await fetchSurahAudio(surahId, selectedReciterId);
      setAudioUrl(url);
      setAudioLoading(false);
    };

    loadAudio();
  }, [selectedReciterId, surahId]);

  useEffect(() => {
    if (!audioUrl) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlaying(false);
      return;
    }

    if (audioRef.current && audioRef.current.src !== audioUrl) {
      audioRef.current.pause();
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlaying(false);
    }
  }, [audioUrl]);

  const toggleAudio = async () => {
    if (!audioRef.current && audioUrl) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
    }
  };

  return (
    <div className="p-8">
      {loading ? (
        <div className="h-[40vh] flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Loading Surah...</p>
        </div>
      ) : (
        <div>
          <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-headline font-bold capitalize">{surahName.replace(/-/g, " ")}</h1>
              <p className="mt-1 text-sm text-muted-foreground">Recitation audio from Quran.com with a selectable reciter.</p>
            </div>
            <div className="flex flex-col gap-3 md:min-w-[280px]">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={toggleAudio} disabled={audioLoading || !audioUrl} className="gap-2 rounded-full">
                  {audioLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {audioLoading ? "Loading audio" : isPlaying ? "Pause audio" : "Play audio"}
                </Button>
                {audioUrl ? <Volume2 className="h-4 w-4 text-primary" /> : null}
              </div>
              <select
                className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none"
                value={selectedReciterId}
                onChange={(event) => setSelectedReciterId(Number(event.target.value))}
              >
                {reciters.map((reciter) => (
                  <option key={reciter.id} value={reciter.id}>
                    {getReciterLabel(reciter)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-4">
            {verses.map(verse => (
              <div 
                key={verse.id} 
                ref={(el: HTMLDivElement | null) => {
                  if (el) {
                    verseRefs.current[verse.verse_key.split(':')[1]] = el;
                  }
                }}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors"
              >
                <span className="text-sm font-bold text-primary">{verse.verse_key}</span>
                <p className="text-lg text-literata">{verse.text_uthmani}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
