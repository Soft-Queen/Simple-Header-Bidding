import React, { useEffect, useRef } from 'react';
import { HeaderBiddingService } from '../services/headerBidding';


interface AdUnitProps {
  id: string;
  sizes: number[][];
  className?: string;
}

export const AdUnit: React.FC<AdUnitProps> = ({ id, sizes, className }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const headerBidding = HeaderBiddingService.getInstance();

  useEffect(() => {
    const loadAd = async () => {
      try {
        await headerBidding.initialize();
        const bidResponse = await headerBidding.requestBids(id, sizes);
        
        if (bidResponse.bids && bidResponse.bids.length > 0) {
          const winningBid = bidResponse.bids.reduce((prev, current) => 
            (prev.cpm > current.cpm) ? prev : current
          );
          
          if (adRef.current) {
            adRef.current.innerHTML = winningBid.ad;
          }
        }
      } catch (error) {
        console.error('Error loading ad:', error);
      }
    };

    loadAd();

    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = '';
      }
    };
  }, [id, sizes]);

  return (
    <div 
      ref={adRef}
      id={id}
      className={`ad-container ${className || ''}`}
      data-sizes={JSON.stringify(sizes)}
    />
  );
};