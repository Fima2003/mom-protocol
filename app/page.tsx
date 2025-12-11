'use client';

import { useState, useEffect } from 'react';
import HealthStatus from '@/components/HealthStatus';
import BundleUpSection from '@/components/BundleUpSection';
import ResourceCounter from '@/components/ResourceCounter';
import SleepLogger from '@/components/SleepLogger';
import VentilationTracker from '@/components/VentilationTracker';
import TotalSleep from '@/components/TotalSleep';

export default function Home() {
  const [completedTasks, setCompletedTasks] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('completedTasks');
      return saved !== null ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  // Mock task tracking - in reality you'd track actual interactions
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate task completion tracking
      const activities = document.querySelectorAll('button:active');
      if (activities.length > 0) {
        setCompletedTasks(prev => {
          const newCount = prev + 1;
          localStorage.setItem('completedTasks', newCount.toString());
          return newCount;
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header & Health Status */}
        <HealthStatus completedTasks={completedTasks} />

        {/* Main Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bundle Up Section */}
          <div className="lg:col-span-1">
            <BundleUpSection />
          </div>

          {/* Nourishment Station */}
          <div className="space-y-4">
            <div className="bg-orange-200 border-4 border-black p-4 pixel-shadow">
              <h2 className="text-sm mb-4 text-center text-black">Nourishment</h2>
              <div className="space-y-3">
                <ResourceCounter 
                  icon="🍲" 
                  label="Soup Bowls" 
                  color="bg-orange-600"
                />
                <ResourceCounter 
                  icon="☕" 
                  label="Hot Tea" 
                  color="bg-amber-700"
                />
                <ResourceCounter 
                  icon="💧" 
                  label="Water Glasses" 
                  color="bg-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Rest & Recovery Zone */}
          <div className="space-y-4">
            <div className="bg-purple-200 border-4 border-black p-4 pixel-shadow">
              <h2 className="text-sm mb-4 text-center text-black">Rest & Recovery</h2>
              <div className="space-y-3">
                <SleepLogger 
                  title="Good Night Sleep 🌙" 
                  icon="🌙"
                />
                <SleepLogger 
                  title="Day Nap 😴" 
                  icon="😴"
                />
              </div>
            </div>

            <TotalSleep />

            <VentilationTracker />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center bg-rose-100 border-4 border-black p-4 pixel-shadow">
          <p className="text-xs text-black">
            💝 Remember: Rest, hydrate, and listen to your body! 💝
          </p>
          <p className="text-xs text-gray-600 mt-2">
            ~ Mom knows best ~
          </p>
        </div>
      </div>
    </div>
  );
}

