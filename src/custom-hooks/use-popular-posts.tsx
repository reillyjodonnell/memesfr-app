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
      url: 'https://images.pexels.com/photos/12309508/pexels-photo-12309508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      likes: 12000,
      creator: 'user123',
    },
    {
      id: 1,
      format: 'video',
      title: 'oh shit',
      url: 'https://www.pexels.com/video/a-cupcake-on-a-plate-8015075/',
      likes: 100,
      creator: 'User',
    },
    {
      id: 2,
      format: 'video',
      title: 'oh shit',
      url: 'https://v16m-webapp.tiktokcdn-us.com/8ea902698ff235df79f31fe16eb483dc/6387e6df/video/tos/useast5/tos-useast5-pve-0068-tx/49631cf4da1f4079969edb703241499b/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=3588&bt=1794&cs=0&ds=3&ft=ebtHKH-qMyq8ZwcDbhe2N83Dfl7Gb&mime_type=video_mp4&qs=0&rc=aTZlPGY7ZDQ2ZzVnOTc0NEBpMzxyOWg6Zmh3ZzMzZzczNEAtX14xXzJeNWMxMTJgLmMtYSNjbWBtcjRvMm5gLS1kMS9zcw%3D%3D&l=20221130172546807A29E1A9A3AA004A91',
      likes: 100,
      creator: 'User',
    },
  ]);

  return {popularPosts, setPopularPosts};
}
