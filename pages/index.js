import Head from "next/head";
import Menu from '../src/components/Menu';
import Home from '../src/components/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Image from 'next/image'
import logopng from '../public/icon-basic.png'

const font =  "'Yatra One', cursive";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: font,
    fontSize: 24
  }
});

export default function HomePage() {

  function Icon(props) {
    return (
        <Image
            src={logopng}
            alt="Picture of the author"
            width={50}
            height={50}
          />
    )
}

  return (
    <>
      <Head>
        <title>ThinkFasterTactics - Home</title>
      </Head>

      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: 'relative',
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Toolbar>
            <Icon/>
            <Typography variant="h5" color="inherit" sx={{ px: {xs: 1, sm: 2}, py: {xs: 0.5, sm: 1} }}>
              Think Faster Tactics!
            </Typography>
          </Toolbar>
        </AppBar>
        <Home/>
      </ThemeProvider>
    </>
  )
}