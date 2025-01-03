export const Style = {
  main: (isProgress) => ({
    height: "100vh",
    background: isProgress ? "#FEFEFE" : "inherit",
    flexGrow: 1,
    width: '100%',
    display: "flex",
    gap: '40px',
    pb: '40px',
    boxSizing: 'border-box',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }),
};
