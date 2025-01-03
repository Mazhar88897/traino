import { Box } from "@mui/material";
import React from "react";
import { SignUpForm } from "../../components";
import LeftImageSection from "../../components/LeftImageSection";
import { globalStyle } from "../../styles/globalStyle";

const signUp = () => {
  return (
    <Box sx={globalStyle.main}>
      <LeftImageSection />
      <SignUpForm />
    </Box>
  );
};

export default signUp;
