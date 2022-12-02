import React, {useState} from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import type {Post} from '../custom-hooks/use-posts';
import {Image, Pressable, Text, View} from 'react-native';
import Video from 'react-native-video';
import {colors} from '../theme';

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
          height: '100%',
          width: '100%',
          backgroundColor: colors.bg,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          flex: 1,
          position: 'relative',
        }}>
        <Text style={{color: 'white'}}>Huh!</Text>
        {posts.map((post: Post, index) => {
          if (index !== activeIndex) {
            return null;
          }
          return <Text style={{color: 'white'}}>{post?.title}</Text>;
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
