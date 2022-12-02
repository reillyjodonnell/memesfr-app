import React from 'react';
import useRecentPosts from '../custom-hooks/use-recent-posts';
import MemeDisplay from './meme-display';

export default function Recent() {
  const {recentPosts} = useRecentPosts();

  return <MemeDisplay posts={recentPosts} />;
}
