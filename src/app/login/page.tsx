
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Chrome, ShieldCheck, Github } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate authentication sequence
    setTimeout(() => {
      setIsLoading(false);
      toast({ title: "Identity Sequence Initiated", description: "Verification path dispatched to local system." });
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#0a0304] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(173,31,55,0.15)_0%,_transparent_50%)]" />
      
      <Card className="w-full max-w-md glass-card border-white/5 relative z-10 rounded-[3rem] shadow-2xl">
        <CardHeader className="text-center space-y-6 pt-10">
          <Link href="/" className="inline-block">
            <div className="mx-auto w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center ring-8 ring-primary/5 group">
              <ShieldCheck className="w-10 h-10 text-primary transition-transform group-hover:scale-110" />
            </div>
          </Link>
          <div className="space-y-1">
            <CardTitle className="text-4xl font-headline font-black text-white uppercase tracking-tight">Identity Hub</CardTitle>
            <p className="text-muted-foreground italic text-sm">Secure access to the scholarly infrastructure.</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-8 pb-12">
          <form onSubmit={handleEmailSignIn} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground ml-1">Scholarly Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                className="bg-secondary/30 border-white/5 h-14 rounded-2xl focus-visible:ring-primary/50 text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <Label htmlFor="password" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Access Key</Label>
                <button type="button" className="text-[10px] uppercase font-black text-primary hover:underline italic">Reset Path</button>
              </div>
              <Input 
                id="password" 
                type="password" 
                className="bg-secondary/30 border-white/5 h-14 rounded-2xl focus-visible:ring-primary/50 text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button className="w-full h-14 font-headline font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 rounded-2xl text-md" disabled={isLoading}>
              {isLoading ? "Synchronizing..." : "Initialize Identity"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5" /></div>
            <div className="relative flex justify-center text-[9px] uppercase font-black tracking-[0.3em]">
              <span className="bg-[#0c0809] px-4 text-muted-foreground italic">Social Infrastructure Hub</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-14 border-white/5 hover:bg-white/5 gap-3 uppercase text-[10px] font-black rounded-2xl tracking-widest shadow-lg">
              <Chrome className="w-5 h-5 text-primary" /> Google
            </Button>
            <Button variant="outline" className="h-14 border-white/5 hover:bg-white/5 gap-3 uppercase text-[10px] font-black rounded-2xl tracking-widest shadow-lg">
              <Github className="w-5 h-5 text-primary" /> GitHub
            </Button>
          </div>

          <footer className="text-center text-[10px] text-muted-foreground pt-4 border-t border-white/5 uppercase font-black tracking-widest">
            <p>New to the path? <Link href="/" className="text-primary hover:underline italic ml-1">Register Account</Link></p>
          </footer>
        </CardContent>
      </Card>
    </div>
  );
}
