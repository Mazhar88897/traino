import { COLORS } from "../../theme";

export const Style = {
  wrapper: {
    boxSizing: "border-box",
    display: "flex",
    flexWrap: "noWrap",
    overflow: "auto",
    top: "0 !important",
  },
  main: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "calc(100% - 40px)",
  maxWidth:  { xs: "600px", sm: "400px" },
    bgcolor: COLORS.white,
    color: COLORS.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    boxShadow: 24,
    gap: "10px",
    borderRadius: "10px",
    p: { xs: 2, sm: 4 },
    boxSizing: "border-box",
    outline: 'none'
  },
  actionBtn: {
    color: COLORS.black,
    alignSelf: "flex-end",
    width: "24px",
    height: "24px",
    cursor: "pointer",
  },
};
