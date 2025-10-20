'use client';

import React, { useState } from 'react';
import { bleService } from '@/lib/BleService';

export default function MouseControls() {
  const [isLargeMovement, setIsLargeMovement] = useState(false);

  const handleDirectionalMove = async (direction: string) => {
    try {
      if (isLargeMovement) {
        switch (direction) {
          case 'up':
            await bleService.sendMouseUpLarge();
            break;
          case 'down':
            await bleService.sendMouseDownLarge();
            break;
          case 'left':
            await bleService.sendMouseLeftLarge();
            break;
          case 'right':
            await bleService.sendMouseRightLarge();
            break;
          case 'up-left':
            await bleService.sendMouseUpLeftLarge();
            break;
          case 'up-right':
            await bleService.sendMouseUpRightLarge();
            break;
          case 'down-left':
            await bleService.sendMouseDownLeftLarge();
            break;
          case 'down-right':
            await bleService.sendMouseDownRightLarge();
            break;
        }
      } else {
        switch (direction) {
          case 'up':
            await bleService.sendMouseUpSmall();
            break;
          case 'down':
            await bleService.sendMouseDownSmall();
            break;
          case 'left':
            await bleService.sendMouseLeftSmall();
            break;
          case 'right':
            await bleService.sendMouseRightSmall();
            break;
          case 'up-left':
            await bleService.sendMouseUpLeftSmall();
            break;
          case 'up-right':
            await bleService.sendMouseUpRightSmall();
            break;
          case 'down-left':
            await bleService.sendMouseDownLeftSmall();
            break;
          case 'down-right':
            await bleService.sendMouseDownRightSmall();
            break;
        }
      }
    } catch (error) {
      console.error('Error sending mouse command:', error);
    }
  };

  const handleLeftClick = async () => {
    try {
      await bleService.sendMouseLeftClick();
    } catch (error) {
      console.error('Error sending left click:', error);
    }
  };

  const handleRightClick = async () => {
    try {
      await bleService.sendMouseRightClick();
    } catch (error) {
      console.error('Error sending right click:', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <h2 className="text-2xl font-bold">Mouse Controls</h2>

      {/* Speed Toggle */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Movement Speed:</span>
        <button
          onClick={() => setIsLargeMovement(!isLargeMovement)}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            isLargeMovement
              ? 'bg-orange-500 text-white'
              : 'bg-blue-500 text-white'
          }`}
        >
          {isLargeMovement ? 'Large (80px)' : 'Small (20px)'}
        </button>
      </div>

      {/* Directional Pad */}
      <div className="grid grid-cols-3 gap-2">
        {/* Row 1 */}
        <button
          onClick={() => handleDirectionalMove('up-left')}
          className="w-20 h-20 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-lg flex items-center justify-center text-2xl transition-colors"
        >
          ↖
        </button>
        <button
          onClick={() => handleDirectionalMove('up')}
          className="w-20 h-20 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-lg flex items-center justify-center text-2xl transition-colors"
        >
          ↑
        </button>
        <button
          onClick={() => handleDirectionalMove('up-right')}
          className="w-20 h-20 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-lg flex items-center justify-center text-2xl transition-colors"
        >
          ↗
        </button>

        {/* Row 2 */}
        <button
          onClick={() => handleDirectionalMove('left')}
          className="w-20 h-20 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-lg flex items-center justify-center text-2xl transition-colors"
        >
          ←
        </button>
        <div className="w-20 h-20 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
          •
        </div>
        <button
          onClick={() => handleDirectionalMove('right')}
          className="w-20 h-20 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-lg flex items-center justify-center text-2xl transition-colors"
        >
          →
        </button>

        {/* Row 3 */}
        <button
          onClick={() => handleDirectionalMove('down-left')}
          className="w-20 h-20 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-lg flex items-center justify-center text-2xl transition-colors"
        >
          ↙
        </button>
        <button
          onClick={() => handleDirectionalMove('down')}
          className="w-20 h-20 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-lg flex items-center justify-center text-2xl transition-colors"
        >
          ↓
        </button>
        <button
          onClick={() => handleDirectionalMove('down-right')}
          className="w-20 h-20 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-lg flex items-center justify-center text-2xl transition-colors"
        >
          ↘
        </button>
      </div>

      {/* Click Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleLeftClick}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-colors"
        >
          Left Click
        </button>
        <button
          onClick={handleRightClick}
          className="px-8 py-4 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white rounded-lg font-semibold text-lg transition-colors"
        >
          Right Click
        </button>
      </div>
    </div>
  );
}
