"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, EyeOff, Globe, MapPin, ChevronLeft, Shield, Database, ShieldAlert, Megaphone, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function PrivacyPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="space-y-4">
        <Button asChild variant="ghost" size="sm" className="-ml-2 gap-2 text-muted-foreground">
          <Link href="/profile"><ChevronLeft className="w-4 h-4" /> Back to Profile</Link>
        </Button>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-accent">
            <Lock className="w-8 h-8" />
            <h1 className="text-3xl font-headline font-bold">Privacy Promise</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 gap-1">
              <Database className="w-3 h-3" /> Multi-Layer Privacy Active
            </Badge>
          </div>
          <p className="text-muted-foreground italic text-sm">
            Your data is an Amanah (Trust) protected by a high-security framework.
          </p>
        </div>
      </header>

      <section className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <Card className="glass-card border-emerald-500/20 bg-emerald-500/5">
          <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center gap-2 text-emerald-400 uppercase tracking-widest">
              <ShieldAlert className="w-5 h-5" />
              The No-Sale Guarantee
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground font-bold">
              Islamly does not sell, trade, or monetize your personal data to third-party brokers.
            </p>
            <p>
              Under our strict scholarly methodology, your information is considered an "Amanah" (Sacred Trust). We reject any revenue models based on bulk data harvesting. Our privacy layers are dedicated solely to protecting your learning journey.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center gap-2 text-primary uppercase tracking-widest">
              <Megaphone className="w-5 h-5" />
              Sponsor Disclosure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              To support the platform, we work with filtered Scholarly Sponsors. We employ strict category controls to ensure only Islamic-compliant content is displayed.
            </p>
            <div className="bg-secondary/30 p-4 rounded-lg space-y-2 border border-white/5">
              <div className="flex items-center gap-2 text-foreground font-bold text-xs uppercase tracking-tight">
                <Info className="w-3 h-3 text-primary" />
                Cookie & Telemetry Disclosure
              </div>
              <p className="text-[11px]">
                Our sponsors (including Google) use cookies to serve relevant content based on a student's prior visits. This data is governed by our privacy protections and is never sold.
              </p>
              <p className="text-[11px] italic">
                Students may opt out of personalized sponsor content by visiting Ads Settings or www.aboutads.info.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 px-2">
          <div className="space-y-3">
            <h3 className="font-headline font-bold text-foreground flex items-center gap-2 uppercase text-xs tracking-[0.2em]">
              <EyeOff className="w-4 h-4 text-accent" />
              1. Scholarly Data Usage
            </h3>
            <p>
              We collect only the essential metadata required to maintain your learning preferences and progress:
            </p>
            <ul className="list-disc pl-5 space-y-2 opacity-80">
              <li>Authentication credentials managed via secure protocols.</li>
              <li>Universal preferences (Language, Qira'at, and Calculation Methods).</li>
              <li>Learning telemetry (Bookmarks, Scholarly Notes, and Assessment Scores).</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-headline font-bold text-foreground flex items-center gap-2 uppercase text-xs tracking-[0.2em]">
              <MapPin className="w-4 h-4 text-accent" />
              2. Geospatial Synchronization
            </h3>
            <p>
              Real-time geolocation is utilized exclusively for precision solar calculations (Prayer Times) and identifying local physical archives (Masjids). This data remains transient and is never utilized for pattern tracking.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-headline font-bold text-foreground flex items-center gap-2 uppercase text-xs tracking-[0.2em]">
              <Globe className="w-4 h-4 text-accent" />
              3. Feedback Processing & Temporary Audio
            </h3>
            <p>
              Al-Mualim processes recitation audio to provide quick feedback. To protect your privacy, original audio streams are temporary and are not stored after the response is generated.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-headline font-bold text-foreground flex items-center gap-2 uppercase text-xs tracking-[0.2em] text-destructive">
              4. Complete Data Eradication
            </h3>
            <p>
              You maintain the absolute right to purge your entire presence from our infrastructure. Initiating an account deletion will trigger a cleanup cascade across all security layers.
            </p>
          </div>
        </div>
      </section>

      <footer className="text-center pt-8 border-t border-white/5">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          © 2025 Islamly • Privacy Promise
        </p>
      </footer>
    </div>
  );
}
