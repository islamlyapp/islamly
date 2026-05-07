
"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { fetchSurahList, fetchSurahVerses } from "@/services/islamic-data-service";
import { Loader2 } from "lucide-react";

export default function QuranPage() {
  const params = useParams();
  const [slugParts, setSlugParts] = useState<string[]>([]);
  const [verses, setVerses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [surahName, setSurahName] = useState("");
  const verseRefs = useRef<{ [key: string]: HTMLDivElement }>({});

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
          const surah = surahs.find(s => s.name_simple.toLowerCase() === surahName);

          if (surah) {
            const verseData = await fetchSurahVerses(surah.id);
            setVerses(verseData);

            if (ayahNumber && verseRefs.current[ayahNumber]) {
              verseRefs.current[ayahNumber].scrollIntoView({ behavior: 'smooth' });
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
        verseRefs.current[ayahNumber].scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [verses, slugParts]);


  return (
    <div className="p-8">
      {loading ? (
        <div className="h-[40vh] flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Loading Surah...</p>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl font-headline font-bold mb-4 capitalize">{surahName.replace(/-/g, " ")}</h1>
          <div className="space-y-4">
            {verses.map(verse => (
              <div 
                key={verse.id} 
                ref={el => verseRefs.current[verse.verse_key.split(':')[1]] = el!}
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
