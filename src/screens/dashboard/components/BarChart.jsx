import { Box } from "@mui/material";
import ApexCharts from "apexcharts";
import React, { useEffect } from "react";
import { COLORS } from "../../../theme";

const CompanyStatisticsChart = () => {
  useEffect(() => {
    const options = {
      series: [
        {
          data: [85, 60, 70, 25, 10, 25], // Adjusted data
        },
      ],
      chart: {
        type: "bar",
        height: "91.5%",
        toolbar: {
          show: false, // Hides toolbar for a cleaner look
        },
      },
      plotOptions: {
        bar: {
          horizontal: true, // Horizontal bars
          barHeight: "17px", // Thinner bars for spacing
        },
      },
      colors: [COLORS.purple], // Customize color for bars
      dataLabels: {
        enabled: false, // No data labels on bars
      },
      tooltip: {
        custom: function ({ dataPointIndex }) {
          const stats = [
            { users: "85%", completion: "30%", results: "92%" },
            { users: "60%", completion: "50%", results: "75%" },
            { users: "70%", completion: "40%", results: "80%" },
            { users: "50%", completion: "60%", results: "88%" },
            { users: "30%", completion: "70%", results: "60%" },
            { users: "40%", completion: "45%", results: "82%" },
          ][dataPointIndex]; // Example tooltip data for each bar
          return `
             <div 
         style="background: #fff;
         padding: 10px;
         border-radius: 8px;
         box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
         font-family: Rubik;
         width:216px;
         line-height:18px
         ">
         <div style="
            font-family: Rubik;
            font-size: 12px;
            font-weight: 500;
            margin:0
            ">Performance in July</div>
         <div style="
            display:flex;
            flex-direction:row;
            justify-content:space-between;
            align-items:center;
            " >
            <div>
               <div  style="
                  font-size: 12px;
                  font-weight: 400;
                  margin-top: 10px;
                  "   >Daily active users</div>
               <div   style="
                  font-size: 12px;
                  font-weight: 400;
                  margin-top: 8px;
                  ">Avg. Completion rate</div>
               <div   style="
                  font-size: 12px;
                  font-weight: 400;
                  margin-top: 8px;
                  margin-bottom: 8px;
                  ">Positive Results</div>
            </div>
            <div>
               <div style="
                  font-size: 12px;
                  font-weight: 500;
                  margin-top: 10px;
                  color:#3447D4
                  ">${stats.users}</div>
               <div  style="
                  font-size: 12px;
                  font-weight: 500;
                  margin-top: 8px;
                  color:#3447D4
                  ">${stats.completion}</div>
               <div style="
                  font-size: 12px;
                  font-weight: 500;
                  margin-top: 8px;
                  margin-bottom: 8px;
                  color:#3447D4
                  ">${stats.results}</div>
            </div>
         </div>
      </div>
          `;
        },
      },
      xaxis: {
        categories: [
          "Tech Labs",
          "Afiniti Tech",
          "Tech Labs",
          "Afiniti Tech",
          "Tech Labs",
          "Afiniti Tech",
        ],
        labels: {
          show: false,
          style: {
            fontSize: "14px",
            fontWeight: 500,
            fontFamily: "Rubik",
            colors: "#4B4B4B", // Custom color for x-axis labels
          },
        },
        axisBorder: { show: false }, // Remove x-axis line
        axisTicks: { show: false }, // Remove x-axis ticks
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "14px",
            fontWeight: 500,
            fontFamily: "Rubik",
            colors: "#4B4B4B", // Custom color for x-axis labels
          },
        },
        axisBorder: { show: false }, // Remove x-axis line
        axisTicks: { show: false }, // Remove x-axis ticks
      },
      grid: {
        show: false, // Hide gridlines for a cleaner look
      },
    };

    const chart = new ApexCharts(
      document.querySelector("#company-statistics-chart"),
      options
    );
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <Box id="company-statistics-chart" sx={{ minHeight: "auto !important", "& .apexcharts-series > path": {
      fill: '#DFE2FF !important',
      filter: "none",
      "&:hover": {
        fill: "#4156F9 !important",
        opacity: '0.8'
      }
    }}} />
  );
};

export default CompanyStatisticsChart;
