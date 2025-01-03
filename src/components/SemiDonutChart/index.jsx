import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { Box, Typography } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { Style } from "./style";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../../hooks/windowDimensions";

Chart.register(ArcElement);

const data = {
  datasets: [
    {
      data: [11, 7, 3],
      backgroundColor: ["#3447D4", "#F0C24C", "#E6E7F6"],
      display: true,
    },
  ],
};


const SemiDonutChart = () => {
  const { width } = useWindowDimensions();
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
          My Trainings
        </Typography>
        <ChevronRight cursor={"pointer"} width={24} onClick={() => navigate("/my-learning")} />
      </Box>
      <Box sx={Style.mainContainer}>
        <div style={{ width: 'calc(100% - 100px)', position: "relative", maxWidth: width < 1536 ? "154px" : "230px", minWidth: '100px', height: 'fit-content' }}>
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
              cutout: width < 1536 ? "75%" : '80%',
              maintainAspectRatio: true,
              responsive: true,
            }}
          />
          <div
            style={Style.donutHeadingContainer}
          >
            <Box sx={{ mt: 8.5 }}>
              <Typography
                sx={Style.donutPercentage}
              >
                60%
              </Typography>
              <Typography
                sx={Style.donutCompleted}
              >
                Completed
              </Typography>
            </Box>
          </div>
        </div>
        <Box>
          <Box>
            <Box sx={Style.labelContainer}>
              <Box sx={{...Style.color, background: '#E6E7F6'}} />
              <Typography sx={Style.label}>Assigned</Typography>
            </Box>
            <Typography sx={Style.labelNo}>15</Typography>
          </Box>
          <Box>
            <Box sx={Style.labelContainer}>
              <Box sx={{...Style.color, background: '#3447D4'}} />
              <Typography sx={Style.label}>Completed</Typography>
            </Box>
            <Typography sx={Style.labelNo}>10</Typography>
          </Box>
          <Box>
            <Box sx={Style.labelContainer}>
              <Box sx={{...Style.color, background: '#F0C24C'}} />
              <Typography sx={Style.label}>In Progress</Typography>
            </Box>
            <Typography sx={Style.labelNo}>05</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SemiDonutChart;
