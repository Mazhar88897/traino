import { globalStyle } from "../../../styles/globalStyle";
import { COLORS } from "../../../theme";

export const Style = {
  wrapper: (isAssignAble) => ({
    maxWidth: isAssignAble ? "990px" : "650px",
    height: { xs: "800px", md: "580px" },
    maxHeight: '96vh',
    overflowY: 'auto',
    borderRadius: "0px",
    padding: "0px !important",
    textAlign: "start",
    gap: "0px",
  }),
  header: {
    width: "100%",
    height: "70px",
    backgroundColor: "#0D2F48",
    display: "flex",
    alignItems: "center",
    padding: "12px",
  },
  container: (isAssignAble) => ({
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: { xs: isAssignAble ? "column-reverse" : "column", md: "row" },
  }),
  leftSide: {
    width: { xs: "100%", md: "30% !important" },
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    p: { xs: "30px", md: "12px" },
    borderRight: { xs: "none", md: "2px solid #BEA5A5" },
  },
  leftSideChild: { display: "flex", flexDirection: "column" },
  uploadDocumnet: {
    ...globalStyle.subHeading,
    height: "55px",
    color: COLORS.white,
    justifyContent: "center",
    mb: 2
  },
  buttonsContainer: {
    marginTop: { xs: "16px", md: "0px" },
    display: "flex",
    justifyContent: { xs: "center", md: "flex-end" },
    gap: "15px",
    border: '1px solid #E2E2E2 !important',
    "& .MuiOutlinedInput-notchedOutline": {
      // borderColor: '#E2E2E2'
      border: '1px solid #E2E2E2 !important',
    }
  },
  absContainer: {
    position: 'absolute',
    bottom: '30px',
    left: '50px'
  },
  rightSide: (isAssignAble) => ({
    width: { xs: "100%", md: isAssignAble ? '70%' : "100%" },
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: 'center',
  }),
  rightSideChild: {
    width: 'calc(100% - 40px)',
    maxWidth: { sm: "633px" },
    height: { xs: "200px", md: "275px" },
    border: "2px solid #BEA5A5 ",
    borderStyle: "dashed",
    m: "30px",
    mb: "0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  setReminderBtn: {
    my: "16px",
    mt: 0,
    maxWidth: "100%",
    backgroundColor: "#ab1b1b",
    color: "white !important",
    fontSize: "12px",
    justifyContent: "space-between",
    p: "8px 14px",
    textTransform: "capitalize",
    height: "55px",
    "&:hover": {
      background: "#ab1b1b",
    },
  },
  uploadSectionContainer: (isAssignAble) => ({
    width: { xs: "100%", md: "633px" },
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    cursor: isAssignAble ? 'not-allowed' : 'pointer'
  }),
  uploadImage: { width: "230px", height: "120px" },
  cancelDocumentAction: {
    width: "100px",
    mt: { md: "16px" },
    mr: { xs: "-18px", md: "30px" },
  },
  cancelInputButtonContainer: {
    boxSizing: 'border-box',
    mt: { xs: "20px", sm: 0 },
    pr: "30px",
    display: 'flex',
    flexDirection: { xs: "column", sm: 'row', },
    alignItems: { xs: 'end', md: 'end' },
    pl: '28px',
    boxSizing: 'border-box',
    width: 'calc(100% - 40px)',
    maxWidth: { sm: "693px" },
  },
  editInput: {
    width: "100%",
    height: '46px',
    fontSize: '16px',
    padding: '0',
    color: '#1F1F1F',
    fontFamily: 'Rubik',
    fontSize: '18px',
    fontWeight: '400',
    mt: { xs: 1 }
  },
  textarea: {
    resize: 'none',
    width: "100%",
    height: '90px',
    fontSize: '16px',
    padding: '12px',
    marginTop: '8px',
    color: '#1F1F1F',
    fontFamily: 'Rubik',
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '32px',
    borderRadius: '7px',
    border: '1px solid #E2E2E2'
  },
  saveButtonContainer: {
    display: 'flex',
    justifyContent: { xs: 'center', md: 'end' },
    flex: 1,
    pl: '15px',
    boxSizing: 'border-box',
    maxWidth: { xs: 'calc(100vw - 10px)' }
  },

  main: {
    p: 0,
    maxWidth: "560px",
    overflowX: 'hidden',
    maxHeight: 'calc( 100vh - 40px )',
    scrollbarWidth: 'thin'
  },
  form: (isNew) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    borderRight: { lg: isNew && '1px dotted #DBD3D3' },
    color: "#1F1F1F",
    height: "100%",
    gap: { xs: "16px", xl: '18px' },
    px: { xs: 1.5, md: 2, md: 4 },
    pb: {xs: 3.5, xl: 5},
    pt: {xs: 2, xl: 4},
    "& .MuiOutlinedInput-notchedOutline": {
      border: '1px solid #E2E2E2 !important',
    }
  }),
  formControlContainer: {
    width: '100%',
    "& .Mui-focused > .MuiOutlinedInput-notchedOutline": {
      borderColor: '#4156F9 !important',
      // border: '1px solid #EEE !important',
      borderWidth: '1px !important',
      outline: 'none',
    }
  },
  buttonsContainer: {
    borderRadius: '7px',
    marginTop: { xs: 1.5 },
    display: "flex",
    justifyContent: { xs: "center", md: "flex-end" },
    gap: "15px",
    maxWidth: '100%',
    border: 'none !important',
    outline: 'none',
    "&::focused": {
      borderColor: '#4156F9 !important',
      borderWidth: '1px !important',
    }
  },
  dateTimePicker: {
    height: '51px',
    "& .MuiOutlinedInput-notchedOutline": {
      height: '51px',
      // borderColor: '#E2E2E2',
      border: '1px solid #E2E2E !important',
      borderRadius: '7px',
      outline: 'none',
    },
    "& .MuiInputBase-input": {
      height: '14px',
      color: '#1F1F1F',
      fontFamily: 'Rubik',
      fontSize: '18px',
      fontWeight: '400',
    },
  },
  button: {
    width: '50%',
    maxWidth: '112px'
  },
  thumbnail: {
    width: '21px',
    height: '21px'
  },
  photoContainer: {
    width: '100%',
    display: 'flex',
    position: 'relative',
    height: '160px'
  },
  documentImg: {
    width: '100%',
    objectFit: 'cover',
    zIndex: '0'
  },
  uploadFile: {
    position: 'absolute',
    bottom: '24px',
    right: '36px',
    background: '#fff',
    color: '#1F1F1F',
    fontFamily: 'Rubik',
    fontSize: '16px',
    fontWeight: '400',
    height: '36px',
    textTransform: 'inherit',
    "&:hover": {
      background: '#fff'
    }
  },
  heading: {
    color: '#1F1F1F',
    fontFamily: 'Rubik',
    fontSize: { xs: '18px', xl: '20px' },
    fontWeight: '500',
    textAlign: 'start'
  },
  optional: {
    color: '#4B4B4B',
    opacity: '0.7',
    fontWeight: '400'
  },
  listMain: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    flexWrap: 'wrap',
    px: 2.5,
    width: '100%',
    maxWidth: '600px'
  },
  subHeading: {
    color: '#1F1F1F',
    fontFamily: 'Rubik',
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '32px',
    mr: { xs: 0, md: 10 }
  },
  saveButton: {
    maxWidth: '330px',
    width: '100%',
    alignSelf: 'center'
  },
  flexContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    gap: '16px'
  },
  dueDatePara: {
    display: 'flex',
    gap: '6px',
    mb: '-4px'
  }
};
