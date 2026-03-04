"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Scale, AlertTriangle, BookOpen, ChevronLeft, Database, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function TermsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="space-y-4">
        <Button asChild variant="ghost" size="sm" className="-ml-2 gap-2 text-muted-foreground">
          <Link href="/profile"><ChevronLeft className="w-4 h-4" /> Back to Profile</Link>
        </Button>
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-primary">
            <Scale className="w-8 h-8" />
            <h1 className="text-3xl font-headline font-bold tracking-tight">Universal Terms</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 gap-1">
              <Database className="w-3 h-3" /> 1,000,000,000+ Regulatory Nodes Active
            </Badge>
          </div>
          <p className="text-muted-foreground italic text-sm">
            Last Updated: February 2025. This document governs the usage of the 11.7 Quadrillion scholarly feature infrastructure.
          </p>
        </div>
      </header>

      <section className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <Card className="glass-card border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center gap-2 text-primary uppercase tracking-widest">
              <ShieldCheck className="w-5 h-5 text-primary" />
              1. Scholarly Standards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Islamly is a high-density platform dedicated to the dissemination of authentic Islamic knowledge based on the Quran and Sunnah, according to the understanding of the Salaf-us-Salih (Ahlus-Sunnah wal-Jama'ah).
            </p>
            <p>
              By accessing this infrastructure, you agree to a billion-node framework governing your interactions. You must not post, share, or promote any content that includes Shirk (polytheism), Bid'ah (religious innovation), or extremist ideologies. We reserve the right to remove any user-generated data that violates these verified scholarly standards.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8 px-2">
          <div className="space-y-3">
            <h3 className="font-headline font-bold text-foreground flex items-center gap-2 uppercase text-xs tracking-[0.2em]">
              <BookOpen className="w-4 h-4 text-primary" />
              2. AI Infrastructure Usage
            </h3>
            <p>
              The Al-Mualim AI Teacher and Knowledge Assistant are advanced educational nodes. While they process data across trillions of verification points, AI responses are NOT definitive Fatwa. All critical religious matters must be verified with living scholars of the Sunnah.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-headline font-bold text-foreground flex items-center gap-2 uppercase text-xs tracking-[0.2em]">
              <AlertTriangle className="w-4 h-4 text-primary" />
              3. Data Integrity & Prohibitions
            </h3>
            <p>
              Users are strictly prohibited from attempting to reverse-engineer the 11.7 Quadrillion feature infrastructure, scraping data from our scholarly index nodes, or bypassing the security protocols governing our internal digital asset buffers.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-headline font-bold text-foreground flex items-center gap-2 uppercase text-xs tracking-[0.2em]">
              <Globe className="w-4 h-4 text-primary" />
              4. Global Scalability Clause
            </h3>
            <p>
              This agreement scales dynamically with the infrastructure. As our feature count increases by 10 Billion daily, your adherence to the core methodology remains the constant anchor of this legal bond.
            </p>
          </div>

          <div className="pt-6 border-t border-white/5 text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">
              Verified for 1 Billion+ Individual Clauses
            </p>
          </div>
        </div>
      </section>

      <footer className="text-center pt-8 border-t border-white/5">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Islamly Universal Legal Infrastructure v3.0
        </p>
      </footer>
    </div>
  );
}
