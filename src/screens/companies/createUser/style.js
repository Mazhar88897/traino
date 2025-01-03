import { globalStyle } from "../../../styles/globalStyle";
import { COLORS } from "../../../theme";

export const Style = {
  heading: {
    ...globalStyle.subHeading,
    textAlign: "start",
    fontSize: {xs: '24px', sm: "26px"},
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    mt: 0,
    p: {xs: "20px", sm: '32px 40px 24px'},
    border: '1px solid #EEEEEE',
    width: '100%',
    maxWidth:  '100%',
    borderRadius: '14px'
  },
  headerIcon: { width: "30px", height: "25px", objectFit: "cover" },
  formWrapper: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    borderRadius: "4px",
    p: {xs: "20px", sm: "30px 40px"}
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formContainer: {
    background: COLORS.white,
    borderRadius: "16px",
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: { xs: "0px", md: "20px" },
  },
  formSection: {
    mt: { xs: 2.5, md: 0 },
    display: "flex",
    flexDirection: "row",
    gap: "0 20px",
    width: { xs: "100%", md: "100%" },
    boxSizing: "border-box",
    flexWrap: "wrap",
  },
  fieldsWrapper: () => ({
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "end",
  maxWidth:  "720px",
    pb: 0,
    ml: 0,
    mr: 0,
    "& .Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        border: '1px solid #4156F9 !important',
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: '1px solid #EEE !important',
    }
  }),
  label: () => ({
    color: '#313131',
    fontFamily: 'Rubik',
    fontSize: '14px',
    fontWeight: '400',
    width: "100%",
    textAlign: "start",
  }),
  textField: {
    width: {
      xs: "100%",
      md: "100%",
    },
  maxWidth:  "800px",
    textalign: "end",
  },
  btnContainer: {
    display: "flex",
    gap: "15px",
    justifyContent: "center",
  },
  btnStyle: (isWhite) => ({
    color: isWhite ? "#3447D4" : "#FFFFFF",
    backgroundColor: !isWhite ? "#3447D4" : "#FFFFFF",
    minWidth: "104px"
  }),
  input: {
    width: "100%",
    margin: 0,
    color: "black",
    borderRadius: "8px",
    height: "52px",
    fontSize: "16px",
    lineHeight: "18px",
    border: "none",
    outline: "none",
  },
  button: {
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
  },
  dropDown: {
    width: "100%",
    background: COLORS.white,
    position: "absolute",
    top: "56px",
    border: '1px solid rgb(200, 200, 200)',
    textAlign: "start",
    color: COLORS.black,
    boxSizing: "border-box",
    overflowY: "auto",
    zIndex: "10",
    height: "230px",
  },
  containerStyle: {
    overflow: "hidden",
    boxSizing: "border-box",
  },
  searchStyle: {
    boxSizing: "border-box",
    width: "100%",
    height: "40px",
    padding: "0 9px",
    position: "absolute",
    top: 0,
    left: 0,
  },
  inputProps: {
    name: "",
    required: true,
    autoFocus: true,
  },
  createForm: {
    height: 'fit-content',
    minHeight: "106px",
    mb: 1.5,
    width: { xs: "100%", md: "calc(50% - 10px)" },
  },
};
