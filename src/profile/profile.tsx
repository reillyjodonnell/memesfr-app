import {View} from 'react-native';
import {colors} from '../theme';

export default function Profile() {
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
      }}>
      <View
        style={{
          height: '20%',
          backgroundColor: colors.accent,
          width: '100%',
        }}></View>
    </View>
  );
}
