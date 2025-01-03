import { Box, Typography } from "@mui/material"
import ModalWrapper from "../../ModalWrapper"
import { Style } from "./Style"
import CloseIcon from '@mui/icons-material/Close';
import { IMAGES } from "../../../theme";
import CustomButton from "../../CustomButton";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from "react-router-dom";

const QuizResult = ({ open, setOpen, data }) => {
    const navigate = useNavigate()
    return (
        <ModalWrapper open={open} setOpen={setOpen} sx={Style.main}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E1E1E1', pb: 1.5, gap: 1 }}>
                <Typography sx={Style.quizHeading}>Quiz Result</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: {xs: 1, sm: 3} }}>
                    <Typography sx={Style.timeSpent}>Time Spent: 2 hours</Typography>
                    <CloseIcon onClick={() => setOpen(false)} sx={Style.closeIcon} />
                </Box>
            </Box>
            <Typography sx={Style.finishPara}>
                You finished and passed the “
                <Typography component="span" sx={Style.courseName}>
                    Advanced Compensation and Benefits
                </Typography>
                ” Quiz !
            </Typography>
            <Box sx={{ mt: 4, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ width: '50%', maxWidth: {xs: '100px', sm: '120px'}, maxHeight: '120px' }}>
                    <CircularProgressbar value={data?.score || data?.Score || 0} text={`${data?.score || data?.Score || 0}%`}
                        styles={buildStyles({
                            rotation: 0.25,
                            pathColor: `#3447D4`,
                            textColor: '#3447D4',
                            trailColor: '#F3F3F2',
                            backgroundColor: '#F3F3F2',
                            fontWeight: '700',
                        })}
                        strokeWidth={10}
                    />
                </Box>
                <Typography sx={Style.accuracy}>Your Accuracy</Typography>
            </Box>
            <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between', mt: 4, px: {xs: 1, sm: 3} }}>
                <Typography sx={Style.pointsHeading}>Your Points</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Box component={"img"} src={IMAGES.coin} sx={{ width: {xs: "22px",sm: '28px'}, height: {xs: "22px",sm: '28px'} }} />
                    <Typography sx={Style.pointNo}>300</Typography>
                    <Typography sx={Style.pointSymbol}>pts</Typography>
                </Box>
            </Box>
            <Box sx={Style.statisticContainer}>
                <Box sx={{ ...Style.statisticChildContainer, borderRight: '1px solid #D5D5D5', minWidth: {xs: '20%', sm: 'auto'} }}>
                    <Typography sx={Style.questionNo}>20</Typography>
                    <Box>
                        <Typography sx={Style.statisticHeading}>Questions</Typography>
                    </Box>
                </Box>
                <Box sx={{ ...Style.statisticChildContainer, px: "0 !important" }}>
                    <Typography sx={Style.questionNo}>10</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: {xs: 0.5, sm: 1} }}>
                        <Box sx={{ display: {xs: 'none', sm: 'flex'}, width: {xs: '8px', sm: '10px'}, minWidth: {xs: '8px', sm: '10px'}, height: {xs: '8px', sm: '10px'}, borderRadius: {xs: '8px', sm: '10px'}, background: '#32C16B' }} />
                        <Typography sx={Style.statisticHeading}>Correct 30%</Typography>
                    </Box>
                </Box>
                <Box sx={{...Style.statisticChildContainer, pl: "0 !important"}}>
                    <Typography sx={Style.questionNo}>07</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: {xs: 0.5, sm: 1} }}>
                        <Box sx={{ display: {xs: 'none', sm: 'flex'}, width: {xs: '8px', sm: '10px'}, minWidth: {xs: '8px', sm: '10px'}, height: {xs: '8px', sm: '10px'}, borderRadius: {xs: '8px', sm: '10px'}, background: '#EC2D30' }} />
                        <Typography sx={Style.statisticHeading}>Wrong 60%</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={Style.buttonContainer}>
                <CustomButton typSx={Style.buttonTxt} sx={Style.button} buttonText={"Retake"} onClick={() => navigate(0)} />
                <CustomButton onClick={() => {
                    navigate(-1)
                    setOpen(false)
                }} typSx={Style.buttonTxt} sx={{
                    ...Style.button, border: '#3447D4',
                    background: '#3447D4',
                    color: '#fff',
                    "&:hover": {
                        background: '#2336C3',
                        boxShadow: 'none'
                    }
                }} buttonText={"Continue"} />
            </Box>
        </ModalWrapper>
    )
}
export default QuizResult