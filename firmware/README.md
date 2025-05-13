# BLE Mouse and Keyboard Controller

This project was created to help people with physical disabilities, particularly those with cerebral palsy, who have difficulty using traditional keyboard and mouse input devices. It provides an alternative input method through Bluetooth Low Energy (BLE) connectivity, allowing control of a computer using a mobile device or other BLE-enabled controller.

## Features

- Full mouse control with variable movement speeds
- Keyboard input support with common shortcuts
- BIOS navigation capabilities
- BLE connectivity for wireless control
- Simple command interface
- Support for diagonal mouse movements
- Left and right mouse click support

## Hardware Requirements

- Arduino-compatible board with BLE support
- Adafruit Bluefruit LE module
- USB connection to target computer

## Commands

### Mouse Controls
- Small Movements (20px):
  - `MOUSE_UP_20` - Move mouse up
  - `MOUSE_DOWN_20` - Move mouse down
  - `MOUSE_LEFT_20` - Move mouse left
  - `MOUSE_RIGHT_20` - Move mouse right
  - `MOUSE_UP_LEFT_20` - Move mouse up-left
  - `MOUSE_UP_RIGHT_20` - Move mouse up-right
  - `MOUSE_DOWN_LEFT_20` - Move mouse down-left
  - `MOUSE_DOWN_RIGHT_20` - Move mouse down-right

- Large Movements (80px):
  - `MOUSE_UP_80` - Move mouse up
  - `MOUSE_DOWN_80` - Move mouse down
  - `MOUSE_LEFT_80` - Move mouse left
  - `MOUSE_RIGHT_80` - Move mouse right
  - `MOUSE_UP_LEFT_80` - Move mouse up-left
  - `MOUSE_UP_RIGHT_80` - Move mouse up-right
  - `MOUSE_DOWN_LEFT_80` - Move mouse down-left
  - `MOUSE_DOWN_RIGHT_80` - Move mouse down-right

- Mouse Clicks:
  - `MOUSE_LEFT_CLICK` - Left mouse click
  - `MOUSE_RIGHT_CLICK` - Right mouse click

### Keyboard Controls
- `KEYBOARD_SELECT_ALL` - Select all (Windows key + A)
- `KEYBOARD_COPY` - Copy (Ctrl + C)
- `KEYBOARD_PASTE` - Paste (Ctrl + V)
- `KEYBOARD_DELETE` - Delete/Backspace

### BIOS Navigation
- `BIOS_UP` - Up arrow
- `BIOS_DOWN` - Down arrow
- `BIOS_LEFT` - Left arrow
- `BIOS_RIGHT` - Right arrow
- `BIOS_ENTER` - Enter
- `BIOS_ESC` - Escape
- `BIOS_F2` - F2 key
- `BIOS_F10` - F10 key
- `BIOS_F12` - F12 key
- `BIOS_DELETE` - Delete key
- `BIOS_LOOP` - BIOS entry loop (repeatedly presses Delete)

### Mode Switching
- `MODE_MOUSE` - Switch to mouse mode
- `MODE_KEYBOARD` - Switch to keyboard mode

## Usage

1. Connect the Arduino to your computer via USB
2. Pair your BLE controller with the device
3. Send commands using the format specified above
4. For BIOS access, use the `BIOS_LOOP` command to enter the BIOS loop

## Why This Project?

This project was specifically designed to help individuals with cerebral palsy who face challenges with traditional input devices. The BLE interface allows for:

- Customizable input methods
- Reduced physical strain
- Alternative control schemes
- Accessibility to computer functions that would otherwise be difficult to access
- Variable movement speeds for precise control
- Support for both mouse and keyboard operations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License. 