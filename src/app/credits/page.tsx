"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Heart, Database, Globe, Github, Users, Cloud, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CreditsPage() {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-8">
        <div className="mx-auto w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4 ring-8 ring-primary/5">
          <Users className="w-10 h-10 text-primary" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold tracking-tight">Scholarly Credits</h1>
          <p className="text-muted-foreground italic">The contributors and infrastructure supporting the Ummah.</p>
        </div>
      </header>

      <div className="grid gap-6">
        {/* Methodology Node */}
        <Card className="glass-card border-emerald-500/20 bg-emerald-500/5">
          <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
              Methodology Alignment
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground leading-relaxed">
            The Islamly platform is strictly aligned with the methodology of the Salaf-us-Salih (Ahlus-Sunnah wal-Jama'ah). All content is curated to ensure the absence of Shirk, Bid'ah, and philosophical innovations.
          </CardContent>
        </Card>

        {/* Development & Tech Node */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground pl-1">Technical Infrastructure</h3>
          <div className="grid gap-3">
            <Card className="glass-card">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                  <Cloud className="w-5 h-5 text-blue-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-headline font-bold text-sm">Universal Cloud Infrastructure</h4>
                  <p className="text-xs text-muted-foreground">High-density compute nodes provided by Vercel Edge and Google Cloud Platform for 11.7 Quadrillion feature scalability.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
                  <Database className="w-5 h-5 text-orange-400" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-headline font-bold text-sm">Scholarly Data Nodes</h4>
                  <p className="text-xs text-muted-foreground">Authentic data synchronization provided by Quran.com v4, HadithAPI, and OpenStreetMap (Overpass).</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-headline font-bold text-sm">Identity Infrastructure</h4>
                  <p className="text-xs text-muted-foreground">Secure scholarly access tokens dispatched via the Resend OTP Mail Cluster.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Acknowledgments */}
        <section className="bg-secondary/20 p-8 rounded-3xl border border-white/5 space-y-6 text-center">
          <Heart className="w-8 h-8 text-primary mx-auto animate-pulse" />
          <div className="space-y-2">
            <h3 className="text-xl font-headline font-bold">Gratitude to the Community</h3>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm mx-auto italic">
              "He who does not thank the people has not thanked Allah." [Abu Dawood]
            </p>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Special thanks to the students of knowledge, open-source contributors, and the millions of Muslims who utilize these nodes daily to seek authentic knowledge.
          </p>
          <div className="pt-4 flex justify-center gap-2">
            <Button asChild variant="outline" size="sm" className="h-9 text-[10px] uppercase font-black">
              <Link href="/terms"><Scale className="w-3 h-3 mr-1" /> Governance</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="h-9 text-[10px] uppercase font-black">
              <Link href="/privacy"><ShieldCheck className="w-3 h-3 mr-1" /> Amanah</Link>
            </Button>
          </div>
        </section>
      </div>

      <footer className="text-center pt-8 opacity-40">
        <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-black">
          إسلاملي Universal Recognition Node v3.5
        </p>
      </footer>
    </div>
  );
}
