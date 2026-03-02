
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Settings2, Bell } from "lucide-react";

const prayers = [
  { name: "Fajr", time: "05:14", remaining: "" },
  { name: "Sunrise", time: "07:02", remaining: "" },
  { name: "Dhuhr", time: "12:12", remaining: "Next: 2h 15m" },
  { name: "Asr", time: "14:48", remaining: "" },
  { name: "Maghrib", time: "17:15", remaining: "" },
  { name: "Isha", time: "18:58", remaining: "" },
];

export default function PrayerTimesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold">Prayer Times</h1>
          <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
            <MapPin className="w-4 h-4" />
            <span>London, United Kingdom</span>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-secondary transition-colors">
          <Settings2 className="w-5 h-5 text-muted-foreground" />
        </button>
      </header>

      <Card className="bg-primary/10 border-primary/20 overflow-hidden">
        <CardContent className="p-8 text-center space-y-2">
          <p className="text-primary uppercase tracking-[0.2em] font-headline font-bold text-xs">Now Praying</p>
          <h2 className="text-5xl font-headline font-bold">Dhuhr</h2>
          <p className="text-muted-foreground">Ends in 2h 15m</p>
          <div className="pt-4 flex justify-center">
            <Badge variant="outline" className="border-primary/50 text-primary">
              <Bell className="w-3 h-3 mr-1" />
              Notifications On
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

      <footer className="text-center text-xs text-muted-foreground space-y-1">
        <p>Calculation: Islamic Relief Method</p>
        <p>Asr Method: Shafi'i / Maliki / Hanbali</p>
      </footer>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
