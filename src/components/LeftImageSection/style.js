import { COLORS, IMAGES } from "../../theme";

export const Style = {
  main: {
    width: { xs: "90%", md: "65.7%" },
    height: { xs: "35%", md: "100%" },
    maxWidth: "820px",
    backgroundColor: "white",
    boxSizing: "border-box",
    display: { xs: "flex", md: "flex" },
    flexWrap: "wrap",
    overflow: "visible",
    zIndex: 1,
  },
  content: {
    width: { xs: "100%", md: "100%" },
    height: { xs: "100%", md: "100%" },
    backgroundRepeat: "no-repeat",
    borderRadius: { xs: "10px", md: "22px" },
    backgroundImage: `url(${IMAGES.leftbanner})`,
    boxShadow: "0px 14px 60px 0px rgba(0, 0, 0, 0.25)",
    backgroundSize: "100% 100%",
    backgroundColor: "#050505",
    maxHeight: "740px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.white,
  },
  welcomeHeading: {
    fontFamily: "serif",
    fontWeight: 900,
    fontSize: "40px",
    lineHeight: 1.5,
    letterSpacing: "2px",
  },
  appName: {
    fontFamily: "serif",
    fontWeight: 600,
    fontSize: "28px",
    lineHeight: 1.5,
    letterSpacing: "2px",
  },
  slogan: {
    fontFamily: "serif",
    fontWeight: 600,
    fontSize: "28px",
    lineHeight: 1.5,
    letterSpacing: "2px",
  },
};