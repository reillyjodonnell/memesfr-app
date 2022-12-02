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
              console.log(props.navigation);
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              const isFocused = props.state.index === index;

              const onPress = () => {
                const event = props.navigation?.emit({
                  type: 'tabPress',
                  target: route.key,
                });

                if (!isFocused && !event.defaultPrevented) {
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
                      height={colors.iconHeight}
                      width={colors.iconWidth}
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
      }}
      // onPress={() => setActive(1)}>
    >
      <Text
        style={{color: isFocused ? colors.textPrimary : colors.textSecondary}}>
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
    height: 40,
    width: '100%',
    zIndex: 20,
    paddingHorizontal: 10,
  },
  icons: {
    paddingHorizontal: 20,
  },
});
