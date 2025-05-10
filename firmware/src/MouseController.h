#pragma once

#include "HID-Project.h"

class MouseController {
public:
    void begin() {
        Mouse.begin();
    }

    void moveUp() {
        Mouse.move(0, -40);
    }

    void moveDown() {
        Mouse.move(0, 40);
    }

    void moveLeft() {
        Mouse.move(-40, 0);
    }

    void moveRight() {
        Mouse.move(40, 0);
    }

    void click() {
        Mouse.click();
    }
}; 