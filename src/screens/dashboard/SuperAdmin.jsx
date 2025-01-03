import { Box, Typography } from "@mui/material";
import React from "react";
import Layout from "../../layout/MainLayout";
import { COLORS, IMAGES } from "../../theme";
import { style } from "./adminStyle";
import AdminaCard from "./components/AdminCard";
import { Style } from "./style";
import ApexChart from "./components/BarChart";
import TopCompaniesTable from "./components/topCompanies";
import SuperAdminActivityChart from "../../components/SuperAdminActivityChart";
import AdminActivityChart from "../../components/AdminActivity";
import DashboardHeader from "./components/dashboardHeader";

const SuperAdminDashboard = () => {

  const cardData = [
    {
      tittle: "Total Companies",
      total: "10",
      percent: "+2.4",
      progressIcon: IMAGES.superAdminProgress,
      src: IMAGES.companiesMatrics,
      progressStyle: { width: "20px", height: "20px" },
    },
    {
      tittle: "Total Admins",
      total: "24",
      percent: "+2.4",
      progressIcon: IMAGES.superAdminProgress,
      src: IMAGES.singleUser,
      progressStyle: { width: "20px", height: "20px" },
    },
    {
      tittle: "Total User",
      total: "140",
      percent: "+2.4",
      progressIcon: IMAGES.superAdminProgress,
      src: IMAGES.users,
      progressStyle: { width: "20px", height: "20px" },
    },
    {
      tittle: "Total Trainings Uploaded",
      total: "04",
      src: IMAGES.trainingIcon,
      progressStyle: { width: "20px", height: "20px" },
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
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "center",
          }}
        >
          <Box sx={Style.leftContainer(true)}>

            {/* first Section */}
            <Box sx={style.firstConatiner}>
              <Box sx={style.child1(true)}>
                <Box sx={{ ...style.productivityContainer, pl: '28px !important', minHeight: {xs: '320px', xl: '380px'}, pb: {md: 1}, height: {xs: '100%', lg: 'calc(100% - 16px)'} }}>
                  <Typography
                    sx={{
                      fontSize: {xs: "20px", xl: '24px'},
                      fontWeight: "500",
                      color: COLORS.typography,
                      fontFamily: "Rubik",
                      maxWidth:  '750px', m: "0 auto -14px"
                    }}
                  >
                    Company Statistics
                  </Typography>
                  <Box
                    sx={{
                      width: '100%', height: {xs: '350px', lg: '100%'}, boxSizing: 'border-box', 
                      maxWidth: '750px', 
                      m: "0 auto"
                    }}
                  >
                    <ApexChart />
                  </Box>
                </Box>
              </Box>
              <Box sx={style.child2(true)}>
                <Box sx={{...style.productivityContainer, pt: {md: 2.25}, minHeight: {xs: '310px', xl: "380px"}, pb: {md: 2}}}>
                  <Box>
                    <Typography sx={{...style.productivityTitle, pl: 1, maxWidth: '760px', m: 'auto'}}>
                      Most Active Trainings
                    </Typography>
                  </Box>
                  <Box sx={style.chartSection}>
                    <SuperAdminActivityChart />
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* second Section */}
            <Box sx={style.secondContainer}>
              <Box sx={style.child3(true)}>
                <TopCompaniesTable isDashboard={true} />
              </Box>
            </Box>
          </Box>
          <Box sx={Style.rightContainer(true)}>
            <Box sx={{
              borderRadius: '8px',
              background: '#FFF',
              boxShadow: '0px 4px 39px 0px rgba(81, 69, 159, 0.08)',
              width: '100%',
              p: 2.5,
              boxSizing: 'border-box',
              height: {xs: "352px", xl: '400px'}
            }}>
              <Typography sx={{
                color: '#1A1A40',
                fontFamily: 'Rubik',
                fontSize: {xs: '18px', xl: "20px"},
                fontWeight: '500',
                lineHeight: '20px',
                maxWidth:  '760px',
                m: '0 auto'
              }}>Company</Typography>
              <Typography sx={{
                color: '#4B4B4B',
                fontFamily: 'Rubik',
                fontSize: {xs: '16px', xl: "18px"},
                fontWeight: '400',
                lineHeight: '20px',
                letterSpacing: '0.08px',
                opacity: '0.8',
                m: '8px auto 0',
                maxWidth:  '760px',
              }}>Statistics</Typography>
              <Box sx={{maxWidth: '450px', m: '0 auto'}}>
                {[{ name: "Tech Labs", color: "#3447D4" }, { name: "Tech Labs", color: '#697AFC' }, { name: "Systems", color: "#B5BEFF" }, { name: "Systems", color: "#3447D473" }]?.map((item) =>
                  <Box sx={{ display: 'flex', gap: '8px', alignItems: 'start', width: '100%', mt: {xs: 2.75, xl: 3.5} }}>
                    <Box sx={{
                      width: {xs: '8px', xl: "12px"},
                      minWidth: {xs: '8px', xl: "12px"},
                      height: {xs: '8px', xl: "12px"},
                      borderRadius: {xs: '4px', xl: "6px"},
                      background: item?.color,
                      mt: {xs: 1}
                    }} />
                    <Box sx={{ width: '100%' }}>
                      <Typography sx={{
                        color: '#040219',
                        fontFamily: 'Rubik',
                          fontSize: {xs: '14px', xl: "16px"},
                        fontWeight: '500',
                        lineHeight: '20px',
                      }}>{item?.name}</Typography>
                      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                        <Typography sx={{
                          color: '#4B4B4B',
                          fontFamily: 'Rubik',
                          fontSize: {xs: '14px', xl: "16px"},
                          fontWeight: '400',
                          lineHeight: '20px',
                        }}>05 Admins</Typography>
                        <Typography sx={{
                          color: '#4B4B4B',
                          fontFamily: 'Rubik',
                          fontSize: {xs: '14px', xl: "16px"},
                          fontWeight: '400',
                          lineHeight: '20px',
                        }}>125 Users</Typography>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
            <AdminActivityChart />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default SuperAdminDashboard;
