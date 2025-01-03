import { Box } from "@mui/material";
import ApexCharts from "apexcharts";
import React, { useEffect } from "react";

const CircleChart = () => {
  useEffect(() => {
    const options = {
      series: [75, 50, 15],
      chart: {
        type: "radialBar",
      },
      colors: ["#5D6CDD", "#6BC497", "#FF912B"],
      plotOptions: {
        radialBar: {
          track: {
            strokeWidth: '100%', // Outer bar width
          },
          hollow: {
            size: '25%', // Center hollow size, reduce to increase bar thickness
          },
          track: {
            background: '#e0e0e0',
            strokeWidth: '100%', // This controls the outer track thickness
          },
          dataLabels: {
            show: false,
          },
        },
      },
      stroke: {
        lineCap: "round",
      },
    };

    const chart = new ApexCharts(
      document.querySelector("#custom-donut-chart"),
      options
    );
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return <Box sx={{ width: { md: '60%' }, minWidth: '170px', maxWidth: {xs: '200px', lg: '225px', xl: '320px'}, ml: '-25px' }} id="custom-donut-chart" />;
};

export default CircleChart;
