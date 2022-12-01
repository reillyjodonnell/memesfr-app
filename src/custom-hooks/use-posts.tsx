import {useState} from 'react';

export type Post = {
  id: number;
  title: string;
  url: string;
  likes: number;
  creator: string;
  format: 'photo' | 'video';
};

export default function usePosts() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 0,
      format: 'photo',
      title: 'sampleMeme',
      // url: 'https://img.ifunny.co/images/307750d29063919c8ce3f125b961395677480c73f3bdfe1d3d26f81bb342270e_1.jpg',
      url: 'https://static01.nyt.com/images/2022/01/31/crosswords/31meme-wordplay/31meme-wordplay-mediumSquareAt3X.png',
      likes: 12000,
      creator: 'user123',
    },
    {
      id: 1,
      format: 'video',
      title: 'oh shit',
      url: 'https://preview.redd.it/ixda4k4b833a1.gif?format=mp4&s=66dba37eaf9dea89e8293f8474d3b7491b96a669',
      likes: 100,
      creator: 'User',
    },
  ]);

  return {posts, setPosts};
}
