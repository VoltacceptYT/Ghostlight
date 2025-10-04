import { type NextRequest, NextResponse } from "next/server"

const BUNGIE_API_KEY = process.env.BUNGIE_API_KEY!

// Ghost Shell item type
const GHOST_ITEM_TYPE = 24

// Tier type mappings
const TIER_TYPES = {
  exotic: 6,
  legendary: 5,
  rare: 4,
  uncommon: 3,
  common: 2,
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const searchQuery = searchParams.get("search") || ""
    const raritiesParam = searchParams.get("rarities") || ""
    const selectedRarities = raritiesParam.split(",").filter(Boolean)

    console.log("[v0] Fetching Ghost Shells from Bungie manifest...")
    console.log("[v0] Selected rarities:", selectedRarities)
    console.log("[v0] Text search:", searchQuery)

    // First, get the manifest
    const manifestResponse = await fetch("https://www.bungie.net/Platform/Destiny2/Manifest/", {
      headers: {
        "X-API-Key": BUNGIE_API_KEY,
      },
    })

    if (!manifestResponse.ok) {
      throw new Error("Failed to fetch manifest")
    }

    const manifestData = await manifestResponse.json()
    const inventoryItemPath = manifestData.Response.jsonWorldComponentContentPaths.en.DestinyInventoryItemDefinition

    console.log("[v0] Fetching inventory item definitions...")

    // Fetch the inventory item definitions
    const itemsResponse = await fetch(`https://www.bungie.net${inventoryItemPath}`)
    const allItems = await itemsResponse.json()

    console.log("[v0] Filtering for Ghost Shells...")

    // Filter for Ghost Shells only
    const ghostShells = Object.entries(allItems)
      .filter(([_, item]: [string, any]) => {
        return item.itemType === GHOST_ITEM_TYPE && item.displayProperties?.name && !item.redacted
      })
      .map(([hash, item]: [string, any]) => ({
        hash: Number.parseInt(hash),
        name: item.displayProperties.name,
        description: item.displayProperties.description || "",
        icon: item.displayProperties.icon || "",
        tierType: item.inventory?.tierType || 2,
        tierTypeName: item.inventory?.tierTypeName || "Common",
      }))
      .filter((shell) => {
        if (selectedRarities.length > 0) {
          const shellRarity = Object.entries(TIER_TYPES).find(([_, tierType]) => tierType === shell.tierType)?.[0]

          if (!shellRarity || !selectedRarities.includes(shellRarity)) {
            return false
          }
        }

        // Apply text search
        if (!searchQuery) return true
        return shell.name.toLowerCase().includes(searchQuery.toLowerCase())
      })
      .sort((a, b) => {
        // Sort by tier (highest first), then alphabetically
        if (a.tierType !== b.tierType) {
          return b.tierType - a.tierType
        }
        return a.name.localeCompare(b.name)
      })

    console.log(`[v0] Found ${ghostShells.length} Ghost Shells`)

    return NextResponse.json({
      ghostShells,
      total: ghostShells.length,
    })
  } catch (error) {
    console.error("[v0] Error fetching Ghost Shells:", error)
    return NextResponse.json({ error: "Failed to fetch Ghost Shells" }, { status: 500 })
  }
}
