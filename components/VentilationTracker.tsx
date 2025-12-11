'use client';

import { useState, useEffect, useRef } from 'react';
import { useHealth } from '@/lib/HealthContext';

export default function VentilationTracker() {
  const { healthData, updateHealthData } = useHealth();
  const [isOpen, setIsOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (healthData?.ventilation && !initializedRef.current) {
      initializedRef.current = true;
      setIsOpen(healthData.ventilation.isOpen);
      if (healthData.ventilation.isOpen && healthData.ventilation.startTime) {
        const elapsed = Math.floor((Date.now() - healthData.ventilation.startTime) / 1000);
        const remaining = Math.max(0, 300 - elapsed);
        setTimeRemaining(remaining);
      }
    }
  }, [healthData]);

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev <= 1 ? 0 : prev - 1;
          if (newTime === 0) {
            setIsOpen(false);
            updateHealthData({
              ventilation: {
                isOpen: false,
                startTime: null
              }
            });
          }
          return newTime;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [timeRemaining, updateHealthData]);

  const toggleWindow = async () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeRemaining(300);
      
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
