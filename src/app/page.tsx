import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookMarked, 
  Search, 
  ArrowRight, 
  Moon, 
  Library, 
  Sparkles, 
  Scale, 
  UserPlus, 
  Globe, 
  Baby, 
  Video,
  MessageCircle,
  ShieldAlert,
  Clock,
  BookOpen,
  Languages,
  MapPin,
  Utensils,
  Home as HomeIcon,
  Zap,
  Newspaper,
  Trophy,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

export default function Home() {
  const libraryImage = PlaceHolderImages.find(img => img.id === 'library-books');

  const categories = [
    { 
      group: "Core Knowledge",
      items: [
        { title: "Quran", href: "/quran", icon: BookMarked, color: "text-primary" },
        { title: "Library", href: "/library", icon: Library, color: "text-accent" },
        { title: "Fiqh", href: "/fiqh", icon: Scale, color: "text-primary" },
        { title: "Hadith", href: "/library", icon: Search, color: "text-accent" },
      ]
    },
    {
      group: "Interactive Learning",
      items: [
        { title: "Quizzes", href: "/quiz", icon: Trophy, color: "text-yellow-500" },
        { title: "Ask AI", href: "/ask", icon: MessageCircle, color: "text-primary" },
        { title: "Explain", href: "/explain", icon: Sparkles, color: "text-accent" },
        { title: "Defense", href: "/refutation", icon: ShieldAlert, color: "text-destructive" },
      ]
    },
    {
      group: "Practical & Community",
      items: [
        { title: "Ruqyah", href: "/ruqyah", icon: ShieldCheck, color: "text-accent" },
        { title: "Masjids", href: "/masjid-locator", icon: MapPin, color: "text-primary" },
        { title: "Halal Finder", href: "/halal-locator", icon: Utensils, color: "text-accent" },
        { title: "Islamic News", href: "/news", icon: Newspaper, color: "text-primary" },
      ]
    },
    {
      group: "Household & Youth",
      items: [
        { title: "Families", href: "/family", icon: HomeIcon, color: "text-primary" },
        { title: "Youth Hub", href: "/teens", icon: Zap, color: "text-accent" },
        { title: "Reverts", href: "/reverts", icon: UserPlus, color: "text-primary" },
        { title: "Live Streams", href: "/live", icon: Video, color: "text-primary" },
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl font-headline font-bold tracking-tight text-foreground">
          Assalamu Alaikum
        </h1>
        <div className="flex items-center gap-2">
          <p className="text-muted-foreground text-lg italic">
            Your portal to authentic Islamic knowledge.
          </p>
          <Badge variant="outline" className="text-[10px] gap-1 py-0 border-primary/30 text-primary">
            <Languages className="w-3 h-3" />
            7709+ Languages
          </Badge>
        </div>
      </header>

      {/* Quick Status Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Next Prayer</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
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

        <Card className="glass-card border-l-4 border-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Daily Challenge</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">Aqidah Quiz</div>
            <Link href="/quiz" className="text-xs text-yellow-500 hover:underline flex items-center gap-1 mt-1">
              Test your knowledge <ArrowRight className="w-3 h-3" />
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Hero Section */}
      <section className="relative h-[220px] rounded-2xl overflow-hidden group shadow-2xl">
        <Image 
          src={libraryImage?.imageUrl || "https://picsum.photos/seed/lib/800/400"} 
          alt="Library"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          data-ai-hint="library books"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 space-y-1">
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-primary text-white">Verified Sources</Badge>
            <Badge variant="outline" className="bg-black/20 text-white backdrop-blur-sm border-white/20">Universal Translation</Badge>
          </div>
          <h2 className="text-2xl font-headline font-bold">Universal Reach Support</h2>
          <p className="text-sm text-muted-foreground max-w-md line-clamp-1">
            Access Quranic translations and scholarly insights in 7709+ languages.
          </p>
          <div className="flex gap-2 mt-4">
            <Button asChild size="sm" className="h-8">
              <Link href="/ask">Try Global Search</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="h-8 glass-card">
              <Link href="/news">Latest News</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Groups */}
      {categories.map((group) => (
        <section key={group.group} className="space-y-4">
          <h3 className="text-sm font-headline font-bold uppercase tracking-widest text-muted-foreground/80 pl-1">
            {group.group}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {group.items.map((item) => (
              <Link key={item.title} href={item.href}>
                <Card className="glass-card hover:border-primary/50 transition-all group h-full">
                  <CardContent className="flex flex-col items-center justify-center p-5 text-center gap-3">
                    <div className={cn("p-3 rounded-2xl bg-secondary/50 group-hover:bg-primary/20 transition-colors", item.color)}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-headline font-semibold text-xs uppercase tracking-tight">{item.title}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* Daily Quote */}
      <section className="py-6 pb-20">
        <Card className="bg-secondary/20 border-border/50 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <BookMarked className="w-24 h-24 rotate-12" />
          </div>
          <CardContent className="p-8 text-center space-y-4 relative z-10">
            <p className="text-3xl font-serif text-literata italic" dir="rtl">
              إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ
            </p>
            <p className="text-muted-foreground text-sm italic">
              "It is You we worship and You we ask for help."
            </p>
            <div className="flex flex-col items-center gap-2">
              <Badge variant="outline" className="text-[10px] uppercase tracking-widest text-primary font-headline">
                Surah Al-Fatiha [1:5]
              </Badge>
              <span className="text-[9px] text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                <Globe className="w-2 h-2" />
                Universal Message for All Humanity
              </span>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
