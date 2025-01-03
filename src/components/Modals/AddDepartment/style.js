export const Style = {
  main: {
    p: 0,
  maxWidth:  { xs: '560px', sm: "560px" },
    overflow: 'hidden'
  },
  heading: {
    textAlign: 'start',
    color: '#1F1F1F',
    fontFamily: 'Rubik',
    fontSize: '22px',
    fontWeight: '600',
  },
  header: {
    borderRadius: "6px",
    height: "50px",
    backgroundColor: "#10194B",
    display: "flex",
    alignItems: "center",
    padding: "12px",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    gap: "16px",
    px: 4,
    pb: 4,
    pt: '2px',
  },
  buttonsContainer: {
    marginTop: { xs: 1.5 },
    display: "flex",
    justifyContent: { xs: "center", md: "flex-end" },
    gap: "15px",
  maxWidth:  '100%'
  },
  button: (isWhite) => ({
    color: isWhite ? "#3447D4" : "#FFFFFF", 
    backgroundColor: !isWhite ? "#3447D4" : "#FFFFFF", 
    width: '50%',
  maxWidth:  '112px'
  }),
  formControl: { 
    width: "100%",
    "& .MuiInputLabel-root": {
      color: '#1F1F1F !important',
      fontFamily: 'Rubik !important',
      fontSize: '14px !important',
      fontWeight: '400 !important',
      lineHeight: '22px !important',
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#4156F9 !important"
    },
    "& .Mui-focused > .MuiOutlinedInput-notchedOutline": {
      borderColor: '#4156F9 !important',
      borderWidth: '1px !important',
      outline: 'none',
    }
  },
  thumbnail: { 
    width: '21px', 
    height: '21px' 
  },
  photoContainer: { 
    width: '100%', 
    display: 'flex', 
    position: 'relative', 
    height: '180px' 
  },
  documentImg: { 
    width: '100%', 
    objectFit: 'cover' 
  },
  uploadFile: {
    position: 'absolute', 
    bottom: '24px', 
    right: '36px', 
    background: '#fff', 
    color: '#1F1F1F',
    fontFamily: 'Rubik',
    fontSize: '16px',
    fontWeight: '400',
    height: '36px',
    textTransform: 'inherit',
    "&:hover": {
      background: '#fff'
    }
  }
};
