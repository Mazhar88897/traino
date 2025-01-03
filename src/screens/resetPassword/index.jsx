import { Box } from "@mui/material";
import React from "react";
import { ResetPasswordForm } from "../../components";
import LeftImageSection from "../../components/LeftImageSection";
import { globalStyle } from "../../styles/globalStyle";

const ResetPassword = () => {
  return (
    <Box sx={globalStyle.main}>
      <LeftImageSection />
      <ResetPasswordForm />
    </Box>
  );
};

export default ResetPassword;
