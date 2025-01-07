import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, FormControlLabel, Switch, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EditProfileForm } from "../../components";
import { selectUser } from "../../store/slice/user";
import CompanyWrapper from "../companies/summary/CompanyWrapper";
import { Style } from "./style";
import useWindowDimensions from "../../hooks/windowDimensions";

const Settings = () => {
  const { first_name, last_name, role, isSuperAdmin } = useSelector(selectUser);
  const name = first_name + " " + last_name;
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const [selectedTab, setSelectedTab] = useState(
    width < 950 ? "Edit" : "Edit Profile"
  );

  useEffect(() => {
    setSelectedTab(width < 950 ? "Edit" : "Edit Profile");
  }, [width]);

  const headingData = [
    {
      name: `Settings >`,
    },
    {
      name: selectedTab,
    },
  ];

  const tabs = [
    width < 950 ? "Edit" : "Edit Profile",
    "Subscription",
    "Appearance",
  ];

  return (
    <CompanyWrapper
      headingData={headingData}
      handleBack={() => navigate("/dashboard")}
    >
      <Box sx={Style.container}>
        <Box sx={Style.firstSection}>
          <Box sx={Style.child1}>
            <AccountCircleIcon sx={Style.headerIcon} />
            {/* <Typography sx={Style.updateText}>Update Picture</Typography> */}
            <Typography sx={Style.name}></Typography>
            <Typography sx={[Style.role, Style.ellipse]} variant="h6">
              {role}
            </Typography>
          </Box>
          <Box sx={Style.child2}>
            <Typography sx={Style.notificationText}>Notifications</Typography>
            <Box component={"span"} sx={Style.divider} />
            <Box sx={Style.notificationSection}>
              <Typography sx={Style.notificationSectionText}>
                Email Notifications
              </Typography>
              <FormControlLabel
                sx={Style.labelToggle}
                control={
                  <Switch name="toggleSwitch" sx={Style.toggleStyle(true)} />
                }
              />
            </Box>
            {!isSuperAdmin && (
              <Box sx={Style.notificationSection}>
                <Typography sx={Style.notificationSectionText}>
                  Quiz Reminder
                </Typography>
                <FormControlLabel
                  sx={Style.labelToggle}
                  control={
                    <Switch name="toggleSwitch" sx={Style.toggleStyle(false)} />
                  }
                />
              </Box>
            )}
          </Box>
        </Box>
        <Box sx={Style.secondSection(width)}>
          <Box sx={Style.child3}>
            <Typography sx={Style.profileInformationText}>
              Profile Information
            </Typography>
            <Box sx={Style.tabsContainer}>
              {tabs.map((val, index) => {
                return (
                  <Box key={index} sx={Style.tabs}>
                    <Typography
                      onClick={() => setSelectedTab(val)}
                      sx={Style.tabsText(val == selectedTab)}
                    >
                      {val}
                    </Typography>
                    <Box sx={Style.tabsBorder(val == selectedTab)} />
                  </Box>
                );
              })}
            </Box>
            {selectedTab == (width < 950 ? "Edit" : "Edit Profile") && (
              <EditProfileForm />
            )}
          </Box>
        </Box>
      </Box>
    </CompanyWrapper>
  );
};

export default Settings;
