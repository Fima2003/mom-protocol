'use client';

import { useState } from 'react';

interface SleepLoggerProps {
  title: string;
  icon: string;
}

export default function SleepLogger({ title, icon }: SleepLoggerProps) {
  const [hours, setHours] = useState(8);
  const [showZzz, setShowZzz] = useState(false);

  const increment = () => setHours(Math.min(24, hours + 1));
  const decrement = () => setHours(Math.max(0, hours - 1));

  const logSleep = () => {
    setShowZzz(true);
    setTimeout(() => setShowZzz(false), 2000);
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
