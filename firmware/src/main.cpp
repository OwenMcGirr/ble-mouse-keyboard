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

// Mouse controls
#define UP_BUTTON "B516"
#define DOWN_BUTTON "B615"
#define LEFT_BUTTON "B714"
#define RIGHT_BUTTON "B813"
#define CLICK_BUTTON "B11"

// Mode switch
#define MODE_SWITCH "MODE"

// Keyboard controls
#define SELECT_ALL "KSA"
#define COPY "KC"
#define PASTE "KP"
#define DELETE "KD"

// BIOS navigation keys
#define BIOS_UP "KBU"       // Up arrow
#define BIOS_DOWN "KBD"     // Down arrow
#define BIOS_LEFT "KBL"     // Left arrow
#define BIOS_RIGHT "KBR"    // Right arrow
#define BIOS_ENTER "KBE"    // Enter
#define BIOS_ESC "KBX"      // Escape
#define BIOS_F2 "KF2"       // F2 (common BIOS key)
#define BIOS_F10 "KF10"     // F10 (common BIOS key)
#define BIOS_F12 "KF12"     // F12 (common BIOS key)
#define BIOS_DELETE "KBDEL" // Delete key for BIOS entry
#define BIOS_LOOP "KBL"     // Loop key for BIOS entry

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
    if (command.indexOf(UP_BUTTON) >= 0)
    {
        mouse.moveUp();
    }
    else if (command.indexOf(DOWN_BUTTON) >= 0)
    {
        mouse.moveDown();
    }
    else if (command.indexOf(LEFT_BUTTON) >= 0)
    {
        mouse.moveLeft();
    }
    else if (command.indexOf(RIGHT_BUTTON) >= 0)
    {
        mouse.moveRight();
    }
    else if (command.indexOf(CLICK_BUTTON) >= 0)
    {
        mouse.click();
    }
}

void processKeyboardCommands(String command)
{
    if (command.indexOf(SELECT_ALL) >= 0)
    {
        keyboard.selectAll();
    }
    else if (command.indexOf(COPY) >= 0)
    {
        keyboard.copy();
    }
    else if (command.indexOf(PASTE) >= 0)
    {
        keyboard.paste();
    }
    else if (command.indexOf(DELETE) >= 0)
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
    if (!keyboardMode)
    {
        mouse.update();
    }

    if (ble.available())
    {
        String command = ble.readStringUntil('\n');
        command.trim();
        Serial.println(command);

        if (command.indexOf(MODE_SWITCH) >= 0)
        {
            keyboardMode = !keyboardMode;
        }
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