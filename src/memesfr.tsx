import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from './theme';
import Castle from './assets/castle.svg';
import HomeIcon from './assets/home.svg';
import Search from './assets/search.svg';
import Post from './assets/post.svg';
import Message from './assets/message.svg';
import User from './assets/user.svg';
import HomeScreen from './home/home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Branding} from './branding';

function NotificationScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Notification Screen</Text>
    </View>
  );
}

const StackHeader = () => {
  return (
    <>
      <Castle />
      <Text style={{fontSize: 30, fontWeight: '700', color: 'white'}}>
        Memesfr
      </Text>
    </>
  );
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const isSignedIn = true;
const {bg} = colors;

export default function Memesfr() {
  return (
    <View style={{backgroundColor: colors.bg}}>
      <SafeAreaView style={{height: '100%'}}>
        <NavigationContainer>
          <Branding />
          {isSignedIn ? (
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.accent,
                // tabBarOptions: {
                //   style: {
                //     display: 'flex',
                //     justifyContent: 'flexStart',
                //     backgroundColor: 'pink',
                //     alignItems: 'flexStart',
                //   },
                // },
                tabBarStyle: {
                  // position: 'absolute',
                  // bottom: 20,
                  // left: 10,
                  // right: 10,
                  // elevation: 0,
                  // justifyContent: 'center',
                  // flexDirection: 'row',
                  borderTopColor: colors.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: colors.bg,
                  width: '100%',
                  // display: 'flex',
                  // borderRadius: 15,
                  // alignItems: 'center',
                  height: 80,
                },
                tabBarItemStyle: {},
              }}>
              <Tab.Screen
                options={{
                  tabBarIcon: ({focused}) => (
                    <>
                      <HomeIcon
                        style={{
                          width: 30,
                          height: 30,
                          position: 'relative',
                        }}
                        stroke={
                          focused ? colors.textPrimary : colors.textSecondary
                        }
                        strokeWidth={`${focused ? '2.5' : '1.5'}`}
                      />
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: '700',
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
                      <Search
                        style={{width: 30, height: 30, marginRight: 10}}
                        stroke={
                          focused ? colors.textPrimary : colors.textSecondary
                        }
                        strokeWidth={`${focused ? '2.5' : '1.5'}`}
                      />
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: '700',
                          fontSize: 10,
                        }}>
                        Search
                      </Text>
                    </>
                  ),
                }}
                component={Search}
                name="Search"
              />
              <Tab.Screen
                options={{
                  tabBarIcon: ({size, focused}) => (
                    <View
                      style={{
                        // paddingLeft: 8,
                        // paddingRight: 8,
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
                          // paddingLeft: 8,
                          // paddingRight: 8,
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
                  // tabBarButton: (props) => <PostButton {...props} />,
                }}
                component={Upload}
                name="Upload"
              />
              <Tab.Screen
                options={{
                  tabBarIcon: ({size, focused}) => (
                    <>
                      <Message
                        style={{width: 30, height: 30, marginLeft: 10}}
                        stroke={
                          focused ? colors.textPrimary : colors.textSecondary
                        }
                        strokeWidth={`${focused ? '2.5' : '1.5'}`}
                      />
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: '700',
                          fontSize: 10,
                        }}>
                        Messages
                      </Text>
                    </>
                  ),
                }}
                component={Message}
                name="Messages"
              />
              <Tab.Screen
                options={{
                  tabBarIcon: ({focused}) => (
                    <>
                      <User
                        style={{
                          width: 30,
                          height: 30,
                        }}
                        stroke={
                          focused ? colors.textPrimary : colors.textSecondary
                        }
                        strokeWidth={`${focused ? '2.5' : '1.5'}`}

                        // bgColor={barColor} // background space color.
                        // {...props}
                      />
                      <Text
                        style={{
                          color: 'white',
                          fontWeight: '700',
                          fontSize: 10,
                        }}>
                        Profile
                      </Text>
                    </>
                  ),
                }}
                component={Upload}
                name="Profile"
              />
            </Tab.Navigator>
          ) : (
            <Stack.Navigator
              screenOptions={{
                headerShown: true,
                headerBackTitle: '',
                // headerLeft: () => (
                //   <Text style={{color: 'white', fontSize: 15}}>Cancel</Text>
                // ),
                // headerBackVisible
                headerShadowVisible: false,
                headerTintColor: 'white',
                headerBackTitleVisible: true,
                headerStyle: {
                  backgroundColor: bg,
                },
                headerTitle: () => <StackHeader />,
              }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="Notifications"
                component={NotificationScreen}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </SafeAreaView>
    </View>
  );
}

function Upload() {
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        padding: 10,
        backgroundColor: colors.bg,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: colors.textPrimary,
          fontSize: 30,
          backgroundColor: 'red',
        }}>
        Upload
      </Text>
    </View>
  );
}
