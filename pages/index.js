import Head from "next/head";
import Menu from '../src/components/Menu';
import Home from '../src/components/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

import Image from 'next/image'
import logopng from '../public/icon-basic.png'

const font =  "'Exo 2', sans-serif";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#64748B',
      // paper: 'rgba(0, 0, 0, 0.6)',
    },
    // default: {
    //   main: '#64748B'
    // }
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
          elevation={0}
          sx={{
            position: 'relative',
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
            backgroundColor: 'rgba(0, 0, 0, 0.6)'
          }}
        >
          <Toolbar>
            <Icon/>
            <Typography variant="h6" color="inherit" sx={{ px: {xs: 1, md: 2}, py: {xs: 1, md: 2} }}>
              THINK FASTER TACTICS
            </Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ 
          position: 'absolute', 
          background: 'linear-gradient(#9198e5, #e66465)',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Home/>
        </Box>
      </ThemeProvider>
    </>
  )
}