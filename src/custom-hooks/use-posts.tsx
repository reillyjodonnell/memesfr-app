import {useState} from 'react';

export type Post = {
  id: number;
  title: string;
  url: string;
  likes: number;
  creator: string;
};

export default function usePosts() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 0,
      title: 'sampleMeme',
      url: 'https://img.ifunny.co/images/307750d29063919c8ce3f125b961395677480c73f3bdfe1d3d26f81bb342270e_1.jpg',
      likes: 12000,
      creator: 'user123',
    },
  ]);

  return {posts, setPosts};
}
