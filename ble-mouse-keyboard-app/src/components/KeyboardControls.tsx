import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { bleService } from '../services/BleService';

export const KeyboardControls = () => {
  const keyboardActions = [
    // Basic keyboard actions
    { label: 'Select All', action: () => bleService.sendSelectAll(), icon: '📋' },
    { label: 'Copy', action: () => bleService.sendCopy(), icon: '📋' },
    { label: 'Paste', action: () => bleService.sendPaste(), icon: '📋' },
    { label: 'Delete', action: () => bleService.sendDelete(), icon: '⌫' },
    
    // BIOS navigation keys
    { label: 'Up Arrow', action: () => bleService.sendCommand('KBU'), icon: '↑' },
    { label: 'Down Arrow', action: () => bleService.sendCommand('KBD'), icon: '↓' },
    { label: 'Left Arrow', action: () => bleService.sendCommand('KBL'), icon: '←' },
    { label: 'Right Arrow', action: () => bleService.sendCommand('KBR'), icon: '→' },
    { label: 'Enter', action: () => bleService.sendCommand('KBE'), icon: '↵' },
    { label: 'Escape', action: () => bleService.sendCommand('KBX'), icon: '⎋' },
    { label: 'F2', action: () => bleService.sendCommand('KF2'), icon: 'F2' },
    { label: 'F10', action: () => bleService.sendCommand('KF10'), icon: 'F10' },
    { label: 'F12', action: () => bleService.sendCommand('KF12'), icon: 'F12' },
    { label: 'Delete', action: () => bleService.sendCommand('KBDEL'), icon: '⌫' },
    { label: 'BIOS Loop', action: () => bleService.sendCommand('KBL'), icon: '🔄' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Basic Controls</Text>
          <Text style={styles.sectionSubtitle}>Common keyboard shortcuts</Text>
        </View>
        <View style={styles.grid}>
          {keyboardActions.slice(0, 4).map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={action.action}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonIcon}>{action.icon}</Text>
              <Text style={styles.buttonText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>BIOS Navigation</Text>
          <Text style={styles.sectionSubtitle}>System and BIOS controls</Text>
        </View>
        <View style={styles.grid}>
          {keyboardActions.slice(4).map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.button}
              onPress={action.action}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonIcon}>{action.icon}</Text>
              <Text style={styles.buttonText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    margin: 6,
    minWidth: '45%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e4e8',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonIcon: {
    fontSize: 24,
    marginBottom: 8,
    color: '#007AFF',
  },
  buttonText: {
    color: '#1a1a1a',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
}); 