
"use client";

import { useState, useEffect, use } from "react";
import { fetchSurahVerses, fetchVerseTranslations, fetchSurahAudio, fetchReciters } from "@/services/islamic-data-service";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  Loader2, 
  BookOpen, 
  Settings2, 
  Info, 
  Languages, 
  Bookmark, 
  MessageSquare, 
  Play, 
  Pause, 
  Volume2,
  User,
  Share2,
  Copy,
  Hash,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { QIRAAT_DATA, type Qiraah } from "@/lib/qiraat-data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useUser, useFirestore, useDoc, useMemoFirebase, setDocumentNonBlocking } from "@/firebase";
import { doc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export default function SurahReadingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useUser();
  const db = useFirestore();

  const [hasMounted, setHasMounted] = useState(false);
  const [verses, setVerses] = useState<any[]>([]);
  const [translations, setTranslations] = useState<any[]>([]);
  const [reciters, setReciters] = useState<any[]>([]);
  const [selectedReciter, setSelectedReciter] = useState<any>({ id: 7, reciter_name: "Mishary Rashid Alafasy" });
  const [loading, setLoading] = useState(true);
  const [selectedQiraah, setSelectedQiraah] = useState<Qiraah>(QIRAAT_DATA[0]);
  const [noteContent, setNoteContent] = useState("");
  
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const profileRef = useMemoFirebase(() => {
    if (!db || !user?.uid) return null;
    return doc(db, "users", user.uid);
  }, [db, user?.uid]);

  const { data: profile } = useDoc(profileRef);

  const currentLangId = profile?.preferredLanguageId || 131;
  const currentLangName = profile?.preferredLanguage || "English";

  useEffect(() => {
    async function loadContent() {
      if (!id) return;
      setLoading(true);
      try {
        const [verseData, transData, audioData, reciterData] = await Promise.all([
          fetchSurahVerses(parseInt(id)),
          fetchVerseTranslations(parseInt(id), currentLangId),
          fetchSurahAudio(parseInt(id), selectedReciter.id),
          fetchReciters()
        ]);
        setVerses(verseData || []);
        setTranslations(transData || []);
        setAudioUrl(audioData?.audio_url || null);
        setReciters(reciterData);
      } catch (err) {
        console.error("Failed to load Surah content:", err);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [id, currentLangId, selectedReciter.id]);

  useEffect(() => {
    if (audioUrl && hasMounted) {
      if (audioElement) {
        audioElement.pause();
      }
      const audio = new Audio(audioUrl);
      setAudioElement(audio);
      setIsPlaying(false);
      setAudioProgress(0);

      const updateProgress = () => {
        if (audio.duration) {
          setAudioProgress((audio.currentTime / audio.duration) * 100);
        }
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setAudioProgress(0);
      };

      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.pause();
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [audioUrl, hasMounted]);

  const toggleAudio = () => {
    if (!audioElement) return;
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleBookmark = (verseKey: string) => {
    if (!db || !user?.uid) {
      toast({ title: "Auth Required", description: "Please sign in to bookmark verses.", variant: "destructive" });
      return;
    }
    const bookmarkRef = doc(collection(db, "users", user.uid, "bookmarks"));
    setDocumentNonBlocking(bookmarkRef, {
      userId: user.uid,
      targetType: "Passage",
      targetId: verseKey,
      createdAt: serverTimestamp(),
      id: bookmarkRef.id
    }, { merge: true });
    toast({ title: "Bookmark Node Active", description: `Verse ${verseKey} synchronized to profile.` });
  };

  const handleAddNote = (verseKey: string) => {
    if (!db || !user?.uid || !noteContent.trim()) return;
    const noteRef = doc(collection(db, "users", user.uid, "notes"));
    setDocumentNonBlocking(noteRef, {
      userId: user.uid,
      passageId: verseKey,
      content: noteContent,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      id: noteRef.id
    }, { merge: true });
    setNoteContent("");
    toast({ title: "Note Node Saved", description: "Scholarly insight added to your archive." });
  };

  const copyVerse = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Node Dispatched", description: "Arabic text copied to clipboard." });
  };

  if (!hasMounted) return null;

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-32">
      <header className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon">
            <Link href="/quran"><ChevronLeft className="w-6 h-6" /></Link>
          </Button>
          <div>
            <h1 className="text-xl font-headline font-bold">Surah {id}</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Interactive Reading Node</p>
          </div>
        </div>

        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="glass-card gap-2 h-9">
                <User className="w-4 h-4 text-emerald-400" />
                <span className="text-xs hidden md:inline">Reciter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 glass-card">
              <DropdownMenuLabel className="text-[10px] uppercase font-bold text-primary">Scholarly Audio Nodes</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                {reciters.map((r) => (
                  <DropdownMenuItem key={r.id} onClick={() => setSelectedReciter(r)} className={cn(selectedReciter.id === r.id && "bg-primary/10")}>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{r.reciter_name}</span>
                      <span className="text-[10px] text-muted-foreground">{r.style || "Haf's Narration"}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="glass-card gap-2 h-9">
                <Settings2 className="w-4 h-4 text-primary" />
                <span className="text-xs hidden md:inline">Qira'at</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 glass-card">
              <DropdownMenuLabel className="text-[10px] uppercase font-bold text-primary">Canonical Variant Readings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {QIRAAT_DATA.map((q) => (
                <DropdownMenuItem key={q.id} onClick={() => setSelectedQiraah(q)} className={cn(selectedQiraah.id === q.id && "bg-primary/10")}>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{q.name}</span>
                    <span className="text-[10px] text-muted-foreground">{q.region}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {audioUrl && (
        <Card className="sticky top-20 z-40 glass-card border-primary/20 bg-background/80 backdrop-blur-xl p-3 shadow-xl">
          <div className="flex items-center gap-4">
            <Button size="icon" className="rounded-full bg-primary h-10 w-10 shrink-0" onClick={toggleAudio}>
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
            </Button>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-widest">
                <span className="text-primary">{selectedReciter.reciter_name}</span>
                <span className="text-muted-foreground">Streaming Surah {id}</span>
              </div>
              <Progress value={audioProgress} className="h-1 bg-primary/20" />
            </div>
          </div>
        </Card>
      )}

      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <main className="space-y-12">
          {verses.map((verse, index) => (
            <section key={verse.id} className="group space-y-6 relative">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-[10px] bg-secondary/50 font-mono">
                    {verse.verse_key}
                  </Badge>
                  <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleBookmark(verse.verse_key)}>
                      <Bookmark className="w-3 h-3 text-primary" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyVerse(verse.text_uthmani)}>
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <MessageSquare className="w-3 h-3" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 glass-card">
                        <div className="space-y-3">
                          <h4 className="font-headline font-bold text-xs uppercase text-primary">Scholarly Notes</h4>
                          <Textarea 
                            placeholder="Add your study insight..." 
                            className="text-xs h-20 bg-secondary/20"
                            value={noteContent}
                            onChange={(e) => setNoteContent(e.target.value)}
                          />
                          <Button size="sm" className="w-full text-[10px] uppercase font-bold" onClick={() => handleAddNote(verse.verse_key)}>
                            Save Node
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="flex gap-2">
                  {verse.verse_number % 7 === 0 && (
                    <Badge variant="outline" className="text-[9px] border-accent/30 text-accent gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Variant
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-[9px] border-primary/20 text-primary uppercase">
                    {currentLangName}
                  </Badge>
                </div>
              </div>
              
              <div 
                className="text-4xl font-serif text-literata leading-[2.8] text-right cursor-pointer hover:text-primary transition-colors"
                dir="rtl"
                onClick={() => copyVerse(verse.text_uthmani)}
              >
                {verse.text_uthmani}
              </div>

              {translations[index] && (
                <div className="bg-secondary/10 p-4 rounded-xl border border-white/5 hover:bg-secondary/20 transition-all cursor-text">
                  <p className="text-sm leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: translations[index].text }} />
                </div>
              )}
              
              <div className="h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
            </section>
          ))}
        </main>
      )}

      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50">
        <Button asChild className="rounded-full shadow-2xl gap-2 font-headline h-12 px-8 bg-primary hover:bg-primary/90 text-white border-4 border-background">
          <Link href="/quran">
            <BookOpen className="w-4 h-4" />
            Finish Reading
          </Link>
        </Button>
      </div>
    </div>
  );
}
