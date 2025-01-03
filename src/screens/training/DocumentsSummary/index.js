import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AddSummaryKeyPoints,
  Chatbot,
  QuizResults,
  ReuseModal,
} from "../../../components";
import { handleError } from "../../../hooks/globalFunction";
import { generateQuiz, getQuizList } from "../../../services/quiz";
import {
  addQuizzezAction,
  generateQuizzAction,
} from "../../../store/slice/quizzez";
import {
  addQuizAction,
  selectSummaryAndKeyPoints,
} from "../../../store/slice/summaryAndKeyPoints";
import { selectUser } from "../../../store/slice/user";
import { IMAGES } from "../../../theme";
import CompanyWrapper from "../../companies/summary/CompanyWrapper";
import Question from "../../myLearning/components/Question";
import QuizSection from "../../myLearning/components/QuizSection";
import Result from "../../myLearning/components/Result";
import UploadQuiz from "../Components/UploadQuiz/uploadQuiz";
import { Style } from "../style";
import AdminChatbot from "../../../components/AdminChatbot";
import useWindowDimensions from "../../../hooks/windowDimensions";

const DocumentSummary = () => {
  const location = useLocation();
  const state = location?.state;
  const quizData = state?.quizData;
  const selectedDocData = state?.val;
  const documentId = selectedDocData?.id;
  const [quizLoader, setQuizLoader] = useState(false);
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const { id, departId, docId, section } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuperAdmin, isAdmin, isUser, access } = useSelector(selectUser);
  const { selectedDocument } = useSelector(selectSummaryAndKeyPoints);
  const [percentage, setPercentage] = useState(0);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const addQuiz = async () => {
    const data = { document: documentId };
    try {
      setLoader(true);
      const res = await generateQuiz(dispatch, navigate, data, access);
      dispatch(generateQuizzAction({ ...res?.data, upload_status: false }));
      dispatch(addQuizAction(data));
      toast.success("Quiz generated successfully");
      navigate(`/trainings/document/${docId}/uploadQuiz`, {
        state: { ...state, quizData: res.data },
      });
    } catch (err) {
      toast.error(
        handleError(
          {},
          err?.response?.data || { error: "Something went wrong" }
        )
      );
    } finally {
      setLoader(false);
    }
  };

  const getQuizListData = async () => {
    if (!!documentId) {
      try {
        setQuizLoader(true);
        const res = await getQuizList(dispatch, navigate, documentId, access);
        dispatch(addQuizzezAction(res?.data));
      } catch (err) {
        toast.error(handleError({}, err?.response?.data));
      } finally {
        setQuizLoader(false);
      }
    }
  };

  const handleBack = () => {
    if (isAdmin && section === "quiz") {
      navigate(`/trainings/document/${docId}/quizzes`, {
        state,
      });
    } else if (section === "attemptQuiz") setOpen(true);
    else if (isUser && section === "quizResult") {
      navigate(`/my-learning/document/${docId}/quizzes`, {
        state,
      });
    } else if (
      isAdmin &&
      (section === "uploadQuiz" || section === "quizResult")
    ) {
      navigate(`/trainings/document/${docId}/quiz`, {
        state,
      });
    } else if (
      isSuperAdmin &&
      (section === "uploadQuiz" || section === "quizResult")
    ) {
      navigate(`/trainings/company/${id}/document/${docId}/quizzes`, {
        state,
      });
    }
  };

  useEffect(() => {
    if (check || !isAdmin) getQuizListData();
  }, [selectedDocument]);

  const check = !!Object?.values(selectedDocument)?.length
    ? selectedDocument?.is_quizzes
    : selectedDocData?.is_quizzes;
  const { width } = useWindowDimensions();

  const headingData = [
    {
      name: `Dashboard >`,
      handleNavigate: () => navigate("/dashboard"),
    },
    {
      name: `Trainings >`,
      handleNavigate: () => navigate("/trainings"),
    },
    {
      name: `View Results`,
    },
  ];

  return (
    <>
      <div></div>
      {
        // (check || isUser) && (!section?.includes("uploadQuiz")) ?
        (check || !isAdmin) && !section?.includes("uploadQuiz") ? (
          <CompanyWrapper
            isTabs={true}
            headingData={section.includes("quizResult") && headingData}
            topBannerIcon={IMAGES.training}
            topBannerHeading={
              isUser
                ? "My Learning"
                : !section.includes("quizResult")
                ? "Trainings"
                : "Quiz Result - 01"
            }
            heading={section === "quiz" && "Uploaded Quizzes"}
            handleBack={handleBack}
            percentage={percentage}
            setOpen={setOpenUploadModal}
          >
            <Box
              sx={Style.documentSummaryMain(
                (width - 1550) / 6,
                !!section?.includes("quizzes") ||
                  !!section?.includes("quizResult") ||
                  section?.includes("attemptQuiz")
              )}
            >
              <Box sx={Style.documentSummaryContainer}>
                {section === "summary" || section === "keyPoints" ? (
                  <Chatbot />
                ) : (isAdmin || isSuperAdmin) && section === "uploadQuiz" ? (
                  <UploadQuiz
                    data={quizData}
                    open={openUploadModal}
                    setOpen={setOpenUploadModal}
                  />
                ) : isAdmin && section === "quizzes" ? (
                  <AddSummaryKeyPoints
                    paraText={"Generate Quiz"}
                    handleClick={addQuiz}
                    loading={loader}
                    quizLoader={quizLoader}
                  />
                ) : isUser && section === "attemptQuiz" ? (
                  <Question
                    percentage={percentage}
                    setPercentage={setPercentage}
                  />
                ) : isUser && section === "quizResult" ? (
                  <Result />
                ) : !isUser && section === "quizResult" ? (
                  <QuizResults />
                ) : (
                  <QuizSection loader={quizLoader} />
                )}
              </Box>
              <ReuseModal
                title={"Are you sure you want to end the quiz ?"}
                open={!!open}
                setOpen={setOpen}
                onConfirm={() => {
                  setOpen(false);
                  navigate(`/my-learning/document/${docId}/quizzes`, {
                    state,
                  });
                }}
                loader={false}
              />
            </Box>
          </CompanyWrapper>
        ) : (
          <Box sx={Style.documentSummaryMain(width < 1536 ? 60 : 100)}>
            <Box sx={Style.documentSummaryContainer}>
              <AdminChatbot
                addQuiz={addQuiz}
                loader={loader}
                quizLoader={quizLoader}
                check={check}
              />
            </Box>
          </Box>
        )
      }
    </>
  );
};
export default DocumentSummary;
