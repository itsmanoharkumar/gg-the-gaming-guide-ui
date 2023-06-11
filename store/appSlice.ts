import { THEME_MODE } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  themeMode: null as THEME_MODE | null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setThemeMode(state, action) {
      state.themeMode = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setThemeMode } = appSlice.actions;
export const selectThemeMode = (state: any) => state.app.themeMode;
export default appSlice.reducer;
