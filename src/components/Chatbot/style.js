import { IMAGES } from "../../theme";

export const Style = {
  wrapper: (isFull) => ({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    py: 3,
    px: 1,
    boxSizing: "border-box",
    width: "100%",
    // maxWidth:  '1430px',
    maxWidth: isFull ? "1920px" : "1430px",
    mx: "auto",
  }),
  dashedBorder: (isCenter) => ({
    display: "flex",
    flexDirection: "column",
    border: "2px dashed #D3D3D3",
    p: { xs: 1, sm: 2 },
    alignItems: isCenter && "center",
    justifyContent: isCenter && "center",
    mt: 2,
    background: "#fff",
    flex: 1,
    flexGrow: 1,
    minHeight: { xs: "300px", sm: "250px" },
    overflow: "auto !important",
    maxHeight: { xs: "calc(100vh - 250px)", sm: "calc(100vh - 350px)" },
  }),
  titleContainer: { display: "flex", gap: "15px", alignItems: "center" },
  title: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: { xs: "18px", sm: "20px", md: "30px", lg: "30px", xl: "30px" },
    fontWeight: "500",
    lineHeight: { xs: "30px", sm: "30px", md: "41px", lg: "41px", xl: "41px" },
    letterSpacing: "-0.28px",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
    overflow: "hidden",
    wordBreak: "break-all",
  },
  content: {
    minHeight: "150px",
    flexDirection: "column",
    display: "flex",
    flex: 1,
    flexGrow: 1,
    overflowY: "auto",
    p: { xs: 1.25, sm: 2 },

    "&::-webkit-scrollbar": {
      width: "6px",
    },

    "&::-webkit-scrollbar-track": {
      backgroundColor: "white",
    },

    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#BEBEBF",
      borderRadius: "4px",
    },

    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#AEAEAF",
    },

    // Scrollbar button for up arrow
    "::-webkit-scrollbar-button:single-button:vertical:decrement": {
      backgroundImage: `url(${IMAGES.up})`,
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      height: "6px",
      width: "10px",
      border: "none",
      display: "block",
    },

    // Scrollbar button for down arrow
    "::-webkit-scrollbar-button:single-button:vertical:increment": {
      backgroundImage: `url(${IMAGES.down})`,
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      height: "6px",
      width: "10px",
      border: "none",
      display: "block",
    },

    // Ensure buttons fit inside the narrow scrollbar
    "&::-webkit-scrollbar-button:vertical": {
      backgroundColor: "transparent",
      width: "8px",
    },

    color: "#4B4B4B",
    fontFamily: "Rubik",
    fontSize: { xs: "15px", xl: "22px" },
    fontWeight: "400",
    lineHeight: { xs: "30px", xl: "44px" },
    wordBreak: "break-word",
  },

  points: {
    display: "block",
    pl: { xs: 2.5, sm: 4 },
    overflow: "visible",
    borderLeft: "2px dashed #DBDBDC",
    position: "relative",
  },
  pointsPara: {
    display: "block",
    transform: "translateY(-6px)",
    color: "#4B4B4B",
    fontFamily: "Rubik",
    fontSize: { xs: "14px", sm: "18px", xl: "20px" },
    fontWeight: "400",
    lineHeight: { xs: "30px", sm: "40px", xl: "40px" },
    height: "100%",
    wordSpacing: { xs: "0px", sm: "10px" },
    letterSpacing: { xs: "0px", sm: "2px" },
    overflow: "visible !important",
    "word-break": "auto-phrase",
    "&::-webkit-scrollbar": {
      width: "0px",
    },
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    mt: "10px",
    background: "#FFF",
    height: "52px",
    borderRadius: "12px !important",
    border: "1px solid #CBD5E1",
    boxShadow: "0px 4px 8px -2px rgba(23, 23, 23, 0.10)",
    px: "4px",
    boxSizing: "border-box",
  },
  inputBase: {
    ml: 1,
    flex: 1,
    fontSize: { xs: "16px", xl: "18px" },
    fontFamily: "Rubik",
  },
  divider: { height: 28, m: 0.5 },
  sendIcon: { p: "10px" },
  loaderContainer: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
};
