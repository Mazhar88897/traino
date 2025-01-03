import { COLORS } from "../../../../theme";

export const Style = {
  formWrapper: {
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    background: "#FFF",
    flexGrow: 1,
    borderRadius: '10px',
    p: "16px 8px",
    height: "100%",
    boxShadow: '0px 4px 39px 0px rgba(81, 69, 159, 0.08)',
    mt: 4,
  },
  form: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  formContainer: {
    background: COLORS.white,
    borderRadius: "16px",
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: { xs: "0px", md: "20px" },
    p: { xs: 0, sm: "0 10px", md: "0 20px 0 0" },
  },
  formSection: {
    mt: { xs: 2.5, md: 0 },
    display: "flex",
    flexDirection: { xs: 'column', md: "row" },
    justifyContent: 'start',
    gap: { xs: "0 10px", md: "0 20px", lg: "0 40px" },
    width: '100%',
    p: { xs: "16px 10px", sm: "40px 8px 0", lg: "40px 20px 0 15px" },
    boxSizing: "border-box",
    flexWrap: "wrap",
  },
  formBox: {
    width: { xs: "100%", md: 'calc(50% - 10px)', lg: 'calc(50% - 20px)' }, height: '108px', maxWidth: "800px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: '5px',
      border: '1px solid #EEE !important',
    },
    "& .react-tel-input": {
      borderRadius: '5px',
      border: '1px solid #EEE',
    },
    "& .flag-dropdown": {
      borderTopLeftRadius: '5px !important',
      borderBottomLeftRadius: '5px !important',    
    },
    "& .Mui-focused > .MuiOutlinedInput-notchedOutline": {
      borderColor: '#4156F9 !important',
      borderWidth: '1px !important',
      outline: 'none',
    }
  },
  fieldsWrapper: (isDrawer) => ({
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "end",
  maxWidth:  "800px",
    border: 'none',
    ml: 0,
    mr: 0,
  }),
  label: (isDrawer) => ({
    width: "100%",
    color: '#313131',
    fontFamily: 'Rubik',
    fontSize: '14px',
    fontWeight: '400',
  }),
  textField: {
    width: {
      xs: "100%",
      md: "100%",
    },
  maxWidth:  "800px",
    textAlign: "end",
  },
  btnContainer: {
    mt: 0,
    mb: '24px',
    display: "flex",
    gap: "15px",
    justifyContent: "end",
    mr: {xs: '10px', sm: '18px', md: '28px', lg: '40px'}
  },
  loaderContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
