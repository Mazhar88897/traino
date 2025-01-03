export const Style = {
    main: {
        width: { xs: '100%', md: "50%" },
      maxWidth:  { md: '500px' },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: { xs: '400px', sm: '240px' },
        borderRadius: '10px',
        background: '#FFF',
        boxShadow: '0px 4px 39px 0px rgba(81, 69, 159, 0.08)',
    },
    childContainer: {
        width: '100%',
      maxWidth:  '500px',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box'
    },
    label: {
        color: '#4B4B4B',
        fontFamily: 'Rubik',
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '22px',
    },
    blueColor: { backgroundColor: '#3447D4', width: '30px', height: '5px', display: 'inline-block', marginRight: '8px', borderRadius: '20px' },
    yellowColor: { backgroundColor: '#FFC62B', width: '30px', height: '5px', display: 'inline-block', marginRight: '8px', borderRadius: '20px' },
    greenColor: { backgroundColor: '#6BC497', width: '30px', height: '5px', display: 'inline-block', marginRight: '8px', borderRadius: '20px' },
    labelContainer: {
        display: 'flex',
        flexDirection: 'column',
        ml: {sm: '-16px'}
    },
    row: {
        display: 'flex',
        alignItems: 'center'
    },
    quantity: {
        color: '#1F1F1F',
        fontFamily: 'Rubik',
        fontSize: '14px',
        fontWeight: '500',
        lineHeight: '22px',
        ml: '38px',
        mt: 0.5
    },
    percent: {
        color: '#252525',
        fontFamily: 'Rubik',
        fontSize: '12px',
        fontWeight: '400',
        ml: 2,
    },
    triangle: {
        color: 'green'
    },
    chart: {
        width: {xs: '90%', sm: '50%'},
      maxWidth:  {xs: '250px', sm: '100%'},
        display: 'flex',
        boxSizing: 'border-box'
    }
}