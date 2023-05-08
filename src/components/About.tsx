import { Box, Button, Card, Container, Divider, Drawer, Link, List, ListItem, ListItemText, Stack, SvgIcon, ThemeProvider, Typography, createTheme } from "@mui/material";
import Menu from "./Menu";
import { useState } from "react";
import pengu from '../../public/pengu.png'
import logo from '../../public/icon-basic.png'
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';
import VideoSettingsRoundedIcon from '@mui/icons-material/VideoSettingsRounded';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Image from 'next/image';

function About() {

    const [open, setOpen] = useState(false);

    const toggleDrawer = (state: boolean) => {
        setOpen(!state)
    }

    return (
        <>
            <Grid container minWidth={1} rowSpacing={15} sx={{ mt: 5}}>
                <Grid xs={7}>
                    <Box display="block" padding={4} marginX={10} sx={{ background:'rgba(0, 0, 0, 0.6)', borderRadius: 3, boxShadow: 25 }}>
                        <Typography variant="h5" sx={{  px: {xs: 3, md: 6}, py: {xs: 1, md: 2} }}>
                            Teamfight Tactics (TFT)
                        </Typography>
                        <Divider />
                        <Typography variant="body1" sx={{ px: {xs: 3, md: 6}, py: {xs: 1, md: 2} }}>
                            Teamfight Tactics is a popular auto battler game mode within the video game, League of Legends. 
                        </Typography>
                        <Typography variant="body1" sx={{ px: {xs: 3, md: 6}, py: {xs: 1, md: 2} }}>
                            In TFT, players assemble a team of champions and strategically position them on a board to battle against other players' teams. 
                        </Typography>
                    </Box>
                </Grid>
                <Grid xs={5}>
                    <Box marginX={10}>
                        <Image src={pengu} alt="pengu" height={500}/>
                    </Box>
                </Grid>



                <Grid xs={5}>
                    <Box marginX={10}>
                        <Image src={logo} alt="logo" height={500}/>
                    </Box>                
                </Grid>
                <Grid xs={7}>
                    <Box display="block" padding={4}  marginX={10} sx={{ background:'rgba(0, 0, 0, 0.6)', borderRadius: 3, boxShadow: 25  }}>
                        <Typography variant="h5" sx={{  px: {xs: 3, md: 6}, py: {xs: 1, md: 2} }}>
                            What is Think Fast?
                        </Typography>
                        <Divider />
                        <Typography variant="body1" sx={{ px: {xs: 3, md: 6}, py: {xs: 1, md: 2} }}>
                            In TFT, augments are gameplay modifiers that can be used to add variety to the game. Think Fast is an augment that does the following: 
                        </Typography>
                        <Typography variant="body1" sx={{ px: {xs: 3, md: 6}, py: {xs: 1, md: 2} }}>
                            <i>"Shop refreshes are free until the end of this round. Traits and other augments do not benefit from these free shops."</i>
                        </Typography>
                    </Box>
                </Grid>

                <Grid xs={7}>
                    <Box display="block" padding={4} marginX={10} sx={{ background:'rgba(0, 0, 0, 0.6)', borderRadius: 3, boxShadow: 25  }}>
                        <Typography variant="h5" sx={{  px: {xs: 3, md: 6}, py: {xs: 1, md: 2} }}>
                            THINK FASTER TACTICS
                        </Typography>
                        <Divider />
                        <Typography variant="body1" sx={{ px: {xs: 3, md: 6}, py: {xs: 1, md: 2} }}>
                            An expiremental sandbox environment based on Teamfight Tactics.
                        </Typography>
                    </Box>
                </Grid>
                <Grid xs={5}>
                    <Box marginX={10}>
                        <Image src={pengu} alt="pengu" height={500}/>
                    </Box>
                </Grid>

            </Grid>
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
                {/* </Box> */}
        </>
    )
}

export default About;