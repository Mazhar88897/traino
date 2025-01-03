import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: localStorage.getItem("role") || "",
  isSuperAdmin: null,
  departments: {},
  admin: {},
  user: {},
  documents: {},
  summary: {},
  keyPoints: {},
  company: {},
  departUsers: {},
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserData: (state, action) => {
      if (!!action?.payload?.role)
        return {
          ...state,
          ...action.payload,
          isSuperAdmin:
            String(action?.payload?.role)
              ?.replaceAll(" ", "")
              ?.toLowerCase() === "superadmin",
          isAdmin: String(action?.payload?.role).toLowerCase() === "admin",
          isUser: String(action?.payload?.role).toLowerCase() === "user",
        };
      else
        return {
          ...state,
          ...action.payload,
        };
    },
    addDepartment: (state, action) => {
      if (!state?.departments?.next) {
        return {
          ...state,
          departments: {
            ...state.departments,
            results: [...state.departments.results, action.payload],
          },
        };
      }
    },
    deleteDepartment: (state, action) => {
      const filteredArray = state?.departments?.results.filter(
        (department) => department.id !== action.payload
      );
      return {
        ...state,
        departments: {
          ...state.departments,
          results: filteredArray,
        },
      };
    },
    updateDepartmentList: (state, action) => {
      let prevData = !!action?.payload?.previous
        ? state?.departments?.results
        : [];

      return {
        ...state,
        departments: {
          ...action.payload,
          results: [...prevData, ...action.payload.results],
        },
      };
    },
    addTeamMember: (state, action) => {
      let role = action?.payload?.role;
      let countOnly = action?.payload?.countOnly;
      let tempData = role === "user" ? { ...state.user } : { ...state.admin };
      if (!countOnly && !tempData.results) {
        tempData.results = [];
      }
      tempData.count += 1;
      if (!countOnly)
        tempData.results = [...tempData.results, action?.payload?.data];
      return role === "user"
        ? { ...state, user: tempData }
        : { ...state, admin: tempData };
    },
    updateTeamList: (state, action) => {
      let role = action?.payload?.role;
      let targetDataKey = role === "user" ? "user" : "admin";
      let tempData = state[targetDataKey];
      let results = tempData?.results;
      let ind = results?.findIndex(
        (item) => item?.id === action?.payload?.data?.id
      );
      if (ind !== -1) {
        state[targetDataKey] = {
          ...tempData,
          results: results && [
            ...results.slice(0, ind),
            action?.payload?.data,
            ...results.slice(ind + 1),
          ],
        };
      }
    },
    paginateTeamList: (state, action) => {
      let role = action?.payload?.role;
      let targetDataKey = role === "user" ? "user" : "admin";
      let tempData = state[targetDataKey];
      let results = tempData?.results;
      let data = action?.payload?.data;
      let next = action?.payload?.next;
      let previous = action?.payload?.previous;
      let sort = action?.payload?.sort;
      let pageNo = action?.payload?.pageNo;
      let tempNext = state[targetDataKey].next?.split("&page=")[1];
      let tempPrevious = state[targetDataKey].previous?.split("&page=")[1];
      state[targetDataKey].next = tempNext <= next ? next : "";
      state[targetDataKey].previous = tempPrevious > previous ? "" : previous;
      state[targetDataKey].sort = sort;
      let firstNum = Number(pageNo) * 10;
      let secondNum = Number(pageNo) * 10 + data?.length;
      let status = Object?.values(action?.payload?.status) || [];
      let statusInd = !!status?.length
        ? status?.findIndex((item) => item.pgNo == pageNo)
        : -1;
      if (statusInd != -1) {
        status[statusInd] = { pgNo: pageNo, sort: sort };
      } else {
        status.push({ pgNo: pageNo, sort: sort });
      }
      tempData.status = status;
      let tempResults = [
        ...results?.slice(0, firstNum),
        ...data,
        ...results?.slice(secondNum),
      ];
      state[targetDataKey] = {
        ...tempData,
        results: tempResults,
      };
    },
    getTeamsList: (state, action) => {
      let data = action?.payload?.data;
      let role = action?.payload?.role;
      let tempData = { ...data };
      return role == "user"
        ? { ...state, user: tempData }
        : { ...state, admin: tempData };
    },
    sortTeamsList: (state, action) => {
      let data = action?.payload?.data;
      let role = action?.payload?.role;
      let sort = action?.payload?.sort;
      let pageNo = action?.payload?.pageNo;
      let status = action?.payload?.status || [];
      let statusInd = status?.length
        ? status?.findIndex((item) => item.pgNo == pageNo)
        : -1;
      data.status = Object?.values(status);
      if (statusInd !== -1)
        data.status[statusInd] = { pgNo: pageNo, sort: sort };
      else {
        data.status?.push({ pgNo: pageNo, sort: sort });
      }
      let results = state[role]?.results;
      let firstNum = Number(pageNo) * 10;
      let secondNum = Number(pageNo) * 10 + data?.results?.length;
      let tempData = {
        ...data,
        results: [
          ...results?.slice(0, firstNum),
          ...data?.results,
          ...results?.slice(secondNum),
        ],
      };
      return role == "user"
        ? { ...state, user: tempData }
        : { ...state, admin: tempData };
    },
    addDocument: (state, action) => {
      if (!state?.documents?.next) {
        return {
          ...state,
          documents: {
            ...state.documents,
            results: [...state.documents.results, action.payload],
          },
        };
      }
    },
    updateDocument: (state, action) => {
      let tempResult = [...state?.documents?.results];
      tempResult[action?.payload?.index] = action?.payload?.data;
      return {
        ...state,
        documents: {
          ...state.documents,
          results: tempResult,
        },
      };
    },
    deleteDocumentAction: (state, action) => {
      const filteredArray = state?.documents?.results.filter(
        (documents) => documents.id !== action.payload
      );
      return {
        ...state,
        documents: {
          ...state.documents,
          results: filteredArray,
        },
      };
    },
    updateDocumentList: (state, action) => {
      let prevData = action?.payload?.previous ? state?.documents?.results : [];
      return {
        ...state,
        documents: {
          ...action.payload,
          results: [...prevData, ...action.payload.results],
        },
      };
    },
    addSummary: (state, action) => {
      let prevData = action?.payload?.previous ? state?.summary?.results : [];
      return {
        ...state,
        summary: {
          ...action.payload,
          results: [...prevData, ...action.payload.results],
        },
      };
    },
    addKeyPoints: (state, action) => {
      let prevData = action?.payload?.previous ? state?.keyPoints?.results : [];
      return {
        ...state,
        keyPoints: {
          ...action.payload,
          results: [...prevData, ...action.payload.results],
        },
      };
    },
    logout: () => {
      const saved = localStorage.getItem("rememberMe");
      localStorage.clear();

      localStorage.setItem("rememberMe", saved);
      // alert(localStorage.getItem("rememberMe"));
      return initialState;
    },
  },
});

export const {
  updateUserData,
  logout,
  addDepartment,
  deleteDepartment,
  addTeamMember,
  updateDepartmentList,
  updateTeamList,
  paginateTeamList,
  getTeamsList,
  sortTeamsList,
  addDocument,
  deleteDocumentAction,
  updateDocumentList,
  updateDocument,
} = user.actions;

export const selectUser = (state) => state.user;
export const selectMyTeams = (state) => state.user.teams;

export default user.reducer;
