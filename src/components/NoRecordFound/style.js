import { globalStyle } from "../../styles/globalStyle";
import { COLORS } from "../../theme";

export const Style = {
  main: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1
  },
  pera: {
    ...globalStyle.headings,
    color: COLORS.primary,
    px: "8px",
  },
};
