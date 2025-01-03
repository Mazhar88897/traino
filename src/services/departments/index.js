import { customAxios } from "..";

const createDepartments = async (dispatch, navigate, data, token) => {
  return await customAxios(
    dispatch,
    navigate,
    "/create-department/",
    "post",
    data,
    token
  );
};

const getDepartments = async (dispatch, navigate, token, id, page = "") => {
  return await customAxios(
    dispatch,
    navigate,
    page ? `/${page}` : "/departments/?company_id=" + id,
    "get",
    null,
    token
  );
};
const deleteDepartments = async (dispatch, navigate, department_id, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/department/${department_id}/`,
    "delete",
    null,
    token
  );
};
const searchDepartments = async (dispatch, navigate, query, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/departments/?search=${query}`,
    "get",
    null,
    token
  );
};
const updateDepartments = async (
  dispatch,
  navigate,
  data,
  department_id,
  token
) => {
  return await customAxios(
    dispatch,
    navigate,
    `/department/${department_id}/`,
    "put",
    data,
    token
  );
};
const sortDepartments = async (dispatch, navigate, sortKey, token) => {
  return await customAxios(
    dispatch,
    navigate,
    `/departments/?ordering=${sortKey}`,
    "get",
    null,
    token
  );
};

export {
  createDepartments,
  deleteDepartments,
  getDepartments,
  searchDepartments,
  sortDepartments,
  updateDepartments,
};
