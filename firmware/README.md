# BLE Mouse and Keyboard Controller

This project was created to help people with physical disabilities, particularly those with cerebral palsy, who have difficulty using traditional keyboard and mouse input devices. It provides an alternative input method through Bluetooth Low Energy (BLE) connectivity, allowing control of a computer using a mobile device or other BLE-enabled controller.

## Features

- Full mouse control (movement and clicks)
- Keyboard input support
- BIOS navigation capabilities
- BLE connectivity for wireless control
- Simple command interface

## Hardware Requirements

- Arduino-compatible board with BLE support
- Adafruit Bluefruit LE module
- USB connection to target computer

## Commands

### Mouse Controls
- `B516` - Move mouse up
- `B615` - Move mouse down
- `B714` - Move mouse left
- `B813` - Move mouse right
- `B11` - Mouse click

### Keyboard Controls
- `KSA` - Select all (Windows key + A)
- `KC` - Copy (Ctrl + C)
- `KP` - Paste (Ctrl + V)
- `KD` - Delete/Backspace

### BIOS Navigation
- `KBU` - Up arrow
- `KBD` - Down arrow
- `KBL` - Left arrow
- `KBR` - Right arrow
- `KBE` - Enter
- `KBX` - Escape
- `KF2` - F2 key
- `KF10` - F10 key
- `KF12` - F12 key
- `KBDEL` - Delete key
- `KBL` - BIOS entry loop (repeatedly presses Delete)

## Usage

1. Connect the Arduino to your computer via USB
2. Pair your BLE controller with the device
3. Send commands using the format specified above
4. For BIOS access, use the `KBL` command to enter the BIOS loop

## Why This Project?

This project was specifically designed to help individuals with cerebral palsy who face challenges with traditional input devices. The BLE interface allows for:

- Customizable input methods
- Reduced physical strain
- Alternative control schemes
- Accessibility to computer functions that would otherwise be difficult to access

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License. 