import { Box, Button, Card, Container, Divider, Drawer, Link, List, ListItem, ListItemText, Stack, SvgIcon, ThemeProvider, Typography, createTheme } from "@mui/material";
import Menu from "./Menu";
import { useState } from "react";
import mypic from '../../public/logo.svg'
import logo from '../../public/icon-basic.svg'
import uniticon from '../../public/Set8-Samira.jpg'
import HexagonTile from "./HexagonTile";
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';
import VideoSettingsRoundedIcon from '@mui/icons-material/VideoSettingsRounded';

function Home() {

    const [open, setOpen] = useState(false);
    // const [enableMouseTracker, setMouseTracker] = useState(false);

    const toggleDrawer = (state: boolean) => {
        setOpen(!state)
    }

    // const ToggleMouseTracker = () => {
    //     setMouseTracker(!enableMouseTracker);
    //     console.log(enableMouseTracker);
    // }



    const theme = createTheme({

      });

    return (
        <>
            {/* <ThemeProvider theme={theme}> */}
                <Container maxWidth='md' sx={{}}>
                    <Card variant="outlined" sx={{ p: { xs: 1, md: 2, background: 'rgba(0, 0, 0, 0.6)' }}}>
                        {/* <Typography variant="h4" align="center" sx={{ p: {xs: 1, md: 2}}}>
                            THINK FASTER TACTICS
                        </Typography>
                        <Divider /> */}
                        <Typography variant="h5" sx={{ px: {xs: 1, md: 2}, py: {xs: 1, md: 2} }}>
                            HOW TO PLAY
                        </Typography>
                        <Divider /> 
                        <List sx={{ listStyle: "decimal", px: {xs: 2, md: 4} }}>
                            <ListItem sx={{ display: "list-item" }}>
                                <ListItemText primary="Find units using the reroll."/>
                            </ListItem>
                            <ListItem sx={{ display: "list-item" }}>
                                <ListItemText primary="Buy the same units."/>
                            </ListItem>
                            <ListItem sx={{ display: "list-item" }}>
                                <ListItemText primary="Combine 3 of the same units to upgrade it."/>
                                {/* Make box that centers horizontally a component */}
                                <Box display="flex" justifyContent="center" alignItems="center" border="1px solid" padding={2} margin={2}> 
                                    <Stack direction="row" spacing={5}>
                                        <Stack direction="row" spacing={-5}>
                                            <Box><HexagonTile src={uniticon}/></Box>
                                            <Box sx={{ pt: 3 }}><HexagonTile src={uniticon}/></Box>
                                            <Box sx={{ pt: 6 }}><HexagonTile src={uniticon}/></Box>
                                        </Stack>
                                        <Stack direction="row" alignItems="center" spacing={5}>
                                            <ForwardRoundedIcon fontSize='large' sx={{}}/>
                                            <HexagonTile src={uniticon}/>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </ListItem>

                            <ListItem sx={{ display: "list-item" }}>
                                <ListItemText primary="Do this as fast as you can!" />
                            </ListItem>
                        </List>
                        {/* <Typography variant="h6" sx={{ px: {xs: 1, md: 2}, pt: {xs: 1, md: 2} }}>
                            For more details, follow this <Link target="_blank" href="https://github.com/qhen143/thinkfaster#background">link</Link>.
                        </Typography> */}
                        <Box justifyContent="flex-end" display="flex">
                            <Button variant="text" onClick={() => toggleDrawer(open)}>
                                <VideoSettingsRoundedIcon fontSize="large" color="action"/>
                            </Button>
                        </Box>
                        <Drawer
                                anchor="right"
                                open={open}
                                onClose={() => toggleDrawer(open)}
                                PaperProps={{
                                    sx: {
                                        // borderRadius: 7,
                                        // mr: -2,
                                        // width: 1/4,
                                        minWidth: 1/4,
                                        overflowY: 'scroll',
                                        scrollbarWidth: 'thin',
                                        '::-webkit-scrollbar': {
                                        width: '0.5rem',
                                        },
                                        '::-webkit-scrollbar-thumb': {
                                        borderRadius: '1rem',
                                        backgroundColour: 'rgba(0, 0, 0)',
                                        },
                                    },
                                }}
                        >
                            <Menu />
                        </Drawer>
                    </Card>
                </Container>    
            {/* </ThemeProvider> */}
        </>
    )
}

export default Home;