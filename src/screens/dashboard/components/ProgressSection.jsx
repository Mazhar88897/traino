import React from "react";
import { LinearProgress, Box, Typography } from "@mui/material";
import { Style } from "./style";

function LinearProgressWithLabel(props) {
  const { title, progress } = props || {};
  return (
    <Box sx={Style.LinearProgressWithLabel}>
      {title && (
        <Typography mr={2} minWidth={"40%"}>
          {title}
        </Typography>
      )}
      <Box sx={{ width: "60%", mr: 1 }}>
        <LinearProgress variant="determinate" sx={{ height: 15 }} {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          color="text.secondary"
        >{`${progress}`}</Typography>
      </Box>
    </Box>
  );
}

const ProgressSection = () => {
  const data = [
    { title: "Last Score", count: 90 },
    { title: "Best Score", count: 70 },
    { title: "Average Score", count: 50.5 },
  ];
  return (
    <Box sx={Style.progressSection}>
      {data.map(({ title, count }, index) => (
        <LinearProgressWithLabel
          key={index}
          title={title}
          progress={count}
          value={count}
        />
      ))}
    </Box>
  );
};

export default ProgressSection;
