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
      <View style={{display: 'flex', flexDirection: 'column'}}>
        {notifications?.map(notification => {
          const {avatar, username, image} = notification;
          return (
            <NotificationCard
              avatar={avatar}
              username={username}
              image={image}
            />
          );
        })}
      </View>
    </View>
  );
}

function NotificationCard({
  avatar,
  username,
  image,
}: {
  avatar?: string | null;
  username: string;
  image: string;
}) {
  return (
    <View>
      <UserAvatar  />
      <View>
        <Text style={{color: }}>{username} liked your post </Text>
      </View>
      <Image source={image} />
    </View>
  );
}
