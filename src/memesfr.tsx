import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from './theme';
import Castle from './assets/castle.svg';
import HomeIcon from './assets/home.svg';
import Notifications from './assets/notifications.svg';
import Post from './assets/post.svg';
import Message from './assets/message.svg';
import User from './assets/user.svg';
import Cancel from './assets/cancel.svg';
import Trash from './assets/trash.svg';
import HomeScreen from './home/home';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NotificationScreen from './notifications/notifications';
import Profile from './profile/profile';
import * as Haptics from 'expo-haptics';

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
            component={Message}
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
      <Stack.Screen name="Home" component={Memesfr} />
      <Stack.Screen name="UploadScreen" component={UploadScreen} />
    </Stack.Navigator>
  );
}
import * as ImagePicker from 'expo-image-picker';

function UploadScreen({navigation}: {navigation: any}) {
  const [image, setImage] = useState(null);
  const {height, width} = useWindowDimensions();
  const [postTitle, setPostTitle] = useState('');

  const maxTitleLength = 69;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.PAGE_SHEET,
      selectionLimit: 1,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  function clearImage() {
    setImage(null);
  }

  const username = 'Rach';
  const verified = true;

  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bg,
      }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          width: '100%',
          paddingVertical: colors.spacing.m,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => navigation.navigate('Home')}>
          <Cancel
            stroke={colors.textPrimary}
            width={colors.iconWidth}
            height={colors.iconHeight}
            style={{marginHorizontal: colors.spacing.m}}
          />
        </TouchableOpacity>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
            flex: 1,
          }}>
          <Castle
            style={{backgroundColor: 'transparent'}}
            height={colors.logoHeight}
            width={colors.logoWidth}
          />
        </View>
        <View style={{flex: 1, width: '100%', backgroundColor: 'red'}}></View>
      </View>

      {image ? (
        <>
          <View
            style={{
              width: '100%',
              height: 100,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.line,
              borderWidth: 2,
              borderColor: colors.line,
            }}>
            <View
              style={{
                height: colors.avatarHeight + 20,
                width: colors.avatarWidth + 20,
                marginLeft: colors.spacing.m,
                marginRight: colors.spacing.m / 2,
              }}>
              <Image
                style={{
                  borderRadius: 1000,
                  height: '100%',
                  width: '100%',
                }}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/users%2FnXFuyvfojfNlpUrpQhpFHoAo9zV2?alt=media&token=ca4e01a9-c626-4794-8243-fada79fba707',
                }}
              />
            </View>
            {/* <View
              style={{
                flex: 1,
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: colors.fontMd,
                  fontWeight: colors.fontSemiBold,
                }}>
                {username}
              </Text>
              {verified ? (
                <Verified
                  style={{marginLeft: colors.spacing.xs}}
                  stroke={colors.accent}
                />
              ) : null}
            </View> */}
            <TextInput
              placeholder="Add a caption to your dank meme..."
              placeholderTextColor={colors.textSecondary}
              multiline
              onSubmitEditing={Keyboard.dismiss}
              selectionColor={colors.accent}
              maxLength={maxTitleLength}
              onChangeText={text => setPostTitle(text)}
              value={postTitle}
              style={{
                padding: 10,
                color: colors.textPrimary,
                fontSize: colors.fontMd,
                height: 80,
                width: width - (colors.avatarWidth + 20 + 3 * colors.spacing.m),
                textAlignVertical: 'top',
                marginLeft: colors.spacing.m / 2,
                marginRight: colors.spacing.m,
              }}
            />
            {postTitle.length === maxTitleLength ? (
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  padding: colors.spacing.s,
                }}>
                <Text
                  style={{
                    color: colors.textSecondary,
                  }}>
                  {maxTitleLength}/{maxTitleLength}
                </Text>
              </View>
            ) : null}
          </View>

          <View
            style={{
              position: 'relative',
              height: height * 0.5,
              width: '100%',
              marginVertical: colors.spacing.l,
              backgroundColor: colors.hover,
            }}>
            <Image
              source={{uri: image}}
              resizeMode="contain"
              style={{width: '100%', height: '100%'}}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                backgroundColor: colors.hover,
                borderRadius: colors.rounded,
                padding: colors.spacing.m,
                top: 0,
                right: 0,
              }}
              onPress={clearImage}>
              <Trash
                stroke={colors.textPrimary}
                width={colors.iconWidth}
                height={colors.iconHeight}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable
              style={{
                backgroundColor: colors.hover,
                borderRadius: 10,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10,
                marginLeft: colors.spacing.l,
                marginRight: colors.spacing.l / 2,
              }}
              onPress={clearImage}>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: colors.fontLg,
                  fontWeight: colors.fontBold,
                }}>
                Trash
              </Text>
              <Trash
                style={{marginLeft: colors.spacing.xs}}
                stroke={colors.textPrimary}
              />
            </Pressable>
            <Pressable
              style={{
                backgroundColor: colors.accent,
                borderRadius: 10,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10,
                marginRight: colors.spacing.l,
                marginRight: colors.spacing.l / 2,
              }}
              onPress={() =>
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success,
                )
              }>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: colors.fontLg,
                  fontWeight: colors.fontBold,
                }}>
                Upload
              </Text>
            </Pressable>
          </View>
        </>
      ) : (
        <Button title="Pick an image from camera roll" onPress={pickImage} />
      )}
      <TextInput />
    </View>
  );
}
