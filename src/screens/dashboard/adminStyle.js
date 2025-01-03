import { COLORS } from "../../theme";

export const style = {
  bgContainer: {
    backgroundColor: "#6A7CFF",
    mt: {xs: 1.5},
    width: "calc(100% + 41px)",
    ml: "-25px",
    display: { xs: "none", lg: "block" },
    height: {xs: "113px", xl: '126px'},
    pr: 0.5,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: { md: "flex-start", xs: "center" },
    width: "100%",
  },
  hederTitle: {
    maxWidth:  "1510px",
    width: "100%",
    margin: "0 auto",
    px: 4,
    pt: {xs: 1.5, xl: 2.5},
    color: COLORS.white,
    fontFamily: "Rubik",
    fontSize: {xs: "26px", xl: '28px'},
    fontWeight: 500,
  },
  maxWidthContainer: {
    maxWidth:  "1500px",
    width: "100%",
    margin: "0 auto",
    pt: 3,
    pr: 0.5,
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: { xs: "center", lg: "space-between" },
    gap: {xs: '15px 10px', md: "25px 10px"},
    flexWrap: "wrap",
  },
  browseMain: {
    borderRadius: "10px",
    background: "#6A7CFF",
    pb: 0,
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    alignItems: "start",
    justifyContent: { xs: "start", lg: "center" },
    mt: { xs: 4, md: 2 },
    height: { xs: "183px", xl: '220px' },
    minHeight: 'fit-content',
    position: "relative",
    boxShadow: "0px 18px 40px 0px rgba(112, 144, 176, 0.12)",
  },
  browseHeading: {
    color: "#FFF",
    fontFamily: "Rubik",
    fontSize: "28px",
    fontWeight: "600",
    lineHeight: "130%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "inline",
  maxWidth:  "100%",
  },
  browseText: {
    color: "#FFF",
    fontFamily: "Rubik",
    fontSize: {xs: "20px", xl: '23px'},
    fontWeight: "400",
    lineHeight: "130%",
    maxWidth:  "280px",
    pr: "20px",
  },
  browseContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    boxSizing: "border-box",
  },
  browseButton: {
    color: "#3447D4",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: {xs: "16px", xl: '18px'},
    fontWeight: "500",
    lineHeight: "100%",
    width: 'calc(50% + 7px)',
    maxWidth:  {xs: "156px", xl: "200px"},
    minHeight: {xs: "33px", xl: '40px'},
    p: "8px 14px",
    borderRadius: "4px",
    border: "1px solid #6A7CFF",
    background: "#FFF",
    mt: 2,
    textTransform: "inherit",
    "&:hover": {
      background: "#EDEDED",
    },
  },
  blueBgBottom: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    width: "100%",
    maxWidth:  { lg: "340px", xl: '420px' },
    p: { xs: 2, md: 4 },
    pr: { xs: 2, md: 0 },
    pl: { xs: 1, md: 1.5 },
  },
  illustration: {
    position: "absolute",
    bottom: "-7px",
    right: "-20px",
    width: 'calc(50% + 7px)',
    maxWidth:  { xs: "150px", xl: '170px' },
    maxHeight: "100%",
    display: "flex",
    alignSelf: "end",
  },
  addFiledhWrapper: {
    mt: 1.5,
    p: "2px 10px 2px 4px",
    display: "flex",
    alignItems: "center",
    width: { xs: "100%" },
    borderRadius: "8px !important",
    boxShadow: "none",
    border: "1px solid #D7DBE7",
    height: {xs: "40px", xl: '50px'},
    justifyContent: "space-between",
  },
  addIconContainer: { p: "10px 4px 10px 6px" },
  addImg: { width: {xs: "21px", xl: '24px'} },
  addInput: {
    ml: 1,
    flex: 1,
    fontFamily: "Rubik",
    fontSize: {xs: "16px", xl: '18px'},
    fontWeight: "400",
    opacity: "1",
    "& input::placeholder": {
      color: "#000",
      opacity: "0.9",
    },
  },
  firstConatiner: {
    display: "flex",
    flexDirection: { xs: "column", lg: "row" },
    gap: {lg: "15px"},
  },
  child1: (isSuperAdmin) => ({
    width: { xs: "100%", lg: "62%" },
    // maxWidth:  { lg: isSuperAdmin ? "911px" : "1190px" },
  }),
  child2: (isSuperAdmin) => ({
    width: { xs: "100%", lg: "38%" },
  // maxWidth:  { lg: isSuperAdmin ? "310px" : "415px" },
  }),
  productivityContainer: {
    minHeight: {xs: "378px", xl: '390px'},
    p: { xs: 1.5, sm: 2, md: 3 },
    mt: 2,
    boxShadow: "0px 4px 39px 0px rgba(81, 69, 159, 0.08)",
    borderRadius: "12px",
  },
  productivityTitle: {
    fontFamily: "Rubik",
    fontWeight: "500",
    fontSize: {xs: "18px", xl: '20px'},
  },
  staticticsTitle: {
    fontFamily: "Rubik",
    fontSize: {xs: "16px", xl: '18px'},
    color: "#8B8B8B",
  },
  chartSection: {
    width: '100%',
    display: "flex",
    justifyContent: { xs: "center", lg: "space-between" },
    alignItems: "center",
    gap: { xs: "20px", md: "30px", lg: 0 },
  },
  time: {
    fontSize: {xs: "32px", xl: '34px'},
    fontFamily: "Rubik",
    fontWeight: 500,
  },
  productivitySections: {
    display: "flex",
    gap: "6px",
    alignItems: "center",
    mt: {xs: 0.5, xl: 1}
  },
  firstBullet: {
    borderRadius: "100px",
    backgroundColor: "#5D6CDD",
    width: {xs: "14px", xl: '16px'},
    height: {xs: "14px", xl: '16px'},
  },
  secondBullet: {
    borderRadius: "100px",
    width: "14px",
    height: "14px",
    backgroundColor: "#6BC497",
  },
  thirdBullet: {
    borderRadius: "100px",
    backgroundColor: "#FF912B",
    width: "14px",
    height: "14px",
  },
  bulletPoint: {
    color: "#141414",
    fontFamily: "Rubik",
    fontSize: {xs: "16px", xl: "18px"},
    fontWeight: "400",
    lineHeight: "20px",
  },
  secondContainer: {
    display: "flex",
    zIndex: 1,
    gap: "0 12px",
    justifyContent: "space-between",
    flexDirection: { xs: "column", lg: "row" },
  },
  child3: (isSuperAdmin) => ({ 
    width: { xs: "100%", lg: isSuperAdmin ? "100%" : "69%" } 
  }),
  child4: {
    width: { xs: "100%", lg: "31%" },
    display: "flex",
    flexDirection: { xs: "column", md: "row", lg: "column" },
    gap: "0 20px",
  },
  toDoContainer: {
    padding: '24px 16px',
    boxShadow: '0px 4px 39px 0px rgba(81, 69, 159, 0.08)',
    borderRadius: "12px",
    backgroundColor: "#fff",
    mt: { xs: 4, md: 2, lg: 4 },
    overflow: "hidden",
    minHeight: "238px",
    width: { xs: "100%", md: "50%", lg: "100%" },
    display: "flex",
    flexDirection: "column",
  },
  toDoTitle: {
    fontFamily: "Rubik",
    fontSize: {xs: "20px", xl: '22px'},
    fontWeight: "500",
    lineHeight: "24px",
  },
  remainingText: {
    fontFamily: "Rubik",
    fontSize: {xs: "14px", xl: '16px'},
    fontWeight: "400",
    lineHeight: "14px",
    my: 1,
  },
  checkListText: {
    fontFamily: "Rubik",
    fontSize: {xs: "14px", xl: "16px"},
    fontWeight: "400",
    lineHeight: "17px",
    display: "flex",
    gap: "6px",
    alignItems: "center",
    my: 1.25,
  },
  checkBox: {
    ml: '-5px',
    boxSizing: 'border-box',
    width: {xs: "22px", xl: '28px'},
    height: {xs: "16px", xl: '20px'},
    padding: "4px 0px",
    gap: "0px",
    borderRadius: "2px 0px 0px 0px",
    justifyContent: "space-between",
    "&.Mui-checked": {
      color: "#4156F9",
    },
  },
  checkLabel: (isChecked) => ({
    color: isChecked ? "#4B4B4B" : "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: {xs: "14px", xl: '16px'},
    fontWeight: "400",
    lineHeight: "20px",
    opacity: isChecked ? "0.5" : 1,
  }),
};