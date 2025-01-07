declare namespace Prebid {
    interface BidConfig {
      code: string;
      mediaTypes: {
        banner?: {
          sizes: number[][];
        };
      };
      bids: Bid[];
    }
  
    interface Bid {
      bidder: string;
      params: any;
    }
  
    interface PrebidBid {
      cpm: number;
      currency: string;
      width: number;
      height: number;
      ad: string;
      netRevenue: boolean;
      creativeId: string;
      ttl: number;
    }
  
    interface BidResponse {
      bids: PrebidBid[];
    }
  }
  
  declare global {
    interface Window {
      pbjs: {
        que: any[];
        addAdUnits: (config: Prebid.BidConfig[]) => void;
        requestBids: (config: {
          bidsBackHandler: (bidResponse: Prebid.BidResponse) => void;
        }) => void;
        setConfig: (config: any) => void;
      };
    }
  }