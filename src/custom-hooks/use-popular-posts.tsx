import {useState} from 'react';

export type Post = {
  id: number;
  title: string;
  url: string;
  likes: number;
  creator: string;
  format: 'photo' | 'video';
};

export default function usePopularPosts() {
  const [popularPosts, setPopularPosts] = useState<Post[]>([
    {
      id: 0,
      format: 'photo',
      title: 'sampleMeme',
      url: 'https://i.chzbgr.com/thumb800/17766917/hE749C9B5/funny-random-memes-dank-memes-humor',
      likes: 12000,
      creator: 'user123',
    },
    {
      id: 1,
      format: 'photo',
      title: 'oh shit',
      url: 'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/memes%2FAye%20this%20is%20the%20first%20check?alt=media&token=c33390b8-2dfc-4e33-9495-daaebc6c645e',
      likes: 100,
      creator: 'User',
    },
    {
      id: 2,
      format: 'photo',
      title: 'oh shit',
      url: 'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/memes%2FNeil%20is%20making%20moves%20?alt=media&token=18e52de5-55de-4b70-8bf4-a93bf03b4eb7',
      likes: 100,
      creator: 'User',
    },
  ]);

  return {popularPosts, setPopularPosts};
}
