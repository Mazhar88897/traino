export const Style = {
    links: {
        color: '#4B4B4B',
        textAlign: 'center',
        fontFamily: 'Rubik',
        fontSize: {xs: '16px', sm: '18px'},
        fontWeight: '400',
        lineHeight: '24px',
        borderRadius: '4px 4px 0px 0px',
        borderBottom: '1px solid #EEE',
        cursor: 'pointer',
        p: {xs: '4px 8px', sm: "9px 16px"},
        minWidth: "fit-content"
    },
    activeLink: {
        border: '1px solid #EEE',
        borderBottom: 'none !important',
        color: '#3C44CB'
    },
    linksContainer: {
        display: "flex",
        mt: 2,
        maxWidth:  '100%',
        overflow: 'auto'
    }
}