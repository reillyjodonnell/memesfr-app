import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
  Keyboard,
  StyleSheet,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {callWithHapticFeedback} from '../helpers/haptics';
import {colors} from '../theme';
import ChatBubble from '../assets/chat-bubble.svg';
import Animated from 'react-native-reanimated';
import UserAvatar from './user-avatar';
import {SendButton} from './send-button';

export default function CreateComment({
  uploadComment,
}: {
  uploadComment: Function;
}) {
  const [comment, setComment] = useState('');
  return (
    <KeyboardAvoidingView
      style={{
        flexDirection: 'row',
        width: '100%',
        paddingVertical: colors.spacing.m,
      }}
      enabled
      keyboardVerticalOffset={270}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View
        style={{
          width: colors.avatarWidth,
          height: colors.avatarHeight,
          marginRight: colors.spacing.s,
        }}>
        <UserAvatar />
      </View>

      <View style={{...styles.textInput, flex: 1}}>
        <TextInput
          onChangeText={text => setComment(text)}
          value={comment}
          onSubmitEditing={Keyboard.dismiss}
          textAlign="left"
          placeholder="Add a comment..."
          placeholderTextColor={colors.textSecondary}
          multiline
          cursorColor={colors.accent}
          style={{
            flex: 1,
            color: colors.textPrimary,
            fontSize: colors.fontMd,
            height: 30,
          }}
        />

        {comment.length ? (
          <SendButton onPress={() => callWithHapticFeedback(uploadComment)} />
        ) : // <Pressable
        //   onPress={() => callWithHapticFeedback(uploadComment)}
        //   style={{
        //     marginHorizontal: colors.spacing.m,
        //     height: colors.iconHeight,
        //     width: colors.iconWidth,
        //     borderRadius: colors.borderRadius.circle,
        //     padding: colors.spacing.m,
        //     backgroundColor: colors.accent,
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //   }}>
        //   <ChatBubble
        //     stroke={'white'}
        //     height={colors.iconHeight / 1.25}
        //     width={colors.iconWidth / 1.25}
        //   />
        // </Pressable>
        null}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.bg,
    borderWidth: 2,
    borderColor: colors.line,
    color: 'white',
    placeholderTextColor: colors.textSecondary,
    textAlign: 'left',
    maxHeight: 100,
    position: 'relative',
    flexDirection: 'row',
  },
});
