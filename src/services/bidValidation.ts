export class BidValidationService {
    public validateBid(bid: Prebid.PrebidBid): boolean {
      try {
        // Basic bid validation
        if (!bid || typeof bid.cpm !== 'number' || bid.cpm <= 0) {
          return false;
        }
  
        // Creative validation
        if (!bid.ad || typeof bid.ad !== 'string') {
          return false;
        }
  
        // Size validation
        if (!bid.width || !bid.height || bid.width <= 0 || bid.height <= 0) {
          return false;
        }
  
        // Currency validation
        if (!bid.currency || bid.currency !== 'USD') {
          return false;
        }
  
        return true;
      } catch (error) {
        console.error('Bid validation error:', error);
        return false;
      }
    }
  }