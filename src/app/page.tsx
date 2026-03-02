import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookMarked, Search, ArrowRight, Sun, Moon, MapPin, Library, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

export default function Home() {
  const libraryImage = PlaceHolderImages.find(img => img.id === 'library-books');

  const mainFeatures = [
    { title: "Quran Study", href: "/quran", icon: BookMarked, color: "text-primary" },
    { title: "Hadith Explorer", href: "/hadith", icon: Search, color: "text-accent" },
    { title: "Seerah Navigator", href: "/seerah", icon: BookMarked, color: "text-primary" },
    { title: "AI Explanation", href: "/explain", icon: Sparkles, color: "text-accent" },
    { title: "Islamic Quizzes", href: "/quizzes", icon: MessageCircleQuestionIcon, color: "text-primary" },
    { title: "Text Library", href: "/library", icon: Library, color: "text-accent" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-headline font-bold tracking-tight text-foreground">
          Assalamu Alaikum
        </h1>
        <p className="text-muted-foreground text-lg italic">
          Welcome to the Path of Authentic Knowledge.
        </p>
      </header>

      {/* Quick Stats / Prayer Times Summary */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Next Prayer</CardTitle>
            <ClockIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Dhuhr</div>
            <p className="text-xs text-muted-foreground">In 2 hours 15 minutes</p>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Daily Adhkar</CardTitle>
            <Moon className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">Evening Adhkar</div>
            <Link href="/adhkar" className="text-xs text-accent hover:underline flex items-center gap-1 mt-1">
              Read now <ArrowRight className="w-3 h-3" />
            </Link>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Current Location</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">London, UK</div>
            <p className="text-xs text-muted-foreground">Islamic Relief Method</p>
          </CardContent>
        </Card>
      </section>

      {/* Hero Section */}
      <section className="relative h-[250px] rounded-2xl overflow-hidden group shadow-2xl">
        <Image 
          src={libraryImage?.imageUrl || "https://picsum.photos/seed/lib/800/400"} 
          alt="Library"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          data-ai-hint="library books"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 space-y-2">
          <Badge variant="secondary" className="bg-primary text-white">Classic of the Week</Badge>
          <h2 className="text-2xl font-headline font-bold">Kitab At-Tawhid</h2>
          <p className="text-sm text-muted-foreground max-w-md line-clamp-2">
            The masterpiece by Sheikh-ul-Islam Muhammad ibn Abdil-Wahhab regarding the core of Islamic faith.
          </p>
          <Button asChild size="sm" className="mt-4">
            <Link href="/library/kitab-at-tawhid">Read Now</Link>
          </Button>
        </div>
      </section>

      {/* Main Feature Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {mainFeatures.map((item) => (
          <Link key={item.title} href={item.href}>
            <Card className="glass-card hover:border-primary/50 transition-all group h-full">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center gap-3">
                <div className={cn("p-3 rounded-full bg-secondary/50 group-hover:bg-primary/20 transition-colors", item.color)}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="font-headline font-semibold text-sm">{item.title}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Daily Verse */}
      <section className="py-8">
        <h3 className="text-lg font-headline font-semibold mb-4 border-l-2 border-primary pl-3">Daily Reflection</h3>
        <Card className="bg-secondary/20 border-border/50">
          <CardContent className="p-8 text-center space-y-4">
            <p className="text-3xl font-serif text-literata italic" dir="rtl">
              إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ
            </p>
            <p className="text-muted-foreground">
              "It is You we worship and You we ask for help."
            </p>
            <p className="text-xs uppercase tracking-widest text-primary font-headline font-bold">
              Surah Al-Fatiha [1:5]
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function MessageCircleQuestionIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
}
