'use client';

import { useState, useEffect } from 'react';
import HealthStatus from '@/components/HealthStatus';
import BundleUpSection from '@/components/BundleUpSection';
import ResourceCounter from '@/components/ResourceCounter';
import SleepLogger from '@/components/SleepLogger';
import VentilationTracker from '@/components/VentilationTracker';
import TotalSleep from '@/components/TotalSleep';

interface Activity {
  type: string;
  detail: string;
  timestamp: number;
}

export default function Home() {
  const [activities, setActivities] = useState<Activity[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('activities');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [momAdvice, setMomAdvice] = useState<{ message: string; face: string }>({
    message: "Start taking care of yourself, sweetie!",
    face: '😔'
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleResetAllData = () => {
    if (confirm('Are you sure you want to erase ALL saved data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const fetchMomAdvice = async (activityList: Activity[]) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/mom-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activities: activityList })
      });
      const data = await response.json();
      setMomAdvice(data);
    } catch (error) {
      console.error('Error fetching mom advice:', error);
      setMomAdvice({
        message: "Keep going, dear. Mom is proud of you!",
        face: '💝'
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const handleActivityUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{ type: string; detail: string }>;
      const newActivity: Activity = {
        type: customEvent.detail.type,
        detail: customEvent.detail.detail,
        timestamp: Date.now()
      };

      setActivities(prev => {
        const updated = [...prev, newActivity];
        localStorage.setItem('activities', JSON.stringify(updated));
        fetchMomAdvice(updated);
        return updated;
      });
    };

    window.addEventListener('activityCompleted', handleActivityUpdate as EventListener);

    // Fetch initial advice
    if (activities.length > 0) {
      fetchMomAdvice(activities);
    }

    return () => {
      window.removeEventListener('activityCompleted', handleActivityUpdate as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header & Health Status */}
        <HealthStatus 
          completedTasks={activities.length} 
          momAdvice={momAdvice.message}
          momFace={momAdvice.face}
          isLoading={isLoading}
        />

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

            <VentilationTracker />
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

        {/* Admin Button */}
        <div className="text-center">
          <button
            onClick={handleResetAllData}
            className="bg-red-600 hover:bg-red-700 text-white border-4 border-black px-6 py-3 pixel-shadow transition-colors text-sm font-bold"
          >
            🗑️ Admin: Erase All Data
          </button>
        </div>
      </div>
    </div>
  );
}

