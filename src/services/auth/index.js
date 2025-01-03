import { customAxios } from "..";

const signIn = async (dispatch, navigate, data) => {
  return await customAxios(dispatch, navigate, "/login/", "post", data);
};
const signUp = async (dispatch, navigate, data) => {
  return await customAxios(dispatch, navigate, "/auth/users/", "post", data);
};
const forgetPassword = async (dispatch, navigate, data) => {
  return await customAxios(
    dispatch,
    navigate,
    "/auth/users/reset_password/",
    "post",
    data
  );
};
const newPaasword = async (dispatch, navigate, data) => {
  return await customAxios(
    dispatch,
    navigate,
    "/auth/users/reset_password_confirm/",
    "post",
    data
  );
};
const refreshToken = async (dispatch, navigate, data) => {
  return await customAxios(
    dispatch,
    navigate,
    "/auth/jwt/refresh/",
    "post",
    data
  );
};
const verifyToken = async (dispatch, navigate, data) => {
  return await customAxios(
    dispatch,
    navigate,
    "/auth/jwt/verify/",
    "post",
    data
  );
};
const getCompanyInfo = async (dispatch, navigate, token) => {
  return await customAxios(
    dispatch,
    navigate,
    "/auths/users/me/",
    "get",
    null,
    token
  );
};
const activation = async (dispatch, navigate, data) => {
  return await customAxios(
    dispatch,
    navigate,
    "/auth/users/activation/",
    "post",
    data
  );
};
const updateAdminData = async (dispatch, navigate, data, token) => {
  return await customAxios(
    dispatch,
    navigate,
    "/auth/users/me/",
    "patch",
    data,
    token
  );
};
const changePassword = async (dispatch, navigate, data, token) => {
  return await customAxios(
    dispatch,
    navigate,
    "/auth/users/set_password/",
    "post",
    data,
    token
  );
};

export {
  activation,
  changePassword,
  forgetPassword,
  getCompanyInfo,
  newPaasword,
  refreshToken,
  signIn,
  signUp,
  updateAdminData,
  verifyToken,
};
