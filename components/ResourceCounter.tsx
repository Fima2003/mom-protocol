'use client';

import { useState } from 'react';
import { useHealth } from '@/lib/HealthContext';

interface ResourceCounterProps {
  icon: string;
  label: string;
  color: string;
}

export default function ResourceCounter({ icon, label, color }: ResourceCounterProps) {
  const { healthData, updateHealthData } = useHealth();
  const storageKey = healthData ? `resource-${label}` as keyof typeof healthData.resources : null;
  const count = healthData?.resources?.[storageKey as keyof typeof healthData.resources] || 0;
  const [animate, setAnimate] = useState(false);

  const increment = async () => {
    const newCount = count + 1;
    setAnimate(true);
    setTimeout(() => setAnimate(false), 300);
    
    if (healthData) {
      await updateHealthData({
        resources: {
          ...healthData.resources,
          [storageKey]: newCount
        }
      });
    }
    
    const event = new CustomEvent('activityCompleted', {
      detail: { type: 'Nourishment', detail: `Had ${label}` }
    });
    window.dispatchEvent(event);
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
