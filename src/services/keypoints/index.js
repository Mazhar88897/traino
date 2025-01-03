import { customAxios } from "..";

const getKeypoints = async (dispatch, navigate, token, id) => {
  return await customAxios(
    dispatch,
    navigate,
    "/keypoints/?document_id=" + id,
    "get",
    null,
    token
  );
};
const addKeypoints = async (dispatch, navigate, data, token) => {
  return await customAxios(
    dispatch,
    navigate,
    "/keypoints/",
    "post",
    data,
    token
  );
};
const updateKeypoints = async (dispatch, navigate, data, id, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/keypoints/${id}/`,
    "patch",
    data,
    token
  );
};
const deleteKeypoints = async (dispatch, navigate, id, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/keypoints/${id}/`,
    "delete",
    null,
    token
  );
};

export { addKeypoints, deleteKeypoints, getKeypoints, updateKeypoints };
