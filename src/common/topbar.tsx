import React from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';

export default function Topbar(props: any) {
  return <View style={styles.logoContainer}>{props.children}</View>;
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    height: 40,
    width: '100%',
    zIndex: 20,
    paddingHorizontal: 10,
  },
});
