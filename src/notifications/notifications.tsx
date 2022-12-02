import React from 'react';
import {Text, View} from 'react-native';
import {Branding} from '../branding';
import {colors} from '../theme';

export default function Notifications() {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.bg,
      }}>
      <Branding>
        <Text
          style={{
            color: colors.textPrimary,
            fontWeight: colors.fontBold,
            fontSize: colors.fontXL,
          }}>
          Notifications
        </Text>
      </Branding>
    </View>
  );
}
