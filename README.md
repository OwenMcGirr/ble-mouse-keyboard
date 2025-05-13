# BLE Mouse & Keyboard Controller

A complete solution for controlling a computer using Bluetooth Low Energy (BLE), consisting of an Arduino-based firmware and a React Native mobile app. This project was specifically designed to help people with physical disabilities, particularly those with cerebral palsy, who have difficulty using traditional keyboard and mouse input devices.

## Project Overview

This project consists of two main components:

1. **Firmware** (`/firmware`): Arduino-based firmware that runs on a BLE-enabled microcontroller and handles the actual mouse and keyboard input to the computer.
2. **Mobile App** (`/ble-mouse-keyboard-app`): React Native Expo app that provides an intuitive interface for controlling the device.

## Features

### Firmware Features
- Full mouse control with variable movement speeds
- Keyboard input support with common shortcuts
- BIOS navigation capabilities
- BLE connectivity for wireless control
- Support for diagonal mouse movements
- Left and right mouse click support

### Mobile App Features
- Intuitive mouse controls with 8-directional pad
- Variable movement speeds (small/large)
- Left and right click buttons
- Keyboard controls with text entry
- Common shortcuts (select all, copy, paste, delete)
- BIOS navigation keys
- Easy mode switching between mouse and keyboard
- Modern and accessible user interface
- Real-time connection status and error handling

## Hardware Requirements

- Arduino-compatible board with BLE support
- Adafruit Bluefruit LE module
- USB connection to target computer
- Mobile device (Android/iOS) for the controller app

## Getting Started

### Firmware Setup
1. Navigate to the firmware directory:
   ```bash
   cd firmware
   ```
2. Follow the instructions in the [firmware README](firmware/README.md) to set up and flash the firmware to your Arduino board.

### Mobile App Setup
1. Navigate to the app directory:
   ```bash
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
4. Follow the instructions in the [app README](ble-mouse-keyboard-app/README.md) for detailed setup and usage.

## Usage

1. Connect the Arduino to your computer via USB
2. Power on your mobile device and launch the BLE Mouse & Keyboard app
3. Tap "Scan for Devices" to search for available BLE devices
4. Select your device from the list to connect
5. Use the on-screen controls to operate your device:
   - Mouse Mode: Use the directional pad and click buttons
   - Keyboard Mode: Use the text entry and shortcut buttons
6. Tap the mode switch button to toggle between mouse and keyboard modes

## Development

### Project Structure
```
ble-mouse-keyboard/
├── firmware/                 # Arduino firmware
│   ├── src/                 # Source code
│   └── README.md           # Firmware documentation
│
└── ble-mouse-keyboard-app/   # React Native app
    ├── src/                 # Source code
    │   ├── components/     # React components
    │   └── services/      # BLE service
    └── README.md          # App documentation
```

### Building for Production

#### Firmware
- Use the Arduino IDE or PlatformIO to build and flash the firmware

#### Mobile App
```bash
# For Android
npx eas build --platform android

# For iOS
npx eas build --platform ios
```

## Why This Project?

This project was specifically designed to help individuals with cerebral palsy who face challenges with traditional input devices. The BLE interface allows for:

- Customizable input methods
- Reduced physical strain
- Alternative control schemes
- Accessibility to computer functions that would otherwise be difficult to access
- Variable movement speeds for precise control
- Support for both mouse and keyboard operations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open source and available under the MIT License. See the LICENSE file for details. 