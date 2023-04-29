import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, Card, Container, Divider, Drawer, FormControl, FormControlLabel, Paper, Radio, RadioGroup, Slider, Switch, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import SettingSlider from "./SettingSlider";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MouseTracker from './MouseTracker';
import { Settings } from "../types/Settings";

function Menu() {
    enum Presets {
        Standard,
        ThinkFaster,
        Blitz
      }

    const defaultSetting: Settings = {
        UseMouseTracker: true,
        shopSize: 5,
        benchSize: 9,
        time: 70, 

        StartingGold: 50,
        RollCost: 2,
    
        // Board
        rows: 4,
        columns: 7,
    
        // Level
        StartingLevel: 1,
        StartingXP: 0,
        XPModifier: 4,
        MaxLevel: 9,
        LevelThresholds: [2, 2, 6, 10, 20, 36, 56, 80, 100], // TODO use user input
        UnitLimits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }

    const thinkFasterSetting: Settings = {
        UseMouseTracker: true,
        shopSize: 5,
        benchSize: 9,
        time: 60, 

        StartingGold: 0,
        RollCost: 0,
    
        // Board
        rows: 4,
        columns: 7,
    
        // Level
        StartingLevel: 8,
        StartingXP: 0,
        XPModifier: 4,
        MaxLevel: 9,
        LevelThresholds: [2, 2, 6, 10, 20, 36, 56, 80, 100], // TODO use user input
        UnitLimits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }

    const blitzSetting: Settings = {
        UseMouseTracker: true,
        shopSize: 5,
        benchSize: 5,
        time: 10, 

        StartingGold: 0,
        RollCost: 0,
    
        // Board
        rows: 2,
        columns: 5,
    
        // Level
        StartingLevel: 7,
        StartingXP: 0,
        XPModifier: 6,
        MaxLevel: 9,
        LevelThresholds: [2, 2, 6, 10, 20, 36, 56, 80, 100], // TODO use user input
        UnitLimits: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }

    const [selectedValue, setSelectedValue] = useState('standard');
    const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
    const [setting, setSetting] = useState<Settings>(defaultSetting);

    const setPresets = (option: Presets) => {
        switch(option) {
            case Presets.Blitz:
                setSetting(blitzSetting);
                break;
            case Presets.ThinkFaster:
                setSetting(thinkFasterSetting);
                break;
            default:
                setSetting(defaultSetting);
                break;
        }
    }

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    const handleSliderChange = (settingName: keyof Settings) => (event: Event, newValue: number | number[]) => {
        setSetting(x => ({...x, [settingName]: newValue as number}))
    }

    function AdvancedSettings(showAdvancedSettings: boolean) {
        if (!showAdvancedSettings)
            return <></>

        return (
            <>
                <Grid container sx={{ px: { xs: 4, md: 8 }, py: { xs: 1, md: 2 } }}>
                    <SettingSlider label='Shop Size' value={setting.shopSize} min={1} max={10} onChange={handleSliderChange('shopSize')}/>
                    <SettingSlider label='Bench Size' value={setting.benchSize} min={2} max={10} onChange={handleSliderChange('benchSize')}/>
                    <SettingSlider label='Board Height' value={setting.rows} min={1} max={5} onChange={handleSliderChange('rows')}/>
                    <SettingSlider label='Board Width' value={setting.columns} min={1} max={10} onChange={handleSliderChange('columns')}/>
                    <SettingSlider label='XP Modifer' value={setting.XPModifier} min={1} max={10} onChange={handleSliderChange('XPModifier')}/>
                    <SettingSlider label='Max Level' value={setting.MaxLevel} min={1} max={10} onChange={handleSliderChange('MaxLevel')}/>
                    <SettingSlider label='Gold per Refresh' value={setting.RollCost} min={0} max={2} onChange={handleSliderChange('RollCost')}/>
                </Grid>
                <Divider />
            </>
        );
    }

    // function HighlightMouse(highlightMouse: boolean) {
    //     if (!highlightMouse)
    //         return <></>

    //     return <MouseTracker/>;
    // 

    // TODO FONT
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
                    <Button onClick={() => setPresets(Presets.Standard)}>Default</Button>
                    <Button onClick={() => setPresets(Presets.ThinkFaster)}>Think Faster</Button>
                    <Button onClick={() => setPresets(Presets.Blitz)}>Blitz</Button>
                </ButtonGroup>
            </Box>
            <Divider />
            {/* Basic Settings */}
            <Grid container sx={{ px: { xs: 4, md: 8 }, py: { xs: 2, md: 4 } }}>
                <SettingSlider label='Starting Time' value={setting.time} min={0} max={100} onChange={handleSliderChange('time')}/>
                <SettingSlider label='Starting Level' value={setting.StartingLevel} min={1} max={10} onChange={handleSliderChange('StartingLevel')}/>
                <SettingSlider label='Starting Gold' value={setting.StartingGold} min={0} max={100} onChange={handleSliderChange('StartingGold')}/>
                {/* // TODO keybinds */}
            </Grid>   
            <FormControlLabel labelPlacement="start" control={
                <Switch checked={showAdvancedSettings} onChange={() => setShowAdvancedSettings(!showAdvancedSettings)} />
            } label="Show Advanced Settings" sx={{ px: { xs: 2, md: 4 }}}/>
            <Divider />
            {/* Advanced Settings */}
            {/* {HighlightMouse(props.enableMouseTracker)} */}
            {AdvancedSettings(showAdvancedSettings)}
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
