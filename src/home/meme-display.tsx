import React, {useCallback, useRef, useState} from 'react';
// import GestureRecognizer from 'react-native-swipe-gestures';
import type {Post} from '../custom-hooks/use-popular-posts';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import Video from 'react-native-video';
import {colors} from '../theme';
import Crown from '../assets/crown.svg';
import Share from '../assets/share.svg';
import ChatBubble from '../assets/chat-bubble.svg';
import Heart from '../assets/heart.svg';

import HapticFeedback from 'react-native-haptic-feedback';
import Card from '../common/card';
type PopularProps = {
  posts: Post[];
};
export default function MemeDisplay({posts}: PopularProps) {
  const [pause, setPause] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <ScrollView style={{backgroundColor: colors.bg}}>
      {posts.map((post: Post, index) => {
        return (
          <Card
            id={post.id}
            username={post.creator}
            crowns={post.crowns}
            comments={post.comments}
            shares={post.shares}
            format={post.format}
            url={post.url}
            key={index}
          />
        );
      })}
      {posts.map((post: Post, index) => {
        return (
          <Card
            id={post.id}
            username={post.username}
            crowns={post.crowns}
            comments={post.comments}
            shares={post.shares}
            format={post.format}
            url={post.url}
            key={index}
          />
        );
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
