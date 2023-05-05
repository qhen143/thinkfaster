import { Box, Button, Card, Container, Divider, Drawer, Link, List, ListItem, ListItemText, Stack, SvgIcon, ThemeProvider, Typography, createTheme } from "@mui/material";
import Menu from "./Menu";
import { useState } from "react";
import mypic from '../../public/logo.svg'
import logo from '../../public/icon-basic.svg'
import uniticon from '../../public/Set8-Samira.jpg'
import HexagonTile from "./HexagonTile";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';


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
                <Container maxWidth='md'>
                    <Card variant="outlined" sx={{ p: { xs: 1, md: 2 } }}>
                        <Typography variant="h4" align="center" sx={{ p: {xs: 1, md: 2}}}>
                            Think Faster Tactics!
                        </Typography>
                        <Divider />
                        //TODO add overview
                        <Typography variant="h5" sx={{ px: {xs: 1, md: 2}, pt: {xs: 1, md: 2} }}>
                            How to play
                        </Typography>
                        <List sx={{ listStyle: "decimal", px: {xs: 2, md: 4} }}>
                            <ListItem sx={{ display: "list-item" }}>
                                <ListItemText primary="Click on the same units until you they combine into a golden unit."/>
                                {/* Make box that centers horizontally a component */}
                                <Box display="flex" justifyContent="center" alignItems="center"> 
                                    <Stack direction="row" spacing={5}>
                                        <Stack direction="row" spacing={-5}>
                                            <HexagonTile src={uniticon}/>
                                            <HexagonTile src={uniticon}/>
                                            <HexagonTile src={uniticon}/>
                                        </Stack>
                                        <Stack direction="row" alignItems="center" spacing={5}>
                                            <KeyboardDoubleArrowRightIcon fontSize='large' sx={{}}/>
                                            <HexagonTile src={uniticon}/>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </ListItem>
                            <ListItem sx={{ display: "list-item" }}>
                                <ListItemText primary="Do step 1 as fast as you can!" />
                            </ListItem>
                        </List>
                        // TODO add detial instructions
                        <Typography variant="h6" sx={{ px: {xs: 1, md: 2}, pt: {xs: 1, md: 2} }}>
                            For more details, follow this <Link target="_blank" href="https://github.com/qhen143/thinkfaster#background">link</Link>.
                        </Typography>
                        <Box justifyContent="flex-end" display="flex">
                            <Button variant="contained" onClick={() => toggleDrawer(open)}>Click here to start</Button>
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
                                        background: '#777',
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