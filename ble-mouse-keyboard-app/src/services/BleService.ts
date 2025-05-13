import { BleManager, Device, State } from 'react-native-ble-plx';
import { Platform, PermissionsAndroid, NativeModules } from 'react-native';

class BleService {
  private bleManager: BleManager;
  private device: Device | null = null;
  private isConnected: boolean = false;
  private isKeyboardMode: boolean = false;
  private readonly DEVICE_NAME = 'MouseAndKeyboard';
  
  // Nordic UART Service UUIDs
  private readonly UART_SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
  private readonly TX_CHARACTERISTIC_UUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
  private readonly RX_CHARACTERISTIC_UUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';

  constructor() {
    this.bleManager = new BleManager();
  }

  async initialize(): Promise<void> {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        ]);

        const allGranted = Object.values(granted).every(
          (permission) => permission === PermissionsAndroid.RESULTS.GRANTED
        );

        if (!allGranted) {
          throw new Error('Bluetooth permissions not granted');
        }
      }

      console.log('BLE initialized successfully');
    } catch (error) {
      console.error('BLE initialization error:', error);
      throw error;
    }
  }

  async scanForDevices(): Promise<Device[]> {
    return new Promise((resolve, reject) => {
      const devices: Device[] = [];
      console.log('Starting BLE scan for device:', this.DEVICE_NAME);
      
      // Scan specifically for devices with the UART service
      this.bleManager.startDeviceScan([this.UART_SERVICE_UUID], null, (error, device) => {
        if (error) {
          console.error('Scan error:', error);
          this.bleManager.stopDeviceScan();
          reject(error);
          return;
        }

        if (device) {
          console.log('Found device:', device.name, device.id);
          if (device.name === this.DEVICE_NAME) {
            console.log('Found matching device:', device.name);
            devices.push(device);
          }
        }
      });

      // Stop scanning after 10 seconds
      setTimeout(() => {
        console.log('Stopping scan, found matching devices:', devices.length);
        this.bleManager.stopDeviceScan();
        resolve(devices);
      }, 10000);
    });
  }

  async connectToDevice(device: Device): Promise<void> {
    try {
      console.log('Connecting to device:', device.name);
      await device.connect();
      console.log('Connected, discovering services...');
      
      // Wait a bit before discovering services (like in your Swift code)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Discover only the UART service
      await device.discoverAllServicesAndCharacteristics();
      const services = await device.services();
      const uartService = services.find(service => service.uuid.toLowerCase() === this.UART_SERVICE_UUID.toLowerCase());
      
      if (!uartService) {
        throw new Error('UART service not found on device');
      }
      
      console.log('Found UART service:', uartService.uuid);
      
      // Discover only the TX and RX characteristics
      const characteristics = await uartService.characteristics();
      const txCharacteristic = characteristics.find(
        char => char.uuid.toLowerCase() === this.TX_CHARACTERISTIC_UUID.toLowerCase()
      );
      const rxCharacteristic = characteristics.find(
        char => char.uuid.toLowerCase() === this.RX_CHARACTERISTIC_UUID.toLowerCase()
      );
      
      if (!txCharacteristic) {
        throw new Error('TX characteristic not found on device');
      }
      
      console.log('Found TX characteristic:', txCharacteristic.uuid);
      
      // Enable notifications for RX characteristic if found
      if (rxCharacteristic) {
        await rxCharacteristic.monitor((error, characteristic) => {
          if (error) {
            console.error('RX notification error:', error);
            return;
          }
          if (characteristic?.value) {
            const value = Buffer.from(characteristic.value, 'base64').toString('utf8');
            console.log('Received:', value);
            // Handle received data here
          }
        });
      }
      
      this.device = device;
      this.isConnected = true;
      console.log('Connection process completed successfully');
    } catch (error) {
      console.error('Connection error:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (this.device) {
      try {
        console.log('Disconnecting from device');
        await this.device.cancelConnection();
        this.device = null;
        this.isConnected = false;
        console.log('Disconnected successfully');
      } catch (error) {
        console.error('Disconnect error:', error);
        throw error;
      }
    }
  }

  async sendCommand(command: string): Promise<void> {
    if (!this.device || !this.isConnected) {
      throw new Error('Device not connected');
    }

    try {
      console.log('Sending command:', command);
      
      // Get the UART service
      const services = await this.device.services();
      const uartService = services.find(service => service.uuid.toLowerCase() === this.UART_SERVICE_UUID.toLowerCase());
      
      if (!uartService) {
        throw new Error('UART service not found');
      }
      
      // Get the TX characteristic
      const characteristics = await uartService.characteristics();
      const txCharacteristic = characteristics.find(
        char => char.uuid.toLowerCase() === this.TX_CHARACTERISTIC_UUID.toLowerCase()
      );
      
      if (!txCharacteristic) {
        throw new Error('TX characteristic not found');
      }
      
      // Convert string to base64 using TextEncoder
      const encoder = new TextEncoder();
      const data = encoder.encode(command);
      const base64Data = btoa(String.fromCharCode.apply(null, Array.from(data)));
      
      await txCharacteristic.writeWithResponse(base64Data);
      console.log('Command sent successfully');
    } catch (error) {
      console.error('Error sending command:', error);
      throw error;
    }
  }

  // Mouse commands
  async sendMouseUpSmall(): Promise<void> {
    await this.sendCommand('MOUSE_UP_20');
  }

  async sendMouseDownSmall(): Promise<void> {
    await this.sendCommand('MOUSE_DOWN_20');
  }

  async sendMouseLeftSmall(): Promise<void> {
    await this.sendCommand('MOUSE_LEFT_20');
  }

  async sendMouseRightSmall(): Promise<void> {
    await this.sendCommand('MOUSE_RIGHT_20');
  }

  async sendMouseUpLeftSmall(): Promise<void> {
    await this.sendCommand('MOUSE_UP_LEFT_20');
  }

  async sendMouseUpRightSmall(): Promise<void> {
    await this.sendCommand('MOUSE_UP_RIGHT_20');
  }

  async sendMouseDownLeftSmall(): Promise<void> {
    await this.sendCommand('MOUSE_DOWN_LEFT_20');
  }

  async sendMouseDownRightSmall(): Promise<void> {
    await this.sendCommand('MOUSE_DOWN_RIGHT_20');
  }

  async sendMouseUpLarge(): Promise<void> {
    await this.sendCommand('MOUSE_UP_80');
  }

  async sendMouseDownLarge(): Promise<void> {
    await this.sendCommand('MOUSE_DOWN_80');
  }

  async sendMouseLeftLarge(): Promise<void> {
    await this.sendCommand('MOUSE_LEFT_80');
  }

  async sendMouseRightLarge(): Promise<void> {
    await this.sendCommand('MOUSE_RIGHT_80');
  }

  async sendMouseUpLeftLarge(): Promise<void> {
    await this.sendCommand('MOUSE_UP_LEFT_80');
  }

  async sendMouseUpRightLarge(): Promise<void> {
    await this.sendCommand('MOUSE_UP_RIGHT_80');
  }

  async sendMouseDownLeftLarge(): Promise<void> {
    await this.sendCommand('MOUSE_DOWN_LEFT_80');
  }

  async sendMouseDownRightLarge(): Promise<void> {
    await this.sendCommand('MOUSE_DOWN_RIGHT_80');
  }

  async sendMouseLeftClick(): Promise<void> {
    await this.sendCommand('MOUSE_LEFT_CLICK');
  }

  async sendMouseRightClick(): Promise<void> {
    await this.sendCommand('MOUSE_RIGHT_CLICK');
  }

  // Mode switching
  async sendModeSwitch(): Promise<void> {
    this.isKeyboardMode = !this.isKeyboardMode;
    await this.sendCommand(this.isKeyboardMode ? 'MODE_KEYBOARD' : 'MODE_MOUSE');
  }

  // Keyboard commands
  async sendSelectAll(): Promise<void> {
    await this.sendCommand('KEYBOARD_SELECT_ALL');
  }

  async sendCopy(): Promise<void> {
    await this.sendCommand('KEYBOARD_COPY');
  }

  async sendPaste(): Promise<void> {
    await this.sendCommand('KEYBOARD_PASTE');
  }

  async sendDelete(): Promise<void> {
    await this.sendCommand('KEYBOARD_DELETE');
  }

  // BIOS navigation commands
  async sendBiosUp(): Promise<void> {
    await this.sendCommand('BIOS_UP');
  }

  async sendBiosDown(): Promise<void> {
    await this.sendCommand('BIOS_DOWN');
  }

  async sendBiosLeft(): Promise<void> {
    await this.sendCommand('BIOS_LEFT');
  }

  async sendBiosRight(): Promise<void> {
    await this.sendCommand('BIOS_RIGHT');
  }

  async sendBiosEnter(): Promise<void> {
    await this.sendCommand('BIOS_ENTER');
  }

  async sendBiosEsc(): Promise<void> {
    await this.sendCommand('BIOS_ESC');
  }

  async sendBiosF2(): Promise<void> {
    await this.sendCommand('BIOS_F2');
  }

  async sendBiosF10(): Promise<void> {
    await this.sendCommand('BIOS_F10');
  }

  async sendBiosF12(): Promise<void> {
    await this.sendCommand('BIOS_F12');
  }

  async sendBiosDelete(): Promise<void> {
    await this.sendCommand('BIOS_DELETE');
  }

  async sendBiosLoop(): Promise<void> {
    await this.sendCommand('BIOS_LOOP');
  }

  async sendText(text: string): Promise<void> {
    // Send each character with a small delay to prevent overwhelming the device
    for (const char of text) {
      await this.sendCommand(char);
      await new Promise(resolve => setTimeout(resolve, 50)); // 50ms delay between characters
    }
  }
}

export const bleService = new BleService(); 