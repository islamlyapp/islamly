'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  Loader2, 
  ArrowLeft, 
  User
} from "lucide-react";
import { 
  useAuth, 
  initiateEmailSignIn, 
  initiateAnonymousSignIn,
  initiateGoogleSignIn,
  initiateDiscordSignIn,
  initiateMicrosoftSignIn
} from "@/firebase";

type LoginStep = "initial" | "email";

export default function LoginPage() {
  const [step, setStep] = useState<LoginStep>("initial");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  
  const auth = useAuth();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    initiateEmailSignIn(auth, email, password);
  };

  if (!hasMounted) return null;

  return (
    <div className="max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-10">
      <header className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-4 ring-8 ring-primary/5">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-headline font-bold uppercase tracking-widest">Access System</h1>
        <p className="text-muted-foreground italic text-sm">Universal Entry.</p>
      </header>

      <Card className="glass-card border-none shadow-2xl relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-50 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-[10px] uppercase font-bold tracking-widest text-primary animate-pulse">Syncing identity...</p>
          </div>
        )}
        
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-headline text-lg uppercase tracking-tight">
              {step === "initial" && "Identity Selection"}
              {step === "email" && "Email Sign In"}
            </CardTitle>
            {step !== "initial" && (
              <button onClick={() => setStep("initial")} className="text-[10px] uppercase font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
            )}
          </div>
          <CardDescription className="text-xs">
            {step === "initial" && "Select a protocol to connect to the infrastructure."}
            {step === "email" && "Enter your credentials to access your profile."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {step === "initial" && (
            <div className="grid gap-3">
              <Button 
                variant="outline" 
                className="h-14 glass-card gap-4 justify-start px-6 font-headline font-bold uppercase text-[10px] tracking-widest hover:border-primary/50 transition-all"
                onClick={() => initiateGoogleSignIn(auth)}
              >
                <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </Button>

              <Button 
                variant="outline" 
                className="h-14 glass-card gap-4 justify-start px-6 font-headline font-bold uppercase text-[10px] tracking-widest hover:border-primary/50 transition-all"
                onClick={() => initiateDiscordSignIn(auth)}
              >
                <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M20.32,3.37a2.1,2.1,0,0,0-1.89-.37L15.42,4.2a1,1,0,0,1-1-.13,12,12,0,0,0-6.82,0,1,1,0,0,1-1,.13L3.57,3A2.1,2.1,0,0,0,1.68,3.37,2,2,0,0,0,1,5.21l1.5,9.48a2.1,2.1,0,0,0,2.09,1.81H17.4a2.1,2.1,0,0,0,2.09-1.81L21,5.21A2,2,0,0,0,20.32,3.37ZM8.43,12.44a1.71,1.71,0,0,1-1.79-1.82,1.74,1.74,0,0,1,1.82-1.78,1.77,1.77,0,0,1,0,3.6Zm7.14,0a1.77,1.77,0,0,1,0-3.6,1.74,1.74,0,0,1,1.82,1.78,1.71,1.71,0,0,1-1.79,1.82Z"/>
                </svg>
                Continue with Discord
              </Button>

              <Button 
                variant="outline" 
                className="h-14 glass-card gap-4 justify-start px-6 font-headline font-bold uppercase text-[10px] tracking-widest hover:border-primary/50 transition-all"
                onClick={() => initiateMicrosoftSignIn(auth)}
              >
                <svg className="w-5 h-5 text-blue-500" viewBox="0 0 23 23">
                  <path fill="#f3f3f3" d="M0 0h11v11H0z" />
                  <path fill="#f3f3f3" d="M12 0h11v11H12z" />
                  <path fill="#f3f3f3" d="M0 12h11v11H0z" />
                  <path fill="#f3f3f3" d="M12 12h11v11H12z" />
                </svg>
                Continue with Microsoft
              </Button>

              <Button 
                variant="outline" 
                className="h-14 glass-card gap-4 justify-start px-6 font-headline font-bold uppercase text-[10px] tracking-widest hover:border-primary/50 transition-all"
                onClick={() => setStep("email")}
              >
                <Mail className="w-5 h-5 text-primary" />
                Continue with Email
              </Button>

              <Button 
                variant="ghost" 
                className="h-14 bg-secondary/5 gap-4 justify-start px-6 font-headline font-bold uppercase text-[10px] tracking-[0.2em] text-muted-foreground opacity-60 hover:opacity-100 transition-all"
                onClick={() => initiateAnonymousSignIn(auth)}
              >
                <User className="w-5 h-5" />
                Continue as Guest
              </Button>
            </div>
          )}

          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-4 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="email"
                    placeholder="Scholarly Address"
                    className="pl-10 bg-secondary/20 h-12 border-white/5"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="password"
                    placeholder="Access Key"
                    className="pl-10 bg-secondary/20 h-12 border-white/5"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 text-md font-headline uppercase tracking-widest">
                Authorize Access
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      <footer className="text-center opacity-30">
        <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em]">© 2025 Islamly Universal Infrastructure</p>
      </footer>
    </div>
  );
}
