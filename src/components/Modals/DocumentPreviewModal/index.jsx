import {
  Box,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import SmallScreenSlider from "../../../layout/MainLayout/SmallScreenSlider";
import { IMAGES } from "../../../theme";
import { Style } from "./Style";
import React, { useState } from "react";
import { selectedDocumentAction } from "../../../store/slice/summaryAndKeyPoints";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../store/slice/user";
import { allQuizzez } from "../../../store/slice/quizzez";

const DocumentPreview = ({ open, setOpen, data }) => {
  const [quizInd, setQuizInd] = useState("0");
  const [isNext, setIsNext] = useState(true);

  const state = useLocation()?.state;
  const stateData = state?.data || {};

  const { id, departId } = useParams();

  const { isSuperAdmin, isAdmin } = useSelector(selectUser);
  const { quizzezList } = useSelector(allQuizzez);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setQuizInd(event.target.value);
  };

  const handleClick = (lastPath) => {
    dispatch(selectedDocumentAction(data));
    navigate(
      isSuperAdmin
        ? `/trainings/company/${id}/document/${data?.id}/${lastPath}`
        : isAdmin
        ? `/trainings/document/${data?.id}/${lastPath}`
        : `/my-learning/document/${data?.id}/${lastPath}`,
      lastPath === "attemptQuiz" || lastPath === "uploadQuiz"
        ? {
            state: {
              ...state,
              data: stateData,
              val: data,
              departData: state?.departData,
              quizData: quizzezList[quizInd],
            },
          }
        : {
            state: {
              data: stateData,
              val: data,
              departData: state?.departData,
            },
          }
    );
  };
  const date = new Date();

  // Array of month names in uppercase
  const monthNames = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  // Get the required date parts
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Combine into the desired format
  const dateShow = `${month} ${day}, ${year}`;
  return (
    <SmallScreenSlider
      open={open}
      setOpen={setOpen}
      anchor="right"
      sx={Style.main}
    >
      <Box sx={Style.childContainer}>
        <Box sx={Style.bgContainer(data?.src || IMAGES.document)}>
          <Button variant={"secondary"} sx={Style.bgAssignButton}>
            Assigned | <Typography sx={Style.date}>{dateShow}</Typography>
          </Button>
        </Box>
        <Box sx={Style.selectBox}>
          <Typography sx={Style.name}>
            Advanced Compensation and Benefits
          </Typography>
          {isNext ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                flexGrow: 1,
              }}
            >
              <Typography sx={{ ...Style.selectHeading, m: "0px" }}>
                Overview
              </Typography>
              <Typography component={"ul"} sx={Style.listContainer}>
                <Typography component={"li"} sx={Style.list}>
                  Covers advanced pay and benefits strategies
                </Typography>
                <Typography component={"li"} sx={Style.list}>
                  Focuses on performance-based incentives
                </Typography>
              </Typography>
              <Typography sx={{ ...Style.selectHeading, mt: 0.5 }}>
                Conclusion
              </Typography>
              <Typography component={"ul"} sx={Style.listContainer}>
                <Typography
                  component={"li"}
                  sx={{ ...Style.list, cursor: "pointer" }}
                  onClick={() => handleClick("quiz")}
                >
                  Quiz
                </Typography>
                <Typography
                  component={"li"}
                  sx={{ ...Style.list, cursor: "pointer" }}
                  onClick={() => handleClick("summary")}
                >
                  Summary
                </Typography>
                <Typography
                  component={"li"}
                  sx={{ ...Style.list, cursor: "pointer" }}
                  onClick={() => handleClick("keyPoints")}
                >
                  Key Points
                </Typography>
              </Typography>
              <Box sx={Style.participantsMain}>
                <Box sx={Style.spaceBetween}>
                  <Typography sx={Style.participant}>Due Date</Typography>
                  <Typography sx={Style.participantNo}>20-09-24</Typography>
                </Box>
                <Box sx={Style.spaceBetween}>
                  <Typography sx={Style.participant}>
                    Average Completion Time
                  </Typography>
                  <Typography sx={Style.participantNo}>45 mins</Typography>
                </Box>
              </Box>
            </Box>
          ) : (
            <FormControl sx={{ ...Style.formControl, m: 0 }}>
              <FormLabel sx={Style.selectHeading}>Select Quiz</FormLabel>
              <RadioGroup
                sx={Style.radioGroup}
                value={quizInd}
                onChange={handleChange}
              >
                {quizzezList?.map((item, index) => (
                  <FormControlLabel
                    sx={Style.selectBoxContainer}
                    value={`${index}`}
                    control={<Radio sx={Style.radio} />}
                    label={`Quiz ${index + 1}`}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
        </Box>
      </Box>
      <Button
        sx={Style.next}
        onClick={() =>
          !isNext
            ? setIsNext(true)
            : handleClick(isAdmin || isSuperAdmin ? "summary" : "summary")
        }
      >
        {isNext ? "Start Training" : "Next"}
      </Button>
    </SmallScreenSlider>
  );
};
export default DocumentPreview;
