export const Style = {
  main: {
    width: "100vw",
    maxWidth: "480px",
    background: "#fff",
    minWidth: "280px",
    justifyContent: "start",
    flexGrow: 1,
    // height: '1000px',
  },
  bgContainer: (src) => ({
    width: "100%",
    height: { xs: "50vw", sm: "212px" },
    maxHeight: "212px",
    backgroundImage: `url(${src})`,
    backgroundSize: "100% 110%",
    backgroundRepeat: "no-repeat",
    display: "flex",
    alignItems: "end",
    flexGrow: 1,
    justifyContent: "end",
    padding: "14px 31px",
  }),
  childContainer: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    mb: 2.5,
  },
  bgAssignButton: {
    color: "black",
    fontFamily: "Rubik",
    fontSize: { xs: "12px", sm: "14px" },
    fontWeight: "400",
    background: "white",
    padding: "3px 14px",
    "&:hover": {
      background: "rgb(220, 220, 220)",
    },
  },
  date: {
    color: "#3447D4",
    fontFamily: "Rubik",
    fontSize: { xs: "12px", sm: "14px" },
    fontWeight: "400",
    // background: "white",
    padding: "3px 10px",
  },
  selectBox: {
    p: { xs: "16px 24px", sm: "20px 30px" },
    pb: { xs: 0, sm: 0 },
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  name: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: { xs: "20px", sm: "24px", md: "28px" },
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "38px",
    maxHeight: "116px",
  },
  selectHeading: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: "20px",
    fontWeight: "500",
    py: "10px",
  },
  radio: {
    color: "#C3C3C3",
    "&.Mui-checked": { color: "#3447D4" },
  },
  selectBoxContainer: {
    ml: 0,
    mt: 0.8,
    height: "60px",
    width: "100%",
    borderRadius: "7px",
    border: "1px solid #E8E8E8",
    background: "rgba(235, 235, 235, 0.08)",
    "& .MuiFormControlLabel-label": {
      color: "#1F1F1F",
      fontFamily: "Rubik",
      fontSize: "16px",
      fontWeight: "400",
      lineHeight: "normal",
    },
  },
  radioGroup: {
    width: "100%",
  },
  next: {
    textTransform: "capitalize",
    color: "#FFF",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: "20px",
    fontWeight: "500",
    lineHeight: "24px",
    borderRadius: "4px",
    background: "#3447D4",
    display: "flex",
    alignSelf: "center",
    mb: 3,
    height: "56px",
    width: "calc(100% - 60px)",
    maxWidth: "420px",
    "&:hover": {
      background: "#2033d4",
    },
  },
  spaceBetween: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    mt: 1.5,
  },
  participantsMain: {
    // mt: { xs: 5, sm: 7 }
    mt: "auto",
    pt: "12px",
  },
  listContainer: {
    pl: 2.2,
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
  },
  list: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: { xs: "15px", sm: "17px" },
    fontWeight: "400",
    lineHeight: "25px",
  },
  participant: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: { xs: "16px", sm: "18px" },
    fontWeight: "400",
    lineHeight: "normal",
  },
  participantNo: {
    color: "#3447D4",
    fontFamily: "Rubik",
    fontSize: { xs: "16px", sm: "18px" },
    fontWeight: "400",
    lineHeight: "normal",
    textAlign: "end",
  },
};