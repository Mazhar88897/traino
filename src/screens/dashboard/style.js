export const Style = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: { md: "flex-start", xs: "center" },
    width: "100%",
  },
  leftContainer: (isSuperAdmin) => ({
    width: {
      xs: "100%",
      lg: isSuperAdmin ? "calc(75% - 4px)" : "70%",
      xl: "calc(75% - 4px)",
    },
    maxWidth: {
      lg: isSuperAdmin ? "840px" : "800px",
      md: "100%",
      xl: "1500px",
    },
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
  }),
  circularProgressbar: {
    rotation: 0.5,
    pathColor: `#3447D4`,
    trailColor: "#F3F3F2",
    backgroundColor: "#F3F3F2",
    textColor: "#1F1F1F",
    fontWeight: "700",
  },
  rightContainer: (isSuperAdmin) => ({
    width: { xs: "359.6px", lg: isSuperAdmin ? "calc(25% + 4px)" : "30%" },
    // justifyContent: "center",
    maxWidth: {
      xs: "359.6px",
      lg: isSuperAdmin ? "282px" : "310px",
      xl: "380px",
    },
    boxSizing: "border-box",
    pl: {
      xs: 0,
      lg: isSuperAdmin ? "10px" : "12px",
      xl: isSuperAdmin ? "10px" : "16px",
    },
    pt: { xs: 1.5, lg: 2.5 },
    // display: "flex",
    flexDirection: { lg: "column", md: "row" },
    flexWrap: "wrap",
  }),
  todayStatistics: {
    mt: 1.75,
    borderRadius: "8px",
    background: "#FFF",
    boxShadow: "0px 4px 39px 0px rgba(81, 69, 159, 0.08)",
    p: 1.5,
  },
  todayHeading: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: { xs: "18px", xl: "20px" },
    fontWeight: "500",
    lineHeight: "24px",
    mt: 1,
    mb: 1.5,
  },
  improveHeading: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    mt: 1,
    fontSize: { xs: "14px", xl: "18px" },
    fontWeight: "400",
    lineHeight: "24px",
  },
  improvePara: {
    color: "#4B4B4B",
    fontFamily: "Rubik",
    fontSize: "12px",
    fontWeight: "300",
    letterSpacing: "0.5px",
    pr: 1,
  },
  avatarContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "30px",
    mt: 0.5,
  },
  avatarPic: {
    width: "56px",
  },
  dueDateContainer: {
    display: "flex",
  },
  dueDateHeading: {
    display: "flex",
    color: "#3447D4",
    fontFamily: "Rubik",
    fontSize: { xs: "12px", xl: "14px" },
    fontWeight: "400",
    letterSpacing: "0.5px",
  },
  dueDate: {
    color: "#4B4B4B",
    fontFamily: "Rubik",
    fontSize: { xs: "12px", xl: "14px" },
    fontWeight: "400",
    letterSpacing: "0.5px",
  },
  calendarContainer: {
    display: "flex",
    gap: 1,
    alignItems: "center",
  },
  calendarIcon: {
    width: "17px",
    height: "17px",
  },
  calendarDate: {
    color: "#4B4B4B",
    fontFamily: "Rubik",
    fontSize: "12px",
    fontWeight: "400",
    letterSpacing: "0.5px",
  },
  continueContainer: {
    display: "flex",
    justifyContent: "space-between",
    mb: 1,
  },
  continueButton: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: { xs: "12px", xl: "14px" },
    fontWeight: "500",
    lineHeight: "24px",
    borderRadius: "4px",
    background: "#3447D4",
    display: "flex",
    width: { xs: "94px", xl: "104px" },
    height: "32px",
    padding: "8px",
    textTransform: "inherit",
    mt: 2.2,
    "&:hover": {
      background: "#3667D4",
    },
  },
  completed: {
    color: "#4B4B4B",
    fontFamily: "Rubik",
    fontSize: { xs: "12px", xl: "14px" },
    fontWeight: "400",
    letterSpacing: "0.5px",
    mt: 1,
    mb: 0.75,
  },
  notificationContainer: {
    width: "100%",
    mb: 3,
    mt: 1.75,
    borderRadius: "8px",
    boxShadow: "0px 4px 39px 0px rgba(81, 69, 159, 0.08)",
    background: "#FFF",
    px: 1.5,
    py: 2.5,
  },
  notificationHeadingContainer: {
    height: "20px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    px: "3px",
    mb: 2,
  },
  notificationHeading: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: { xs: "18px", xl: "20px" },
    fontWeight: "500",
    lineHeight: "24px",
  },
  viewAll: {
    color: "#3447D4",
    fontFamily: "Rubik",
    fontSize: { xs: "12px", xl: "14px" },
    fontWeight: "400",
    lineHeight: "24px",
  },
  notificationAvatar: {
    width: { xs: "38px", xl: "42px" },
    height: { xs: "38px", xl: "42px" },
    borderRadius: "4px",
  },
  notificationTitle: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: { xs: "14px", xl: "16px" },
    fontWeight: "400",
  },
  notificationDate: {
    color: "#4B4B4B",
    fontFamily: "Rubik",
    fontSize: { xs: "12px", xl: "14px" },
    fontWeight: "300",
    letterSpacing: "0.5px",
  },
  notificationPerPerson: (isLast) => ({
    display: "flex",
    gap: 2,
    py: 2,
    pb: isLast ? 0 : 2,
    borderBottom: isLast ? "0" : `1px solid #F0F0F0`,
  }),
  hello: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: "28px",
    fontWeight: "500",
  },
  name: {
    color: "#3447D4",
    fontFamily: "Rubik",
    fontSize: "28px",
    fontWeight: "500",
  },
  dashboardHeading: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: "28px",
    fontWeight: "500",
  },
  day: {
    color: "#3447D4",
    fontFamily: "Rubik",
    fontSize: "14px",
    fontWeight: "400",
  },
  date: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: "14px",
    fontWeight: "400",
  },
  welcome: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: "16px",
    fontWeight: "300",
    letterSpacing: "0.5px",
  },
  illustration: {
    mt: { xs: "-120px", sm: "-80px", md: 0 },
    width: { xs: "42%", xl: "47%" },
    // objectSize: '100% 100%',
    // aspectRatio: "1/1",
    // marginLeft: "auto",
    objectFit: "contain",
    maxWidth: { xs: "200px", md: "290px", xl: "400px" },
    maxHeight: "100%",
    display: "flex",
    alignSelf: "end",
  },
  pieChartBrowseMain: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "center",
    gap: "20px",
    mt: 3,
  },
  chartTextContainer: {
    display: "flex",
    flexDirection: "column !important",
  },
  chartNo: {
    color: "#1F1F1F",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: { xs: "22px", xl: "20px" },
    fontWeight: "500",
    lineHeight: "110%",
    letterSpacing: "0.26px",
  },
  chartHeading: {
    color: "#4B4B4B",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: { xs: "10px", xl: "9px" },
    fontWeight: "400",
    lineHeight: "140%",
  },
  browseMain: {
    height: { xs: "171px", md: "240px", xl: "300px" },
    width: { xs: "350px", md: "calc(100% - 206px)" },
    maxWidth: { md: "580px", xl: "810px" },
    // maxWidth:  { md: '580px' },
    borderRadius: "10px",
    background: "#6A7CFF",
    pb: 0,
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "start",
    justifyContent: "space-between",
    flexGrow: 1,
    pt: { xs: "7px" },
    pl: { xs: "4px" },
  },
  browseHeading: {
    color: "#FFF",
    fontFamily: "Rubik",
    fontSize: { xs: "22px", xl: "32px" },
    fontWeight: "600",
    lineHeight: { xs: "23px", xl: "32px" },
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "inline",
    maxWidth: "100%",
    mt: -1,
  },
  browseText: {
    color: "#FFF",
    fontFamily: "Rubik",
    fontSize: { xs: "14px", xl: "22px" },
    fontWeight: "400",
    lineHeight: { xs: "100%", sm: "130%", md: "130%", lg: "130%", xl: "22px" },
    width: { xs: "70%", xl: "100%", lg: "100%", sm: "100%" },
    maxWidth: "300px",
    mt: { xs: 0.75, xl: 1.5, lg: 1.5, sm: 1.5 },
  },
  browseButton: {
    color: "#3447D4",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: { xs: "14px", xl: "18px" },
    fontWeight: "500",
    lineHeight: "100%",
    width: { xs: "40%", md: "100%" },
    maxWidth: { lg: "130px", xl: "180px" },
    height: { xs: "31px", xl: "52px" },
    p: "8px 0px",
    borderRadius: "4px",
    border: "1px solid #6A7CFF",
    background: "#FFF",
    mt: 2.25,
    textTransform: "inherit",
  },
  blueBgBottom: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    // flexGrow: 1,
    // flex: 1,
    gap: "6px",
    width: { xs: "100%", md: "51.5%", xl: "52.8%" },
    maxWidth: { md: "300px" },
    p: { xs: 2, md: 3 },
    pr: { xs: 2, md: 0 },
  },
  accuracyMain: {
    width: { xs: "357px", md: "242px", sm: "242px", lg: "242px", xl: "242px" },
    height: { xs: "172px", md: "240px", xl: "300px" },
    borderRadius: "12px",
    background: "#FFF",
    boxShadow: "0px 4px 39px 0px rgba(81, 69, 159, 0.08)",
    py: { xs: 2, xl: 3 },
    px: { xs: 1.5, xl: 2 },
  },
  score: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: { xs: "18px", xl: "22px" },
    fontWeight: "500",
    lineHeight: "120%",
  },
  attemptContainer: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
    justifyContent: {
      xs: "center",
      sm: "space-between",
      md: "space-between",
      lg: "space-between",
    },
    mt: { xs: 0.5, xl: 1 },
  },
  quizAttempt: {
    color: "#626262",
    fontFamily: "Rubik",
    fontSize: { xs: "14px", xl: "16px" },
    fontWeight: "400",
  },
  attemptQuantity: {
    color: "#3447D4",
    fontFamily: "Rubik",
    fontSize: { xs: "22px", md: "18px", sm: "18px", lg: "18px", xl: "18px" },
    fontWeight: "500",
    mt: { xs: 1, sm: 0, md: 0, lg: 0, xl: 0 },
  },
  formControls: {
    display: "flex",
    gap: 1,
    justifyContent: { xs: "center", md: "start" },
  },
  dayFormControl: {
    display: "flex",
    minWidth: "125px !important",
    maxWidth: "125px !important",
  },
  dayFormControlSelect: {
    height: "35px",
    color: "#4B4B4B",
    fontFamily: "Rubik",
    fontSize: "12px",
    fontWeight: "400",
    textTransform: "capitalize",
    padding: "3px 4px",
  },
  dayFormControlMenu: {
    color: "#4B4B4B",
    fontFamily: "Rubik",
    fontSize: "12px",
    fontWeight: "400",
    textTransform: "capitalize",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "flex-end",
    mt: 3,
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      display: "flex",
      width: "40px",
      height: "40px",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "4px",
      background: "#FFF",
      color: "#1F1F1F",
      fontFamily: "Rubik",
      fontSize: "16px",
      fontWeight: "600",
    },
    "& .MuiPaginationItem-root.Mui-selected": {
      border: "1px solid #3447D4",
      color: "#3447D4",
      background: "#F5F6FF",
    },
  },
  leaderBoardHeading: {
    color: "#252C32",
    fontFamily: "Rubik",
    fontSize: "28px",
    fontWeight: "500",
    lineHeight: "48px",
    letterSpacing: "0.28px",
  },
  leaderBoardText: {
    color: "#4B4B4B",
    fontFamily: "Rubik",
    fontSize: { md: "16px", lg: "18px" },
    fontWeight: "400",
    lineHeight: "22px",
  },
  userDetailContainer: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    pr: 3,
  },
  userIcon: {
    width: "32px",
    height: "32px",
    padding: "6px",
    color: "#3447D4",
    backgroundColor: "#fff",
    borderRadius: "16px",
    border: "1px solid #E6E7EE",
  },
  userNo: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: { md: "16px", lg: "18px" },
    fontWeight: "400",
    lineHeight: "20px",
    opacity: 0.8,
  },
  contentContainer: {
    width: "100%",
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    justifyContent: { xs: "center", md: "space-between" },
    mt: 3,
    gap: "20px",
  },
  contentContainerChild: {
    display: "flex",
    justifyContent: { xs: "center", md: "start" },
  },
  inputBase: {
    ml: 1,
    flex: 1,
    fontFamily: "Rubik",
    fontSize: "16px",
    fontWeight: "400",
    opacity: "1",
    "& input::placeholder": {
      color: "#000",
      opacity: "0.9",
    },
  },
  searchContainer: {
    p: "10px 0px",
  },
  searchIcon: {
    width: "21px",
  },
  paperFormContainer: {
    display: "flex",
    alignItems: "center",
    gap: 0.5,
    pl: 2,
    borderLeft: "1px solid #B0B0B0",
    height: "25px",
    alignSelf: "center",
  },
  paperForm: {
    border: "none",
    boxShadow: "none",
    background: "inherit",
    width: "180px",
    display: "flex",
  },
};
