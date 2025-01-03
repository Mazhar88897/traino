import { Box } from "@mui/material";
import React from "react";
import { SignInFrom } from "../../components";
import LeftImageSection from "../../components/LeftImageSection";
import { globalStyle } from "../../styles/globalStyle";
import useWindowDimensions from "../../hooks/windowDimensions";

const SignIn = () => {
  const { width, height } = useWindowDimensions();
  return (
    <Box sx={globalStyle.main}>
      <Box sx={{...globalStyle.container, p: 0, border: {md: 0}, maxHeight: {md: '765px'}, alignItems: 'center', justifyContent: 'center', background: 'none', maxWidth: '1260px' }}>
        <Box sx={globalStyle.container}>
          <LeftImageSection />
          <Box sx={globalStyle.formContainer(width, height)}>
            <SignInFrom />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;
