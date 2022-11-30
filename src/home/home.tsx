import React from 'react';
import {Image, ImageSourcePropType, View} from 'react-native';
import usePosts from '../custom-hooks/use-posts';
import type {Post} from '../custom-hooks/use-posts';
import {colors} from '../theme';

export default function Home() {
  const {posts} = usePosts();
  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        padding: 20,
        backgroundColor: colors.bg,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flex: 1,
      }}>
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
        }}>
        {/* <Text style={{ fontSize: 30, fontWeight: '700', color: 'white' }}>
          Memesfr
        </Text> */}
      </View>

      {/* {videoArray.map((item) => {
        item.type === 'video' ? (
          <Video source={item.url} />
        ) : (
          <Image
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
            source={item.url}
          />
        );
      })} */}
      {posts.length > 0 &&
        posts?.map((post: Post) => {
          return (
            <Image
              key={post.id}
              style={{
                flex: 1,
                width: '100%',
                // height: '100%',
                resizeMode: 'contain',
              }}
              source={{uri: post.url}}
            />
          );
        })}
    </View>
  );
}
