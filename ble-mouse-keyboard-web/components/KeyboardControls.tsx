'use client';

import React, { useState } from 'react';
import { bleService } from '@/lib/BleService';

export default function KeyboardControls() {
  const [text, setText] = useState('');

  const handleSendText = async () => {
    if (!text) return;

    try {
      await bleService.sendText(text);
      setText('');
    } catch (error) {
      console.error('Error sending text:', error);
    }
  };

  const handleCommand = async (command: () => Promise<void>) => {
    try {
      await command();
    } catch (error) {
      console.error('Error sending command:', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold">Keyboard Controls</h2>

      {/* Text Entry Section */}
      <div className="w-full bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Text Entry</h3>
        <div className="flex gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to send..."
            maxLength={100}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendText}
            disabled={!text}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
          >
            Send
          </button>
        </div>
        <p className="text-sm text-gray-400 mt-2">{text.length}/100 characters</p>
      </div>

      {/* Navigation Section */}
      <div className="w-full bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Navigation</h3>
        <div className="flex flex-col items-center gap-2">
          {/* Up Arrow */}
          <button
            onClick={() => handleCommand(() => bleService.sendBiosUp())}
            className="w-16 h-16 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-lg flex items-center justify-center text-2xl transition-colors"
          >
            ↑
          </button>

          {/* Left, Enter, Right */}
          <div className="flex gap-2">
            <button
              onClick={() => handleCommand(() => bleService.sendBiosLeft())}
              className="w-16 h-16 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-lg flex items-center justify-center text-2xl transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => handleCommand(() => bleService.sendBiosEnter())}
              className="w-16 h-16 bg-green-600 hover:bg-green-500 active:bg-green-700 rounded-lg flex items-center justify-center text-sm font-semibold transition-colors"
            >
              ENTER
            </button>
            <button
              onClick={() => handleCommand(() => bleService.sendBiosRight())}
              className="w-16 h-16 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-lg flex items-center justify-center text-2xl transition-colors"
            >
              →
            </button>
          </div>

          {/* Down Arrow */}
          <button
            onClick={() => handleCommand(() => bleService.sendBiosDown())}
            className="w-16 h-16 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-lg flex items-center justify-center text-2xl transition-colors"
          >
            ↓
          </button>
        </div>
      </div>

      {/* Basic Controls */}
      <div className="w-full bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Basic Controls</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleCommand(() => bleService.sendSelectAll())}
            className="px-4 py-3 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-lg font-semibold transition-colors"
          >
            Select All
          </button>
          <button
            onClick={() => handleCommand(() => bleService.sendCopy())}
            className="px-4 py-3 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-lg font-semibold transition-colors"
          >
            Copy
          </button>
          <button
            onClick={() => handleCommand(() => bleService.sendPaste())}
            className="px-4 py-3 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-lg font-semibold transition-colors"
          >
            Paste
          </button>
          <button
            onClick={() => handleCommand(() => bleService.sendDelete())}
            className="px-4 py-3 bg-gray-700 hover:bg-gray-600 active:bg-gray-500 rounded-lg font-semibold transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Function Keys */}
      <div className="w-full bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Function Keys</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleCommand(() => bleService.sendBiosF2())}
            className="px-4 py-3 bg-purple-700 hover:bg-purple-600 active:bg-purple-800 rounded-lg font-semibold transition-colors"
          >
            F2
          </button>
          <button
            onClick={() => handleCommand(() => bleService.sendBiosF10())}
            className="px-4 py-3 bg-purple-700 hover:bg-purple-600 active:bg-purple-800 rounded-lg font-semibold transition-colors"
          >
            F10
          </button>
          <button
            onClick={() => handleCommand(() => bleService.sendBiosF12())}
            className="px-4 py-3 bg-purple-700 hover:bg-purple-600 active:bg-purple-800 rounded-lg font-semibold transition-colors"
          >
            F12
          </button>
          <button
            onClick={() => handleCommand(() => bleService.sendBiosEsc())}
            className="px-4 py-3 bg-purple-700 hover:bg-purple-600 active:bg-purple-800 rounded-lg font-semibold transition-colors"
          >
            ESC
          </button>
          <button
            onClick={() => handleCommand(() => bleService.sendBiosDelete())}
            className="px-4 py-3 bg-purple-700 hover:bg-purple-600 active:bg-purple-800 rounded-lg font-semibold transition-colors col-span-2"
          >
            Delete
          </button>
        </div>
      </div>

      {/* BIOS Loop */}
      <div className="w-full">
        <button
          onClick={() => handleCommand(() => bleService.sendBiosLoop())}
          className="w-full px-6 py-4 bg-red-600 hover:bg-red-500 active:bg-red-700 text-white rounded-lg font-bold text-lg transition-colors"
        >
          BIOS LOOP
        </button>
      </div>
    </div>
  );
}
