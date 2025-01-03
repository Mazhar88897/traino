import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { YAxis } from "recharts";
import { Box, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import { useEffect } from "react";
import CustomFormControl from "../../../components/CustomFormControl";

const hasWindow = typeof window !== "undefined";
const width = hasWindow ? window.innerWidth : 0;

const chartSetting = {
  series: [
    {
      dataKey: "seoul",
      valueFormatter,
      color: "#4156F9",
      border: "none !important",
    },
  ],
  height: width < 1536 ? 250 : 300,
  sx: {
    marginTop: width < 1536 && "-65px",
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: "translateY(40px)",
    },
    "& .MuiBarChart-root": {
      border: "none", // Remove the border from the chart
    },
    "& .MuiBarChart-axis": {
      "& path": {
        stroke: "none", // Remove the axis lines
      },
    },
    "& .MuiChartsAxis-line, & .MuiChartsAxis-tick": {
      display: "none",
    },
    "& .MuiBarChart-bar": {
      borderRadius: "10px !important",
    },
    "& .MuiBarElement-root": {
      width: "20px !important",
      rx: 2,
    },
    "& g[clip-path]": {
      transform: "translate3d(5%, -5px, 0)",
      display: "flex",
      gap: "40px",
    },
    "& .MuiChartsAxis-bottom": {
      transform: `translate(12px, ${width < 1536 ? 210 : 250}px)`,
    },
    "& .MuiChartsAxisHighlight-root": {
      transform: "translateX(-7px)",
    },
    "& .MuiChartsAxis-tickLabel": {
      color: "#4B4B4B",
      fontFamily: "Rubik",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "130%",
    },
  },
};

export default function PerformanceChart() {
  setTimeout(() => {
    const barchart = document?.getElementById("bar-chart");
    barchart.style.maxWidth = width < 1536 && "500px";
    barchart.style.margin = "0 auto";
    const tspans = barchart?.getElementsByTagName("tspan");
    if (tspans) {
      Object.values(tspans)?.map((item) => modifyTspan(item));

      function modifyTspan(element) {
        if (element) {
          if (element.getAttribute("dominant-baseline") === "central") {
            if (!element.textContent.includes("h")) element.textContent += "h";
          }
        }
      }
    }
  }, 10);

  const [days, setDays] = useState(1);

  const handleChange = (event) => {
    setDays(event.target.value);
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "55%" },
        maxWidth: { xs: "100%", md: "450px", xl: "625px" },
        border: "none",
        height: { xs: "260px", xl: "350px" },
        borderRadius: "7px",
        background: "#FFF",
        boxShadow: "0px 4px 39px 0px rgba(81, 69, 159, 0.08)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: { xs: "10px", xl: "20px" },
          px: "16px",
        }}
      >
        <Typography
          sx={{
            color: "#1F1F1F",
            textAlign: "center",
            fontFamily: "Rubik",
            fontSize: { xs: "18px", xl: "22px" },
            fontWeight: "500",
            lineHeight: "120%",
          }}
        >
          Learning Activity
        </Typography>
        <CustomFormControl
          sx={{
            display: "flex",
            maxWidth: "115px",
          }}
          selectSx={{
            height: "35px",
            color: "#4B4B4B",
            fontFamily: "Rubik",
            fontSize: "12px",
            fontWeight: "500",
            textAlign: "start",
            textTransform: "capitalize",
          }}
          value={days}
          handleChange={handleChange}
          menuSx={{
            color: "#4B4B4B",
            fontFamily: "Rubik",
            fontSize: "12px",
            fontWeight: "400",
            textTransform: "capitalize",
            padding: "4px 8px !important",
          }}
          array={[
            "Last Week",
            "Sep 02 - Sep 09",
            "Sep 09 - Sep 17",
            "Sep 17 - Sep 24",
          ]}
        />
      </Box>
      <BarChart
        sx={{ display: "flex", alignSelf: "center", maxWidth: "400px" }}
        id="bar-chart"
        dataset={dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "month",
          },
        ]}
        yAxis={[<YAxis key="y-axis" tickFormatter={(value) => `${value}h`} />]}
        {...chartSetting}
      />
    </Box>
  );
}

export const dataset = [
  {
    seoul: 2.2,
    month: "Sun",
  },
  {
    seoul: 5,
    month: "Mon",
  },
  {
    seoul: 6.2,
    month: "Tue",
  },
  {
    seoul: 3.8,
    month: "Wed",
  },
  {
    seoul: 5,
    month: "Thu",
  },
  {
    seoul: 4,
    month: "Fri",
  },
  {
    seoul: 6,
    month: "Sat",
  },
];

export function valueFormatter(value) {
  return `${value}h`;
}
