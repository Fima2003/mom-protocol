'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { getUserId } from '@/lib/userId';
import { subscribeToHealthData, saveHealthData, initializeHealthData, HealthData } from '@/lib/healthData';

interface HealthContextType {
  userId: string;
  healthData: HealthData | null;
  updateHealthData: (data: Partial<Omit<HealthData, 'updatedAt'>>) => Promise<void>;
  isLoading: boolean;
}

const HealthContext = createContext<HealthContextType | undefined>(undefined);

export function HealthProvider({ children }: { children: ReactNode }) {
  const initializedRef = useRef(false);
  const [userId] = useState(() => getUserId());
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      initializeHealthData(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = subscribeToHealthData(userId, (data) => {
      setHealthData(data);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const updateHealthData = async (updates: Partial<Omit<HealthData, 'updatedAt'>>) => {
    if (!userId || !healthData) return;

    const updatedData: Omit<HealthData, 'updatedAt'> = {
      ...healthData,
      ...updates
    };
    await saveHealthData(userId, updatedData);
  };

  return (
    <HealthContext.Provider value={{ userId, healthData, updateHealthData, isLoading }}>
      {children}
    </HealthContext.Provider>
  );
}

export function useHealth() {
  const context = useContext(HealthContext);
  if (context === undefined) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
}
