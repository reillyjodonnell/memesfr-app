import React from 'react';
import type {Post} from '../custom-hooks/use-popular-posts';
import {useWindowDimensions, View} from 'react-native';
import {colors} from '../theme';
import Card from '../common/card';
import {FlashList} from '@shopify/flash-list';

type PopularProps = {
  posts: Post[];
};
export default function MemeDisplay({posts}: PopularProps) {
  const {_, height} = useWindowDimensions();

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.bg}}>
      <FlashList
        pagingEnabled={true}
        snapToInterval={height * 0.77}
        snapToAlignment={'center'}
        decelerationRate={0}
        contentContainerStyle={{backgroundColor: colors.bg}}
        data={posts}
        estimatedItemSize={200}
        renderItem={({item}: {item: Post}) => {
          const {id, title, creator, crowns, comments, shares, format, url} =
            item;
          return (
            <Card
              id={id}
              title={title}
              username={creator}
              crowns={crowns}
              comments={comments}
              shares={shares}
              format={format}
              url={url}
            />
          );
        }}
      />
    </View>
  );
}
