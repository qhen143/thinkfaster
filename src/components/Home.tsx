import { Box, Button, Card, Container, Divider, Drawer, Link, List, ListItem, ListItemText, Typography } from "@mui/material";
import Menu from "./Menu";
import React from "react";

function Home() {

    const [open, setOpen] = React.useState(false);

    const menu = <Menu/>

    const toggleDrawer = (state: boolean) => {
        setOpen(!state)
    }

    return (
        <>
            <Container maxWidth='md'>
                <Card variant="outlined" sx={{ p: { xs: 1, md: 2 } }}>
                    <Typography variant="h3" align="center" sx={{ p: {xs: 1, md: 2}}}>
                        Think Faster Tactics!
                    </Typography>
                    <Divider />
                    <Typography variant="h4" sx={{ px: {xs: 1, md: 2}, pt: {xs: 1, md: 2} }}>
                        How to play
                    </Typography>
                    <List sx={{ listStyle: "decimal",px: {xs: 2, md: 4} }}>
                        <ListItem sx={{ display: "list-item" }}>
                            <ListItemText primary="Click on the same units until you they combine into a golden unit. 👇 ⌨ 👇"/>
                        </ListItem>
                        <ListItem sx={{ display: "list-item" }}>
                            <ListItemText primary="Do step 1 as fast as you can!" />
                        </ListItem>
                    </List>
                    <Typography variant="h7" sx={{ px: {xs: 1, md: 2}, pt: {xs: 1, md: 2} }}>
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
                                    borderRadius: 7,
                                    mr: -2
                                },
                            }}
                    >
                        {menu}
                    </Drawer>
                </Card>
            </Container>
        </>
    )
}

export default Home;