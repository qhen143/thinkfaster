import Head from "next/head";
import "../styles/index.css";
import CssBaseline from '@mui/material/CssBaseline';
import DefaultAppBar from '../src/components/DefaultAppBar';
import { Box, ThemeProvider, createTheme } from "@mui/material";

const font =  "'Exo 2', sans-serif";

const darkTheme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(#9198e5, #e66465)',
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        },
      },
    },
  },
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: font,
    fontSize: 24
  },
});

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        <Head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          {/* TODO */}
          <meta name="description" content="Web site created using create-react-app" /> 
          <title>Think Faster Tactics!</title> 
          {/* TODO change favicon */}
        </Head>
        <Box display="flex" flexDirection='column' height="100vh">
          <DefaultAppBar/>
          <Box flex={1} height="auto">
            <Box justifyContent="center" alignItems='center' display="flex" height="100%"> 
                <Component {...pageProps} />
              </Box>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  )
}