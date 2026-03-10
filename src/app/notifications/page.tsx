
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Clock, 
  BookOpen, 
  Users, 
  ShieldCheck, 
  Database, 
  ChevronRight, 
  Trash2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const notifications = [
  {
    id: 1,
    type: "Prayer",
    title: "Asr Prayer Reminder",
    desc: "Asr is in 15 minutes. Prepare for your meeting with the Creator.",
    time: "10 mins ago",
    icon: Clock,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    unread: true
  },
  {
    id: 2,
    type: "Scholarly",
    title: "Knowledge Index Update",
    desc: "New scholarly index nodes successfully deployed in Cluster 4 (Fiqh).",
    time: "2 hours ago",
    icon: Database,
    color: "text-primary",
    bg: "bg-primary/10",
    unread: true
  },
  {
    id: 3,
    type: "Circle",
    title: "Community Interaction",
    desc: "A moderator responded to your question in 'Aqidah Essentials'.",
    time: "5 hours ago",
    icon: Users,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    unread: false
  },
  {
    id: 4,
    type: "Learning",
    title: "Daily Goal Achieved",
    desc: "You completed your morning Adhkar streak. Keep going!",
    time: "1 day ago",
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    unread: false
  },
  {
    id: 5,
    type: "System",
    title: "Universal Synchronization",
    desc: "Geospatial synchronization services have been recalibrated for your region.",
    time: "2 days ago",
    icon: AlertCircle,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    unread: false
  }
];

export default function NotificationsPage() {
  const handleComingSoon = () => {
    toast({ title: "Coming Soon", description: "Notification management is being synchronized." });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-headline font-bold flex items-center gap-3">
            <Bell className="w-8 h-8 text-primary" />
            Alerts Hub
          </h1>
          <p className="text-muted-foreground italic">Scholarly notifications and reminders.</p>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={handleComingSoon}>
          <Trash2 className="w-5 h-5" />
        </Button>
      </header>

      <div className="grid gap-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Recent Activity</h3>
          <Badge variant="secondary" className="bg-primary/10 text-primary">2 Unread</Badge>
        </div>

        {notifications.map((n) => (
          <Card 
            key={n.id} 
            className={cn(
              "glass-card hover:bg-white/[0.03] transition-all cursor-pointer group",
              n.unread && "border-primary/30 bg-primary/5"
            )}
            onClick={() => toast({ title: "Alert Node", description: "Synchronizing details for this event..." })}
          >
            <CardContent className="p-4 flex gap-4">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                n.bg,
                n.color
              )}>
                <n.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <h4 className="font-headline font-bold text-sm">{n.title}</h4>
                    {n.unread && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                  </div>
                  <span className="text-[9px] text-muted-foreground uppercase">{n.time}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {n.desc}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="text-[8px] uppercase border-white/5 opacity-60">{n.type}</Badge>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/30 self-center" />
            </CardContent>
          </Card>
        ))}
      </div>

      <section className="bg-primary/5 border border-primary/20 p-6 rounded-2xl text-center space-y-4">
        <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-2">
          <Database className="w-6 h-6 text-primary" />
        </div>
        <div className="space-y-1">
          <h3 className="font-headline font-bold text-sm uppercase tracking-widest text-primary">Universal Data Flow</h3>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
            You are currently receiving high-density scholarly alerts from our global index nodes.
          </p>
        </div>
        <Button variant="outline" className="text-[10px] uppercase font-bold tracking-widest border-primary/20 hover:bg-primary/5" onClick={handleComingSoon}>
          Mark All As Read
        </Button>
      </section>

      <footer className="text-center pt-8">
        <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] opacity-40">
          إسلاملي Universal Notification Engine v1.0
        </p>
      </footer>
    </div>
  );
}
