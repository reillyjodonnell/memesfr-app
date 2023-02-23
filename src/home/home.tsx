import React from 'react';
import Popular from './popular';
import Recent from './recent';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, Pressable} from 'react-native';
import {colors} from '../theme';
import Topbar from '../common/topbar';
import LeftArrow from '../assets/left-arrow.svg';
import Castle from '../assets/castle.svg';

const Stack = createNativeStackNavigator();

const Tab = createMaterialTopTabNavigator();

function HomeComponent({navigation}: any) {
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.bg,
          paddingVertical: colors.spacing.s,
        }}>
        <Castle
          style={{backgroundColor: 'transparent', marginRight: 4}}
          height={colors.logoHeight}
          width={colors.logoWidth}
        />
        <Text
          style={{
            fontWeight: colors.fontBold,
            fontSize: colors.fontXL + 6,
            color: colors.textPrimary,
          }}>
          Memesfr
        </Text>
      </View>
      {/* <Branding /> */}
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: colors.accent,
            maxWidth: 60,
            height: 4,
            left: 68,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarActiveTintColor: colors.textPrimary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarItemStyle: {},

          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '700',
          },
          tabBarStyle: {
            backgroundColor: 'transparent',
            position: 'absolute',
            display: 'flex',

            top: 0,
            left: 0,
            right: 0,
            elevation: 0,
          },
          tabBarContentContainerStyle: {},
        }}
        // tabBar={props => {
        //   const combinedProps = {...props, navigation};
        //   return <Branding {...combinedProps} />;
        // }}
      >
        <Tab.Screen name="Popular" component={Popular} />
        <Tab.Screen name="Recent" component={Recent} />
      </Tab.Navigator>
    </View>
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
