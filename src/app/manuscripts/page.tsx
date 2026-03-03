"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollText, Search, History, BookOpen, ExternalLink, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const manuscripts = [
  { id: 1, title: "Topkapi Mushaf", era: "Early Umayyad", region: "Istanbul", desc: "A massive early Quranic manuscript attributed to the 3rd Caliph Uthman.", image: "https://picsum.photos/seed/manuscript1/600/400" },
  { id: 2, title: "Sana'a Palimpsest", era: "Pre-650 CE", region: "Yemen", desc: "Unique parchment containing both lower and upper texts of early Quranic writing.", image: "https://picsum.photos/seed/manuscript2/600/400" },
  { id: 3, title: "Birmingham Fragment", era: "Prophetic Era", region: "UK", desc: "Carbon-dated fragments potentially from the time of the Prophet (PBUH) or shortly after.", image: "https://picsum.photos/seed/manuscript3/600/400" },
];

export default function ManuscriptsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-2">
        <div className="flex items-center gap-3 text-yellow-500">
          <ScrollText className="w-8 h-8" />
          <h1 className="text-3xl font-headline font-bold">Manuscript Archives</h1>
        </div>
        <p className="text-muted-foreground italic">Exploring the earliest physical evidence of Islamic heritage.</p>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input placeholder="Search archives by era or museum..." className="pl-10 glass-card h-12" />
      </div>

      <div className="grid gap-6">
        {manuscripts.map((m) => (
          <Card key={m.id} className="glass-card overflow-hidden group border-yellow-500/20">
            <div className="relative h-48 w-full overflow-hidden">
              <Image 
                src={m.image} 
                alt={m.title} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                data-ai-hint="old parchment"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 uppercase text-[9px]">
                  {m.era}
                </Badge>
                <Badge variant="outline" className="text-[9px] uppercase border-white/10">{m.region}</Badge>
              </div>
            </div>
            <CardContent className="p-6 space-y-3">
              <h3 className="text-xl font-headline font-bold group-hover:text-yellow-500 transition-colors">{m.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              <div className="pt-4 flex items-center justify-between border-t border-white/5">
                <span className="flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
                  <ShieldCheck className="w-3 h-3" /> Verified Edition
                </span>
                <button className="text-yellow-500 text-xs flex items-center gap-1 font-bold hover:underline">
                  View Digitized Version <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-yellow-500/5 p-6 rounded-2xl border border-yellow-500/20">
        <div className="flex items-center gap-2 mb-3">
          <History className="w-4 h-4 text-yellow-500" />
          <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-yellow-500">Scholarly Preservation</h3>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed italic">
          Islamly uses spectral imaging data to assist in the study of Rasm (orthography) variants. These archives are maintained in coordination with major international manuscript centers.
        </p>
      </section>
    </div>
  );
}
