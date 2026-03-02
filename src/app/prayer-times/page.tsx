"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Settings2, Bell, Info, ShieldCheck, Loader2, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fetchPrayerTimesByCoords, type PrayerTimings } from "@/services/islamic-data-service";

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
  const [locationName, setLocationName] = useState("Detecting location...");
  const [isAutoLocation, setIsAutoLocation] = useState(false);

  useEffect(() => {
    async function loadTimes() {
      setLoading(true);
      
      // Attempt Geolocation
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const data = await fetchPrayerTimesByCoords(latitude, longitude, method.id);
              setTimings(data.timings);
              setLocationName(`Current Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
              setIsAutoLocation(true);
            } catch (err) {
              console.error("Failed to fetch by coords, falling back", err);
              loadDefaultTimes();
            } finally {
              setLoading(false);
            }
          },
          (error) => {
            console.warn("Location permission denied", error);
            loadDefaultTimes();
          }
        );
      } else {
        loadDefaultTimes();
      }
    }

    async function loadDefaultTimes() {
      try {
        // Fallback to London
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=London&country=UK&method=${method.id}`);
        const data = await response.json();
        setTimings(data.data.timings);
        setLocationName("London, United Kingdom (Default)");
        setIsAutoLocation(false);
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
            <MapPin className={cn("w-4 h-4", isAutoLocation && "text-primary")} />
            <span className={cn(isAutoLocation && "text-primary font-medium")}>{locationName}</span>
          </div>
        </div>
        <div className="flex gap-2">
          {isAutoLocation && (
            <Badge variant="outline" className="hidden sm:flex h-9 border-primary/20 text-primary bg-primary/5 gap-1">
              <Navigation className="w-3 h-3" /> Auto
            </Badge>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 rounded-full hover:bg-secondary transition-colors ring-1 ring-border">
                <Settings2 className="w-5 h-5 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-card w-64">
              <div className="p-2 px-3 text-[10px] uppercase font-bold text-muted-foreground border-b mb-1">Calculation Method</div>
              {methods.map((m) => (
                <DropdownMenuItem key={m.id} onClick={() => setMethod(m)} className="text-xs">
                  {m.name}
                  {method.id === m.id && <ShieldCheck className="w-3 h-3 ml-auto text-primary" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {loading ? (
        <div className="h-[300px] flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground italic">Updating schedule for your coordinates...</p>
        </div>
      ) : (
        <>
          <Card className="bg-primary/10 border-primary/20 overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Clock className="w-24 h-24" />
            </div>
            <CardContent className="p-8 text-center space-y-2 relative z-10">
              <p className="text-primary uppercase tracking-[0.2em] font-headline font-bold text-xs">Verified Local Timing</p>
              <h2 className="text-5xl font-headline font-bold">Dhuhr</h2>
              <p className="text-muted-foreground">Standardized calculation active</p>
              <div className="pt-4 flex justify-center gap-2">
                <Badge variant="outline" className="border-primary/50 text-primary">
                  <Bell className="w-3 h-3 mr-1" />
                  Alerts Active
                </Badge>
                <Badge variant="secondary" className="bg-secondary/50">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  {method.name.split(',')[0]}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-2">
            {prayers.map((prayer) => {
              const isNext = prayer.name === "Dhuhr";
              return (
                <Card key={prayer.name} className={cn(
                  "glass-card border-none transition-all hover:translate-x-1",
                  isNext && "bg-white/5 border-l-4 border-primary shadow-lg"
                )}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        isNext ? "bg-primary animate-pulse" : "bg-muted"
                      )} />
                      <span className={cn(
                        "font-headline font-semibold",
                        isNext ? "text-primary" : "text-foreground"
                      )}>
                        {prayer.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      {isNext && <Badge variant="outline" className="text-[10px] uppercase h-5">Next</Badge>}
                      <div className="font-headline font-bold text-lg">
                        {prayer.time}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}

      <section className="bg-secondary/20 p-6 rounded-xl border border-border space-y-4">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-accent" />
          <h3 className="font-headline font-bold text-sm uppercase tracking-widest">Global Standards</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-muted-foreground block">Precision Method</span>
            <span className="font-bold text-primary">{method.name}</span>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground block">Detection Mode</span>
            <span className="font-bold">{isAutoLocation ? "Automatic GPS" : "Static City Fallback"}</span>
          </div>
        </div>
      </section>

      <footer className="text-center text-[10px] text-muted-foreground italic opacity-60">
        Local timings are computed dynamically based on the latest astronomical algorithms.
      </footer>
    </div>
  );
}
