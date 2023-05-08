import { AppBar, Box, Button, Toolbar, Typography }  from '@mui/material';
import Link from 'next/link';

import Image from 'next/image'
import logopng from '../../public/icon-basic.png'
import { useState } from 'react';
import SettingsDrawer from './SettingsDrawer';

function DefaultAppBar() {

    const [open, setOpen] = useState(false);

    const toggleDrawer = (state: boolean) => {
        setOpen(!state)
    }

    function Logo() {
        return (
                <Image
                    src={logopng}
                    alt="Picture of the author"
                    width={50}
                    height={50}
                />
        )
    }

    const pages = [ 
        {
            description: 'Play',
            path: "",
            onClick: toggleDrawer
        },
        {
            description: 'Rules',
            path: "/rules",
            onClick: () => void 0
        }, 
        {
            description: 'About',
            path: "/about",
            onClick: () => void 0
        }
    ]

    return (
        <>
            <AppBar
                position="relative"
                sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.6)'
                }}
                >
                <Toolbar>
                    <Button startIcon={<Logo/>} LinkComponent={Link} href="/" sx={{ my: 2, color: 'white', display: 'flex' }} >
                        <Typography variant="h6" color="inherit" sx={{ px: {xs: 1, md: 2} }}>
                            THINK FASTER TACTICS
                        </Typography>
                    </Button>

                    <Box justifyContent='flex-end' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                        <Button
                            key={page.description}
                            LinkComponent={Link}
                            href={page.path}
                            onClick={() => page.onClick(open)}
                            sx={{ my: 2, px:2, color: 'white', display: 'block' }}
                        >
                            {page.description}
                        </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <SettingsDrawer open={open} onClick={toggleDrawer}/>
        </>
    )
}

export default DefaultAppBar;