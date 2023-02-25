import * as Haptics from 'expo-haptics';

export const callWithHapticFeedback = (call: Function) => {
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  call();
};
