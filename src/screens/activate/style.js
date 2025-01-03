import { globalStyle } from "../../styles/globalStyle";
import { COLORS } from "../../theme";

export const Style = {
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: "16px",
    height: "100vh",
    px: "16px",
  },
  succesIcon: { fontSize: "80px", color: COLORS.green },
  errorIcon: { fontSize: "80px", color: COLORS.red },
  heading: { ...globalStyle.headings, fontSize: { xs: "20px", sm: "24px" } },
  message: {
    ...globalStyle.headings,
    textAlign: "center",
  maxWidth:  { xs: "300px", sm: "600px", md: "900px" },
  },
  loaderContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
