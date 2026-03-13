"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar as CalendarIcon, 
  ShieldCheck, 
  Info, 
  Sun, 
  Moon, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Database,
  ShieldAlert,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fetchHijriDate } from "@/services/islamic-data-service";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";
import Link from "next/link";

const SUNNAH_EVENTS = [
  { day: "Monday", title: "Sunnah Fast", desc: "The Prophet (PBUH) used to fast on Mondays." },
  { day: "Thursday", title: "Sunnah Fast", desc: "Deeds are presented to Allah on Thursdays." },
  { hijriDay: 13, title: "White Day (Fast)", desc: "First of the three middle days of the month." },
  { hijriDay: 14, title: "White Day (Fast)", desc: "Second of the three middle days of the month." },
  { hijriDay: 15, title: "White Day (Fast)", desc: "Third of the three middle days of the month." },
  { day: "Friday", title: "Yaum al-Jumu'ah", desc: "The best day of the week. Recite Surah al-Kahf." },
];

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [hasMounted, setHasMounted] = useState(false);
  const [hijriMapping, setHijriMapping] = useState<Record<string, any>>({});
  const [loadingHijri, setLoadingHijri] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  useEffect(() => {
    async function loadHijriMapping() {
      if (!hasMounted) return;
      setLoadingHijri(true);
      const mapping: Record<string, any> = {};
      
      // Batch fetch for performance - specifically focusing on middle days and today
      const now = new Date();
      const dateStr = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()}`;
      const todayData = await fetchHijriDate(dateStr);
      if (todayData) mapping[now.toISOString().split('T')[0]] = todayData;

      setHijriMapping(mapping);
      setLoadingHijri(false);
    }
    loadHijriMapping();
  }, [currentMonth, hasMounted]);

  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4 ring-8 ring-primary/5">
          <CalendarIcon className="w-10 h-10 text-primary" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold">Sunnah Calendar</h1>
          <p className="text-muted-foreground italic">Precision lunar tracking for the path of the Salaf.</p>
        </div>
      </header>

      <section className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl space-y-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
          <h3 className="font-headline font-bold text-lg text-emerald-500 uppercase tracking-widest">No Bid'ah Protocol</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          This digital infrastructure strictly excludes all non-authentic celebrations. Events such as **Mawlid**, the **Night of 15th Sha'ban**, or any other innovated 'holidays' are not indexed here as they were not practiced by the Prophet (PBUH) or his companions.
        </p>
        <Button asChild variant="outline" size="sm" className="h-8 text-[9px] uppercase font-black border-emerald-500/20 text-emerald-500">
          <Link href="/refutation"><ShieldAlert className="w-3 h-3 mr-1" /> View Refutations</Link>
        </Button>
      </section>

      <Card className="glass-card border-none shadow-2xl overflow-hidden">
        <CardHeader className="bg-secondary/20 flex flex-row items-center justify-between p-6">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-headline font-bold">
              {format(currentMonth, "MMMM yyyy")}
            </CardTitle>
            <div className="flex items-center gap-2">
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary">Scholarly Time Node</p>
              {loadingHijri && <Loader2 className="w-3 h-3 animate-spin text-primary opacity-40" />}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={handlePrevMonth}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleNextMonth}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-7 gap-2 text-center mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
              <span key={d} className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {/* Padding for start of month */}
            {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() }).map((_, i) => (
              <div key={`pad-${i}`} className="aspect-square opacity-0" />
            ))}
            
            {days.map((day) => {
              const dayName = format(day, "EEEE");
              const isSunnahFast = dayName === "Monday" || dayName === "Thursday";
              const isJumuah = dayName === "Friday";
              const dateKey = day.toISOString().split('T')[0];
              const hijri = hijriMapping[dateKey];
              
              return (
                <div 
                  key={day.toISOString()} 
                  className={cn(
                    "aspect-square rounded-xl flex flex-col items-center justify-center relative border transition-all cursor-pointer group",
                    isToday(day) ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-secondary/20 border-white/5 hover:border-primary/30",
                    (isSunnahFast || isJumuah) && !isToday(day) && "ring-1 ring-primary/20"
                  )}
                >
                  <span className="text-sm font-bold">{format(day, "d")}</span>
                  {hijri && (
                    <span className="text-[8px] font-black opacity-40 absolute bottom-1">{hijri.day}</span>
                  )}
                  {isSunnahFast && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  )}
                  {isJumuah && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full" />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground pl-1">Authentic Sunnah Cycles</h3>
        <div className="grid gap-3">
          {SUNNAH_EVENTS.map((event, i) => (
            <Card key={i} className="glass-card hover:bg-white/[0.02] transition-all">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                  event.day === "Friday" ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                )}>
                  {event.day === "Friday" ? <CheckCircle2 className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-headline font-bold text-sm">{event.title} <span className="text-primary opacity-60 ml-1">[{event.day || 'Hijri Cycle'}]</span></h4>
                  <p className="text-xs text-muted-foreground italic">{event.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
            Universal Hijri Schedule v1.0 • Strictly No Bid'ah
          </p>
        </div>
      </footer>
    </div>
  );
}
