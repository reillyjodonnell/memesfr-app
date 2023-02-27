import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  useWindowDimensions,
  Pressable,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import {colors} from '../theme';
import Castle from '../assets/castle.svg';
import Cancel from '../assets/cancel.svg';
import Camera from '../assets/camera.svg';
import UploadIcon from '../assets/paper-airplane.svg';
import Trash from '../assets/trash.svg';
import Photo from '../assets/photo.svg';
import {Image} from 'expo-image';
import {callWithHapticFeedback} from '../helpers/haptics';
import usePhotos from '../custom-hooks/use-photos';

export default function Upload({navigation}: {navigation: any}) {
  const {height, width} = useWindowDimensions();
  const [postTitle, setPostTitle] = useState('');
  const [selected, setSelected] = useState(false);

  const {
    photo,
    clearPhoto,
    promptUserToAllowAccessToPhotos,
    handleOpenPhotos,
    promptUserToAllowAccessToCamera,
    handleOpenCamera,
  } = usePhotos();

  if (promptUserToAllowAccessToCamera || promptUserToAllowAccessToPhotos) {
    return (
      <UploadUIWrapper navigation={navigation}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: colors.fontXL,
              fontWeight: colors.fontBold,
              color: colors.textPrimary,
              paddingVertical: colors.spacing.m,
            }}>
            🙃
          </Text>
          <Text
            style={{
              fontSize: colors.fontXL,
              fontWeight: colors.fontBold,
              color: colors.textPrimary,
              textAlign: 'center',
              paddingHorizontal: colors.spacing.m,
            }}>
            We need access to the camera to upload memes
          </Text>
          <Pressable
            style={{
              width: 200,
              paddingVertical: 14,
              backgroundColor: colors.accent,
              borderWidth: colors.border.regular,
              borderColor: colors.textPrimary,
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: colors.spacing.m,
            }}
            onPress={() => Linking.openSettings()}>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: colors.fontLg,
                fontWeight: colors.fontBold,
              }}>
              Open Settings
            </Text>
          </Pressable>
        </View>
      </UploadUIWrapper>
    );
  }

  const maxTitleLength = 69;

  return (
    <UploadUIWrapper navigation={navigation}>
      {photo ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: colors.avatarHeight,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.bg,
                borderRadius: colors.rounded,
                borderColor: colors.line,
                marginBottom: colors.spacing.s,
              }}>
              <TextInput
                placeholder="Add a caption to your dank meme..."
                multiline
                placeholderTextColor={colors.textSecondary}
                onSubmitEditing={Keyboard.dismiss}
                selectionColor={colors.textPrimary}
                maxLength={maxTitleLength}
                onChangeText={text => setPostTitle(text)}
                value={postTitle}
                textAlign="left"
                style={{
                  width: '100%',
                  // width - (colors.avatarWidth + 20 + 3 * colors.spacing.m),
                  textAlignVertical: 'center',
                  marginLeft: colors.spacing.m,
                  marginRight: colors.spacing.m,
                  color: colors.textPrimary,
                  fontSize: colors.fontLg,
                  fontWeight: colors.fontBold,
                  height: 70,
                  padding: colors.spacing.m,
                }}
              />
              {postTitle.length === maxTitleLength ? (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    padding: colors.spacing.s,
                  }}>
                  <Text
                    style={{
                      color: colors.textSecondary,
                    }}>
                    {maxTitleLength}/{maxTitleLength}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          <View
            style={{
              position: 'relative',
              height: height * 0.5,
              width: '100%',
              marginVertical: colors.spacing.l,
              backgroundColor: colors.semiTransparent,
              borderRadius: colors.rounded,
              borderWidth: colors.border.regular,
              borderColor: colors.line,
            }}>
            <Image
              source={{uri: photo}}
              resizeMode="contain"
              style={{width: '100%', height: '100%'}}
            />

            <TouchableOpacity
              style={{
                position: 'absolute',
                backgroundColor: colors.hover,
                borderRadius: colors.rounded,
                padding: colors.spacing.m,
                top: 0,
                right: 0,
              }}
              onPress={clearPhoto}>
              <Trash
                stroke={colors.textPrimary}
                width={colors.iconWidth}
                height={colors.iconHeight}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Pressable
              style={{
                backgroundColor: colors.hover,
                borderRadius: 10,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: colors.spacing.s + 4,

                marginLeft: colors.spacing.l,
                marginRight: colors.spacing.l / 2,
              }}
              onPress={clearPhoto}>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: colors.fontLg,
                  fontWeight: colors.fontBold,
                }}>
                Trash
              </Text>
              <Trash
                style={{marginLeft: colors.spacing.xs}}
                stroke={colors.textPrimary}
              />
            </Pressable>
            <Pressable
              style={{
                backgroundColor: colors.accent,
                borderRadius: 10,
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: colors.spacing.s + 4,
                marginRight: colors.spacing.l,
              }}
              onPress={() => callWithHapticFeedback(() => {})}>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: colors.fontLg,
                  fontWeight: colors.fontBold,
                }}>
                Upload
              </Text>
              <UploadIcon
                style={{marginLeft: colors.spacing.xs}}
                stroke={colors.textPrimary}
              />
            </Pressable>
          </View>
        </>
      ) : (
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              margin: colors.spacing.m,
              fontWeight: colors.fontBold,
              fontSize: colors.fontXXL,
              color: colors.textPrimary,
              padding: colors.spacing.s,
              textAlign: 'center',
            }}>
            Time to upload a dank meme 🫡
          </Text>
          <Pressable
            style={{
              width: 200,
              paddingVertical: 14,
              backgroundColor: colors.accent,
              borderWidth: colors.border.regular,
              borderColor: colors.textPrimary,
              borderRadius: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: colors.spacing.m,
            }}
            onPress={() => {
              handleOpenCamera();
              setSelected(true);
            }}>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: colors.fontLg,
                fontWeight: colors.fontBold,
              }}>
              Camera
            </Text>
            <Camera
              style={{marginLeft: colors.spacing.xs}}
              stroke={colors.textPrimary}
            />
          </Pressable>
          <Pressable
            style={{
              width: 200,
              paddingVertical: 14,
              backgroundColor: colors.accent,
              borderRadius: 10,
              borderWidth: colors.border.regular,
              borderColor: colors.textPrimary,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: colors.spacing.m,
            }}
            onPress={() => {
              handleOpenPhotos();
              setSelected(true);
            }}>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: colors.fontLg,
                fontWeight: colors.fontBold,
              }}>
              Photos
            </Text>
            <Photo
              style={{marginLeft: colors.spacing.xs}}
              stroke={colors.textPrimary}
            />
          </Pressable>
        </View>
      )}
      <TextInput />
    </UploadUIWrapper>
  );
}

function UploadUIWrapper({navigation, children}: any) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.bg,
        }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            width: '100%',
            paddingVertical: colors.spacing.m,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => navigation.navigate('HomeScreen')}>
            <Cancel
              stroke={colors.textPrimary}
              width={colors.iconWidth}
              height={colors.iconHeight}
              style={{marginHorizontal: colors.spacing.m}}
            />
          </TouchableOpacity>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
              flex: 1,
            }}>
            <Castle
              style={{backgroundColor: 'transparent'}}
              height={colors.logoHeight + 10}
              width={colors.logoWidth + 10}
            />
          </View>
          <View style={{flex: 1, width: '100%', backgroundColor: 'red'}}></View>
        </View>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}
