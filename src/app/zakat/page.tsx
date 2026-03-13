
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  HandCoins, 
  Calculator, 
  Info, 
  ShieldCheck, 
  ChevronRight, 
  RotateCcw,
  TrendingUp,
  Banknote,
  Coins,
  Gem
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ZakatPage() {
  const [hasMounted, setHasMounted] = useState(false);
  const [assets, setAssets] = useState({
    cash: "",
    gold: "",
    silver: "",
    stocks: "",
    business: ""
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const totalWealth = Object.values(assets).reduce((acc, val) => acc + (parseFloat(val) || 0), 0);
  const nisabThreshold = 5000; // Simplified example threshold
  const isAboveNisab = totalWealth >= nisabThreshold;
  const zakatDue = isAboveNisab ? totalWealth * 0.025 : 0;

  const handleReset = () => {
    setAssets({ cash: "", gold: "", silver: "", stocks: "", business: "" });
  };

  if (!hasMounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20 max-w-2xl mx-auto">
      <header className="text-center space-y-4 pt-4">
        <div className="mx-auto w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 ring-8 ring-emerald-500/5">
          <HandCoins className="w-10 h-10 text-emerald-500" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-bold text-white">Wealth Purification</h1>
          <p className="text-muted-foreground italic">Precision Zakat calculation based on scholarly standards.</p>
        </div>
      </header>

      <div className="grid gap-6">
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Asset Declaration</h3>
            <Badge variant="outline" className="text-[8px] uppercase border-emerald-500/20 text-emerald-500">Nisab Check Active</Badge>
          </div>
          
          <Card className="glass-card border-none shadow-2xl">
            <CardContent className="p-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                    <Banknote className="w-3 h-3" /> Cash on Hand
                  </label>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="bg-secondary/20 h-12"
                    value={assets.cash}
                    onChange={(e) => setAssets({...assets, cash: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                    <Gem className="w-3 h-3" /> Gold/Jewelry
                  </label>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="bg-secondary/20 h-12"
                    value={assets.gold}
                    onChange={(e) => setAssets({...assets, gold: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                    <Coins className="w-3 h-3" /> Silver Value
                  </label>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="bg-secondary/20 h-12"
                    value={assets.silver}
                    onChange={(e) => setAssets({...assets, silver: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="w-3 h-3" /> Investments
                  </label>
                  <Input 
                    type="number" 
                    placeholder="0.00" 
                    className="bg-secondary/20 h-12"
                    value={assets.stocks}
                    onChange={(e) => setAssets({...assets, stocks: e.target.value})}
                  />
                </div>
              </div>
              <Button variant="ghost" className="w-full text-xs uppercase font-bold text-muted-foreground h-10 gap-2" onClick={handleReset}>
                <RotateCcw className="w-3 h-3" /> Reset Calculation
              </Button>
            </CardContent>
          </Card>
        </section>

        <Card className={cn(
          "border-2 transition-all duration-500 overflow-hidden",
          isAboveNisab ? "border-emerald-500/30 bg-emerald-500/5" : "border-white/5 bg-secondary/10"
        )}>
          <CardContent className="p-8 text-center space-y-6">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Total Calculable Wealth</p>
              <h2 className="text-5xl font-headline font-black text-white">£{totalWealth.toLocaleString()}</h2>
            </div>

            <div className="h-px bg-white/5 w-24 mx-auto" />

            <div className="space-y-2">
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-500">Purification Amount (2.5%)</p>
              <h3 className="text-4xl font-headline font-bold text-white">£{zakatDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
            </div>

            <div className="pt-4">
              {!isAboveNisab && totalWealth > 0 ? (
                <div className="flex items-center justify-center gap-2 text-amber-500 animate-in zoom-in">
                  <Info className="w-4 h-4" />
                  <p className="text-xs font-bold uppercase">Below Nisab Threshold</p>
                </div>
              ) : isAboveNisab ? (
                <Button className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-md font-headline font-black uppercase tracking-widest shadow-xl shadow-emerald-900/20">
                  Initialize Dispatch <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              ) : null}
            </div>
          </CardContent>
        </Card>

        <section className="bg-secondary/20 p-6 rounded-2xl border border-white/5 flex gap-4">
          <ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" />
          <div className="space-y-1">
            <h4 className="font-headline font-bold text-sm text-white uppercase tracking-widest">Scholarly Governance</h4>
            <p className="text-xs text-muted-foreground leading-relaxed italic">
              Zakat is calculated based on wealth held for one lunar year (Hawl). Ensure your calculation includes all liquid assets and excludes debt obligations.
            </p>
          </div>
        </section>
      </div>

      <footer className="text-center pt-8 opacity-40">
        <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em] font-black italic">
          Purification Node: Protected by 1 Billion Privacy Nodes
        </p>
      </footer>
    </div>
  );
}
