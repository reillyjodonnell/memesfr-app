import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Castle from './assets/castle.svg';
import {colors} from './theme';

export const Branding = ({
  rightContainer,
  children,
}: {
  rightContainer: JSX.Element;
  children: JSX.Element;
}) => {
  return (
    <View style={styles.logoContainer}>
      <Pressable
        style={{
          marginRight: 'auto',
        }}>
        <Castle height={colors.logoHeight} width={colors.logoWidth} />
      </Pressable>
      <View
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {children}
      </View>
      <View
        style={{marginLeft: 'auto', display: 'flex', justifyContent: 'center'}}>
        {rightContainer}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    height: colors.topbarHeight,
    backgroundColor: colors.transparent,

    width: '100%',
    zIndex: 20,
    paddingHorizontal: 10,
  },
  icons: {
    paddingHorizontal: 20,
  },
});
