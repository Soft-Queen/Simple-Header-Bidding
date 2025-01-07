# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# Header Bidding Demo

A React-based header bidding implementation using Prebid.js for programmatic advertising.

## Features

- Real-time header bidding auctions
- Multiple SSP integration (AppNexus, Rubicon, OpenX)
- Responsive ad units
- TypeScript support
- Tailwind CSS styling

## Prerequisites

- Node.js 22.1.0
- NPM 
- SSP accounts and credentials, but not set

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Configuration

Update SSP credentials in `src/config/bidders.ts` with actual credentials:

```typescript
export const bidders: Bidder[] = [
  {
    name: 'appnexus',
    params: {
      placementId: 'No Value yet'
    }
  },
  // Add other SSP configurations
];
```

## Ad Units

Currently supports:
- Leaderboard (728x90)
- Billboard (970x250)
- Medium Rectangle (300x250)
- Half Page (300x600)

## Project Structure

```
src/
├── components/
│   └── AdUnit.tsx       # Ad unit component
├── services/
│   └── headerBidding.ts # Header bidding service
├── config/
│   └── bidders.ts       # SSP configuration
└── types/
    └── prebid.d.ts      # TypeScript definitions
```

## Development

1. Configure SSP credentials
2. Add ad units to your layout
3. Initialize header bidding service
4. Handle bid responses

Example:
```typescript
<AdUnit 
  id="banner-ad"
  sizes={[[728, 90]]}
  className="my-4"
/>
```

## Production Deployment

1. Update SSP credentials for production
2. Build the project: `npm run build`
3. Deploy the `dist` directory

## License

MIT

## Support

For SSP integration support:
- AppNexus: [docs.xandr.com](https://docs.xandr.com)
- Rubicon: [rubiconproject.com/docs](https://rubiconproject.com/docs)
- OpenX: [docs.openx.com](https://docs.openx.com)
