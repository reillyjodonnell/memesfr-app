import {GestureResponderEvent, Pressable} from 'react-native';
import React from 'react';
import Send from '../assets/send.svg';
import {colors} from '../theme';

export function SendButton({
  onPress,
}: {
  onPress: (event: GestureResponderEvent) => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: colors.spacing.s,
        marginRight: colors.spacing.s,
        backgroundColor: colors.line,
        borderRadius: colors.borderRadius.circle,
      }}>
      <Send
        width={colors.iconWidth - 4}
        height={colors.iconHeight - 4}
        stroke={colors.textPrimary}
      />
    </Pressable>
  );
}
