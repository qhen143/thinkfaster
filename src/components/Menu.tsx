import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Container, FormControl, FormControlLabel, Radio, RadioGroup, Slider, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import SettingSlider from "./SettingSlider";
import { useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Menu() {
    const [selectedValue, setSelectedValue] = useState('standard');

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            <Container maxWidth='md'>
                <Card variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Grid container>
                        <Grid xs={12}>
                            <Typography component="h1" variant="h4" align="center">
                                Game Settings
                            </Typography>
                        </Grid>
                        <Grid xs={12}>
                            <RadioGroup 
                                row     
                                value={selectedValue}
                                onChange={handleRadioChange}
                                sx={{
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <FormControlLabel value="standard" control={<Radio />} label="Standard" />
                                <FormControlLabel value="thinkfaster" control={<Radio />} label="Think Faster" />
                                <FormControlLabel value="custom" control={<Radio />} label="Custom" />
                            </RadioGroup>
                        </Grid>
                    </Grid>
                    {selectedValue === 'custom' && (
                        <>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography component="h1" variant="h5" align="center">
                                        Basic Settings
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={1} sx={{ px: { xs: 4, md: 8 } }}>
                                        <SettingSlider label='Starting Time' defaultValue={50} min={10} max={100}/>
                                        <SettingSlider label='Starting Level' defaultValue={1} min={1} max={10}/>
                                        <SettingSlider label='Starting Gold' defaultValue={0} min={0} max={100}/>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                >
                                    <Typography component="h1" variant="h5" align="center">
                                        Advanced Settings
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={1} sx={{ px: { xs: 4, md: 8 } }}>
                                        <SettingSlider label='Shop Size' defaultValue={5} min={1} max={10}/>
                                        <SettingSlider label='Bench Size' defaultValue={9} min={2} max={10}/>
                                        <SettingSlider label='XP Modifer' defaultValue={4} min={1} max={10}/>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            size="large"
                            // onClick={handleNext}
                            sx={{ mt: 3}}
                        >
                            <Typography component="h1" variant="h6" align="center">
                                Play
                            </Typography>
                        </Button>
                    </Box>

                </Card>
            </Container>
        </>
    );
}

export default Menu;
