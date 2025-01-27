import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  CustomButton,
  Loader,
  NoRecordFound,
  ReuseModal,
} from "../../../components";
import { handleError } from "../../../hooks/globalFunction";
import { getQuestionList, submitQuizByUser } from "../../../services/quiz";
import { uploadQuizzAction } from "../../../store/slice/quizzez";
import { selectUser } from "../../../store/slice/user";
import { globalStyle } from "../../../styles/globalStyle";
import { Style } from "../style";
import QuizResult from "../../../components/Modals/QuizResult";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { IMAGES } from "../../../theme";
import useWindowDimensions from "../../../hooks/windowDimensions";

const Question = ({ percentage, setPercentage }) => {
  const { access } = useSelector(selectUser);
  const { departId, docId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location?.state;
  const quizData = state?.quizData;
  // const selectedDocData = state?.val;
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitLoader, setSubmitLoader] = useState(false);
  const [questionsList, setQuestionsList] = useState([]);
  const [submitData, setSubmitData] = useState({});
  const [index, setIndex] = useState(0);
  const selectedIndex =
    questionsList[index >= questionsList?.length ? index - 1 : index];
  const isLastIndex = index < questionsList.length - 1;
  const [data, setData] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const { height } = useWindowDimensions();

  const getQuestionsListData = async () => {
    if (!!quizData?.id) {
      try {
        setLoader(true);
        const res = await getQuestionList(
          dispatch,
          navigate,
          quizData?.id,
          access
        );
        setQuestionsList(res.data);
        setSubmitData({ quiz_id: res?.data[0]?.quiz, answers: [] });
      } catch (err) {
        toast.error(handleError({}, err?.response?.data));
      } finally {
        setLoader(false);
      }
    }
  };

  const handleSubmitData = (val) => {
    let data;
    const itemIndex = submitData.answers.findIndex(
      (item) => item.question_id === val.question_id
    );
    if (itemIndex !== -1) {
      data = [
        ...submitData.answers.slice(0, itemIndex),
        val,
        ...submitData.answers.slice(itemIndex + 1),
      ];
    } else {
      data = [...submitData.answers, val];
    }
    setSubmitData((prev) => ({ ...prev, answers: data }));
  };

  const submitQuizData = async () => {
    if (index <= questionsList?.length - 1)
      // setIndex((prev) => prev + 1)
      try {
        setSubmitLoader(true);
        const res = await submitQuizByUser(
          dispatch,
          navigate,
          submitData,
          access
        );
        setData(res?.data);
        setOpenResult(true);
        dispatch(
          uploadQuizzAction({
            id: quizData?.id,
            attempt_status: "Attempted",
            result_status: res?.data?.Status,
            score: res?.data?.Score,
          })
        );
        // navigate(
        //   `/my-learning/document/${docId}/quizResult`,
        //   {
        //     state: { val: selectedDocData, quizData, quizResult: res.data },
        //   }
        // );
        // setSubmitData({});
        setOpen(false);
      } catch (err) {
        toast.error(handleError({}, err?.response?.data));
      } finally {
        setSubmitLoader(false);
      }
  };

  const handleNext = () => {
    if (index <= questionsList?.length) setIndex((prev) => prev + 1);
  };
  const handlePrevious = () => {
    if (!!index) setIndex((prev) => prev - 1);
  };

  useEffect(() => {
    setPercentage(((index || 0) / (questionsList?.length || 0)) * 100 || 0);
  }, [index]);

  useEffect(() => {
    getQuestionsListData();
  }, [quizData?.id]);

  if (loader)
    return (
      <Loader style={{ width: "100%", height: "auto" }} isCircular={true} />
    );
  return (
    <>
      {!questionsList?.length ? (
        <NoRecordFound />
      ) : (
        <Box sx={Style.questionMain}>
          <Box sx={Style.questionsList}>
            <Typography sx={Style.questionListHeading}>
              Quiz Questions List
            </Typography>
            {questionsList?.map((_, qIndex) => (
              <Typography sx={Style.questionNo(qIndex <= index)}>
                Question {qIndex < 9 ? "0" : ""}
                {qIndex + 1}
              </Typography>
            ))}
          </Box>
          <Box sx={Style.rightMain}>
            <Box sx={Style.headerMain}>
              <Box sx={Style.headerChild}>
                <Box sx={Style.quizIconsContainer}>
                  <Box
                    sx={globalStyle.arrowback}
                    component={"img"}
                    src={IMAGES.backIcon}
                    onClick={() => setOpenCancelModal(true)}
                  />
                  <Box
                    sx={Style.quizIcon}
                    component={"img"}
                    src={IMAGES.quizzesLogo}
                  />
                  <Typography
                    sx={{ ...globalStyle.tabs(false), fontWeight: "500" }}
                  >
                    Quiz {quizData?.index < 9 ? "0" : ""}
                    {quizData?.index + 1}
                  </Typography>
                </Box>
                {/* <Box sx={Style.timeMain}>
                  <Box component={"img"} src={IMAGES.clock} sx={{ width: '28px', height: '28px' }} />
                  <Typography sx={Style.timeHeading}>Time Left</Typography>
                  <Box sx={Style.timeContainer}>
                    <Typography sx={Style.timeNo}>00</Typography>
                    <Typography sx={Style.timeDot}>:</Typography>
                    <Typography sx={Style.timeNo}>05</Typography>
                    <Typography sx={Style.timeDot}>:</Typography>
                    <Typography sx={Style.timeNo}>12</Typography>
                  </Box>
                </Box> */}
              </Box>
            </Box>
            <Box sx={Style.bgWrapper}>
              <Box sx={Style.quizContainer(height < 850)}>
                <Typography sx={{ ...Style.questionTotal, cursor: "auto" }}>
                  Question{" "}
                  {`${index === questionsList?.length ? index : index + 1} of ${
                    questionsList.length
                  }`}
                </Typography>
                <Box mb={2.5}>
                  <Typography sx={Style.question(height < 850)}>
                    Q{`${index === questionsList?.length ? index : index + 1}`}:{" "}
                    {selectedIndex?.question}
                  </Typography>
                  <Box sx={Style.optionsContainer(height < 850)}>
                    <Typography sx={Style.selectAdvice(height < 850)}>
                      Select the correct answer
                    </Typography>
                    {selectedIndex?.options?.[0] &&
                      Object.entries(selectedIndex.options[0]).map(
                        ([key, value], ind) => {
                          return (
                            // <></>
                            <Box
                              sx={Style.answerContainer(
                                !!submitData?.answers &&
                                  key === submitData?.answers[index]?.option,
                                height < 850
                              )}
                              onClick={() =>
                                handleSubmitData({
                                  question_id: selectedIndex?.id,
                                  option: key,
                                })
                              }
                            >
                              <Typography
                                sx={Style.answerNo(
                                  !!submitData?.answers &&
                                    key === submitData?.answers[index]?.option,
                                  height < 850
                                )}
                              >
                                {String.fromCharCode(65 + ind)}
                              </Typography>
                              <Typography variant="body1" sx={Style.answer}>
                                {value}
                              </Typography>
                            </Box>
                          );
                        }
                      )}
                  </Box>
                </Box>
                <Box sx={Style.answerButtonsContainer}>
                  <CustomButton
                    sx={Style.answerButton}
                    onClick={() => {
                      handlePrevious();
                      // console.log("quizData", quizData);
                    }}
                    disable={!index}
                    buttonText={"Previous"}
                  />
                  <CustomButton
                    sx={Style.answerButton}
                    onClick={() => {
                      !isLastIndex ? setOpen(true) : handleNext();
                    }}
                    disable={
                      !submitData?.answers?.some(
                        (el) => el.question_id == selectedIndex?.id
                      )
                    }
                    buttonText={isLastIndex ? "Next" : "Submit"}
                  />
                </Box>
              </Box>
              <QuizResult
                open={openResult}
                setOpen={setOpenResult}
                data={data}
              />
              <ReuseModal
                title={"Are you sure you want to submit quiz ?"}
                open={open}
                setOpen={setOpen}
                onConfirm={submitQuizData}
                loader={submitLoader}
              />
              <ReuseModal
                title={"Are you sure you want to end the quiz ?"}
                open={!!openCancelModal}
                setOpen={setOpenCancelModal}
                onConfirm={() => {
                  setOpenCancelModal(false);
                  navigate(`/my-learning/document/${docId}/quizzes`, {
                    state,
                  });
                }}
                loader={false}
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Question;
