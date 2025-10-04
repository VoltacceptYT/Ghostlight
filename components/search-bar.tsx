"use client"

import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useTransition } from "react"

const RARITIES = [
  { id: "exotic", label: "Exotic", color: "text-yellow-500" },
  { id: "legendary", label: "Legendary", color: "text-purple-500" },
  { id: "rare", label: "Rare", color: "text-blue-500" },
  { id: "uncommon", label: "Uncommon", color: "text-green-500" },
  { id: "common", label: "Common", color: "text-gray-500" },
]

export function SearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState(searchParams.get("search") || "")

  const selectedRarities = searchParams.get("rarities")?.split(",").filter(Boolean) || []

  const handleSearch = (value: string) => {
    setSearch(value)
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set("search", value)
      } else {
        params.delete("search")
      }
      router.push(`/?${params.toString()}`)
    })
  }

  const toggleRarity = (rarityId: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString())
      const current = params.get("rarities")?.split(",").filter(Boolean) || []

      const updated = current.includes(rarityId) ? current.filter((r) => r !== rarityId) : [...current, rarityId]

      if (updated.length > 0) {
        params.set("rarities", updated.join(","))
      } else {
        params.delete("rarities")
      }

      router.push(`/?${params.toString()}`)
    })
  }

  return (
    <div className="space-y-3 max-w-2xl mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search Ghost Shells..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-12 h-14 text-lg bg-background border-border"
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="lg" className="h-14 px-6 relative bg-transparent">
              <Filter className="h-5 w-5" />
              {selectedRarities.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                  {selectedRarities.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" align="end">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-3">Filter by Rarity</h4>
                <div className="space-y-3">
                  {RARITIES.map((rarity) => (
                    <div key={rarity.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={rarity.id}
                        checked={selectedRarities.includes(rarity.id)}
                        onCheckedChange={() => toggleRarity(rarity.id)}
                      />
                      <label
                        htmlFor={rarity.id}
                        className={`text-sm font-medium leading-none cursor-pointer ${rarity.color}`}
                      >
                        {rarity.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {selectedRarities.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent"
                  onClick={() => {
                    startTransition(() => {
                      const params = new URLSearchParams(searchParams.toString())
                      params.delete("rarities")
                      router.push(`/?${params.toString()}`)
                    })
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {selectedRarities.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedRarities.map((rarityId) => {
            const rarity = RARITIES.find((r) => r.id === rarityId)
            return (
              <Badge key={rarityId} variant="secondary" className="gap-1">
                <span className={rarity?.color}>{rarity?.label}</span>
              </Badge>
            )
          })}
        </div>
      )}
    </div>
  )
}
