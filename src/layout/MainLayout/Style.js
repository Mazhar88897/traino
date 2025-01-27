import { COLORS } from "../../theme";

export const Style = {
  container: (isFull, isDarkBg) => ({
    display: "flex",
    justifyContent: "space-between",
    px: isFull ? 0 : { xs: "8px", sm: "16px" },
    py: "16px",
    pt: !isFull ? "16px" : 0,
    boxSizing: "border-box",
    backgroundColor: isDarkBg ? "#FBFBFC" : "#FEFEFE",
    // background: "black",
  }),
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "20px 0 20px 0",
  },
  headerIcon: {
    width: { xs: 100, sm: 125 },
    height: { xs: 100, sm: 125 },
    color: "#3346D3",
  },
  listItemBtnContainer: (open, bgCol) => ({
    minHeight: 44,
    justifyContent: open ? "initial" : "center",
    px: 2.5,
    // background: "black",
    // mx: 1,
    borderRadius: "4px",
    "&:hover": {
      background: bgCol ? bgCol : "#fff",
    },
  }),
  listItemIcon: (open) => ({
    minWidth: 0,
    mr: open ? 0.5 : "auto",
    justifyContent: "center",
  }),
  signoutContainer: (path, open) => ({
    display: "flex",
    background: path && "#6A7CFF",
    color: path && "#fff",
    alignItems: "center",
    justifyContent: !open && "center",
    color: "white",
    height: 44,
    borderRadius: "8px",
    mt: 1.5,

    px: 2.75,
    cursor: "pointer",
  }),
  signoutText: (path) => ({
    color: path && COLORS.white,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontFamily: "Rubik",
    fontSize: { xs: "16px", xl: "18px" },
    fontStyle: "normal",
    fontWeight: path ? "500" : "400",
    fontWeight: "400",
    lineHeight: "22px",
    letterSpacing: "-0.32px",
  }),
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "end",
    pb: 2,
    height: 90,
    borderBottom: "1px solid rgb(230, 230, 230)",
    m: "0 20px",
  },
  logo: (isDrawerOpen = false) => ({
    width: { xs: "54px", xl: isDrawerOpen ? "80px" : "54px" },
    height: { xs: "44px", xl: isDrawerOpen ? "54px" : "44px" },
  }),
  logoPara: {
    color: "#151515",
    fontFamily: "Rubik",
    fontSize: { xs: "24px", sm: "28px", lg: "28px", xl: "28px" },
    lineHeight: { xs: "28px", sm: "30px", lg: "32px", xl: "34px" },
    fontWeight: "600",
  },
  childrenWrapper: (isDrawerOpen, isFull, isLowPad, width) => ({
    minHeight: isFull ? "calc(100vh - 16px)" : "calc(100vh - 32px)",
    display: "flex",
    flexDirection: "column",
    marginLeft: "auto",
    pr: isFull
      ? 0
      : { xs: isLowPad && 0, sm: isLowPad && 0, md: isLowPad && 0, xl: 1.5 },
    pl: isFull ? 0 : isLowPad && { xs: 0, sm: 2, md: 1.5, xl: 4.75 },
    px: isFull ? 0 : !isLowPad && { xs: 1, sm: "10px", md: "20px", xl: "40px" },
    width: {
      xs: "100%",
      sm: isFull
        ? "100%"
        : isDrawerOpen
        ? "calc(100% - 276px)"
        : "calc(100% - 96px)",
      md: isFull
        ? "100%"
        : isDrawerOpen
        ? "calc(100% - 276px)"
        : "calc(100% - 96px)",
      xl: isFull
        ? "100%"
        : !isDrawerOpen
        ? "calc(100% - 85px)"
        : `calc(100% - ${width}px)`,
    },
    zIndex: 11,
  }),
  bgHeader: (drawer) => ({
    position: "fixed",
    width: "100%",
    height: { xs: 0, sm: 60 },
    background: "#3346D3",
  }),
  childrenContainer: (drawer, isDarkBg) => ({
    position: "relative",
    zIndex: "999",
    display: "flex",
    flexDirection: "column",
    backgroundColor: isDarkBg ? "#FBFBFC" : "#FEFEFE",
    minHeight: "100%",
    borderTopLeftRadius: { xs: 0, sm: drawer ? 16 : 0 },
    borderTopRightRadius: { xs: 0, sm: drawer ? 16 : 0 },
    p: 0,
    // maxWidth: '1500px',
    // margin: '0 auto'
  }),
  smallScreenSlider: {
    width: 250,
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    minHeight: "fit-content",
  },
  userNameContainer: { display: "flex", alignItems: "center", gap: "8px" },
  editIcon: { cursor: "pointer", fontSize: "20px" },
  text: {
    wordWrap: "break-word !important",
    width: "200px",
    fontSize: { xs: "16px", sm: "20px" },
    boxSizing: "border-box",
    display: "flex",
  },
  ellipse: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "inline",
    // maxWidth:  "190px",
  },
};
