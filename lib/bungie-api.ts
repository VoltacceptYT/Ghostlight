const BUNGIE_API_KEY = process.env.BUNGIE_API_KEY
const BUNGIE_API_BASE = "https://www.bungie.net/Platform"

export interface BungieProfile {
  membershipId: string
  membershipType: number
  displayName: string
  iconPath: string
}

export interface Character {
  characterId: string
  classType: number
  raceType: number
  genderType: number
  light: number
  emblemPath: string
  emblemBackgroundPath: string
}

export interface InventoryItem {
  itemInstanceId: string
  itemHash: number
  quantity: number
  bindStatus: number
  location: number
  bucketHash: number
  transferStatus: number
  lockable: boolean
  state: number
}

export class BungieAPIError extends Error {
  constructor(
    message: string,
    public code?: number,
    public status?: number,
  ) {
    super(message)
    this.name = "BungieAPIError"
  }
}

async function handleBungieResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    const errorMessage = errorData.Message || errorData.message || "Unknown Bungie API error"
    throw new BungieAPIError(errorMessage, errorData.ErrorCode, response.status)
  }
  return response.json()
}

export async function getBungieProfile(accessToken: string, membershipId: string, membershipType: number) {
  const response = await fetch(
    `${BUNGIE_API_BASE}/Destiny2/${membershipType}/Profile/${membershipId}/?components=100,200,205`,
    {
      headers: {
        "X-API-Key": BUNGIE_API_KEY!,
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return handleBungieResponse(response)
}

export async function getCharacterInventory(
  accessToken: string,
  membershipType: number,
  membershipId: string,
  characterId: string,
) {
  const response = await fetch(
    `${BUNGIE_API_BASE}/Destiny2/${membershipType}/Profile/${membershipId}/Character/${characterId}/?components=201,205`,
    {
      headers: {
        "X-API-Key": BUNGIE_API_KEY!,
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )

  return handleBungieResponse(response)
}

export async function transferItem(
  accessToken: string,
  itemReferenceHash: number,
  stackSize: number,
  transferToVault: boolean,
  itemId: string,
  characterId: string,
  membershipType: number,
) {
  console.log("[v0] Transferring item:", {
    itemId,
    itemHash: itemReferenceHash,
    transferToVault,
    characterId,
  })

  const response = await fetch(`${BUNGIE_API_BASE}/Destiny2/Actions/Items/TransferItem/`, {
    method: "POST",
    headers: {
      "X-API-Key": BUNGIE_API_KEY!,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      itemReferenceHash,
      stackSize,
      transferToVault,
      itemId,
      characterId,
      membershipType,
    }),
  })

  return handleBungieResponse(response)
}

export async function equipItem(accessToken: string, itemId: string, characterId: string, membershipType: number) {
  console.log("[v0] Equipping item:", { itemId, characterId })

  const response = await fetch(`${BUNGIE_API_BASE}/Destiny2/Actions/Items/EquipItem/`, {
    method: "POST",
    headers: {
      "X-API-Key": BUNGIE_API_KEY!,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      itemId,
      characterId,
      membershipType,
    }),
  })

  return handleBungieResponse(response)
}

export async function equipItems(accessToken: string, itemIds: string[], characterId: string, membershipType: number) {
  console.log("[v0] Equipping multiple items:", { itemIds, characterId })

  const response = await fetch(`${BUNGIE_API_BASE}/Destiny2/Actions/Items/EquipItems/`, {
    method: "POST",
    headers: {
      "X-API-Key": BUNGIE_API_KEY!,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      itemIds,
      characterId,
      membershipType,
    }),
  })

  return handleBungieResponse(response)
}

export async function setItemLockState(
  accessToken: string,
  itemId: string,
  characterId: string,
  membershipType: number,
  state: boolean,
) {
  const response = await fetch(`${BUNGIE_API_BASE}/Destiny2/Actions/Items/SetLockState/`, {
    method: "POST",
    headers: {
      "X-API-Key": BUNGIE_API_KEY!,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      state,
      itemId,
      characterId,
      membershipType,
    }),
  })

  return handleBungieResponse(response)
}

export async function pullFromPostmaster(
  accessToken: string,
  itemReferenceHash: number,
  stackSize: number,
  itemId: string,
  characterId: string,
  membershipType: number,
) {
  const response = await fetch(`${BUNGIE_API_BASE}/Destiny2/Actions/Items/PullFromPostmaster/`, {
    method: "POST",
    headers: {
      "X-API-Key": BUNGIE_API_KEY!,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      itemReferenceHash,
      stackSize,
      itemId,
      characterId,
      membershipType,
    }),
  })

  return handleBungieResponse(response)
}

// Helper function to get class name from classType
export function getClassName(classType: number): string {
  switch (classType) {
    case 0:
      return "Titan"
    case 1:
      return "Hunter"
    case 2:
      return "Warlock"
    default:
      return "Unknown"
  }
}

// Helper function to get race name from raceType
export function getRaceName(raceType: number): string {
  switch (raceType) {
    case 0:
      return "Human"
    case 1:
      return "Awoken"
    case 2:
      return "Exo"
    default:
      return "Unknown"
  }
}

export async function getCurrentUserMemberships(accessToken: string) {
  const response = await fetch(`${BUNGIE_API_BASE}/User/GetMembershipsForCurrentUser/`, {
    headers: {
      "X-API-Key": BUNGIE_API_KEY!,
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return handleBungieResponse(response)
}

export async function getItemDefinition(itemHash: number) {
  const response = await fetch(`${BUNGIE_API_BASE}/Destiny2/Manifest/DestinyInventoryItemDefinition/${itemHash}/`, {
    headers: {
      "X-API-Key": BUNGIE_API_KEY!,
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch item definition for hash ${itemHash}`)
  }

  return response.json()
}

export function getIconUrl(iconPath: string): string {
  return `https://www.bungie.net${iconPath}`
}

export async function getProfile(accessToken: string, membershipId: string, membershipType: number) {
  return getBungieProfile(accessToken, membershipId, membershipType)
}
