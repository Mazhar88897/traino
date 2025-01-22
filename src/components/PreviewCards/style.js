import { globalStyle } from "../../styles/globalStyle";

export const Style = {
  main: (width, isDrawer) => ({
    position: "relative",
    width: {
      xs: "100%",
      sm: (isDrawer ? width > 900 : width > 700) ? "calc(50% - 13px)" : "100%",
      md: (isDrawer ? width < 1100 : width < 915)
        ? "calc(50% - 13px)"
        : "calc(33% - 15px)",
      lg: (isDrawer ? width < 1400 : width < 1305)
        ? "calc(30% - 15px)"
        : "calc(30% - 20px)",
    },
    maxWidth: {
      xs: "325px",
      sm: "325px",
      md: "325px",
      xl: "325px",
    },
    minWidth: { xs: "200px", xl: "250px" },
    cursor: "pointer",
    display: "flex",
    boxShadow: "none",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 39px 0px rgba(81, 69, 159, 0.08)",
  }),
  uploadDate: {
    ...globalStyle.subHeading,
    fontSize: "12px",
    textAlign: "end",
    pr: 1,
  },
  contentContainer: {
    width: "100%",
    background: "rgb(255, 255, 255)",
    borderRadius: "8px 8px 0 0 !important",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "start",
  },
  content: (isDoc) => ({
    width: "100%",
    background: "#FFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    borderRadius: "8px",
    overflow: "visible",
    "&::-webkit-scrollbar": {
      width: "0px",
    },
  }),
  title: () => ({
    display: "flex",
    alignItems: "start",
    justifyContent: "space-between",
    boxSizing: "border-box",
    maxWidth: "100%",
    flexWrap: "nowrap",
    overflow: "hidden",
    gap: "5px",
    marginTop: "6px",
  }),
  contentBox: (isDoc) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexWrap: "nowrap",
    boxSizing: "border-box",
    overflow: "hidden",
    width: "100%",
    padding: "10px 16px 6px ",
    height: !isDoc ? "90px" : "100px !important",
  }),
  pointerCusrsor: {
    cursor: "pointer",
    color: "#3447D4",
  },
  ellipse: (isDoc) => ({
    display: "inline",
    whiteSpace: "normal",
    height: isDoc ? "52px" : "26px",
    width: "100%",
    textAlign: "start",
  }),
  button: {
    minWidth: "18px",
    height: "20px",
    padding: 0,
    pl: "2px",
  },
  downloadIcon: {
    position: "absolute",
    top: "15px",
    right: "10px",
    width: "38px",
    height: "38px",
  },
  assignButton: {
    width: "100%",
    maxWidth: { xs: "110px", xl: "120px" },
    border: "none",
    justifyContent: "start",
    p: "9px",
    borderRadius: "4px",
    background: "#3447D4",
    color: "#FFF",
    "&:hover": {
      background: "#4558E5",
    },
  },
  buttonIcon: {
    width: "24px",
    height: "24px",
  },
  input: {
    height: "24px",
    display: "flex",
    width: "100%",
    fontSize: "20px",
    fontWeight: "500",
    fontFamily: "Rubik",
  },
  bold: {
    color: "#4B4B4B",
    fontFamily: "Rubik",
    fontSize: { xs: "18px", xl: "20px" },
    fontWeight: "400",
  },
  textdescript: {
    fontFamily: "Rubik",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "25px",
    px: "-3px",
  },
  heading: (isDoc) => ({
    fontFamily: "Rubik",
    fontSize: {
      xs: isDoc ? "17px" : "17px",
      sm: "20px",
      md: "20px",
      lg: "20px",
      xl: isDoc ? "18px" : "20px",
    },
    fontWeight: "500",
    color: "black",
    lineHeight: { xs: "25px", xl: "30px" },
    display: "-webkit-box",
    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: 2, // Limit text to 2 lines
    WebkitBoxOrient: "vertical", // Control text orientation
    whiteSpace: "normal", // Allow line wrapping
    height: isDoc ? "min-content" : { xs: "26px", xl: "34px" },
    maxHeight: { xs: "52px", xl: "68px" },
    minHeight: { xs: "26px", xl: "34px" },
    width: "100%",
    textAlign: "start",
    horizontalAlign: "center",
    wordBreak: "break-all",
  }),
  departContentBox: (isAdmin) => ({
    width: isAdmin ? "calc(100% - 28px)" : "100%",
    display: "block",
  }),
  viewBox: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    my: 0.5,
  },
  userIcon: {
    width: "28px",
    height: "28px",
    padding: "5px",
    color: "#3447D4",
    border: "1px solid #ECEDF2",
    borderRadius: "32px",
  },
  userNo: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: "16px",
    fontWeight: "400",
  },
  spaceBetween: {
    display: "flex",
    // alighn:
    // justifyContent: "center",
    alignItems: "left",
    mr: 0.5,
  },

  spaceBetweenBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // justifyContent: "center",
    // alignItems: "left",
    mr: 0.5,
  },
  quizNo: {
    color: "#3447D4",
    fontFamily: "Rubik",
    fontSize: { xs: "18px", xl: "20px" },
    fontWeight: "400",
  },

  linksOnPreviewCard: {
    fontFamily: "Rubik",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "30px",
    mr: "5px",
    color: "#3447D4",
    padding: "0px 12px",
    background: "#E9EFFD80",
    borderRadius: "5px",
  },
  estimatedtimetext: {
    fontFamily: "Rubik",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "16.59px",
  },
  clocktext: {
    fontFamily: "Rubik",
    color: "#3447D4",

    pl: "8px",
    lineHeight: "16.59px",
    fontSize: "14px",
    fontWeight: "400",
  },
  center: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  progressRatio: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: "16px",
    fontWeight: "400",
  },
  progressBarRatio: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    lineHeight: "16.59px",
    fontSize: "14px",
    fontWeight: "400",
  },
  bgAssignButton: {
    // Position it relative to the nearest positioned ancestor

    fontFamily: "Rubik",
    display: "flex",
    background: "white",
    borderRadius: "4px",

    fontSize: { xs: "11px", sm: "12px" },
    lineHeight: "14.22px",
    fontWeight: "400",
    padding: "5px 9px",
    "&:hover": {
      background: "rgb(220, 220, 220)",
    },
  },
  assignBlack: {
    lineHeight: "14.22px",
    fontSize: "12px",
    fontFamily: "Rubik",
    pl: "3px",
    color: "black",
  },
  bgAssignButtonComplete: {
    // Position it relative to the nearest positioned ancestor

    fontFamily: "Rubik",
    display: "flex",
    background: "#26B56F",
    borderRadius: "4px",

    fontSize: { xs: "11px", sm: "12px" },
    lineHeight: "14.22px",
    fontWeight: "500",
    padding: "5px 9px",
    "&:hover": {
      background: "rgb(220, 220, 220)",
    },
  },

  assignblue: {
    lineHeight: "14.22px",
    fontSize: "12px",
    fontFamily: "Rubik",
    pl: "3px",
    color: "#3447D4",
  },
  assignWhite: {
    lineHeight: "14.22px",
    fontSize: "12px",
    fontFamily: "Rubik",
    pl: "3px",
    fontWeight: "500",
    color: "White",
  },
  assignButtonContainer: {
    fontFamily: "Rubik",
    position: "absolute",
    justifyContent: "center",
    top: "75px", // Adjust this value to move the button above the div
    left: "7px",
  },

  date: {
    color: "#3447D4",
    fontFamily: "Rubik",
    fontSize: { xs: "12px", sm: "14px" },
    fontWeight: "400",
    // background: "white",
    padding: "3px 10px",
  },
  StopWatch: {
    width: "16px",
  },
  stopbox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
