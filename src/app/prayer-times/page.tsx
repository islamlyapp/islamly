"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Settings2, Bell, Info, ShieldCheck, Loader2, Navigation, Search, X, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchPrayerTimesByCoords, fetchQibla, type PrayerTimings } from "@/services/islamic-data-service";

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
  const [locationName, setLocationName] = useState("Detecting...");
  const [isAutoLocation, setIsAutoLocation] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTimeStr, setCurrentTimeStr] = useState("");
  const [qibla, setQibla] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTimeStr(now.getHours().toString().padStart(2, '0') + ":" + now.getMinutes().toString().padStart(2, '0'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadTimesByCity = async (city: string) => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=&method=${method.id}`);
      const data = await response.json();
      if (data.code === 200) {
        setTimings(data.data.timings);
        setLocationName(city);
        setIsAutoLocation(false);
        setShowSearch(false);
      } else {
        throw new Error("City not found");
      }
    } catch (err) {
      console.error(err);
      loadDefaultTimes();
    } finally {
      setLoading(false);
    }
  };

  const loadDefaultTimes = async () => {
    try {
      const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=London&country=UK&method=${method.id}`);
      const data = await response.json();
      setTimings(data.data.timings);
      setLocationName("London, United Kingdom");
      setIsAutoLocation(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAutoDetect = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const data = await fetchPrayerTimesByCoords(latitude, longitude, method.id);
            setTimings(data.timings);
            setLocationName(`Detected (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`);
            setIsAutoLocation(true);
            setShowSearch(false);
            
            const qiblaData = await fetchQibla(latitude, longitude);
            setQibla(qiblaData.direction);
          } catch (err) {
            loadDefaultTimes();
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.warn("Location denied", error);
          setShowSearch(true);
          loadDefaultTimes();
        }
      );
    } else {
      setShowSearch(true);
      loadDefaultTimes();
    }
  };

  useEffect(() => {
    handleAutoDetect();
  }, [method]);

  const prayers = useMemo(() => {
    if (!timings) return [];
    return [
      { name: "Fajr", time: timings.Fajr },
      { name: "Sunrise", time: timings.Sunrise },
      { name: "Dhuhr", time: timings.Dhuhr },
      { name: "Asr", time: timings.Asr },
      { name: "Maghrib", time: timings.Maghrib },
      { name: "Isha", time: timings.Isha },
    ];
  }, [timings]);

  const nextPrayer = useMemo(() => {
    if (!prayers.length || !currentTimeStr) return prayers[0];
    const found = prayers.find(p => p.time > currentTimeStr);
    return found || prayers[0];
  }, [prayers, currentTimeStr]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-headline font-bold">Prayer Schedule</h1>
            {!showSearch ? (
              <button 
                onClick={() => setShowSearch(true)}
                className="flex items-center gap-2 text-muted-foreground text-sm hover:text-primary transition-colors group"
              >
                <MapPin className={cn("w-4 h-4", isAutoLocation && "text-primary")} />
                <span className={cn(isAutoLocation && "text-primary font-medium")}>{locationName}</span>
                <Search className="w-3 h-3 opacity-0 group-hover:opacity-100" />
              </button>
            ) : (
              <div className="flex gap-2 items-center animate-in slide-in-from-left-2 duration-300">
                <div className="relative flex-1 max-w-[240px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                  <Input 
                    autoFocus
                    placeholder="Enter City..." 
                    className="h-8 pl-8 bg-secondary/30 text-xs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && loadTimesByCity(searchQuery)}
                  />
                </div>
                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setShowSearch(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleAutoDetect}
              className={cn(
                "p-2 rounded-full transition-all ring-1 ring-border hover:bg-secondary",
                isAutoLocation && "bg-primary/10 ring-primary/30 text-primary"
              )}
            >
              <Navigation className="w-4 h-4" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full hover:bg-secondary transition-colors ring-1 ring-border">
                  <Settings2 className="w-4 h-4 text-muted-foreground" />
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
        </div>
      </header>

      {loading ? (
        <div className="h-[300px] flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground italic">Updating schedule...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-primary/10 border-primary/20 overflow-hidden shadow-2xl relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Clock className="w-24 h-24" />
              </div>
              <CardContent className="p-8 text-center space-y-2 relative z-10">
                <p className="text-primary uppercase tracking-[0.2em] font-headline font-bold text-xs">Verified Timing</p>
                <h2 className="text-5xl font-headline font-bold">{nextPrayer.name}</h2>
                <p className="text-muted-foreground">{locationName}</p>
                <div className="pt-4 flex justify-center gap-2">
                  <Badge variant="outline" className="border-primary/50 text-primary">
                    <Bell className="w-3 h-3 mr-1" /> Alerts Active
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {qibla && (
              <Card className="glass-card border-accent/20 flex flex-col items-center justify-center p-6 text-center">
                <Compass className="w-12 h-12 text-accent mb-4 animate-pulse" style={{ transform: `rotate(${qibla}deg)` }} />
                <h3 className="font-headline font-bold text-lg">Qibla Direction</h3>
                <p className="text-2xl font-bold text-accent">{Math.round(qibla)}°</p>
                <p className="text-[10px] uppercase text-muted-foreground mt-2 tracking-widest">From True North</p>
              </Card>
            )}
          </div>

          <div className="grid gap-2">
            {prayers.map((prayer) => {
              const isNext = prayer.name === nextPrayer.name;
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
            <span className="text-muted-foreground block">API Source</span>
            <span className="font-bold">AlAdhan.com (Free)</span>
          </div>
        </div>
      </section>
    </div>
  );
}
