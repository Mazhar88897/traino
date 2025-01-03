import { customAxios } from "..";

const getSummary = async (dispatch, navigate, token, id) => {
  return await customAxios(
    dispatch,
    navigate,
    "/summary/?document_id=" + id,
    "get",
    null,
    token
  );
};
const addSummary = async (dispatch, navigate, data, token) => {
  return await customAxios(
    dispatch,
    navigate,
    "/summary/",
    "post",
    data,
    token
  );
};
const updateSummary = async (dispatch, navigate, data, id, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/summary/${id}/`,
    "patch",
    data,
    token
  );
};
const deleteSummary = async (dispatch, navigate, id, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/summary/${id}/`,
    "delete",
    null,
    token
  );
};

export { addSummary, deleteSummary, getSummary, updateSummary };
