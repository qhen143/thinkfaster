import { Button, ButtonGroup, Divider, FormControlLabel, FormGroup, List, ListItem, Switch, Typography } from "@mui/material";
import SettingSlider from "./SettingSlider";
import { useState } from "react";
import { Settings } from "../types/Settings";
import Link from "next/link";

function Menu(props: {onClick: Function}) {
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

    const handleSliderChange = (settingName: keyof Settings) => (event: Event, newValue: number | number[]) => {
        setSetting(x => ({...x, [settingName]: newValue as number}))
    }

    function AdvancedSettings(showAdvancedSettings: boolean) {
        if (!showAdvancedSettings)
            return <></>

        return (
            <>
                <SettingSlider label='SHOP SIZE' value={setting.shopSize} min={1} max={10} onChange={handleSliderChange('shopSize')}/>
                <SettingSlider label='BENCH SIZE' value={setting.benchSize} min={2} max={10} onChange={handleSliderChange('benchSize')}/>
                <SettingSlider label='BOARD HEIGHT' value={setting.rows} min={1} max={5} onChange={handleSliderChange('rows')}/>
                <SettingSlider label='BOARD WIDTH' value={setting.columns} min={1} max={10} onChange={handleSliderChange('columns')}/>
                <SettingSlider label='XP MODIFIER' value={setting.XPModifier} min={1} max={10} onChange={handleSliderChange('XPModifier')}/>
                <SettingSlider label='MAX LEVEL' value={setting.MaxLevel} min={1} max={10} onChange={handleSliderChange('MaxLevel')}/>
                <SettingSlider label='REFRESH COST' value={setting.RollCost} min={0} max={2} onChange={handleSliderChange('RollCost')}/>
            </>
        );
    }

    return (
        <>
        <List dense sx={{ px: {xs: 3, md: 6} }}>
            <ListItem divider sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h6" align="center" sx={{ p: {xs: 1, md: 2}}}>
                    SETTINGS
                </Typography>
                <Divider />
            </ListItem>

            <ListItem sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="body1" align="left" sx={{ pt: { xs: 1, md: 2 } }}>
                    PRESETS
                </Typography>
            </ListItem>
            <ListItem divider sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ButtonGroup aria-label="outlined button group" 
                    sx={{ pb: { xs: 1, md: 2 } }}
                >
                    <Button onClick={() => setPresets(Presets.Standard)} sx={{ color: "text.primary" }}>Default</Button>
                    <Button onClick={() => setPresets(Presets.ThinkFaster)} sx={{ color: "text.primary" }}>Think Faster</Button>
                    <Button onClick={() => setPresets(Presets.Blitz)} sx={{ color: "text.primary" }}>Blitz</Button>
                </ButtonGroup>
            </ListItem>

            <SettingSlider label='STARTING TIME' value={setting.time} min={0} max={100} onChange={handleSliderChange('time')}/>
            <SettingSlider label='STARTING LEVEL' value={setting.StartingLevel} min={1} max={10} onChange={handleSliderChange('StartingLevel')}/>
            <SettingSlider label='STARTING GOLD' value={setting.StartingGold} min={0} max={100} onChange={handleSliderChange('StartingGold')}/>
            
            <ListItem divider sx={{ display: 'flex', justifyContent: 'right', alignItems: 'right', py: {xs: 1, md: 2 } }}>
                <FormGroup>
                    <FormControlLabel labelPlacement="start" control={
                        <Switch checked={showAdvancedSettings} onChange={() => setShowAdvancedSettings(!showAdvancedSettings)} />
                    } label="ADVANCED SETTINGS"/>
                </FormGroup> 
            </ListItem>

            {AdvancedSettings(showAdvancedSettings)}
            
            <ListItem sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: {xs: 1, md: 2 } }}>
                <Button
                    variant="contained"
                    size="large"
                    LinkComponent={Link}
                    onClick={() => props.onClick()}
                    href={"/game"}
                    // sx={{ mt: 3, color: "text.primary"}}
                >
                    <Typography component="h1" variant="h6" align="center">
                        BEGIN
                    </Typography>
                </Button>
            </ListItem>
        </List>
        </>
    );
}

export default Menu;
