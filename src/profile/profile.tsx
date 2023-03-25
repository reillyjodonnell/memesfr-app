import {Pressable, Text, View} from 'react-native';
import UserAvatar from '../components/user-avatar';
import {colors} from '../theme';
import React from 'react';
import OnlineStatus from '../components/online-status';

export default function Profile({
  username = 'Rach',
  memes = 0,
  followers = 0,
  following = 0,
  isFollowing = false,
  isOnline = true,
}) {
  return (
    <>
      <View
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          backgroundColor: 'black',
          justifyContent: 'flex-start',
          alignItems: 'center',
          position: 'relative',
        }}>
        <View
          style={{
            height: '20%',
            backgroundColor: colors.accent,
            width: '100%',
            borderRadius: colors.borderRadius.rounded,
            position: 'absolute',
            top: 0,
          }}
        />
        <View
          style={{
            marginTop: '25%',
            height: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <View>
            <View
              style={{
                width: colors.avatar.xl,
                height: colors.avatar.xl,
                borderWidth: colors.border.regular,
                borderColor: colors.bg,
                borderRadius: colors.borderRadius.circle,
                position: 'relative',
              }}>
              <UserAvatar />
              <OnlineStatus isOnline />
            </View>
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

          <View style={{paddingVertical: colors.spacing.m}}>
            <ProfileStats
              memes={memes}
              followers={followers}
              following={following}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              paddingVertical: colors.spacing.l,
              justifyContent: 'space-evenly',
            }}>
            <Pressable
              style={{
                borderRadius: 6,
                borderWidth: colors.border.regular,
                borderColor: colors.accent,
                backgroundColor: isFollowing
                  ? colors.accentHighlight
                  : colors.accent,
                paddingVertical: colors.spacing.s,
                paddingHorizontal: colors.spacing.m,
                width: '34%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: colors.fontLg,
                  fontWeight: colors.fontBold,
                }}>
                {isFollowing ? 'Following' : 'Follow'}
              </Text>
            </Pressable>
            <Pressable
              style={{
                borderRadius: 6,
                borderColor: colors.textSecondary,
                borderWidth: colors.border.regular,
                paddingVertical: colors.spacing.s,
                paddingHorizontal: colors.spacing.m,
                width: '34%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: colors.fontLg,
                  fontWeight: colors.fontBold,
                }}>
                Message
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
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

function ProfileActionButton({text = ''}) {
  return (
    <Pressable
      style={{
        borderRadius: 6,
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
          fontSize: colors.fontLg,
          fontWeight: colors.fontBold,
        }}>
        {text}
      </Text>
    </Pressable>
  );
}
