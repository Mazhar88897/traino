import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzezList: [],
};

export const Quizzez = createSlice({
  name: "Quizzez",
  initialState,
  reducers: {
    addQuizzezAction: (state, action) => {
      return {
        ...state,
        quizzezList: action.payload,
      };
    },
    generateQuizzAction: (state, action) => {
      return {
        ...state,
        quizzezList: [...state.quizzezList, action.payload],
      };
    },
    uploadQuizzAction: (state, action) => {
      let prevQuizzez = [...state.quizzezList];
      let ind = prevQuizzez?.findIndex(
        (val) => val?.id === action?.payload?.id
      );
      prevQuizzez[ind] = action?.payload;
      return {
        ...state,
        quizzezList: prevQuizzez,
      };
    },
    deleteQuizzAction: (state, action) => {
      const tempData = state?.quizzezList?.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        quizzezList: tempData,
      };
    },
  },
});

export const {
  addQuizzezAction,
  deleteQuizzAction,
  generateQuizzAction,
  uploadQuizzAction,
} = Quizzez.actions;

export const allQuizzez = (state) => state.Quizzez;

export default Quizzez.reducer;
