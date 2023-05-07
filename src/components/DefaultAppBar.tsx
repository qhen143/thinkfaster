import { AppBar, Box, Button, Toolbar, Typography }  from '@mui/material';

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

    const pages = ['Learn', 'About Us']

    return (
        <AppBar
            position="relative"
            sx={{
                // borderBottom: (t) => `1px solid ${t.palette.divider}`,
                backgroundColor: 'rgba(0, 0, 0, 0.6)'
            }}
            >
            <Toolbar>
                <Button startIcon={<Logo/>} sx={{ my: 2, color: 'white', display: 'flex' }} >
                    <Typography variant="h6" color="inherit" sx={{ px: {xs: 1, md: 2} }}>
                        THINK FASTER TACTICS
                    </Typography>
                </Button>

                <Box justifyContent='flex-end' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                    <Button
                        key={page}
                        // onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                        {page}
                    </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default DefaultAppBar;