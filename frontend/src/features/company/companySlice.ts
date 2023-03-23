/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import companyService from "../../services/company";

interface Company {
  id: string;
  description: string;
  likes: number;
  user?: string;
  chats?: [];
}

const initialState = {
  companies: [] as Company[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getCompanies = createAsyncThunk(
  "company/getCompanies",
  async (_, thunkAPI) => {
    try {
      return await companyService.getCompanies();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const companySlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompanies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companies = action.payload;
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.companies = [];
      });
  },
});

export const { reset } = companySlice.actions;

export default companySlice.reducer;
