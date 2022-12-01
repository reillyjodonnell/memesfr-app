import React, {useState} from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import type {Post} from '../custom-hooks/use-posts';
import {colors} from '../theme';
import GestureRecognizer from 'react-native-swipe-gestures';
import {Branding} from '../branding';
import Video from 'react-native-video';
import usePopularPosts from '../custom-hooks/use-popular-posts';
import useRecentPosts from '../custom-hooks/use-recent-posts';

export default function Home() {
  const [active, setActive] = useState(1);
  const [pause, setPause] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const {popularPosts} = usePopularPosts();
  const {recentPosts} = useRecentPosts();

  const posts = active === 1 ? popularPosts : recentPosts;

  function togglePause() {
    setPause(prev => !prev);
  }
  function raiseActiveIndex() {
    setActiveIndex(prev => prev + 1);
  }
  function lowerActiveIndex() {
    setActiveIndex(prev => (prev > 0 ? prev - 1 : prev));
  }

  return (
    <GestureRecognizer
      onSwipeRight={() => setActive(1)}
      onSwipeLeft={() => setActive(2)}
      onSwipeDown={lowerActiveIndex}
      onSwipeUp={raiseActiveIndex}
      style={{backgroundColor: 'black', height: '100%', width: '100%'}}>
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: colors.bg,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flex: 1,
          position: 'relative',
        }}>
        <Branding active={active} setActive={setActive} />
        <View
          style={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
            flex: 1,
            width: '100%',
            marginTop: 40,
          }}></View>

        {posts.length > 0 &&
          posts?.map((post: Post, index) => {
            if (index !== activeIndex) {
              return null;
            }
            console.log(post);
            const {format} = post;
            return format === 'photo' ? (
              <Image
                key={post.id}
                style={{
                  flex: 1,
                  width: '100%',
                  resizeMode: 'contain',
                }}
                source={{uri: post.url}}
              />
            ) : format === 'video' ? (
              <Pressable
                key={post.id}
                style={{
                  height: '100%',
                  width: '100%',
                  position: 'relative',
                }}
                onPress={togglePause}>
                {pause ? (
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 20,
                    }}>
                    <Text
                      style={{
                        color: colors.textPrimary,
                        fontSize: 40,
                      }}>
                      ▶️
                    </Text>
                  </View>
                ) : null}
                <Video
                  style={{
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    opacity: pause ? 0.85 : 1,
                  }}
                  onError={err => console.log(err)}
                  source={{uri: post.url}}
                  repeat
                  paused={pause}
                />
              </Pressable>
            ) : null;
          })}
      </View>
    </GestureRecognizer>
  );
}
