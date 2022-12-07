import React, {useCallback, useRef, useState} from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import type {Post} from '../custom-hooks/use-posts';
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  useWindowDimensions,
  View,
} from 'react-native';
import Video from 'react-native-video';
import {colors} from '../theme';
import Crown from '../assets/crown.svg';
import Share from '../assets/share.svg';
import ChatBubble from '../assets/chat-bubble.svg';
import Heart from '../assets/heart.svg';
import Fingerprint from '../assets/finger.svg';
import Cancel from '../assets/cancel.svg';

import HapticFeedback from 'react-native-haptic-feedback';
type PopularProps = {
  posts: Post[];
};
export default function MemeDisplay({posts}: PopularProps) {
  const [pause, setPause] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [opened, setOpened] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  function togglePause() {
    setPause(prev => !prev);
  }
  function raiseActiveIndex() {
    setActiveIndex(prev => prev + 1);
  }
  function lowerActiveIndex() {
    setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
  }

  const handleLongPress = useCallback(() => {
    setOpened(prev => !prev);
    HapticFeedback.trigger('impactMedium');
  }, []);

  const {width: windowWidth, height: windowHeight} = useWindowDimensions();

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        flex: 1,
      }}
      showsVerticalScrollIndicator={true}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY,
              },
            },
          },
        ],
        {useNativeDriver: false},
      )}
      style={{
        backgroundColor: 'black',
        height: '100%',
        flex: 1,
        display: 'flex',
      }}
      scrollEventThrottle={1}>
      {posts.map((post: Post, index) => {
        if (post.format === 'photo') {
          return (
            <View
              key={index}
              style={{
                display: 'flex',
                height: '100%',
              }}>
              <Image
                key={post.id}
                style={{
                  display: 'flex',
                  flex: 1,
                  height: '100%',
                  resizeMode: 'contain',
                }}
                source={{uri: post.url}}
              />
              <LongPressCornerButton
                opened={opened}
                handleLongPress={handleLongPress}
              />
            </View>
          );
        }
      })}
    </ScrollView>
  );
}

const CornerButtonOptions = () => {
  return (
    <View
      style={{
        position: 'absolute',
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
      }}>
      <Text>Oh wow</Text>
    </View>
  );
};

function LongPressButton({children}: any) {
  const [isHovering, setIsHovering] = useState(false);
  const handleLongPress = useCallback(() => {
    HapticFeedback.trigger('impactMedium');
  }, []);

  return (
    <Pressable
      style={{
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 100,
        padding: 20,
        position: 'absolute',
        bottom: 0,
        right: 0,
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

function MemeSidebar() {
  return (
    <View style={styles.memeSidebarContainerParent}>
      <View style={styles.memeSidebarContainer}>
        <MemeSidebarItem
          text={'24'}
          icon={
            <Heart
              fill={'white'}
              width={colors.iconWidth + 6}
              height={colors.iconHeight + 6}
            />
          }
        />
        <MemeSidebarItem
          text={'30'}
          icon={
            <ChatBubble
              width={colors.iconWidth + 6}
              height={colors.iconHeight + 6}
              stroke="white"
            />
          }
        />
        <MemeSidebarItem
          text={'69'}
          icon={
            <Share
              width={colors.iconWidth + 6}
              height={colors.iconHeight + 6}
              stroke="white"
            />
          }
        />
      </View>
    </View>
  );
}

function MemeSidebarItem({
  icon = (
    <Crown
      fill={'white'}
      width={colors.iconWidth - 6}
      height={colors.iconHeight - 6}
      stroke="white"
    />
  ),
  text,
  onClick = () => {},
}: {
  icon?: any;
  text: string;
  onClick?: Function;
}) {
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };
  return (
    <View style={styles.memeSidebarIconContainerParent}>
      <Pressable
        onPress={() => {
          HapticFeedback.trigger('impactMedium');
        }}>
        <View style={styles.memeSidebarIconContainer}>{icon}</View>
      </Pressable>
      <Text style={{color: 'white', fontSize: colors.fontMd}}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  memeSidebarContainerParent: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: colors.interactionHeight,
    width: colors.interactionWidth,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  memeSidebarContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  memeSidebarIconContainerParent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  memeSidebarIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: colors.rounded,
    backgroundColor: '#ffffff69',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

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
