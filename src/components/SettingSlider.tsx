import { Typography, Slider, Input } from "@mui/material";
import { useState } from "react";
import Grid from '@mui/material/Unstable_Grid2';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function SettingSlider(props: {
    label: string,
    value: number,
    min: number,
    max: number,
    onChange: (event: Event, value: number | number[], activeThumb: number) => void
}) 
{
    // const [value, setValue] = useState<number | number[]>(props.defaultValue);

    // const usePresetValue = (value: number) => {
    //     setValue(value);
    // }

    // const handleSliderChange = (event: Event, newValue: number | number[]) => {
    //     setValue(newValue);
    //   };
    
    //   usePresetValue(props.defaultValue);
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
            <Grid xs={12} >
                <Typography variant="body1" align="left">
                    {props.label}
                </Typography>
            </Grid>
            <Grid xs={12}>
                <Slider
                    // value={typeof value === 'number' ? value : props.min}
                    onChange={props.onChange}
                    value={props.value}
                    aria-labelledby="input-slider"
                    min={props.min} max={props.max}
                    valueLabelDisplay='auto'
                    marks={[{value: props.min, label: props.min}, {value: props.max, label: props.max}]}
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