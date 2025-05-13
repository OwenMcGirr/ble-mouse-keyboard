import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Switch } from 'react-native';
import { bleService } from '../services/BleService';

export const MouseControls = () => {
  const [isLargeMovement, setIsLargeMovement] = useState(false);

  const handleMovement = (direction: string) => {
    if (isLargeMovement) {
      switch (direction) {
        case 'up': bleService.sendMouseUpLarge(); break;
        case 'down': bleService.sendMouseDownLarge(); break;
        case 'left': bleService.sendMouseLeftLarge(); break;
        case 'right': bleService.sendMouseRightLarge(); break;
        case 'upLeft': bleService.sendMouseUpLeftLarge(); break;
        case 'upRight': bleService.sendMouseUpRightLarge(); break;
        case 'downLeft': bleService.sendMouseDownLeftLarge(); break;
        case 'downRight': bleService.sendMouseDownRightLarge(); break;
      }
    } else {
      switch (direction) {
        case 'up': bleService.sendMouseUpSmall(); break;
        case 'down': bleService.sendMouseDownSmall(); break;
        case 'left': bleService.sendMouseLeftSmall(); break;
        case 'right': bleService.sendMouseRightSmall(); break;
        case 'upLeft': bleService.sendMouseUpLeftSmall(); break;
        case 'upRight': bleService.sendMouseUpRightSmall(); break;
        case 'downLeft': bleService.sendMouseDownLeftSmall(); break;
        case 'downRight': bleService.sendMouseDownRightSmall(); break;
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Movement Speed Toggle */}
      <View style={styles.speedControl}>
        <Text style={styles.speedLabel}>Movement Speed</Text>
        <View style={styles.speedToggle}>
          <Text style={[styles.speedText, !isLargeMovement && styles.activeSpeed]}>Small</Text>
          <Switch
            value={isLargeMovement}
            onValueChange={setIsLargeMovement}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isLargeMovement ? '#007AFF' : '#f4f3f4'}
          />
          <Text style={[styles.speedText, isLargeMovement && styles.activeSpeed]}>Large</Text>
        </View>
      </View>

      {/* Directional Pad */}
      <View style={styles.dpadContainer}>
        {/* Top Row */}
        <View style={styles.dpadRow}>
          <TouchableOpacity
            style={[styles.dpadButton, styles.cornerButton]}
            onPress={() => handleMovement('upLeft')}
            activeOpacity={0.7}
          >
            <Text style={styles.dpadIcon}>↖</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dpadButton, styles.edgeButton]}
            onPress={() => handleMovement('up')}
            activeOpacity={0.7}
          >
            <Text style={styles.dpadIcon}>↑</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dpadButton, styles.cornerButton]}
            onPress={() => handleMovement('upRight')}
            activeOpacity={0.7}
          >
            <Text style={styles.dpadIcon}>↗</Text>
          </TouchableOpacity>
        </View>

        {/* Middle Row */}
        <View style={styles.dpadRow}>
          <TouchableOpacity
            style={[styles.dpadButton, styles.edgeButton]}
            onPress={() => handleMovement('left')}
            activeOpacity={0.7}
          >
            <Text style={styles.dpadIcon}>←</Text>
          </TouchableOpacity>
          <View style={styles.dpadCenter} />
          <TouchableOpacity
            style={[styles.dpadButton, styles.edgeButton]}
            onPress={() => handleMovement('right')}
            activeOpacity={0.7}
          >
            <Text style={styles.dpadIcon}>→</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Row */}
        <View style={styles.dpadRow}>
          <TouchableOpacity
            style={[styles.dpadButton, styles.cornerButton]}
            onPress={() => handleMovement('downLeft')}
            activeOpacity={0.7}
          >
            <Text style={styles.dpadIcon}>↙</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dpadButton, styles.edgeButton]}
            onPress={() => handleMovement('down')}
            activeOpacity={0.7}
          >
            <Text style={styles.dpadIcon}>↓</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dpadButton, styles.cornerButton]}
            onPress={() => handleMovement('downRight')}
            activeOpacity={0.7}
          >
            <Text style={styles.dpadIcon}>↘</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Click Buttons */}
      <View style={styles.clickContainer}>
        <TouchableOpacity
          style={[styles.clickButton, styles.leftClickButton]}
          onPress={() => bleService.sendMouseLeftClick()}
          activeOpacity={0.7}
        >
          <Text style={styles.clickButtonText}>Left Click</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.clickButton, styles.rightClickButton]}
          onPress={() => bleService.sendMouseRightClick()}
          activeOpacity={0.7}
        >
          <Text style={styles.clickButtonText}>Right Click</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  speedControl: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  speedLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  speedToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  speedText: {
    fontSize: 14,
    color: '#666',
  },
  activeSpeed: {
    color: '#007AFF',
    fontWeight: '600',
  },
  dpadContainer: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  dpadRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dpadButton: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e4e8',
  },
  dpadCenter: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e1e4e8',
  },
  cornerButton: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  edgeButton: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dpadIcon: {
    fontSize: 24,
    color: '#007AFF',
  },
  clickContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 16,
  },
  clickButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  leftClickButton: {
    backgroundColor: '#007AFF',
  },
  rightClickButton: {
    backgroundColor: '#dc3545',
  },
  clickButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 