import { extendTheme, theme } from '@chakra-ui/react';

const colors = {
  primary: {
    50: theme.colors.red[50],
    100: theme.colors.red[100],
    200: theme.colors.red[200],
    300: theme.colors.red[300],
    400: theme.colors.red[400],
    500: theme.colors.red[500],
    600: theme.colors.red[600],
    700: theme.colors.red[700],
    800: theme.colors.red[800],
    900: theme.colors.red[900],
  },
};

const fonts = {
  //   heading: 'Montserrat, sans-serif',
  //   body: 'Montserrat, sans-serif',
};

const customTheme = extendTheme({
  styles: {
    global: {
      html: {
        // 62.5% of 16px browser font size is 10px
        fontSize: '62.5%',
      },
      body: {
        fontSize: '1.6rem',
        background: 'background',
      },
    },
  },
  config: {
    ...theme.config,
    initialColorMode: 'light',
  },
  colors: {
    ...theme.colors,
    ...colors,
  },
  fonts: {
    ...theme.fonts,
    ...fonts,
  },
});

export default customTheme;
