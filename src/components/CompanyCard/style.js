export const Style = {
  card: (isDrawer, width) => ({
    background: "#FFF",
    width: {
      xs: "100%", sm:
        (isDrawer ? width > 800 : width > 675) ?
          'calc(50% - 12px)'
          : "100%"
      , md: (isDrawer && width < 1010) ? 'calc(50% - 12px)' : "calc(33% - 14px)"
      , lg: (isDrawer && width < 1360) ? 'calc(33% - 14px)' : 'calc(25% - 18px)'
      , xl: (isDrawer && width < 1765) ? 'calc(25% - 18px)' : 'calc(20% - 19.5px)'
    },
    minWidth: {xs: "204px", lg: '220px', xl: '240px'},
    maxWidth: { xs: "330px", sm: !isDrawer && width > 675 ? "360px" : '300px', md: '330px', xl: '340px' },
    height: { xs: "240px", sm: !isDrawer && width > 675 ? "240px" : '210px', md: "210px", xl: '260px'  },
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    borderRadius: "16px",
    gap: "6px",
    boxShadow: '0px 10px 94px 0px rgba(204, 204, 204, 0.25)',
    zIndex: '10 !important',
  }),
  img: (isPadding, isDrawer, width) => ({
    cursor: "pointer",
    height: { xs: '150px', sm: !isDrawer && width > 675 ? "150px" : '125px', md: '125px', xl: '180px' },
    objectFit: 'contain',
    maxWidth: "100%",
    alignSelf: "flex-start",
    margin: '0 auto',
    p: isPadding && "20px"
  }),
  btnContainer: { display: "flex", alignSelf: "flex-end", gap: "5px" },
  name: {
    color: '#1F1F1F',
    fontFamily: 'Rubik',
    fontSize: {xs: '22px', xl: "26px"},
    fontWeight: '500',
    cursor: "pointer",

    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "inline",
  },
  buttonIcon: {
    width: '24px',
    height: '24px',
    cursor: "pointer",
    color: "#3447D4"
  },
};
