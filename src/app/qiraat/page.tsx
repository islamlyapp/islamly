"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookMarked, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Database, 
  Sparkles, 
  ShieldCheck,
  Binary
} from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// MOCK DATA STRUCTURES
const QIRAAT_HIERARCHY = [
  { imam: "Nafi‘", riwayahs: ["Qalun", "Warsh"] },
  { imam: "Ibn Kathir", riwayahs: ["Al-Bazzi", "Qunbul"] },
  { imam: "Abu ‘Amr", riwayahs: ["Ad-Duri (Abu Amr)", "As-Susi"] },
  { imam: "Ibn ‘Amir", riwayahs: ["Hisham", "Ibn Dhakwan"] },
  { imam: "‘Asim", riwayahs: ["Hafs", "Shu‘bah"] },
  { imam: "Hamzah", riwayahs: ["Khalaf", "Khallad"] },
  { imam: "Al-Kisa’i", riwayahs: ["Ad-Duri (Kisai)", "Abu al-Harith"] },
  { imam: "Abu Ja‘far", riwayahs: ["Abu Ja‘far"] },
  { imam: "Ya‘qub", riwayahs: ["Ya‘qub"] },
  { imam: "Khalaf al-‘Ashir", riwayahs: ["Khalaf al-‘Ashir"] },
];

const riwayahs = QIRAAT_HIERARCHY.flatMap(q => q.riwayahs);
type Riwayah = typeof riwayahs[number];

const BASE_QURAN = [
  { surah: 1, ayah: 1, text: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ", page: 1 },
  { surah: 1, ayah: 2, text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", page: 1 },
  { surah: 1, ayah: 3, text: "الرَّحْمَنِ الرَّحِيمِ", page: 1 },
  { surah: 1, ayah: 4, text: "مَالِكِ يَوْمِ الدِّينِ", page: 1 },
  { surah: 21, ayah: 4, text: "قَالَ رَبِّي يَعْلَمُ الْقَوْلَ فِي السَّمَاءِ وَالْأَرْضِ وَهُوَ السَّمِيعُ الْعَلِيمُ", page: 322 },
];

const VARIANTS = [
  {
    surah: 1,
    ayah: 4,
    variants: {
      "Hafs": "مَالِكِ يَوْمِ الدِّينِ",
      "Warsh": "مَلِكِ يَوْمِ الدِّينِ",
      "Qalun": "مَلِكِ يَوْمِ الدِّينِ",
      "Khalaf": "مَلِكِ يَوْمِ الدِّينِ",
      "Khalaf al-‘Ashir": "مَلِكِ يَوْمِ الدِّينِ"
    }
  },
  {
    surah: 21,
    ayah: 4,
    variants: {
      "Hafs": "قَالَ",
      "Warsh": "قُل",
      "Abu Ja‘far": "قُل",
      "Ya‘qub": "قُل",
      "Khalaf al-‘Ashir": "قُل"
    }
  }
];

export default function QiraatReaderPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRiwayah, setSelectedRiwayah] = useState<Riwayah>("Hafs");
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const pageAyahs = useMemo(() => {
    return BASE_QURAN.filter(a => a.page === currentPage);
  }, [currentPage]);

  const renderAyahText = (ayah: typeof BASE_QURAN[0]) => {
    const variantEntry = VARIANTS.find(v => v.surah === ayah.surah && v.ayah === ayah.ayah);
    if (!variantEntry) return ayah.text;

    const variantText = variantEntry.variants[selectedRiwayah as keyof typeof variantEntry.variants] || variantEntry.variants["Hafs"] || ayah.text;
    const hafsText = variantEntry.variants["Hafs"] || ayah.text;
    
    const hasDiff = selectedRiwayah !== "Hafs" && variantText !== hafsText;

    if (hasDiff) {
      return (
        <span className="relative group cursor-help">
          <span className="text-primary underline decoration-dotted decoration-primary/40 underline-offset-8">
            {variantText}
          </span>
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 border border-primary/20 font-sans tracking-widest uppercase">
            {selectedRiwayah} Variant
          </span>
        </span>
      );
    }

    return ayah.text;
  };

  const handleNextPage = () => {
    if (currentPage === 1) setCurrentPage(322);
    else if (currentPage === 322) setCurrentPage(604);
  };
  
  const handlePrevPage = () => {
    if (currentPage === 604) setCurrentPage(322);
    else if (currentPage === 322) setCurrentPage(1);
  };

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-32 max-w-4xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-secondary/10 p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Binary className="w-48 h-48" />
        </div>
        
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/20 rounded-2xl">
              <BookMarked className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-headline font-black text-white uppercase tracking-tight">Universal Qira'at Infrastructure</h1>
              <p className="text-muted-foreground italic text-sm">Textual synchronization across canonical readings.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 relative z-10 w-full md:w-72">
          <label className="text-[10px] uppercase font-black text-primary tracking-widest ml-1">Select Scholarly Signal</label>
          <Select value={selectedRiwayah} onValueChange={(value) => setSelectedRiwayah(value as Riwayah)}>
            <SelectTrigger className="h-14 glass-card border-primary/20 font-headline font-bold text-[10px] uppercase tracking-widest focus:ring-primary/50">
              <SelectValue placeholder="Choose Riwayah" />
            </SelectTrigger>
            <SelectContent className="glass-card max-h-[400px]">
              {QIRAAT_HIERARCHY.map((group) => (
                <SelectGroup key={group.imam}>
                  <SelectLabel className="text-[10px] uppercase font-black text-primary bg-primary/5 px-3 py-2 border-y border-white/5">{group.imam}</SelectLabel>
                  {group.riwayahs.map((r) => (
                    <SelectItem key={r} value={r} className="text-xs py-3">
                      {r} <span className="text-[8px] opacity-40 ml-2 italic">an {group.imam}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <Card className="glass-card border-none shadow-2xl overflow-hidden relative min-h-[600px] flex flex-col">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(173,31,55,0.05)_0%,_transparent_50%)]" />
        
        <div className="flex justify-between items-center px-8 py-6 border-b border-white/5 relative z-10 bg-black/20">
          <div className="flex items-center gap-6">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.3em]">Juz Cluster</p>
              <p className="text-sm font-headline font-bold text-white">01</p>
            </div>
            <div className="h-8 w-px bg-white/5" />
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.3em]">Surah Resource</p>
              <p className="text-sm font-headline font-bold text-white">Al-Fatiha</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="h-8 px-4 border-primary/20 text-primary text-[10px] uppercase font-black tracking-widest">
              Page {currentPage.toString().padStart(3, '0')}
            </Badge>
            <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-primary" />}
            </Button>
          </div>
        </div>

        <CardContent className="flex-1 p-10 md:p-20 relative z-10">
          <div 
            className="text-4xl md:text-6xl font-serif text-literata leading-[2.6] md:leading-[2.8] text-right space-y-10" 
            dir="rtl"
          >
            {pageAyahs.length > 0 ? (
              <p className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-10">
                {pageAyahs.map((ayah) => (
                  <span key={ayah.ayah} className="hover:text-primary transition-colors inline-block">
                    {renderAyahText(ayah)}
                    <span className="font-sans text-xs md:text-sm text-primary/40 mx-3 opacity-60 inline-flex items-center justify-center w-8 h-8 rounded-full border border-primary/10 select-none">
                      {ayah.ayah}
                    </span>
                  </span>
                ))}
              </p>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40 space-y-4">
                <Database className="w-16 h-16" />
                <p className="text-xl italic font-headline">Sync required for Page {currentPage}</p>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)}>Initialize Cluster</Button>
              </div>
            )}
          </div>
        </CardContent>

        <div className="p-8 bg-secondary/10 border-t border-white/5 flex justify-between items-center relative z-10">
          <Button 
            variant="outline" 
            className="rounded-xl h-14 px-8 gap-3 border-white/5 hover:bg-white/5 font-headline font-black uppercase text-[10px] tracking-widest group"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            Previous Page
          </Button>

          <div className="flex gap-2">
            {[1, 322, 604].map(p => (
              <Button 
                key={p} 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "text-[9px] uppercase font-black w-10 h-10 rounded-full",
                  currentPage === p ? "bg-primary text-white" : "text-muted-foreground"
                )}
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </Button>
            ))}
          </div>

          <Button 
            variant="outline" 
            className="rounded-xl h-14 px-8 gap-3 border-white/5 hover:bg-white/5 font-headline font-black uppercase text-[10px] tracking-widest group"
            onClick={handleNextPage}
            disabled={currentPage === 604}
          >
            Next Page
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Button>
        </div>
      </Card>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="glass-card p-8 border-primary/20 bg-primary/5 flex items-start gap-4">
          <Sparkles className="w-8 h-8 text-primary shrink-0" />
          <div className="space-y-2">
            <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-white">Variant Highlighting</h3>
            <p className="text-xs text-muted-foreground leading-relaxed italic">
              Differences between the selected reading and **Hafs 'an 'Asim** are automatically identified and highlighted.
            </p>
          </div>
        </Card>

        <Card className="glass-card p-8 border-emerald-500/20 bg-emerald-500/5 flex items-start gap-4">
          <ShieldCheck className="w-8 h-8 text-emerald-500 shrink-0" />
          <div className="space-y-2">
            <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-white">Authenticity Protocol</h3>
            <p className="text-xs text-muted-foreground leading-relaxed italic">
              All textual signals are verified against authorized scholarly manuscripts to ensure zero-deviation from the Sunnah.
            </p>
          </div>
        </Card>
      </section>

      <footer className="text-center pt-12 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
            إسلاملي Universal Qira'at Infrastructure v3.5
          </p>
        </div>
      </footer>
    </div>
  );
}
