import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "VoltaTECH - LoyalLight",
  description: "LoyalLight by VoltaTECH is a comprehensive, searchable database of Destiny 2 Ghost Shells. Designed for enthusiasts and developers alike, it offers fast lookup, rich metadata, and stunning visuals.",
  generator: "v0.app",
  icons: {
    icon: "favicon.ico",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" }, // light theme background
    { media: "(prefers-color-scheme: dark)", color: "#18181b" },  // dark theme background
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider>
          <div
            className="min-h-screen w-full flex justify-center bg-background"
          >
            <div
              className="w-full max-w-screen-xl px-2 sm:px-4 md:px-8 lg:px-16 xl:px-24 py-4 flex flex-col"
            >
              {/* Responsive container: mobile (default), tablet (md), PC (lg+) */}
              <Suspense fallback={null}>{children}</Suspense>
            </div>
          </div>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
