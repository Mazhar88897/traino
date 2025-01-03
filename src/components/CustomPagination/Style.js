export const Style = {
    paginationContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        mt: 3
    },
    pagination: {
        '& .MuiPaginationItem-root': {
            display: 'flex',
            width: '40px',
            height: '40px',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '4px',
            background: '#FFF',
            color: '#1F1F1F',
            fontFamily: 'Rubik',
            fontSize: {xs: '14px', md: '16px'},
            fontWeight: '600',
            marginLeft: {xs: '8px', md: '16px'}
        },
        '& .MuiPaginationItem-root.Mui-selected': {
            border: '1px solid #3447D4',
            color: '#3447D4 !important',
            background: '#F5F6FF !important',
        },
    },
}