import { globalStyle } from "../../../styles/globalStyle";
import { COLORS } from "../../../theme";

export const Style = {
    wrapper: (isAssignAble) => ({
        width: {xs: "calc(100% - 20px)", md: "calc(100% - 40px)"},
        maxWidth:  isAssignAble ? "1420px" : "650px",
        height: {xs: '98vh', md: '96vh'},
        flex: 1,
        flexGrow: 1,
        maxHeight: '820px',
        overflowY: 'auto',
        borderRadius: "0px",
        padding: "0px !important",
        textAlign: "start",
        gap: "0px",
        borderRadius: '12px',
        background: '#FEFEFE',
    }),
    header: {
        width: "100%",
        height: "70px",
        backgroundColor: "#0D2F48",
        display: "flex",
        alignItems: "center",
        padding: "12px",
    },
    container: (isAssignAble) => ({
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: { xs: isAssignAble ? "column" : "column", md: "row" },
    }),
    leftSide: {
        width: { xs: "100%", md: "calc( 100% - 340px )", lg: "70% !important" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        p: { xs: "30px", md: "20px 30px" },
        color: "#000"
    },
    leftSideChild: { display: "flex", flexDirection: "column", flexGrow: 1, flex: 1 },
    uploadDocumnet: {
        ...globalStyle.subHeading,
        height: "55px",
        width: '100%',
      maxWidth:  '100%',
        color: COLORS.white,
        justifyContent: "center",
        mb: 2
    },
    buttonsContainer: {
        px: '20px',
        boxSizing: 'border-box',
        display: "flex",
        alignSelf: 'end',
        justifyItem: 'end',
        width: '100%',
        justifyContent: { xs: "center", md: "flex-end" },
        gap: "15px",
    },
    button: {
        width: '100%'  
    },
    absContainer: {
        position: 'absolute',
        bottom: '30px',
        left: '50px'
    },
    rightSide: (isAssignAble) => ({
        padding: '60px 12px 25px',
        color: '#000',
        width: { xs: "100%", md: isAssignAble ? '340px' : "100%", lg: isAssignAble ? '30%' : "100%" },
        display: "flex",
        flex: 1,
        flexGrow: 1,
        flexWrap: "nowrap",
        justifyContent: "flex-start",
        flexDirection: "column",
        alignItems: 'center',
        background: "#F8F8F8"
    }),
    rightSideChild: {
        width: 'calc(100% - 40px)',
      maxWidth:  { sm: "633px" },
        height: { xs: "200px", md: "275px" },
        border: "2px solid #BEA5A5 ",
        borderStyle: "dashed",
        m: "30px",
        mb: "0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    setReminderBtn: {
        my: "16px",
        mt: 0,
      maxWidth:  "100%",
        backgroundColor: "#ab1b1b",
        color: "white !important",
        fontSize: "12px",
        justifyContent: "space-between",
        p: "8px 14px",
        textTransform: "capitalize",
        height: "55px",
        "&:hover": {
            background: "#ab1b1b",
        },
    },
    uploadSectionContainer: (isAssignAble) => ({
        width: { xs: "100%", md: "633px" },
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        cursor: isAssignAble ? 'not-allowed' : 'pointer'
    }),
    uploadImage: { width: "230px", height: "120px" },
    text: {
        color: "#BEA5A5",
        fontSize: { xs: "14px", sm: "18px" },
        textAlign: "center",
        display: "flex",
        gap: "5px",
        flexWrap: "wrap",
        justifyContent: "center",
      maxWidth:  "calc(100vw - 120px)",
    },
    browseText: {
        color: "#006ED0",
        margin: "0px 5px",
        mr: 0,
        fontSize: { xs: "14px", sm: "18px" },
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      maxWidth:  { xs: "160px", sm: "200px" },
        display: "block",
    },
    cancelDocumentAction: {
        width: "100px",
        mt: { md: "16px" },
        mr: { xs: "-18px", md: "30px" },
    },
    cancelInputButtonContainer: {
        boxSizing: 'border-box',
        mt: { xs: "20px", sm: 0 },
        pr: "30px",
        display: 'flex',
        flexDirection: { xs: "column", sm: 'row', },
        alignItems: { xs: 'end', md: 'end' },
        pl: '28px',
        boxSizing: 'border-box',
        width: 'calc(100% - 40px)',
      maxWidth:  { sm: "693px" },
    },
    editInput: {
        width: "100%",
        height: '46px',
        fontSize: '16px',
        padding: '10px'
    },
    saveButtonContainer: {
        display: 'flex',
        justifyContent: { xs: 'center', md: 'end' },
        flex: 1,
        pl: '15px',
        boxSizing: 'border-box',
      maxWidth:  { xs: 'calc(100vw - 10px)' }
    },
    contentContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: { xs: 'center', md: 'space-between' },
        mt: 3,
        gap: '20px'
    },
    contentContainerChild: {
        display: 'flex',
        justifyContent: { xs: 'center', md: 'start' }
    },
    inputBase: {
        ml: 1.5,
        mr: 2,
        flex: 1,
        fontFamily: 'Rubik',
        fontSize: '18px',
        fontWeight: '400',
        opacity: "1",
        "& input::placeholder": {
            color: '#4B4B4B',
            opacity: "0.9",
        }
    },
    searchContainer: {
        p: "0 0px"
    },
    searchIcon: {
        width: '21px',
        opacity: "0.8"
    },
    paperFormContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        pl: 2,
        borderLeft: {sm: '1px solid #B0B0B0'},
        borderRight: {sm: '1px solid #B0B0B0'},
        height: '21px !important',
        alignSelf: 'center',
    },
    paperForm: {
        border: 'none',
        boxShadow: 'none',
        background: 'inherit',
        width: '190px',
        display: 'flex'
    },
    actionBtn: {
        display: "flex",
        alignSelf: 'end',
        width: '36px',
        height: '36px',
        fontSize: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F6F6F6',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    selectMain: {
        // mt: 1,
        display: 'flex',
        flexDirection: {xs: 'column', sm: 'row'},
        gap: '20px 0',
        mt: {xs: -2, sm: 1},
        width: '100%',
        justifyContent: 'space-between',
        alignItems: {xs: 'start', sm: 'center'}
    },
    selectContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 0.75
    },
    select: {
        color: '#1F1F1F',
        fontFamily: 'Rubik',
        fontSize: {xs: '26px', lg: '30px'},
        fontWeight: '500',
    },
    enroll: {
        color: '#4B4B4B',
        fontFamily: 'Rubik',
        fontSize: {xs: '14px !important', sm: '14px !important', lg: '18px'},
        fontWeight: '400',
        opacity: '0.8',
        mt: 0.5
    },
    userNo: {
        color: '#3447D4',
        fontFamily: 'Rubik',
        fontSize: '18px',
        fontWeight: '500',
        mr: 3.5
    },
    userSearchContainer: {
        minHeight: '25px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px 0',
        justifyContent: 'start',
        alignItems: 'center'
    },
    contentContainerChild: {
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px 0',
        justifyContent: 'space-between',
        mt: 3
    },
    enroll: {
        color: '#4B4B4B',
        fontFamily: 'Rubik',
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: '20px',
        opacity: '0.8',
    },
    enrollMain: {
        display: 'flex',
        alignItems: 'end',
        gap: '10px',
        ml: 3,
        cursor: 'pointer'
    },
    spaceBetween: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    assignedHeadingMain: {
        borderBottom: "1px solid #D2D2D2",
        pb: 2,
        gap: {xs: 0.5, sm: 1},
    },
    assignedHeading: {
        color: '#1F1F1F',
        fontFamily: 'Rubik',
        fontSize: {xs: '15px', sm: '16px', md: '17px'},
        fontWeight: '500',
    },
    assignedNo: {
        mt: {xs: '2px', md: 0},
        width: {xs: '20px', md: '25px'},
        height: {xs: '20px', md: '25px'},
        borderRadius: '3px',
        background: '#E6E9FF',
        color: '#3447D4',
        fontFamily: 'Rubik',
        fontSize: {xs: '14px', sm: '15px', md: '16px'},
        fontWeight: '400',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    row: {
        display: 'flex',
    },
    unselect: {
        color: '#3447D4',
        fontFamily: 'Rubik',
        fontSize: {xs: '14px', sm: '15px', md: '16px'},
        fontWeight: '400',
        cursor: 'pointer'
    }
};