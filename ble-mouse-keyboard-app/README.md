# BLE Mouse & Keyboard App

A React Native Expo app that provides an intuitive interface for controlling your custom BLE mouse and keyboard device. Designed with accessibility in mind, this app offers precise control options and a modern, user-friendly interface.

## Features

- Bluetooth Low Energy (BLE) device scanning and connection
- Intuitive mouse controls with:
  - 8-directional movement pad
  - Variable movement speeds (small/large)
  - Left and right click buttons
  - Diagonal movement support
- Keyboard controls with:
  - Text entry field
  - Common shortcuts (select all, copy, paste, delete)
  - BIOS navigation keys
- Easy mode switching between mouse and keyboard
- Modern and accessible user interface
- Real-time connection status and error handling

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

   ### Mouse Mode
   - Use the directional pad for mouse movement
   - Toggle between small (20px) and large (80px) movements using the speed switch
   - Use the left and right click buttons for mouse clicks
   - Diagonal movements are supported for precise control

   ### Keyboard Mode
   - Use the text entry field to type text
   - Use the basic controls for common shortcuts
   - Use the navigation controls for arrow keys and enter
   - Use the function keys for F2, F10, F12, etc.
   - Use the BIOS loop button for BIOS access

6. Tap the mode switch button to toggle between mouse and keyboard modes
7. Tap "Disconnect" to end the connection

## Development

### Project Structure

- `src/services/BleService.ts` - BLE connection and command handling
- `src/components/MouseControls.tsx` - Mouse control interface
- `src/components/KeyboardControls.tsx` - Keyboard control interface
- `App.tsx` - Main application component and UI
- `app.json` - Expo configuration and permissions

### Building for Production

To create a production build:

```bash
# For Android
npx eas build --platform android

# For iOS
npx eas build --platform ios
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

4. If the app crashes:
   - Check the device logs for error messages
   - Ensure all permissions are granted
   - Try clearing the app cache and data

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 