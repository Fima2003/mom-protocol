'use client';

import Image from 'next/image';

interface ClothingItemProps {
  label: string;
  position: { top: string; left: string };
  imageSrc: string;
  onClick: () => void;
  isActive: boolean;
  width: number;
  height: number;
}

export default function ClothingItem({ label, imageSrc, onClick, isActive, width, height }: ClothingItemProps) {
  return (
    <button
      onClick={onClick}
      className={`transition-all hover:scale-105 ${
        isActive ? 'opacity-100' : 'opacity-30'
      }`}
      title={label}
      style={{ width: width / 2, height: height / 2 }}
    >
      <Image
        src={imageSrc}
        alt={label}
        width={width}
        height={height}
        className="w-full h-full pointer-events-none"
      />
    </button>
  );
}
