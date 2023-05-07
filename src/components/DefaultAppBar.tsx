import { AppBar, Box, Button, Toolbar, Typography }  from '@mui/material';
import Link from 'next/link';

import Image from 'next/image'
import logopng from '../../public/icon-basic.png'

function DefaultAppBar() {

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
            path: "/"
        },
        {
            description: 'Rules',
            path: "/rules"
        }, 
        {
            description: 'About',
            path: "/"
        }
    ]

    return (
        <AppBar
            position="relative"
            sx={{
                // borderBottom: (t) => `1px solid ${t.palette.divider}`,
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
                        // onClick={handleCloseNavMenu}
                        LinkComponent={Link}
                        href={page.path}
                        sx={{ my: 2, px:2, color: 'white', display: 'block' }}
                    >
                        {page.description}
                    </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default DefaultAppBar;