#pragma once

#include "HID-Project.h"

class MouseController {
private:
    enum class Direction {
        NONE,
        UP,
        DOWN,
        LEFT,
        RIGHT
    };
    
    Direction currentDirection = Direction::NONE;
    unsigned long lastMoveTime = 0;
    const unsigned long MOVE_INTERVAL = 500; // 500ms between moves (slower)
    const int MOVE_AMOUNT = 20;  // Smaller movement amount

public:
    void begin() {
        Mouse.begin();
    }

    void moveUp() {
        if (currentDirection == Direction::UP) {
            currentDirection = Direction::NONE;
        } else {
            currentDirection = Direction::UP;
        }
    }

    void moveDown() {
        if (currentDirection == Direction::DOWN) {
            currentDirection = Direction::NONE;
        } else {
            currentDirection = Direction::DOWN;
        }
    }

    void moveLeft() {
        if (currentDirection == Direction::LEFT) {
            currentDirection = Direction::NONE;
        } else {
            currentDirection = Direction::LEFT;
        }
    }

    void moveRight() {
        if (currentDirection == Direction::RIGHT) {
            currentDirection = Direction::NONE;
        } else {
            currentDirection = Direction::RIGHT;
        }
    }

    void click() {
        Mouse.click();
    }

    void update() {
        unsigned long currentTime = millis();
        if (currentTime - lastMoveTime >= MOVE_INTERVAL) {
            switch (currentDirection) {
                case Direction::UP:
                    Mouse.move(0, -MOVE_AMOUNT);
                    break;
                case Direction::DOWN:
                    Mouse.move(0, MOVE_AMOUNT);
                    break;
                case Direction::LEFT:
                    Mouse.move(-MOVE_AMOUNT, 0);
                    break;
                case Direction::RIGHT:
                    Mouse.move(MOVE_AMOUNT, 0);
                    break;
                case Direction::NONE:
                    break;
            }
            lastMoveTime = currentTime;
        }
    }
}; 