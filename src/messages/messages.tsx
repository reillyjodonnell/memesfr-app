import React, {useState} from 'react';
import {View, Text, Pressable, TextInput} from 'react-native';
import {colors} from '../theme';
import UserAvatar from '../components/user-avatar';
import {createStackNavigator} from '@react-navigation/stack';
import {RouteProp, useNavigation} from '@react-navigation/native';
import ArrowLeft from '../assets/arrow-left.svg';
import {Branding} from '../branding';
import MessagePlus from '../assets/message-plus.svg';
import ArrowTopRight from '../assets/arrow-top-right.svg';
import {SendButton} from '../components/send-button';
import {ActiveIndexProvider, useActiveIndex} from './active-index-provider';
import {getTimeSinceEventFormatted} from '../utils';
import {useUser} from '../context/user-provider';

const Stack = createStackNavigator();

const user = 'OhReally';

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

  // retrieve 10 recent messages user recieved from unique users from the database

  const [messagePreview, setMessagePreview] = useState([
    {
      id: 0,
      senderName: 'Rach',
      senderAvatar:
        'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/users%2FnXFuyvfojfNlpUrpQhpFHoAo9zV2?alt=media&token=ca4e01a9-c626-4794-8243-fada79fba707',
      isSenderActive: true,
      date: today.toISOString(),
      messages: [
        {
          id: 0,
          message: 'Hello there!',
          senderName: 'OhReally',
          date: today.toISOString(),
        },
        {
          id: 1,
          message: 'Whats up!',
          senderName: 'Rach',
          date: today.toISOString(),
        },
        {
          id: 2,
          message: 'Not much u?',
          senderName: 'OhReally',
          date: today.toISOString(),
        },
        {
          id: 3,
          message: 'Same!',
          senderName: 'Rach',
          date: today.toISOString(),
        },
      ],
    },
    {
      id: 1,
      senderName: 'Greg',
      senderAvatar:
        'https://pbs.twimg.com/profile_images/1581014308397502464/NPogKMyk_400x400.jpg',
      isSenderActive: true,
      date: today.toISOString(),
      messages: [
        {
          id: 0,
          message: 'Hey Greg!',
          senderName: 'OhReally',
          date: today.toISOString(),
        },
        {
          id: 1,
          message: 'Whats up OhReally!',
          senderName: 'Greg',
          date: today.toISOString(),
        },
        {
          id: 2,
          message: 'Making some dank memes!',
          senderName: 'OhReally',
          date: today.toISOString(),
        },
        {
          id: 3,
          message: 'Send me some!!',
          senderName: 'Greg',
          date: today.toISOString(),
        },
        {
          id: 4,
          message: 'Nah!',
          senderName: 'OhReally',
          date: today.toISOString(),
        },
      ],
    },
  ]);
  return {messagePreview};
};

export default function MessageWrapper() {
  const {messagePreview} = useMessagePreviews();

  return (
    <ActiveIndexProvider>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="MessagePreview">
        <Stack.Screen
          name="MessagePreview"
          initialParams={{messageData: messagePreview}}
          component={MessagePreview}
        />
        <Stack.Screen
          name="MessageUser"
          initialParams={{messageData: messagePreview}}
          component={MessageUser}
        />
      </Stack.Navigator>
    </ActiveIndexProvider>
  );
}

function MessagePreviewOverlay({children}: {children: JSX.Element}) {
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        backgroundColor: colors.bg,
        paddingHorizontal: colors.spacing.s,
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

function MessagePreview({route}: MessagePreviewProps) {
  const {activeIndex, setActiveIndex} = useActiveIndex();
  const {messageData} = route.params;

  function onPress(id = -1) {
    setActiveIndex(id);
  }

  return (
    <MessagePreviewOverlay>
      <View>
        {messageData?.length > 0 ? (
          messageData?.map(
            ({
              id,
              isSenderActive,
              messages,
              senderAvatar,
              senderName: name,
              date,
            }) => {
              const formattedDate = new Date(date);
              const messageDate = getTimeSinceEventFormatted(formattedDate);
              const message = messages[messages.length - 1].message;
              const senderName = messages[messages.length - 1].senderName;
              return (
                <MessagePreviewHighlight
                  onPress={() => onPress(id)}
                  senderAvatar={senderAvatar}
                  senderName={senderName}
                  messageDate={messageDate}
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

function MessageUser({route}: MessageUserProps) {
  const {activeIndex} = useActiveIndex();

  const params = route?.params;
  const userName = params?.messageData[activeIndex].senderName;
  const userAvatar = params?.messageData[activeIndex].senderAvatar;
  const messages = params?.messageData[activeIndex];
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
              <UserAvatar source={userAvatar} />
            </View>
            <Text
              style={{
                color: colors.textPrimary,
                fontWeight: colors.fontBold,
                fontSize: colors.fontXL,
              }}>
              {userName}
            </Text>
          </View>
        </Branding>
      </View>
      <ChatContainer chatMessages={messages} />
    </View>
  );
}

function ChatContainer({chatMessages}: {chatMessages: MessagePreviewData}) {
  const {avatar, username} = useUser();
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
      {chatMessages?.messages.map(chat => {
        const {date, id, message, senderName} = chat;
        const isUserSender = senderName === username;
        const senderAvatar = chatMessages.senderAvatar;
        const userAvatar = avatar;
        return (
          <Message
            key={id}
            senderAvatar={senderAvatar}
            isUserSender={isUserSender}
            userAvatar={userAvatar}
            message={message}
          />
        );
      })}
      <ChatInput />
    </View>
  );
}

function MessagePreviewHighlight({
  message,
  senderName,
  messageDate,
  senderAvatar,
  onPress,
}: {
  message: string;
  senderName: string;
  senderAvatar: string;
  messageDate: string;
  onPress: () => void;
}) {
  const {username} = useUser();
  const navigation = useNavigation();
  console.log('WHAT');
  console.log(senderName);
  const isUserAuthor = senderName === username;

  return (
    <Pressable
      onPress={() => {
        onPress();
        navigation.navigate('MessageUser', {
          user: senderName,
          avatar: senderAvatar,
        });
      }}>
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
            width: colors.avatar.l,
            height: colors.avatar.l,
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
              alignItems: 'flex-start',
            }}>
            <View>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontWeight: colors.fontBold,
                  fontSize: colors.fontMd,
                  paddingBottom: colors.spacing.xs,
                }}>
                {senderName}
              </Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  color: colors.textSecondary,
                  fontWeight: colors.fontSemiBold,
                  fontSize: colors.fontSm,
                }}>
                {isUserAuthor ? `you: ${message}` : message}
              </Text>
            </View>

            <Text
              style={{
                color: colors.textSecondary,
                fontWeight: colors.fontSemiBold,
                fontSize: colors.fontSm,
                marginLeft: 'auto',
              }}>
              {messageDate}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

function Message({
  senderAvatar = 'https://cdn.vox-cdn.com/thumbor/AzBgl9G-2lAt4AmbQnEq-jiKxus=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13415907/grinch1.jpg',
  userAvatar = '',
  message,
  isUserSender = true,
}: {
  senderAvatar: string;
  message: string;
  isUserSender: boolean;
  userAvatar: string;
}) {
  return (
    <View
      style={{
        flexDirection: isUserSender ? 'row-reverse' : 'row',
        justifyContent: 'flex-start',
        marginVertical: colors.spacing.m,
      }}>
      <View
        style={{
          width: colors.avatarWidth / 1.5,
          height: colors.avatarHeight / 1.5,
          marginRight: isUserSender ? 0 : colors.spacing.s,
          marginLeft: isUserSender ? colors.spacing.s : 0,
        }}>
        <UserAvatar source={isUserSender ? userAvatar : senderAvatar} />
      </View>

      <View
        style={{
          backgroundColor: isUserSender ? colors.blue : colors.messagesBg,
          alignSelf: isUserSender ? 'flex-end' : 'flex-start',
          paddingHorizontal: colors.spacing.m,
          paddingVertical: colors.spacing.s + 2,
          borderRadius: colors.borderRadius.rounded - 4,
        }}>
        <Text style={{color: colors.textPrimary, fontSize: colors.fontMd}}>
          {message}
        </Text>
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

interface messages {
  id: number;
  message: string;
  senderName: string;
  date: string;
}

// This needs use the types from useMessagePreviews
interface MessagePreviewData {
  id: number;
  messages: messages[];
  senderName: string;
  senderAvatar: string;
  isSenderActive: boolean;
  date: Date;
}

type MessagePreviewRouteProp = {
  MessagePreview: {
    messageData: MessagePreviewData[];
  };
};

type MessageUserRouteProp = {
  MessageUser: {
    messageData: MessagePreviewData[];
  };
};

type MessageUserProps = {
  route: RouteProp<MessageUserRouteProp, 'MessageUser'>;
};

type MessagePreviewProps = {
  route: RouteProp<MessagePreviewRouteProp, 'MessagePreview'>;
};
