#pragma once

#include "HID-Project.h"

class KeyboardController {
public:
    void begin() {
        Keyboard.begin();
    }

    void sendKey(char key) {
        Keyboard.press(key);
        Keyboard.release(key);
    }

    void sendString(String str) {
        Keyboard.print(str);
    }

    void sendEnter() {
        Keyboard.write(KEY_RETURN);
    }

    void msiBiosLoop() {
        for (int i = 0; i < 1000; i++) {
            // We have to repeatedly press delete to get into the bios
            deleteKey();
            delay(100);
        }
    }

    void leftArrow() {
        Keyboard.press(KEY_LEFT_ARROW);
        Keyboard.release(KEY_LEFT_ARROW);
    }

    void rightArrow() {
        Keyboard.press(KEY_RIGHT_ARROW);
        Keyboard.release(KEY_RIGHT_ARROW);
    }

    void upArrow() {
        Keyboard.press(KEY_UP_ARROW);
        Keyboard.release(KEY_UP_ARROW);
    }

    void downArrow() {
        Keyboard.press(KEY_DOWN_ARROW);
        Keyboard.release(KEY_DOWN_ARROW);
    }

    void selectAll() {
        // Press ctrl + a
        Keyboard.press(KEY_LEFT_CTRL);
        Keyboard.press('a');
        Keyboard.release(KEY_LEFT_CTRL);
        Keyboard.release('a');
    }

    void copy() {
        // Press ctrl + c
        Keyboard.press(KEY_LEFT_CTRL);
        Keyboard.press('c');
        Keyboard.release(KEY_LEFT_CTRL);
        Keyboard.release('c');
    }

    void paste() {
        // Press ctrl + v
        Keyboard.press(KEY_LEFT_CTRL);
        Keyboard.press('v');
        Keyboard.release(KEY_LEFT_CTRL);
        Keyboard.release('v');
    }

    void deleteKey() {
        // Press delete
        Keyboard.press(KEY_DELETE);
        Keyboard.release(KEY_DELETE);
    }
};
