'use client';

import { useState } from 'react';

interface ShareLinkProps {
  userId: string;
}

export default function ShareLink({ userId }: ShareLinkProps) {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const shareUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/view/${userId}` 
    : '';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white border-4 border-black px-6 py-3 pixel-shadow transition-colors text-sm font-bold"
      >
        🔗 Share Live Link
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-yellow-100 border-4 border-black p-6 pixel-shadow max-w-md w-full">
            <h3 className="text-sm mb-4 text-black font-bold">Share Your Health Status</h3>
            <p className="text-xs text-black mb-4">
              Anyone with this link can view your health status in real-time, but they cannot edit it.
            </p>
            
            <div className="bg-white border-4 border-black p-3 mb-4 break-all text-xs">
              {shareUrl}
            </div>

            <div className="flex gap-2">
              <button
                onClick={copyToClipboard}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white border-4 border-black px-4 py-2 pixel-shadow transition-colors text-xs font-bold"
              >
                {copied ? '✓ Copied!' : '📋 Copy Link'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white border-4 border-black px-4 py-2 pixel-shadow transition-colors text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
