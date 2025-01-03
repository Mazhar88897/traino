import { customAxios } from "..";

const getDocuments = async (dispatch, navigate, token, department_id, page = "") => {
  return await customAxios(
    dispatch,
    navigate,
    page ? `/${page}` : department_id ? `/documents/?department_id=${department_id}` : "/documents/",
    "get",
    null,
    token
  );
};
const getDepartmentsById = async (dispatch, navigate, token, id, page = "") => {
  return await customAxios(
    dispatch,
    navigate,
    "/departments/?user_id=" + id + page,
    "get",
    null,
    token
  );
};
const getDocumentsById = async (
  dispatch,
  navigate,
  token,
  id,
  department_id,
  page = ""
) => {
  return await customAxios(
    dispatch,
    navigate,
    page ? `/${page}` : `/documents/?user_id=${id}&department_id=${department_id}`,
    "get",
    null,
    token
  );
};
const getDocumentsOfUser = async (dispatch, navigate, token, id, page = "") => {
  return await customAxios(
    dispatch,
    navigate,
    "/users/?document_id=" + id + page,
    "get",
    null,
    token
  );
};
const addDocuments = async (dispatch, navigate, data, token) => {
  let customHeader = { "content-type": "multipart/form-data" };
  return await customAxios(
    dispatch,
    navigate,
    "/add-document/",
    "post",
    data,
    token,
    customHeader
  );
};
const deleteDocuments = async (dispatch, navigate, id, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/document/${id}/`,
    "delete",
    null,
    token
  );
};
const searchDocuments = async (dispatch, navigate, query, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/document/?department_id=${query}`,
    "get",
    null,
    token
  );
};

const updateDocuments = async (dispatch, navigate, data, id, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/document/${id}/`,
    "put",
    data,
    token
  );
};
const sortDocuments = async (dispatch, navigate, sortKey, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/myLearnings/?ordering=${sortKey}`,
    "get",
    null,
    token
  );
};

export {
  addDocuments,
  deleteDocuments,
  getDocuments,
  getDocumentsOfUser,
  getDocumentsById,
  getDepartmentsById,
  updateDocuments,
  searchDocuments,
  sortDocuments,
};
