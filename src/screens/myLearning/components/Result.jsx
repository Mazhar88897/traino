import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { CustomButton, NoRecordFound, ReuseModal } from "../../../components";
import { globalStyle } from "../../../styles/globalStyle";
import { Style } from "../style";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Result = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { docId, departId } = useParams();
  const state = location?.state;
  const quizResult = state.quizResult;
  const onConfirm = () => {
    navigate(
      `/my-learning/document/${docId}/attemptQuiz`,
      {
        state,
      }
    );
  };

  if (!quizResult) return <NoRecordFound />;
  return (
    <Box sx={Style.bgWrapper}>
      <Box sx={Style.scroreWrapper}>
        <Box sx={Style.scoreContainer}>
          <CustomButton
            sx={{ ...Style.alignEndBtn, mb: "16px" }}
            buttonText={"Close"}
            onClick={() =>
              navigate(
                `/my-learning/document/${docId}/quizzes`,
                {
                  state,
                }
              )
            }
          />
          <Box sx={Style.attemptMsg}>
            <Typography sx={{ ...globalStyle.headings, cursor: "auto" }}>
              Thanks for Attempting the Quiz
            </Typography>
            <Typography sx={Style.score}>
              Your Score is :{" "}
              <span
                style={{
                  color: quizResult?.Status == "Fail" ? "red" : "#49940E",
                }}
              >
                {Math.floor(quizResult?.Score)}%
              </span>
              <Box
                sx={{
                  ...Style.percentage,
                  color: quizResult?.Status == "Fail" ? "red" : "#49940E",
                }}
              >
                {quizResult?.Status}
              </Box>
            </Typography>
            <Box sx={Style.tabsContainer}>
              <CustomButton
                buttonText={"Retake Quiz"}
                onClick={() => setOpen(true)}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <ReuseModal
        open={open}
        setOpen={setOpen}
        onConfirm={onConfirm}
        title={"Are you sure you want to retake quiz ?"}
      />
    </Box>
  );
};

export default Result;
