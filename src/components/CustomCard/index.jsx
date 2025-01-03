import { Box, Typography } from "@mui/material";
import React from "react";
import { Style } from "./style";

const CustomCard = ({
  heading,
  subHeading,
  onClick = () => {},
  iconClick = () => {},
  sx = {},
  subHeadingStyle = {},
  topRightIcon,
  headingStyle = {},
  contentContainer = {},
}) => {
  return (
    <Box component={"div"} sx={{ ...Style.card, ...sx }}>
      {topRightIcon && (
        <Box onClick={iconClick} sx={Style.topRightIcon}>
          {topRightIcon}
        </Box>
      )}
      <Box
        onClick={onClick}
        mt={topRightIcon && -3}
        sx={{ ...Style.contentContainer, ...contentContainer }}
      >
        <Typography sx={{ ...Style.headings, ...headingStyle }}>
          {heading}
        </Typography>
        {subHeading && (
          <Typography sx={{ ...Style.subHeading, ...subHeadingStyle }}>
            {subHeading}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default CustomCard;
