/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Memesfr from './src/memesfr';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native';
import {colors} from './src/theme';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {UserProvider} from './src/context/user-provider';

const App = () => {
  return (
    <UserProvider>
      <SafeAreaView style={{backgroundColor: colors.bg, flex: 1}}>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer>
            <BottomSheetModalProvider>
              <Memesfr />
            </BottomSheetModalProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </SafeAreaView>
    </UserProvider>
  );
};

export default App;
