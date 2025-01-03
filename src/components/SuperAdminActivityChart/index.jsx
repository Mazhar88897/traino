import { Box, Typography } from "@mui/material";
import ApexCharts from "apexcharts";
import React, { useEffect } from "react";
import { Style } from "./Style";

const SuperAdminActivityChart = () => {
    const colors = ["#3447D4", "#697AFC", "#E1E5FF", "#F0D370"]
    const trainings = [
        "Cybersecurity Basics",
        "Leadership Skills",
        "Project Management 101",
        "Global Compensation Management"
    ]
    useEffect(() => {
        const options = {
            series: [72, 43, 50, 35],
            chart: {
                type: "pie",
            },
            colors: [...colors],
            stroke: {
                width: 0, // Removes border
            },
            plotOptions: {
                pie: {
                    expandOnClick: false, // Prevents slice expansion on click
                },
            },
            legend: {
                show: false,
            },
            dataLabels: {
                enabled: false, // Disables data labels on the chart
            },
            states: {
                hover: {
                    enabled: true,
                    filter: {
                        type: 'none', // Disables any color change on hover
                    },
                },
                active: {
                    enabled: false, // Disables click effect
                },
            },
            tooltip: {
                enabled: false, // Disables tooltips on hover
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

    return (
        <Box>
            <Box sx={Style.chart} id="custom-donut-chart" />
            {
                trainings?.map((item, index) => 
                    <Box sx={Style.labelContainer}>
                        <Box sx={{...Style.labelColor, background: colors[index]}}/>
                        <Typography sx={Style.labelName}>{item}</Typography>
                    </Box>
                )
            }
        </Box>
    )
};

export default SuperAdminActivityChart;
