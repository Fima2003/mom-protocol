'use client';

import { useState, useEffect } from 'react';

export default function TotalSleep() {
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    const updateTotal = () => {
      const totalLogged = localStorage.getItem('total-sleep-logged');
      setTotalHours(totalLogged ? parseInt(totalLogged, 10) : 0);
    };

    updateTotal();

    const interval = setInterval(updateTotal, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-300 to-indigo-300 border-4 border-black p-6 pixel-shadow">
      <h2 className="text-sm mb-4 text-center text-black">Total Sleep</h2>
      
      <div className="flex flex-col items-center justify-center">
        <div className="text-6xl mb-3">😴</div>
        
        <div className="bg-white border-4 border-black px-8 py-4 pixel-shadow">
          <div className="text-center">
            <span className="text-5xl font-bold text-purple-700">{totalHours}</span>
            <span className="text-2xl text-gray-600 ml-2">hrs</span>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-black">
            Combined sleep time
          </p>
        </div>
      </div>
    </div>
  );
}
