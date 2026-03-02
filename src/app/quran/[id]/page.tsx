"use client";

import { useState, useEffect, use } from "react";
import { fetchSurahVerses } from "@/services/islamic-data-service";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Loader2, BookOpen } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function SurahReadingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [verses, setVerses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVerses() {
      try {
        const data = await fetchSurahVerses(parseInt(id));
        setVerses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadVerses();
  }, [id]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-24">
      <header className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/quran"><ChevronLeft className="w-6 h-6" /></Link>
        </Button>
        <h1 className="text-2xl font-headline font-bold">Surah {id}</h1>
      </header>

      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-6">
          {verses.map((verse) => (
            <Card key={verse.id} className="glass-card border-none shadow-none">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-xs font-bold text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                    {verse.verse_key}
                  </span>
                  <p className="text-3xl font-serif text-literata leading-[2.5] text-right flex-1" dir="rtl">
                    {verse.text_uthmani}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50">
        <Button className="rounded-full shadow-2xl gap-2 font-headline h-12 px-6">
          <BookOpen className="w-4 h-4" />
          Continue Reading
        </Button>
      </div>
    </div>
  );
}
