import { customAxios } from "..";

const getCompanies = async (dispatch, navigate, token, page = "") => {
  return await customAxios(
    dispatch,
    navigate,
    page?.length ? `/${page}` : "/companies/",
    "get",
    null,
    token
  );
};
const getCompanyById = async (dispatch, navigate, token, id, page = "") => {
  return await customAxios(
    dispatch,
    navigate,
    "/company/" + id + "/" + page,
    "get",
    null,
    token
  );
};
const getUsers = async (dispatch, navigate, id, token, page = "", sortKey) => {
  return await customAxios(
    dispatch,
    navigate,
    `/users/?company_id=${id}${sortKey ? `&ordering=${sortKey}` : " "}${
      page ? `&page=${page}` : ""
    }`,
    "get",
    null,
    token
  );
};
const getDepartmentUsers = async (
  dispatch,
  navigate,
  id,
  token,
) => {
  return await customAxios(
    dispatch,
    navigate,
    `/users/?department_id=${id}`,
    "get",
    null,
    token
  );
};
const getAdmins = async (dispatch, navigate, id, token, page = "", sortKey) => {
  return await customAxios(
    dispatch,
    navigate,
    `/admins/?company_id=${id}${sortKey ? `&ordering=${sortKey}` : " "}${
      !!page ? `&page=${page}` : ""
    }`,
    "get",
    null,
    token
  );
};
const createCompany = async (dispatch, navigate, data, token) => {
  return await customAxios(
    dispatch,
    navigate,
    "/create-company/",
    "post",
    data,
    token
  );
};
const updateCompany = async (dispatch, navigate, data, id, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/company/${id}/`,
    "patch",
    data,
    token
  );
};
const deleteCompany = async (dispatch, navigate, id, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/company/${id}/`,
    "delete",
    null,
    token
  );
};
const searchCompany = async (dispatch, navigate, query, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/company/?search=${query}`,
    "get",
    null,
    token
  );
};
const sortCompany = async (dispatch, navigate, sortKey, token, page) => {
  return await customAxios(
    dispatch,
    navigate,
    `/companys/?ordering=${sortKey}&page=${page}`,
    "get",
    null,
    token
  );
};

const getUserDetails = async (dispatch, navigate, path, token, page = "") => {
  return await customAxios(dispatch, navigate, path + page, "get", null, token);
};

export {
  createCompany,
  getCompanies,
  updateCompany,
  deleteCompany,
  searchCompany,
  sortCompany,
  getAdmins,
  getUsers,
  getDepartmentUsers,
  getUserDetails,
  getCompanyById,
};
