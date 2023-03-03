import React, {useState, Suspense} from 'react';
import type {Post} from '../custom-hooks/use-popular-posts';
import {useWindowDimensions, View, Text} from 'react-native';
import {colors} from '../theme';
import Card from '../components/card';
import {FlashList} from '@shopify/flash-list';

type PopularProps = {
  posts: Post[];
};

export default function CardDisplay({posts}: PopularProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const {_, height} = useWindowDimensions();

  const fetchMore = () => {
    console.log('fetching more');
  };

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <Suspense
      fallback={
        <Text style={{fontSize: colors.fontXL, color: 'red'}}>Loading...</Text>
      }>
      <View style={{flex: 1, backgroundColor: colors.bg}}>
        <FlashList
          onEndReached={fetchMore}
          pagingEnabled={true}
          snapToInterval={height * 0.77}
          snapToAlignment={'center'}
          decelerationRate={0}
          contentContainerStyle={{backgroundColor: colors.bg}}
          data={posts}
          estimatedItemSize={200}
          renderItem={({item, index}: {item: Post; index: number}) => {
            const {id, title, creator, crowns, comments, shares, format, url} =
              item;
            return (
              <Card
                active={index === activeIndex}
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
    </Suspense>
  );
}
