import { COLORS } from "../../../theme";

export const Style = {
  // Commented names are the components names of dashboard //

  // Calendar
  calendarProvider: {
    width: "100%",
    maxWidth: { xs: "100%", lg: "320px" },
    position: "relative",
  },
  datePicker: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    borderRadius: "8px",
    background: "#FFF",
    margin: 0,
    p: "4px 10px",
    display: "flex",
    boxSizing: "border-box",
    boxShadow: "0px 4px 39px 0px rgba(81, 69, 159, 0.08)",
    height: "260px",
    "& .MuiIconButton-sizeSmall": {
      display: "none",
    },
    "& .MuiPickersFadeTransitionGroup-root": {
      display: "flex",
      boxSizing: "border-box",
      paddingRight: "0px",
    },
    "& .MuiPickersCalendarHeader-root": {
      width: "100%",
      maxWidth: "280px",
      position: "relative",
      padding: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      mt: "8px",
      mb: "2px",
    },
    "& .MuiIconButton-edgeEnd": {
      position: "absolute",
      left: 0,
      top: 0,
      padding: "4px",
      margin: "0 8px",
    },
    "& .MuiIconButton-edgeStart": {
      position: "absolute",
      right: 0,
      top: 0,
      padding: "4px",
      margin: "0 8px",
    },
    "& .MuiDayCalendar-weekContainer": {
      height: "34px",
    },
    "& .MuiPickersArrowSwitcher-root": {
      width: 0,
    },
    "& .MuiPickersCalendarHeader-labelContainer": {
      margin: 0,
    },
    "& .MuiDayCalendar-header": {
      display: "flex",
      alignItems: "center",
      gap: "11px",
      height: "42px",
    },
    "& .MuiDayCalendar-weekDayLabel": {
      color: "#1F1F1F",
      textAlign: "center",
      fontFamily: "Rubik",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "normal",
      width: "24px",
      height: "24px",
    },
    "& .MuiPickersDay-root": {
      width: "24px",
      height: "24px",
      borderRadius: "12px",
      color: "#4B4B4B",
      textAlign: "center",
      fontFamily: "Rubik",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "normal",
      opacity: "0.8",
    },
    "& .Mui-selected": {
      color: "#FFF",
      backgroundColor: "#3447D4 !important",
      opacity: "1",
    },
    "& .MuiDayCalendar-weekContainer": {
      gap: "11px",
      margin: 0,
    },
    "& .MuiDayCalendar-monthContainer": {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    "& .MuiPickersCalendarHeader-label": {
      paddingLeft: "40px",
      width: "150px",
      marginRight: 0,
      color: "#1F1F1F",
      fontFamily: "Rubik",
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "24px",
    },
  },
  // CardsSection
  cardContainer: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    flexWrap: "wrap",
    my: 3,
    justifyContent: { xs: "center", md: "flex-start" },
    alignItems: { xs: "center" },
  },
  cardItem: { mr: { sm: 2 }, mb: 2 },
  // CourseHeading
  courseContainer: { display: "flex", my: 3, mb: 5 },
  courseHeading: {
    fontSize: { lg: 25, md: 23, sm: 20, xs: 18 },
    fontWeight: "bold",
  },
  courseDescription: {
    fontSize: { lg: 23, md: 21, sm: 19, xs: 17 },
    ml: { xs: 0, md: 2 },
  },
  course: (isDashboard, isRed) => ({
    height: "50px",
    color: isRed ? "#D92D20" : "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: { xs: "16px", xl: "17px" },
    fontWeight: "400",
    letterSpacing: "0.5px",
    display: "flex",
    alignItems: "center !important",
    pl: !isDashboard && "22px",
    pt: "5px",
  }),
  browseBtn: {
    backgroundColor: COLORS.golden,
    color: COLORS.black,
    fontWeight: "bold",
    marginTop: 1,
    ml: { xs: 0, md: 2 },
  },
  browseBtnHover: {
    backgroundColor: COLORS.lightGolden,
    color: COLORS.black,
  },

  // ProgressSection
  LinearProgressWithLabel: { display: "flex", alignItems: "center", mb: 2 },
  progressSection: { width: "100%", maxWidth: 320 },
  // RecentActivities
  activityContainer: {
    display: "flex",
    justifyContent: "space-between",
    my: 2,
  },
  // RoundedBoxSection
  roundSectionContainer: { display: "flex", alignItems: "center", mb: 2 },
  roundSectionSubContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: { lg: "flex-start", md: "flex-start", xs: "center" },
  },
  gradiantContainer: {
    borderRadius: 10,
    background: "linear-gradient(180deg, #9BB3F2 10%, rgba(255,255,255,1) 65%)",
    padding: "50px 30px 60px 30px",
    maxWidth: 298,
    width: { lg: "auto", sm: "100%", xs: "100%" },
    maxHeight: 243,
    height: 223,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    mr: { lg: 2, sm: 2, xs: 0 },
  },
  tittle: {
    fontSize: { lg: 30, md: 29, sm: 27, xs: 25 },
    textAlign: { xs: "center", sm: "center", md: "flex-start" },
  },
  description: {
    fontSize: { lg: 27, md: 26, sm: 25, xs: 22 },
    textAlign: { xs: "center", sm: "center", md: "flex-start" },
  },
  // adminCard
  adminCardContainer: (updatedDate) => ({
    width: { xs: "100%", md: "calc(50% - 8px)", lg: "calc(25% - 8px)" },
    maxWidth: { xs: "600px", lg: "472px" },
    height: {
      xs: !updatedDate ? "117px" : "142px",
      xl: !updatedDate ? "125px" : "150px",
    },
    borderRadius: "8px !important",
    overflow: "hidden",
    mt: { xs: "0px", lg: "-60px" },
    boxShadow: "0px 4px 39px 0px rgba(81, 69, 159, 0.08)",
  }),
  adminCardTittleContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  adminCardIcon: {
    backgroundColor: "#7152F30D",
    width: { xs: "39px", xl: "42px" },
    height: { xs: "37px", xl: "40px" },
    borderRadius: "5px",
    p: "8px",
  },
  adminCardTittle: {
    color: "#16151C",
    fontFamily: "Rubik",
    fontSize: { xs: "14px", xl: "16px" },
    fontWeight: "400",
    lineHeight: "22px",
  },
  adminCardContent: {
    display: "flex",
    alignItems: "center",
  },
  adminCardContentfirstCell: {
    backgroundColor: "#7152F30D",
    width: "58px",
  },
  adminCardContentSecondCell: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  adminCardTotal: {
    fontFamily: "Rubik",
    fontSize: { xs: "26px", xl: "28px" },
    fontWeight: 500,
    mb: 1,
    lineHeight: "35px",
  },
  adminCardPercent: (isSuperAdmin) => ({
    backgroundColor: isSuperAdmin ? COLORS.white : COLORS.lightGreen,
    opacity: 0.8,
    width: { xs: "48px", xl: "56px" },
    height: { xs: "24px", xl: "28px" },
    borderRadius: "5px",
    p: "10px",
    pr: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
  }),
  upArrow: {
    width: { xs: "10px", xl: "12px" },
    height: { xs: "9px", xl: "11px" },
  },
  percent: (isSuperAdmin) => ({
    fontFamily: "Rubik",
    color: isSuperAdmin ? COLORS.lightGray : "#30BE82",
    fontSize: {
      xs: isSuperAdmin ? "12px" : "11px",
      xl: isSuperAdmin ? "14px" : "13px",
    },
  }),
  updatedDateContainer: {
    p: "12px",
    borderTop: "1px solid #A2A1A833",
    textAlign: "center",
  },
  updatedDate: {
    fontFamily: "Rubik",
    fontSize: { xs: "12px", xl: "14px" },
  },
  circularProgressbar: (isgreen) => ({
    rotation: 0,
    pathColor: isgreen ? "#4FA97C" : "#D92D20",
    trailColor: "#F3F3F2",
    backgroundColor: "#F3F3F2",
    textColor: "#1F1F1F",
    fontWeight: "700",
    paddingTop: "15px !important",
  }),
  dashboardHeading: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: { xs: "20px", xl: "32px" },
    fontWeight: "500",
  },
  day: {
    color: "#3447D4",
    fontFamily: "Rubik",
    fontSize: { xs: "12px", xl: "18px" },
    fontWeight: "400",
  },
  date: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: { xs: "12px", xl: "18px" },
    fontWeight: "400",
  },
};
