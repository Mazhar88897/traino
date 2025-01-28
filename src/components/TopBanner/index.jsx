import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, styled, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectdrawer, updateDrawer } from "../../store/slice/drawer";
import { selectUser } from "../../store/slice/user";
import { globalStyle } from "../../styles/globalStyle";
import { IMAGES } from "../../theme";
import LogoutModal from "../Modals/Logout";
import { Style } from "./style";

const TopBanner = ({
  heading,
  headingNavigation,
  headingData,
  isDashboard,
}) => {
  const { first_name, last_name, role } = useSelector(selectUser);
  const name = first_name + " " + last_name;
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [scrollX, setScrollX] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { drawer } = useSelector(selectdrawer);
  const openDrawer = () => {
    dispatch(updateDrawer({ drawer: true }));
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const editProfile = () => {
    navigate("/settings");
    setIsOpenPopover(false);
  };

  const setting = () => {
    navigate("/settings");
    setIsOpenPopover(false);
  };

  const logOut = () => {
    setOpenLogoutModal(true);
    setIsOpenPopover(false);
  };

  return (
    <Box className="hemloooooo" sx={Style.main(isDashboard)}>
      <Box sx={Style.headingContainer(drawer)}>
        <Box
          component={"div"}
          onClick={openDrawer}
          display={Style.menuIconContainer}
        >
          {/* <Box component={"img"} src={IMAGES.logo} sx={Style.menuIcon} /> */}
          <MenuIcon sx={Style.menuIcon} />
        </Box>
        <Box sx={Style.pageIconContainer}>
          <Typography
            onClick={headingNavigation && headingNavigation}
            onMouseDown={(e) => {
              setScrollX(e?.screenX);
              const scrollableDiv = document.getElementById("scrollable");
              scrollableDiv.style.cursor = "grab !important";
            }}
            onTouchStart={(e) => {
              setScrollX(e?.changedTouches[0]?.screenX);
              const scrollableDiv = document.getElementById("scrollable");
              scrollableDiv.style.cursor = "grab !important";
            }}
            onMouseUp={(e) => {
              const scrollableDiv = document.getElementById("scrollable");
              if (e.screenX >= scrollX + 30) {
                scrollableDiv.scrollLeft -= e.screenX - scrollX;
              } else if (e.screenX <= scrollX - 30) {
                scrollableDiv.scrollLeft -= e.screenX - scrollX;
              }
            }}
            onTouchEnd={(e) => {
              const scrollableDiv = document.getElementById("scrollable");
              if (e?.changedTouches[0]?.screenX >= scrollX + 30)
                scrollableDiv.scrollLeft -=
                  e?.changedTouches[0]?.screenX - scrollX;
              else if (e?.changedTouches[0]?.screenX <= scrollX - 30)
                scrollableDiv.scrollLeft -=
                  e?.changedTouches[0]?.screenX - scrollX;
            }}
            id="scrollable"
            sx={
              heading
                ? globalStyle.headings
                : {
                    ...globalStyle.headingMain,
                    display: { xs: "none", sm: "block" },
                  }
            }
          >
            {heading
              ? heading
              : headingData &&
                headingData?.map((item, index) => (
                  <Typography
                    key={index}
                    component={"span"}
                    sx={{
                      // display: { xs: "none", sm: "block" },
                      my: { xs: "13px", sm: "18px", md: "20px" },
                      fontSize:
                        index !== headingData?.length - 1
                          ? { xs: "13px", sm: "18px", md: "20px" }
                          : { xs: "14px", sm: "20px", md: "22px" },
                      fontFamily: "Rubik",
                      fontWeight:
                        index !== headingData?.length - 1 ? "400" : "500",
                      mr: 1,
                      color:
                        index !== headingData?.length - 1 ? "black" : "#3447D4",
                      cursor:
                        index !== headingData?.length - 1
                          ? "pointer"
                          : "default",
                      minWidth: "140px",
                    }}
                    onClick={item?.handleNavigate}
                  >
                    {item?.name}
                  </Typography>
                ))}
          </Typography>
        </Box>
      </Box>
      <Box sx={Style.optionsContainer}>
        <Paper
          // component="form"
          sx={Style.searchWrapper}
        >
          <IconButton
            type="button"
            sx={{ p: "10px 4px 10px 6px" }}
            aria-label="search"
          >
            <Box
              component={"img"}
              src={IMAGES.search}
              sx={{ width: { xs: "21px", xl: "23px" } }}
            />
          </IconButton>
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              fontFamily: "Rubik",
              fontSize: { xs: "16px", xl: "17px" },
              fontWeight: "400",
              opacity: "1",
              "& input::placeholder": {
                color: "#000",
                opacity: "0.9",
              },
            }}
            placeholder="Search"
            inputProps={{ "aria-label": "Search" }}
          />
        </Paper>
        <DrawerHeader>
          <Box
            sx={{
              display: { sm: "none", md: "none", lg: "none", xl: "none" },
              // mt: "4px",
            }}
          >
            <Box
              component={"img"}
              src={IMAGES.search}
              sx={{ width: { xs: "22px" } }}
            />
          </Box>

          <Typography
            sx={{
              display: { sm: "none", md: "none", lg: "none", xl: "none" },
              color: "#DCDCDC",
              px: "4px",
              mt: "-5px",
              fontSize: "28px",
            }}
          >
            |
          </Typography>
          <Box sx={Style.headerContainer}>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                alignItems: "end",
              }}
            >
              <Typography variant="h6" sx={Style.userNameContainer}>
                <Typography
                  sx={{ ...Style.name, ...Style.ellipse, width: "auto" }}
                >
                  {name}
                </Typography>
              </Typography>
              <Typography sx={[Style.role, Style.ellipse]} variant="h6">
                {role}
              </Typography>
            </Box>
            <Box
              sx={Style.popOverButton}
              onClick={() => setIsOpenPopover(!isOpenPopover)}
            >
              <AccountCircleIcon sx={Style.headerIcon} />
              <KeyboardArrowDownIcon sx={Style.editIcon} />
            </Box>
            {isOpenPopover && (
              <>
                <Box sx={Style.menu}>
                  <Typography sx={Style.menuListName}>{name}</Typography>
                  <Typography sx={Style.menuList} onClick={editProfile}>
                    Edit Profile
                  </Typography>
                  <Typography sx={Style.menuList} onClick={setting}>
                    Setting
                  </Typography>
                  <Typography sx={Style.menuList} onClick={logOut}>
                    Logout
                  </Typography>
                </Box>
                <Box
                  sx={Style.grayBox}
                  onClick={() => setIsOpenPopover(false)}
                />
              </>
            )}
          </Box>
        </DrawerHeader>
        <LogoutModal open={openLogoutModal} setOpen={setOpenLogoutModal} />
      </Box>
    </Box>
  );
};

export default TopBanner;
