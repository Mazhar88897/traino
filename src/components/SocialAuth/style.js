export const Style = {
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  images: (index) => ({
    width: "86px",
    objectFit: "contain",
    height: index === 1 ? "50px" : "75px",
    cursor: "pointer",
  }),
};
