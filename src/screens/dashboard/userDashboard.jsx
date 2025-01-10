import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useSelector } from "react-redux";
import SemiDonutChart from "../../components/SemiDonutChart";
import ProgressBar from "../../components/progressBar";
import Layout from "../../layout/MainLayout";
import { selectUser } from "../../store/slice/user";
import { IMAGES } from "../../theme";
import Calendar from "./components/Calendar";
import PerformanceChart from "./components/PerformanceChart";
import LeaderBoardTable from "./components/leaderBoardTable";
import { Style } from "./style";
import DashboardHeader from "./components/dashboardHeader";
import useWindowDimensions from "../../hooks/windowDimensions";

const UserDashboard = () => {
  const { first_name, last_name } = useSelector(selectUser);

  const name = first_name + " " + last_name;

  const notificationData = [
    {
      title: `New Training Assigned`,
      date: `04 April, 2021 | 04:00 PM`,
      src: IMAGES.notification1,
    },
    {
      title: `New Training Assigned`,
      date: `04 April, 2021 | 04:00 PM`,
      src: IMAGES.notification2,
    },
    {
      title: `New Training Assigned`,
      date: `04 April, 2021 | 04:00 PM`,
      src: IMAGES.notification3,
    },
  ];

  const { width } = useWindowDimensions();

  return (
    <Layout>
      <DashboardHeader />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          // justifyContent: "center",
          alignItems: { xs: "center", lg: "start" },
          width: "100%",
          maxWidth: "1500px",
          margin: "0 auto",
        }}
      >
        <Box sx={Style.leftContainer(false)}>
          <Box sx={Style.pieChartBrowseMain}>
            <Box sx={Style.browseMain}>
              <Box sx={Style.blueBgBottom}>
                <Typography sx={Style.browseHeading}>Hello, {name}</Typography>
                <Typography sx={Style.browseText}>
                  Take Advance Trainings to refine your Skills
                </Typography>
                <Button sx={Style.browseButton}>Browse More</Button>
              </Box>
              <Box
                component="img"
                sx={Style.illustration}
                src={IMAGES.Illustration}
              />
            </Box>
            <Box sx={Style.accuracyMain}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: {
                    xs: "row",
                    xl: "column",
                    lg: "column",
                    sm: "column",
                  },
                  alignItems: "center",
                  pl: { xs: "8px" },
                }}
              >
                <Box
                  sx={{
                    width: {
                      xs: "50%",
                      xl: "100%",
                      lg: "100%",
                      sm: "100%",
                    },
                  }}
                >
                  <Typography sx={Style.score}>My Score</Typography>
                  <Box sx={Style.attemptContainer}>
                    <Typography sx={Style.quizAttempt}>
                      Quizzes Attempt
                    </Typography>
                    <Typography sx={Style.attemptQuantity}>04</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: {
                      xs: "50%",
                      xl: "100%",
                      lg: "100%",
                      sm: "100%",
                    },
                    maxWidth: { xs: "125px", xl: "170px" },
                    maxHeight: "120px",
                    mt: { xs: 1, xl: 1.75 },

                    pl: { xs: "8px" },
                  }}
                >
                  <CircularProgressbar
                    value={60}
                    text={
                      <Typography
                        component={"tspan"}
                        sx={Style.chartTextContainer}
                      >
                        <Typography
                          component={"tspan"}
                          sx={Style.chartNo}
                          x="50%"
                          dy="-8"
                        >
                          526
                        </Typography>
                        <Typography
                          component={"tspan"}
                          sx={Style.chartHeading}
                          x="50%"
                          dy="20"
                        >
                          Total Points
                        </Typography>
                      </Typography>
                    }
                    styles={buildStyles(Style.circularProgressbar)}
                    strokeWidth={8}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 1.5, xl: 2 },
              mt: 2,
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PerformanceChart />
            <SemiDonutChart />
          </Box>
          <Box
            className="hemloooooooo"
            sx={{
              display: "flex",
              // width: "100%",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <LeaderBoardTable isDashboard={true} />
          </Box>
        </Box>

        <Box sx={Style.rightContainer(false)}>
          <Calendar />
          <Box sx={Style.todayStatistics}>
            <Typography sx={Style.todayHeading}>Today's Training</Typography>
            <Box
              component={"img"}
              src={width < 1536 ? IMAGES.communication : IMAGES.xlCommunication}
              sx={{ width: "100%", objectFit: "contain" }}
            />
            <Typography sx={Style.improveHeading}>
              Improving Communication Skills
            </Typography>
            <Box sx={Style.avatarContainer}>
              <Box sx={Style.dueDateContainer}>
                <Typography sx={Style.dueDateHeading}>Due Date</Typography>
                <Typography sx={Style.dueDate}>: August, 30</Typography>
              </Box>
              <Box
                component={"img"}
                src={IMAGES.avatars}
                sx={Style.avatarPic}
              />
            </Box>
            <Box sx={Style.continueContainer}>
              <Box>
                <Typography sx={Style.completed}>
                  4/8 Quizzes Completed
                </Typography>
                <ProgressBar
                  progress={70}
                  dots={
                    width > 1535
                      ? 13
                      : width > 1320
                      ? 12
                      : width > 900
                      ? 11
                      : width > 600
                      ? 11
                      : 10
                  }
                />
              </Box>
              <Button variant="primary" sx={Style.continueButton}>
                Continue
              </Button>
            </Box>
          </Box>
          <Box sx={Style.notificationContainer}>
            <Box sx={Style.notificationHeadingContainer}>
              <Typography sx={Style.notificationHeading}>
                My Activity
              </Typography>
              <Typography sx={Style.viewAll}>View All</Typography>
            </Box>
            {notificationData?.map((item, index) => (
              <Box
                sx={Style.notificationPerPerson(
                  index === notificationData?.length - 1
                )}
              >
                <Box
                  sx={Style.notificationAvatar}
                  component={"img"}
                  src={item?.src}
                />
                <Box>
                  <Typography sx={Style.notificationTitle}>
                    {item?.title}
                  </Typography>
                  <Typography sx={Style.notificationDate}>
                    {item?.date}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default UserDashboard;
