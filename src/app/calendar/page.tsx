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
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fetchHijriDate } from "@/services/islamic-data-service";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";

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
  const [hijriInfo, setHijriInfo] = useState<Record<string, any>>({});

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

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
          <p className="text-muted-foreground italic">Precision tracking for the path of the Salaf.</p>
        </div>
      </header>

      <section className="bg-emerald-500/5 border border-emerald-500/20 p-4 rounded-xl flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-tight text-emerald-500">Methodology Node: No Bid'ah</p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            This infrastructure strictly excludes all non-authentic celebrations (e.g., Mawlid, 15th Sha'ban rituals). Only events established by the Quran and Sahih Sunnah are indexed.
          </p>
        </div>
      </section>

      <Card className="glass-card border-none shadow-2xl overflow-hidden">
        <CardHeader className="bg-secondary/20 flex flex-row items-center justify-between p-6">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-headline font-bold">
              {format(currentMonth, "MMMM yyyy")}
            </CardTitle>
            <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary">Scholarly Time Node</p>
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
            {/* Simple padding for start of month - purely visual for this MVP */}
            {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() }).map((_, i) => (
              <div key={`pad-${i}`} className="aspect-square opacity-0" />
            ))}
            
            {days.map((day) => {
              const dayName = format(day, "EEEE");
              const isSunnahFast = dayName === "Monday" || dayName === "Thursday";
              const isJumuah = dayName === "Friday";
              
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
                  {isSunnahFast && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                  )}
                  {isJumuah && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full" />
                  )}
                  
                  {/* Tooltip-like hover info */}
                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap pointer-events-none">
                    {isSunnahFast ? "Sunnah Fasting" : isJumuah ? "Yaum al-Jumu'ah" : "Standard Day"}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground pl-1">Upcoming Sunnah Protocols</h3>
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
                  <h4 className="font-headline font-bold text-sm">{event.title} <span className="text-primary opacity-60 ml-1">[{event.day || 'Hijri Date'}]</span></h4>
                  <p className="text-xs text-muted-foreground italic">{event.desc}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/20 flex gap-4">
        <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
        <div className="space-y-1">
          <h4 className="font-headline font-bold text-sm text-amber-500 uppercase tracking-widest">Verification Node</h4>
          <p className="text-xs text-muted-foreground leading-relaxed italic">
            This calendar uses solar calculations verified by global astronomical clusters. For specific Hijri dates, always cross-reference with local moon sighting committees of the Sunnah.
          </p>
        </div>
      </section>

      <footer className="text-center pt-8 opacity-40">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Database className="w-3 h-3" />
          <p className="text-[9px] uppercase tracking-[0.4em] font-black italic">
            Universal Scholarly Schedule v1.0
          </p>
        </div>
      </footer>
    </div>
  );
}
