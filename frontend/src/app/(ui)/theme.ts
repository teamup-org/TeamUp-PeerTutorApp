'use client';

import { Nunito_Sans } from 'next/font/google';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const nunito_sans = Nunito_Sans({ subsets: ['latin'], weight: '600' });

const theme = responsiveFontSizes(createTheme({
  palette: {
    primary: {
      main: '#f8d06d',
      // light: '#',
      // dark: '#',
      // contrastText: '#',
    },

    secondary: {
      main: '#1e1810',
      // light: '#',
      // dark: '#',
      // contrastText: '#',
    },

    error: {
      main: '#000000',
      // light: '#',
      // dark: '#',
      // contrastText: '#',
    },

    warning: {
      main: '#000000',
      // light: '#',
      // dark: '#',
      // contrastText: '#',
    },

    info: {
      main: '#000000',
      // light: '#',
      // dark: '#',
      // contrastText: '#',
    },

    success: {
      main: '#000000',
      // light: '#',
      // dark: '#',
      // contrastText: '#',
    },

    background: {
      // paper: '#',
      default: '#ffffff',
    },
  },
  
  typography: {
    fontFamily: [ nunito_sans.style.fontFamily, ].join(','),
    // fontSize: <value>,
    // fontWeightLight: <value>,
    // fontWeightRegular: <value>,
    // fontWeightMedium: <value>,
    // fontWeightBold: <value>,

    /* h<1-6>: {
      fontFamily: "",
      fontWeight: 600,
      fontSize: "<value>rem",
      lineHeight: <value>,
      letterSpacing: "<value>em",
    }, */

    /* subtitle<1-2>: {
      fontFamily: "",
      fontWeight: <value>,
      fontSize: "<value>rem",
      lineHeight: <value>,
      letterSpacing: "<value>em",
    }, */

    body1: {
      //fontFamily: "",
      //fontWeight: <value>,
      fontSize: "1rem",
      //lineHeight: <value>,
      //letterSpacing: "<value>em",
    },

    body2: {
      //fontFamily: "",
      //fontWeight: <value>,
      fontSize: "1rem",
      //lineHeight: <value>,
      //letterSpacing: "<value>em",
    },

    /* button: {
      fontFamily: "",
      fontWeight: <value>,
      fontSize: "<value>rem",
      lineHeight: <value>,
      letterSpacing: "<value>em",
      textTransform: "",
    }, */

    /* caption: {
      fontFamily: "",
      fontWeight: <value>,
      fontSize: "<value>rem",
      lineHeight: <value>,
      letterSpacing: "<value>em",
    }, */

    /* overline: {
      fontFamily: "",
      fontWeight: <value>,
      fontSize: "<value>rem",
      lineHeight: <value>,
      letterSpacing: "<value>em",
      textTransform: "",
    }, */

    /* inherit: {
      fontFamily: "",
      fontWeight: <value>,
      fontSize: "<value>rem",
      lineHeight: <value>,
      letterSpacing: "<value>em",
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