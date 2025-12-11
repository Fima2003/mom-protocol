'use client';

import { useState, useEffect } from 'react';
import { useHealth } from '@/lib/HealthContext';

const VENTILATION_DURATION = 300; // 5 minutes in seconds

function calculateTimeRemaining(startTime: number | null): number {
  if (!startTime) return 0;
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  return Math.max(0, VENTILATION_DURATION - elapsed);
}

export default function VentilationTracker() {
  const { healthData, updateHealthData } = useHealth();
  const [, setTick] = useState(0);

  const isOpen = healthData?.ventilation?.isOpen ?? false;
  const startTime = healthData?.ventilation?.startTime ?? null;
  const timeRemaining = isOpen ? calculateTimeRemaining(startTime) : 0;

  // Single interval that ticks every second when window is open
  useEffect(() => {
    if (!isOpen || !startTime) return;

    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining(startTime);
      if (remaining <= 0) {
        updateHealthData({
          ventilation: {
            isOpen: false,
            startTime: null
          }
        });
      } else {
        setTick(t => t + 1); // Force re-render to update displayed time
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, startTime, updateHealthData]);

  const toggleWindow = async () => {
    if (!isOpen) {
      await updateHealthData({
        ventilation: {
          isOpen: true,
          startTime: Date.now()
        }
      });
      
      const event = new CustomEvent('activityCompleted', {
        detail: { type: 'Fresh Air', detail: 'Opened window for ventilation' }
      });
      window.dispatchEvent(event);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-sky-200 border-4 border-black p-4 pixel-shadow">
      <div className="text-xs mb-3 text-black text-center">Fresh Air</div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={toggleWindow}
          disabled={isOpen}
          className={`w-20 h-20 border-4 border-black text-5xl flex items-center justify-center transition-all ${
            isOpen 
              ? 'bg-cyan-400 cursor-not-allowed' 
              : 'bg-slate-300 pixel-shadow hover:pixel-press active:pixel-press'
          }`}
        >
          {isOpen ? '🪟' : '🚪'}
        </button>
        
        <div className="flex-1">
          {isOpen && (
            <>
              <div className="text-xs text-black mb-1">Window Open!</div>
              <div className="text-2xl font-bold text-black">
                {formatTime(timeRemaining)}
              </div>
              <div className="text-xs text-emerald-700 pixel-shine">
                ~~~ Breezy ~~~
              </div>
            </>
          )}
          {!isOpen && (
            <div className="text-xs text-black">Click to open</div>
          )}
        </div>
      </div>
    </div>
  );
}
