import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface Auth {
  isAuthenticated: Boolean,
  userName: string,
}

const initialState: Auth = {
  isAuthenticated: false,
  userName: "",
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Auth>) => {
      return action.payload;
    },
    logout: (state) => {
      return initialState;
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer