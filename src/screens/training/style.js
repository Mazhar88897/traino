import { globalStyle } from "../../styles/globalStyle";

export const Style = {
  quizContainer: {
    display: "flex",
    flexDirection: "column",
  },
  cardWrapper: (drawer, isFirst, width) => ({
    m: "28px auto 0",
    display: "flex",
    justifyContent: isFirst
      ? "space-between"
      : {
          xs: "center",
          sm: drawer
            ? width > 825
              ? "start"
              : "center"
            : width > 775
            ? "start"
            : "center",
          md: "start",
        },
    flexWrap: "wrap",
    gap: "26px",
    whiteSpace: "normal",
    flexGrow: "1 !important",
    width: "100%",
    boxSizing: "border-box",
  }),
  header: (activeComponent) => ({
    display: "flex",
    flexDirection: { xs: "column-reverse", sm: "row" },
    alignItems: "center",
    justifyContent: !!activeComponent?.subHeading
      ? "space-between"
      : "flex-end",
    gap: "30px",
    p: "0 10px 10px",
    mb: activeComponent?.isDocument && "50px",
    position: "relative",
  }),
  subHeading: {
    ...globalStyle.headings,
    fontSize: { xs: "20px", sm: "28px" },
    display: "flex",
    alignItems: "center",
    width: "100%",
    maxWidth: "600px",
    height: "100%",
    alignSelf: "flex-start",
  },
  trainingDepartmentNav: (activeComponent) => ({
    display: "flex",
    alignSelf: "space-between",
    gap: "16px",
    width: activeComponent?.isDepartment ? "100%" : "fit-content",
    justifyContent: "space-between",
  }),
  sortMain: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    position: "relative",
  },
  sortButton: {
    display: "flex",
    gap: "10px",
    cursor: "pointer",
    p: "12px",
  },
  tabContainer: {
    width: "100% !important",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },
  totalNo: {
    mt: 1,
    color: "#4B4B4B",
    fontFamily: "Rubik",
    fontSize: { xs: "16px", sm: "18px", md: "20px", lg: "20px", xl: "20px" },
    fontWeight: "600",
    lineHeight: "213%",
  },
  loader: {
    height: "unset",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  mainContainer: (documentsData) => ({
    width: documentsData?.length > 2 ? "100%" : "inherit",
    maxWidth: { xs: "1400px", xl: "1920px" },
  }),
  progressContainer: {
    textAlign: "center",
    marginY: 5,
  },
  documentsMain: {
    overflow: "inherit",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center !important",
    width: "100% !important",
  },
  documentSummaryMain: (width, isFull) => ({
    display: "flex",
    width: isFull
      ? "100%"
      : {
          xs: "90%",
          md: `calc(100% - 60px + ${
            width > 0 ? (width < 100 ? width : 100) : 0
          }px)`,
          xl: `calc(100% - 100px + ${
            width > 0 ? (width < 100 ? width : 100) : 0
          }px)`,
        },
    mx: "auto",
    flexGrow: 1,
  }),
  documentSummaryContainer: {
    display: "flex",
    width: "100%",
    flex: 1,
    flexGrow: 1,
  },
  allTrainingHeading: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: { xs: "18px", sm: "18px", md: "20px", lg: "20px", xl: "20px" },
    fontWeight: "400",
    lineHeight: { xs: "22px", sm: "28px", md: "35px", lg: "35px", xl: "35px" },
  },
  noRecordMain: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "400px",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  noRecordHeading: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: { xs: "22px", sm: "28px", md: "28", lg: "28", xl: "28" },
    fontWeight: "600",
    lineHeight: "38px",
    mt: 2,
  },
  noRecordText: {
    color: "#4B4B4B",
    fontFamily: "Rubik",
    fontSize: { xs: "14px", sm: "18px", md: "18px", lg: "18px", xl: "18px" },
    fontWeight: "400",
    lineHeight: "38px",
    textAlign: "center",
  },
  noRecordImg: {
    width: "100%",
    maxWidth: {
      xs: "200px",
      sm: "270px",
      md: "270px",
      lg: "270px",
      xl: "270px",
    },
  },
  createTrainingMain: {
    position: "relative",
    display: "flex",
    flexDirection: { xs: "column", lg: "row" },
    boxSizing: "border-box",
    overflow: "hidden",
    mt: 5,
    mb: 1,
    width: "100%",
    // maxWidth: '1062px',
    borderRadius: "7px 7px 0px 0px",
    background: "#FFF",
    boxShadow: "0px 4px 39px 0px rgba(81, 69, 159, 0.08)",
  },
  uploadSectionContainer: (isAssignAble) => ({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    cursor: isAssignAble ? "not-allowed" : "pointer",
  }),
  uploadImage: { width: "70px", height: "60px" },
  text: {
    mt: 2.75,
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: "20px",
    fontWeight: "500",
    lineHeight: "24px",
    width: "100%",
    display: "flex",
    textAlign: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  subText: {
    mt: 1.25,
    textAlign: "center",
    color: "#4B4B4B",
    fontFamily: "Rubik",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "18px",
  },
  browseText: {
    margin: "0px 5px",
    color: "#3447D4",
    fontFamily: "Rubik",
    fontSize: "20px",
    fontWeight: "500",
    lineHeight: "24px",
    textDecorationLine: "underline",
  },
  uploadRightSide: {
    position: "relative",
    display: "flex",
    width: { xs: "100%", lg: "50%" },
    p: { xs: "16px", md: "36px", lg: "20px" },
    pb: { xs: "130px", md: "130px", lg: "20px" },
    alignItems: "center",
    justifyContent: "center",
    "& .sc-aXZVg": {
      width: "100%",
      maxWidth: { lg: "410px" },
      height: "200px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px",
    },
  },
  mainCloseIcon: {
    position: "absolute",
    top: "15px",
    right: "30px",
    p: "4px",
    background: "#F6F6F6",
    width: "35px",
    height: "35px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex: "1",
  },
  dashedBox: {
    width: "100%",
    maxWidth: { lg: "410px" },
    height: "350px",
    border: "1px dashed #D3D3D3",
    background: "rgba(248, 248, 255, 0.60)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
  },
  uploadButton: {
    position: "absolute",
    bottom: "40px",
    right: { xs: "40px", lg: "60px" },
    width: {
      xs: "calc(100% - 80px)",
      lg: "calc(100% - 120px)",
    },
  },
  closeIcon: {
    display: "flex",
    alignSelf: "end",
    marginLeft: "auto",
    cursor: "pointer",
    background: "#E6E6E6",
    color: "#FFF",
    width: "16px",
    height: "16px",
    borderRadius: "8px",
  },
  fileName: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#fff",
    border: "1px solid rgba(81, 69, 159, 0.08)",
    height: "36px",
    lineHeight: "16px",
    // borderBottom: "3px solid #3447D4",
    width: "100%",
    padding: "10px",
    maxWidth: "350px",
    fontFamily: "Rubik",
    fontSize: "14px",
    borderRadius: "6px",
  },
  topBannerContent2: {
    color: "#4B4B4B",
    fontFamily: "Rubik",
    fontSize: { xs: "18px", xl: "20px" },
    fontWeight: "400",
    lineHeight: "22px",
  },
};
