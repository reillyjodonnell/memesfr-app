import React from 'react';
import {Image} from 'expo-image';
type UserAvatarProps = {
  source?: string;
};

export default function UserAvatar({
  source = 'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/users%2FnXFuyvfojfNlpUrpQhpFHoAo9zV2?alt=media&token=ca4e01a9-c626-4794-8243-fada79fba707',
}: UserAvatarProps) {
  return (
    <Image
      style={{
        borderRadius: 1000,
        height: '100%',
        width: '100%',
      }}
      source={{
        uri: source,
      }}
    />
  );
}
