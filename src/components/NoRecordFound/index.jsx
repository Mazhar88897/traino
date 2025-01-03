import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { Style } from "./style";

const NoRecordFound = ({ heading, text, img, headingSx, textSx, imgSx, mainSx }) => {
  return (
    heading ?
      <Box sx={mainSx}>
        <Box component={"img"} src={img} sx={imgSx}/>
        <Typography sx={headingSx}>{heading}</Typography>
        <Typography sx={textSx}>{text}</Typography>
      </Box>
      :
      <Box sx={Style.main}>
        <Typography sx={Style.pera}>No Record Found!</Typography>
      </Box>
  );
};

export default NoRecordFound;
