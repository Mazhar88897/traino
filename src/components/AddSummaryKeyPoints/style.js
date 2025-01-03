import { globalStyle } from "../../styles/globalStyle";

export const Style = {
  wrapper: { display: "flex", flexDirection: "column", flexGrow: 1, flex: 1 },
  titleContainer: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  contentContainer: (width) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
    border: "2px dashed #D3D3D3",
    px: { xs: "16px", md: "40px" },
    py: "16px",
    wordBreak: "break-all",
    width: "calc(100% - 16px)",
    background: "#fff",
    // maxWidth: '1028px',
    xs: "100%",
    md: "calc(100% - 60px)",
    xl: `calc(100% - 100px + ${width > 0 ? (width < 40 ? width : 40) : 0}px)`,
    margin: "16px auto 0",
  }),
  header: {
    display: "flex",
    flexDirection: { xs: "column-reverse", sm: "row" },
    justifyContent: "space-between",
    alignItems: "center",
  },
  paraText: {
    ...globalStyle.headings,
    color: "#968F8F",
    fontSize: "20px",
    fontWeight: 700,
    letterSpacing: "2px",
  },
  addIcon: {
    color: "#968F8F",
    marginTop: "10px",
    fontSize: "60px",
    cursor: "Pointer",
  },
  leftContainerContent: {
    maxWidth: "320px",
    wordBreak: "break-word",
    height: "150px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: { xs: "100%", sm: "calc(100% - 20px)" },
    mt: 3,
  },
  heading: {
    color: "#1F1F1F",
    fontFamily: "Rubik",
    fontSize: { xs: "26px", sm: "28px", xl: "32px" },
    fontWeight: "500",
  },
  content: {
    color: "#4B4B4B",
    textAlign: "center",
    fontFamily: "Rubik",
    fontSize: { xs: "16px", sm: "18px", xl: "20px" },
    fontWeight: "400",
    lineHeight: "30px",
    mt: 1,
  },
};