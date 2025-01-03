import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { allQuizzez } from "../../store/slice/quizzez";
import CustomButton from "../CustomButton";
import { Style } from "./style";
import useWindowDimensions from "../../hooks/windowDimensions";
import { Height } from "@mui/icons-material";

const AddSummaryKeyPoints = ({ handleClick }) => {
  const location = useLocation();
  const { width } = useWindowDimensions();

  return (
    <Box sx={Style.wrapper}>
      <Box sx={Style.contentContainer((width - 1550) / 6)}>
        <Box sx={Style.leftContainerContent}>
          <Typography sx={Style.heading}>Quiz</Typography>
          <Typography sx={Style.content}>
            Highlight the key benefits of your training to engage participants
          </Typography>
          <CustomButton
            sx={{ width: "299px", mt: 3, Height: "44px" }}
            buttonText={`Generate Quiz`}
            onClick={handleClick}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AddSummaryKeyPoints;
