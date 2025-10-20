'use client';

import React, { useState, useEffect } from 'react';
import { bleService } from '@/lib/BleService';
import MouseControls from '@/components/MouseControls';
import KeyboardControls from '@/components/KeyboardControls';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Check if Web Bluetooth is supported (only runs in browser)
    if (typeof window !== 'undefined') {
      console.log('Checking Web Bluetooth support...');
      console.log('navigator.bluetooth exists:', !!navigator.bluetooth);

      if (!navigator.bluetooth) {
        console.error('Web Bluetooth is not available');
        setIsSupported(false);
        setError('Web Bluetooth is not supported in this browser. Please use Chrome, Edge, or Opera.');
      } else {
        console.log('Web Bluetooth is supported!');
        setIsSupported(true);
      }
    }
  }, []);

  const handleConnect = async () => {
    try {
      setError('');
      setStatus('Requesting device...');

      const device = await bleService.requestDevice();
      setStatus(`Connecting to ${device.name}...`);

      await bleService.connectToDevice(device);
      setIsConnected(true);
      setIsKeyboardMode(bleService.isKeyboardMode);
      setStatus('Connected successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect to device';
      setError(errorMessage);
      setStatus('');
      setIsConnected(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await bleService.disconnect();
      setIsConnected(false);
      setIsKeyboardMode(false);
      setStatus('Disconnected');
      setError('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to disconnect';
      setError(errorMessage);
    }
  };

  const handleToggleMode = async () => {
    try {
      await bleService.sendModeSwitch();
      setIsKeyboardMode(bleService.isKeyboardMode);
      setStatus(`Switched to ${bleService.isKeyboardMode ? 'Keyboard' : 'Mouse'} mode`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to switch mode';
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">BLE Mouse & Keyboard</h1>
          {isConnected && (
            <div className="flex items-center gap-4">
              <button
                onClick={handleToggleMode}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition-colors"
              >
                Switch to {isKeyboardMode ? 'Mouse' : 'Keyboard'}
              </button>
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-semibold transition-colors"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        {/* Status and Error Messages */}
        {status && (
          <div className="mb-4 p-4 bg-blue-900/50 border border-blue-700 rounded-lg">
            <p className="text-blue-200">{status}</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-900/50 border border-red-700 rounded-lg">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {!isSupported ? (
          /* Browser Not Supported */
          <div className="text-center py-12">
            <div className="bg-red-900/50 border border-red-700 rounded-lg p-8 max-w-md mx-auto">
              <h2 className="text-xl font-bold mb-4">Browser Not Supported</h2>
              <p className="mb-4">
                Web Bluetooth is not supported in this browser. Please use one of the following browsers:
              </p>
              <ul className="list-disc list-inside text-left">
                <li>Google Chrome (desktop)</li>
                <li>Microsoft Edge (desktop)</li>
                <li>Opera (desktop)</li>
                <li>Chrome on Android</li>
              </ul>
            </div>
          </div>
        ) : !isConnected ? (
          /* Connection Screen */
          <div className="text-center py-12">
            <div className="bg-gray-800 rounded-lg p-8 max-w-md mx-auto">
              <h2 className="text-xl font-bold mb-4">Connect to Device</h2>
              <p className="text-gray-400 mb-6">
                Click the button below to scan for and connect to your BLE Mouse & Keyboard device.
              </p>
              <button
                onClick={handleConnect}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg font-semibold text-lg transition-colors"
              >
                Connect to Device
              </button>

              {/* Instructions */}
              <div className="mt-8 text-left">
                <h3 className="font-semibold mb-2">Instructions:</h3>
                <ol className="list-decimal list-inside text-sm text-gray-400 space-y-1">
                  <li>Make sure your BLE device is powered on</li>
                  <li>Click the &quot;Connect to Device&quot; button</li>
                  <li>Select &quot;MouseAndKeyboard&quot; from the device list</li>
                  <li>Use the on-screen controls to operate your device</li>
                </ol>
              </div>
            </div>
          </div>
        ) : (
          /* Controls */
          <div className="bg-gray-800 rounded-lg">
            <div className="border-b border-gray-700 p-4">
              <div className="flex items-center justify-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="font-semibold">
                  {isKeyboardMode ? 'Keyboard Mode' : 'Mouse Mode'}
                </span>
              </div>
            </div>

            <div className="p-6">
              {isKeyboardMode ? <KeyboardControls /> : <MouseControls />}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm py-6 mt-12">
        <p>
          BLE Mouse & Keyboard Controller | Designed for accessibility
        </p>
      </footer>
    </div>
  );
}
