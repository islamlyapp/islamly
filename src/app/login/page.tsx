"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, Mail, Lock, Loader2, Apple, Github, MessageSquare, ChevronRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { 
  useAuth, 
  initiateEmailSignIn, 
  initiateEmailSignUp, 
  initiateAnonymousSignIn,
  initiateGoogleSignIn,
  initiateAppleSignIn,
  initiateDiscordSignIn,
  initiateGithubSignIn,
  initiateMicrosoftSignIn
} from "@/firebase";
import { toast } from "@/hooks/use-toast";
import { sendOtpToEmail, verifyOtp } from "@/services/otp-service";
import { cn } from "@/lib/utils";

type AuthStep = "email" | "otp" | "password" | "login";

export default function LoginPage() {
  const [step, setStep] = useState<AuthStep>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleEmailNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // For registration, we send OTP. For login, we jump straight to password.
    // In this implementation, we default to sending OTP for verification security.
    const success = await sendOtpToEmail(email);
    if (success) {
      setStep("otp");
      toast({
        title: "Verification Sent",
        description: "A 6-digit OTP has been dispatched to your email infrastructure.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Node Error",
        description: "Failed to generate verification token. Please try again.",
      });
    }
    setIsLoading(false);
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) return;

    setIsLoading(true);
    const isValid = await verifyOtp(email, fullOtp);
    if (isValid) {
      setStep("password");
      toast({
        title: "Identity Verified",
        description: "Universal credentials confirmed. Please set your access password.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "The provided OTP does not match our records.",
      });
    }
    setIsLoading(false);
  };

  const handleFinalAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setIsLoading(true);
    try {
      // In this flow, we've verified email via OTP, so we create the account.
      initiateEmailSignUp(auth, email, password);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Creation Error",
        description: error.message,
      });
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
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

  return (
    <div className="max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-10">
      <header className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-4 relative">
          <ShieldCheck className="w-8 h-8 text-primary" />
          {step !== "email" && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-background animate-in zoom-in">
              <CheckCircle2 className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        <h1 className="text-3xl font-headline font-bold tracking-tight text-white">Universal Access</h1>
        <p className="text-muted-foreground italic">Verification required for all scholarly nodes.</p>
      </header>

      <Card className="glass-card border-none shadow-2xl relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] z-50 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-headline">
              {step === "email" && "Step 1: Identity"}
              {step === "otp" && "Step 2: Verification"}
              {step === "password" && "Step 3: Access"}
              {step === "login" && "Sign In"}
            </CardTitle>
            {step !== "email" && step !== "login" && (
              <button onClick={() => setStep("email")} className="text-[10px] uppercase font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
          <CardDescription>
            {step === "email" && "Enter your email to receive a verification OTP."}
            {step === "otp" && `Confirm the 6-digit code sent to ${email}`}
            {step === "password" && "Set a secure password for your scholarly account."}
            {step === "login" && "Enter credentials to access the infrastructure."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* STEP 1: EMAIL */}
          {step === "email" && (
            <form onSubmit={handleEmailNext} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 bg-secondary/20 h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full h-12 text-md font-headline gap-2">
                Send OTP <ChevronRight className="w-4 h-4" />
              </Button>
              <div className="text-center">
                <button 
                  type="button" 
                  onClick={() => setStep("login")}
                  className="text-xs text-primary font-bold uppercase tracking-tight hover:underline"
                >
                  Already have an account? Sign In
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: OTP */}
          {step === "otp" && (
            <form onSubmit={handleOtpVerify} className="space-y-6">
              <div className="flex justify-between gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => { otpRefs.current[idx] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(idx, e)}
                    className="w-12 h-14 text-center text-2xl font-bold bg-secondary/30 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                ))}
              </div>
              <Button type="submit" className="w-full h-12 text-md font-headline gap-2" disabled={otp.join("").length < 6}>
                Verify Token <ShieldCheck className="w-4 h-4" />
              </Button>
              <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
                Check your inbox (and spam) for the verification code.
              </p>
            </form>
          )}

          {/* STEP 3: PASSWORD (Sign Up) */}
          {step === "password" && (
            <form onSubmit={handleFinalAuth} className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="password"
                  placeholder="Create Secure Password"
                  className="pl-10 bg-secondary/20 h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full h-12 text-md font-headline">
                Complete Registration
              </Button>
            </form>
          )}

          {/* LOGIN FLOW (Skip OTP for existing users) */}
          {step === "login" && (
            <form onSubmit={(e) => {
              e.preventDefault();
              setIsLoading(true);
              initiateEmailSignIn(auth, email, password);
            }} className="space-y-4">
              <div className="space-y-4">
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
              <Button type="submit" className="w-full h-12 text-md font-headline">
                Sign In
              </Button>
              <div className="text-center">
                <button 
                  type="button" 
                  onClick={() => setStep("email")}
                  className="text-xs text-primary font-bold uppercase tracking-tight hover:underline"
                >
                  New student? Register with OTP
                </button>
              </div>
            </form>
          )}

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border/50" /></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest"><span className="bg-[#0a0304] px-2 text-muted-foreground">Unified Providers</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 glass-card gap-2" onClick={() => handleSocialSignIn(() => initiateGoogleSignIn(auth))} disabled={isLoading}>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="h-12 glass-card gap-2" onClick={() => handleSocialSignIn(() => initiateAppleSignIn(auth))} disabled={isLoading}>
              <Apple className="w-4 h-4" /> Apple
            </Button>
          </div>

          <Button variant="ghost" className="w-full text-[10px] uppercase tracking-widest text-muted-foreground" onClick={() => handleSocialSignIn(() => initiateAnonymousSignIn(auth))} disabled={isLoading}>
            Continue as Guest Node
          </Button>
        </CardContent>
      </Card>

      <footer className="text-center">
        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] opacity-50">Secure Scholarly Infrastructure v3.5</p>
      </footer>
    </div>
  );
}
