import { Box } from "@mui/material";
import React from "react";
import { ForgetPasswordForm } from "../../components";
import LeftImageSection from "../../components/LeftImageSection";
import { globalStyle } from "../../styles/globalStyle";

const ForgetPassword = () => {
  return (
    <Box sx={globalStyle.main}>
        <Box sx={{...globalStyle.container, p: 0, border: {md: 0}, maxHeight: '765px', alignItems: 'center', justifyContent: 'center', background: 'none', maxWidth: '1260px' }}>
        <Box sx={globalStyle.container}>
          <LeftImageSection />
          <Box sx={globalStyle.formContainer}>
            <ForgetPasswordForm />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgetPassword;
