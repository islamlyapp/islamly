"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Settings2, Bell, Info, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const prayers = [
  { name: "Fajr", time: "05:14", remaining: "" },
  { name: "Sunrise", time: "07:02", remaining: "" },
  { name: "Dhuhr", time: "12:12", remaining: "Next: 2h 15m" },
  { name: "Asr", time: "14:48", remaining: "" },
  { name: "Maghrib", time: "17:15", remaining: "" },
  { name: "Isha", time: "18:58", remaining: "" },
];

const methods = [
  "Umm al-Qura (Makkah)",
  "Islamic Relief Worldwide",
  "MWL (World Muslim League)",
  "ISNA (North America)",
  "Egyptian General Authority"
];

export default function PrayerTimesPage() {
  const [method, setMethod] = useState(methods[0]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold">Prayer Schedule</h1>
          <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
            <MapPin className="w-4 h-4" />
            <span>London, United Kingdom</span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-full hover:bg-secondary transition-colors">
              <Settings2 className="w-5 h-5 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="glass-card">
            <div className="p-2 px-3 text-[10px] uppercase font-bold text-muted-foreground border-b mb-1">Calculation Method</div>
            {methods.map((m) => (
              <DropdownMenuItem key={m} onClick={() => setMethod(m)} className="text-xs">
                {m}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <Card className="bg-primary/10 border-primary/20 overflow-hidden shadow-2xl">
        <CardContent className="p-8 text-center space-y-2">
          <p className="text-primary uppercase tracking-[0.2em] font-headline font-bold text-xs">Current Prayer</p>
          <h2 className="text-5xl font-headline font-bold">Dhuhr</h2>
          <p className="text-muted-foreground">Ends in 2h 15m</p>
          <div className="pt-4 flex justify-center gap-2">
            <Badge variant="outline" className="border-primary/50 text-primary">
              <Bell className="w-3 h-3 mr-1" />
              Alerts Active
            </Badge>
            <Badge variant="secondary" className="bg-secondary/50">
              <ShieldCheck className="w-3 h-3 mr-1" />
              Verified Timing
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-2">
        {prayers.map((prayer) => (
          <Card key={prayer.name} className={cn(
            "glass-card border-none transition-all",
            prayer.name === "Dhuhr" && "bg-white/5 border-l-4 border-primary"
          )}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className={cn(
                  "font-headline font-semibold",
                  prayer.name === "Dhuhr" ? "text-primary" : "text-foreground"
                )}>
                  {prayer.name}
                </span>
                {prayer.remaining && (
                  <Badge variant="secondary" className="text-[9px] uppercase bg-primary/20 text-primary border-none">
                    {prayer.remaining}
                  </Badge>
                )}
              </div>
              <div className="font-headline font-bold text-lg">
                {prayer.time}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-secondary/20 p-6 rounded-xl border border-border space-y-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-accent" />
          <h3 className="font-headline font-bold text-sm uppercase tracking-widest">Technical Standards</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-muted-foreground block mb-1">Standard</span>
            <span className="font-bold">Unified Calculation</span>
          </div>
          <div>
            <span className="text-muted-foreground block mb-1">Methodology</span>
            <span className="font-bold text-primary truncate block">{method}</span>
          </div>
          <div>
            <span className="text-muted-foreground block mb-1">Asr School</span>
            <span className="font-bold">Standard Juristic</span>
          </div>
          <div>
            <span className="text-muted-foreground block mb-1">Latitude Adjustment</span>
            <span className="font-bold">Angle Based</span>
          </div>
        </div>
      </section>

      <footer className="text-center text-[10px] text-muted-foreground italic">
        Times calculated using verified scholarly algorithms.
      </footer>
    </div>
  );
}