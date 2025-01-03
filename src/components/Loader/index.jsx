import { Style } from "./style";
import * as React from 'react';
import Box from '@mui/material/Box';
import { IMAGES } from "../../theme";
import { CircularProgress, LinearProgress } from "@mui/material";

const Loader = ({ style, isCircular }) => {
  return (
    <Box sx={{ ...Style.main(!isCircular), ...style }}>
      {isCircular ?
        <CircularProgress />
        :
        <>
          <Box component={"img"} src={IMAGES?.logo} sx={{ width: '115px', height: '94px' }} />
          <LinearProgress sx={{
            width: '90%', maxWidth: '280px', background: "#DBF6F6",
            "& .MuiLinearProgress-bar": { backgroundImage: 'linear-gradient(to right, #DBF6F6, #2F4A70, #3A63A0, #7A7BDE, #BEBAF2)' }
          }} />
        </>
      }
    </Box>
  );
}
export default Loader