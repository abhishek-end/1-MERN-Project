import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  transaction: [],
};

export const expenseSlice = createSlice({
  name: " expanse",
  initialState,
  reducers: {
    getTransaction: (state) => {
      //* get transaction
    },
  },
});

export const { getTransaction } = expenseSlice.actions;
export default expenseSlice.reducer;
