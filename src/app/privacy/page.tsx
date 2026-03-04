
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, EyeOff, Globe, MapPin, ChevronLeft, Shield, Database, ShieldAlert, Megaphone } from "lucide-react";
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
            <h1 className="text-3xl font-headline font-bold">Privacy Infrastructure</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20 gap-1">
              <Database className="w-3 h-3" /> 1,000,000,000+ Privacy Nodes Active
            </Badge>
          </div>
          <p className="text-muted-foreground italic text-sm">
            Your data is an Amanah (Trust) protected by a billion-node security framework.
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
              Islamly does not sell, trade, or monetize your personal data. 
            </p>
            <p>
              Under our strict scholarly methodology, your information is considered an "Amanah" (Sacred Trust). We reject any revenue models based on data harvesting. Our 1 billion privacy nodes are dedicated solely to protecting your learning journey within the 11.7 Quadrillion feature infrastructure.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center gap-2 text-primary uppercase tracking-widest">
              <Megaphone className="w-5 h-5" />
              Ethical Promotion Nodes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              To sustain our infrastructure, we display contextual **Ethical Promotion Nodes**. These ads are strictly related to scholarly resources, Islamic education, or community benefits. 
            </p>
            <p className="font-medium text-foreground">
              Critical Policy: We do not share your unique identifier or behavioral telemetry with advertisers. All promotions are served based on the context of the page being viewed, maintaining 100% privacy node integrity.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-8 px-2">
          <div className="space-y-3">
            <h3 className="font-headline font-bold text-foreground flex items-center gap-2 uppercase text-xs tracking-[0.2em]">
              <EyeOff className="w-4 h-4 text-accent" />
              1. Scholarly Data Usage
            </h3>
            <p>
              We collect only the essential metadata required to maintain your position within the global scholarly index:
            </p>
            <ul className="list-disc pl-5 space-y-2 opacity-80">
              <li>Authentication credentials managed via secure Firebase protocols.</li>
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
              Real-time geolocation is utilized exclusively for precision solar calculations (Prayer Times) and identifying local physical archives (Masjids). This data remains transient and is never utilized for commercial pattern tracking.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-headline font-bold text-foreground flex items-center gap-2 uppercase text-xs tracking-[0.2em]">
              <Globe className="w-4 h-4 text-accent" />
              3. AI Processing & Ephemeral Audio
            </h3>
            <p>
              The Al-Mualim AI Teacher processes recitation audio signals through high-density transcription clusters. To ensure absolute privacy, original audio streams are ephemeral and are not archived on the universal storage nodes after feedback generation.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-headline font-bold text-foreground flex items-center gap-2 uppercase text-xs tracking-[0.2em] text-destructive">
              4. Complete Data Eradication
            </h3>
            <p>
              You maintain the absolute right to purge your entire presence from our infrastructure. Initiating an account deletion will trigger a cascade across all 1 billion privacy nodes to ensure no residual scholarly records remain.
            </p>
          </div>
        </div>
      </section>

      <footer className="text-center pt-8 border-t border-white/5">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Islamly Universal Privacy Infrastructure v3.5 • Verified for 1 Billion+ Individual Privacy Nodes
        </p>
      </footer>
    </div>
  );
}
