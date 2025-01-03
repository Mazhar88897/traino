import { globalStyle } from "../../../../styles/globalStyle";

export const style = {
  wrapper: {
    width: '100%',
    // maxWidth: '1990px',
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    p: {
      xs: "24px 0", sm: "24px 10px"
      , md: "30px 30px"
    },
  },
  contanier: {
    width: "100%",
    height: '100%',
    // maxWidth: "1974px",
    border: "2px dashed #D3D3D3",
    background: "#FFFFFF"
  },
  header: (height) => ({
    margin: '0 auto',
    // maxWidth: '1860px',
    minHeight: { xs: "100px", sm: height < 875 ? "60px" : "80px" },
    display: "flex",
    alignItems: { xs: "start", md: "center" },
    flexDirection: { xs: "column", md: "row" },
    justifyContent: "space-between",
    p: { xs: '10px 12px', sm: '20px 30px', md: "0px 40px" },
  }),
  questionSectionWrapper: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    p: { xs: "0", sm: "0 20px" },
    pb: "0px",
  },
  questionSectionContanier: {
    // maxWidth: "1185px",
    width: "100%",
    height: "100%",
  },
  questionSectionHeader: {
    display: "flex",
    alignItems: "center",
    color: '#1F1F1F',
    fontFamily: 'Rubik',
    fontSize: { xs: '16px', sm: "20px", md: '24px' },
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '36px',
    backgroundColor: "#F6F6F6",
    p: "12px 20px",
  },
  optionListWrapper: { display: "flex", flexDirection: "column" },
  optionList: (height) => ({
    width: '100%',
    // maxWidth: '1860px',
    margin: '0 auto 10px',
    minHeight: height < 875 ? "80px" : '130px',
    borderRadius: '7px',
    background: '#F6F6F6',
    color: '#1F1F1F',
    fontFamily: 'Rubik',
    fontSize: '24px',
    fontWeight: '500',
    lineHeight: '36px',
  }),
  bottomBtnWrapper: {
    display: "flex",
    justifyContent: "felx-end",
    // maxWidth: "1185px",
    flexDirection: "row-reverse",
    width: "100%",
  },
  bottomBtnContainer: (height) => ({
    display: "flex",
    margin: height < 875 ? "0 0 15px" : "20px 0px",
    gap: "16px",
  }),
  quizHeading: {
    color: '#1F1F1F',
    fontFamily: 'Rubik',
    fontSize: {xs: '20px', xl: '22px'},
    fontWeight: '500',
    lineHeight: '41px',
    letterSpacing: '-0.2px',
  },
  correctOptionContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  boldHeading: {
    fontSize: "16",
    color: "#000000",
    fontWeight: 800,
  },
  loader: { width: "100%", height: "auto" },
  quizContainer: {
    gap: "16px",
    display: "flex",
    mt: { xs: 1, sm: 0 },
    alignItems: "center",
    alignSelf: { xs: 'end', md: 'center' }
  },
  select: {
    "& .MuiSelect-select": {
      border: "2px solid #000000 !important",
    },
  },
  answerContainer: (height) => ({
    margin: `${height < 875 ? "18px" : "20px"} auto 0`,
    height: height < 875 ? '50px' : '60px',
    display: 'flex',
    alignItems: 'center',
    px: '4px',
    pr: '10px',
    // maxWidth: '1850px',
    gap: 2,
    borderRadius: '5px',
    background: '#F2F2F2',
    cursor: 'pointer',
    border: 'none',
  }),
  answerNo: (isActive, height) => ({
    width: height < 875 ? "40px" : '50px',
    minWidth: height < 875 ? "40px" : '50px',
    height: height < 875 ? "40px" : '50px',
    borderRadius: '4px',
    background: isActive ? '#3447D4' : '#D7DAF5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: isActive ? "#fff" : '#1F1F1F',
    fontFamily: 'Rubik',
    fontSize: '20px',
    fontWeight: '400',
    lineHeight: '41px',
    letterSpacing: '-0.2px',
  }),
  toggleStyle: (isFirst) => ({
    "& .MuiSwitch-switchBase": {
      padding: isFirst ? "14.3px 13.5px 14.3px 15px" : "14.3px 14px 14.3px 15px", // Padding for the thumb
      "&.Mui-checked": {
        transform: "translateX(16px)", // Moves the thumb to the right when checked
        color: "#FFF", // Thumb color when checked
        padding: isFirst ? "14.3px 13.5px 14.3px 11px" : "14.3px 14px 14.3px 11px", // Padding for the thumb
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
      opacity: 1
    },
  }),
  labelToggle: {
    mr: 0,
    ml: 0,
    pb: 0.5,
    width: { xs: '45px', lg: '35px' },
  },
  answer: {
    color: '#1F1F1F',
    fontFamily: 'Rubik',
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '39px',
    letterSpacing: '-0.18px',
  }
};
