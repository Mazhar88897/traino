export const Style = {
  main: (rows) => ({
    mt: 1,
    width: {
      xs: "100%",
    },
    background: "white",
    boxSizing: "border-box",
  }),
  tittleContainer: {
    width: "100%",
    display: "flex",
    px: 2,
    justifyContent: "space-between",
    alignItems: "center",
    background: "#12385D",
    height: "52px",
    color: "#fff",
  },
  menuIcon: { fontSize: 24, cursor: "pointer", mr: "5px" },
  tittle: { fontSize: "28px", fontFamily: "Literata", width: '100%', display: 'flex', justifyContent: 'center' },
  tableContainer: {
    display: "flex",
  maxWidth:  "100%",
    minHeight: "260px",
    padding: 0,
    height: {
      xs: "calc( (100vh - 170px) * 0.5 )",
      md: "calc( 100vh - 375px )",
    },
    maxHeight: '578px',
    "& .MuiDataGrid-columnSeparator": {
      display: 'none'
    },
    "& .MuiDataGrid-columnHeader": {
      height: "44px !important",
      outline: 'none !important',
      border: 'none !important',
      padding: '0 35px'
    },
    '& .MuiDataGrid-columnHeader:nth-of-type(2)': {
      padding: '0 0 0 9px !important',
    },
    "& .MuiDataGrid-columnHeader > div > div > div > div": {
      color: '#1F1F1F',
      fontFamily: 'Rubik !important',
      fontSize: '16px !important',
      fontWeight: '400 !important',
    },
    "& .MuiDataGrid-columnHeaders > div": {
      background: '#F4F5F7 !important',  // Targeting the immediate child divs
      height: "44px"
    },
    "& .MuiDataGrid-columnHeader--sorted": {
      outline: 'none !important',
      border: 'none !important'
    },
    "& .Mui-selected": {
      background: 'initial !important',
    },
    "& .Mui-checked": {
      color: '#6A7CFF !important'
    },
    "& .MuiDataGrid-scrollbar": {
      "&::-webkit-scrollbar": {
        width: "5px",
        height: "5px",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#12385D",
        borderRadius: "6px",
      },
    },
    '& .MuiDataGrid-cell': {
      border: 'none !important',
      outline: 'none !important',
      padding: '0 30px !important',
      color: "#4B4B4B",
      fontFamily: 'Rubik',
      fontSize: '16px',
      fontWeight: '400',
      cursor: 'pointer',
    },
    "& .MuiDataGrid-cell:focus": {
      outline: 'none !important',
    },
    "& .MuiDataGrid-cellCheckbox": {
      outline: 'none !important'
    },
    "& .MuiDataGrid-row": {
      background: '#FFF !important',
      display: 'flex',
      alignItems: 'center',
      borderBottom: "1px solid #E0E4EA",
      minHeight: '92px !important',
      maxHeight: '92px !important',
      '& .MuiDataGrid-cell:nth-of-type(2)': {
        padding: '0 0 0 9px !important',
      },  
    },
    "& .MuiDataGrid-virtualScrollerContent": {
      display: 'flex',
      flexGrow: 1,
      flex: 1,
    },
    "& .MuiDataGrid-filler": {
      display: 'none'
    }
  },
  tableBody: { width: "100%", minWidth: "223px" },
  tableRow: {
    "&:last-child td, &:last-child th": {
      border: 0,
      width: "100%",
    },
  },
  tableCell: { width: "40px !important" },
  deleteIcon: (isDeleteDisable) => ({
    cursor: isDeleteDisable ? "pointer" : "not-allowed",
    fill: isDeleteDisable ? "white" : "rgba(255, 255, 255, 0.3)"
  }),
  cursor: {
    cursor: 'pointer'
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    height: '100%'
  },
  noRowsOverlay: {
    width: '100%',
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  noRows: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  }
};
