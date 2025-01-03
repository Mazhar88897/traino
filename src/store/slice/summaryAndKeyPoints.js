import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  summary: {},
  keyPoints: {},
  quiz: {},
  selectedDocument: {},
};

export const summaryAndKeyPoints = createSlice({
  name: "summaryAndKeyPoints",
  initialState,
  reducers: {
    addSummaryAction: (state, action) => {
      return { ...state, summary: typeof action?.payload == "string" ? action?.payload : { ...action.payload } };
    },
    addKeyPointsAction: (state, action) => {
      return { ...state, keyPoints: typeof action?.payload == "string" ? action?.payload : { ...action.payload } };
    },
    addQuizAction: (state, action) => {
      return { ...state, quiz: typeof action?.payload == "string" ? action?.payload : { ...action.payload } };
    },
    selectedDocumentAction: (state, action) => {
      return { ...state, selectedDocument: { ...action.payload } };
    },
  },
});

export const { addSummaryAction, addKeyPointsAction, addQuizAction, selectedDocumentAction } =
  summaryAndKeyPoints.actions;

export const selectSummaryAndKeyPoints = (state) => state.summaryAndKeyPoints;

export default summaryAndKeyPoints.reducer;
