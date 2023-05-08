import { Box, Button, Card, Container, Divider, Drawer, Link, List, ListItem, ListItemText, Stack, SvgIcon, ThemeProvider, Typography, createTheme } from "@mui/material";
import Menu from "./Menu";
import { useState } from "react";
import pengu from '../../public/pengu.png'
import logo from '../../public/icon-basic.png'
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';
import VideoSettingsRoundedIcon from '@mui/icons-material/VideoSettingsRounded';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Image from 'next/image';

function Home() {

    const [open, setOpen] = useState(false);

    const toggleDrawer = (state: boolean) => {
        setOpen(!state)
    }

    return (
        <>
            <Box display="block" padding={4} sx={{ background:'rgba(0, 0, 0, 0.6)', borderRadius: 3, boxShadow: 25  }}>
                <Typography variant="h5" sx={{  px: {xs: 3, md: 6}, py: {xs: 1, md: 2} }}>
                    THINK FASTER TACTICS
                </Typography>
                <Divider />
                <Typography variant="body1" sx={{ px: {xs: 3, md: 6}, py: {xs: 1, md: 2} }}>
                    An expiremental sandbox environment based on Teamfight Tactics.
                </Typography>
            </Box>

                    {/* <Box minWidth={"45%"} padding={4} sx={{ background:'rgba(0, 0, 0, 0.6)' }}>
                    <Typography variant="h5" sx={{ px: {xs: 1, md: 2}, py: {xs: 1, md: 2} }}>
                        HOW TO PLAY
                    </Typography>
                    <Divider /> 
                    <List sx={{ listStyle: "decimal", px: {xs: 2, md: 4} }}>
                        <ListItem sx={{ display: "list-item" }}>
                            <ListItemText primary="Find units using the reroll."/>
                        </ListItem>
                        <ListItem sx={{ display: "list-item" }}>
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
                    <Box justifyContent="flex-end" display="flex">
                        <Button variant="text" onClick={() => toggleDrawer(open)}>
                            <VideoSettingsRoundedIcon fontSize="large" color="action"/>
                        </Button>
                    </Box> */}
                    {/* <Drawer
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
                    </Drawer> */}
                {/* </Box> */}
        </>
    )
}

export default Home;