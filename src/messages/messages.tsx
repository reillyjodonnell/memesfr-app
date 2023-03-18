import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {View, Text} from 'react-native';
import {colors} from '../theme';
import Castle from '../assets/castle.svg';
import UserAvatar from '../components/user-avatar';

const Tab = createMaterialTopTabNavigator();

export const useMessages = () => {
  const yesterday = new Date();
  const today = new Date();
  today.setHours(14);
  today.setMinutes(0);
  today.setMilliseconds(0);

  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(8);
  yesterday.setMinutes(0);
  yesterday.setMilliseconds(0);

  const [messagePreview, setMessagePreview] = useState([
    {
      id: 0,
      message: 'Hello there!',
      senderName: 'OhReally',
      senderAvatar:
        'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/users%2F39Wv4ueUKPX4vx7gPM4Pjy238pH3?alt=media&token=c20ccc81-941d-43ba-81d8-7ea19ec66a58',
      isSenderActive: true,
      date: today,
    },
    {
      id: 1,
      message: 'Are you doing okay? there!',
      senderName: 'Rach',
      senderAvatar:
        'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/users%2FnXFuyvfojfNlpUrpQhpFHoAo9zV2?alt=media&token=ca4e01a9-c626-4794-8243-fada79fba707',
      isSenderActive: false,
      date: yesterday,
    },
    {
      id: 2,
      message: 'Here is another message',
      senderName: 'Rach2',
      senderAvatar:
        'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/users%2FnXFuyvfojfNlpUrpQhpFHoAo9zV2?alt=media&token=ca4e01a9-c626-4794-8243-fada79fba707',
      isSenderActive: true,
      date: yesterday,
    },
  ]);
  return {messagePreview};
};

export default function MessageScreen({}: any) {
  const {messagePreview} = useMessages();
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        backgroundColor: colors.bg,
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
        <Text
          style={{
            fontWeight: colors.fontBold,
            fontSize: colors.fontXL + 6,
            color: colors.textPrimary,
          }}>
          Messages
        </Text>
      </View>
      <View>
        {messagePreview.map(
          ({
            id,
            isSenderActive,
            message,
            senderAvatar,
            senderName,
            timeSent,
          }) => {
            return (
              <MessagePreview
                senderAvatar={senderAvatar}
                senderName={senderName}
                key={id}
                message={message}
              />
            );
          },
        )}
      </View>
      {/* <Branding /> */}
      {/* <Tab.Navigator
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
        <Text>Oh yes!</Text>
      </Tab.Navigator> */}
    </View>
  );
}

function MessagePreview({
  message,
  senderName,
  senderAvatar,
}: {
  message: string;
  senderName: string;
  senderAvatar: string;
}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: colors.spacing.m,
        width: '100%',
        backgroundColor: colors.accent,
      }}>
      <View
        style={{
          width: colors.avatarWidth,
          height: colors.avatarHeight,
          marginRight: colors.spacing.s,
        }}>
        <UserAvatar source={senderAvatar} />
      </View>
      <View style={{width: '100%'}}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              color: colors.textPrimary,
              fontWeight: colors.fontBold,
              fontSize: colors.fontMd,
              marginBottom: colors.spacing.xs,
            }}>
            {senderName}
          </Text>

          <Text
            style={{
              color: colors.textSecondary,
              fontWeight: colors.fontSemiBold,
              fontSize: colors.fontSm,
              flex: 1,
              textAlign: 'right',
            }}>
            2 hours ago
          </Text>
        </View>

        <Text
          style={{
            color: colors.textSecondary,
            fontWeight: colors.fontSemiBold,
            fontSize: colors.fontSm,
          }}>
          {message}
        </Text>
      </View>
    </View>
  );
}
