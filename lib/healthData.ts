import { db } from './firebase';
import { doc, getDoc, setDoc, onSnapshot, Timestamp } from 'firebase/firestore';

export interface Activity {
  type: string;
  detail: string;
  timestamp: number;
}

export interface ClothingState {
  socks: boolean;
  sweater: boolean;
  sweatpants: boolean;
}

export interface ResourceCounts {
  'resource-Soup Bowls': number;
  'resource-Hot Tea': number;
  'resource-Water Glasses': number;
}

export interface SleepData {
  'sleep-hours-Good Night Sleep 🌙': number;
  'sleep-hours-Day Nap 😴': number;
  'total-sleep-logged': number;
}

export interface VentilationData {
  isOpen: boolean;
  startTime: number | null;
}

export interface HealthData {
  activities: Activity[];
  clothing: ClothingState;
  resources: ResourceCounts;
  sleep: SleepData;
  ventilation: VentilationData;
  currentFeeling: number;
  updatedAt: Timestamp;
}

const DEFAULT_HEALTH_DATA: Omit<HealthData, 'updatedAt'> = {
  activities: [],
  clothing: { socks: false, sweater: false, sweatpants: false },
  resources: {
    'resource-Soup Bowls': 0,
    'resource-Hot Tea': 0,
    'resource-Water Glasses': 0
  },
  sleep: {
    'sleep-hours-Good Night Sleep 🌙': 8,
    'sleep-hours-Day Nap 😴': 8,
    'total-sleep-logged': 0
  },
  ventilation: {
    isOpen: false,
    startTime: null
  },
  currentFeeling: 5
};

export async function getHealthData(userId: string): Promise<HealthData | null> {
  try {
    const docRef = doc(db, 'health-data', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as HealthData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching health data:', error);
    return null;
  }
}

export async function saveHealthData(userId: string, data: Omit<HealthData, 'updatedAt'>): Promise<void> {
  try {
    const docRef = doc(db, 'health-data', userId);
    await setDoc(docRef, {
      ...data,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error saving health data:', error);
    throw error;
  }
}

export async function initializeHealthData(userId: string): Promise<void> {
  const existing = await getHealthData(userId);
  if (!existing) {
    await saveHealthData(userId, DEFAULT_HEALTH_DATA);
  }
}

export function subscribeToHealthData(
  userId: string,
  callback: (data: HealthData | null) => void
): () => void {
  const docRef = doc(db, 'health-data', userId);
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data() as HealthData);
    } else {
      callback(null);
    }
  });
}
