import * as ImagePicker from 'expo-image-picker';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  Keyboard,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import {colors} from '../theme';
import Castle from '../assets/castle.svg';
import Cancel from '../assets/cancel.svg';
import Trash from '../assets/trash.svg';
import * as Haptics from 'expo-haptics';

export default function Upload({navigation}: {navigation: any}) {
  const [image, setImage] = useState(null);
  const {height, width} = useWindowDimensions();
  const [postTitle, setPostTitle] = useState('');

  const maxTitleLength = 69;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      presentationStyle: ImagePicker.UIImagePickerPresentationStyle.PAGE_SHEET,
      selectionLimit: 1,
      allowsMultipleSelection: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  function clearImage() {
    setImage(null);
  }

  return (
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
          onPress={() => navigation.navigate('Home')}>
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
            height={colors.logoHeight}
            width={colors.logoWidth}
          />
        </View>
        <View style={{flex: 1, width: '100%', backgroundColor: 'red'}}></View>
      </View>

      {image ? (
        <>
          <View
            style={{
              width: '100%',
              height: 100,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.line,
              borderWidth: 2,
              borderColor: colors.line,
            }}>
            <View
              style={{
                height: colors.avatarHeight + 20,
                width: colors.avatarWidth + 20,
                marginLeft: colors.spacing.m,
                marginRight: colors.spacing.m / 2,
              }}>
              <Image
                style={{
                  borderRadius: 1000,
                  height: '100%',
                  width: '100%',
                }}
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/memes-30d06.appspot.com/o/users%2FnXFuyvfojfNlpUrpQhpFHoAo9zV2?alt=media&token=ca4e01a9-c626-4794-8243-fada79fba707',
                }}
              />
            </View>

            <TextInput
              placeholder="Add a caption to your dank meme..."
              placeholderTextColor={colors.textSecondary}
              multiline
              onSubmitEditing={Keyboard.dismiss}
              selectionColor={colors.accent}
              maxLength={maxTitleLength}
              onChangeText={text => setPostTitle(text)}
              value={postTitle}
              style={{
                padding: 10,
                color: colors.textPrimary,
                fontSize: colors.fontMd,
                height: 80,
                width: width - (colors.avatarWidth + 20 + 3 * colors.spacing.m),
                textAlignVertical: 'top',
                marginLeft: colors.spacing.m / 2,
                marginRight: colors.spacing.m,
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

          <View
            style={{
              position: 'relative',
              height: height * 0.5,
              width: '100%',
              marginVertical: colors.spacing.l,
              backgroundColor: colors.hover,
            }}>
            <Image
              source={{uri: image}}
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
              onPress={clearImage}>
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
                paddingVertical: 10,
                marginLeft: colors.spacing.l,
                marginRight: colors.spacing.l / 2,
              }}
              onPress={clearImage}>
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
                paddingVertical: 10,
                marginRight: colors.spacing.l,
                marginRight: colors.spacing.l / 2,
              }}
              onPress={() =>
                Haptics.notificationAsync(
                  Haptics.NotificationFeedbackType.Success,
                )
              }>
              <Text
                style={{
                  color: colors.textPrimary,
                  fontSize: colors.fontLg,
                  fontWeight: colors.fontBold,
                }}>
                Upload
              </Text>
            </Pressable>
          </View>
        </>
      ) : (
        <Button title="Pick an image from camera roll" onPress={pickImage} />
      )}
      <TextInput />
    </View>
  );
}
