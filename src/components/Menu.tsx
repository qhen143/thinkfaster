import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, Card, Container, Divider, Drawer, FormControl, FormControlLabel, Paper, Radio, RadioGroup, Slider, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import SettingSlider from "./SettingSlider";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Menu() {
    const [selectedValue, setSelectedValue] = useState('standard');
    const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            {/* Heading */}
            <Typography variant="h6" align="center" sx={{ p: {xs: 1, md: 2}}}>
                Game Settings
            </Typography>
            <Divider />
            {/* Presets */}
            <Box alignItems="center" justifyContent="center" display="flex" flexDirection="column">
                <Typography variant="body1" align="left" sx={{ pt: { xs: 1, md: 2 } }}>
                    Presets
                </Typography>
                <ButtonGroup aria-label="outlined button group" 
                    sx={{ py: { xs: 1, md: 2 } }}
                >
                    <Button>Default</Button>
                    <Button>Think Faster</Button>
                    <Button>Other</Button>
                </ButtonGroup>
            </Box>
            <Divider />
            {/* Basic Settings */}
            <Grid container sx={{ px: { xs: 4, md: 8 }, py: { xs: 2, md: 4 } }}>
                <SettingSlider label='Starting Time' defaultValue={50} min={10} max={100}/>
                <SettingSlider label='Starting Level' defaultValue={1} min={1} max={10}/>
                <SettingSlider label='Starting Gold' defaultValue={0} min={0} max={100}/>
            </Grid>   
            <Divider />
            {/* Advanced Settings */}
            <Grid container sx={{ px: { xs: 4, md: 8 }, py: { xs: 1, md: 2 } }}>
                <SettingSlider label='Shop Size' defaultValue={5} min={1} max={10}/>
                <SettingSlider label='Bench Size' defaultValue={9} min={2} max={10}/>
                <SettingSlider label='XP Modifer' defaultValue={4} min={1} max={10}/>

                {/* Placeholder content */}
                <SettingSlider label='Shop Size' defaultValue={5} min={1} max={10}/>
                <SettingSlider label='Bench Size' defaultValue={9} min={2} max={10}/>
                <SettingSlider label='XP Modifer' defaultValue={4} min={1} max={10}/>
            </Grid>
            <Divider />
            {/* Play Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', py: { xs: 1, md: 2 } }}>
                <Button
                    variant="contained"
                    size="large"
                    // onClick={handleNext}
                    // sx={{ mt: 3}}
                >
                    <Typography component="h1" variant="h6" align="center">
                        Play
                    </Typography>
                </Button>
            </Box>
        </>
    );
}

export default Menu;
