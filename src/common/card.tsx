import React, {useState, useCallback, useRef, useMemo} from 'react';
import {View, Text, Image, useWindowDimensions, Pressable} from 'react-native';
import Verified from '../assets/verified.svg';
import {colors} from '../theme';
import Crown from '../assets/crown.svg';
import Share from '../assets/share.svg';
import ChatBubble from '../assets/chat-bubble.svg';
import Cancel from '../assets/cancel.svg';
import Fingerprint from '../assets/finger.svg';
import HapticFeedback from 'react-native-haptic-feedback';
import Video from 'react-native-video';
import BottomSheet from '@gorhom/bottom-sheet';

export default function Card({
  id,
  url,
  username,
  format = 'image',
  crowns,
  comments,
  shares,
}: any) {
  const {width: windowWidth, height: windowHeight} = useWindowDimensions();

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: windowHeight * 0.75,
        width: windowWidth,
        borderBottomWidth: 1,
        borderBottomColor: colors.line,
        marginBottom: colors.spacing.m,
        position: 'relative',
      }}>
      {/* <View style={{flex: 1}}>
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <Text>Awesome 🎉</Text>
        </BottomSheet>
      </View> */}

      <AuthorSection username={username} />

      <View
        style={{
          flex: 1,
          PaddingTop: colors.spacing.l,
          PaddingBottom: colors.spacing.l,
          backgroundColor: colors.transparent,
        }}>
        {format === 'photo' ? (
          <Image
            key={id}
            style={{
              height: '100%',
              resizeMode: 'contain',
              backgroundColor: colors.semiTransparent,
              // resizeMode: 'contain',
            }}
            source={{uri: url}}
          />
        ) : format === 'video' ? (
          <Video
            style={{
              height: '100%',
              backgroundColor: colors.semiTransparent,
              // resizeMode: 'contain',
            }}
            source={{uri: url}}
          />
        ) : null}
        <Interactions crowns={crowns} comments={comments} shares={shares} />
        {/* <LongPressCornerButton /> */}
      </View>
    </View>
  );
}

function AuthorSection({
  avatar = '',
  title = 'No title provided!',
  username = 'Greg',
  verified = true,
}) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        position: 'absolute',
        bottom: 0,
        left: 0,
        paddingVertical: colors.spacing.l,
        paddingHorizontal: colors.spacing.l,
      }}>
      <View style={{height: 40, width: 40}}>
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
      <View>
        <View style={{display: 'flex', paddingHorizontal: colors.spacing.s}}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.textPrimary,
                fontSize: colors.fontMd,
                fontWeight: colors.fontSemiBold,
              }}>
              {username}
            </Text>
            {verified ? (
              <Verified
                style={{marginLeft: colors.spacing.xs}}
                stroke={colors.accent}
              />
            ) : null}
          </View>
          <Text style={{color: colors.textPrimary}}>{title}</Text>
        </View>
      </View>
    </View>
  );
}

function Interactions({
  crowns = 0,
  comments = 0,
  shares = 0,
}: {
  crowns: number;
  comments: number;
  shares: number;
}) {
  //@ts-ignore
  const formatter = Intl.NumberFormat('en', {notation: 'compact'});

  function format(number = 0) {
    return formatter.format(number);
  }

  return (
    <View
      style={{
        display: 'flex',
        position: 'absolute',
        right: 0,
        bottom: 100,
        height: 200,
        width: 80,
      }}>
      <View
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LongPressButton active={true}>
            <Crown
              fill={'white'}
              width={colors.iconWidth}
              height={colors.iconHeight}
            />
          </LongPressButton>
          <Text
            style={{color: colors.textPrimary, fontWeight: colors.fontBold}}>
            {format(crowns)}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LongPressButton>
            <ChatBubble
              stroke={'white'}
              width={colors.iconWidth}
              height={colors.iconHeight}
            />
          </LongPressButton>
          <Text
            style={{color: colors.textPrimary, fontWeight: colors.fontBold}}>
            {format(comments)}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LongPressButton>
            <Share
              stroke={'white'}
              width={colors.iconWidth}
              height={colors.iconHeight}
            />
          </LongPressButton>
          <Text
            style={{color: colors.textPrimary, fontWeight: colors.fontBold}}>
            {format(shares)}
          </Text>
        </View>
      </View>
    </View>
  );
}

function LongPressButton({children, active}: any) {
  const [isHovering, setIsHovering] = useState(false);
  const handleLongPress = useCallback(() => {
    HapticFeedback.trigger('impactMedium');
  }, []);

  return (
    <Pressable
      style={{
        borderWidth: 2,
        marginVertical: 10,
        borderColor: active ? colors.accentHighlight : colors.line,
        borderRadius: 100,
        padding: 10,
        backgroundColor: active ? colors.accentHighlight : colors.line,
        // position: 'absolute',
        // bottom: 0,
        // right: 0,

        shadowColor: colors.accent,
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 13,
      }}
      onHoverIn={handleLongPress}>
      {children}
    </Pressable>
  );
}

function LongPressCornerButton({handleLongPress, opened}: any) {
  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        // backgroundColor: opened ? 'rgba(0,0,0,.85)' : null,
      }}>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          width: 120,
          height: 150,
        }}>
        <MemeInteractionSelection />
      </View>
    </View>
  );
}
const MemeInteractionSelection = () => {
  const [showInteractionIcons, setShowInteractionIcons] = useState(false);

  function handleLongPress() {
    setShowInteractionIcons(prev => !prev);
  }
  return (
    <View style={{position: 'relative', flex: 1}}>
      {showInteractionIcons ? (
        <>
          <View style={{position: 'absolute', top: '30%', right: 0}}>
            <LongPressButton>
              <Crown
                fill={'white'}
                width={colors.iconWidth}
                height={colors.iconHeight}
              />
            </LongPressButton>
          </View>
          <View style={{position: 'absolute', bottom: '50%', left: '37%'}}>
            <LongPressButton>
              <ChatBubble
                stroke={'white'}
                width={colors.iconWidth}
                height={colors.iconHeight}
              />
            </LongPressButton>
          </View>
          <View style={{position: 'absolute', bottom: 0, left: '10%'}}>
            <LongPressButton>
              <Share
                stroke={'white'}
                width={colors.iconWidth}
                height={colors.iconHeight}
              />
            </LongPressButton>
          </View>
        </>
      ) : null}
      <Pressable
        style={{
          borderWidth: 2,
          borderColor: 'white',
          borderRadius: 100,
          padding: 20,
          position: 'absolute',
          bottom: 0,
          right: 0,
          transform: [{scale: showInteractionIcons ? 0.8 : 1}],
        }}
        onLongPress={handleLongPress}>
        {showInteractionIcons ? (
          <Cancel width={colors.iconWidth} height={colors.iconHeight} />
        ) : (
          <Fingerprint
            stroke={'white'}
            width={colors.iconWidth}
            height={colors.iconHeight}
          />
        )}
      </Pressable>
    </View>
  );
};
