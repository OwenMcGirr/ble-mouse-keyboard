#pragma once

#include "HID-Project.h"

class MouseController {
private:
    const int SMALL_MOVE = 20;
    const int LARGE_MOVE = 80;

public:
    void begin() {
        Mouse.begin();
    }

    // Small movements
    void moveUpSmall() {
        Mouse.move(0, -SMALL_MOVE);
    }

    void moveDownSmall() {
        Mouse.move(0, SMALL_MOVE);
    }

    void moveLeftSmall() {
        Mouse.move(-SMALL_MOVE, 0);
    }

    void moveRightSmall() {
        Mouse.move(SMALL_MOVE, 0);
    }

    void moveUpLeftSmall() {
        Mouse.move(-SMALL_MOVE, -SMALL_MOVE);
    }

    void moveUpRightSmall() {
        Mouse.move(SMALL_MOVE, -SMALL_MOVE);
    }

    void moveDownLeftSmall() {
        Mouse.move(-SMALL_MOVE, SMALL_MOVE);
    }

    void moveDownRightSmall() {
        Mouse.move(SMALL_MOVE, SMALL_MOVE);
    }

    // Large movements
    void moveUpLarge() {
        Mouse.move(0, -LARGE_MOVE);
    }

    void moveDownLarge() {
        Mouse.move(0, LARGE_MOVE);
    }

    void moveLeftLarge() {
        Mouse.move(-LARGE_MOVE, 0);
    }

    void moveRightLarge() {
        Mouse.move(LARGE_MOVE, 0);
    }

    void moveUpLeftLarge() {
        Mouse.move(-LARGE_MOVE, -LARGE_MOVE);
    }

    void moveUpRightLarge() {
        Mouse.move(LARGE_MOVE, -LARGE_MOVE);
    }

    void moveDownLeftLarge() {
        Mouse.move(-LARGE_MOVE, LARGE_MOVE);
    }

    void moveDownRightLarge() {
        Mouse.move(LARGE_MOVE, LARGE_MOVE);
    }

    void click() {
        Mouse.click();
    }

    void rightClick() {
        Mouse.click(MOUSE_RIGHT);
    }

    void update() {
        // No longer needed as we removed automation
    }
}; 