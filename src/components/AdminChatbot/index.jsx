import { Box, Button, Typography } from "@mui/material";
import { Style } from "./Style";
import CustomButton from "../CustomButton";
import React, { useEffect, useState } from "react";
import Chatbot from "../Chatbot";
import { IMAGES } from "../../theme";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedDocumentAction,
  selectSummaryAndKeyPoints,
} from "../../store/slice/summaryAndKeyPoints";
import AddSummaryKeyPoints from "../AddSummaryKeyPoints";
import UploadQuiz from "../../screens/training/Components/UploadQuiz/uploadQuiz";
import ReuseModal from "../Modals/ReuseModal";
import { uploadQuizData } from "../../screens/training/Components/UploadQuiz/helper";
import { selectUser } from "../../store/slice/user";
import { globalStyle } from "../../styles/globalStyle";
import { tabsArray } from "../../screens/training/helper";
import useWindowDimensions from "../../hooks/windowDimensions";

const AdminChatbot = ({ loader, quizLoader, addQuiz, check }) => {
  const { docId, section } = useParams();
  const location = useLocation();
  const state = location?.state;
  const navigate = useNavigate();
  const selectedDocData = location?.state?.val;

  const { selectedDocument } = useSelector(selectSummaryAndKeyPoints);

  const stepperData = [
    {
      name: "Summary",
      content:
        "Create a summary and elevate your training for the participants",
      loading: "Preparing your Summary....",
      imgSrc: IMAGES.noSummary,
      width: "350px",
      height: "230px",
      nextPath: `/trainings/document/${docId}/keyPoints`,
    },
    {
      name: "Key Points",
      content:
        "Highlight the key benefits of your training to engage participants",
      loading: "Preparing your Key Points....",
      imgSrc: IMAGES.noKeypoints,
      width: "385px",
      height: "285px",
      nextPath: `/trainings/document/${docId}/quiz`,
    },
    {
      name: "Quiz",
      content:
        "Highlight the key benefits of your training to engage participants",
      loading: "Preparing your Quiz....",
      imgSrc: IMAGES.noQuiz,
      width: "295px",
      height: "330px",
      nextPath: `/trainings`,
    },
  ];

  const [step, setStep] = useState(
    3
    // section === "summary" ?
    //     ((!!Object?.values(selectedDocument)?.length ? selectedDocument?.is_summary : selectedDocData?.is_summary) ? 1 : 0) :
    //     section === "keyPoints" ?
    //         ((!!Object?.values(selectedDocument)?.length ? selectedDocument?.is_keypoints : selectedDocData?.is_keypoints) ? 3 : 2) :
    //         section === "uploadQuiz" ? 5 : 4
  );

  useEffect(() => {
    setStep(
      section === "summary"
        ? (
            !!Object?.values(selectedDocument)?.length
              ? selectedDocument?.is_summary
              : selectedDocData?.is_summary
          )
          ? 1
          : 0
        : section === "keyPoints"
        ? (
            !!Object?.values(selectedDocument)?.length
              ? selectedDocument?.is_keypoints
              : selectedDocData?.is_keypoints
          )
          ? 3
          : 2
        : selectedDocData?.is_quizzes || section === "uploadQuiz"
        ? 5
        : 4
    );
  }, [section]);

  const handleCount = () => {
    if (step === 4 && !selectedDocument?.is_quizzes) addQuiz();
    else setStep((num) => num + 1);
  };

  const quizData = state?.quizData;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { id, departId } = useParams();
  const { isAdmin, access, isSuperAdmin } = useSelector(selectUser);
  const [uploadLoader, setUploadLoader] = useState(false);
  const [questionsList, setQuestionsList] = useState([]);
  const [quizId, setQuizId] = useState(false);

  const { width } = useWindowDimensions();

  const tabs = tabsArray({
    id,
    departId,
    docId,
    navigate,
    isSuperAdmin,
    isAdmin,
    state,
  });

  const isActiveCondition = (val) => {
    return val?.tabName?.toLowerCase() === "quiz";
    // const item = val?.tabName?.toLowerCase()?.replace(" ", "")
    // const selectedTab = tab?.toLowerCase()?.replace(" ", "")
    // return (
    //   (item === selectedTab) || (item === "quiz" && selectedTab === "attemptquiz") || (item === "quiz" && selectedTab === "quizzes")
    // );
  };

  return (
    <Box sx={Style.main}>
      {!isSuperAdmin && !check && (
        <>
          <Box sx={Style.stepperMain}>
            <Box
              sx={{
                ...Style.stepperMain,
                width: "100%",
                maxWidth: "1840px",
                margin: "0 auto",
                padding: "0",
              }}
            >
              <Box sx={Style.stepperContainer}>
                {stepperData?.map((item, index) => (
                  <Typography sx={Style.perStepper}>
                    <Typography
                      component={"span"}
                      sx={Style.perStepperChild(
                        index === parseInt(step / 2),
                        "#272B30"
                      )}
                    >
                      {`${width >= 600 ? "Step " : ""}0${index + 1}${
                        width >= 900 ? " : " : ""
                      }`}
                    </Typography>
                    {width >= 900 && (
                      <Typography
                        component={"span"}
                        sx={Style.perStepperChild(
                          index === parseInt(step / 2),
                          "#3447D4"
                        )}
                      >
                        Generate {item?.name}
                      </Typography>
                    )}
                  </Typography>
                ))}
              </Box>
              <CustomButton
                buttonText={step === 5 ? "Publish Quiz" : "Continue"}
                sx={Style.continueButton}
                disable={!(step % 2)}
                onClick={() => {
                  if (step === 5) setOpen(true);
                  else
                    navigate(stepperData[parseInt(step / 2)]?.nextPath, {
                      state,
                    });
                }}
              />
            </Box>
          </Box>
          <Box sx={Style.loaderMain}>
            <Box sx={{ ...Style.loaderChild, width: `${19 * step}%` }} />
          </Box>
        </>
      )}
      <Box sx={Style.header}>
        <Box
          sx={{
            ...Style.header,
            background: "none",
            border: "none",
            px: "none !important",
            py: "16px !important",
            width: "100%",
            maxWidth: "1818px",
            ml: "auto",
            mr: "auto",
            flexWrap: { xs: "wrap", sm: "nowrap" },
            minHeight: { xs: "118px", sm: "78px" },
          }}
        >
          <Typography sx={Style.trainingPara}>
            <Typography sx={Style.trainingHeading} component={"span"}>
              Training
            </Typography>
            <Typography sx={Style.trainingName} component={"span"}>
              - {selectedDocData?.name}
            </Typography>
          </Typography>
          {check && (
            <Button
              sx={{
                color: "#fff",
                background: "#3447D4",
                borderRadius: "4px",
                width: { xs: "30%", md: "40%" },
                minWidth: "150px",
                maxWidth: "250px",
                display: "flex",
                my: "auto",
                ml: "auto",
                textTransform: "inherit",
                fontFamily: "Rubik",
                fontSize: "18px",
                fontWeight: "500",
                height: "44px",
                p: 0,
                // alignSelf: { xs: 'end', md: 'center' },
                "&:hover": {
                  background: "#4557D4",
                },
              }}
              onClick={() => {
                isAdmin
                  ? setOpen(true)
                  : navigate(
                      `/trainings/company/${id}/document/${docId}/quiz`,
                      {
                        state,
                      }
                    );
              }}
            >
              {/* <Typography component={"span"} sx={{ flex: 1 }}> */}
              {isAdmin ? "Upload" : "Close"}
              {/* </Typography> */}
              {/* <Typography component={"span"} sx={{
                        dipslay: 'flex', width: '50px',
                        background: '#3447D4',
                        fontSize: '20px',
                        lineHeight: '42px',
                        borderRadius: '4px'
                    }}>{quizzezList.length < 10 ? "0" : ""}{quizzezList.length}</Typography> */}
            </Button>
          )}
        </Box>
      </Box>
      <Box sx={Style.contentContainer}>
        <Box
          sx={{
            ...Style.contentContainer,
            background: "none",
            maxWidth: "1920px",
            margin: "0 auto",
          }}
        >
          <Box sx={Style.leftContainer(step !== 5, !(step % 2))}>
            {step === 5 ? (
              <Box sx={Style.quizContainer}>
                <Typography sx={Style.noQuestion}>No of Questions</Typography>
                {questionsList?.map((item, index) => (
                  <Box sx={Style.borderedQuestion(item?.id === quizId?.id)}>
                    <Typography sx={Style.questionNo}>{index + 1}</Typography>
                    <Typography sx={Style.question(item?.id === quizId?.id)}>
                      {item?.question}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box sx={Style.leftContainerContent}>
                <Typography sx={Style.heading}>
                  {stepperData[parseInt(step / 2)]?.name}
                </Typography>
                {step % 2 ? (
                  <Typography sx={Style.content}>
                    {stepperData[parseInt(step / 2)]?.loading}
                  </Typography>
                ) : (
                  <>
                    <Typography sx={Style.content}>
                      {stepperData[parseInt(step / 2)]?.content}
                    </Typography>
                    <CustomButton
                      disable={step % 2}
                      sx={Style.button}
                      typSx={Style.button}
                      buttonText={`Generate ${
                        stepperData[parseInt(step / 2)]?.name
                      }`}
                      onClick={handleCount}
                    />
                  </>
                )}
              </Box>
            )}
          </Box>
          <Box sx={Style.rightContainer(step % 2)}>
            {isSuperAdmin && step === 5 && (
              <Box
                sx={{
                  mt: "20px",
                  width: "100%",
                  mx: "auto",
                  height: "45px !important",
                  display: "flex",
                  gap: { xs: "12px", sm: "20px", md: "30px" },
                  alignItems: "center",
                }}
              >
                <Box
                  sx={globalStyle.arrowback}
                  component={"img"}
                  src={IMAGES.backIcon}
                  onClick={() => {
                    // let ind = tabs?.findIndex((val) => isActiveCondition(val));
                    // if (section === "attemptQuiz" || section === "quizResult" || section === "uploadQuiz" || section === "quiz") navigate(-1);
                    // else if (isTabs && ind != -1) {
                    // tabs[ind].handleBack();
                    // }
                    // else
                    navigate(-1);
                  }}
                />
                <Box sx={{ ...globalStyle.tabsContainer, maxHeight: "30px" }}>
                  {tabs.map((val, index) => (
                    <Box
                      onClick={val.func}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        borderRight: index == 2 ? "0" : "1px solid #F0F0F0",
                        pr: 1,
                        cursor: "pointer",
                        maxHeight: "30px",
                      }}
                    >
                      <Box
                        sx={{ width: "31px", height: "30px" }}
                        component={"img"}
                        src={val.src}
                      />
                      <Typography sx={globalStyle.tabs(isActiveCondition(val))}>
                        {val.tabName}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
            {step % 2 ? (
              step === 5 ? (
                <UploadQuiz
                  isNew={true}
                  data={quizData}
                  setQuizId={setQuizId}
                  setPropList={setQuestionsList}
                />
              ) : (
                <Chatbot isAdminChatbot={true} />
              )
            ) : (
              <Chatbot
                isAdminChatbot={true}
                step={step}
                setStep={setStep}
                submitQuizLoader={loader}
                notFoundImg={
                  step !== 1 &&
                  step !== 3 && (
                    <Box
                      component={"img"}
                      src={stepperData[parseInt(step / 2)]?.imgSrc}
                      width={stepperData[parseInt(step / 2)]?.width}
                      maxHeight={"100%"}
                    />
                  )
                }
              />
            )}
          </Box>
        </Box>
      </Box>
      <ReuseModal
        title={"Are you sure you want to publish quiz ?"}
        open={open}
        setOpen={setOpen}
        onConfirm={() => {
          uploadQuizData({
            dispatch,
            access,
            departId,
            docId,
            state,
            setOpen,
            navigate,
            setUploadLoader,
            setQuestionsList,
            selectedIndex: quizId,
          }).then(() => {
            let selectedDocumentObj = { ...selectedDocument };
            selectedDocumentObj.is_quizzes = true;
            dispatch(selectedDocumentAction(selectedDocumentObj));
          });
        }}
        loader={uploadLoader}
      />
    </Box>
  );
};
export default AdminChatbot;
