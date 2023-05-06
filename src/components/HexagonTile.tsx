import { Box } from '@mui/material';
import { CSSProperties } from '@mui/material/styles/createTypography';
import Image, { StaticImageData } from 'next/image';
import StarRateRoundedIcon from '@mui/icons-material/StarRounded';

const HexagonTile = (props: {src: string | StaticImageData }) => {
  const style: CSSProperties = {
    layout: "fill",
    objectPosition: '100%'
  }
  return (

    <Box className='hexagon'>
      <Box className='hexagon-inner'>
        <Box sx={{ position: 'relative' }}>
          <StarRateRoundedIcon sx={{ position: 'absolute', left: '10%', transform: 'translate(0, 130%)'}}/>
        </Box>
        <Image src={props.src} alt="Hexagon" style={style}/>
      </Box>
    </Box>

    // <div className="hexagon-container">
    //   <div className="hexagon-mask">
    //     <svg width="0" height="0">
    //       <defs>
    //         <clipPath id="hexagon-mask" clipPathUnits="objectBoundingBox">
    //           <polygon points="0.5 0, 0.9 0.25, 0.9 0.75, 0.5 1, 0.1 0.75, 0.1 0.25" />
    //         </clipPath>
    //       </defs>
    //     </svg>
    //   </div>
    //   <div className="hexagon-image">
    //     <Image src={props.src} width={300} height={300} objectFit="cover" objectPosition="center" alt=""/>
    //   </div>
    //   <style jsx>{`
    //     .hexagon-container {
    //       position: relative;
    //       width: 300px;
    //       height: 300px;
    //     }
    //     .hexagon-mask {
    //       position: absolute;
    //       top: 0;
    //       left: 0;
    //       width: 100%;
    //       height: 100%;
    //       clip-path: url(#hexagon-mask);
    //     }
    //     .hexagon-image {
    //       position: absolute;
    //       top: 0;
    //       left: 0;
    //       width: 100%;
    //       height: 100%;
    //     }
    //   `}</style>
    // </div>
  );
};

export default HexagonTile;
