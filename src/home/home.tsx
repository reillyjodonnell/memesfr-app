import React from 'react';
import Popular from './popular';
import Recent from './recent';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Branding} from '../branding';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text} from 'react-native';
import {colors} from '../theme';
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
      <Branding {...props}>
        <Text style={{color: colors.textPrimary}}>Notifications</Text>
      </Branding>
    </View>
  );
}
