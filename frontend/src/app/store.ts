import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import companyReducer from "../features/company/companySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
