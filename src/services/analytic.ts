export class AnalyticsService {
    public trackBidResponse(data: {
      adUnitCode: string;
      bids: Prebid.PrebidBid[];
      latency: number;
    }): void {
      if (typeof window?.ga !== 'undefined') {
        // Track bid metrics
        window.ga('send', 'event', {
          eventCategory: 'Prebid',
          eventAction: 'bidResponse',
          eventLabel: data.adUnitCode,
          metric1: data.bids.length,                    // Number of bids
          metric2: data.latency,                        // Latency
          metric3: Math.max(...data.bids.map(b => b.cpm)) // Highest CPM
        });
      }
    }
  }