type Color = string | undefined | any;

export const colors = {
  // colors
  bg: '#000000' as any,
  bg2: '#272932' as Color,
  textPrimary: '#ffffff' as Color,
  textSecondary: 'rgb(158, 158, 158)' as Color,
  accentBg: '#cb48b7' as Color,
  accent: '#cb48b7' as Color,
  navActive: '#fbfbfba6' as Color,

  // borders
  rounded: 10,

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
  fontSm: 10,
  fontMd: 15,
  fontLg: 20,
  fontXL: 25,

  // calcs
  topbarHeight: 40,
  interactionHeight: 340,
  interactionWidth: 80,
};
