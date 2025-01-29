import { Box, Typography } from "@mui/material";
import ModalWrapper from "../../ModalWrapper";
import { Style } from "./Style";
import CloseIcon from "@mui/icons-material/Close";
import { IMAGES } from "../../../theme";
import CustomButton from "../../CustomButton";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const QuizResult = ({ open, setOpen, data, questionsList }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDocData = location?.state?.val;
  const length = (questionsList || []).length;

  return (
    <ModalWrapper open={open} setOpen={setOpen} sx={Style.main}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #E1E1E1",
          pb: 1.5,
          gap: 1,
        }}
      >
        <Typography sx={Style.quizHeading}>Quiz Result</Typography>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 3 } }}
        >
          {/* <Typography sx={Style.timeSpent}>Time Spent: 2 hours</Typography> */}
          <CloseIcon onClick={() => setOpen(false)} sx={Style.closeIcon} />
        </Box>
      </Box>
      <Typography sx={Style.finishPara}>
        You finished and{" "}
        <Typography component="span" sx={Style.courseName}>
          {data?.Status}ed
        </Typography>{" "}
        the “
        <Typography component="span" sx={Style.courseName}>
          {selectedDocData?.name}
        </Typography>
        ” Quiz !
      </Typography>
      <Box
        sx={{
          mt: { xs: 2, md: 4, lg: 4, sm: 4 },
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "50%",
            maxWidth: { xs: "80px", sm: "120px" },
            maxHeight: "120px",
          }}
        >
          <CircularProgressbar
            value={data?.score?.toFixed(0) || data?.Score?.toFixed(0) || 0}
            text={`${data?.score?.toFixed(0) || data?.Score?.toFixed(0) || 0}%`}
            styles={buildStyles({
              rotation: 0.25,
              pathColor: `#3447D4`,
              textColor: "#3447D4",
              trailColor: "#F3F3F2",
              backgroundColor: "#F3F3F2",
              fontWeight: "700",
            })}
            strokeWidth={10}
          />
        </Box>
        <Typography sx={Style.accuracy}>Your Accuracy</Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          mt: { xs: 2, sm: 4, lg: 4, md: 4 },
          px: { xs: 1, sm: 3 },
        }}
      >
        <Typography
          onClick={() => {
            console.log(questionsList);
          }}
          sx={Style.pointsHeading}
        >
          Your Points
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <Box
            component={"img"}
            src={IMAGES.coin}
            sx={{
              width: { xs: "20px", sm: "28px" },
              height: { xs: "20px", sm: "28px" },
            }}
          />
          <Typography sx={Style.pointNo}>
            {data?.score?.toFixed(0) || data?.Score?.toFixed(0) || 0}
          </Typography>
          <Typography sx={Style.pointSymbol}>pts</Typography>
        </Box>
      </Box>
      <Box sx={Style.statisticContainer}>
        <Box
          sx={{
            ...Style.statisticChildContainer,
            borderRight: "1px solid #D5D5D5",
            minWidth: { xs: "20%", sm: "auto" },
          }}
        >
          <Typography sx={Style.questionNo}>{length}</Typography>
          <Box>
            <Typography sx={Style.statisticHeading}>Questions</Typography>
          </Box>
        </Box>
        <Box sx={{ ...Style.statisticChildContainer, px: "0 !important" }}>
          <Typography sx={Style.questionNo}>
            {Math.round(
              (data?.score?.toFixed(0) || data?.Score?.toFixed(0) || 0) *
                0.01 *
                length
            )}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
            }}
          >
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                width: { xs: "8px", sm: "10px" },
                minWidth: { xs: "8px", sm: "10px" },
                height: { xs: "8px", sm: "10px" },
                borderRadius: { xs: "8px", sm: "10px" },
                background: "#32C16B",
              }}
            />
            <Typography sx={Style.statisticHeading}>
              Correct {data?.score?.toFixed(0) || data?.Score?.toFixed(0) || 0}%
            </Typography>
          </Box>
        </Box>
        <Box sx={{ ...Style.statisticChildContainer, pl: "0 !important" }}>
          <Typography sx={Style.questionNo}>
            {Math.round(
              (100 -
                (data?.score?.toFixed(0) || data?.Score?.toFixed(0) || 0)) *
                0.01 *
                length
            )}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
            }}
          >
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                width: { xs: "8px", sm: "10px" },
                minWidth: { xs: "8px", sm: "10px" },
                height: { xs: "8px", sm: "10px" },
                borderRadius: { xs: "8px", sm: "10px" },
                background: "#EC2D30",
              }}
            />
            <Typography sx={Style.statisticHeading}>
              Wrong{" "}
              {100 - (data?.score?.toFixed(0) || data?.Score?.toFixed(0) || 0)}%
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={Style.buttonContainer}>
        <CustomButton
          typSx={Style.buttonTxt}
          sx={Style.button}
          buttonText={"Retake"}
          onClick={() => navigate(0)}
        />
        <CustomButton
          onClick={() => {
            navigate(-1);
            setOpen(false);
          }}
          typSx={Style.buttonTxt}
          sx={{
            ...Style.button,
            border: "#3447D4",
            background: "#3447D4",
            color: "#fff",
            "&:hover": {
              background: "#2336C3",
              boxShadow: "none",
            },
          }}
          buttonText={"Continue"}
        />
      </Box>
    </ModalWrapper>
  );
};
export default QuizResult;
