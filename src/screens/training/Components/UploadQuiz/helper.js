import toast from "react-hot-toast";
import { handleError } from "../../../../hooks/globalFunction";
import {
  getQuestionList,
  updateQuestion,
  uploadQuiz,
} from "../../../../services/quiz";
import { uploadQuizzAction } from "../../../../store/slice/quizzez";

const getQuestionListData = async ({
  dispatch,
  navigate,
  data,
  access,
  setQuestionsList,
  setLoader,
}) => {
  if (data?.id) {
    try {
      setLoader(true);
      const res = await getQuestionList(dispatch, navigate, data?.id, access);
      setQuestionsList(res?.data);
      setLoader(false);
    } catch (err) {
      toast.error(handleError({}, err?.response?.data));
    }
  }
};

const uploadQuizData = async ({
  dispatch,
  access,
  departId,
  docId,
  state,
  setOpen,
  navigate,
  setUploadLoader,
  setQuestionsList,
  selectedIndex,
}) => {
  try {
    const data = {
      quiz_id: selectedIndex?.quiz,
    };
    setUploadLoader(true);
    const res = await uploadQuiz(dispatch, navigate, data, access);
    dispatch(uploadQuizzAction({ ...res?.data, upload_status: true }));
    navigate(`/trainings`, {
      state: { ...state },
    });
    setQuestionsList(res?.data);
    setOpen(false);
  } catch (err) {
    toast.error(handleError({}, err?.response?.data));
  } finally {
    setUploadLoader(false);
  }
};

const updateQuizData = async ({
  dispatch,
  navigate,
  setUpdateLoader,
  selectedIndex,
  formData,
  access,
  questionsList,
  index,
  setIsChanged,
}) => {
  try {
    setUpdateLoader(true);
    const res = await updateQuestion(
      dispatch,
      navigate,
      selectedIndex?.id,
      formData,
      access
    );
    questionsList[index] = res?.data;
    setIsChanged(false);
    toast.success("Question updated Successfully!");
  } catch (err) {
    toast.error(handleError({}, err?.response?.data));
  } finally {
    setUpdateLoader(false);
  }
};

const handleQuestionChange = ({ e, setFormData }) => {
  setFormData((prevState) => ({
    ...prevState,
    question: e.target.value,
  }));
};

const handleOptionChange = (optionIndex, key, value, setFormData) => {
  setFormData((prevState) => {
    const updatedOptions = [...prevState.options];
    updatedOptions[optionIndex] = {
      ...updatedOptions[optionIndex],
      [key]: value,
    };
    return {
      ...prevState,
      options: updatedOptions,
    };
  });
};

const handleAnswerChange = ({ e, setFormData }) => {
  setFormData((prevState) => ({
    ...prevState,
    answer: e.target.value,
  }));
};
const handleClose = ({ isAdmin, navigate, id, departId, docId, state }) => {
  if (!isAdmin) {
    navigate(
      `/trainings/company/${id}/document/${docId}/quizzes`,
      {
        state: { ...state },
      }
    );
  } else {
    navigate(`/trainings/document/${docId}/quiz`, {
      state: { ...state },
    });
  }
};

const handleNext = ({ setIndex }) => {
  setIndex((prev) => prev + 1);
};
const handlePrevious = ({ setIndex, index }) => {
  if (!!index) setIndex((prev) => prev - 1);
};

export {
  getQuestionListData,
  handleAnswerChange,
  handleClose,
  handleNext,
  handleOptionChange,
  handlePrevious,
  handleQuestionChange,
  updateQuizData,
  uploadQuizData,
};
