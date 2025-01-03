import React from "react";
import { Box, Typography } from "@mui/material";
import { CustomButton } from "../../../components";
import { RiLightbulbFlashFill } from "react-icons/ri";
import { COLORS } from "../../../theme";
import { Style } from "./style";

const CourseHeading = () => {
  return (
    <Box sx={Style.courseContainer}>
      <Box>
        <RiLightbulbFlashFill size={60} color={COLORS.golden} />
      </Box>
      <Box ml={1}>
        <Typography variant="h5" component="h5" fontSize={Style.courseHeading}>
          Take Advance courses to refine your skills
        </Typography>
        <Typography variant="h6" component="h6" sx={Style.courseDescription}>
          These courses will help you to increase your skill sets
        </Typography>
        <CustomButton
          buttonText="Browse"
          sx={Style.browseBtn}
          hoverSx={Style.browseBtnHover}
          typSx={{ fontWeight: "bold" }}
        />
      </Box>
    </Box>
  );
};

export default CourseHeading;
