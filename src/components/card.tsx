import React, {useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Verified from '../assets/verified.svg';
import {colors} from '../theme';
import Crown from '../assets/crown.svg';
import Share from '../assets/share.svg';
import ChatBubble from '../assets/chat-bubble.svg';
import HapticFeedback from 'react-native-haptic-feedback';
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

export default function Card({
  id,
  url,
  username,
  format = 'image',
  crowns,
  comments,
  shares,
  title,
  active,
}: any) {
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
      <View style={{height: colors.avatarHeight, width: colors.avatarWidth}}>
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
  const [active, setActive] = useState(false);
  // Initial scale value of 1 means no scale applied initially.
  const animatedValue = new Animated.Value(1);

  // When button is pressed in, animate the scale to 1.5
  const onPressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 1.5,
      useNativeDriver: true,
    }).start();
  };

  console.log(animatedValue);

  // When button is pressed out, animate the scale back to 1
  const onPressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const interpolateColor = animatedValue.interpolate({
    inputRange: [1, 1.5],
    outputRange: [colors.line, colors.accentHighlight],
  });

  // The animated style for scaling the button within the Animated.View
  const animatedStyle = {
    transform: [{scale: animatedValue}],
  };

  const styles = StyleSheet.create({
    icon: {
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
    },
  });
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
          <TouchableWithoutFeedback
            onPressIn={onPressIn}
            onPressOut={onPressOut}>
            <Animated.View style={[styles.icon, animatedStyle]}>
              <Crown
                fill={'white'}
                width={colors.iconWidth}
                height={colors.iconHeight}
              />
            </Animated.View>
          </TouchableWithoutFeedback>
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
    <Video
      isLooping={active}
      shouldPlay={active}
      isMuted={!active}
      useNativeControls
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: colors.accent,
        // resizeMode: 'contain',
      }}
      source={{
        uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      }}
    />
  ) : null;
}

function LongPressButton({children, active, onPress = () => {}}: any) {
  const handleLongPress = useCallback(() => {
    HapticFeedback.trigger('impactMedium');
  }, []);

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
      }}
      onHoverIn={handleLongPress}>
      {children}
    </Pressable>
  );
}

//

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
      <TouchableOpacity onPress={closeModal} style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
          <View
            style={{
              height: '35%',
              marginTop: 'auto',
            }}>
            <View
              style={{
                padding: colors.spacing.l,
                backgroundColor: colors.bg,
                borderWidth: 2,
                borderColor: colors.line,
                width: '100%',
                height: '100%',
                borderRadius: colors.rounded,
              }}>
              <View
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
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
                      borderWidth: 2,
                      borderRadius: 10000,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 20,
                      backgroundColor: colors.accent,
                      marginHorizontal: colors.spacing.m,
                    }}>
                    <ChatBubble stroke={colors.textPrimary} />
                  </View>

                  <View style={{display: 'flex'}}>
                    <Text
                      style={{
                        color: colors.textPrimary,
                        fontWeight: colors.fontBold,
                        fontSize: colors.fontLg,
                      }}>
                      Header
                    </Text>
                    <Text
                      style={{
                        color: colors.textPrimary,
                        fontWeight: colors.fontSemiBold,
                      }}>
                      This is the subtext. the user is prompted here!
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </TouchableOpacity>
    </Modal>
  );
}
