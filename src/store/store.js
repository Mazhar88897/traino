import { configureStore } from "@reduxjs/toolkit";
import { drawer, loading, Quizzez, summaryAndKeyPoints, user } from "./slice";
export const store = configureStore({
  reducer: {
    user,
    loading,
    drawer,
    summaryAndKeyPoints,
    Quizzez,
  },
});
