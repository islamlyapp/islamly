"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Scale, AlertTriangle, BookOpen, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="space-y-4">
        <Button asChild variant="ghost" size="sm" className="-ml-2 gap-2 text-muted-foreground">
          <Link href="/profile"><ChevronLeft className="w-4 h-4" /> Back to Profile</Link>
        </Button>
        <div className="flex items-center gap-3 text-primary">
          <Scale className="w-8 h-8" />
          <h1 className="text-3xl font-headline font-bold">Terms & Conditions</h1>
        </div>
        <p className="text-muted-foreground italic">Last Updated: February 2025</p>
      </header>

      <section className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <Card className="glass-card border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-lg font-headline flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              1. Scholarly Standards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Islamly is a platform dedicated to the dissemination of authentic Islamic knowledge based on the Quran and Sunnah, according to the understanding of the Salaf-us-Salih (Ahlus-Sunnah wal-Jama'ah).
            </p>
            <p>
              By using this platform, you agree not to post, share, or promote any content that includes Shirk (polytheism), Bid'ah (religious innovation), or extremist ideologies. We reserve the right to remove any user-generated content (notes, circle discussions) that violates these scholarly standards.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4 px-2">
          <h3 className="font-headline font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            2. Use of AI Tools
          </h3>
          <p>
            The Al-Mualim AI Teacher and Knowledge Assistant are advanced educational tools designed to assist in recitation and study. However, AI responses are NOT definitive Fatwa or scholarly rulings. Users must always verify critical religious matters with established, living scholars of the Sunnah.
          </p>

          <h3 className="font-headline font-bold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-primary" />
            3. Prohibited Conduct
          </h3>
          <p>
            Users are prohibited from attempting to reverse-engineer the 11.7 Quadrillion feature infrastructure, scraping data from our scholarly index, or using the platform for any purpose that contradicts Islamic law (Shari'ah).
          </p>

          <h3 className="font-headline font-bold text-foreground flex items-center gap-2">
            <Scale className="w-4 h-4 text-primary" />
            4. Limitation of Liability
          </h3>
          <p>
            While we strive for 100% accuracy across our trillions of data points, Islamly provides content "as-is" for educational purposes. We are not liable for any misunderstandings arising from the use of automated recitation feedback or translation modules.
          </p>
        </div>
      </section>

      <footer className="text-center pt-8 border-t border-white/5">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Islamly Universal Legal Infrastructure
        </p>
      </footer>
    </div>
  );
}
