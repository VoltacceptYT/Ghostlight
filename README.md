# VoltaTECH - D2IM (Destiny 2 Item Manager)

A lightning-fast Destiny 2 Item Manager built with Next.js and the Bungie API.

## Features

- **Bungie OAuth Authentication** - Secure login with your Bungie account
- **Character Management** - View all your Guardians with stats and power levels
- **Inventory Display** - Browse weapons, armor, and general items with filtering
- **Vault Access** - View and manage your vault items
- **Item Transfers** - Move items between characters and vault
- **Item Equipping** - Equip items directly from the manager
- **Search & Filter** - Quickly find items across your inventory

## Setup

1. **Register your app with Bungie**
   - Go to https://www.bungie.net/en/Application
   - Create a new application
   - Set the OAuth Client Type to "Confidential"
   - Add redirect URL: `http://localhost:3000/api/auth/bungie/callback`
   - Note your API Key, Client ID, and Client Secret

2. **Configure environment variables**
   - Copy `.env.example` to `.env.local`
   - Add your Bungie credentials:
     \`\`\`
     BUNGIE_API_KEY=your_api_key_here
     BUNGIE_CLIENT_ID=your_client_id_here
     BUNGIE_CLIENT_SECRET=your_client_secret_here
     BUNGIE_REDIRECT_URI=http://localhost:3000/api/auth/bungie/callback
     \`\`\`

3. **Install and run**
   \`\`\`bash
   npm install
   npm run dev
   \`\`\`

4. **Open the app**
   - Navigate to http://localhost:3000
   - Click "Connect with Bungie" to authenticate

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - Beautiful UI components
- **Bungie API** - Official Destiny 2 data access

## API Scopes Required

- `ReadDestinyInventoryAndVault` - View inventory and vault
- `MoveEquipDestinyItems` - Transfer and equip items

## Notes

- This app is not affiliated with or endorsed by Bungie
- Requires an active Destiny 2 account
- Some features require characters to be in orbit or social spaces
