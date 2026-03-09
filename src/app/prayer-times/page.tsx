"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  MapPin, 
  Settings2, 
  ShieldCheck, 
  Loader2, 
  Navigation, 
  Search, 
  X, 
  Compass, 
  Globe, 
  Volume2, 
  Play, 
  Pause, 
  Music,
  ListMusic
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useMemo, useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchPrayerTimesByCoords, fetchQibla, fetchCityCoordinates, fetchHijriDate, type PrayerTimings } from "@/services/islamic-data-service";

const methods = [
  { id: 1, name: "Karachi (UIS)" },
  { id: 2, name: "ISNA (North America)" },
  { id: 3, name: "MWL (World League)" },
  { id: 4, name: "Umm Al-Qura (Makkah)" },
  { id: 5, name: "Egyptian Survey" }
];

const ADHAN_STYLES = [
  { name: "Makkah (Haram)", url: "https://www.islamcan.com/audio/adhan/azan1.mp3" },
  { name: "Madinah (Nabawi)", url: "https://www.islamcan.com/audio/adhan/azan2.mp3" },
  { name: "Al-Aqsa", url: "https://www.islamcan.com/audio/adhan/azan15.mp3" },
  { name: "Egypt", url: "https://www.islamcan.com/audio/adhan/azan3.mp3" }
];

export default function PrayerTimesPage() {
  const [method, setMethod] = useState(methods[3]);
  const [timings, setTimings] = useState<PrayerTimings | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState("Detecting...");
  const [isAutoLocation, setIsAutoLocation] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTimeStr, setCurrentTimeStr] = useState("");
  const [qibla, setQibla] = useState<number | null>(null);
  const [hijri, setHijri] = useState<any>(null);
  const [hasMounted, setHasMounted] = useState(false);

  const [isPlayingAdhan, setIsPlayingAdhan] = useState(false);
  const [currentAdhanStyle, setCurrentAdhanStyle] = useState(ADHAN_STYLES[0]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setHasMounted(true);
    const interval = setInterval(() => {
      const now = new Date();
      const hh = now.getHours().toString().padStart(2, '0');
      const mm = now.getMinutes().toString().padStart(2, '0');
      setCurrentTimeStr(`${hh}:${mm}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleAdhan = () => {
    if (typeof window === 'undefined') return;
    if (!audioRef.current) {
      audioRef.current = new Audio(currentAdhanStyle.url);
      audioRef.current.onended = () => setIsPlayingAdhan(false);
    }

    if (isPlayingAdhan) {
      audioRef.current.pause();
    } else {
      audioRef.current.src = currentAdhanStyle.url;
      audioRef.current.play().catch(console.error);
    }
    setIsPlayingAdhan(!isPlayingAdhan);
  };

  const changeAdhanStyle = (style: typeof ADHAN_STYLES[0]) => {
    setCurrentAdhanStyle(style);
    if (isPlayingAdhan && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = style.url;
      audioRef.current.play().catch(console.error);
    }
  };

  const loadTimesByCity = async (city: string) => {
    if (!city.trim()) return;
    setLoading(true);
    try {
      const coords = await fetchCityCoordinates(city);
      if (coords) {
        const data = await fetchPrayerTimesByCoords(coords.lat, coords.lon, method.id);
        setTimings(data.timings);
        setLocationName(coords.display_name.split(',')[0]);
        setIsAutoLocation(false);
        setShowSearch(false);
        
        const qData = await fetchQibla(coords.lat, coords.lon);
        setQibla(qData.direction);

        const now = new Date();
        const dateStr = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;
        const hData = await fetchHijriDate(dateStr);
        setHijri(hData);
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
      const data = await fetchPrayerTimesByCoords(51.5074, -0.1278, method.id);
      setTimings(data.timings);
      setLocationName("London, UK");
      setIsAutoLocation(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAutoDetect = () => {
    if (typeof window === 'undefined' || !("geolocation" in navigator)) {
      setShowSearch(true);
      loadDefaultTimes();
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const data = await fetchPrayerTimesByCoords(latitude, longitude, method.id);
          setTimings(data.timings);
          setLocationName(`GPS Detected`);
          setIsAutoLocation(true);
          setShowSearch(false);
          
          const qiblaData = await fetchQibla(latitude, longitude);
          setQibla(qiblaData.direction);

          const now = new Date();
          const dateStr = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;
          const hData = await fetchHijriDate(dateStr);
          setHijri(hData);
        } catch (err) {
          loadDefaultTimes();
        } finally {
          setLoading(false);
        }
      },
      () => {
        setShowSearch(true);
        loadDefaultTimes();
      }
    );
  };

  useEffect(() => {
    if (hasMounted) {
      handleAutoDetect();
    }
  }, [method, hasMounted]);

  const prayers = useMemo(() => {
    if (!timings) return [];
    return [
      { name: "Fajr", time: timings.Fajr },
      { name: "Sunrise", time: timings.Sunrise },
      { name: "Dhuhr", time: timings.Dhuhr },
      { name: "Asr", time: timings.Asr },
      { name: "Maghrib", time: timings.Maghrib },
      { name: "Isha", time: timings.Isha },
    ].filter(p => !!p.time);
  }, [timings]);

  const nextPrayer = useMemo(() => {
    if (!prayers || prayers.length === 0 || !currentTimeStr) return null;
    const found = prayers.find(p => p.time > currentTimeStr);
    return found || prayers[0];
  }, [prayers, currentTimeStr]);

  if (!hasMounted) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Universal Sync...</p>
      </div>
    );
  }

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
                    placeholder="Search City..." 
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
            {hijri?.day && (
              <Badge variant="secondary" className="hidden sm:flex bg-primary/5 text-primary border-primary/10">
                {hijri.day} {hijri.month?.en || ''} {hijri.year} AH
              </Badge>
            )}
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

      {loading || !prayers.length ? (
        <div className="h-[300px] flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary opacity-20" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Updating Times...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-primary/10 border-primary/20 overflow-hidden shadow-2xl relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Clock className="w-24 h-24" />
              </div>
              <CardContent className="p-8 text-center space-y-4 relative z-10">
                <p className="text-primary uppercase tracking-[0.2em] font-headline font-bold text-xs">Next Prayer</p>
                <h2 className="text-5xl font-headline font-bold">{nextPrayer?.name || '---'}</h2>
                <p className="text-muted-foreground">{locationName}</p>
                
                <div className="pt-4 flex flex-col items-center gap-3">
                  <Button 
                    onClick={toggleAdhan}
                    className={cn(
                      "rounded-full px-8 gap-3 h-12 font-headline transition-all shadow-xl shadow-primary/20",
                      isPlayingAdhan ? "bg-emerald-500 hover:bg-emerald-600" : "bg-primary hover:bg-primary/90"
                    )}
                  >
                    {isPlayingAdhan ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
                    {isPlayingAdhan ? "Playing Adhan" : "Play Adhan"}
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-[10px] uppercase tracking-widest text-muted-foreground h-auto p-1 hover:text-white">
                        Style: {currentAdhanStyle.name} <ListMusic className="w-3 h-3 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="glass-card">
                      {ADHAN_STYLES.map((style) => (
                        <DropdownMenuItem 
                          key={style.name} 
                          onClick={() => changeAdhanStyle(style)}
                          className="text-xs flex items-center gap-2"
                        >
                          <Music className="w-3 h-3" />
                          {style.name}
                          {currentAdhanStyle.name === style.name && <ShieldCheck className="w-3 h-3 ml-auto text-primary" />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>

            {qibla !== null && (
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
              const isNext = prayer.name === nextPrayer?.name;
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
                      {isNext && <Badge variant="outline" className="text-[9px] uppercase h-5">Next</Badge>}
                      <div className="font-headline font-bold text-lg text-literata">
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
          <Globe className="w-4 h-4 text-accent" />
          <h3 className="font-headline font-bold text-sm uppercase tracking-widest">Global Standards</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
          <div className="space-y-1">
            <span className="block opacity-50">Precision Method</span>
            <span className="text-primary">{method?.name || 'Standard'}</span>
          </div>
          <div className="space-y-1">
            <span className="block opacity-50">Audio Source</span>
            <span className="text-white">Universal Verification Points</span>
          </div>
        </div>
      </section>
    </div>
  );
}