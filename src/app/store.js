import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../features/jobs/jobsSlice";

export const store = configureStore({
  reducer: {
    job: jobReducer,
  },
});
