import {Pressable, StyleSheet, Text, View} from 'react-native';
import UserAvatar from '../components/user-avatar';
import {colors} from '../theme';
import React from 'react';
import OnlineStatus from '../components/online-status';
import {NavigationContainer} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Image} from 'expo-image';

export default function Profile({
  username = 'Rach',
  memes = 0,
  followers = 0,
  following = 0,
  isFollowing = false,
  isOnline = true,
}) {
  return (
    <>
      <View
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: 'black',
          justifyContent: 'flex-start',
          alignItems: 'center',
          position: 'relative',
        }}>
        <View
          style={{
            height: '20%',
            backgroundColor: colors.accent,
            width: '100%',
            borderRadius: colors.borderRadius.rounded,
            position: 'absolute',
            top: 0,
          }}
        />
        <View
          style={{
            flex: 1,
            display: 'flex',
            height: '100%',
          }}>
          <View
            style={{
              marginTop: '25%',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <View>
              <View
                style={{
                  width: colors.avatar.xl,
                  height: colors.avatar.xl,
                  borderWidth: colors.border.regular,
                  borderColor: colors.bg,
                  borderRadius: colors.borderRadius.circle,
                  position: 'relative',
                }}>
                <UserAvatar />
                <OnlineStatus isOnline />
              </View>
            </View>

            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: colors.spacing.m,
              }}>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontWeight: colors.fontSemiBold,
                  fontSize: colors.fontLg,
                }}>
                @{username}
              </Text>
            </View>

            <View style={{paddingVertical: colors.spacing.m}}>
              <ProfileStats
                memes={memes}
                followers={followers}
                following={following}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                paddingVertical: colors.spacing.l,
                justifyContent: 'space-evenly',
              }}>
              <Pressable
                style={{
                  borderRadius: 6,
                  borderWidth: colors.border.regular,
                  borderColor: colors.accent,
                  backgroundColor: isFollowing
                    ? colors.accentHighlight
                    : colors.accent,
                  paddingVertical: colors.spacing.s,
                  paddingHorizontal: colors.spacing.m,
                  width: '34%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: colors.textPrimary,
                    fontSize: colors.fontLg,
                    fontWeight: colors.fontBold,
                  }}>
                  {isFollowing ? 'Following' : 'Follow'}
                </Text>
              </Pressable>
              <Pressable
                style={{
                  borderRadius: 6,
                  borderColor: colors.textSecondary,
                  borderWidth: colors.border.regular,
                  paddingVertical: colors.spacing.s,
                  paddingHorizontal: colors.spacing.m,
                  width: '34%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: colors.textPrimary,
                    fontSize: colors.fontLg,
                    fontWeight: colors.fontBold,
                  }}>
                  Message
                </Text>
              </Pressable>
            </View>
          </View>
          <TabViewComponent />
        </View>
      </View>
    </>
  );
}

function ProfileStats({memes = 0, followers = 0, following = 0}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: colors.spacing.m,
        }}>
        <View
          style={{
            flexDirection: 'column',
            borderRightColor: colors.line,
            justifyContent: 'center',
            alignItems: 'center',
            width: '33%',
          }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontWeight: colors.fontBold,
              fontSize: colors.fontLg,
            }}>
            {memes}
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: colors.fontMd,
              fontWeight: colors.fontBold,
            }}>
            Memes
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '33%',
            borderLeftColor: colors.line,
            borderRightColor: colors.line,
            borderLeftWidth: colors.border.regular,
            borderRightWidth: colors.border.regular,
          }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontWeight: colors.fontBold,
              fontSize: colors.fontLg,
            }}>
            {following}
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: colors.fontMd,
              fontWeight: colors.fontBold,
            }}>
            Following
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '33%',
          }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontWeight: colors.fontBold,
              fontSize: colors.fontLg,
            }}>
            {followers}
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: colors.fontMd,
              fontWeight: colors.fontBold,
            }}>
            Followers
          </Text>
        </View>
      </View>
    </View>
  );
}

function ProfileActionButton({text = ''}) {
  return (
    <Pressable
      style={{
        borderRadius: 6,
        borderColor: colors.textSecondary,
        borderWidth: colors.border.regular,
        paddingVertical: colors.spacing.s,
        paddingHorizontal: colors.spacing.m,
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: colors.textPrimary,
          fontSize: colors.fontLg,
          fontWeight: colors.fontBold,
        }}>
        {text}
      </Text>
    </Pressable>
  );
}

// Dummy data for memes
const memeList = [
  {id: '1', url: 'https://your-meme-url1.jpg'},
  {id: '2', url: 'https://your-meme-url2.jpg'},
  // Add more meme URLs here
];

const Tab = createMaterialTopTabNavigator();

const TabViewComponent = () => {
  return (
    <Tab.Navigator
      initialRouteName="Memes"
      screenOptions={{
        tabBarIndicatorStyle: {
          backgroundColor: colors.accent,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarActiveTintColor: colors.textPrimary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          fontWeight: colors.fontBold,
          fontSize: colors.fontMd,
          textTransform: 'none',
        },
        tabBarItemStyle: {
          borderBottomColor: colors.line,
          borderBottomWidth: 2,
        },
        tabBarStyle: {
          backgroundColor: colors.bg,
        },
      }}>
      <Tab.Screen name="Memes" component={MemesScreen} />
      <Tab.Screen name="Likes" component={LikesScreen} />
      <Tab.Screen name="Comments" component={CommentsScreen} />
    </Tab.Navigator>
  );
};
const MemesScreen = () => (
  <ScrollView
    contentContainerStyle={{
      justifyContent: 'center',
      alignItems: 'center',
    }}
    style={{
      backgroundColor: colors.bg,
    }}>
    <Text style={{color: 'white'}}>Test</Text>
    {/* {memeList.map(meme => (
      <Image key={meme.id} source={{uri: meme.url}} style={styles.memeImage} />
    ))} */}
  </ScrollView>
);

const LikesScreen = () => (
  <View style={styles.center}>
    <Text>Likes Screen</Text>
  </View>
);

const CommentsScreen = () => (
  <View style={styles.center}>
    <Text>Comments Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg,
  },
  memeList: {
    alignItems: 'center',
  },
  memeImage: {
    width: '90%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 20,
    marginBottom: 20,
  },
});
