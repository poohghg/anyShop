const margins = {
  sm: ".5rem",
  base: "1rem",
  lg: "2rem",
  xl: "3rem",
};

const paddings = {
  sm: ".5rem",
  base: "1rem",
  lg: "2rem",
  xl: "3rem",
};

const fonts = {
  size: {
    one: "1rem",
    sm: "1.5rem",
    base: "1.6rem",
    lg: "2rem",
    xl: "2.5rem",
    title: "6rem",
  },
  weight: {
    light: 100,
    normal: 400,
    bold: 700,
  },
};

const colors = {
  white: `#fff`,
  black: "#1B1D2A",
  LightBlack: "#464646",
  red: "#ff4d4d",
  yellow: "#ffff4d",
  blue: "#103778",
  skyBlue: "#1ea4ff",
  deepBlue: "#273273",
  lightGray: "#BCBCBC",
  gray: "#999999",
  mainBackGroud: "#F0F3F6",
  puple: "rgb(103, 40, 255);",
  blackGray: "rgba(28,39,51,255)",
};

const size = {
  mobile: "425px",
  tablet: "768px",
  desktop: "1440px",
};

// 미디어 쿼리의 중복 코드를 줄이기위해 정의된 변수입니다
const device = {
  mobile: `@media only screen and (max-width: ${size.mobile})`,
  tablet: `@media only screen and (max-width: ${size.tablet})`,
  desktopL: `@media only screen and (max-width: ${size.desktop})`,
};

const mediaSize = {
  mobile: "800px",
  tablet: "900px",
  desktop: "1200px",
};

const media = {
  // max 보다 작다면
  // min 보다 크다면
  mobile: `(max-width: ${mediaSize.mobile})`,
  tablet: `(max-width: ${mediaSize.tablet})`,
  // laptop: `(max-width: ${mediaSize.laptop}px)`,
  desktop: `(min-width: ${mediaSize.desktop})`,
};

export const Theme = {
  margins,
  paddings,
  fonts,
  device,
  colors,
  media,
};

export const dark = {
  colors: {
    fontColor: "#121212",
    bgColor: "#b8b8b8",
  },
};

export const light = {
  colors: {
    fontColor: "#b8b8b8",
    bgColor: "#121212",
  },
};
