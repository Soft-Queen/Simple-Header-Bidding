export class FloorPriceService {
    private readonly baseFloorPrices = {
      '728x90': 1.0,   // Leaderboard
      '300x250': 0.8,  // Medium Rectangle
      '300x600': 1.2,  // Half Page
      '970x250': 1.5   // Billboard
    };
  
    private readonly deviceMultipliers = {
      mobile: 0.8,
      desktop: 1.0
    };
  
    public getFloorPrice(sizes: number[][], deviceType: 'mobile' | 'desktop'): number {
      const sizeKey = sizes[0].join('x');
      const basePrice = this.baseFloorPrices[sizeKey] || 0.5;
      const multiplier = this.deviceMultipliers[deviceType];
      
      return basePrice * multiplier;
    }
  }