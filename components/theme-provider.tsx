"use client"

import type { ReactNode } from "react"
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps & { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      value={{
        light: "light",
        dark: "dark",
        "discord-dark": "discord-dark",
        "discord-light": "discord-light",
      }}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
