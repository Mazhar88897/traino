import { Box, Typography } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import { globalStyle } from "../../../styles/globalStyle";
import CustomButton from "../../CustomButton";
import ModalWrapper from "../../ModalWrapper";
import { style } from "./Style";
import { IMAGES } from "../../../theme";
import { useLocation } from "react-router-dom";

const StartQuizModal = ({ open, setOpen, onConfirm, data }) => {
  const { result_status, score, attempt_status, index } = open;
  const location = useLocation();
  const state = location?.state;
  const selectedDocData = state?.val;

  function truncateText(text, limit) {
    if (text.length > limit) {
      return text.length > limit ? text.substring(0, limit) + "..." : text;
    }
    return text;
  }

  return (
    <ModalWrapper open={!!open} setOpen={setOpen} sx={style.wrapper}>
      <Box sx={style.header}>
        <RxCross2 style={style.closeIcon} onClick={() => setOpen(false)} />
      </Box>
      <Box sx={style.borderedContainer}>
        <Typography sx={style.quizNoHeading}>
          QUIZ {index >= 10 ? "" : "0"}
          {index + 1}
        </Typography>
        <Typography sx={style.quizText}>
          {truncateText(selectedDocData?.name, 22)}
        </Typography>
        <Box sx={style.quizInfoContainer}>
          <Typography sx={style.quizQuestions}>Average Time</Typography>
          <Box sx={style.clockMain}>
            <Box component={"img"} src={IMAGES.clock} width="19px" />
            <Typography
              onClick={() => {
                console.log(selectedDocData);
              }}
              sx={style.quizQuestions}
            >
              {selectedDocData?.avgCompletionTime || 45} mins
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={style.instructionContainer}>
        <Typography sx={style.instructionHeading}>Instructions</Typography>
        <Box
          component={"ul"}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            color: "#000",
            pl: 2.5,
            my: 0.25,
          }}
        >
          <Typography component={"li"} sx={style.instruction}>
            Answers will not be saved if you go back.
          </Typography>
          <Typography component={"li"} sx={style.instruction}>
            Click Submit at the end to submit your answers.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            mb: "25px",
          }}
        >
          {/* {score !== null && (
            <Typography
              sx={{ fontSize: { xs: "20px", sm: "30px" }, color: "#000" }}
            >
              Score :{" "}
              <Typography
                component={"span"}
                sx={{ fontSize: { xs: "20px", sm: "30px" } }}
              >
                {score}%
              </Typography>
            </Typography>
          )}
          {result_status !== null && (
            <Typography
              sx={{ fontSize: { xs: "20px", sm: "22px" }, color: "#000" }}
            >
              Status :{" "}
              <Typography
                component={"span"}
                sx={{
                  fontSize: { xs: "20px", sm: "22px" },
                  color: result_status == "Pass" ? "#007B05" : "#C20B0B",
                }}
              >
                {result_status}
              </Typography>
            </Typography>
          )}
          {attempt_status == "Attempted" && (
            <Typography sx={style.bottomText}>
              *you can reattempt the Quiz to improve your score
            </Typography>
          )} */}
          <CustomButton
            buttonText={`${
              attempt_status == "Attempted" ? "Retake" : "Start"
            } Quiz`}
            rightIcon={
              <Box
                component="img"
                src={IMAGES.questionMark}
                sx={{ width: { xs: "18px", sm: "24px" } }}
                ml={0.5}
              />
            }
            typSx={style.buttonText}
            sx={style.startQuizButton}
            onClick={onConfirm}
          />
        </Box>
      </Box>
    </ModalWrapper>
  );
};
export default StartQuizModal;
