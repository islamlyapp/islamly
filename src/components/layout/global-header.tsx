"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const THEME_KEY = "islamly-theme";

export default function GlobalHeader() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedTheme = typeof window !== "undefined" ? window.localStorage.getItem(THEME_KEY) : null;
    const preferredTheme = storedTheme
      ? (storedTheme as "light" | "dark")
      : window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";

    setTheme(preferredTheme);
    document.documentElement.classList.toggle("light", preferredTheme === "light");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.classList.toggle("light", nextTheme === "light");
    window.localStorage.setItem(THEME_KEY, nextTheme);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/10 bg-slate-950/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-3xl border border-slate-200/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
            <Image
              src="/logo.png"
              alt="Islamly logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold text-white">Islamly</span>
            <span className="text-xs text-slate-300">Classical insight for modern life</span>
          </div>
        </Link>

        <button
          type="button"
          onClick={toggleTheme}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-slate-200/10 bg-white/10 px-4 text-sm text-slate-100 transition hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white/15"
        >
          {mounted && theme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {mounted ? (theme === "light" ? "Light" : "Dark") : "Theme"}
        </button>
      </div>
    </header>
  );
}
