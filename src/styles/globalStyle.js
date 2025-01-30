export const globalStyle = {
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100vh",
    flexGrow: 1,
    backgroundImage: "linear-gradient(to right, #5866CF, #222662)",
    p: 2,
    boxSizing: "border-box",
  },
  container: {
    height: { xs: "100%", md: "100%" },
    maxHeight: { md: "59vw !important" },
    borderRadius: "24px",
    p: { xs: "0", sm: "12px 9px" },
    pr: { sm: 0 },
    border: { md: "4px solid #D1C8FF" },
    background: "white",
    width: "100%",
    maxWidth: "158vh",
    boxSizing: "border-box",
    overflow: "hidden",
    display: "flex",
    flexWrap: "wrap",

    // flexDirection: { xs: "column", md: "row" },
    justifyContent: "center",
  },
  HeroBanner: (isSection, isFull, isTabShown) => ({
    ml: isTabShown ? { xs: "4px", sm: "-26px" } : 0,
    mx: isSection && !isTabShown && { xs: "auto", sm: "auto" },
    pt: isSection
      ? { xs: "0px", sm: "12px", md: "12px" }
      : { xs: "-5px", sm: "36px", md: "36px" },
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // background: "black",
    width: "100%",
    // mx: "auto",
    maxWidth: isSection && !isTabShown ? "1470px" : "100%",
    pb: isFull ? 2 : 0,
    pl: isFull ? 2.5 : 0,
    background: isFull ? "#fff" : "inherit",
    gap: 2,
  }),
  headings: {
    fontSize: { xs: "20px", sm: "20px" },
    lineHeight: 1.5,
    fontFamily: "Rubik",
    color: "#3447D4",
    cursor: "pointer",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    display: "inline",
  },
  headingMain: {
    display: "inline !important",
    overflow: "hidden",
    whiteSpace: "nowrap",
    maxWidth: "100% !important",
    width: "100%",
  },
  subHeading: {
    mt: 1,
    color: "#1F1F1F",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: { xs: "20px", sm: "24px", md: "28px" },
    fontWeight: "500",
    lineHeight: { xs: "30px", sm: "34px", md: "37px" },
    width: "100%",
    maxWidth: { xs: "320px", sm: "380px" },
  },
  arrowback: {
    display: { xs: "none", sm: "flex", lg: "flex", xl: "flex" },
    cursor: "pointer",
    width: { xs: "38px", sm: "50px", md: "50px" },
    height: { xs: "33px", sm: "45px", md: "45px" },
  },
  divider: { my: 2, borderStyle: "solid", borderWidth: "2px" },
  wrapper: (isFull, height) => ({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "100%",
    alignItems: "start",
    maxWidth: {
      xs: isFull ? "1320px" : "1440px",
      xl: isFull ? "1470px" : "1920px",
    },
    mx: "auto",
    mb: height < 890 ? (height < 800 ? 1 : 2) : 3,
  }),
  cardsWrapper: (drawer, width) => ({
    display: "flex",
    flexWrap: "wrap",
    gap: "24px",
    m: "40px auto 0",
    justifyContent: {
      xs: "center",
      sm: drawer
        ? width > 800
          ? "start"
          : "center"
        : width > 675
        ? "start"
        : "center",
      md: "start",
    },
    pb: "24px",
  }),
  tabsContainer: {
    display: "flex",
    justifyContent: "start",
    flexGrow: 1,
    width: "100%",
    gap: { xs: 0, sm: "10px", md: "13px" },
    boxSizing: "border-box",
    flexWrap: "nowrap",
    pb: "5px",
  },
  tabs: (isActive) => ({
    color: isActive ? "#3447D4" : "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: { xs: "18px", sm: "17px", md: "20px", xl: "24px" },
    fontWeight: "400",
    // width: { xs: "70px", md: "100px" },
    minWidth: "fit-content",
    mr: { xs: "10px", sm: "12px", md: "15px" },
    ml: { xs: "-10px", sm: "0px" },
    // p: { xs: "6px 8px", md: "6px 11px" },
  }),
  tabsMain: (isTabs, isDrawer, isFull) => ({
    pl: isFull ? "5px" : 0,
    pr: isFull ? 8 : 0,
    width: {
      xs: isFull ? "100%" : "100%",
      sm: isFull
        ? "100%"
        : isDrawer
        ? "calc(100vw - 345px)"
        : "calc(100vw - 170px)",
      md: isFull
        ? "100%"
        : isDrawer
        ? "calc(100vw - 350px)"
        : "calc(100vw - 180px)",
      xl: isFull
        ? "100%"
        : isDrawer
        ? "calc(100vw - 400px)"
        : "calc(100vw - 180px)",
    },
    maxWidth: { xs: "1320px", xl: isTabs ? "1470px" : "1405px" },
    margin: "0",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    display: "flex",
    overflow: !!isTabs ? "auto" : "hidden",
    scrollbarWidth: "none",
    justifyContent: "space-between",
    mt: "12px",
  }),
  tabsTyp: {
    fontSize: { xs: "14px", md: "16px" },
  },
  formContainer: (width, height) => ({
    width: { xs: "80%", md: "34.3%" },
    height: { xs: "60vh", sm: "90vh", md: "90vh" },
    overflowY: "auto",
    maxWidth: { xs: "600px", md: "431px" },
    display: "flex",
    justifyContent: "center",
    boxSizing: "border-box",
    px: {
      xs: "0",
      sm: "20px",
      md: width < 1030 || height < 780 ? "18px" : "25px",
      lg:
        width < 1030 || height < 780
          ? height < 680
            ? "20px"
            : "25px"
          : "50px",
    },
  }),
};
