import { COLORS } from "../../theme";

export const Style = {
  formSection: {
    height: "100%",
    color: COLORS.black,
    background: "white",
    display: "flex",
    alignSelf: "center",
    pl: "10px",
    width: "100%",
    // maxWidth: '450px'
  },
  columnContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },

  inputHeight: {
    height: { xs: "35px", md: "50px", lg: "50px", xl: "50px" },
  },
  form: {
    fontFamily: "serif",
    display: "flex",
    flexDirection: "column",
    justifyContent: {
      xs: "start",
      sm: "center",
      md: "center",
      lg: "center",
      xl: "center",
    },
    height: "100%",
    width: "100%",
  },
  heading: (height, width) => ({
    color: "#1F1F1F",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: {
      xs: "24px",
      sm: height < 622 || width < 1030 ? "24px" : "27px",
    },
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "21px",
    display: "inline",
  }),
  traino: (height, width) => ({
    color: "#3447D4",
    fontWeight: "600",
    fontSize: {
      xs: "24px",
      sm: height < 622 || width < 1030 ? "24px" : "27px",
    },
    fontFamily: "Rubik",
    ml: "4px",
  }),
  ai: (height, width) => ({
    color: "#697AFC",
    fontWeight: "600",
    fontSize: {
      xs: "24px",
      sm: height < 622 || width < 1030 ? "24px" : "27px",
    },
    fontFamily: "Rubik",
  }),
  loginInfo: (height, width) => ({
    color: "#1F1F1F",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: {
      xs: height < 622 || width < 1030 ? "12px" : "13px",
      sm:
        height < 660 || width < 1105
          ? height < 622 || width < 1030
            ? "13px"
            : "14px"
          : "15px",
    },
    fontWeight: "400",
    lineHeight: { xs: "15px", md: "16px", lg: "16px" },
  }),
  subHeading: {
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: "18px",
    fontWeight: "400",
    lineHeight: "153%",
  },
  forgetPassword: {
    // mt: 1,
    cursor: "pointer",
    color: "#3447D4",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: "14px",
    fontWeight: "400",
  },
  redirectText: {
    mt: "10px",
    lineHeight: "30px",
    gap: "10px",
    fontWeight: 500,
    color: "#1F1F1F",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: "14px",
    fontWeight: "400",
    display: "flex",
    alignSelf: "end",
    alignItems: "center",
    mr: { xs: 0, sm: "-18px !important" },
  },
  remember: {
    fontFamily: "Rubik",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: 1.5,
    cursor: "pointer",
    letterSpacing: "-0.28px",
  },
  checkbox: {
    "& .MuiSvgIcon-root": {
      fontSize: "24px !important",
      p: 0,
    },
    "&.Mui-checked": {
      color: "#4156F9",
    },
    p: 0,
  },
  rememberBox: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    cursor: "pointer",
  },
  redirect: {
    cursor: "pointer",
    background: "#EDEFFF",
    textTransform: "initial",
    width: { xs: "60px", sm: "80px" },
    p: { xs: "6px 0", sm: "6px 16px" },
    color: "#3447D4",
    fontFamily: "Rubik",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "140%",
    letterSpacing: "-0.28px",
    height: "30px",
  },
  logoContainer: {
    background: "#3346D3",
    display: "flex",
    alignItems: "center",
    alignSelf: "center",
    height: "60px",
    width: "210px",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  logo: {
    width: "200px",
    height: "30px",
    padding: "10px",
  },
  googlePara: {
    color: "#1E2265",
    fontFamily: "Rubik",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "24px",
    textTransform: "initial",
  },
  password: {
    color: "#3447D4",
    fontFamily: "Rubik",
    fontSize: "32px",
    fontWeight: "600",
  },
  formControl: {
    width: "100%",
  },
  halfButton: {
    width: "50%",
  },
  bordered: {
    borderBottom: "1px solid #D2D2D2",
    width: "35%",
  },
  or: {
    color: "#7D7D7D",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "24px",
  },
  changePasswordTittle: {
    display: { xs: "none", md: "flex" },
    fontFamily: "Rubik",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "normal",
    mt: { xs: 2, md: 4, lg: 5.5 },
  },
  btn: {
    mt: { xs: 2, md: 4, lg: 6 },
    maxWidth: "194px",
    width: "100%",
    alignSelf: "end",
  },
  container: {
    display: "flex",
    flexDirection: { xs: "column", lg: "row" },
    justifyContent: "space-between",
    width: "100%",
    mt: { xs: 1, md: 3, lg: 4 },
    gap: { xs: 1, md: 2, lg: 4.5 },
  },
  inputContainer: { maxWidth: { xs: "100%", md: "500px" }, width: "100%" },
  editFormLabel: { fontSize: "16px", fontFamily: "Rubik", fontWeight: "400" },
  inputLabel: {
    color: "#4B4B4B",
    // background: { lg: "black" },
    fontSize: { xs: "14px", md: "14px", lg: "14px" },
    lineHeight: { xs: "18px", md: "22px", lg: "22px" },
    fontFamily: "Rubik",
    "&.Mui-focused": {
      color: "#4156F9",
    },
  },
  outlineInput: {
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #EEEEEE", // Default border
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #4156F9", // Border on focus
    },
    color: "#4B4B4B",
    fontFamily: "Rubik",
    fontSize: { xs: "14px", md: "14px", lg: "14px" },
    fontWeight: "400",
    letterSpacing: "-0.28px",
  },
  rememberForgetMain: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    mt: 2,
  },
  button: (height) => ({
    width: "100%",
    borderRadius: "4px",
    backgroundColor: "#3447D4",
    mt: height < 660 ? "18px" : "35px",
  }),
  buttonText: {
    fontFamily: "Rubik",
    fontSize: "16px",
    fontWeight: "500",
  },
};
