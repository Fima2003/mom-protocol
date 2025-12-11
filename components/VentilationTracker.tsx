'use client';

import { useState, useEffect } from 'react';

export default function VentilationTracker() {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ventilation-isOpen') === 'true';
    }
    return false;
  });
  const [timeRemaining, setTimeRemaining] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTime = localStorage.getItem('ventilation-timeRemaining');
      return savedTime ? parseInt(savedTime, 10) : 0;
    }
    return 0;
  });

  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev <= 1 ? 0 : prev - 1;
          localStorage.setItem('ventilation-timeRemaining', newTime.toString());
          if (newTime === 0) {
            setIsOpen(false);
            localStorage.setItem('ventilation-isOpen', 'false');
          }
          return newTime;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  const toggleWindow = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeRemaining(300); // 5 minutes in seconds
      localStorage.setItem('ventilation-isOpen', 'true');
      localStorage.setItem('ventilation-timeRemaining', '300');
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
