import React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from './theme';
import HomeIcon from './assets/home.svg';
import Notifications from './assets/notifications.svg';
import Post from './assets/post.svg';
import Message from './assets/message.svg';
import User from './assets/user.svg';
import HomeScreen from './home/home';
import MessageScreen from './messages/messages';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NotificationScreen from './notifications/notifications';
import Profile from './profile/profile';
import Upload from './upload/upload';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const isSignedIn = true;

function Memesfr() {
  return (
    <View style={{backgroundColor: colors.bg, flex: 1}}>
      {isSignedIn ? (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: colors.accent,
            tabBarStyle: {
              borderTopColor: colors.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: colors.bg,
              width: '100%',

              height: 60,
            },
            tabBarItemStyle: {},
          }}>
          <Tab.Screen
            options={{
              tabBarIcon: ({focused}) => (
                <>
                  <HomeIcon
                    style={{
                      width: colors.iconWidth,
                      height: colors.iconHeight,
                      position: 'relative',
                    }}
                    stroke={focused ? colors.textPrimary : colors.textSecondary}
                    strokeWidth={`${
                      focused ? colors.strokeBold : colors.strokeNormal
                    }`}
                  />
                  <Text
                    style={{
                      color: focused
                        ? colors.textPrimary
                        : colors.textSecondary,
                      fontWeight: colors.fontBold,
                      fontSize: 10,
                    }}>
                    Home
                  </Text>
                </>
              ),
            }}
            component={HomeScreen}
            name="Home"
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({focused}) => (
                <>
                  <Notifications
                    style={{
                      width: colors.iconWidth,
                      height: colors.iconHeight,
                      marginRight: 10,
                    }}
                    stroke={focused ? colors.textPrimary : colors.textSecondary}
                    strokeWidth={`${
                      focused ? colors.strokeBold : colors.strokeNormal
                    }`}
                  />
                  <Text
                    style={{
                      color: focused
                        ? colors.textPrimary
                        : colors.textSecondary,
                      fontWeight: '700',
                      fontSize: 10,
                    }}>
                    Notifications
                  </Text>
                </>
              ),
            }}
            component={NotificationScreen}
            name="Notifications"
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({size, focused}) => (
                <View
                  style={{
                    borderRadius: 15,
                    padding: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: colors.accent,
                    backgroundColor: colors.accent,
                    shadowOpacity: 0.92,
                    shadowRadius: 5,
                    elevation: 10,
                  }}>
                  <View
                    style={{
                      position: 'relative',
                      backgroundColor: 'white',
                      borderRadius: 15,
                      paddingTop: 5,
                      paddingBottom: 5,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Post
                      style={{
                        width: 50,
                        height: 30,
                      }}
                      stroke={colors.bg}
                    />
                  </View>
                </View>
              ),
            }}
            listeners={({navigation}) => ({
              tabPress: e => {
                e.preventDefault();
                navigation.navigate('UploadScreen');
              },
            })}
            component={NullUpload}
            name="Upload"
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({size, focused}) => (
                <>
                  <Message
                    style={{
                      width: colors.iconWidth,
                      height: colors.iconHeight,
                      marginLeft: 10,
                    }}
                    stroke={focused ? colors.textPrimary : colors.textSecondary}
                    strokeWidth={`${
                      focused ? colors.strokeBold : colors.strokeNormal
                    }`}
                  />
                  <Text
                    style={{
                      color: focused
                        ? colors.textPrimary
                        : colors.textSecondary,
                      fontWeight: '700',
                      fontSize: 10,
                    }}>
                    Messages
                  </Text>
                </>
              ),
            }}
            component={MessageScreen}
            name="Messages"
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({focused}) => (
                <>
                  <User
                    style={{
                      width: colors.iconWidth,
                      height: colors.iconHeight,
                    }}
                    stroke={focused ? colors.textPrimary : colors.textSecondary}
                    strokeWidth={`${
                      focused ? colors.strokeBold : colors.strokeNormal
                    }`}

                    // bgColor={barColor} // background space color.
                    // {...props}
                  />
                  <Text
                    style={{
                      color: focused
                        ? colors.textPrimary
                        : colors.textSecondary,
                      fontWeight: '700',
                      fontSize: 10,
                    }}>
                    Profile
                  </Text>
                </>
              ),
            }}
            component={Profile}
            name="Profile"
          />
        </Tab.Navigator>
      ) : null}
    </View>
  );
}

function NullUpload() {
  return null;
}

export default function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_bottom'}}>
      <Stack.Screen name="HomeScreen" component={Memesfr} />
      <Stack.Screen name="UploadScreen" component={Upload} />
    </Stack.Navigator>
  );
}
