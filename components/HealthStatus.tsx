'use client';

import { useState } from 'react';

interface HealthStatusProps {
  completedTasks: number;
  momAdvice: string;
  momFace: string;
  isLoading: boolean;
}

export default function HealthStatus({ completedTasks, momAdvice, momFace, isLoading }: HealthStatusProps) {
  const [currentFeeling, setCurrentFeeling] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('currentFeeling');
      return saved !== null ? parseInt(saved, 10) : 5;
    }
    return 5;
  });

  const getPredictedStatus = () => {
    if (completedTasks > 5) {
      return { color: 'text-green-600' };
    } else if (completedTasks > 2) {
      return { color: 'text-yellow-600' };
    } else {
      return { color: 'text-red-600' };
    }
  };

  const status = getPredictedStatus();

  return (
    <div className="bg-yellow-100 border-4 border-black p-6 pixel-shadow">
      <h1 className="text-lg mb-6 text-center text-black pixel-glow">
        Mom&apos;s Sick Day Protocol
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Current Feeling Input */}
        <div>
          <label className="text-xs text-black mb-2 block">How I Feel Now:</label>
          <div className="flex items-center gap-4">
            <span className="text-xs text-black">😢 1</span>
            <input
              type="range"
              min="1"
              max="10"
              value={currentFeeling}
              onChange={(e) => {
                const newValue = Number(e.target.value);
                setCurrentFeeling(newValue);
                localStorage.setItem('currentFeeling', newValue.toString());
              }}
              className="flex-1"
            />
            <span className="text-xs text-black">😄 10</span>
          </div>
          <div className="text-center mt-2 text-2xl font-bold text-black">
            {currentFeeling}
          </div>
        </div>

        {/* AI Predicted Status */}
        <div className="border-4 border-black bg-white p-4">
          <div className="text-xs text-black mb-2 text-center">Mom AI Prediction:</div>
          <div className="text-5xl text-center mb-2">{momFace}</div>
          <div className={`text-xs text-center font-bold ${status.color} min-h-[3rem] flex items-center justify-center`}>
            {isLoading ? (
              <span className="animate-pulse">Thinking... 💭</span>
            ) : (
              momAdvice
            )}
          </div>
          <div className="text-xs text-center text-gray-600 mt-1">
            ({completedTasks} activities done)
          </div>
        </div>
      </div>
    </div>
  );
}
