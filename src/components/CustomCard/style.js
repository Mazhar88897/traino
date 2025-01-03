import { COLORS } from "../../theme";

export const Style = {
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    textAlign: "center",
    width: "245px",
    height: "150px",
    alignItems: "center",
    borderRadius: "10px",
    boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.5)",
  },
  topRightIcon: {
    display: "flex",
    alignSelf: "flex-end",
    pr: 1,
    pt: 1,
    cursor: "pointer",
  },
  contentContainer: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    height: "80%",
  },
  headings: {
    fontWeight: 600,
    fontSize: "20px",
    lineHeight: 1.5,
    letterSpacing: "2px",
  },
  subHeading: {
    color: COLORS.black,
    fontWeight: 600,
    fontSize: "50px",
    lineHeight: 1.5,
    letterSpacing: "2px",
  },
};
