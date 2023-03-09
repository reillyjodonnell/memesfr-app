import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Castle from './assets/castle.svg';
import Search from './assets/search.svg';
import Flame from './assets/flame.svg';
import Clock from './assets/clock.svg';
import {colors} from './theme';

const iconMap = {
  Popular: Flame,
  Recent: Clock,
};

export const Branding = props => {
  const routes = props?.state?.routes;
  return (
    <View style={styles.logoContainer}>
      <Pressable
        style={{marginRight: 'auto'}}
        onPress={() => props?.navigation.navigate('Home')}>
        <Castle height={colors.logoHeight} width={colors.logoWidth} />
      </Pressable>
      <View
        style={{
          display: 'flex',
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {routes
          ? routes.map((route, index) => {
              const {options} = props.descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              const isFocused = props.state.index === index;

              const onPress = () => {
                // This is causing an error - undefined is not a function
                // const event = props.navigation?.emit({
                //   type: 'tabPress',
                //   target: route.key,
                // });

                // included in the if statement is '&& !event.defaultPrevented'
                if (!isFocused) {
                  props.navigation?.navigate(route.name);
                }
              };

              const onLongPress = () => {
                props.navigation?.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };

              const Icon = iconMap[label];

              const adjustment = label === 'Recent' ? 6 : 0;

              return (
                <BrandingIcon
                  onLongPress={onLongPress}
                  onPress={onPress}
                  isFocused={isFocused}
                  icon={
                    <Icon
                      stroke={
                        isFocused ? colors.textPrimary : colors.textSecondary
                      }
                      height={colors.iconHeight - 6}
                      width={colors.iconWidth - 6}
                    />
                  }
                  text={label}
                />
                // <TouchableOpacity
                //   accessibilityRole="button"
                //   accessibilityState={isFocused ? {selected: true} : {}}
                //   accessibilityLabel={options.tabBarAccessibilityLabel}
                //   testID={options.tabBarTestID}
                //   onPress={onPress}
                //   onLongPress={onLongPress}
                //   style={{flex: 1}}>
                //   <Text style={{color: isFocused ? '#673ab7' : '#222'}}>
                //     {label}
                //   </Text>
                // </TouchableOpacity>
              );
            })
          : null}
        {props.children}
      </View>
      <Pressable
        style={{marginLeft: 'auto'}}
        onPress={() => props?.navigation.navigate('Notifications')}>
        <Search
          stroke={'white'}
          height={colors.iconHeight}
          width={colors.iconWidth}
        />
      </Pressable>
    </View>
  );
};

function BrandingIcon({
  icon,
  text,
  onPress,
  onLongPress,
  isFocused = false,
}: any) {
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={{
        marginHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: isFocused ? colors.textPrimary : 'transparent',
      }}>
      <Text
        style={{
          fontSize: colors.fontMd,
          fontWeight: 'bold',
          color: isFocused ? colors.textPrimary : colors.textSecondary,
          marginRight: 4,
        }}>
        {text}
      </Text>

      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    height: colors.topbarHeight,
    backgroundColor: colors.transparent,

    width: '100%',
    zIndex: 20,
    paddingHorizontal: 10,
  },
  icons: {
    paddingHorizontal: 20,
  },
});
