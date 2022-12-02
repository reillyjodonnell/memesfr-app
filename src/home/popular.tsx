import React from 'react';
import usePopularPosts from '../custom-hooks/use-popular-posts';
import MemeDisplay from './meme-display';

export default function Popular() {
  const {popularPosts} = usePopularPosts();
  return <MemeDisplay posts={popularPosts} />;
}
