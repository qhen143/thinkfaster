import { useState } from "react";
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { MobileStepper, Button, Card, Stack, Box, Typography, Divider } from '@mui/material'
import HexagonTile from "./HexagonTile";
import uniticon from '../../public/Set8-Samira.jpg'
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';

function Rules() {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const steps = [
        {
            title: "Objective",
            description: "Build the strongest army possible."
        },
        {
            title: "Shopping",
            description: "Use the refresh button to find new champions."
        },
        {
            title: "Upgrading",
            description: "Combine 3 of the same champion to upgrade it."
        },
        {
            title: "Objective",
            description: "Build the strongest army possible.Build the strongest army possible.Build the strongest army possible.Build the strongest army possible.Build the strongest army possible.Build the strongest army possible."
        }
    ]

    function GetStep(i: number) {

        const a = (
            <>
                <Typography variant="h5" sx={{ px: {xs: 1, md: 2}, py: {xs: 1, md: 2} }}>
                    {steps[i].title}
                </Typography>
                <Divider /> 
                <Typography variant="body1" sx={{ px: {xs: 1, md: 2}, py: {xs: 1, md: 2} }}>
                    {steps[i].description}
                </Typography>
                {/* Make box that centers horizontally a component */}
                <Box display="flex" justifyContent="center" alignItems="center" border="1px solid" padding={2} margin={2}> 
                    <Stack direction="row" spacing={5}>
                        <Stack direction="row" spacing={-5}>
                            <Box><HexagonTile src={uniticon}/></Box>
                            <Box sx={{ pt: 3 }}><HexagonTile src={uniticon}/></Box>
                            <Box sx={{ pt: 6 }}><HexagonTile src={uniticon}/></Box>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={5}>
                            <ForwardRoundedIcon fontSize='large' sx={{}}/>
                            <HexagonTile src={uniticon}/>
                        </Stack>
                    </Stack>
                </Box>
            </>
        )

        return a;
    }

  return (
      <>
        <Stack sx={{ width: '45%',  }}>
            <Box minHeight={"65vh"} padding={4} sx={{ background:'rgba(0, 0, 0, 0.6)' }}>
                {GetStep(activeStep)}
            </Box>
            <MobileStepper
                variant="dots"
                steps={steps.length}
                position="static"
                activeStep={activeStep}
                sx={{ 
                    background: 'rgba(0, 0, 0, 0.6)', 
                    "& .MuiMobileStepper-dotActive": {
                        backgroundColor: "text.primary",
                    },
                }}
                nextButton={
                  <Button size="small" onClick={handleNext} disabled={activeStep === steps.length-1} sx={{ color: "text.primary" }}>
                      <KeyboardArrowRight />
                      Next
                  </Button>
                }
                backButton={
                  <Button size="small" onClick={handleBack} disabled={activeStep === 0} sx={{ color: "text.primary" }}>
                      <KeyboardArrowLeft />
                      Back
                  </Button>
                }
            />
        </Stack>
      </>
  )
}

export default Rules;