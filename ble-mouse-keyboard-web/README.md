# BLE Mouse & Keyboard - Web App

A Next.js web application for controlling a BLE Mouse & Keyboard device using the Web Bluetooth API. This is a web-based alternative to the React Native mobile app, allowing you to control your BLE device from any compatible web browser.

## Features

- **Web Bluetooth Integration**: Uses the Web Bluetooth API for direct browser-to-device communication
- **Mouse Controls**: 8-directional movement pad with variable speeds (20px and 80px)
- **Keyboard Controls**: Full text entry, navigation keys, function keys, and BIOS controls
- **Mode Switching**: Toggle between mouse and keyboard modes
- **Real-time Connection**: Live connection status and error handling
- **Responsive Design**: Modern UI built with Tailwind CSS
- **TypeScript**: Full type safety throughout the application

## Browser Compatibility

This application uses the Web Bluetooth API, which is supported in:

- ✅ Google Chrome (desktop) - version 56+
- ✅ Microsoft Edge (desktop) - version 79+
- ✅ Opera (desktop) - version 43+
- ✅ Chrome on Android - version 56+
- ❌ Safari (not supported)
- ❌ Firefox (not supported by default)
- ❌ iOS browsers (not supported due to Apple restrictions)

**Note**: For the best experience, use Google Chrome or Microsoft Edge on desktop.

## Requirements

- Node.js 18+ and npm
- A compatible web browser (Chrome, Edge, or Opera)
- BLE Mouse & Keyboard hardware device (see main project README)

## Getting Started

### Installation

1. Clone the repository and navigate to the web app directory:
   ```bash
   cd ble-mouse-keyboard-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in a compatible browser

### Building for Production

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

### Deployment

This Next.js app can be deployed to any platform that supports Next.js:

- **Vercel** (recommended): `vercel deploy`
- **Netlify**: Configure for Next.js deployment
- **Docker**: Use the included Dockerfile
- **Self-hosted**: Build and run on your own server

**Important**: When deploying, ensure your site is served over HTTPS. Web Bluetooth requires a secure context (HTTPS) to function, except on localhost.

## Usage

1. **Connect to Device**:
   - Ensure your BLE Mouse & Keyboard device is powered on
   - Click "Connect to Device" button
   - Select "MouseAndKeyboard" from the browser's device picker
   - Wait for connection confirmation

2. **Mouse Mode**:
   - Use the 8-directional pad to move the mouse
   - Toggle between Small (20px) and Large (80px) movement speeds
   - Click the blue button for left click
   - Click the red button for right click

3. **Keyboard Mode**:
   - Click "Switch to Keyboard" to enter keyboard mode
   - Enter text in the text area and click "Send"
   - Use navigation arrows for directional input
   - Access function keys (F2, F10, F12, ESC)
   - Use shortcut buttons (Select All, Copy, Paste, Delete)
   - Use BIOS navigation controls

4. **Disconnect**:
   - Click the "Disconnect" button in the header
   - The device will safely disconnect

## Project Structure

```
ble-mouse-keyboard-web/
├── app/
│   ├── page.tsx          # Main application page
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles
├── components/
│   ├── MouseControls.tsx    # Mouse control interface
│   └── KeyboardControls.tsx # Keyboard control interface
├── lib/
│   └── BleService.ts     # Web Bluetooth service
├── public/               # Static assets
└── package.json          # Dependencies
```

## Web Bluetooth API

This application uses the Web Bluetooth API to communicate with BLE devices. The key differences from the React Native version:

- **No permissions required**: The browser handles permission requests through the device picker
- **HTTPS required**: Must be served over HTTPS (except localhost)
- **User gesture required**: Connection must be initiated by user interaction (button click)
- **Different API**: Uses `navigator.bluetooth` instead of React Native libraries

### BLE Configuration

- **Service UUID**: `6e400001-b5a3-f393-e0a9-e50e24dcca9e` (Nordic UART Service)
- **TX Characteristic**: `6e400002-b5a3-f393-e0a9-e50e24dcca9e` (Write)
- **RX Characteristic**: `6e400003-b5a3-f393-e0a9-e50e24dcca9e` (Notify)

## Troubleshooting

### Connection Issues

- **Browser not supported**: Use Chrome, Edge, or Opera
- **Device not found**: Ensure device is powered on and in range
- **Connection fails**: Try refreshing the page and reconnecting
- **HTTPS error**: Ensure you're using HTTPS or localhost

### Performance Issues

- **Slow response**: Check Bluetooth signal strength
- **Commands not working**: Verify device firmware is running correctly
- **Disconnections**: Ensure device battery is charged

### Development Issues

- **Build errors**: Clear `.next` folder and rebuild
- **TypeScript errors**: Run `npm run build` to check for type issues
- **Port conflicts**: Change port in package.json dev script

## Development

### Available Scripts

- `npm run dev` - Start development server (with Turbopack)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Making Changes

The application uses:
- **Next.js 15** with App Router
- **React 19** for UI
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Web Bluetooth API** for device communication

## Security Considerations

- Web Bluetooth requires HTTPS in production
- The browser's device picker prevents connecting to arbitrary devices
- No personal data is stored or transmitted
- All communication is direct between browser and BLE device

## Accessibility

This application was designed with accessibility in mind:
- Large, high-contrast buttons
- Clear visual feedback
- Keyboard-friendly interface
- Screen reader compatible
- Designed to help people with physical disabilities

## License

This project is part of the BLE Mouse & Keyboard Controller project and shares the same license.

## Related Projects

- [Main Project README](../README.md)
- [React Native App](../ble-mouse-keyboard-app/README.md)
- [Firmware](../firmware/README.md)
