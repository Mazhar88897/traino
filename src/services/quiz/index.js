import { customAxios } from "..";

const generateQuiz = async (dispatch, navigate, data, token) => {
  return await customAxios(dispatch, navigate, `/quiz/`, "post", data, token);
};

const submitQuizByUser = async (dispatch, navigate, data, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/quiz/submit/`,
    "post",
    data,
    token
  );
};

const updateQuestion = async (dispatch, navigate, id, data, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/question/${id}/`,
    "put",
    data,
    token
  );
};

const deleteQuestion = async (dispatch, navigate, id, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/quiz/${id}/`,
    "delete",
    null,
    token
  );
};

const uploadQuiz = async (dispatch, navigate, data, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/quiz/upload/`,
    "post",
    data,
    token
  );
};

const getQuizList = async (dispatch, navigate, id, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/quiz/?document_id=${id}`,
    "get",
    null,
    token
  );
};

const getQuestionList = async (dispatch, navigate, id, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/questions/?quiz_id=${id}`,
    "get",
    null,
    token
  );
};
const getQuizResult = async (dispatch, navigate, id, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/result/?quiz_id=${id}`,
    "get",
    null,
    token
  );
};

export {
  deleteQuestion,
  generateQuiz,
  getQuestionList,
  getQuizList,
  getQuizResult,
  submitQuizByUser,
  updateQuestion,
  uploadQuiz,
};
