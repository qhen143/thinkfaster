import Head from "next/head";
import Menu from '../src/components/Menu';
import Home from '../src/components/Home';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function HomePage() {
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
            <Typography variant="h6" color="inherit" noWrap>
              Think Faster Tactics (TFT)
            </Typography>
          </Toolbar>
        </AppBar>
        <Home/>
      </ThemeProvider>
    </>
  )
}