'use client';

import { useState } from 'react';
import ClothingItem from './ClothingItem';

export default function BundleUpSection() {
  const [clothing, setClothing] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('clothing-items');
      return saved ? JSON.parse(saved) : { socks: false, sweater: false, sweatpants: false };
    }
    return { socks: false, sweater: false, sweatpants: false };
  });

  const toggleItem = (item: keyof typeof clothing) => {
    const newClothing = { ...clothing, [item]: !clothing[item] };
    const isAdding = newClothing[item];
    setClothing(newClothing);
    localStorage.setItem('clothing-items', JSON.stringify(newClothing));
    
    const event = new CustomEvent('activityCompleted', {
      detail: { 
        type: 'Warmth', 
        detail: `${isAdding ? 'Put on' : 'Removed'} ${String(item)}` 
      }
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="bg-orange-100 border-4 border-black p-6 pixel-shadow">
      <h2 className="text-sm mb-4 text-center text-black">Bundle Up!</h2>
      
      <div className="flex flex-col items-center">
        {/* Sweater - 834x851 */}
        <ClothingItem
          label="Sweater"
          position={{ top: '0', left: '0' }}
          imageSrc="/images/sweater.png"
          isActive={clothing.sweater}
          onClick={() => toggleItem('sweater')}
          width={834}
          height={851}
        />
        
        {/* Sweatpants - 402x1088 */}
        <ClothingItem
          label="Sweatpants"
          position={{ top: '0', left: '0' }}
          imageSrc="/images/sweatpants.png"
          isActive={clothing.sweatpants}
          onClick={() => toggleItem('sweatpants')}
          width={402}
          height={1088}
        />
        
        {/* Socks - 419x467 */}
        <ClothingItem
          label="Socks"
          position={{ top: '0', left: '0' }}
          imageSrc="/images/socks.png"
          isActive={clothing.socks}
          onClick={() => toggleItem('socks')}
          width={419}
          height={467}
        />
      </div>

      <div className="mt-4 text-center text-xs text-black">
        {Object.values(clothing).filter(Boolean).length}/3 cozy items
      </div>
    </div>
  );
}
