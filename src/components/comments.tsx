import React from 'react';
import {View, Text} from 'react-native';
import UserAvatar from './user-avatar';
import Heart from '../assets/heart.svg';
import {colors} from '../theme';
import {formatNumber} from '../helpers/formatters';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

function useComments() {
  return {
    comments: [
      {
        id: 0,
        author: 'rach',
        avatar:
          'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/users%2FnXFuyvfojfNlpUrpQhpFHoAo9zV2?alt=media&token=ca4e01a9-c626-4794-8243-fada79fba707',
        comment: 'This is a comment',
        likes: 69000,
        liked: false,
      },
      {
        id: 1,
        author: 'reilly',
        avatar:
          'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/users%2F39Wv4ueUKPX4vx7gPM4Pjy238pH3?alt=media&token=c20ccc81-941d-43ba-81d8-7ea19ec66a58',
        comment: "Oh wow I can't believe that happened!",
        likes: 4100,
        liked: true,
      },
      {
        id: 2,
        author: 'phoenix',
        avatar:
          'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/users%2FhfCehqSubcVZtOfh2hx2m4nzSMo1?alt=media&token=b9cd4969-729b-4ea7-ae45-16d72f96e154',
        comment: "I'm so sorry to hear that",
        likes: 100,
        liked: false,
      },
      {
        id: 3,
        author: 'tomaytoes',
        avatar:
          'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/users%2FgZxnqg8BDjadzqh2PSZLGHnXPMv1?alt=media&token=c26a0095-894e-4626-b78e-defd1098e651',
        comment: 'I hope you feel better soon',
        likes: 100,
        liked: true,
      },
    ],
  };
}

export default function Comments() {
  const {comments} = useComments();

  return (
    <BottomSheetScrollView>
      <View
        style={{
          backgroundColor: colors.bg,
          flex: 1,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            padding: colors.spacing.m,
            borderBottomWidth: 2,
            borderBottomColor: colors.line,
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: colors.fontMd,
              fontWeight: colors.fontBold,
            }}>
            Comments
          </Text>
        </View>

        {comments.map(({comment, likes, liked, author, id, avatar}) => (
          <UserComment
            key={id}
            comment={comment}
            likes={likes}
            liked={liked}
            username={author}
            avatar={avatar}
          />
        ))}

        {!comments.length && (
          <View
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: colors.spacing.l,
              padding: colors.spacing.m,
            }}>
            <Text
              style={{color: colors.textSecondary, fontSize: colors.fontMd}}>
              No comments, yet!
            </Text>
          </View>
        )}
      </View>
    </BottomSheetScrollView>
  );
}

function UserComment({
  username = 'rach',
  avatar,
  comment = 'No default comment entereed. So here is a default comment',
  likes = 69000,
  liked = false,
}) {
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: colors.spacing.m,
        marginLeft: colors.spacing.m / 2,
      }}>
      <View
        style={{
          width: colors.iconWidth + 6,
          height: colors.iconHeight + 6,
          marginRight: colors.spacing.m,
        }}>
        <UserAvatar source={avatar} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <Text
          style={{
            color: colors.textPrimary,
            fontWeight: colors.fontBold,
            fontSize: colors.fontSm,
          }}>
          {username}
        </Text>
        <Text style={{color: colors.textPrimary, fontSize: colors.fontSm}}>
          {comment}
        </Text>
      </View>
      <View
        style={{
          marginLeft: 'auto',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Heart
          stroke={liked ? colors.accent : colors.textSecondary}
          fill={liked ? colors.accent : ''}
          height={colors.iconHeight / 1.75}
          width={colors.iconWidth / 1.75}
        />
        <Text
          style={{
            color: liked ? colors.accent : colors.textSecondary,
            marginHorizontal: colors.spacing.s,
            fontSize: colors.fontMd,
          }}>
          {formatNumber(likes)}
        </Text>
      </View>
    </View>
  );
}
