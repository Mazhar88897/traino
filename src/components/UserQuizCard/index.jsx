import { Box, Typography } from "@mui/material";
import React from "react";
import { Style } from "./style";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CustomButton from "../CustomButton";
import { selectUser } from "../../store/slice/user";
import { useSelector } from "react-redux";
import { IMAGES } from "../../theme";

const UserQuizCard = ({
  width,
  drawer,
  heading,
  subHeading,
  onClick = () => { },
  iconClick = () => { },
  onDeleteClick = () => { },
  onResultClick = () => { },
  sx = {},
  subHeadingStyle = {},
  topRightIcon,
  headingStyle = {},
  contentContainer = {},
  score,
  item
}) => {
  const { isUser, isAdmin } = useSelector(selectUser);
  return (
    <Box component={"div"} sx={{ ...Style.card(isUser && !item?.result_status, width, drawer), ...sx }}>
      {topRightIcon && score !== 0 && (
        <Box onClick={iconClick} sx={Style.topRightIcon}>
          {topRightIcon}
        </Box>
      )}
      <Box
        onClick={onClick}
        mt={topRightIcon && -3}
        sx={{ ...Style.contentContainer, ...contentContainer }}
      >
        <Typography sx={{ ...Style.headings }}>
          {heading}
        </Typography>
        {subHeading && (
          <Typography sx={{ ...Style.subHeading }}>
            {subHeading}
          </Typography>
        )}
        {isUser ? <ArrowForwardIcon sx={Style.nextIcon} /> :
          isAdmin && !item?.upload_status && <CustomButton onClick={() => iconClick()} buttonText={"Upload Now"} sx={{ ...Style.nextIcon, ...Style.uploadButton }} typSx={{ color: 'inherit !important', left: 0, "&:hover": { color: 'inherit !important' }}} />
        }
        {score === 0 && typeof score === "number" &&
          <Typography sx={{ ...Style.headings, ...headingStyle, fontSize: '18px' }}>
            Retry
          </Typography>
        }
      </Box>
      {(!isUser || item?.result_status) && <Box className="hover-buttons" sx={Style.btnConatiner}>
        {!isUser && <CustomButton
          sx={Style.btn(!isAdmin)}
          typSx={Style.btnText(!isAdmin)}
          icon={isAdmin ? <Box component="img" src={IMAGES.roundEdit} sx={{ width: '34px' }} /> : false}
          buttonText={!isAdmin ? `VIEW QUIZ` : `Edit`}
          onClick={iconClick}
        />}
        {isAdmin && (
          <CustomButton
            sx={Style.btn(!isAdmin)}
            typSx={Style.btnText(!isAdmin)}
            buttonText={`Delete`}
            icon={isAdmin ? <Box component="img" src={IMAGES.roundDelete} sx={{ width: '34px' }} /> : false}
            onClick={onDeleteClick}
          />
        )}
        {(item?.upload_status || isUser) && (
          <CustomButton
            sx={Style.btn(!isAdmin)}
            typSx={Style.btnText(!isAdmin)}
            onClick={onResultClick}
            icon={isAdmin ? <Box component="img" src={IMAGES.roundResult} sx={{ width: '34px' }} /> : false}
            buttonText={isAdmin ? "Results" : isUser ? "View Results" : `SHOW RESULTS`}
          />
        )}
      </Box>}
    </Box>
  );
};

export default UserQuizCard;
