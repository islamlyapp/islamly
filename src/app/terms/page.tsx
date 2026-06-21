"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Scale, AlertTriangle, BookOpen, ChevronLeft, Database, Globe, HandCoins } from "lucide-react";
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
            Last Updated: February 2025. These terms explain how Islamly supports your learning journey with respect and care.
          </p>
        </div>
      </header>

      <section className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <Card className="glass-card border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center gap-2 text-primary uppercase tracking-widest">
              <ShieldCheck className="w-5 h-5" />
              1. Scholarly Standards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Islamly is a platform dedicated to sharing authentic Islamic knowledge from the Quran and Sunnah, guided by the understanding of the Salaf-us-Salih (Ahlus-Sunnah wal-Jama'ah).
            </p>
            <p>
              By using Islamly, you agree to treat it as a respectful learning space. Please do not post, share, or promote any content that includes Shirk (polytheism), Bid'ah (religious innovation), or extremist ideologies.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-amber-500/20 bg-amber-500/5">
          <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center gap-2 text-amber-500 uppercase tracking-widest">
              <HandCoins className="w-5 h-5" />
              2. Data Protection & Amanah
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground font-bold">
              Islamly strictly prohibits the sale of user data for any purpose.
            </p>
            <p>
              User data is treated as a sacred trust (*Amanah*). We protect your information with strong safeguards, and our platform is funded through legitimate scholarly support and community benefit, not through the exploitation of privacy.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-8 px-2">
          <div className="space-y-3">
            <h3 className="font-headline font-bold text-foreground flex items-center gap-2 uppercase text-xs tracking-[0.2em]">
              <BookOpen className="w-4 h-4 text-primary" />
              3. AI Guidance
            </h3>
            <p>
              Al-Mualim and the Knowledge Assistant offer educational guidance to help you learn. Their answers are supportive, not definitive fatwa. For important religious matters, always verify with a living scholar of the Sunnah.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-headline font-bold text-foreground flex items-center gap-2 uppercase text-xs tracking-[0.2em]">
              <AlertTriangle className="w-4 h-4 text-primary" />
              4. Data Integrity & Prohibitions
            </h3>
            <p>
              Users may not attempt to reverse-engineer the platform, scrape data from our scholarly archives, or bypass the security protections that keep the service working smoothly.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-headline font-bold text-foreground flex items-center gap-2 uppercase text-xs tracking-[0.2em]">
              <Globe className="w-4 h-4 text-primary" />
              5. Global Scalability Clause
            </h3>
            <p>
              These terms are designed to remain stable as the service grows. Your commitment to the core methodology is the constant anchor of this learning community.
            </p>
          </div>

          <div className="pt-6 border-t border-white/5 text-center">
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-40">
              Trusted by learners and seekers around the world
            </p>
          </div>
        </div>
      </section>

      <footer className="text-center pt-8 border-t border-white/5">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          © 2025 Islamly • Universal Terms
        </p>
      </footer>
    </div>
  );
}