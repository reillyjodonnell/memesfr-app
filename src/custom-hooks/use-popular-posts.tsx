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
      format: 'video',
      title: 'sampleMeme',
      url: 'https://v16m-webapp.tiktokcdn-us.com/1834370033477b1f8a4c871740231647/63888561/video/tos/useast5/tos-useast5-pve-0068-tx/517720afd32c4942965dd2da7a325c4b/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=2894&bt=1447&cs=0&ds=3&ft=ebtHKH-qMyq8Zcm39he2NaO-fl7Gb&mime_type=video_mp4&qs=0&rc=NTRmaDs8OGk3aTNkZDw6aUBpM3M5OTo6ZnU1aDMzZzczNEAyLmAzMDNgXy0xMWNgLjQwYSNkbzFtcjRfMTBgLS1kMS9zcw%3D%3D&l=202212010442148616E127249C9001149B',
      likes: 12000,
      creator: 'user123',
    },
    {
      id: 1,
      format: 'video',
      title: 'oh shit',
      url: 'https://v16m-webapp.tiktokcdn-us.com/720245ab403de0a098243f2ad737aadd/63888512/video/tos/useast5/tos-useast5-pve-0068-tx/2f1eda1538c44e6abeb65fb52afe9c6d/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=3766&bt=1883&cs=0&ds=3&ft=ebtHKH-qMyq8Zcm39he2NaO-fl7Gb&mime_type=video_mp4&qs=0&rc=PGQ4Njo3Ozk3NDdlZTk8NUBpM3V1OWQ6ZnVzaDMzZzczNEBiMjQtXjQwNWMxNi4xLy0yYSNzMW02cjRnZS1gLS1kMS9zcw%3D%3D&l=202212010442148616E127249C9001149B',
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
