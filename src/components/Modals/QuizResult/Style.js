export const Style = {
  main: {
    color: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "start",
    width: { xs: "calc(100% - 20px)", sm: "calc(100% - 40px)" },
    maxWidth: "630px",
    scrollbarWidth: "thin",
    overflow: "auto",
    height: { xs: "80vh", sm: "95vh" },
    maxHeight: "700px",
    padding: { sm: "28px 32px" },
    outline: "none",
    borderRadius: "12px",
  },
  closeIcon: {
    borderRadius: "4px",
    p: { xs: 0.25, sm: 0.5 },
    fontSize: { xs: "24px", sm: "35px" },
    background: "#F6F6F6",
    cursor: "pointer",
  },
  quizHeading: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: { xs: "18px", sm: "26px" },
    fontWeight: "500",
    lineHeight: "39px",
  },
  timeSpent: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: { xs: "13px", sm: "20px" },
    fontWeight: "400",
    lineHeight: "25px",
  },
  finishPara: {
    color: "#1F1F1F",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: { xs: "16px", sm: "20px" },
    fontWeight: "300",
    lineHeight: { xs: "22px", sm: "32px" },
    px: { xs: 0, sm: 4 },
    mt: 1,
  },
  courseName: {
    color: "#3447D4",
    fontFamily: "Rubik",
    fontSize: { xs: "16px", sm: "20px" },
    fontWeight: "400",
    lineHeight: { xs: "22px", sm: "32px" },
  },
  accuracy: {
    color: "#1F1F1F",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: { xs: "16px", sm: "20px" },
    fontWeight: "400",
    lineHeight: "25px",
    mt: 2.5,
  },
  pointsHeading: {
    color: "#1F1F1F",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: { xs: "16px", sm: "22px" },
    fontWeight: "500",
    lineHeight: "25px",
  },
  pointNo: {
    color: "#3447D4",
    fontFamily: "Rubik",
    fontSize: { xs: "20px", sm: "26px" },
    fontWeight: "500",
    lineHeight: "25px",
    ml: { xs: "2px", sm: "10px" },
  },
  pointSymbol: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: { xs: "20px", sm: "26px" },
    fontWeight: "400",
    lineHeight: "25px",
  },
  statisticContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    gap: "12px",
    borderRadius: "7px",
    border: "1px solid #D9D9D9",
    alignSelf: "center",
    width: { xs: "100%", sm: "calc(100% - 50px)" },
    boxSizing: "border-box",
    minHeight: "110px !important",
    maxHeight: "110px !important",
    mt: { xs: 1.5, sm: 2 },
  },
  statisticChildContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    px: { xs: 2, sm: 4 },
  },
  questionNo: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: { xs: "22px", sm: "24px" },
    fontWeight: "500",
    lineHeight: { xs: "32px", sm: "36px" },
  },
  statisticHeading: {
    color: "#4B4B4B",
    fontFamily: "Rubik",
    fontSize: { xs: "12px", sm: "16px" },
    fontWeight: "400",
    lineHeight: "25px",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    gap: 1.5,
    mt: 4,
  },
  button: {
    display: "flex",
    width: "194px",
    height: "44px",
    padding: "8px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
    border: "1px solid #EDEFFF",
    background: "#EDEFFF",
    boxSizing: "border-box",
    color: "#1F1F1F",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: { xs: "14px", sm: "16px" },
    fontWeight: "500",
    lineHeight: "24px",
    boxShadow: "none",
    "&:hover": {
      background: "#EDEFFF",
      boxShadow: "none",
    },
  },
  buttonTxt: {
    color: "#1F1F1F",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: { xs: "14px", sm: "16px" },
    fontWeight: "500",
    lineHeight: "24px",
  },
};
