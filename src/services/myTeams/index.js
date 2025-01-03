import { customAxios } from "..";

const getMyTeams = async (dispatch, navigate, token, page = "") => {
  return await customAxios(
    dispatch,
    navigate,
    "/admins/" + page,
    "get",
    null,
    token
  );
};
const createAccount = async (dispatch, navigate, data, token) => {
  return await customAxios(
    dispatch,
    navigate,
    "/create-account/",
    "post",
    data,
    token
  );
};
const addUser = async (dispatch, navigate, data, token) => {
  return await customAxios(
    dispatch,
    navigate,
    "/add-user/",
    "post",
    data,
    token
  );
};
const addUserDepartment = async (dispatch, navigate, data, token) => {
  return await customAxios(
    dispatch,
    navigate,
    "/asign-user-department/",
    "post",
    data,
    token
  );
};
const createAdmin = async (dispatch, navigate, data, token) => {
  return await customAxios(
    dispatch,
    navigate,
    "/create-admin/",
    "post",
    data,
    token
  );
};
const updateTeam = async (dispatch, navigate, data, member_id, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/update-account/${member_id}/`,
    "patch",
    data,
    token
  );
};
const deleteTeam = async (dispatch, navigate, path, member_id, token) => {
  const id = path?.includes("admins")
    ? { admin_ids: member_id }
    : { user_ids: member_id };
  return await customAxios(dispatch, navigate, path, "post", id, token);
};
const searchTeam = async (dispatch, navigate, query, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/myTeams/?search=${query}`,
    "get",
    null,
    token
  );
};
const sortTeam = async (
  dispatch,
  navigate,
  sortKey,
  token,
  isUser,
  company_id,
  page
) => {
  return await customAxios(
    dispatch,
    navigate,
    `/${
      isUser ? `users` : "admins"
    }/?company_id=${company_id}&ordering=${sortKey}${
      page ? `&page=${page}` : ""
    }`,
    "get",
    null,
    token
  );
};

export {
  createAccount,
  deleteTeam,
  getMyTeams,
  searchTeam,
  sortTeam,
  updateTeam,
  createAdmin,
  addUser,
  addUserDepartment,
};
