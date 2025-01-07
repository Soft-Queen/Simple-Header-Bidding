import { bidders } from "../config/bidders";

export class HeaderBiddingService {
  private static instance: HeaderBiddingService;
  private initialized: boolean = false;

  private constructor() {}

  public static getInstance(): HeaderBiddingService {
    if (!HeaderBiddingService.instance) {
      HeaderBiddingService.instance = new HeaderBiddingService();
    }
    return HeaderBiddingService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.initialized) return;

    window.pbjs = window.pbjs || { que: [] };
    window.pbjs.que.push(() => {
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
    });

    this.initialized = true;
  }

  public async requestBids(adUnitCode: string, sizes: number[][]): Promise<Prebid.BidResponse> {
    return new Promise((resolve) => {
      const adUnit: Prebid.BidConfig = {
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

      window.pbjs.que.push(() => {
        window.pbjs.addAdUnits([adUnit]);
        window.pbjs.requestBids({
          bidsBackHandler: (bidResponse: Prebid.BidResponse) => {
            resolve(bidResponse);
          }
        });
      });
    });
  }
}