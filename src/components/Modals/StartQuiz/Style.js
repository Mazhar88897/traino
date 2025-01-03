export const style = {
  wrapper: {
  maxWidth:  "510px",
    p: "0px 16px",
    borderRadius: "0px",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    gap: 0,
    borderRadius: '8px'
  },
  header: {
    height: "55px",
    width: "100%",
    display: "flex",
    alignItems: "end",
  },
  closeIcon: {
    cursor: "pointer",
    position: "absolute",
    right: "26px",
    width: '35px',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px',
    color: '#000',
    background: '#F6F6F6',
    borderRadius: '4px'
  },
  headerText: { fontSize: "32px", color: "#616466", padding: "10px 0px" },
  bottomText: { color: "#00000087", fontSize: "14px" },
  startQuizButton: {
    height: {xs: "44px", sm: "56px"},
    backgroundColor: "#3447D4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: '4px',
    color: "#ffff",
    maxWidth: '366px',
    my: {xs: 2.5, sm: 4},
    width: '100%',
    mx: 'auto',
  },
  buttonText: {
    color: '#FFF',
    fontFamily: 'Rubik',
    fontSize: {xs: "18px", sm:  '20px'},
    fontWeight: '500',
    lineHeight: '24px',
  },
  quizNoHeading: {
    color: '#3447D4',
    textAlign: 'center',
    fontFamily: 'Rubik',
    fontSize: '28px',
    fontWeight: '500',
    lineHeight: '36px',
  },
  quizText: {
    color: '#1F1F1F',
    fontFamily: 'Rubik',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '36px',
  },
  quizQuestions: {
    color: '#4156F9',
    fontFamily: 'Rubik',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '36px',
  },
  quizInfoContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 1
  },
  instructionContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth:  '400px',
    alignItems: 'start',
    mt: {xs: 2, sm: 3}
  },
  instructionHeading: {
    color: '#1E2265',
    fontFamily: 'Rubik',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '36px',
  },
  instruction: {
    color: '#000',
    fontFamily: 'Rubik',
    fontSize: {xs: "15px", sm: '16px'},
    fontWeight: '400',
    lineHeight: '24px',
    mb: 1.5
  },
  clockMain: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  borderedContainer: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    border: '2px dashed #B8C1FF',
    background: '#FFF',
    boxShadow: '0px 4px 4px 0px rgba(81, 69, 159, 0.08)',
    width: '100%',
    maxWidth:  '344px',
    height: '154px',
    p: '21px'
  }
};
