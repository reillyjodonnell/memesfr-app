import {View} from 'react-native';
import {colors} from '../theme';
export default function OnlineStatus({isOnline = true}) {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: colors.onlineStatusSize,
        height: colors.onlineStatusSize,
        borderColor: colors.bg,
        borderRadius: colors.borderRadius.circle,
        borderWidth: colors.border.regular,
        backgroundColor: isOnline
          ? colors.onlineStatusColor
          : colors.offlineStatusColor,
      }}
    />
  );
}
