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
    "&:hover": {
      backgroundColor: "gray",
      "& .hover-buttons": {
        zIndex: 1,
        opacity: 1,
        transform: "translateY(0)",
      },
      "& .content": {
        opacity: 0,
      },
    },
    position: "relative",
  },
  contentContainer: {
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    height: "auto",
    gap: "16px",
  },
  headings: {
    fontWeight: 600,
    fontSize: "30px",
    lineHeight: 1.5,
    letterSpacing: "2px",
  },
  subHeading: {
    color: COLORS.black,
    lineHeight: 1.5,
    letterSpacing: "2px",
    fontWeight: "normal",
    fontSize: 20,
  },
  btnConatiner: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 1,
    opacity: 0,
    transform: "translateY(10px)",
    transition: "opacity 0.3s, transform 0.3s",
    zIndex: 2,
  },
  btn: { width: "100px", height: "30px" },
  btnText: { fontSize: "14px" },
};
