'use client';

import { ShieldCheck } from "lucide-react";

export default function ComingSoonPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="mx-auto w-24 h-24 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 ring-8 ring-primary/5">
        <ShieldCheck className="w-12 h-12 text-primary" />
      </div>
      <h1 className="text-4xl font-headline font-bold uppercase tracking-widest mb-2">Coming Soon</h1>
      <p className="text-muted-foreground italic text-lg">This scholarly node is under construction.</p>
      <footer className="absolute bottom-8 text-center opacity-30">
        <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em]">© 2025 Islamly Universal Infrastructure</p>
      </footer>
    </div>
  );
}
