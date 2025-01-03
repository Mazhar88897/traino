import React from "react";
import { Box, Typography } from "@mui/material";
import { Style } from "./style";

const RecentActivities = () => {
  const activities = [
    { title: "Supply Chain", time: "3hrs ago" },
    { title: "Network Security", time: "7hrs ago" },
    { title: "Communication", time: "10hrs ago" },
  ];
  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h6" fontWeight={"bold"}>
        Recent Activities
      </Typography>
      {activities.map((activity, index) => (
        <Box key={index} sx={Style.activityContainer}>
          <Typography variant="paragraph">{activity.title}</Typography>{" "}
          <Typography variant="paragraph" fontWeight={"bold"}>
            {activity.time}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default RecentActivities;
