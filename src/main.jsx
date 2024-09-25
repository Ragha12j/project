
// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import { ThemeProvider, createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   // يمكنك تخصيص موضوع Material UI هنا
//   palette: {
//     primary: {
//       main: '#1976d2',
//     },
//     secondary: {
//       main: '#dc004e',
//     },
//   },
// });

// ReactDOM.render(
//   <ThemeProvider theme={theme}>
//     <App />
//   </ThemeProvider>,
//   document.getElementById('root')
// );
//-----------------------------
import "./index.css";
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
//import theme from './theme';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


// إعداد الـ Cache لدعم RTL
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});




const theme = createTheme({
  typography: {
    fontFamily: 'Tajawal, sans-serif',
  },
  direction: 'rtl',
  // يمكنك تخصيص موضوع Material UI هنا
  palette: {
    primary: {
      main: '#00bcd4',
    },
    secondary: {
      main: '#87ceeb',
    },
  },
});

root.render(
  <React.StrictMode>
     <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </ThemeProvider>
    </CacheProvider>
    ,
  </React.StrictMode>,
);
//==========================













