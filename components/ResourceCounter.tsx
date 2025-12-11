'use client';

import { useState } from 'react';

interface ResourceCounterProps {
  icon: string;
  label: string;
  color: string;
}

export default function ResourceCounter({ icon, label, color }: ResourceCounterProps) {
  const storageKey = `resource-${label}`;
  const [count, setCount] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      return saved !== null ? parseInt(saved, 10) : 0;
    }
    return 0;
  });
  const [animate, setAnimate] = useState(false);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem(storageKey, newCount.toString());
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
  };

  return (
    <div className="bg-amber-100 border-4 border-black p-4 pixel-shadow">
      <div className="flex items-center gap-4">
        <div className={`text-5xl ${animate ? 'pixel-bounce' : ''}`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-xs mb-2 text-black">{label}</div>
          <div className="text-2xl font-bold text-black">{count}</div>
        </div>
        <button
          onClick={increment}
          className={`w-12 h-12 ${color} border-4 border-black text-white text-xl font-bold pixel-shadow hover:pixel-press active:pixel-press transition-all`}
        >
          +
        </button>
      </div>
    </div>
  );
}
