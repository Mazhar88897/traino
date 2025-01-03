import { Box } from "@mui/material";
import React from "react";
import { IMAGES } from "../../theme";
import { Style } from "./style";

const SocialAuth = () => {
  return (
    <Box sx={Style.main}>
      {[IMAGES.email, IMAGES.microsoft, IMAGES.google].map((val, index) => {
        return (
          <Box
            sx={Style.images(index)}
            key={index}
            component={"img"}
            src={val}
            alt="social"
          />
        );
      })}
    </Box>
  );
};

export default SocialAuth;
