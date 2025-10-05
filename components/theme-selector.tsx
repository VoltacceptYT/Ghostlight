"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Sun, Moon, Palette } from "lucide-react";
import { useState, useEffect } from "react";

const themes = [
  { key: "light", label: "Default Light", icon: <Sun className="size-4" /> },
  { key: "dark", label: "Default Dark", icon: <Moon className="size-4" /> },
//  { key: "abyssal", label: "Abyssal Harbinger", icon: <Palette className="size-4 text-red-700" /> },
];

export function ThemeSelector() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const current = theme ?? resolvedTheme;
  const currentTheme = themes.find(t => t.key === current) || themes[0];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Select theme" className="relative">
          {currentTheme.icon}
          <span className="sr-only">Select theme</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 p-2">
        <div className="flex flex-col gap-1">
          {themes.map(t => (
            <Button
              key={t.key}
              variant={current === t.key ? "secondary" : "ghost"}
              size="sm"
              className="justify-start gap-2"
              onClick={() => setTheme(t.key)}
            >
              {t.icon}
              {t.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
