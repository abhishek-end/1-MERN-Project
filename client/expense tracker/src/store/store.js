import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./redux";
import apiSlice from "./apiSlice";
export const store = configureStore({
  reducer: {
    expanse: expenseSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(apiSlice.middleware),
});
