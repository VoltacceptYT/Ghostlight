"use client"

import Image from "next/image"
import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface GhostShell {
  hash: number
  name: string
  description: string
  icon: string
  tierType: number
  tierTypeName: string
}

const TIER_COLORS = {
  6: "border-yellow-500/50 bg-yellow-500/5", // Exotic
  5: "border-purple-500/50 bg-purple-500/5", // Legendary
  4: "border-blue-500/50 bg-blue-500/5", // Rare
  3: "border-green-500/50 bg-green-500/5", // Uncommon
  2: "border-gray-500/50 bg-gray-500/5", // Common
}

export function GhostShellCard({ ghostShell }: { ghostShell: GhostShell }) {
  const [imageError, setImageError] = useState(false)
  const [open, setOpen] = useState(false)
  const tierColor = TIER_COLORS[ghostShell.tierType as keyof typeof TIER_COLORS] || TIER_COLORS[2]

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`group relative rounded-lg border-2 ${tierColor} p-4 transition-all hover:scale-105 hover:shadow-lg text-left w-full`}
      >
        <div className="aspect-square relative mb-3 rounded-md bg-muted/50 flex items-center justify-center overflow-hidden">
          {!imageError && ghostShell.icon ? (
            <Image
              src={`https://www.bungie.net${ghostShell.icon}`}
              alt={ghostShell.name}
              width={128}
              height={128}
              className="object-contain p-2 max-w-[128px] max-h-[128px]"
              onError={() => setImageError(true)}
            />
          ) : (
            <Sparkles className="h-12 w-12 text-muted-foreground" />
          )}
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">{ghostShell.tierTypeName}</p>
          <h3 className="font-semibold text-sm leading-tight line-clamp-2">{ghostShell.name}</h3>
        </div>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{ghostShell.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex items-start gap-6">
              <div
                className={`relative w-32 h-32 rounded-lg border-2 ${tierColor} flex items-center justify-center flex-shrink-0`}
              >
                {!imageError && ghostShell.icon ? (
                  <Image
                    src={`https://www.bungie.net${ghostShell.icon}`}
                    alt={ghostShell.name}
                    width={128}
                    height={128}
                    className="object-contain p-3 max-w-[128px] max-h-[128px]"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <Sparkles className="h-16 w-16 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Rarity</p>
                  <p className="font-medium">{ghostShell.tierTypeName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Hash</p>
                  <p className="font-mono text-sm">{ghostShell.hash}</p>
                </div>
              </div>
            </div>
            {ghostShell.description && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Description</p>
                <p className="text-sm leading-relaxed">{ghostShell.description}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
