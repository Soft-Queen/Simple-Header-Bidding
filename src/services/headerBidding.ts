import { bidders } from "../config/bidders";

export class HeaderBiddingService {
  private static instance: HeaderBiddingService;
  private initialized: boolean = false;

  // Private constructor for Singleton pattern
  private constructor() {}

  // Singleton instance getter
  public static getInstance(): HeaderBiddingService {
    if (!HeaderBiddingService.instance) {
      HeaderBiddingService.instance = new HeaderBiddingService();
    }
    return HeaderBiddingService.instance;
  }

  // Initialize Prebid.js
  public async initialize(): Promise<void> {
    if (this.initialized) return;

    // Ensure pbjs is defined
    window.pbjs = window.pbjs || { que: [] };

    // Push configuration setup to pbjs queue
    window.pbjs.que.push(() => {
      if (typeof window.pbjs.setConfig === 'function') {
        window.pbjs.setConfig({
          debug: true,
          enableSendAllBids: true,
          priceGranularity: 'dense',
          userSync: {
            filterSettings: {
              iframe: {
                bidders: '*',
                filter: 'include'
              }
            }
          }
        });
      } else {
        console.warn("setConfig is not available on pbjs");
      }
    });

    this.initialized = true;
  }

  // Request bids
  public async requestBids(adUnitCode: string, sizes: number[][]): Promise<any> {
    return new Promise((resolve, reject) => {
      // Define ad unit
      const adUnit = {
        code: adUnitCode,
        mediaTypes: {
          banner: {
            sizes: sizes
          }
        },
        bids: bidders.map(bidder => ({
          bidder: bidder.name,
          params: bidder.params
        }))
      };

      // Push request to Prebid.js queue
      window.pbjs.que.push(() => {
        if (typeof window.pbjs.addAdUnits === 'function' && typeof window.pbjs.requestBids === 'function') {
          window.pbjs.addAdUnits([adUnit]);
          window.pbjs.requestBids({
            bidsBackHandler: (bidResponse: any) => {
              resolve(bidResponse);
            }
          });
        } else {
          console.warn("addAdUnits or requestBids is not available on pbjs");
          reject(new Error("Prebid.js methods are unavailable"));
        }
      });
    });
  }
}
