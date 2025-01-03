import { Typography } from "@mui/material";
import React from "react";
import { Style } from "./style";

const ValidationError = ({ error }) => {
  return <Typography sx={Style.main}>{error}</Typography>;
};

export default ValidationError;
