const Style = {
    main: {
        display: "flex",
        width: '100%',
        height: {xs: "295px", xl: "310px"},
        padding: "20px",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        borderRadius: "7px",
        background: "#FFF",
        boxShadow: '0px 4px 39px 0px rgba(81, 69, 159, 0.08)',
        mt: 1.5
    },
    headerContainer: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        px: "6px",
    },
    header: {
        color: "#1F1F1F",
        fontFamily: "Rubik",
        fontSize: {xs: '20px', xl: "22px"},
        fontWeight: "500",
        lineHeight: "120%",
        width: '100%',
        maxWidth:  '760px',
        m: '0 auto'
    },
    mainContainer: {
        display: 'flex',
        mt: -4.25,
        width: '100%',
        justifyContent: { xs: 'center', md: 'start' },
        gap: '20px',
        flexWrap: 'no-wrap',
        flexGrow: 1
    },
    donutHeadingContainer: (isRight) => ({
        position: "absolute",
        top: "calc(50% + 18px)",
        right: isRight && "-2px",
        left: !isRight && "-2px",
        transform: "translate(0%, 100%)",
        textAlign: "center",
    }),
    donutPercentage: {
        color: "#0C0B18",
        textEdge: "cap",
        fontFamily: "Rubik",
        fontSize: {xs: '20px', xl: "22px"},
        fontWeight: "500",
        letterSpacing: "-0.52px",
    },
    donutCompleted: {
        color: "#4B4B4B",
        textEdge: "cap",
        fontFamily: "Rubik",
        fontSize: {xs: '16px', xl: "18px"},
        fontWeight: "400",
    },
    // labelContainer: {
    //     display: 'flex',
    //     alignItems: 'center',
    //     gap: 1,
    //     minWidth: '94px',
    //     mt: 1.5
    // },
    // color: {
    //     width: "8px",
    //     height: '8px',
    //     borderRadius: '8px',
    // },
    // label: {
    //     color: '#4B4B4B',
    //     fontFamily: 'Rubik',
    //     fontSize: '14px',
    //     fontWeight: '400',
    //     lineHeight: '130%',
    // },
    // labelNo: {
    //     color: '#1F1F1F',
    //     textAlign: 'start',
    //     fontFamily: 'Rubik',
    //     fontSize: '18px',
    //     fontWeight: '400',
    //     lineHeight: '120%',
    //     mt: 0.75,
    //     pl: 1.75,
    // },
    colorLabel: (color) => ({
        background: color,
        width: '12px',
        height: '12px',
        minWidth: '12px',
        borderRadius: '12px',
        mt: 0.75,
    }),
    labelHeading: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start'
    },
    donutContainer: {
        width: '100%',
        position: "relative",
        padding: '0 6px',
      maxWidth:  "254px",
        minWidth: '100px',
        height: 'fit-content',
        m: '8px auto 0'
    },
    labelColorContainer: {
        width: '100%',
        display: 'flex',
        gap: '10px'
    }
}
export { Style }