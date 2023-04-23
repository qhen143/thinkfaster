import { Typography, Slider, Input } from "@mui/material";
import { useState } from "react";
import Grid from '@mui/material/Unstable_Grid2';



function SettingSlider(props: {
    label: string,
    defaultValue: number,
    min: number,
    max: number,
}) 
{
    // const [value, setValue] = useState<number | string | Array<number | string>>(props.defaultValue);
    // const handleSliderChange = (event: Event, newValue: number | number[]) => {
    //     setValue(newValue);
    //   };
    
    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setValue(event.target.value === '' ? '' : Number(event.target.value));
    // };

    // const handleBlur = () => {
    //     const val = Number(value);
    //     if (val < props.min) {
    //         setValue(props.min);
    //     } else if (val > props.max) {
    //         setValue(props.max);
    //     }
    // };

    // TODO use value
    return (
        <>
            <Grid xs={12}>
                <Typography component="h1" variant="h6" align="left">
                    {props.label}
                </Typography>
            </Grid>
            <Grid xs={12}>
                <Slider
                    // value={typeof value === 'number' ? value : 0}
                    // onChange={handleSliderChange}
                    aria-labelledby="input-slider"
                    defaultValue={props.defaultValue} min={props.min} max={props.max}
                    valueLabelDisplay='on'
                    sx={{ my: { xs: 1, md: 2 } }}
                />
            </Grid>
                {/* <Grid item>
                    <Input
                        value={value}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 1,
                            min: props.min,
                            max: props.max,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid> */}
        </>
    )
}

export default SettingSlider;