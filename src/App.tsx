import React from 'react';
import StackNavigator from './StackNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createNavigationContainerRef } from '@react-navigation/core';
import { AuthProvider } from './hooks/useAuth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export const navigationRef = createNavigationContainerRef();

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <AuthProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StackNavigator />
          </GestureHandlerRootView>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
