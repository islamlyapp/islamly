
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, Mail, Lock, Loader2, Apple, Github } from "lucide-react";
import { 
  useAuth, 
  useUser, 
  initiateEmailSignIn, 
  initiateEmailSignUp, 
  initiateAnonymousSignIn,
  initiateGoogleSignIn,
  initiateAppleSignIn,
  initiateMicrosoftSignIn,
  initiateGithubSignIn
} from "@/firebase";
import { toast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user && !isUserLoading) {
      router.push("/");
    }
  }, [user, isUserLoading, router]);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    try {
      if (isSignUp) {
        initiateEmailSignUp(auth, email, password);
      } else {
        initiateEmailSignIn(auth, email, password);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: error.message,
      });
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = (method: () => void) => {
    setIsLoading(true);
    try {
      method();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Sign-In Failed",
        description: error.message,
      });
      setIsLoading(false);
    }
  };

  if (isUserLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-10">
      <header className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-4">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-headline font-bold tracking-tight">Access Knowledge</h1>
        <p className="text-muted-foreground italic">Connect with authentic scholarly resources.</p>
      </header>

      <Card className="glass-card border-none shadow-2xl">
        <CardHeader>
          <CardTitle className="font-headline">{isSignUp ? "Create Account" : "Sign In"}</CardTitle>
          <CardDescription>Enter your details or use a social provider to continue.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="email"
                  placeholder="Email address"
                  className="pl-10 bg-secondary/20 h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="password"
                  placeholder="Password"
                  className="pl-10 bg-secondary/20 h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full h-12 text-md font-headline" disabled={isLoading}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (isSignUp ? "Sign Up" : "Sign In")}
            </Button>
          </form>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border/50" /></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest"><span className="bg-card px-2 text-muted-foreground">Unified Auth</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="h-12 glass-card gap-2" 
              onClick={() => handleSocialSignIn(() => initiateGoogleSignIn(auth))}
              disabled={isLoading}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </Button>
            <Button 
              variant="outline" 
              className="h-12 glass-card gap-2" 
              onClick={() => handleSocialSignIn(() => initiateAppleSignIn(auth))}
              disabled={isLoading}
            >
              <Apple className="w-4 h-4" />
              Apple
            </Button>
            <Button 
              variant="outline" 
              className="h-12 glass-card gap-2" 
              onClick={() => handleSocialSignIn(() => initiateGithubSignIn(auth))}
              disabled={isLoading}
            >
              <Github className="w-4 h-4" />
              GitHub
            </Button>
            <Button 
              variant="outline" 
              className="h-12 glass-card gap-2" 
              onClick={() => handleSocialSignIn(() => initiateMicrosoftSignIn(auth))}
              disabled={isLoading}
            >
              <svg className="w-4 h-4" viewBox="0 0 23 23">
                <path fill="#f3f3f3" d="M0 0h11v11H0z" />
                <path fill="#f3f3f3" d="M12 0h11v11H12z" />
                <path fill="#f3f3f3" d="M0 12h11v11H0z" />
                <path fill="#f3f3f3" d="M12 12h11v11H12z" />
              </svg>
              Microsoft
            </Button>
          </div>

          <Button variant="ghost" className="w-full text-[10px] uppercase tracking-widest text-muted-foreground" onClick={() => handleSocialSignIn(() => initiateAnonymousSignIn(auth))} disabled={isLoading}>
            Continue as Anonymous Guest
          </Button>

          <div className="text-center pt-2">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-primary hover:underline font-bold uppercase tracking-tight"
            >
              {isSignUp ? "Already have an account? Sign In" : "New student? Create an account"}
            </button>
          </div>
        </CardContent>
      </Card>

      <footer className="text-center">
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] opacity-50">Secure Scholarly Infrastructure</p>
      </footer>
    </div>
  );
}
