import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { Box, Typography } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Style } from "./Style";

Chart.register(ArcElement);

const data = {
    datasets: [
        {
            data: [60, 40],
            backgroundColor: ["#6A7CFF", "#DFE2FF"],
            borderWidth: 0, // This removes the gap between segments
            display: true,
        },
    ],
};

const AdminActivityChart = () => {
    const navigate = useNavigate()
    return (
        <Box
            sx={Style.main}
        >
            <Box
                sx={Style.headerContainer}
            >
                <Typography
                    sx={Style.header}
                >
                    Admins Activity
                </Typography>
            </Box>
            <Box
                sx={Style.mainContainer}
            >
                <Box sx={Style.donutContainer}>
                    <Doughnut
                        data={data}
                        options={{
                            plugins: {
                                legend: {
                                    display: false,
                                },
                                tooltip: {
                                    enabled: false,
                                },
                            },
                            rotation: -90,
                            circumference: 180,
                            cutout: "85%",
                            maintainAspectRatio: true,
                            responsive: true,
                        }}
                    />
                    <Box
                        sx={Style.donutHeadingContainer(false)}
                    >
                        <Box sx={Style.labelColorContainer}>
                            <Box sx={Style.colorLabel("#3447D4")} />
                            <Box sx={Style.labelHeading}>
                                <Typography sx={Style.donutCompleted}>
                                    Active
                                </Typography>
                                <Typography sx={Style.donutPercentage}>
                                    60%
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box
                        sx={Style.donutHeadingContainer(true)}
                    >
                        <Box sx={Style.labelColorContainer}>
                            <Box sx={Style.colorLabel("#DFE2FF")} />
                            <Box sx={Style.labelHeading}>
                                <Typography sx={Style.donutCompleted}>
                                    Inactive
                                </Typography>
                                <Typography sx={Style.donutPercentage}>
                                    20%
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default AdminActivityChart;
