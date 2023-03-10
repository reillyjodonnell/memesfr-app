import {Image} from 'expo-image';
import React from 'react';
import {Text, View} from 'react-native';
import {Branding} from '../branding';
import UserAvatar from '../components/user-avatar';
import {colors} from '../theme';
import useNotifications from './use-notifications';

export default function Notifications() {
  const {notifications} = useNotifications();
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
        <Branding>
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
      <View style={{display: 'flex', paddingHorizontal: colors.spacing.m}}>
        <View
          style={{
            height: colors.avatar.l,
            width: colors.avatar.l,
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
