import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const displayPopUpAlertSlice = createSlice({
  name: 'displayPopUpAlert',
  initialState,
  reducers: {
    show: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true
    },
    hide: (state) => {
      state.value = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { show, hide } = displayPopUpAlertSlice.actions

export const displayPopUpAlertReducer = displayPopUpAlertSlice.reducer