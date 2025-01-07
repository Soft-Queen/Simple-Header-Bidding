export interface Bidder {
    name: string;
    params: any;
  }
  
  export const bidders: Bidder[] = [
    {
      name: 'appnexus',
      params: {
        placementId: '13144370'
      }
    },
    {
      name: 'rubicon',
      params: {
        accountId: '14062',
        siteId: '70608',
        zoneId: '335918'
      }
    },
    {
      name: 'openx',
      params: {
        unit: '539971266',
        delDomain: 'publisher-d.openx.net'
      }
    }
  ];