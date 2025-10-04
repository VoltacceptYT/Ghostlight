"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { GhostShellCard } from "./ghost-shell-card"
import { Skeleton } from "./ui/skeleton"
import { Ghost } from "lucide-react"

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-lg" />
        ))}
      </div>
    )
  }

  if (ghostShells.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
        <Ghost className="h-16 w-16 text-muted-foreground" aria-hidden="true" />
        <div>
          <p className="text-2xl md:text-3xl font-semibold">Eyes Up Guardian</p>
          <p className="text-sm md:text-base text-muted-foreground">There's Always More Ghosts to Be Found</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {ghostShells.length} Ghost Shell{ghostShells.length !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {ghostShells.map((shell) => (
          <GhostShellCard key={shell.hash} ghostShell={shell} />
        ))}
      </div>
    </div>
  )
}
