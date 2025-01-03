import { COLORS } from "../../theme";

export const Style = {
  input: {
    width: "100%",
    margin: 0,
    color: "black",
    borderRadius: "8px",
    height: "52px",
    fontSize: "16px",
    lineHeight: "18px",
    border: "none",
    outline: 'none'
  },
  button: {
    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
  },
  dropDown: {
    width: "100%",
    background: COLORS.white,
    position: "absolute",
    top: "56px",
    border: '1px solid rgb(200, 200, 200)',
    textAlign: "start",
    color: COLORS.black,
    boxSizing: "border-box",
    overflowY: "auto",
    zIndex: '10',
    height: '230px',
  },
  containerStyle: {
    overflow: "hidden",
    boxSizing: "border-box",
  },
  searchStyle: {
    boxSizing: "border-box",
    width: "100%",
    height: "40px",
    padding: "0 9px",
    position: "absolute",
    top: 0,
    left: 0,
  },
  inputProps: {
    name: "",
    required: true,
    autoFocus: true,
  },
};
