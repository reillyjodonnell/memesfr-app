import React, {useState, useCallback, useRef} from 'react';
import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import Verified from '../assets/verified.svg';
import {colors} from '../theme';
import Crown from '../assets/crown.svg';
import Share from '../assets/share.svg';
import ChatBubble from '../assets/chat-bubble.svg';
import Cancel from '../assets/cancel.svg';
import Fingerprint from '../assets/finger.svg';
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

export default function Card({
  id,
  url,
  username,
  format = 'image',
  crowns,
  comments,
  shares,
  title,
}: any) {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const openComments = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
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
      <BottomSheetModal
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
        <Meme url={url} format={format} />
        <Interactions
          openComments={openComments}
          crowns={crowns}
          comments={comments}
          shares={shares}
        />
        {/* <LongPressCornerButton /> */}
      </View>
    </View>
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
}: {
  crowns: number;
  comments: number;
  shares: number;
  openComments: Function;
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
          <LongPressButton>
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
};

function Meme({format, url}: MemeProps) {
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
      isLooping
      shouldPlay
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

function LongPressButton({children, active, onPress}: any) {
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

function LongPressCornerButton({handleLongPress, opened}: any) {
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        // backgroundColor: opened ? 'rgba(0,0,0,.85)' : null,
      }}>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          width: 120,
          height: 150,
        }}>
        <MemeInteractionSelection />
      </View>
    </View>
  );
}
const MemeInteractionSelection = () => {
  const [showInteractionIcons, setShowInteractionIcons] = useState(false);

  function handleLongPress() {
    setShowInteractionIcons(prev => !prev);
  }
  return (
    <View style={{position: 'relative', flex: 1}}>
      {showInteractionIcons ? (
        <>
          <View style={{position: 'absolute', top: '30%', right: 0}}>
            <LongPressButton>
              <Crown
                fill={'white'}
                width={colors.iconWidth}
                height={colors.iconHeight}
              />
            </LongPressButton>
          </View>
          <View style={{position: 'absolute', bottom: '50%', left: '37%'}}>
            <LongPressButton>
              <ChatBubble
                stroke={'white'}
                width={colors.iconWidth}
                height={colors.iconHeight}
              />
            </LongPressButton>
          </View>
          <View style={{position: 'absolute', bottom: 0, left: '10%'}}>
            <LongPressButton>
              <Share
                stroke={'white'}
                width={colors.iconWidth}
                height={colors.iconHeight}
              />
            </LongPressButton>
          </View>
        </>
      ) : null}
      <Pressable
        style={{
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 100,
          padding: 20,
          position: 'absolute',
          bottom: 0,
          right: 0,
          transform: [{scale: showInteractionIcons ? 0.8 : 1}],
        }}
        onLongPress={handleLongPress}>
        {showInteractionIcons ? (
          <Cancel width={colors.iconWidth} height={colors.iconHeight} />
        ) : (
          <Fingerprint
            stroke={'white'}
            width={colors.iconWidth}
            height={colors.iconHeight}
          />
        )}
      </Pressable>
    </View>
  );
};
