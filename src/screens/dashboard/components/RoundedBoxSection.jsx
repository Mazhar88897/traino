import React from "react";
import { Box, Typography } from "@mui/material";
import { FaChevronRight } from "react-icons/fa";
import { Style } from "./style";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slice/user";

const RoundedBoxSection = () => {
  const { isAdmin, isSuperAdmin } = useSelector(selectUser);
  let data = [
    { title: "EliteLabs", description: "63% Complete" },
    { title: "Systems Limited", description: "42% Complete" },
    { title: "Afiniti", description: "25% Complete" },
  ];
  return (
    <Box sx={{ my: 2 }}>
      <Box sx={Style.roundSectionContainer}>
        <Typography variant="h5" fontWeight={"bold"} ml={2} pr={1}>
          {isSuperAdmin ? "Companies" : "Courses"}
        </Typography>
        <FaChevronRight />
      </Box>
      <Box sx={Style.roundSectionSubContainer}>
        {data.map(({ title, description }, index) => (
          <Box key={index} sx={Style.gradiantContainer}>
            <Typography variant="h4" fontWeight={"bold"} sx={Style.tittle}>
              {title}
            </Typography>
            <Typography variant="h5" fontWeight={"bold"} sx={Style.description}>
              {description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RoundedBoxSection;
