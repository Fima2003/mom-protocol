'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { subscribeToHealthData, HealthData, Activity } from '@/lib/healthData';
import Link from 'next/link';
import ClothingItem from '@/components/ClothingItem';

export default function ViewPage() {
  const params = useParams();
  const userId = params.userId as string;
  const [healthData, setHealthData] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState(true);
  const [momAdvice, setMomAdvice] = useState<{ message: string; face: string }>({
    message: "Loading health status...",
    face: '⏳'
  });

  const fetchMomAdvice = useCallback(async (activities: Activity[]) => {
    try {
      const response = await fetch('/api/mom-advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ activities })
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
  }, []);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = subscribeToHealthData(userId, (data) => {
      setHealthData(data);
      setLoading(false);
      
      if (data && data.activities.length > 0) {
        fetchMomAdvice(data.activities);
      }
    });

    return () => unsubscribe();
  }, [userId, fetchMomAdvice]);

  if (loading) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="bg-yellow-100 border-4 border-black p-8 pixel-shadow">
          <p className="text-sm text-black">⏳ Loading health status...</p>
        </div>
      </div>
    );
  }

  if (!healthData) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <div className="bg-red-100 border-4 border-black p-8 pixel-shadow">
          <p className="text-sm text-black">❌ Health data not found</p>
        </div>
      </div>
    );
  }

  const cozyItemsCount = Object.values(healthData.clothing).filter(Boolean).length;
  const totalSleep = healthData.sleep['total-sleep-logged'];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Read-Only Banner */}
        <div className="bg-blue-100 border-4 border-black p-4 pixel-shadow">
          <div className="flex items-center justify-between">
            <p className="text-xs text-black">
              👁️ <strong>View-Only Mode</strong> - You are viewing someone else&apos;s health status
            </p>
            <Link 
              href="/"
              className="bg-purple-600 hover:bg-purple-700 text-white border-4 border-black px-4 py-2 pixel-shadow transition-colors text-xs font-bold"
            >
              Go to My Dashboard
            </Link>
          </div>
        </div>

        {/* Health Status */}
        <div className="bg-yellow-100 border-4 border-black p-6 pixel-shadow">
          <h1 className="text-lg mb-6 text-center text-black pixel-glow">
            Mom&apos;s Sick Day Protocol
          </h1>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Current Feeling - Read Only Display */}
            <div>
              <label className="text-xs text-black mb-2 block">How They Feel Now:</label>
              <div className="border-4 border-black bg-white p-4">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <span className="text-xs text-black">😢 1</span>
                  <div className="flex-1 bg-gray-200 h-2 border-2 border-black relative">
                    <div 
                      className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-full"
                      style={{ width: `${((healthData.currentFeeling || 5) - 1) / 9 * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-black">😄 10</span>
                </div>
                <div className="text-center text-4xl font-bold text-black">
                  {healthData.currentFeeling || 5}
                </div>
                <div className="text-xs text-center text-gray-600 mt-2">
                  Current feeling level
                </div>
              </div>
            </div>

            {/* AI Predicted Status */}
            <div className="border-4 border-black bg-white p-4">
              <div className="text-xs text-black mb-2 text-center">Mom AI Prediction:</div>
              <div className="text-5xl text-center mb-2">{momAdvice.face}</div>
              <div className={`text-xs text-center font-bold min-h-[3rem] flex items-center justify-center`}>
                {momAdvice.message}
              </div>
              <div className="text-xs text-center text-gray-600 mt-1">
                ({healthData.activities.length} activities done)
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid Layout - Read Only View */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Bundle Up Section - With Actual Clothing Images */}
          <div className="lg:col-span-1">
            <div className="bg-orange-100 border-4 border-black p-6 pixel-shadow">
              <h2 className="text-sm mb-4 text-center text-black">Bundle Up!</h2>
              
              <div className="flex flex-col items-center">
                {/* Sweater */}
                <div className={`mb-2 ${healthData.clothing.sweater ? 'opacity-100' : 'opacity-30'}`}>
                  <ClothingItem
                    label="Sweater"
                    position={{ top: '0', left: '0' }}
                    imageSrc="/images/sweater.png"
                    isActive={healthData.clothing.sweater}
                    onClick={() => {}} // Read-only, no action
                    width={834}
                    height={851}
                  />
                </div>
                
                {/* Sweatpants */}
                <div className={`mb-2 ${healthData.clothing.sweatpants ? 'opacity-100' : 'opacity-30'}`}>
                  <ClothingItem
                    label="Sweatpants"
                    position={{ top: '0', left: '0' }}
                    imageSrc="/images/sweatpants.png"
                    isActive={healthData.clothing.sweatpants}
                    onClick={() => {}} // Read-only, no action
                    width={402}
                    height={1088}
                  />
                </div>
                
                {/* Socks */}
                <div className={`${healthData.clothing.socks ? 'opacity-100' : 'opacity-30'}`}>
                  <ClothingItem
                    label="Socks"
                    position={{ top: '0', left: '0' }}
                    imageSrc="/images/socks.png"
                    isActive={healthData.clothing.socks}
                    onClick={() => {}} // Read-only, no action
                    width={419}
                    height={467}
                  />
                </div>
              </div>

              <div className="mt-4 text-center text-xs text-black">
                {cozyItemsCount}/3 cozy items
              </div>
            </div>
          </div>

          {/* Nourishment Station */}
          <div className="space-y-4">
            <div className="bg-orange-200 border-4 border-black p-4 pixel-shadow">
              <h2 className="text-sm mb-4 text-center text-black">Nourishment</h2>
              <div className="space-y-3">
                <div className="bg-amber-100 border-4 border-black p-4">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">🍲</div>
                    <div className="flex-1">
                      <div className="text-xs mb-2 text-black">Soup Bowls</div>
                      <div className="text-2xl font-bold text-black">
                        {healthData.resources['resource-Soup Bowls']}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-100 border-4 border-black p-4">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">☕</div>
                    <div className="flex-1">
                      <div className="text-xs mb-2 text-black">Hot Tea</div>
                      <div className="text-2xl font-bold text-black">
                        {healthData.resources['resource-Hot Tea']}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-100 border-4 border-black p-4">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">💧</div>
                    <div className="flex-1">
                      <div className="text-xs mb-2 text-black">Water Glasses</div>
                      <div className="text-2xl font-bold text-black">
                        {healthData.resources['resource-Water Glasses']}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ventilation Status */}
            <div className="bg-green-200 border-4 border-black p-4 pixel-shadow">
              <h2 className="text-sm mb-2 text-center text-black">Fresh Air</h2>
              <div className="text-center">
                <p className="text-xs text-black">
                  {healthData.ventilation.isOpen ? '✓ Window is open' : '○ Window is closed'}
                </p>
              </div>
            </div>
          </div>

          {/* Total Sleep Only */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-purple-300 to-indigo-300 border-4 border-black p-6 pixel-shadow">
              <h2 className="text-sm mb-4 text-center text-black">Total Sleep</h2>
              
              <div className="flex flex-col items-center justify-center">
                <div className="text-6xl mb-3">😴</div>
                
                <div className="bg-white border-4 border-black px-8 py-4 pixel-shadow">
                  <div className="text-center">
                    <span className="text-5xl font-bold text-purple-700">{totalSleep}</span>
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
