import React, {useState} from 'react';
import {View, Text, Pressable, TextInput} from 'react-native';
import {colors} from '../theme';
import UserAvatar from '../components/user-avatar';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import ArrowLeft from '../assets/arrow-left.svg';
import {Branding} from '../branding';
import MessagePlus from '../assets/message-plus.svg';
import ArrowTopRight from '../assets/arrow-top-right.svg';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {color} from 'react-native-reanimated';
import {SendButton} from '../components/send-button';

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
// type RootStackParamList = {
//   MessagePreview: {username: string};
//   MessageUser: {username: string};
// };

// type MessageUserProps = NativeStackScreenProps<
//   RootStackParamList,
//   'MessageUser'
// >;
// type MessagePreviewProps = NativeStackScreenProps<
//   RootStackParamList,
//   'MessagePreview'
// >;

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

function MessagePreviewOverlay({children}: {children: JSX.Element}) {
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
        <View
          style={{
            borderRadius: colors.borderRadius.circle,
            backgroundColor: colors.line,
            padding: colors.spacing.s,
            marginLeft: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MessagePlus
            stroke={colors.textPrimary}
            width={colors.iconWidth}
            height={colors.iconHeight}
          />
        </View>
      </View>
      {children}
    </View>
  );
}

function MessagePreview() {
  const {messagePreview} = useMessagePreviews();
  return (
    <MessagePreviewOverlay>
      <View>
        {messagePreview?.length > 0 ? (
          messagePreview?.map(
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
          )
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              padding: colors.spacing.l,
            }}>
            <View
              style={{
                paddingHorizontal: colors.spacing.m,
              }}>
              <Text
                style={{
                  fontSize: colors.fontXL,
                  fontWeight: colors.fontBold,
                  color: colors.textPrimary,
                }}>
                Create your first message!
              </Text>
            </View>
            <ArrowTopRight
              width={colors.iconWidth}
              height={colors.iconHeight}
              stroke={colors.textPrimary}
            />
          </View>
        )}
      </View>
    </MessagePreviewOverlay>
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
    <Pressable
      onPress={() =>
        navigation.navigate('MessageUser', {
          user: senderName,
          avatar: senderAvatar,
        })
      }>
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

function MessageUser({
  friendsAvatar = 'https://cdn.vox-cdn.com/thumbor/AzBgl9G-2lAt4AmbQnEq-jiKxus=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13415907/grinch1.jpg',
  friendsName = 'No name ;)',
}: {
  friendsAvatar: string;
  friendsName: string;
}) {
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
          marginTop: colors.spacing.m,
        }}>
        <Branding
          leftContainer={
            <Pressable style={{zIndex: 1}} onPress={() => navigation.goBack()}>
              <ArrowLeft
                width={colors.iconWidth}
                height={colors.iconHeight}
                color={colors.textSecondary}
              />
            </Pressable>
          }>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 0,
            }}>
            <View
              style={{
                height: colors.avatarHeight,
                width: colors.avatarWidth,
                marginRight: colors.spacing.s,
              }}>
              <UserAvatar source={friendsAvatar} />
            </View>
            <Text
              style={{
                color: colors.textPrimary,
                fontWeight: colors.fontBold,
                fontSize: colors.fontXL,
              }}>
              {friendsName}
            </Text>
          </View>
        </Branding>
      </View>
      <ChatContainer />
    </View>
  );
}

function ChatContainer({
  chatMessages = [{id: 0, sender: 'reilly', message: 'Hello!'}],
}) {
  return (
    <View
      style={{
        marginTop: colors.topbarHeight,
        display: 'flex',
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start',
        overflow: 'scroll',
      }}>
      {chatMessages?.map(chat => {
        const {id, message, sender} = chat;
        return <Message key={id} sender={sender} message={message} />;
      })}
      <ChatInput />
    </View>
  );
}

function Message({
  sender,
  senderAvatar = 'https://cdn.vox-cdn.com/thumbor/AzBgl9G-2lAt4AmbQnEq-jiKxus=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13415907/grinch1.jpg',
  message,
}: {
  sender: string;
  senderAvatar: string;
  message: string;
}) {
  const isUserAuthor = sender === 'reilly';
  return (
    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
      <View
        style={{
          width: colors.avatarWidth / 1.5,
          height: colors.avatarHeight / 1.5,
          marginRight: colors.spacing.s,
        }}>
        <UserAvatar source={senderAvatar} />
      </View>

      <View
        style={{
          backgroundColor: colors.messagesBg,
          alignSelf: isUserAuthor ? 'flex-end' : 'flex-start',
          padding: colors.spacing.s,
          borderRadius: colors.borderRadius.rounded - 6,
        }}>
        <Text style={{color: colors.textPrimary}}>{message}</Text>
      </View>
    </View>
  );
}

function ChatInput() {
  return (
    <View
      style={{
        height: colors.textInputHeight,
        borderWidth: 1,
        backgroundColor: colors.line,
        borderRadius: colors.borderRadius.rounded,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
      }}>
      <TextInput
        placeholder="Write a dank message..."
        style={{
          color: colors.textPrimary,
          flex: 1,
          padding: colors.spacing.m,
          width: '100%',
          height: '100%',
          fontSize: colors.fontMd,
          height: colors.textInputHeight,
        }}
      />
      <SendButton onPress={() => {}} />
    </View>
  );
}
