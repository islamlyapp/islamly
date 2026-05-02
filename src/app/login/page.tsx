"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Mail, Chrome, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

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
      toast({ title: "Identity Sequence Initiated", description: "Verification email dispatched to local node." });
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-[#0a0304] relative overflow-hidden">
      {/* Background Branding Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(173,31,55,0.1)_0%,_transparent_50%)]" />
      
      <Card className="w-full max-w-md glass-card border-white/5 relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center ring-4 ring-primary/5">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-3xl font-headline font-black text-white uppercase tracking-tight">Identity Hub</CardTitle>
            <p className="text-muted-foreground italic text-sm">Secure access to the global scholarly infrastructure.</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Scholarly Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                className="bg-secondary/20 border-white/5 h-12 focus-visible:ring-primary/50"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Access Key</Label>
                <button type="button" className="text-[10px] uppercase font-bold text-primary hover:underline">Reset Key</button>
              </div>
              <Input 
                id="password" 
                type="password" 
                className="bg-secondary/20 border-white/5 h-12 focus-visible:ring-primary/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button className="w-full h-12 font-headline font-bold uppercase tracking-widest shadow-lg shadow-primary/20" disabled={isLoading}>
              {isLoading ? "Synchronizing..." : "Initialize Identity"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5" /></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
              <span className="bg-[#0a0304] px-4 text-muted-foreground italic">Social OAuth Hub</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 border-white/5 hover:bg-white/5 gap-2 uppercase text-[10px] font-bold">
              <Chrome className="w-4 h-4" /> Google
            </Button>
            <Button variant="outline" className="h-12 border-white/5 hover:bg-white/5 gap-2 uppercase text-[10px] font-bold">
              <Mail className="w-4 h-4" /> Microsoft
            </Button>
          </div>

          <footer className="text-center text-xs text-muted-foreground pt-4 border-t border-white/5">
            <p>New to the infrastructure? <a href="/" className="text-primary font-bold hover:underline">Register Account</a></p>
          </footer>
        </CardContent>
      </Card>
    </div>
  );
}
