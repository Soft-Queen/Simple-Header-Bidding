export class AnalyticsService {
  public trackBidResponse(data: {
    adUnitCode: string;
    bids: Prebid.PrebidBid[];
    latency: number;
  }): void {
    if (typeof window !== 'undefined' && typeof (window as any).ga === 'function') {
      (window as any).ga('send', 'event', {
        eventCategory: 'Prebid',
        eventAction: 'bidResponse',
        eventLabel: data.adUnitCode,
        metric1: data.bids.length,
        metric2: data.latency,
        metric3: Math.max(...data.bids.map(b => b.cpm)),
      });
    }
    
  }
}
