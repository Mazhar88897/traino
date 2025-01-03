import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slice/user";
import CustomButton from "../CustomButton";
import { Style } from "./style";

const AdminQuizCard = ({
  heading,
  subHeading,
  onClick = () => {},
  onDeleteClick = () => {},
  onResultClick = () => {},
  sx = {},
  subHeadingStyle = {},
  uploadStatus,
}) => {
  const { isAdmin } = useSelector(selectUser);

  return (
    <Box
      component={"div"}
      sx={{
        ...Style.card,
        ...sx,
      }}
    >
      <Box className="content" sx={Style.contentContainer}>
        <Typography sx={Style.headings}>{heading}</Typography>
        {subHeading && (
          <Typography sx={{ ...Style.subHeading, ...subHeadingStyle }}>
            {subHeading}
          </Typography>
        )}
      </Box>
      <Box className="hover-buttons" sx={Style.btnConatiner}>
        <CustomButton
          sx={Style.btn}
          typSx={Style.btnText}
          buttonText={!isAdmin ? `View` : uploadStatus ? `Edit` : "Upload"}
          onClick={onClick}
        />
        {isAdmin && (
          <CustomButton
            sx={Style.btn}
            typSx={Style.btnText}
            buttonText={`Delete`}
            onClick={onDeleteClick}
          />
        )}
        {uploadStatus && (
          <CustomButton
            sx={Style.btn}
            typSx={Style.btnText}
            onClick={onResultClick}
            buttonText={`Results`}
          />
        )}
      </Box>
    </Box>
  );
};

export default AdminQuizCard;
