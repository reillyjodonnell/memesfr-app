import React, {useState} from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import type {Post} from '../custom-hooks/use-posts';
import {Image, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-video';
import {colors} from '../theme';
import Crown from '../assets/crown.svg';
import Share from '../assets/share.svg';
import ChatBubble from '../assets/chat-bubble.svg';
import Heart from '../assets/heart.svg';

type PopularProps = {
  posts: Post[];
};
export default function MemeDisplay({posts}: PopularProps) {
  const [pause, setPause] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  function togglePause() {
    setPause(prev => !prev);
  }
  function raiseActiveIndex() {
    setActiveIndex(prev => prev + 1);
  }
  function lowerActiveIndex() {
    setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
  }
  if (!posts || posts.length === 0) {
    return null;
  }
  return (
    <GestureRecognizer
      onSwipeDown={lowerActiveIndex}
      onSwipeUp={raiseActiveIndex}
      style={{backgroundColor: 'black', height: '100%', width: '100%'}}>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flex: 1,
          position: 'relative',
        }}>
        {posts.map((post: Post, index) => {
          if (index !== activeIndex) {
            return null;
          }

          if (post.format === 'photo') {
            return (
              <View style={{flex: 1, width: '100%', position: 'relative'}}>
                <Image
                  key={post.id}
                  style={{
                    flex: 1,
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                  source={{uri: post.url}}
                />
                <MemeSidebar />
              </View>
            );
          }
          // const {format} = post;
          // return format === 'photo' ? (
          //   <Image
          //     key={post.id}
          //     style={{
          //       flex: 1,
          //       width: '100%',
          //       resizeMode: 'contain',
          //     }}
          //     source={{uri: post.url}}
          //   />
          // ) : format === 'video' ? (
          //   <Pressable
          //     key={post.id}
          //     style={{
          //       height: '100%',
          //       width: '100%',
          //       position: 'relative',
          //     }}
          //     onPress={togglePause}>
          //     {pause ? (
          //       <View
          //         style={{
          //           position: 'absolute',
          //           top: 0,
          //           left: 0,
          //           right: 0,
          //           bottom: 0,
          //           justifyContent: 'center',
          //           alignItems: 'center',
          //           zIndex: 20,
          //         }}>
          //         <Text
          //           style={{
          //             color: colors.textPrimary,
          //             fontSize: 40,
          //           }}>
          //           ▶️
          //         </Text>
          //       </View>
          //     ) : null}
          //     <Video
          //       style={{
          //         flex: 1,
          //         width: '100%',
          //         height: '100%',
          //         opacity: pause ? 0.85 : 1,
          //       }}
          //       onError={err => console.log(err)}
          //       source={{uri: post.url}}
          //       repeat
          //       paused={pause}
          //     />
          //   </Pressable>
          // ) : null;
        })}
      </View>
    </GestureRecognizer>
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
}: {
  icon?: any;
  text: string;
}) {
  return (
    <View style={styles.memeSidebarIconContainerParent}>
      <View style={styles.memeSidebarIconContainer}>{icon}</View>
      <Text style={{color: 'white', fontSize: colors.fontMd}}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  memeSidebarContainerParent: {
    position: 'absolute',
    right: 0,
    bottom: 40,
    height: colors.interactionHeight,
    width: colors.interactionWidth,
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
    marginBottom: 22,
  },
  memeSidebarIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: colors.rounded,
    backgroundColor: '#ffffff69',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
