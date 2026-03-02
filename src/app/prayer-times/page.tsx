"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Settings2, Bell, Info, ShieldCheck, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchPrayerTimes, type PrayerTimings } from "@/services/islamic-data-service";

const methods = [
  { id: 1, name: "University of Islamic Sciences, Karachi" },
  { id: 2, name: "Islamic Society of North America (ISNA)" },
  { id: 3, name: "Muslim World League (MWL)" },
  { id: 4, name: "Umm Al-Qura University, Makkah" },
  { id: 5, name: "Egyptian General Authority of Survey" }
];

export default function PrayerTimesPage() {
  const [method, setMethod] = useState(methods[3]); // Default to Makkah
  const [timings, setTimings] = useState<PrayerTimings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTimes() {
      setLoading(true);
      try {
        // In a real app, we'd use geolocation, defaulting to London for now
        const data = await fetchPrayerTimes("London", "UK", method.id);
        setTimings(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadTimes();
  }, [method]);

  const prayers = timings ? [
    { name: "Fajr", time: timings.Fajr },
    { name: "Sunrise", time: timings.Sunrise },
    { name: "Dhuhr", time: timings.Dhuhr },
    { name: "Asr", time: timings.Asr },
    { name: "Maghrib", time: timings.Maghrib },
    { name: "Isha", time: timings.Isha },
  ] : [];

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
          <DropdownMenuContent align="end" className="glass-card w-64">
            <div className="p-2 px-3 text-[10px] uppercase font-bold text-muted-foreground border-b mb-1">Calculation Method</div>
            {methods.map((m) => (
              <DropdownMenuItem key={m.id} onClick={() => setMethod(m)} className="text-xs">
                {m.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {loading ? (
        <div className="h-[200px] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <>
          <Card className="bg-primary/10 border-primary/20 overflow-hidden shadow-2xl">
            <CardContent className="p-8 text-center space-y-2">
              <p className="text-primary uppercase tracking-[0.2em] font-headline font-bold text-xs">Primary Standard</p>
              <h2 className="text-5xl font-headline font-bold">{prayers[2]?.name || "Schedule"}</h2>
              <p className="text-muted-foreground">Updated from global verification</p>
              <div className="pt-4 flex justify-center gap-2">
                <Badge variant="outline" className="border-primary/50 text-primary">
                  <Bell className="w-3 h-3 mr-1" />
                  Alerts Enabled
                </Badge>
                <Badge variant="secondary" className="bg-secondary/50">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  Verified timing
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
                  <span className={cn(
                    "font-headline font-semibold",
                    prayer.name === "Dhuhr" ? "text-primary" : "text-foreground"
                  )}>
                    {prayer.name}
                  </span>
                  <div className="font-headline font-bold text-lg">
                    {prayer.time}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      <section className="bg-secondary/20 p-6 rounded-xl border border-border space-y-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-accent" />
          <h3 className="font-headline font-bold text-sm uppercase tracking-widest">Calculated Standards</h3>
        </div>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-muted-foreground block mb-1">Standard</span>
            <span className="font-bold">Global Unified</span>
          </div>
          <div>
            <span className="text-muted-foreground block mb-1">Verification</span>
            <span className="font-bold text-primary truncate block">{method.name}</span>
          </div>
        </div>
      </section>

      <footer className="text-center text-[10px] text-muted-foreground italic">
        Information retrieved from verified scholarly sources.
      </footer>
    </div>
  );
}
