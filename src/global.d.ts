declare global {
    interface Window {
      pbjs: {
        que: Array<() => void>;
        setConfig?: (config: object) => void;
        addAdUnits?: (adUnits: object[]) => void;
        requestBids?: (options: { bidsBackHandler: (response: any) => void }) => void;
      };
    }
  }
  
  // Convert this file to a module (required by TypeScript for declaration files)
  export {};
  