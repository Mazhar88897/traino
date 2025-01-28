import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

// Function to calculate gradient color based on the dot index
const getGradientColor = (index, totalDots) => {
  const startColor = [55, 73, 212]; // Dark blue color (RGB)
  const endColor = [255, 255, 255]; // Light blue color (RGB)

  const factor = index / (totalDots - 1); // Fraction to calculate intermediate color

  const r = Math.round(startColor[0] + factor * (endColor[0] - startColor[0]));
  const g = Math.round(startColor[1] + factor * (endColor[1] - startColor[1]));
  const b = Math.round(startColor[2] + factor * (endColor[2] - startColor[2]));

  return `rgb(${r}, ${g}, ${b})`;
};

// Styled dot component
const Dot = styled(Box)(({ active, color, radiusStyle, width, height }) => ({
  width: width || 14,
  height: height || 8,
  // margin: height ? "0 0.4px" : "0 1px",
  borderRadius: radiusStyle,
  backgroundColor: active ? color : "rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s ease",
}));

const DottedProgressBar = ({ progress, dots, sx, width = 14, height }) => {
  const totalDots = dots ? dots : 10; // Total number of dots in the progress bar
  const activeDots = Math.round((progress / 100) * totalDots); // Number of active dots based on progress

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent={"space-around"}
      gap={0}
      // minWidth={`${totalDots*width+0.4*width}px`}
      minWidth={`${totalDots * width + (width / 5.5) * totalDots}px`}
      width={`${totalDots * width + (width / 5.5) * totalDots}px`}
    >
      {[...Array(totalDots)].map((_, index) => {
        // Determine the border radius style for each dot
        let radiusStyle = "10%";
        if (index === 0) {
          radiusStyle = "35% 0 0 35%"; // Rounded left
        } else if (index === totalDots - 1) {
          radiusStyle = "0 35% 35% 0"; // Rounded right
        }

        return (
          <Dot
            width={width}
            height={height}
            sx={sx}
            key={index}
            active={index < activeDots}
            color={getGradientColor(index, totalDots)} // Apply gradient color
            radiusStyle={radiusStyle} // Apply border radius style
          />
        );
      })}
    </Box>
  );
};

export default function ProgressBar({ dots, sx, width, height, progress }) {
  return (
    <Box sx={{ width: "100%" }}>
      <DottedProgressBar
        width={width}
        height={height}
        sx={sx}
        dots={dots}
        progress={progress || 60}
      />{" "}
      {/* Adjust the progress value as needed */}
    </Box>
  );
}
