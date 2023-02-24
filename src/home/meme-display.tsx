import React from 'react';
import type {Post} from '../custom-hooks/use-popular-posts';
import {ScrollView, useWindowDimensions} from 'react-native';
import {colors} from '../theme';
import Card from '../common/card';

type PopularProps = {
  posts: Post[];
};
export default function MemeDisplay({posts}: PopularProps) {
  const {_, height} = useWindowDimensions();

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <ScrollView
      pagingEnabled={true}
      snapToInterval={height * 0.77}
      snapToAlignment={'center'}
      decelerationRate={0}
      style={{backgroundColor: colors.bg}}>
      {posts.map((post: Post, index) => {
        return (
          <Card
            id={post.id}
            title={post.title}
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
            title={post.title}
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
    </ScrollView>
  );
}
