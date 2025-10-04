import Image from "next/image"
import { SearchBar } from "@/components/search-bar"
import { GhostShellGrid } from "@/components/ghost-shell-grid"
import { Suspense, useEffect, useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
              <Image src="/favicon.ico" alt="Logo" width={32} height={32} className="h-8 w-8 sm:h-10 sm:w-10 logo-theme-invert" />
            <span className="text-lg font-semibold tracking-tight">VoltaTECH</span>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground hidden sm:block">LoyalLight</p>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-balance">
              LoyalLight by VoltaTECH
            </h1>
            <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
              Browse and search through every Ghost Shell in Destiny 2. Find your perfect companion.
            </p>
          </div>

          {/* Search Bar */}
          <Suspense fallback={<div className="h-14" />}>
            <SearchBar />
          </Suspense>

          {/* Ghost Shell Grid */}
          <Suspense fallback={<div className="text-center py-12">Loading Ghost Shells...</div>}>
            <GhostShellGrid />
          </Suspense>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="container mx-auto px-6 py-8">
          <p className="text-sm text-muted-foreground text-center">
            VoltaTECH is not affiliated with or endorsed by Bungie. All Destiny content and materials are trademarks and
            copyrights of Bungie.
          </p>
        </div>
      </footer>
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gray-800 text-white rounded-full p-3 shadow-lg hover:bg-gray-700 transition-colors"
          aria-label="Return to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  )
}
