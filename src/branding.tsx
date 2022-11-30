import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Castle from './assets/castle.svg';

export const Branding = () => {
  return (
    <View style={styles.logoContainer}>
      <Castle height={60} width={60} />
      <Text
        style={{
          color: 'white',
          paddingLeft: 10,
          fontSize: 45,
          fontWeight: 'bold',
        }}>
        Memesfr
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});
