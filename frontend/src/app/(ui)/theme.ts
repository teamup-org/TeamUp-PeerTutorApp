'use client';

import { Nunito_Sans }
from 'next/font/google';

import { createTheme, responsiveFontSizes }
from '@mui/material/styles';
import { red }
from '@mui/material/colors';

const nunito_sans = Nunito_Sans({ subsets: ['latin'], weight: ['600', '700', '800', '900', '1000'], });

// Add custom palette colors here. Must use module augmentation when in Typescript
declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    text1: Palette['primary'];
    text2: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    text1?: PaletteOptions['primary'];
    text2?: PaletteOptions['primary'];
  }
}

declare module '@mui/material' {
  interface AppBarPropsColorOverrides {
    tertiary: true;
  }

  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}

declare module '@mui/material/Pagination' {
  interface PaginationPropsColorOverrides {
    tertiary: true;
  }
}

const theme = responsiveFontSizes(createTheme({
  palette: {
    primary: {
      main: '#f8d06d',
      // Calculated automatically from main
      // light: '#',
      // dark: '#',
      // contrastText: '#',
    },

    secondary: {
      main: '#1e1810',
    },

    tertiary: {
      main: '#434343',
    },

    background: {
      // paper: '#',
      default: '#F3F3F3',
    },

    text1: {
      main: '#1e1810',
    },

    text2: {
      main: '#62615C',
    },

    

    info: {
      main: '#000000',
    },

    warning: {
      main: '#000000',
    },

    error: red,
  },
  
  typography: {
    fontFamily: [ nunito_sans.style.fontFamily, ].join(','),
    fontWeightLight: 550,
    fontWeightRegular: 600,
    fontWeightMedium: 650,
    fontWeightBold: 700,

    h1: {
      // fontFamily: "",
      fontWeight: 600,
      // fontSize: "<value>rem",
      // lineHeight: <value>,
      // letterSpacing: "<value>em",
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },

    /* subtitle<1-2>: {
      Ditto ^
    }, */

    body1: {
      fontSize: '1rem',
    },

    body2: {
      fontSize: '1rem',
    },
  },

  transitions: {
    // In (ms)
    duration: {
      // shortest: <value>,
      // shorter: <value>,
      // short: <value>,
      standard: 300,
      // complex: <value>,
      // enteringScreen: <value>,
      // leavingScreen: <value>,
    },

    /* easing: {
      // easeInOut: '',
      // easeOut: '',
      // easeIn: '',
      // sharp: '',
    }, */
  },

  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
}));

export default theme;