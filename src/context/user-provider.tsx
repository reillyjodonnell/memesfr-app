import React, {createContext, useContext, useState} from 'react';

type UserContextType = {
  avatar: string | null;
  updateUserAvatar: (newAvatar: string) => void;
  username: string | null;
  updateUsername: (newAvatar: string) => void;
};

export const UserContext = createContext<UserContextType>({
  avatar: null,
  updateUserAvatar: () => {},
  username: null,
  updateUsername: () => {},
});

export function UserProvider({children}: {children: JSX.Element}) {
  const [avatar, setAvatar] = useState<string | null>(
    'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/users%2F39Wv4ueUKPX4vx7gPM4Pjy238pH3?alt=media&token=c20ccc81-941d-43ba-81d8-7ea19ec66a58',
  );
  const [username, setUsername] = useState('OhReally');

  const updateUserAvatar = (newAvatar: string) => {
    setAvatar(newAvatar);
  };

  const updateUsername = (newUsername: string) => {
    setUsername(newUsername);
  };

  return (
    <UserContext.Provider
      value={{
        avatar,
        updateUserAvatar,
        username,
        updateUsername,
      }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const {avatar, updateUserAvatar, updateUsername, username} =
    useContext(UserContext);

  return {avatar, updateUserAvatar, updateUsername, username};
}
