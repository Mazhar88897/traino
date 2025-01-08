import { globalStyle } from "../../styles/globalStyle";

export const Style = {
  cardWrapper: (drawer) => ({
    display: "flex",
    gap: "26px",
    flexWrap: "wrap",
    width: "fit-content",
    justifyContent: { xs: "center", md: !drawer ? "center" : "start" },
  }),
  customCardWrapper: (isUser, width, isDrawer) => ({
    py: {
      xs: 3,
      md: "30px",
    },
    display: "flex",
    gap: "30px 20px",
    flexWrap: "wrap",
    justifyContent: {
      xs: width < 350 ? "center" : "start",
      sm: !!isDrawer && width < 712 ? "center" : "start",
      md: isUser && width < 931 ? "center" : "start",
      lg: "start",
    },
    // maxWidth: { md: isUser ? "calc(100% - 200px)" : "100%" },
    maxWidth: "100%",
  }),
  bgWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: { sm: 1, lg: 1 },
    mt: 1.5,
    px: { xs: 0, sm: "10px", md: "16px", xl: "30px" },
    py: {
      xs: 1,
      md: 2.25,
    },
    mr: { xs: 1, md: 2 },
    background: "#FDFDFE",
    border: "2px dashed #D3D3D3",
    borderRadius: "5px",
    maxHeight: "1000px",
  },
  quizContainer: (isLessHeight) => ({
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    flexGrow: 1,
    p: isLessHeight ? "0 16px" : "16px",
    width: "100%",
    maxWidth: "1500px",
  }),
  questionMain: {
    display: "flex",
    width: "100%",
    gap: 2.25,
    pl: 1.5,
  },
  questionTotal: {
    color: "#3447D4",
    fontFamily: "Rubik",
    fontSize: { xs: "18px", xl: "22px" },
    fontWeight: "500",
    lineHeight: "41px",
    letterSpacing: "-0.2px",
  },
  question: (isLessHeight) => ({
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: isLessHeight ? "18px" : "14px",
    fontWeight: "500",
    lineHeight: isLessHeight ? "22px" : "18px",
  }),
  selectAdvice: (isLessHeight) => ({
    color: "#4B4B4B",
    fontFamily: "Rubik",
    fontSize: isLessHeight ? "14px" : "18px",
    fontWeight: "400",
    letterSpacing: "-0.18px",
  }),
  questionsList: {
    maxWidth: "370px",
    width: "100%",
    flex: 1,
    background: "#fff",
    mb: 2,
    display: { xs: "none", md: "flex" },
    flexDirection: "column",
    p: 2.75,
  },
  questionListHeading: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: "20px",
    fontWeight: "500",
    lineHeight: "41px",
    letterSpacing: "-0.2px",
    borderBottom: "1px solid #F0F0F0",
    pb: 1.75,
    mb: 1,
  },
  questionNo: (isActive) => ({
    color: isActive ? "#1F1F1F" : "rgba(31, 31, 31, 0.30)",
    fontFamily: "Rubik",
    fontSize: isActive ? "16px" : "17px",
    fontWeight: "400",
    lineHeight: "41px",
    letterSpacing: "-0.16px",
    borderRadius: "5px",
    border: `1px solid ${isActive ? "#4156F9" : "rgba(65, 86, 249, 0.20)"}`,
    background: "#FFF",
    width: "100%",
    maxWidth: "270px",
    height: "42px",
    px: 1.5,
    mt: 1.5,
  }),
  headerMain: {
    display: "flex",
    background: "#fff",
    width: "100%",
    // pt: {xs:'5px'}
    height: { xs: "45px", sm: "70px", md: "70px" },
    alignItems: "center",
    px: 1,
    pr: 3,
  },
  headerChild: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "1020px",
  },
  rightMain: {
    display: "flex",
    flexDirection: "column",
    width: { xs: "100%", md: "calc(100% - 356px)" },
  },
  quizIconsContainer: {
    display: "flex",
    alignItems: "center",
  },
  quizIcon: {
    width: { xs: "24px", sm: "31px", md: "31px" },
    height: { xs: "24px", sm: "30px", md: "30px" },
    mx: 2,
  },
  timeMain: {
    display: "flex",
    alignItems: "center",
  },
  timeContainer: {
    display: "flex",
  },
  timeNo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#1E2265",
    fontFamily: "Rubik",
    fontSize: "17px",
    fontWeight: "400",
    borderRadius: "4px",
    background: "#E5E8FF",
    width: "32px",
    height: "38px",
  },
  timeDot: {
    color: "#272727",
    fontFamily: "Rubik",
    fontSize: "20px",
    fontWeight: "400",
    ml: 1.5,
    mr: 0.5,
  },
  timeHeading: {
    color: "#1E2265",
    fontFamily: "Rubik",
    fontSize: "18px",
    fontWeight: "400",
    ml: 0.5,
    mr: 2,
  },
  optionsContainer: (isLessHeight) => ({
    display: "flex",
    flexDirection: "column",
    mt: isLessHeight ? 1.5 : 3,
    mx: { xs: 0, sm: 2, md: 4 },
  }),
  alignEndBtn: { width: "fit-content", alignSelf: "end" },
  scroreWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    p: "16px",
    borderRadius: "16px",
    background: "#EDF6FC",
  },
  scoreContainer: {
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "1000px",
    backgroundColor: "#FFFFFF",
    padding: { xs: "20px", sm: "40px" },
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  },
  attemptMsg: {
    display: "flex",
    flexDirection: "column",
    gap: { xs: "40px", md: "50px" },
  },
  score: {
    ...globalStyle.headings,
    color: "#00000",
    textAlign: "center",
    cursor: "auto",
  },
  percentage: { fontSize: "56px", mt: { xs: "20px", sm: "40px" } },
  tabsContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: { xs: "column", sm: "row" },
    flexGrow: 1,
    gap: { xs: "10px", md: "20px" },
    boxSizing: "border-box",
    flexWrap: "nowrap",
    pb: "5px",
  },
  viewCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    textAlign: "center",
    width: "186px",
    height: "146px",
    alignItems: "center",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)",
    cursor: "pointer",
  },
  view: {
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: "20px",
    fontWeight: "400",
    lineHeight: "29px",
    // textDecorationLine: 'underline',
  },
  quizMain: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    justifyContent: { xs: "start", md: "space-between" },
    gap: "20px",
    width: "100%",
    position: "relative",
  },
  cupMain: {
    // width: { xs: "100%", md: "189px", sm: "189%" },
    width: "189px",
    height: "242px",
    borderRadius: "12px",
    background: "#FAD85D",
    display: "flex",
    flexDirection: "column",
    alignSelf: { xs: "center", md: "start" },
    alignItems: "center",
    justifyContent: "center",
    ml: "auto",
    mt: { md: 0, lg: -2.7 },
    position: { xs: "static", md: "absolute" },
    right: { xs: "-10px", xl: "-28px" },
  },
  myScore: {
    px: 1.75,
    display: "flex",
    alignItems: "start",
    width: "100%",
    color: "#1F1F1F",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: "18px",
    fontWeight: "500",
    lineHeight: "120%",
    mt: 1,
  },
  quizAttemptDetail: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    px: 1.75,
  },
  quizAttemptHeading: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: "14px",
    fontWeight: "400",
    opacity: "0.7",
  },
  quizNo: {
    color: "#3447D4",
    fontFamily: "Rubik",
    fontSize: "14px",
    fontWeight: "500",
  },
  cup: {
    my: 0.25,
    width: "116px",
    height: "105px",
  },
  score: {
    color: "#131215",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: "30px",
    fontWeight: "600",
    letterSpacing: "0.96px",
    mt: 0.75,
    lineHeight: "38px",
  },
  scoreTitle: {
    color: "#4B4B4B",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "140%",
  },
  answerContainer: (isActive, isLessHeight) => ({
    mt: isLessHeight ? { xs: "8px", sm: 2, md: 2 } : 2.5,
    minHeight: isLessHeight ? { xs: "30px", sm: "40px", md: "40px" } : "60px",
    display: "flex",
    alignItems: "start",
    py: { xs: "4px", sm: "5px", md: "5px" },
    px: { xs: "4px", sm: "4px", md: "4px" },
    gap: 2,
    borderRadius: "5px",
    background: "#FFF",
    boxShadow: "0px 4px 39px 0px rgba(81, 69, 159, 0.08)",
    cursor: "pointer",
    border: isActive ? "2px solid #3447D4" : "none",
  }),
  answerNo: (isActive, isLessHeight) => ({
    minWidth: isLessHeight ? "40px" : "50px",
    minHeight: isLessHeight ? "40px" : "50px",
    width: isLessHeight ? "40px" : "50px",
    height: isLessHeight ? { xs: "30px", sm: "40px", md: "40px" } : "50px",
    borderRadius: "4px",
    background: isActive ? "#3447D4" : "#E1E5FF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: isActive ? "#fff" : "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: { xs: "15px", sm: "20px", md: "20px" },
    fontWeight: "400",
    lineHeight: "41px",
    letterSpacing: "-0.2px",
  }),
  answerButtonsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: 2,
    mt: { xs: "18px", sm: "auto", md: "auto" },
  },
  answerButton: {
    width: "40%",
    maxWidth: "190px",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "24px",
    "&:disabled": {
      background: "#EDEFFF !important",
      border: "none !important",
    },
  },
  answer: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: "15px",
    fontWeight: "400",
    lineHeight: "22px",
    letterSpacing: "-0.17px",
    my: "auto",
  },
  userQuizCard: (width, isDrawer) => ({
    minWidth: "176px",
    fontSize: { xs: "22px" },
    width: {
      xs: width < 450 ? "60%" : "calc(50% - 12px)",
      sm:
        !isDrawer && width > 750
          ? "calc(33% - 14px)"
          : isDrawer && width < 712
          ? "100%"
          : "calc(50% - 12px)",
      md:
        !isDrawer && width > 1015
          ? "calc(33% - 14px)"
          : width < 931
          ? "100%"
          : "calc(50% - 12px)",
      lg:
        !isDrawer && width > 1450
          ? "calc(20% - 19px)"
          : width > 1400
          ? "calc(25% - 18px)"
          : "calc(33% - 14px)",
      xl: width > 1750 ? "calc(20% - 19px)" : "calc(25% - 18px)",
    },
    maxWidth: "300px",
    height: { xs: "120px", sm: "140px", lg: "140px" },
  }),
};
