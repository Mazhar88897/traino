import { Box, CssBaseline } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EditProfileModal, LogoutModal } from "../../components";
import useWindowDimensions from "../../hooks/windowDimensions";
import { selectdrawer } from "../../store/slice/drawer";
import DrawerChildren from "./DrawerChildren";
import SmallScreenSlider from "./SmallScreenSlider";
import { Style } from "./Style";
import { useLocation, useParams } from "react-router-dom";

const hasWindow = typeof window !== "undefined";
const windowWidth = hasWindow ? window.innerWidth : 0;

let fourthSize = (windowWidth - 1535) / 4;
const drawerWidth = windowWidth > 1535 ? 260 + fourthSize : 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  maxWidth: "338px",
  height: "calc(100vh - 32px)",
  position: "fixed",
  left: "16px",
  top: "16px",
  zIndex: 12,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  justifyContent: "space-between",
  overflowX: "hidden",
  border: "none",
  display: { xs: "none", sm: "flex" },
  boxShadow: "6px 4px 29.7px 0px rgba(0, 0, 0, 0.05)",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  position: "fixed",
  left: "16px",
  top: "16px",
  height: "calc(100vh - 32px)",
  justifyContent: "space-between",
  overflowX: "hidden",
  border: "none",
  zIndex: 12,
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `80px`,
  },
  boxShadow: "6px 4px 29.7px 0px rgba(0, 0, 0, 0.05)",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  position: "relative",
  display: "flex",
  ...(open && {
    ...openedMixin(theme),
    borderRadius: "8px !important",
    boxSizing: "border-box",
    display: "flex",
    whiteSpace: "nowrap",
    "& .MuiDrawer-paper": {
      position: "relative",
      border: 0,
      borderRadius: "8px !important",
      background: "white",
      boxShadow: "1px 1px 1px 2px rgba(100, 100, 100, 0.1)",
      ...openedMixin(theme),
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    border: "1px solid rgb(230, 230, 230)",
    borderRadius: "8px !important",
    boxSizing: "border-box",
    whiteSpace: "nowrap",
    "& .MuiDrawer-paper": {
      position: "relative",
      border: 0,
      borderRadius: "8px !important",
      background: "white",
      boxShadow: "1px 1px 1px 2px rgba(100, 100, 100, 0.1)",
      ...closedMixin(theme),
    },
  }),
}));

export default function MiniDrawer({ children }) {
  const { width } = useWindowDimensions();
  const { drawer } = useSelector(selectdrawer);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [open, setOpen] = useState(drawer);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const { section } = useParams();
  const location = useLocation();
  const path = location?.pathname;
  useEffect(() => {
    setOpen(drawer);
  }, [drawer]);

  return (
    <Box sx={Style.container(section === "attemptQuiz", section)}>
      <CssBaseline />
      {section !== "attemptQuiz" &&
        (width >= 600 ? (
          <Drawer variant="permanent" open={open}>
            <DrawerChildren
              open={open}
              setOpenEditModal={setOpenEditModal}
              setOpenLogoutModal={setOpenLogoutModal}
            />{" "}
          </Drawer>
        ) : (
          <SmallScreenSlider open={open} setOpen={setOpen}>
            <DrawerChildren
              open={open}
              setOpenEditModal={setOpenEditModal}
              setOpenLogoutModal={setOpenLogoutModal}
            />
          </SmallScreenSlider>
        ))}

      <Box
        component="main"
        sx={Style.childrenWrapper(
          open,
          section === "attemptQuiz",
          !!path?.includes("dashboard"),
          260 + (windowWidth - 1535) / 4 > 338
            ? 338
            : 260 + (windowWidth - 1535) / 4
        )}
      >
        <Box sx={Style.childrenContainer(drawer, !!section)}>{children}</Box>
      </Box>
    </Box>
  );
}
