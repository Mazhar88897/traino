export const Style = {
  main: (isArrow, left, sort) => ({
    position: "absolute",
    top:
      sort == "desc" && !isArrow
        ? { xs: "100px", sm: "90px" }
        : { xs: "60px", sm: "50px" },
    boxShadow: "0 0 10px 2px rgba(0,0,0,0.2)",
    background: "white",
    zIndex: "10",
    left: { xs: `calc(${left} - 10px)`, sm: left },
    p: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
  }),
  sortContent: { display: "flex", gap: "15px", p: { xs: "5px 0", sm: "5px" } },
  icon: { fontSize: "18px" },
};
