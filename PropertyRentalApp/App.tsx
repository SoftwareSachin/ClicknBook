import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState } from 'react';

// Import splash screen
import SplashFlowContainer from './src/components/splash/SplashFlowContainer';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <SafeAreaProvider>
      {showSplash ? (
        <SplashFlowContainer onSplashComplete={handleSplashComplete} />
      ) : (
        <StatusBar style="auto" />
      )}
    </SafeAreaProvider>
  );
}