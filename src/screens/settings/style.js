export const Style = {
  container: {
    maxWidth: "1470px",
    width: "100%",
    margin: "25px auto 0",
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: { xs: "5px", md: "20px" },
    alignItems: "center",
    flexGrow: 1,
    height: "calc(100vh - 150px)",
    boxSizing: "border-box",
    // overflow: 'hidden',
    justifyContent: "space-between",
  },
  firstSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    flexGrow: 1,
    height: "100%",
    minHeight: "120px",
    width: { xs: "100%", md: "30%" },
    maxHeight: "780px",
    minWidth: "245px",
    borderRadius: "8px",
    boxShadow: "6px 4px 39px 0px rgba(81, 69, 159, 0.08)",
    paddingBottom: { xs: "10px", md: "20px" },
  },
  child1: {
    display: { xs: "none", sm: "flex" },
    flexDirection: "column",
    alignItems: "center",
  },
  role: {
    color: "#787486",
    textAlign: "right",
    fontFamily: "Rubik",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "normal",
    mt: 0.5,
  },
  name: {
    mt: 1,
    textAlign: "right",
    fontFamily: "Rubik",
    fontSize: { xs: "10px", md: "20px", lg: "20px", xl: "20px" },
    fontWeight: "500",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "inline",
    maxWidth: { xs: "190px", md: "190px" },
    width: "auto",
  },
  updateText: {
    color: "#3447D4",
    textAlign: "right",
    fontFamily: "Rubik",
    fontSize: "16px",
    fontWeight: "400",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "inline",
    maxWidth: { xs: "120px", md: "190px" },
    width: "auto",
  },
  headerIcon: {
    mt: 1,
    width: { xs: "50px", md: "114px", lg: "114px", xl: "114px" },
    height: { xs: "50px", md: "114px", lg: "114px", xl: "114px" },
    ml: { xs: 0, sm: 1, md: 2 },
    color: "#3346D3",
  },
  child2: {
    display: "flex",
    flexDirection: "column",
    pt: { xs: 1, md: 0 },
    paddingBottom: { xs: "0px", md: "0px" },
    px: { xs: "16px", md: "28px", lg: "34px", xl: "40px" },
  },
  notificationText: {
    fontFamily: "Rubik",
    fontSize: { xs: "16px", md: "20px", lg: "20px", xl: "20px" },
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "normal",
  },
  divider: {
    mt: { xs: "5px", md: 2, lg: 2, xl: 2 },
    height: "1px",
    border: "0.6px solid rgba(218, 218, 218, 0.50)",
  },
  notificationSection: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // m:
    mt: { xs: "-3px", md: 1, lg: 1, xl: 1 },
  },
  notificationSectionText: {
    fontFamily: "Rubik",
    fontSize: { xs: "14px", md: "14px", lg: "16px" },
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    minWidth: "70px",
  },
  toggleStyle: (isFirst) => ({
    "& .MuiSwitch-switchBase": {
      padding: isFirst
        ? "14.3px 13.5px 14.3px 15px"
        : "14.3px 14px 14.3px 15px", // Padding for the thumb
      "&.Mui-checked": {
        transform: "translateX(16px)", // Moves the thumb to the right when checked
        color: "#FFF", // Thumb color when checked
        padding: isFirst
          ? "14.3px 13.5px 14.3px 11px"
          : "14.3px 14px 14.3px 11px", // Padding for the thumb
      },
    },
    "& .MuiSwitch-thumb": {
      width: "16px !important", // Thumb width
      height: "16px !important", // Thumb height
    },
    "& .MuiSwitch-track": {
      borderRadius: 10, // Rounded corners for the track
      backgroundColor: "#D3D3D3", // Default background color when unchecked
      opacity: 1,
      width: 36, // Track width
      height: 21, // Track height
      transition: "background-color 0.3s", // Smooth transition
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#6A7CFF", // Background color when checked
      opacity: 1,
    },
  }),
  labelToggle: {
    mr: 0,
    ml: 0,
    width: { xs: "45px", lg: "35px" },
  },
  secondSection: (width) => ({
    display: "flex",
    flexDirection: "column",
    flexGrow: { xs: 0, md: 1 },
    height: { xs: "fit-content", md: "100%" },
    // minHeight: 'fit-content',
    maxHeight: "780px",
    width: { xs: "100%", md: width < 1175 ? "calc(100% - 245px)" : "68%" },
    flexShrink: "0",
    borderRadius: "8px",
    background: "var(--Neutral-White, #FFF)",
    boxShadow: "22px 4px 39px 0px rgba(81, 69, 159, 0.08)",
    px: { xs: "16px", md: "28px", lg: "34px", xl: "40px" },
    overflow: "auto",
  }),
  child3: {
    display: "flex",
    flexDirection: "column",
    paddingTop: { xs: "20px", md: "70px" },
    paddingBottom: { xs: "5px", md: "20px" },
  },
  profileInformationText: {
    fontFamily: "Rubik",
    fontSize: { xs: "16px", md: "24px" },
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "normal",
  },
  tabsContainer: {
    display: "flex",
    gap: { xs: "10px", lg: "28px" },
    borderBottom: "3px solid #EAEAEA",
    mt: 2,
    overflowX: {
      xs: "auto",
      md: "visible",
    },
    overflowY: "visible",
    whiteSpace: {
      xs: "nowrap",
      md: "normal",
    },
  },
  tabs: {
    display: "flex",
    flexDirection: "column",
    width: {
      xs: "max-content",
      md: "auto",
    },
  },
  tabsText: (selectedTab) => ({
    color: selectedTab ? "#3447D4" : "#4B4B4B",
    fontFamily: "Rubik",
    fontSize: { xs: "15px", lg: "18px" },
    cursor: "pointer",
    mb: 1,
  }),
  tabsBorder: (selectedTab) => ({
    mb: "-2.5px",
    borderRadius: "10px",
    height: "3px",
    background: selectedTab ? "#3447D4" : "none",
  }),
};
