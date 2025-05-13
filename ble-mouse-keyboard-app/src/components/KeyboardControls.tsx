import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, TextInput } from 'react-native';
import { bleService } from '../services/BleService';

export const KeyboardControls = () => {
  const [text, setText] = React.useState('');

  const handleSend = async () => {
    if (!text.trim()) return;
    await bleService.sendText(text);
    setText('');
  };

  const keyboardActions = [
    // Basic keyboard actions
    { label: 'Select All', action: () => bleService.sendSelectAll(), icon: '📋' },
    { label: 'Copy', action: () => bleService.sendCopy(), icon: '📋' },
    { label: 'Paste', action: () => bleService.sendPaste(), icon: '📋' },
    { label: 'Delete', action: () => bleService.sendDelete(), icon: '⌫' },
  ];

  const navigationActions = [
    { label: '↑', action: () => bleService.sendBiosUp(), icon: '↑' },
    { label: '↓', action: () => bleService.sendBiosDown(), icon: '↓' },
    { label: '←', action: () => bleService.sendBiosLeft(), icon: '←' },
    { label: '→', action: () => bleService.sendBiosRight(), icon: '→' },
    { label: 'Enter', action: () => bleService.sendBiosEnter(), icon: '↵' },
  ];

  const functionKeys = [
    { label: 'F2', action: () => bleService.sendBiosF2(), icon: 'F2' },
    { label: 'F10', action: () => bleService.sendBiosF10(), icon: 'F10' },
    { label: 'F12', action: () => bleService.sendBiosF12(), icon: 'F12' },
    { label: 'Esc', action: () => bleService.sendBiosEsc(), icon: '⎋' },
    { label: 'Del', action: () => bleService.sendBiosDelete(), icon: '⌫' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Text Input Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Text Entry</Text>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={setText}
            placeholder="Type your text here..."
            multiline
            maxLength={100}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSend}
            disabled={!text.trim()}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Navigation Controls */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Navigation</Text>
        </View>
        <View style={styles.navigationGrid}>
          {navigationActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.navButton, action.label === 'Enter' && styles.enterButton]}
              onPress={action.action}
              activeOpacity={0.7}
            >
              <Text style={styles.navButtonText}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Basic Controls */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Basic Controls</Text>
        </View>
        <View style={styles.grid}>
          {keyboardActions.map((action, index) => (
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

      {/* Function Keys */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Function Keys</Text>
        </View>
        <View style={styles.grid}>
          {functionKeys.map((action, index) => (
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

      {/* BIOS Loop Button */}
      <TouchableOpacity
        style={styles.biosLoopButton}
        onPress={() => bleService.sendBiosLoop()}
        activeOpacity={0.7}
      >
        <Text style={styles.biosLoopButtonText}>BIOS Loop</Text>
      </TouchableOpacity>
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
  textInputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e1e4e8',
    minHeight: 40,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  navigationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  button: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    minWidth: '48%',
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
  navButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
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
  enterButton: {
    width: 160,
  },
  navButtonText: {
    fontSize: 24,
    color: '#007AFF',
    fontWeight: '600',
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
  biosLoopButton: {
    backgroundColor: '#FF3B30',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  biosLoopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 