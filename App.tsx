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

const App = () => {
  return (
    <SafeAreaView style={{backgroundColor: colors.bg, flex: 1}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <Memesfr />
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default App;
