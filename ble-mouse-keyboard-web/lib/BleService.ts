class BleService {
  private device: BluetoothDevice | null = null;
  private server: BluetoothRemoteGATTServer | null = null;
  private service: BluetoothRemoteGATTService | null = null;
  private txCharacteristic: BluetoothRemoteGATTCharacteristic | null = null;
  private rxCharacteristic: BluetoothRemoteGATTCharacteristic | null = null;

  public isConnected: boolean = false;
  public isKeyboardMode: boolean = false;

  // UART Service UUIDs
  private readonly UART_SERVICE_UUID = '6e400001-b5a3-f393-e0a9-e50e24dcca9e';
  private readonly TX_CHARACTERISTIC_UUID = '6e400002-b5a3-f393-e0a9-e50e24dcca9e';
  private readonly RX_CHARACTERISTIC_UUID = '6e400003-b5a3-f393-e0a9-e50e24dcca9e';
  private readonly DEVICE_NAME = 'MouseAndKeyboard';

  async requestDevice(): Promise<BluetoothDevice> {
    if (!navigator.bluetooth) {
      throw new Error('Web Bluetooth is not supported in this browser');
    }

    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [
          { name: this.DEVICE_NAME },
          { services: [this.UART_SERVICE_UUID] }
        ],
        optionalServices: [this.UART_SERVICE_UUID]
      });

      this.device = device;

      // Add disconnect listener
      device.addEventListener('gattserverdisconnected', this.onDisconnected.bind(this));

      return device;
    } catch (error) {
      throw new Error(`Failed to request device: ${error}`);
    }
  }

  async connectToDevice(device: BluetoothDevice): Promise<void> {
    try {
      this.device = device;

      console.log('Connecting to GATT server...');
      this.server = await device.gatt!.connect();

      console.log('Getting UART service...');
      this.service = await this.server.getPrimaryService(this.UART_SERVICE_UUID);

      console.log('Getting characteristics...');
      this.txCharacteristic = await this.service.getCharacteristic(this.TX_CHARACTERISTIC_UUID);
      this.rxCharacteristic = await this.service.getCharacteristic(this.RX_CHARACTERISTIC_UUID);

      // Enable notifications on RX characteristic
      await this.rxCharacteristic.startNotifications();
      this.rxCharacteristic.addEventListener('characteristicvaluechanged', this.handleRxData.bind(this));

      this.isConnected = true;
      console.log('Successfully connected to device');
    } catch (error) {
      this.isConnected = false;
      throw new Error(`Failed to connect: ${error}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.device && this.device.gatt?.connected) {
      this.device.gatt.disconnect();
    }
    this.cleanup();
  }

  private onDisconnected(): void {
    console.log('Device disconnected');
    this.cleanup();
  }

  private cleanup(): void {
    this.isConnected = false;
    this.device = null;
    this.server = null;
    this.service = null;
    this.txCharacteristic = null;
    this.rxCharacteristic = null;
  }

  private handleRxData(event: Event): void {
    const characteristic = event.target as BluetoothRemoteGATTCharacteristic;
    const value = characteristic.value;
    if (value) {
      const decoder = new TextDecoder();
      const data = decoder.decode(value);
      console.log('Received data:', data);
    }
  }

  private async sendCommand(command: string): Promise<void> {
    if (!this.isConnected || !this.txCharacteristic) {
      throw new Error('Device not connected');
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(command);
      await this.txCharacteristic.writeValue(data);
    } catch (error) {
      throw new Error(`Failed to send command: ${error}`);
    }
  }

  // Mouse Commands - Small movements (20px)
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

  // Mouse Commands - Large movements (80px)
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

  // Mouse Click Commands
  async sendMouseLeftClick(): Promise<void> {
    await this.sendCommand('MOUSE_LEFT_CLICK');
  }

  async sendMouseRightClick(): Promise<void> {
    await this.sendCommand('MOUSE_RIGHT_CLICK');
  }

  // Keyboard Commands - Basic
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

  // BIOS Navigation Commands
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

  // BIOS Function Keys
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

  // Text Input
  async sendText(text: string): Promise<void> {
    for (const char of text) {
      await this.sendCommand(char);
      // Add small delay between characters
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  }

  // Mode Switching
  async sendModeSwitch(): Promise<void> {
    const command = this.isKeyboardMode ? 'MODE_MOUSE' : 'MODE_KEYBOARD';
    await this.sendCommand(command);
    this.isKeyboardMode = !this.isKeyboardMode;
  }
}

export const bleService = new BleService();
