import React from 'react';
import Popular from './popular';
import Recent from './recent';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Branding} from '../branding';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, Pressable} from 'react-native';
import {colors} from '../theme';
import Topbar from '../common/topbar';
import LeftArrow from '../assets/left-arrow.svg';
const Stack = createNativeStackNavigator();

const Tab = createMaterialTopTabNavigator();

function HomeComponent({navigation}: any) {
  return (
    <Tab.Navigator
      tabBar={props => {
        const combinedProps = {...props, navigation};
        return <Branding {...combinedProps} />;
      }}>
      <Tab.Screen name="Popular" component={Popular} />
      <Tab.Screen name="Recent" component={Recent} />
    </Tab.Navigator>
  );
}

export default function HomeWrapper() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="Home" component={HomeComponent} />
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  );
}

function Notifications(props) {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.bg,
      }}>
      <Topbar>
        <Pressable
          onPress={() => props?.navigation?.pop()}
          style={{marginRight: 'auto'}}>
          <LeftArrow
            width={colors.iconWidth + 10}
            height={colors.iconHeight + 10}
            stroke={'white'}
          />
        </Pressable>
        <Text
          style={{
            color: colors.textPrimary,
            fontWeight: colors.fontBold,
            marginRight: 'auto',
            fontSize: colors.fontLg,
          }}>
          Search
        </Text>
      </Topbar>
    </View>
  );
}
