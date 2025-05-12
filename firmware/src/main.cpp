#include <Arduino.h>
#include "HID-Project.h"
#include "MouseController.h"
#include "KeyboardController.h"

#include "Adafruit_BLE.h"
#include "Adafruit_BluefruitLE_SPI.h"
#include "Adafruit_BluefruitLE_UART.h"

#define BLUEFRUIT_SPI_CS 8
#define BLUEFRUIT_SPI_IRQ 7
#define BLUEFRUIT_SPI_RST 4 // Optional but recommended, set to -1 if unused

// Mode commands
#define MODE_MOUSE "MODE_MOUSE"
#define MODE_KEYBOARD "MODE_KEYBOARD"

// Mouse controls - Small movements (20px)
#define MOUSE_UP_SMALL "MOUSE_UP_20"
#define MOUSE_DOWN_SMALL "MOUSE_DOWN_20"
#define MOUSE_LEFT_SMALL "MOUSE_LEFT_20"
#define MOUSE_RIGHT_SMALL "MOUSE_RIGHT_20"
#define MOUSE_UP_LEFT_SMALL "MOUSE_UP_LEFT_20"
#define MOUSE_UP_RIGHT_SMALL "MOUSE_UP_RIGHT_20"
#define MOUSE_DOWN_LEFT_SMALL "MOUSE_DOWN_LEFT_20"
#define MOUSE_DOWN_RIGHT_SMALL "MOUSE_DOWN_RIGHT_20"

// Mouse controls - Large movements (80px)
#define MOUSE_UP_LARGE "MOUSE_UP_80"
#define MOUSE_DOWN_LARGE "MOUSE_DOWN_80"
#define MOUSE_LEFT_LARGE "MOUSE_LEFT_80"
#define MOUSE_RIGHT_LARGE "MOUSE_RIGHT_80"
#define MOUSE_UP_LEFT_LARGE "MOUSE_UP_LEFT_80"
#define MOUSE_UP_RIGHT_LARGE "MOUSE_UP_RIGHT_80"
#define MOUSE_DOWN_LEFT_LARGE "MOUSE_DOWN_LEFT_80"
#define MOUSE_DOWN_RIGHT_LARGE "MOUSE_DOWN_RIGHT_80"

// Mouse click controls
#define MOUSE_LEFT_CLICK "MOUSE_LEFT_CLICK"
#define MOUSE_RIGHT_CLICK "MOUSE_RIGHT_CLICK"

// Keyboard controls
#define KEYBOARD_SELECT_ALL "KEYBOARD_SELECT_ALL"
#define KEYBOARD_COPY "KEYBOARD_COPY"
#define KEYBOARD_PASTE "KEYBOARD_PASTE"
#define KEYBOARD_DELETE "KEYBOARD_DELETE"

// BIOS navigation keys
#define BIOS_UP "BIOS_UP"
#define BIOS_DOWN "BIOS_DOWN"
#define BIOS_LEFT "BIOS_LEFT"
#define BIOS_RIGHT "BIOS_RIGHT"
#define BIOS_ENTER "BIOS_ENTER"
#define BIOS_ESC "BIOS_ESC"
#define BIOS_F2 "BIOS_F2"
#define BIOS_F10 "BIOS_F10"
#define BIOS_F12 "BIOS_F12"
#define BIOS_DELETE "BIOS_DELETE"
#define BIOS_LOOP "BIOS_LOOP"

Adafruit_BluefruitLE_SPI ble(BLUEFRUIT_SPI_CS, BLUEFRUIT_SPI_IRQ, BLUEFRUIT_SPI_RST);
MouseController mouse;
KeyboardController keyboard;

bool keyboardMode = false;

void setup()
{
    Serial.begin(9600);

    // start ble
    if (!ble.begin(true))
    {
        Serial.println("Bluefruit not found!!!");
    }
    else
    {
        Serial.println("Bluefruit found!!! BLE started!!!");
    }

    if (!ble.factoryReset())
    {
        Serial.println("Could not factory reset!!!");
    }

    // set broadcast name
    if (!ble.sendCommandCheckOK(F("AT+GAPDEVNAME=MouseAndKeyboard")))
    {
        Serial.println("Could not set broadcast name!!!");
    }

    // print info
    ble.info();

    // disable verbose
    ble.verbose(false);

    // set mode
    ble.setMode(BLUEFRUIT_MODE_DATA);

    delay(1000);
    mouse.begin();
    keyboard.begin();
}

void processMouseCommands(String command)
{
    if (command.indexOf(MOUSE_UP_SMALL) >= 0)
    {
        mouse.moveUpSmall();
    }
    else if (command.indexOf(MOUSE_DOWN_SMALL) >= 0)
    {
        mouse.moveDownSmall();
    }
    else if (command.indexOf(MOUSE_LEFT_SMALL) >= 0)
    {
        mouse.moveLeftSmall();
    }
    else if (command.indexOf(MOUSE_RIGHT_SMALL) >= 0)
    {
        mouse.moveRightSmall();
    }
    else if (command.indexOf(MOUSE_UP_LEFT_SMALL) >= 0)
    {
        mouse.moveUpLeftSmall();
    }
    else if (command.indexOf(MOUSE_UP_RIGHT_SMALL) >= 0)
    {
        mouse.moveUpRightSmall();
    }
    else if (command.indexOf(MOUSE_DOWN_LEFT_SMALL) >= 0)
    {
        mouse.moveDownLeftSmall();
    }
    else if (command.indexOf(MOUSE_DOWN_RIGHT_SMALL) >= 0)
    {
        mouse.moveDownRightSmall();
    }
    else if (command.indexOf(MOUSE_UP_LARGE) >= 0)
    {
        mouse.moveUpLarge();
    }
    else if (command.indexOf(MOUSE_DOWN_LARGE) >= 0)
    {
        mouse.moveDownLarge();
    }
    else if (command.indexOf(MOUSE_LEFT_LARGE) >= 0)
    {
        mouse.moveLeftLarge();
    }
    else if (command.indexOf(MOUSE_RIGHT_LARGE) >= 0)
    {
        mouse.moveRightLarge();
    }
    else if (command.indexOf(MOUSE_UP_LEFT_LARGE) >= 0)
    {
        mouse.moveUpLeftLarge();
    }
    else if (command.indexOf(MOUSE_UP_RIGHT_LARGE) >= 0)
    {
        mouse.moveUpRightLarge();
    }
    else if (command.indexOf(MOUSE_DOWN_LEFT_LARGE) >= 0)
    {
        mouse.moveDownLeftLarge();
    }
    else if (command.indexOf(MOUSE_DOWN_RIGHT_LARGE) >= 0)
    {
        mouse.moveDownRightLarge();
    }
    else if (command.indexOf(MOUSE_LEFT_CLICK) >= 0)
    {
        mouse.click();
    }
    else if (command.indexOf(MOUSE_RIGHT_CLICK) >= 0)
    {
        mouse.rightClick();
    }
}

void processKeyboardCommands(String command)
{
    if (command.indexOf(KEYBOARD_SELECT_ALL) >= 0)
    {
        keyboard.selectAll();
    }
    else if (command.indexOf(KEYBOARD_COPY) >= 0)
    {
        keyboard.copy();
    }
    else if (command.indexOf(KEYBOARD_PASTE) >= 0)
    {
        keyboard.paste();
    }
    else if (command.indexOf(KEYBOARD_DELETE) >= 0)
    {
        keyboard.deleteKey();
    }
    else if (command.indexOf(BIOS_UP) >= 0)
    {
        keyboard.upArrow();
    }
    else if (command.indexOf(BIOS_DOWN) >= 0)
    {
        keyboard.downArrow();
    }
    else if (command.indexOf(BIOS_LEFT) >= 0)
    {
        keyboard.leftArrow();
    }
    else if (command.indexOf(BIOS_RIGHT) >= 0)
    {
        keyboard.rightArrow();
    }
    else if (command.indexOf(BIOS_ENTER) >= 0)
    {
        keyboard.sendEnter();
    }
    else if (command.indexOf(BIOS_DELETE) >= 0)
    {
        keyboard.sendKey(KEY_DELETE);
    }
    else if (command.indexOf(BIOS_ESC) >= 0)
    {
        keyboard.sendKey(KEY_ESC);
    }
    else if (command.indexOf(BIOS_F2) >= 0)
    {
        keyboard.sendKey(KEY_F2);
    }
    else if (command.indexOf(BIOS_F10) >= 0)
    {
        keyboard.sendKey(KEY_F10);
    }
    else if (command.indexOf(BIOS_F12) >= 0)
    {
        keyboard.sendKey(KEY_F12);
    }
    else if (command.indexOf(BIOS_LOOP) >= 0)
    {
        keyboard.msiBiosLoop();
    }
    else
    {
        keyboard.sendString(command);
    }
}

void loop()
{
    if (ble.available())
    {
        String command = ble.readStringUntil('\n');
        command.trim();
        Serial.println(command);

        // Process mode commands first
        if (command.indexOf(MODE_MOUSE) >= 0)
        {
            keyboardMode = false;
            Serial.println("Switched to Mouse Mode");
        }
        else if (command.indexOf(MODE_KEYBOARD) >= 0)
        {
            keyboardMode = true;
            Serial.println("Switched to Keyboard Mode");
        }
        // Then process the appropriate commands based on current mode
        else if (keyboardMode)
        {
            processKeyboardCommands(command);
        }
        else
        {
            processMouseCommands(command);
        }
    }
}