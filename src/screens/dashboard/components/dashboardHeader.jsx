import { Box, Typography } from "@mui/material";
import React from "react";
import { TopBanner } from "../../../components";
import { Style } from "./style";

const DashboardHeader = () => {
  const today = new Date();
  const dayOptions = { weekday: "long" };
  const dayOfWeek = today.toLocaleDateString("en-GB", dayOptions);
  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = today.toLocaleDateString("en-GB", options);

  return (
    <TopBanner
      isDashboard={true}
      heading={
        <Box
          sx={{
            px: { xs: 0, md: 0, xl: 0.75 },
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            // component={"span"}
            sx={{
              display: "flex",
              gap: "6px",
              my: "auto",
            }}
          >
            <Typography component={"span"} sx={Style.dashboardHeading}>
              Dashboard
            </Typography>
          </Typography>
          <Typography
            // component={"span"}
            sx={{
              display: "flex",
              flexWrap: "wrap",
              maxWidth: "100%",
              mt: { xs: 0.25, xl: 0.5 },
              gap: "6px",
            }}
          >
            <Typography component={"span"} sx={Style.day}>
              {dayOfWeek},
            </Typography>
            <Typography component={"span"} sx={Style.date}>
              {formattedDate}
            </Typography>
          </Typography>
        </Box>
      }
    />
  );
};

export default DashboardHeader;
