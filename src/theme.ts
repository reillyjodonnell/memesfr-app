type Color = string | undefined | any;

const palette = {
  white: '#ffffff',
  black: '#000000',
  orange: '#ff7f11',
  red: '#ff1b1c',
  blue: '#20a4f3',
  green: '#5eeb5b',
  purple: 'rgba(203, 72, 183, 1)',

  // orange-highlight: #ff80119c;
  // red-highlight: #ff1b1b9f;
  // secondary-blue-highlight: #20a6f3a1;
  // green-highlight: #5deb5b8a;
  purpleHighlight: 'rgba(203, 72, 183, 0.6)',

  // orange-light-highlight: #ff801127;
  // red-light-highlight: #ff1b1b27;
  // secondary-blue-light-highlight: #20a6f334;
  // green-light-highlight: #5deb5b2c;
  purpleLightHighlight: '#cb48b725',
};

export const colors = {
  // colors
  bg: palette.black,
  textPrimary: palette.white,
  textSecondary: '#ffffffab' as Color,
  accentBg: palette.purple,
  accent: palette.purple,
  accentHighlight: palette.purpleHighlight,
  navActive: '#fbfbfba6' as Color,
  line: '#ffffff14',
  hover: '#393c469f',
  transparent: '#ffffff00',
  semiTransparent: '#ffffff12',

  border: {
    thin: 1,
    regular: 2,
    thick: 3,
  },

  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },

  // borders

  // icons
  iconWidth: 30,
  iconHeight: 30,
  logoHeight: 40,
  logoWidth: 40,

  // font weights
  fontBold: '700' as const,
  fontSemiBold: '600' as const,
  fontRegular: '500' as const,

  // stroke weights
  strokeBold: '2.5',
  strokeNormal: '1.5',

  // fonts
  fontSm: 14,
  fontMd: 16,
  fontLg: 20,
  fontXL: 25,
  fontXXL: 30,

  // calcs
  topbarHeight: 40,
  bottombarHeight: 60,
  heightOfTopAndBottomBars: 100,
  interactionHeight: 340,
  interactionWidth: 80,

  borderRadius: {
    rounded: 20,
    circle: 100,
  },

  textInputHeight: 50,

  avatar: {
    s: 40,
    m: 50,
    l: 60,
  },

  avatarWidth: 50,
  avatarHeight: 50,
};
