import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Castle from './assets/castle.svg';
import Notifications from './assets/notifications.svg';
import Flame from './assets/flame.svg';
import Clock from './assets/clock.svg';
import {colors} from './theme';
import Home from './home/home';

type BrandingProps = {
  active: number;
  setActive: Function;
};

export const Branding = ({active, setActive}: BrandingProps) => {
  return (
    <View style={styles.logoContainer}>
      <Castle
        height={colors.logoHeight}
        width={colors.logoWidth}
        style={{marginRight: 'auto'}}
      />

      <View
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Pressable
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 2,

            borderBottomColor:
              active === 1 ? colors.textPrimary : 'transparent',
          }}
          onPress={() => setActive(1)}>
          <Text
            style={{
              color: active === 1 ? colors.textPrimary : colors.textSecondary,
              fontWeight: colors.fontBold,
            }}>
            Trending
          </Text>
          <Flame
            stroke={active === 1 ? colors.textPrimary : colors.textSecondary}
            height={colors.iconHeight}
            width={colors.iconWidth}
          />
        </Pressable>

        <Text
          style={{
            color: '#ffffff30',
            fontSize: 40,
            fontWeight: '600',
            lineHeight: 40,
            paddingHorizontal: 6,
          }}>
          |
        </Text>
        <Pressable
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 2,

            borderBottomColor:
              active === 2 ? colors.textPrimary : 'transparent',
          }}
          onPress={() => setActive(2)}>
          <Text
            style={{
              color: active === 2 ? colors.textPrimary : colors.textSecondary,
              paddingRight: 4,
              fontWeight: colors.fontBold,
            }}>
            Recent
          </Text>
          <Clock
            stroke={active === 2 ? colors.textPrimary : colors.textSecondary}
            height={colors.iconHeight - 7}
            width={colors.iconWidth - 7}
          />
        </Pressable>
      </View>

      <Notifications
        stroke={'white'}
        height={colors.iconHeight}
        width={colors.iconWidth}
        style={{marginLeft: 'auto'}}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: 10,
    // backgroundColor: 'rgba( 255, 255, 255, 0.2 )',
    // borderBottomColor: 'rgb(255,255,255,0.18)',
    // borderBottomWidthWidth: 1,
    position: 'absolute',
    top: 0,
    height: 40,
    width: '100%',
    zIndex: 20,
    paddingHorizontal: 10,
  },
});
