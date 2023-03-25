import {Image} from 'expo-image';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {Branding} from '../branding';
import UserAvatar from '../components/user-avatar';
import {colors} from '../theme';
import useNotifications from './use-notifications';
import Settings from '../assets/settings.svg';
import ArrowLeft from '../assets/arrow-left.svg';

import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();

export default function NotificationWrapper() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="NotificationComponent">
      <Stack.Screen name="NotificationComponent" component={Notifications} />
      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettings}
      />
    </Stack.Navigator>
  );
}

function NotificationSettings() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        flex: 1,
        backgroundColor: colors.bg,
      }}>
      <View
        style={{
          display: 'flex',
          height: colors.topbarHeight,
          width: '100%',
          marginBottom: colors.spacing.m,
        }}>
        <Branding
          leftContainer={
            <Pressable
              onPress={() => navigation.navigate('NotificationComponent')}>
              <ArrowLeft
                width={colors.iconWidth}
                height={colors.iconHeight}
                color={colors.textSecondary}
              />
            </Pressable>
          }>
          <Text
            style={{
              color: colors.textPrimary,
              fontWeight: colors.fontBold,
              fontSize: colors.fontXL,
            }}>
            Settings
          </Text>
        </Branding>
      </View>
    </View>
  );
}

export function Notifications() {
  const {notifications} = useNotifications();
  const navigation = useNavigation();
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: colors.bg,
      }}>
      <View
        style={{
          display: 'flex',
          height: colors.topbarHeight,
          width: '100%',
          marginBottom: colors.spacing.m,
        }}>
        <Branding
          rightContainer={
            <Pressable
              onPress={() => navigation.navigate('NotificationSettings')}>
              <Settings
                width={colors.iconWidth}
                height={colors.iconHeight}
                color={colors.textSecondary}
              />
            </Pressable>
          }>
          <Text
            style={{
              color: colors.textPrimary,
              fontWeight: colors.fontBold,
              fontSize: colors.fontXL,
            }}>
            Notifications
          </Text>
        </Branding>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flex: 1,
          width: '100%',
        }}>
        {notifications?.map(notification => {
          const {avatar, username, image} = notification;
          return (
            <>
              <NotificationCard
                timeOrDate="10:02 PM"
                avatar={avatar}
                username={username}
                image={image}
              />
              <NotificationCard
                timeOrDate="6:04 PM"
                avatar={avatar}
                username={username}
                image={image}
              />
              <NotificationCard
                timeOrDate="2:02 PM"
                avatar={avatar}
                username={username}
                image={image}
              />
              <NotificationCard
                timeOrDate="4:52 AM"
                avatar={avatar}
                username={username}
                image={image}
              />
              <NotificationCard
                timeOrDate="1:13 AM"
                avatar={avatar}
                username={username}
                image={image}
              />
            </>
          );
        })}
      </View>
    </View>
  );
}

function NotificationCard({
  avatar,
  username,
  image = 'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/memes%2FNeil%20is%20making%20moves%20?alt=media&token=18e52de5-55de-4b70-8bf4-a93bf03b4eb7',
  timeOrDate = 'Now',
}: {
  avatar?: string | null;
  username: string;
  image: string;
  timeOrDate: string;
}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginVertical: colors.spacing.s,
      }}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignContent: 'center',
          paddingRight: colors.spacing.s,
        }}>
        <View
          style={{
            height: colors.avatar.m,
            width: colors.avatar.m,
          }}>
          <UserAvatar />
        </View>
      </View>

      <View style={{display: 'flex', justifyContent: 'center'}}>
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: colors.fontMd,
            paddingBottom: colors.spacing.xs,
          }}>
          <Text style={{fontWeight: colors.fontBold}}>{username}</Text> Crowned
          your post{' '}
        </Text>
        <Text style={{color: colors.textSecondary, fontSize: colors.fontMd}}>
          {timeOrDate}
        </Text>
      </View>
      <View
        style={{
          marginLeft: 'auto',
          paddingHorizontal: colors.spacing.m,
          display: 'flex',
        }}>
        <Image
          style={{
            width: colors.avatar.l,
            height: colors.avatar.l,
          }}
          source={image}
        />
      </View>
    </View>
  );
}
