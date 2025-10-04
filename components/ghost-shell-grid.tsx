"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { GhostShellCard } from "./ghost-shell-card"
import { Skeleton } from "./ui/skeleton"
import Image from "next/image"

interface GhostShell {
  hash: number
  name: string
  description: string
  icon: string
  tierType: number
  tierTypeName: string
}

export function GhostShellGrid() {
  const searchParams = useSearchParams()
  const search = searchParams.get("search") || ""
  const rarities = searchParams.get("rarities") || ""
  const [ghostShells, setGhostShells] = useState<GhostShell[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGhostShells() {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        if (search) params.set("search", search)
        if (rarities) params.set("rarities", rarities)

        const response = await fetch(`/api/ghost-shells?${params.toString()}`)
        const data = await response.json()
        setGhostShells(data.ghostShells || [])
      } catch (error) {
        console.error("[v0] Error fetching ghost shells:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGhostShells()
  }, [search, rarities])

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5 xl:gap-8 px-2 sm:px-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <Skeleton key={i} className="h-44 sm:h-56 md:h-64 rounded-lg" />
        ))}
      </div>
    )
  }

  if (ghostShells.length === 0) {
    return (
      <div className="py-12 sm:py-20 flex flex-col items-center justify-center text-center space-y-4 px-2 sm:px-0">
        <Image src="happy_ghost.webp" alt="404 Ghost Not Found" width={128} height={128} aria-hidden className="max-w-[96px] sm:max-w-[128px] max-h-[96px] sm:max-h-[128px]" />
        <div>
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold">Eyes Up Guardian</p>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground">There's Always More Ghosts to Be Found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-4 sm:mb-6 px-2 sm:px-0">
        <p className="text-xs sm:text-sm text-muted-foreground">
          Showing {ghostShells.length} Ghost Shell{ghostShells.length !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-5 xl:gap-8 px-2 sm:px-0">
        {ghostShells.map((shell) => (
          <GhostShellCard key={shell.hash} ghostShell={shell} />
        ))}
      </div>
    </div>
  )
}
