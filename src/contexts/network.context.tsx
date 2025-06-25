'use client';

import type React from 'react';
import type { Nullable } from '@/types/commons.types';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

type NetworkContextProps = Nullable<{
  isOnline: boolean;
  isConnection: React.RefObject<boolean | null>;
}>;

const NetworkContext = createContext<NetworkContextProps>(undefined);

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const isConnection = useRef<boolean | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <NetworkContext.Provider
      value={{
        isOnline,
        isConnection,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
};
