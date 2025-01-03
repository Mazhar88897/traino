import zIndex from "@mui/material/styles/zIndex";
import { COLORS } from "../../theme";

export const Style = {
  card: (isUser, width, isDrawer) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    textAlign: "center",
    minWidth: "180px",
    width: {
      xs: width < 450 ? "100%" : "calc(50% - 12px)",
      sm:
        !isDrawer && width > 750
          ? "calc(33% - 14px)"
          : isDrawer && width < 712
          ? "100%"
          : "calc(50% - 12px)",
      md:
        !isDrawer && width > 1050
          ? "calc(25% - 18px)"
          : isDrawer && width < 1000
          ? "calc(50% - 12px)"
          : "calc(33% - 14px)",
      lg: !isDrawer && width > 1250 ? "calc(20% - 19px)" : "calc(25% - 18px)",
      xl: "calc(20% - 19px)",
    },
    maxWidth: "300px",
    height: "160px",
    alignItems: "center",
    borderRadius: "10px",
    border: "2px dashed #B8C1FF",
    background: "#fff",
    "&:hover": {
      border: !isUser && "none",
      background: isUser
        ? "initial"
        : "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)",
      zIndex: 3,
      "& .hover-buttons": {
        zIndex: 1,
        opacity: 1,
        transform: "translateY(0)",
      },
      "& .content": {
        opacity: !isUser && 0,
      },
      "& .MuiTypography-body1": {
        opacity: !isUser && 0,
      },
      "& .MuiButtonBase-root": {
        "& .MuiTypography-root": {
          opacity: "1 !important",
          color: "#fff",
        },
      },
    },
    position: "relative",
  }),
  topRightIcon: {
    display: "flex",
    alignSelf: "flex-end",
    pr: 1,
    pt: 1,
    cursor: "pointer",
  },
  contentContainer: {
    position: "relative",
    cursor: "pointer",
    display: "flex",
    justifyContent: "start",
    flexDirection: "column",
    height: "80%",
  },
  headings: {
    color: "#280A82",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: { xs: "16px", sm: "20px" },
    fontWeight: "500",
    lineHeight: { xs: "22px", sm: "32px" },
  },
  subHeading: {
    mt: { xs: 1, sm: 1.25, lg: 1.25 },
    mb: { xs: 1, sm: 1, lg: 1 },
    maxWidth: "190px",
    color: "#4156F9",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: { xs: "13px", sm: "14px" },
    fontWeight: "400",
    lineHeight: "22px",
  },
  nextIcon: {
    position: "absolute",
    bottom: "-32px",
    left: "calc(50% - 22px)",
    background: "#FFAD0D",
    fill: "#fff",
    p: 1.6,
    fontSize: "46px",
    borderRadius: "36px",
    border: "1px solid rgba(255, 255, 255, 0.20)",
    boxShadow: "0px 4px 32px 0px rgba(255, 161, 107, 0.60)",
  },
  btnConatiner: {
    position: "absolute",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 0.5,
    opacity: 0,
    transform: "translateY(10px)",
    transition: "opacity 0.3s, transform 0.3s",
    zIndex: 2,
  },
  btn: (isCenter) => ({
    gap: "16px",
    display: "flex",
    justifyContent: isCenter ? "center" : "start",
    width: "100%",
    // !isCenter ? "150px" :
    background: "none !important",
    border: "0",
    height: !isCenter ? "40px" : "30px",
    p: !isCenter ? "6px 16px" : 0,
    "&:hover": {
      background: "inherit !important",
    },
  }),
  btnText: (isLarge) => ({
    fontSize: { xs: isLarge ? "20px" : "14px", xl: isLarge ? "21px" : "16px" },
    fontWeight: isLarge ? "500" : "400",
  }),
  uploadButton: {
    left: "37px",
    "&:hover": {
      color: "#FF9F24 !important",
      background: "#FFF",
      "& .MuiTypography-root": {
        color: "#FF9F24 !important",
      },
      "& p": {
        color: "#FF9F24 !important",
      },
    },
  },
};
