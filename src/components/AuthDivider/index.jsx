import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Style } from "./style";

const AuthDivider = ({ text }) => {
  return (
    <Grid container sx={Style.main}>
      <Grid item xs={4}>
        <Box component="hr" borderTop="#CECECE" />
      </Grid>
      <Typography sx={Style.text} />
      {text}
      <Typography />
      <Grid item xs={4}>
        <Box component="hr" borderTop="#CECECE" />
      </Grid>
    </Grid>
  );
};
export default AuthDivider;
