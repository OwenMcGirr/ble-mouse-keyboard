import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, SafeAreaView, StatusBar, Platform } from 'react-native';
import { bleService } from './src/services/BleService';
import { Device } from 'react-native-ble-plx';
import { KeyboardMode } from './src/components/KeyboardMode';
import { KeyboardControls } from './src/components/KeyboardControls';
import { MouseControls } from './src/components/MouseControls';

export default function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('Ready');

  useEffect(() => {
    initializeBle();
  }, []);

  const initializeBle = async () => {
    try {
      setStatus('Initializing Bluetooth...');
      await bleService.initialize();
      setStatus('Bluetooth initialized');
      setError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to initialize Bluetooth';
      setError(errorMessage);
      setStatus('Initialization failed');
      Alert.alert('Error', errorMessage);
    }
  };

  const startScan = async () => {
    setIsScanning(true);
    setError(null);
    setStatus('Scanning for devices...');
    try {
      const foundDevices = await bleService.scanForDevices();
      // Deduplicate devices based on ID
      const uniqueDevices = Array.from(
        new Map(foundDevices.map(device => [device.id, device])).values()
      );
      setDevices(uniqueDevices);
      setStatus(`Found ${uniqueDevices.length} devices`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to scan for devices';
      setError(errorMessage);
      setStatus('Scan failed');
      Alert.alert('Error', errorMessage);
    }
    setIsScanning(false);
  };

  const connectToDevice = async (device: Device) => {
    try {
      setStatus(`Connecting to ${device.name || 'device'}...`);
      await bleService.connectToDevice(device);
      setIsConnected(true);
      setStatus('Connected');
      setError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect to device';
      setError(errorMessage);
      setStatus('Connection failed');
      Alert.alert('Error', errorMessage);
    }
  };

  const disconnect = async () => {
    try {
      setStatus('Disconnecting...');
      await bleService.disconnect();
      setIsConnected(false);
      setIsKeyboardMode(false);
      setStatus('Disconnected');
      setError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to disconnect from device';
      setError(errorMessage);
      setStatus('Disconnect failed');
      Alert.alert('Error', errorMessage);
    }
  };

  const toggleMode = async () => {
    try {
      setStatus('Switching mode...');
      await bleService.sendModeSwitch();
      setIsKeyboardMode(!isKeyboardMode);
      setStatus(`Mode switched to ${isKeyboardMode ? 'Mouse' : 'Keyboard'}`);
      setError(null);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to switch mode';
      setError(errorMessage);
      setStatus('Mode switch failed');
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <View style={styles.header}>
        <Text style={styles.title}>BLE Mouse & Keyboard</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{status}</Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {!isConnected ? (
          <View style={styles.connectionContainer}>
            <TouchableOpacity
              style={[styles.scanButton, isScanning && styles.scanButtonDisabled]}
              onPress={startScan}
              disabled={isScanning}
              activeOpacity={0.7}
            >
              {isScanning ? (
                <View style={styles.scanningContainer}>
                  <ActivityIndicator color="white" />
                  <Text style={styles.buttonText}>Scanning...</Text>
                </View>
              ) : (
                <Text style={styles.buttonText}>Scan for Devices</Text>
              )}
            </TouchableOpacity>

            {devices.length > 0 ? (
              <View style={styles.deviceList}>
                {devices.map((device) => (
                  <TouchableOpacity
                    key={device.id}
                    style={styles.deviceButton}
                    onPress={() => connectToDevice(device)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.deviceInfo}>
                      <Text style={styles.deviceName}>
                        {device.name || 'Unknown Device'}
                      </Text>
                      <Text style={styles.deviceId}>
                        {device.id.slice(0, 8)}...
                      </Text>
                    </View>
                    <Text style={styles.connectText}>Connect</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>
                  {isScanning ? 'Scanning for devices...' : 'No devices found'}
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.controlsWrapper}>
            <TouchableOpacity
              style={[styles.modeButton, isKeyboardMode ? styles.keyboardModeActive : styles.mouseModeActive]}
              onPress={toggleMode}
              activeOpacity={0.7}
            >
              <Text style={styles.modeButtonText}>
                {isKeyboardMode ? '🖱️ Switch to Mouse Mode' : '⌨️ Switch to Keyboard Mode'}
              </Text>
            </TouchableOpacity>

            {isKeyboardMode ? (
              <KeyboardControls />
            ) : (
              <MouseControls />
            )}

            <TouchableOpacity
              style={styles.disconnectButton}
              onPress={disconnect}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Disconnect</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 16,
  },
  statusContainer: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e4e8',
  },
  statusText: {
    fontSize: 16,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 14,
    color: '#dc3545',
    marginTop: 4,
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  connectionContainer: {
    alignItems: 'center',
  },
  scanButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  scanButtonDisabled: {
    backgroundColor: '#6c757d',
  },
  scanningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  deviceList: {
    width: '100%',
  },
  deviceButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  deviceId: {
    fontSize: 12,
    color: '#666',
  },
  connectText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  controlsWrapper: {
    flex: 1,
  },
  controlsContainer: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  button: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    margin: 5,
    width: 80,
    height: 80,
    justifyContent: 'center',
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
    color: '#007AFF',
  },
  horizontalButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upButton: {
    marginBottom: 10,
  },
  downButton: {
    marginTop: 10,
  },
  leftButton: {
    marginRight: 10,
  },
  rightButton: {
    marginLeft: 10,
  },
  clickButton: {
    backgroundColor: '#dc3545',
    borderColor: '#dc3545',
  },
  modeButton: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  mouseModeActive: {
    backgroundColor: '#007AFF',
  },
  keyboardModeActive: {
    backgroundColor: '#28a745',
  },
  modeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  disconnectButton: {
    backgroundColor: '#dc3545',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  keyboardButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
  },
  movementControls: {
    marginBottom: 20,
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  keyboardSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  keyboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  biosLoopButton: {
    backgroundColor: '#FF3B30',
    width: '100%',
  },
});
