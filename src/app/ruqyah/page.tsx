"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Heart, BookOpen, Info, Zap, AlertTriangle, PlayCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ruqyahData = {
  protection: [
    {
      title: "Ayat al-Kursi",
      reference: "Surah Al-Baqarah 2:255",
      arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...",
      benefit: "Protection from Shaytan until morning/evening."
    },
    {
      title: "Al-Mu'awwidhatayn",
      reference: "Surah Al-Falaq & An-Nas",
      arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ... قُلْ أَعُوذُ بِرَبِّ النَّاسِ...",
      benefit: "Protection from the evil eye, magic, and whispers."
    }
  ],
  healing: [
    {
      title: "Surah Al-Fatiha",
      reference: "The Opening",
      arabic: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ...",
      benefit: "The 'Shifa' (Cure) for physical and spiritual ailments."
    },
    {
      title: "Prophetic Dua",
      reference: "Sahih Bukhari",
      arabic: "أَذْهِبِ الْبَاسَ رَبَّ النَّاسِ اشْفِ وَأَنْتَ الشَّافِي...",
      benefit: "Dua for pain and illness used by the Prophet (PBUH)."
    }
  ]
};

export default function RuqyahPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-accent">
          <ShieldCheck className="w-8 h-8" />
          <h1 className="text-3xl font-headline font-bold">Ruqyah Guide</h1>
        </div>
        <p className="text-muted-foreground italic">Authentic spiritual healing and protection based on the Quran and Sunnah.</p>
      </header>

      <section className="bg-accent/10 border border-accent/20 p-4 rounded-xl flex items-start gap-3">
        <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-tight text-accent">Scholarly Standard</p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Ruqyah is permissible only if it uses the Words of Allah, His Names/Attributes, or authentic Duas, and is performed in Arabic or an understood language.
          </p>
        </div>
      </section>

      <Tabs defaultValue="protection" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-secondary/50 p-1 h-12">
          <TabsTrigger value="protection" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Protection</TabsTrigger>
          <TabsTrigger value="healing" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Healing</TabsTrigger>
        </TabsList>

        <TabsContent value="protection" className="mt-6 space-y-4">
          {ruqyahData.protection.map((item, i) => (
            <RuqyahCard key={i} item={item} />
          ))}
        </TabsContent>

        <TabsContent value="healing" className="mt-6 space-y-4">
          {ruqyahData.healing.map((item, i) => (
            <RuqyahCard key={i} item={item} />
          ))}
        </TabsContent>
      </Tabs>

      <section className="space-y-4">
        <h3 className="text-lg font-headline font-bold flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          Prohibited Practices
        </h3>
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-4 space-y-2">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Avoid any "healer" who asks for your mother's name, uses talismans (Ta'wiz), knots, or performs rituals not found in the Sunnah. These are often acts of major Shirk.
            </p>
          </CardContent>
        </Card>
      </section>

      <footer className="pt-8 flex flex-col items-center gap-4">
        <Button className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
          <PlayCircle className="w-4 h-4" /> Listen to Ruqyah Recitation
        </Button>
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em]">Verified Scholarly Resource</p>
      </footer>
    </div>
  );
}

function RuqyahCard({ item }: { item: any }) {
  return (
    <Card className="glass-card hover:border-accent/50 transition-all group">
      <CardHeader className="p-5 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-headline font-bold text-lg group-hover:text-accent transition-colors">{item.title}</h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.reference}</p>
          </div>
          <Badge variant="outline" className="text-[9px] border-accent/20 text-accent uppercase">Authentic</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-2 space-y-4">
        <p className="text-2xl font-serif text-literata leading-loose text-right" dir="rtl">
          {item.arabic}
        </p>
        <div className="p-3 bg-secondary/30 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-3 h-3 text-accent" />
            <span className="text-[10px] font-bold uppercase text-accent tracking-tighter">Scholarly Benefit</span>
          </div>
          <p className="text-xs text-muted-foreground italic">{item.benefit}</p>
        </div>
      </CardContent>
    </Card>
  );
}
