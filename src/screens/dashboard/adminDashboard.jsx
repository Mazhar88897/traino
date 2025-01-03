import {
  Box,
  Button,
  Checkbox,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Layout from "../../layout/MainLayout";
import { IMAGES } from "../../theme";
import { style } from "./adminStyle";
import AdminaCard from "./components/AdminCard";
import CircleChart from "./components/CircleChart";
import TeamProgressTable from "./components/TeamProgressTable";
import TrainignMetrics from "./components/TrainingMetricsTable";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "./components/dashboardHeader";

const Admindashboard = () => {
  const navigate = useNavigate();
  const [isFirstCheck, setIsFirstCheck] = useState(false)
  const [isSecondCheck, setIsSecondCheck] = useState(false)
  const today = new Date();
  const dayOptions = {weekday: 'long'}
  const dayOfWeek = today.toLocaleDateString('en-GB', dayOptions);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-GB', options);


  const cardData = [
    {
      tittle: "Total Admins",
      total: 10,
      percent: "5",
      updatedDate: "Update: July 14, 2023",
      src: IMAGES.singleUser
    },
    {
      tittle: "Total Users",
      total: 131,
      percent: "5",
      updatedDate: "Update: July 14, 2023",
      src: IMAGES.users
    },
    {
      tittle: "Total Departments",
      total: 9,
      updatedDate: "Update: July 14, 2023",
      src: IMAGES.departmentIcon
    },
    {
      tittle: "Uploaded Trainings",
      total: 60,
      updatedDate: "Update: July 14, 2023",
      src: IMAGES.trainingIcon
    },
  ];

  return (
    <Layout>
      <DashboardHeader />
      <Box sx={style.bgContainer}>
        <Typography sx={style.hederTitle}>Overview</Typography>
      </Box>
      <Box sx={style.maxWidthContainer}>
        {/* admin cards */}
        <Box sx={style.cardContainer}>
          {cardData?.map((item) => (
            <AdminaCard data={item} />
          ))}
        </Box>
        {/* first Section */}
        <Box sx={style.firstConatiner}>
          <Box sx={style.child1(false)}>
            <TrainignMetrics isDashboard={true} />
          </Box>
          <Box sx={style.child2(false)}>
            <Box sx={style.productivityContainer}>
              <Box>
                <Typography sx={style.productivityTitle}>Productivity</Typography>
                <Typography sx={style.staticticsTitle}>Statistics</Typography>
              </Box>
              <Box sx={style.chartSection}>
                <CircleChart />
                <Box sx={{
                  display: 'flex', flexDirection: 'column', gap: '20px 0', minWidth: '120px', width: '47%', ml: { xs: '-20px', md: '-10px' },
                  transform: 'translateX(-20px)', maxWidth: {xs: '160px', xl: '190px'}
                }}>
                  <Typography sx={style.time}>7hr 32m</Typography>
                  <Box sx={style.productivitySections}>
                    <Box sx={style.firstBullet} />
                    <Typography sx={style.bulletPoint}>Product team</Typography>
                  </Box>
                  <Box sx={style.productivitySections}>
                    <Box sx={style.secondBullet} />
                    <Typography sx={style.bulletPoint}>Marketing team</Typography>
                  </Box>
                  <Box sx={style.productivitySections}>
                    <Box sx={style.thirdBullet} />
                    <Typography sx={style.bulletPoint}>Development team</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        {/* second Section */}
        <Box sx={style.secondContainer}>
          <Box sx={style.child3(false)}>
            <TeamProgressTable isDashboard={true} />
          </Box>
          <Box sx={style.child4}>
            <Box sx={style.browseMain}>
              <Box sx={style.blueBgBottom}>
                <Typography sx={style.browseText}>
                  Take Advance Trainings to refine your Skills
                </Typography>
                <Box sx={style.browseContainer}>
                  <Button sx={style.browseButton} onClick={() => navigate("/trainings")}>Create Training</Button>
                  <Box
                    component="img"
                    sx={style.illustration}
                    src={IMAGES.Illustration1}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={style.toDoContainer}>
              <Typography sx={style.toDoTitle}>To-Do List</Typography>
              <Typography sx={style.remainingText}>4 of 2 remaining</Typography>
              <Typography sx={style.checkListText}>
                <Checkbox sx={style.checkBox} checked={isFirstCheck} onChange={() => setIsFirstCheck((prev) => !prev)} />
                <Box component={"span"} sx={style.checkLabel(isFirstCheck)}>
                  Improve training for development team
                </Box>
              </Typography>
              <Typography sx={style.checkListText}>
                <Checkbox sx={style.checkBox} checked={isSecondCheck} onChange={() => setIsSecondCheck((prev) => !prev)} />
                <Box component={"span"} sx={style.checkLabel(isSecondCheck)}>Update team projects and assignees</Box>
              </Typography>
              <Paper 
              // component="form" 
              sx={style.addFiledhWrapper}>
                <InputBase
                  sx={style.addInput}
                  placeholder="Add new todo"
                  inputProps={{ "aria-label": "Search" }}
                />
                <IconButton
                  type="button"
                  sx={style.addIconContainer}
                  aria-label="search"
                >
                  <Box component={"img"} src={IMAGES.plus} sx={style.addImg} />
                </IconButton>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Admindashboard;
