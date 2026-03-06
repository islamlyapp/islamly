
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  Loader2, 
  Apple, 
  ChevronRight, 
  ArrowLeft, 
  CheckCircle2, 
  RefreshCcw, 
  User, 
  UserPlus,
  Scale
} from "lucide-react";
import { 
  useAuth, 
  initiateEmailSignIn, 
  initiateEmailSignUp, 
  initiateAnonymousSignIn,
  initiateGoogleSignIn,
  initiateAppleSignIn,
  useFirestore,
  setDocumentNonBlocking
} from "@/firebase";
import { doc, serverTimestamp } from "firebase/firestore";
import { toast } from "@/hooks/use-toast";
import { sendOtpToEmail, verifyOtp } from "@/services/otp-service";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";

type AuthStep = "register" | "confirm_send" | "otp" | "login";

export default function LoginPage() {
  const [step, setStep] = useState<AuthStep>("register");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  
  const auth = useAuth();
  const db = useFirestore();
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    let interval: any;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleRegisterDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast({ variant: "destructive", title: "Policy Agreement Required", description: "You must agree to the Terms and Privacy Policy to create an account." });
      return;
    }
    if (!email.includes('@')) {
      toast({ variant: "destructive", title: "Invalid Email", description: "Please enter a valid scholarly address." });
      return;
    }
    if (fullName.length < 2) {
      toast({ variant: "destructive", title: "Name Required", description: "Please enter your full scholarly name." });
      return;
    }
    if (password.length < 6) {
      toast({ variant: "destructive", title: "Weak Access Key", description: "Password must be at least 6 characters." });
      return;
    }
    if (password !== confirmPassword) {
      toast({ variant: "destructive", title: "Key Mismatch", description: "Passwords do not match. Please verify your access key." });
      return;
    }
    setStep("confirm_send");
  };

  const handleConfirmSendOtp = async (confirm: boolean) => {
    if (!confirm) {
      setStep("register");
      return;
    }

    setIsLoading(true);
    const success = await sendOtpToEmail(email);
    if (success) {
      setStep("otp");
      setResendTimer(60);
      toast({
        title: "Verification Dispatched",
        description: "A 6-digit OTP has been sent to your node address.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Dispatch Error",
        description: "Failed to generate verification token.",
      });
    }
    setIsLoading(false);
  };

  const handleOtpVerifyAndSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) return;

    setIsLoading(true);
    const isValid = await verifyOtp(email, fullOtp);
    if (isValid) {
      try {
        await initiateEmailSignUp(auth, email, password);
        toast({
          title: "Infrastructure Initialized",
          description: `Welcome, ${fullName}. Your scholarly node is now active.`,
        });
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Creation Error",
          description: error.message,
        });
        setIsLoading(false);
      }
    } else {
      toast({
        variant: "destructive",
        title: "Verification Failed",
        description: "The provided OTP does not match our records.",
      });
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 py-10">
      <header className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-4 relative ring-8 ring-primary/5">
          <ShieldCheck className="w-8 h-8 text-primary" />
          {step === "otp" && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-background animate-in zoom-in">
              <CheckCircle2 className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        <h1 className="text-3xl font-headline font-bold tracking-tight text-white uppercase tracking-widest">Access Node</h1>
        <p className="text-muted-foreground italic text-sm">Verified Entry into the Scholarly Infrastructure.</p>
      </header>

      <Card className="glass-card border-none shadow-2xl relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-50 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <p className="text-[10px] uppercase font-bold tracking-widest text-primary animate-pulse">Syncing Node...</p>
          </div>
        )}
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-headline text-lg uppercase tracking-tight">
              {step === "register" && "Student Registration"}
              {step === "confirm_send" && "Confirm Dispatch"}
              {step === "otp" && "Node Verification"}
              {step === "login" && "Scholar Sign In"}
            </CardTitle>
            {step !== "register" && step !== "login" && (
              <button onClick={() => setStep("register")} className="text-[10px] uppercase font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Back
              </button>
            )}
          </div>
          <CardDescription className="text-xs">
            {step === "register" && "Enter your identity details to begin initialization."}
            {step === "confirm_send" && "Verify your node via OTP dispatch."}
            {step === "otp" && `Input the 6-digit code dispatched to ${email}`}
            {step === "login" && "Connect to the Universal Node Infrastructure."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === "register" && (
            <form onSubmit={handleRegisterDetailsSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="email"
                    placeholder="Email address"
                    className="pl-10 bg-secondary/20 h-12 border-white/5"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Full Name"
                    className="pl-10 bg-secondary/20 h-12 border-white/5"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="password"
                    placeholder="Set Access Password"
                    className="pl-10 bg-secondary/20 h-12 border-white/5"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="password"
                    placeholder="Confirm Access Password"
                    className="pl-10 bg-secondary/20 h-12 border-white/5"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="flex items-start gap-3 p-4 bg-secondary/10 rounded-xl border border-white/5 group">
                  <Checkbox 
                    id="terms" 
                    checked={agreed} 
                    onCheckedChange={(checked) => setAgreed(checked as boolean)}
                    className="mt-1 border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <div className="space-y-1">
                    <Label htmlFor="terms" className="text-xs font-medium leading-relaxed cursor-pointer select-none">
                      I agree to the <Link href="/terms" className="text-primary hover:underline font-bold">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline font-bold">Privacy Infrastructure</Link> protocols.
                    </Label>
                    <p className="text-[10px] text-muted-foreground italic">
                      My data is an Amanah governed by 1 billion privacy nodes.
                    </p>
                  </div>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-12 text-md font-headline gap-2 bg-primary hover:bg-primary/90 uppercase tracking-widest disabled:opacity-50 disabled:grayscale"
                disabled={!agreed}
              >
                Continue Registration <ChevronRight className="w-4 h-4" />
              </Button>
              <div className="text-center pt-2">
                <button 
                  type="button" 
                  onClick={() => setStep("login")}
                  className="text-[10px] text-primary font-bold uppercase tracking-widest hover:underline"
                >
                  Already have an account? Sign In
                </button>
              </div>
            </form>
          )}

          {step === "confirm_send" && (
            <div className="space-y-6 py-4">
              <div className="p-6 bg-secondary/20 rounded-2xl border border-white/5 text-center space-y-4">
                <UserPlus className="w-10 h-10 text-primary mx-auto opacity-50" />
                <div className="space-y-1">
                  <p className="text-sm font-bold">{fullName}</p>
                  <p className="text-[10px] text-muted-foreground uppercase">{email}</p>
                </div>
                <div className="h-px w-full bg-white/5" />
                <p className="text-sm font-headline uppercase tracking-widest font-bold text-primary">Send OTP? (y/n)</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-12 uppercase font-bold" onClick={() => handleConfirmSendOtp(false)}>
                  No (Back)
                </Button>
                <Button className="h-12 uppercase font-bold bg-emerald-600 hover:bg-emerald-700" onClick={() => handleConfirmSendOtp(true)}>
                  Yes (Send)
                </Button>
              </div>
            </div>
          )}

          {step === "otp" && (
            <form onSubmit={handleOtpVerifyAndSignUp} className="space-y-6">
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
              <div className="space-y-3">
                <Button type="submit" className="w-full h-12 text-md font-headline gap-2" disabled={otp.join("").length < 6}>
                  Verify & Activate Node <ShieldCheck className="w-4 h-4" />
                </Button>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest italic">
                    Check your console logs or email inbox for the code.
                  </p>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    className="text-[9px] uppercase tracking-widest h-8 gap-2 font-bold" 
                    disabled={resendTimer > 0}
                    onClick={() => handleConfirmSendOtp(true)}
                  >
                    {resendTimer > 0 ? `Resend Cooldown: ${resendTimer}s` : <><RefreshCcw className="w-3 h-3" /> Auto-Resend OTP</>}
                  </Button>
                </div>
              </div>
            </form>
          )}

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
                    placeholder="Password"
                    className="pl-10 bg-secondary/20 h-12 border-white/5"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 text-md font-headline uppercase tracking-widest">
                Sign In
              </Button>
              <div className="text-center pt-2">
                <button 
                  type="button" 
                  onClick={() => setStep("register")}
                  className="text-[10px] text-primary font-bold uppercase tracking-widest hover:underline"
                >
                  New Student? Register with OTP
                </button>
              </div>
            </form>
          )}

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5" /></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest"><span className="bg-[#0a0304] px-2 text-muted-foreground opacity-40">Verification Nodes</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12 glass-card gap-2 border-white/5" onClick={() => initiateGoogleSignIn(auth)} disabled={isLoading}>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="h-12 glass-card gap-2 border-white/5" onClick={() => initiateAppleSignIn(auth)} disabled={isLoading}>
              <Apple className="w-4 h-4" /> Apple
            </Button>
          </div>

          <Button variant="ghost" className="w-full text-[9px] uppercase tracking-[0.2em] text-muted-foreground opacity-40" onClick={() => initiateAnonymousSignIn(auth)} disabled={isLoading}>
            Continue as Guest Node
          </Button>
        </CardContent>
      </Card>

      <footer className="text-center opacity-30">
        <p className="text-[9px] text-muted-foreground uppercase tracking-[0.4em]">© 2025 Islamly Universal Security Hub</p>
      </footer>
    </div>
  );
}
