import {Pressable, Text, View} from 'react-native';
import UserAvatar from '../components/user-avatar';
import {colors} from '../theme';
import React from 'react';

export default function Profile({
  username = 'Rach',
  memes = 0,
  followers = 0,
  following = 0,
  isFollowing = true,
}) {
  return (
    <View
      style={{
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: 'black',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: '20%',
          backgroundColor: colors.accent,
          width: '100%',
          borderRadius: colors.borderRadius.rounded,
        }}></View>

      <View style={{width: colors.avatar.xl, height: colors.avatar.xl}}>
        <UserAvatar />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: colors.spacing.m,
        }}>
        <Text
          style={{
            color: colors.textPrimary,
            fontWeight: colors.fontSemiBold,
            fontSize: colors.fontLg,
          }}>
          @{username}
        </Text>
      </View>

      <ProfileStats memes={memes} followers={followers} following={following} />
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingVertical: colors.spacing.l,
          justifyContent: 'space-evenly',
        }}>
        <Pressable
          style={{
            borderRadius: colors.borderRadius.rounded,
            borderWidth: colors.border.regular,
            borderColor: colors.accent,
            backgroundColor: isFollowing
              ? colors.accentHighlight
              : colors.accent,
            paddingVertical: colors.spacing.s,
            paddingHorizontal: colors.spacing.m,
            width: '40%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: colors.fontXL,
              fontWeight: colors.fontBold,
            }}>
            {isFollowing ? 'Following' : 'Follow'}
          </Text>
        </Pressable>
        <Pressable
          style={{
            borderRadius: colors.borderRadius.rounded,
            borderColor: colors.textSecondary,
            borderWidth: colors.border.regular,
            paddingVertical: colors.spacing.s,
            paddingHorizontal: colors.spacing.m,
            width: '40%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontSize: colors.fontXL,
              fontWeight: colors.fontBold,
            }}>
            Message
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function ProfileStats({memes = 0, followers = 0, following = 0}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: colors.spacing.m,
        }}>
        <View
          style={{
            flexDirection: 'column',
            borderRightColor: colors.line,
            justifyContent: 'center',
            alignItems: 'center',
            width: '33%',
          }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontWeight: colors.fontBold,
              fontSize: colors.fontLg,
            }}>
            {memes}
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: colors.fontMd,
              fontWeight: colors.fontBold,
            }}>
            Memes
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '33%',
            borderLeftColor: colors.line,
            borderRightColor: colors.line,
            borderLeftWidth: colors.border.regular,
            borderRightWidth: colors.border.regular,
          }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontWeight: colors.fontBold,
              fontSize: colors.fontLg,
            }}>
            {following}
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: colors.fontMd,
              fontWeight: colors.fontBold,
            }}>
            Following
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '33%',
          }}>
          <Text
            style={{
              color: colors.textPrimary,
              fontWeight: colors.fontBold,
              fontSize: colors.fontLg,
            }}>
            {followers}
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: colors.fontMd,
              fontWeight: colors.fontBold,
            }}>
            Followers
          </Text>
        </View>
      </View>
    </View>
  );
}
