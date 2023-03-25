import React, {useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  SafeAreaView,
} from 'react-native';
import Verified from '../assets/verified.svg';
import {colors} from '../theme';
import Crown from '../assets/crown.svg';
import Share from '../assets/share.svg';
import Copy from '../assets/copy.svg';
import Send from '../assets/send.svg';
import Play from '../assets/play.svg';
import ChatBubble from '../assets/chat-bubble.svg';
import {Video} from 'expo-av';
import {formatNumber} from '../helpers/formatters';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import Comments from './comments';
import UserAvatar from './user-avatar';
import {callWithHapticFeedback} from '../helpers/haptics';
import CreateComment from './create-comment';
import {Image} from 'expo-image';
import {FILE_TYPES} from '../constants';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {TouchableOpacity} from 'react-native-gesture-handler';

type CardProps = {
  id: number;
  url: string;
  username: string;
  format: string;
  crowns: number;
  comments: number;
  shares: number;
  title: string;
  active?: boolean;
};

export default function Card({
  id,
  url,
  username,
  format = 'image',
  crowns,
  comments,
  shares,
  title,
  active = false,
}: CardProps) {
  const lastItemId = useRef(id);
  const [showShareModal, setShowShareModal] = useState(false);
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();
  const {dismiss} = useBottomSheetModal();

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const openComments = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const closeComments = () => {
    bottomSheetModalRef.current?.dismiss();
  };

  const openShare = () => {
    setShowShareModal(true);
  };

  return (
    <TouchableWithoutFeedback
      style={{zIndex: 10000}}
      onPress={bottomSheetModalRef.current ? () => dismiss() : () => {}}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: windowHeight * 0.75,
          width: windowWidth,
          borderBottomWidth: 1,
          borderBottomColor: colors.line,
          marginBottom: colors.spacing.m,
          position: 'relative',
        }}>
        <ShareModal
          showShareModal={showShareModal}
          setShowShareModal={setShowShareModal}
        />
        <CommentModal
          bottomSheetModalRef={bottomSheetModalRef}
          handleSheetChanges={handleSheetChanges}
        />

        <AuthorAndTitleSection title={title} username={username} />
        <View
          style={{
            flex: 1,
            paddingVertical: colors.spacing.l,
            backgroundColor: colors.transparent,
          }}>
          <Meme active={active} url={url} format={format} />
          <Interactions
            openShare={openShare}
            openComments={openComments}
            crowns={crowns}
            comments={comments}
            shares={shares}
          />
          {/* <LongPressCornerButton /> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function AuthorAndTitleSection({
  avatar = '',
  title = '',
  username = 'Greg',
  verified = true,
}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        position: 'absolute',
        bottom: 0,
        left: 0,
        paddingVertical: colors.spacing.m,
        paddingHorizontal: colors.spacing.m,
        zIndex: 2,
      }}>
      <View
        style={{
          height: colors.avatarHeight,
          width: colors.avatarWidth,
        }}>
        <UserAvatar />
      </View>
      <View>
        <View style={{display: 'flex', paddingHorizontal: colors.spacing.s}}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'row',
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
          </View>
          <Text style={{color: colors.textPrimary}}>{title}</Text>
        </View>
      </View>
    </View>
  );
}

function Interactions({
  crowns = 0,
  comments = 0,
  shares = 0,
  openComments,
  openShare,
}: {
  crowns: number;
  comments: number;
  shares: number;
  openComments: Function;
  openShare: Function;
}) {
  return (
    <View
      style={{
        display: 'flex',
        position: 'absolute',
        right: 0,
        bottom: 100,
        height: 200,
        width: 80,
        zIndex: 2,
      }}>
      <View
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LongPressButton active={true}>
            <Crown
              fill={'white'}
              width={colors.iconWidth}
              height={colors.iconHeight}
            />
          </LongPressButton>
          <Text
            style={{color: colors.textPrimary, fontWeight: colors.fontBold}}>
            {formatNumber(crowns)}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LongPressButton onPress={openComments}>
            <ChatBubble
              stroke={'white'}
              width={colors.iconWidth}
              height={colors.iconHeight}
            />
          </LongPressButton>
          <Text
            style={{color: colors.textPrimary, fontWeight: colors.fontBold}}>
            {formatNumber(comments)}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LongPressButton onPress={openShare}>
            <Share
              stroke={'white'}
              width={colors.iconWidth}
              height={colors.iconHeight}
            />
          </LongPressButton>
          <Text
            style={{color: colors.textPrimary, fontWeight: colors.fontBold}}>
            {formatNumber(shares)}
          </Text>
        </View>
      </View>
    </View>
  );
}

type MemeProps = {
  format: any;
  url: string;
  active: boolean;
};

function Meme({format, url, active}: MemeProps) {
  const [pause, setPause] = useState(false);

  return format === FILE_TYPES.IMAGE ? (
    <Image
      style={{
        height: '100%',
        resizeMode: 'contain',
        backgroundColor: colors.bg,
        zIndex: 1,
        // resizeMode: 'contain',
      }}
      source={{uri: url}}
    />
  ) : format === FILE_TYPES.VIDEO ? (
    <Pressable
      onPress={() => setPause(prev => !prev)}
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: colors.bg,
        position: 'relative',
      }}>
      <View
        style={{
          position: 'absolute',
          zIndex: 2,
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: pause ? colors.semiTransparent : 'transparent',
        }}>
        {pause ? (
          <Animated.View exiting={FadeOut} entering={FadeIn}>
            <Play
              width={colors.iconWidth + 10}
              height={colors.iconHeight + 10}
              stroke={colors.textPrimary}
            />
          </Animated.View>
        ) : null}
      </View>

      <Video
        isLooping={!pause}
        shouldPlay={!pause}
        isMuted={!active}
        style={{
          height: '100%',
          width: '100%',
          // resizeMode: 'contain',
        }}
        source={{
          uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        }}
      />
    </Pressable>
  ) : null;
}

function LongPressButton({children, active, onPress = () => {}}: any) {
  return (
    <Pressable
      onPress={() => callWithHapticFeedback(onPress)}
      style={{
        borderWidth: 2,
        marginVertical: 10,
        borderColor: active ? colors.accentHighlight : colors.line,
        borderRadius: 100,
        padding: 10,
        backgroundColor: active ? colors.accentHighlight : colors.line,
        shadowColor: colors.accent,
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 13,
      }}>
      {children}
    </Pressable>
  );
}

function ShareModal({
  setShowShareModal,
  showShareModal,
}: {
  setShowShareModal: Function;
  showShareModal: boolean;
}) {
  function closeModal() {
    setShowShareModal(false);
  }
  return (
    <Modal
      style={{flex: 1}}
      animationType="slide"
      transparent={true}
      visible={showShareModal}
      onRequestClose={() => {
        closeModal();
      }}>
      <Pressable style={{flex: 1}} onPress={closeModal}>
        <SafeAreaView style={{flex: 1}}>
          <View
            style={{
              height: '35%',
              marginTop: 'auto',
            }}>
            <View
              style={{
                // padding: colors.spacing.m,
                paddingRight: colors.spacing.m,
                backgroundColor: colors.bg,
                borderWidth: 2,
                borderColor: colors.line,
                width: '100%',
                height: '100%',
                borderRadius: colors.rounded,
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <ShareModalItem
                backgroundColor={colors.green}
                icon={<ChatBubble color={colors.textPrimary} />}
                header={'Text'}
                text="Text this dank meme to a friend!"
              />
              <ShareModalItem
                backgroundColor={colors.blue}
                icon={<Copy color={colors.textPrimary} />}
                header={'Copy'}
                text="Copy this dank meme!"
              />
              <ShareModalItem
                icon={<Send color={colors.textPrimary} />}
                header={'Send'}
                text="Send this dank meme to a friend!"
              />
            </View>
          </View>
        </SafeAreaView>
      </Pressable>
    </Modal>
  );
}

function ShareModalItem({
  icon,
  header,
  text,
  backgroundColor = colors.accent,
}: {
  icon: any;
  header: string;
  text: string;
  backgroundColor?: string;
}) {
  return (
    <View
      style={{
        display: 'flex',
        width: '100%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: colors.spacing.m,
        }}>
        <View
          style={{
            height: colors.iconHeight,
            width: colors.iconWidth,
            borderColor: backgroundColor,
            borderWidth: 2,
            borderRadius: 10000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: backgroundColor,
            padding: 18,
            marginHorizontal: colors.spacing.m,
          }}>
          {icon}
        </View>

        <View
          style={{
            flex: 1,
          }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontWeight: colors.fontBold,
              fontSize: colors.fontLg,
            }}>
            {header}
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontWeight: colors.fontSemiBold,
              fontSize: colors.fontSm,
            }}>
            {text}
          </Text>
        </View>
      </View>
    </View>
  );
}

function CommentModal({
  bottomSheetModalRef,
  handleSheetChanges,
}: {
  bottomSheetModalRef: any;
  handleSheetChanges: Function;
}) {
  return (
    <BottomSheetModal
      stackBehavior="push"
      handleIndicatorStyle={{
        borderColor: colors.textSecondary,
        borderWidth: 2,
      }}
      backgroundStyle={{
        backgroundColor: colors.bg,
      }}
      ref={bottomSheetModalRef}
      snapPoints={['75%']}
      onChange={handleSheetChanges}>
      <Comments />
      <CreateComment uploadComment={() => {}} />
    </BottomSheetModal>
  );
}
