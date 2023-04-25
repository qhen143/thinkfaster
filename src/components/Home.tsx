import { Button, Card, Container, Drawer } from "@mui/material";
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
                <Card variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Button onClick={() => toggleDrawer(open)}>Click me</Button>
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