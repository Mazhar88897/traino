import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { userSideOptions } from "../../helper/navigationHelper";
import useWindowDimensions from "../../hooks/windowDimensions";
import { updateDrawer } from "../../store/slice/drawer";
import { selectUser } from "../../store/slice/user";
import { IMAGES } from "../../theme/images";
import { Style } from "./Style";

const DrawerChildren = ({ open, setOpenEditModal, setOpenLogoutModal }) => {
  const { isAdmin, isSuperAdmin, isUser, first_name, last_name, email } =
    useSelector(selectUser);
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  let location = useLocation();
  const pathname = location?.pathname?.split("/")[1];

  const dispatch = useDispatch();

  const handleDrawerClose = (path) => {
    if (width <= 600) {
      dispatch(updateDrawer({ drawer: false }));
    } else if (!path) {
      dispatch(updateDrawer({ drawer: !open }));
    }
    path && navigate(path);
  };

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  const name = first_name + " " + last_name;

  const activeColor = (path, style) => {
    return (
      ((pathname === "leaderboard" && path == "/dashboard") ||
        "/" + pathname ===
          (path === "/companies" && location?.pathname?.split("/")?.length > 2
            ? pathname === "companies"
              ? "/companies"
              : "/company"
            : path)) &&
      style
    );
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          boxSizing: "border-box",
          overflowX: "visible !important",
        }}
      >
        {open && (
          <Box sx={Style.logoContainer}>
            <Box component={"img"} src={IMAGES.logo} sx={Style.logo(open)} />
            <Typography sx={Style.logoPara}>Traino.ai</Typography>
          </Box>
        )}
        <DrawerHeader
          sx={{
            position: "fixed",
            top: 44,
            left: open
              ? {
                  xs: "220px",
                  sm: "246px",
                  xl:
                    260 + (width - 1535) / 4 > 338
                      ? 324
                      : 246 + (width - 1535) / 4,
                }
              : "72px",
            zIndex: 100,
          }}
        >
          <IconButton
            sx={{
              backgroundColor: "#fff",
              boxShadow: "0px 1px 1px 2px rgba(100, 100, 100, 0.1)",
              borderRadius: "12px",
              fontSize: 60,
              cursor: "pointer",
            }}
            onClick={() => handleDrawerClose()}
          >
            {!open ? <MenuIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        {!open && (
          <Box
            component={"img"}
            src={IMAGES.logo}
            sx={{ ...Style.logo(open), mt: "28px", ml: "12px" }}
          />
        )}
        <List
          sx={{
            p: open ? "30px 20px" : "42px 0",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {userSideOptions(isAdmin, isSuperAdmin, isUser)
            .filter(Boolean)
            .map(({ title, icon, path, successIcon }, index) => (
              <ListItem
                key={index}
                disablePadding
                sx={{
                  display: "block",
                  background: activeColor(path, "#6A7CFF"),
                  color: activeColor(path, "#fff"),
                  borderRadius: "4px",
                  width: !open ? "52px" : "auto",
                  height: !open ? "52px" : "auto",
                  ml: !open && "14px",
                }}
                onClick={() => handleDrawerClose(path)}
              >
                <ListItemButton
                  sx={Style.listItemBtnContainer(
                    open,
                    activeColor(path, "#6A7CFF")
                  )}
                >
                  <ListItemIcon sx={Style.listItemIcon(open)}>
                    <Box
                      component={"img"}
                      src={activeColor(path, successIcon) || icon}
                      alt="icon"
                      sx={{
                        height: { xs: "26px", xl: "32px" },
                        width: { xs: "30px", xl: "32px" },
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{
                      fontFamily: "Rubik",
                      fontWeight: activeColor(path, 500) || 400,
                      fontSize: width > 1535 ? 19 : 16,
                    }}
                    primary={title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Box>
      <Box sx={{ p: "20px" }}>
        <Divider />
        <Box
          sx={Style.signoutContainer(pathname == "dashboard", open)}
          onClick={() => navigate("/dashboard")}
        >
          <Box
            component={"img"}
            width={width > 1535 ? 32 : 24}
            src={
              pathname == "dashboard" ? IMAGES.dashboard1 : IMAGES.dashboard2
            }
          />
          <Typography
            variant="h6"
            sx={Style.signoutText(pathname == "dashboard")}
          >
            {open ? `\u00A0 Dashboard` : ""}
          </Typography>
        </Box>
        <Box sx={Style.signoutContainer(pathname == "support", open)}>
          <Box
            component={"img"}
            width={width > 1535 ? 32 : 24}
            src={IMAGES.support}
          />
          <Typography
            variant="h6"
            sx={Style.signoutText(pathname == "support")}
          >
            {open ? `\u00A0 Support` : ""}
          </Typography>
        </Box>
        <Box
          sx={Style.signoutContainer(pathname == "settings", open)}
          onClick={() => navigate("/settings")}
        >
          <Box
            component={"img"}
            width={width > 1535 ? 32 : 24}
            src={
              pathname == "settings" ? IMAGES.settingsWhiteIcon : IMAGES.setting
            }
          />
          <Typography
            variant="h6"
            sx={Style.signoutText(pathname == "settings")}
          >
            {open ? `\u00A0 Settings` : ""}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default DrawerChildren;
