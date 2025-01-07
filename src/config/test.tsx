import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle, DollarSign, Activity } from 'lucide-react';
// import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Simulated Prebid.js integration
const prebid = {
  que: [],
  requestBids: (config) => new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        bids: [
          { bidder: 'appnexus', cpm: 2.50, ad: '<div>AppNexus Ad</div>' },
          { bidder: 'rubicon', cpm: 2.75, ad: '<div>Rubicon Ad</div>' }
        ]
      });
    }, 800);
  })
};

// Floor price configuration
const floorPrices = {
  mobile: {
    banner: 1.50,
    rectangle: 2.00
  },
  desktop: {
    banner: 2.00,
    rectangle: 2.50
  }
};

const HeaderBiddingSystem = () => {
  const [bids, setBids] = useState([]);
  const [winningBid, setWinningBid] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({
    totalBids: 0,
    winRate: 0,
    avgLatency: 0
  });

  // Detect device type
  const getDeviceType = () => {
    return window.innerWidth < 768 ? 'mobile' : 'desktop';
  };

  // Get floor price based on device and ad size
  const getFloorPrice = (size) => {
    const device = getDeviceType();
    return floorPrices[device][size] || 1.0;
  };

  // Validate bid according to OpenRTB spec
  const validateBid = (bid) => {
    if (!bid.cpm  !bid.ad  !bid.bidder) {
      return false;
    }
    return bid.cpm >= getFloorPrice('banner');
  };

  // Track metrics
  const trackMetrics = useCallback((bidData) => {
    setMetrics(prev => ({
      totalBids: prev.totalBids + 1,
      winRate: ((prev.winRate * prev.totalBids) + (bidData.length > 0 ? 1 : 0)) / (prev.totalBids + 1),
      avgLatency: Math.round(((prev.avgLatency * prev.totalBids) + 800) / (prev.totalBids + 1))
    }));
  }, []);

  // Request bids
  const requestBids = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const startTime = performance.now();
      
      const adUnits = [{
        code: 'banner-ad',
        mediaTypes: {
          banner: {
            sizes: [[300, 250], [728, 90]]
          }
        },
        bids: [
          { bidder: 'appnexus' },
          { bidder: 'rubicon' }
        ]
      }];

      const result = await prebid.requestBids({ adUnits });
      const validBids = result.bids.filter(validateBid);
      
      if (validBids.length === 0) {
        throw new Error('No valid bids received');
      }

      setBids(validBids);
      const winner = validBids.reduce((prev, current) => 
        (prev.cpm > current.cpm) ? prev : current
      );
      setWinningBid(winner);
      trackMetrics(validBids);
      
    } catch (err) {
      setError(err.message);
      console.error('Bidding error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Lazy loading with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            requestBids();
          }
        });
      },
      { threshold: 0.1 }
    );

    const adContainer = document.querySelector('#ad-container');
    if (adContainer) {
      observer.observe(adContainer);
    }

    return () => {
      if (adContainer) {
        observer.unobserve(adContainer);
      }
    };
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Header Bidding Dashboard</h1>
      
      {/* Metrics Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
            <h3 className="font-semibold">Total Bids</h3>
          </div>
          <p className="text-2xl font-bold">{metrics.totalBids}</p>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <h3 className="font-semibold">Win Rate</h3>
          </div>
          <p className="text-2xl font-bold">{(metrics.winRate * 100).toFixed(1)}%</p>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <h3 className="font-semibold">Avg Latency</h3>
          </div>
          <p className="text-2xl font-bold">{metrics.avgLatency}ms</p>
        </div>
      </div>

      {/* Ad Container */}
      <div id="ad-container" className="mb-6">
        {isLoading ? (
          <div className="h-60 bg-gray-100 rounded flex items-center justify-center">
            Loading bids...
          </div>
        ) : error ? (
            <><div>Error</div></>
        //   <Alert variant="destructive">
        //     <AlertCircle className="h-4 w-4" />
        //     <AlertTitle>Error</AlertTitle>
        //     <AlertDescription>{error}</AlertDescription>
        //   </Alert>
        ) : winningBid ? (
          <div className="p-4 border rounded">
            <div className="mb-2">
              <span className="font-semibold">Winning Bid: </span>
              {winningBid.bidder} (${winningBid.cpm})
            </div>
            <div 
              dangerouslySetInnerHTML={{ __html: winningBid.ad }}
              className="bg-gray-50 p-4 rounded"
            />
          </div>
        ) : (
          <div className="h-60 bg-gray-100 rounded flex items-center justify-center">
            No bids available - Showing fallback ad
          </div>
        )}
      </div>

      {/* Bid History */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2 text-left">Bidder</th>
              <th className="p-2 text-left">CPM</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {bids.map((bid, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{bid.bidder}</td>
                <td className="p-2">${bid.cpm.toFixed(2)}</td>
                <td className="p-2">
                  {bid === winningBid ? (
                    <span className="text-green-600">Won</span>
                  ) : (
                    <span className="text-gray-500">Lost</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HeaderBiddingSystem;