import {useState} from 'react';

export type Post = {
  id: number;
  title: string;
  url: string;
  likes: number;
  creator: string;
  format: 'photo' | 'video';
};

export default function useRecentPosts() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([
    {
      id: 0,
      format: 'video',
      title: 'sampleMeme',
      // url: 'https://img.ifunny.co/images/307750d29063919c8ce3f125b961395677480c73f3bdfe1d3d26f81bb342270e_1.jpg',
      url: 'https://v16m-webapp.tiktokcdn-us.com/e5a2f8005bdd8572013feb286c4244e5/6387e175/video/tos/useast2a/tos-useast2a-pve-0068/o4UvNzQdbAQ8A0begnRjfSBUXDBJ8EsAT63o9n/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=4420&bt=2210&cs=0&ds=3&ft=ebtHKH-qMyq8ZMJObhe2Nqddfl7Gb&mime_type=video_mp4&qs=0&rc=Nzc7Zjc1Nmg3PGk5aTk8NUBpM3M7aTw6ZjZ0ZzMzNzczM0AuNmIzLi0wNTUxNDM1YjY2YSNpLXFucjRfbm9gLS1kMTZzcw%3D%3D&l=20221130170237691CA81747050C0053A1',
      likes: 12000,
      creator: 'user123',
    },
    {
      id: 1,
      format: 'photo',
      title: 'oh shit',
      url: 'https://i.redd.it/lvdso2uwb53a1.jpg',
      likes: 100,
      creator: 'User',
    },
    {
      id: 2,
      format: 'video',
      title: 'asda',
      url: 'https://v16m-webapp.tiktokcdn-us.com/baca2a1d1e4327bee2f211d7ba386100/6387e16d/video/tos/useast2a/tos-useast2a-ve-0068c002/0e934673d377432aa5e9fb4a35d38a34/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=2330&bt=1165&cs=0&ds=3&ft=ebtHKH-qMyq8ZMJObhe2Nqddfl7Gb&mime_type=video_mp4&qs=0&rc=aGY2Zjc5Z2ZkNGQ3OTQ4PEBpM21reDg6Znc0ZzMzNzczM0BhNC0wX2JfNl4xNWE2NS4wYSNhZG9jcjRfbDZgLS1kMTZzcw%3D%3D&l=20221130170237691CA81747050C0053A1',
      likes: 20,
      creator: 'user',
    },
  ]);

  return {recentPosts, setRecentPosts};
}
