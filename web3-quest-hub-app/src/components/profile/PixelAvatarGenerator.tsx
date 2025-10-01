'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils/cn';

interface PixelAvatarGeneratorProps {
  seed: string;
  size?: number;
  className?: string;
}

export function PixelAvatarGenerator({ seed, size = 128, className }: PixelAvatarGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = size;
    canvas.height = size;

    // Generate avatar
    generateAvatar(ctx, seed, size);
  }, [seed, size]);

  return (
    <div className={cn('relative', className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full border-4 border-[var(--terminal-green)] pixel-shadow-lg"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
}

function generateAvatar(ctx: CanvasRenderingContext2D, seed: string, size: number) {
  const pixelSize = size / 16; // 16x16 grid
  const colors = [
    '#00ff41', // Terminal green
    '#00d9ff', // Blockchain blue
    '#a855f7', // Voxel purple
    '#ff00ff', // Cyber magenta
    '#ffd700', // DAO gold
    '#ff6b35', // Warning orange
    '#ffffff', // White
    '#cbd5e1', // Light gray
  ];

  // Clear canvas with void black
  ctx.fillStyle = '#0a0e27';
  ctx.fillRect(0, 0, size, size);

  // Create seeded random number generator
  let seedNum = 0;
  for (let i = 0; i < seed.length; i++) {
    seedNum += seed.charCodeAt(i);
  }

  const random = () => {
    seedNum = (seedNum * 9301 + 49297) % 233280;
    return seedNum / 233280;
  };

  // Generate symmetric avatar (8x16 grid, mirrored)
  const gridSize = 16;
  const halfGrid = gridSize / 2;

  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < halfGrid; x++) {
      // Decide if pixel should be filled
      if (random() > 0.5) {
        const colorIndex = Math.floor(random() * colors.length);
        const color = colors[colorIndex];

        // Draw left side
        ctx.fillStyle = color;
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);

        // Mirror to right side
        const mirrorX = gridSize - 1 - x;
        ctx.fillRect(mirrorX * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
  }

  // Add pixel-perfect border
  ctx.strokeStyle = '#00ff41';
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, size, size);
}

// Export function to download avatar as PNG
export function downloadAvatar(seed: string, filename: string = 'avatar.png') {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = 256;
  canvas.height = 256;

  generateAvatar(ctx, seed, 256);

  canvas.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  });
}
