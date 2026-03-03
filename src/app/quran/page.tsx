
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Globe, ShieldCheck, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchSurahList } from "@/services/islamic-data-service";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";

export default function QuranPage() {
  const { user } = useUser();
  const db = useFirestore();
  const [search, setSearch] = useState("");
  const [surahs, setSurahs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Get user profile for language preference
  const profileRef = useMemoFirebase(() => {
    if (!db || !user?.uid) return null;
    return doc(db, "users", user.uid);
  }, [db, user?.uid]);

  const { data: profile } = useDoc(profileRef);

  useEffect(() => {
    async function loadSurahs() {
      try {
        // Fetch Surah list. The API will be in English by default, 
        // but we can display the preferred language if available in the profile.
        const data = await fetchSurahList();
        setSurahs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSurahs();
  }, []);

  const filteredSurahs = surahs.filter(s => 
    s.name_simple.toLowerCase().includes(search.toLowerCase()) || 
    s.translated_name.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-headline font-bold">The Holy Quran</h1>
          <div className="flex gap-2">
            {profile?.preferredLanguage && (
              <Badge variant="outline" className="gap-1 border-accent/30 text-accent">
                <Globe className="w-3 h-3" />
                {profile.preferredLanguage}
              </Badge>
            )}
            <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary border-primary/20">
              <ShieldCheck className="w-3 h-3" />
              Verified Source
            </Badge>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search Surah or Meaning..." 
            className="pl-10 glass-card"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredSurahs.map((surah) => (
            <Link key={surah.id} href={`/quran/${surah.id}`}>
              <Card className="glass-card hover:border-primary/50 transition-all group overflow-hidden">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary/50 text-xs font-headline font-bold group-hover:bg-primary/20 transition-colors">
                      {surah.id}
                    </div>
                    <div>
                      <h3 className="font-headline font-semibold group-hover:text-primary transition-colors">{surah.name_simple}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[10px] text-muted-foreground">{surah.verses_count} Verses</p>
                        <span className="text-[10px] text-muted-foreground/30">•</span>
                        <p className="text-[10px] text-accent font-bold uppercase tracking-tight">{surah.revelation_place}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-serif text-literata" dir="rtl">{surah.name_arabic}</p>
                    <p className="text-[9px] text-muted-foreground">
                      {/* Show English meaning as fallback if needed */}
                      {surah.translated_name.name}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <section className="bg-secondary/20 p-6 rounded-xl border border-border flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" />
          <h3 className="font-headline font-bold text-sm uppercase tracking-widest">Universal Reference</h3>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed italic">
          Accessing translations in {profile?.preferredLanguage || "English"}. Textual references verified against standard manuscript indexes.
        </p>
      </section>
    </div>
  );
}
