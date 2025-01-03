import { getCompanyInfo, refreshToken } from "../services/auth";
import { searchDepartments } from "../services/departments";
import { searchDocuments } from "../services/myLearnings";
import { searchTeam } from "../services/myTeams";
import {
  logout,
  updateDepartmentList,
  updateDocumentList,
  updateUserData,
} from "../store/slice/user";

export const formikValidation = (formik) => {
  return !!(
    Object.values(formik?.errors).some((error) => !!error) ||
    Object.values(formik?.values).some((value) =>
      typeof value === "boolean" ? !value : !value?.length
    )
  );
};
const blockData = (item) => {
  return `${!!item[1] && typeof item[1] != "string" ? item[1]?.[0] : item[1]}`;
};
export const handleError = (data, error) => {
  return (
    Object?.entries(error)
      ?.map((item, index) => {
        const upperCase = blockData(item)?.includes("This field");
        return blockData(item)?.replaceAll(
          upperCase ? "This field" : "this field",
          !!item[1] && typeof item[0] != "string" ? item[0][0] : item[0]
        );
      })
      .filter(Boolean)[0] ||
    error?.detail ||
    error ||
    "Something went wrong"
  );
};

export const searchHelper = (e, access, dispatch) => {
  return {
    departments: async () => {
      let departments = await searchDepartments(e, access);
      dispatch(updateDepartmentList(departments?.data));
    },
    companySummary: async () => {
      let teams = await searchTeam(e, access);
      dispatch(
        updateUserData({
          teams: teams.data,
        })
      );
    },
    documents: async () => {
      let documentsRes = await searchDocuments(e, access);
      dispatch(updateDocumentList(documentsRes?.data));
    },
  };
};

export const getAllData = async (
  navigate,
  refresh,
  setLoading,
  dispatch,
  user,
  loginCheck
) => {
  try {
    let access = localStorage.getItem("access");
    if (!access) {
      const { data } = await refreshToken(dispatch, navigate, { refresh });
      access = data.access;
      localStorage.setItem("access", data.access);
    } else {
      if (!loginCheck) {
        const { data } = await getCompanyInfo(dispatch, navigate, access);
        await dispatch(
          updateUserData({
            ...data?.user,
            access,
            refresh,
            role: data?.user?.role,
          })
        );
      }
    }
    setLoading(false);
  } catch (err) {
    localStorage.clear();
    setLoading(false);
  }
};

export const refreshAccessToken = async (dispatch, navigate) => {
  try {
    const refresh = localStorage.getItem("refresh");
    const { data } = await refreshToken(dispatch, navigate, {
      refresh: refresh,
    });
    localStorage.setItem("access", data?.access);
    localStorage.setItem("refresh", data?.refresh);
    localStorage.setItem("refreshTime", Date.now());
    localStorage.setItem("accessTime", Date.now());
    dispatch(
      updateUserData({
        access: data?.access,
        refresh: data?.refresh,
      })
    );
  } catch (err) {
    localStorage.clear();
  }
};

export const checkTimeoutValidity = (tokenTime, expirationPeriod) => {
  let timeDiffernce = Date.now() - tokenTime;
  return {
    status: timeDiffernce < expirationPeriod,
    timeoutTime: expirationPeriod - timeDiffernce,
  };
};

export const Logout = (dispatch, navigate) => {
  dispatch(logout());
  // localStorage.clear();
  // alert();
  navigate("/signin");
};
