import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRegStar } from "react-icons/fa";
import { MdOutlineRefresh } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AdminQuizCard,
  Loader,
  NoRecordFound,
  ReuseModal,
  StartQuizModal,
  UserQuizCard,
} from "../../../components";
import { handleError } from "../../../hooks/globalFunction";
import { deleteQuestion } from "../../../services/quiz";
import { allQuizzez, deleteQuizzAction } from "../../../store/slice/quizzez";
import { selectUser } from "../../../store/slice/user";
import { Style } from "../style";
import { IMAGES } from "../../../theme";
import QuizResult from "../../../components/Modals/QuizResult";
import useWindowDimensions from "../../../hooks/windowDimensions";
import { selectdrawer } from "../../../store/slice/drawer";
// import { useLocation } from "react-router-dom";
const QuizSection = ({ loader }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, docId, departId } = useParams();

  const [deleteloader, setDeleteLoader] = useState(false);
  const [quizId, setQuizId] = useState(false);
  const { access, isUser, isSuperAdmin, isAdmin } = useSelector(selectUser);
  const { quizzezList } = useSelector(allQuizzez);
  const [selectedItem, setSelectedItem] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(false);
  const { width } = useWindowDimensions();
  const { drawer } = useSelector(selectdrawer);
  const location = useLocation();
  const state = location?.state;
  const selectedDocData = state?.val;

  const onConfirm = () => {
    navigate(`/my-learning/document/${docId}/attemptQuiz`, {
      state: { ...state, quizData: selectedItem },
    });
    setSelectedItem(false);
  };

  const deleteQuizData = async () => {
    try {
      setDeleteLoader(true);
      await deleteQuestion(dispatch, navigate, quizId, access);
      dispatch(deleteQuizzAction(quizId));
      setQuizId(false);
      toast.success("Quiz deleted Successfully!");
    } catch (err) {
      toast.error(handleError({}, err?.response?.data));
    } finally {
      setDeleteLoader(false);
    }
  };

  const handleClick = (item) => {
    if (isUser) {
      setSelectedItem(item);
    } else if (isSuperAdmin) {
      navigate(`/trainings/company/${id}/document/${docId}/uploadQuiz`, {
        state: { ...state, quizData: item },
      });
    } else {
      navigate(`/trainings/document/${docId}/uploadQuiz`, {
        state: { ...state, quizData: item },
      });
    }
  };

  const onResultClick = (item) => {
    if (isAdmin) {
      navigate(`/trainings/document/${docId}/quizResult`, {
        state: { ...state, quizData: item },
      });
    } else if (isSuperAdmin) {
      navigate(`/trainings/company/${id}/document/${docId}/quizResult`, {
        state: { ...state, quizData: item },
      });
    } else {
      setOpen(true);
      setData(item);
    }
  };

  if (loader)
    return (
      <Loader style={{ width: "100%", height: "auto" }} isCircular={true} />
    );
  return (
    <>
      {!quizzezList?.length ? (
        <NoRecordFound />
      ) : (
        <Box sx={Style.quizMain}>
          <Box
            sx={{
              ...Style.customCardWrapper(isUser, width, drawer),
              alignContent: "start",
              display: 'grid',
              gridTemplateColumns: width <= 600 ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: width <= 600 ? '20px 15px' : '15px',
              width: '100%'
            }}
          >
            {quizzezList?.map((item, index) => {
              const { score, result_status, upload_status } = item;
              return isUser ? (
                <UserQuizCard
                  onClick={() => handleClick({ ...item, index })}
                  // onClick={() => console.log(item)}
                  heading={`QUIZ ${index < 9 ? "0" : ""}${index + 1}`}
                  subHeading={
                    <>
                      “You have{" "}
                      <strong>
                        {" "}
                        {selectedDocData?.avgCompletionTime || 45} mins
                      </strong>{" "}
                      to complete{" "}
                      <strong>{`QUIZ ${index < 9 ? "0" : ""}${
                        index + 1
                      }`}</strong>
                      ”
                    </>
                  }
                  item={item}
                  iconClick={() => handleClick({ ...item, index })}
                  key={index}
                  topRightIcon={
                    score === null ? null : result_status === "Pass" ? (
                      <FaRegStar color="goldenrod" size={25} />
                    ) : (
                      <MdOutlineRefresh color="red" size={25} />
                    )
                  }
                  onResultClick={() =>
                    onResultClick({ ...item, index, upload_status })
                  }
                  sx={Style.userQuizCard(width, drawer)}
                  data={data}
                />
              ) : (
                <UserQuizCard
                  width={width}
                  drawer={drawer}
                  iconClick={() =>
                    handleClick({ ...item, index, upload_status })
                  }
                  onResultClick={() =>
                    onResultClick({ ...item, index, upload_status })
                  }
                  item={item}
                  heading={`Quiz ${index + 1}`}
                  uploadStatus={upload_status}
                  subHeading={`"Let's create an engaging, interactive quiz!"`}
                  key={index}
                  onDeleteClick={() => setQuizId(item?.id)}
                  subHeadingStyle={{
                    color: upload_status ? "green" : "#9B870C",
                  }}
                />
              );
            })}
            {/* {
              isUser &&
              <Box sx={Style.viewCard}>
                <Typography sx={Style.view}>VIEW <br /> RESULTS</Typography>
              </Box>
            } */}
            <StartQuizModal
              open={selectedItem}
              setOpen={setSelectedItem}
              onConfirm={onConfirm}
              data={data}
            />
            <ReuseModal
              title={"Are you sure you want to delete quiz ?"}
              open={!!quizId}
              setOpen={setQuizId}
              onConfirm={deleteQuizData}
              loader={deleteloader}
            />
          </Box>
          {/* {isUser && (
            <Box sx={Style.cupMain}>
              <Typography sx={Style.myScore}>My Score</Typography>
              <Box sx={Style.quizAttemptDetail}>
                <Typography sx={Style.quizAttemptHeading}>
                  Quizzes Attempt
                </Typography>
                <Typography sx={Style.quizNo}>04</Typography>
              </Box>
              <Box sx={Style.cup} component={"img"} src={IMAGES.cup} />
              <Typography sx={Style.score}>750</Typography>
              <Typography sx={Style.scoreTitle}>Total Points</Typography>
            </Box>
          )} */}
          <QuizResult open={open} setOpen={setOpen} data={data} />
        </Box>
      )}
    </>
  );
};

export default QuizSection;
