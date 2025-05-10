# BLE Mouse & Keyboard App

A React Native Expo app that allows you to control your custom BLE mouse and keyboard device.

## Features

- Bluetooth Low Energy (BLE) device scanning and connection
- Mouse controls (up, down, left, right, click)
- Keyboard controls (select all, copy, paste, delete)
- Mode switching between mouse and keyboard
- Modern and intuitive user interface

## Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS device or simulator (for iOS development)
- Android device or emulator (for Android development)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ble-mouse-keyboard-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

## Usage

1. Make sure your BLE mouse and keyboard device is powered on and in pairing mode
2. Open the app on your mobile device
3. Tap "Scan for Devices" to search for available BLE devices
4. Select your device from the list to connect
5. Use the on-screen controls to operate your device:
   - Mouse Mode: Use the directional buttons and click button
   - Keyboard Mode: Use the keyboard shortcut buttons
6. Tap the mode switch button to toggle between mouse and keyboard modes
7. Tap "Disconnect" to end the connection

## Development

### Project Structure

- `src/services/BleService.ts` - BLE connection and command handling
- `App.tsx` - Main application component and UI
- `app.json` - Expo configuration and permissions

### Building for Production

To create a production build:

```bash
# For Android
npx expo build:android

# For iOS
npx expo build:ios
```

## Troubleshooting

1. If the app can't find your device:
   - Ensure the device is powered on and in pairing mode
   - Check that Bluetooth is enabled on your mobile device
   - Try restarting the app and scanning again

2. If connection fails:
   - Make sure you're within range of the device
   - Check that the device isn't already connected to another app
   - Try restarting both the app and the device

3. If controls aren't working:
   - Verify that you're in the correct mode (mouse/keyboard)
   - Check that the connection is still active
   - Try reconnecting to the device

## License

This project is licensed under the MIT License - see the LICENSE file for details. 