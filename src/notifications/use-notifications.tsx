import {useState} from 'react';

export default function useNotifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 0,
      username: 'Rach',
      avatar: null,
      image:
        'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/memes%2FAye%20this%20is%20the%20first%20check?alt=media&token=c33390b8-2dfc-4e33-9495-daaebc6c645e',
    },
  ]);

  return {notifications, setNotifications};
}
