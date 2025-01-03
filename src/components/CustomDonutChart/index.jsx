import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import { Style } from './style';
import { Box, Typography } from '@mui/material';

const CustomDonutChart = () => {
    useEffect(() => {
        const options = {
            series: [67, 15, 94],  // Data for Completed Trainings, Quizzes Attempt, and Score
            chart: {
                type: 'donut',
                height: 350
            },
            labels: ['Completed Trainings', 'Quizzes Attempt', 'Score'],
            colors: ['#3447D4', '#FFC62B', '#6BC497'],  // Custom colors
            legend: {
                show: false  // Hiding the default legend
            },
            dataLabels: {
                enabled: false  // Disable data labels inside the donut
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: false,
                            total: {
                                show: false,
                                label: 'Total',
                                formatter: function (w) {
                                    return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                }
                            }
                        }
                    },
                }
            },
            stroke: {
                lineCap: 'round'
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val;
                    }
                }
            },
        };

        const chart = new ApexCharts(document.querySelector("#custom-donut-chart"), options);
        chart.render();

        // Cleanup on component unmount
        return () => {
            chart.destroy();
        };
    }, []);

    return (
        <Box sx={Style.main}>
            <Box sx={Style.childContainer}>
                <Box sx={Style.chart} id="custom-donut-chart"></Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: {xs: '100%', sm: 'calc(100% - 150px)'}, maxWidth: '170px', mt: {xs: 1, sm: 0} }}>
                    <Box sx={Style.labelContainer}>
                        <Box sx={Style.row}>
                            <Typography component={"span"} sx={Style.blueColor}></Typography>
                            <Typography component={"span"} sx={Style.label}>Completed Trainings</Typography>
                        </Box>
                        <Typography component={"span"} sx={Style.quantity}>67</Typography>
                    </Box>
                    <Box sx={Style.labelContainer}>
                        <Box sx={Style.row}>
                            <Typography component={"span"} sx={Style.yellowColor}></Typography>
                            <Typography component={"span"} sx={Style.label}>Quizzes Attempt</Typography>
                        </Box>
                        <Typography component={"span"} sx={Style.quantity}>15</Typography>
                    </Box>
                    <Box sx={Style.labelContainer}>
                        <Box sx={Style.row}>
                            <Typography component={"span"} sx={Style.greenColor}></Typography>
                            <Typography component={"span"} sx={Style.label}>Score</Typography>
                        </Box>
                        <Box>
                            <Typography component={"span"} sx={Style.quantity}>94</Typography>
                            <Typography component={"span"}
                                sx={Style.triangle}
                            >
                                &#9650;
                            </Typography>
                            <Typography component={"span"} sx={Style.percent}>12%</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default CustomDonutChart;
