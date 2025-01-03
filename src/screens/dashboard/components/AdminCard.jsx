import { Box, Card, Typography } from "@mui/material";
import React from "react";
import { IMAGES } from "../../../theme";
import { Style } from "./style";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slice/user";

const AdminaCard = ({ data }) => {
  const { isSuperAdmin } = useSelector(selectUser);
  const {
    tittle,
    total,
    percent,
    updatedDate,
    src,
    progressIcon = IMAGES.upGreen,
    progressStyle = Style.upArrow,
  } = data;
  return (
    <Card sx={Style.adminCardContainer(updatedDate)}>
      <Box sx={{ p: "18px 12px 0" }}>
        <Box sx={Style.adminCardTittleContainer}>
          <Box component={"img"} src={src} sx={Style.adminCardIcon} />
          <Typography sx={Style.adminCardTittle}>{tittle}</Typography>
        </Box>
        <Box sx={Style.adminCardContent}>
          <Box sx={Style.adminCardContentfirstCell} />
          <Box sx={Style.adminCardContentSecondCell}>
            <Typography sx={Style.adminCardTotal}>{total}</Typography>
            {percent && (
              <Box sx={Style.adminCardPercent(isSuperAdmin)}>
                <Box component={"img"} sx={progressStyle} src={progressIcon} />
                <Typography sx={Style.percent(isSuperAdmin)}>
                  {percent}%
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      {updatedDate && (
        <Box sx={Style.updatedDateContainer}>
          <Typography sx={Style.updatedDate}>{updatedDate}</Typography>
        </Box>
      )}
    </Card>
  );
};

export default AdminaCard;
