'use client';

import { useState } from 'react';
import { useHealth } from '@/lib/HealthContext';

interface SleepLoggerProps {
  title: string;
  icon: string;
}

export default function SleepLogger({ title }: SleepLoggerProps) {
  const { healthData, updateHealthData } = useHealth();
  const storageKey = `sleep-hours-${title}` as keyof typeof healthData.sleep;
  const hours = healthData?.sleep?.[storageKey] || 8;
  const [showZzz, setShowZzz] = useState(false);

  const increment = async () => {
    const newHours = Math.min(24, hours + 1);
    if (healthData) {
      await updateHealthData({
        sleep: {
          ...healthData.sleep,
          [storageKey]: newHours
        }
      });
    }
  };

  const decrement = async () => {
    const newHours = Math.max(0, hours - 1);
    if (healthData) {
      await updateHealthData({
        sleep: {
          ...healthData.sleep,
          [storageKey]: newHours
        }
      });
    }
  };

  const logSleep = async () => {
    if (!healthData) return;
    
    const currentTotal = healthData.sleep['total-sleep-logged'] || 0;
    const newTotal = currentTotal + hours;
    
    await updateHealthData({
      sleep: {
        ...healthData.sleep,
        'total-sleep-logged': newTotal
      }
    });
    
    setShowZzz(true);
    setTimeout(() => setShowZzz(false), 2000);
    
    const event = new CustomEvent('activityCompleted', {
      detail: { type: 'Rest', detail: `${title} for ${hours} hours` }
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="bg-indigo-200 border-4 border-black p-4 pixel-shadow relative">
      <div className="text-xs mb-3 text-black text-center">{title}</div>
      
      <div className="flex items-center justify-center gap-3 mb-4">
        <button
          onClick={decrement}
          className="w-10 h-10 bg-red-500 border-4 border-black text-white text-xl font-bold pixel-shadow hover:pixel-press active:pixel-press"
        >
          -
        </button>
        
        <div className="w-20 h-10 bg-white border-4 border-black flex items-center justify-center">
          <span className="text-xl font-bold text-black">{hours}</span>
        </div>
        
        <button
          onClick={increment}
          className="w-10 h-10 bg-green-500 border-4 border-black text-white text-xl font-bold pixel-shadow hover:pixel-press active:pixel-press"
        >
          +
        </button>
      </div>

      <button
        onClick={logSleep}
        className="w-full bg-purple-600 border-4 border-black text-white text-xs p-3 pixel-shadow hover:pixel-press active:pixel-press transition-all"
      >
        Just slept {hours} hrs
      </button>

      {showZzz && (
        <div className="absolute -top-6 right-4 text-4xl animate-pulse">
          💤
        </div>
      )}
    </div>
  );
}
