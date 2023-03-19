import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {colors} from '../theme';
import UserAvatar from '../components/user-avatar';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import ArrowLeft from '../assets/arrow-left.svg';
import {Branding} from '../branding';

import type {NativeStackScreenProps} from '@react-navigation/native-stack';

const Stack = createStackNavigator();

export const useMessagePreviews = () => {
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
      message:
        'Here is another message. Hwoever, its a bit longer! We are testing the maximum number of characters that this can handle!',
      senderName: 'Rach2',
      senderAvatar:
        'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/users%2FnXFuyvfojfNlpUrpQhpFHoAo9zV2?alt=media&token=ca4e01a9-c626-4794-8243-fada79fba707',
      isSenderActive: true,
      date: yesterday,
    },
  ]);
  return {messagePreview};
};

// These types need to be updated
type RootStackParamList = {
  MessagePreview: {username: string};
  MessageUser: {username: string};
};

type MessageUserProps = NativeStackScreenProps<
  RootStackParamList,
  'MessageUser'
>;
type MessagePreviewProps = NativeStackScreenProps<
  RootStackParamList,
  'MessagePreview'
>;

export default function MessageWrapper() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="MessagePreview">
      <Stack.Screen name="MessagePreview" component={MessagePreview} />
      <Stack.Screen
        name="MessageUser"
        initialParams={{user: 'reilly'}}
        component={MessageUser}
      />
    </Stack.Navigator>
  );
}

function MessagePreview() {
  const {messagePreview} = useMessagePreviews();
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
              <MessagePreviewHighlight
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

function MessagePreviewHighlight({
  message,
  senderName,
  senderAvatar,
}: {
  message: string;
  senderName: string;
  senderAvatar: string;
}) {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.navigate('MessageUser')}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginVertical: colors.spacing.m,
          width: '100%',
        }}>
        <View
          style={{
            width: colors.avatarWidth,
            height: colors.avatarHeight,
            marginRight: colors.spacing.s,
          }}>
          <UserAvatar source={senderAvatar} />
        </View>
        <View style={{display: 'flex', flex: 1}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: colors.spacing.xs,
            }}>
            <Text
              style={{
                color: colors.textPrimary,
                fontWeight: colors.fontBold,
                fontSize: colors.fontMd,
              }}>
              {senderName}
            </Text>

            <Text
              style={{
                color: colors.textSecondary,
                fontWeight: colors.fontSemiBold,
                fontSize: colors.fontSm,
                marginLeft: 'auto',
              }}>
              2 hours ago
            </Text>
          </View>

          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{
              color: colors.textSecondary,
              fontWeight: colors.fontSemiBold,
              fontSize: colors.fontSm,
            }}>
            {message}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

function MessageUser() {
  const username = 'reilly';
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
            <Pressable onPress={() => navigation.goBack()}>
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
            {username}
          </Text>
        </Branding>
      </View>
    </View>
  );
}
